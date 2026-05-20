const express = require("express");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");
const Stripe = require("stripe");

const app = express();
const PORT = process.env.PORT || 3000;

/* =========================================
   SUPABASE INIT
========================================= */
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

/* =========================================
   STRIPE INIT
========================================= */
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/* =========================================
   MIDDLEWARE
========================================= */
app.use("/api/stripe/webhook", express.raw({ type: "application/json" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================================
   STATIC FRONTEND
========================================= */
app.use(express.static(path.join(__dirname, "public")));

/* =========================================
   MEMORY CACHE (fallback)
========================================= */
const cache = {
  pageViews: 0,
  events: [],
};

/* =========================================
   REQUEST LOGGER
========================================= */
app.use((req, res, next) => {
  cache.pageViews++;

  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("VISIT:", req.originalUrl);
  console.log("IP:", req.headers["x-forwarded-for"] || req.socket.remoteAddress);
  console.log("TIME:", new Date().toISOString());

  next();
});

/* =========================================
   HEALTH CHECK
========================================= */
app.get("/health", (req, res) => {
  res.json({
    ok: true,
    app: "NorthSky Elite",
    uptime: process.uptime(),
    pageViews: cache.pageViews,
    integrations: {
      supabase: !!process.env.SUPABASE_URL,
      stripe: !!process.env.STRIPE_SECRET_KEY,
    },
  });
});

/* =========================================
   TRACK EVENT → SUPABASE
========================================= */
app.post("/api/track", async (req, res) => {
  try {
    const event = {
      event_name: req.body.event || "page_view",
      metadata: req.body,
      ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
      user_agent: req.headers["user-agent"],
      created_at: new Date().toISOString(),
    };

    const { error } = await supabase.from("events").insert([event]);

    if (error) {
      console.error("Supabase error:", error.message);
      cache.events.push(event);
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Track error:", err);
    res.status(500).json({ success: false });
  }
});

/* =========================================
   DEMO REQUEST → SUPABASE
========================================= */
app.post("/api/demo-request", async (req, res) => {
  try {
    const { name, email, company } = req.body;

    if (!name || !email || !company) {
      return res.status(400).json({ success: false, error: "Missing fields" });
    }

    const lead = {
      name,
      email,
      company,
      ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
      user_agent: req.headers["user-agent"],
      lead_score: "HIGH",
      source: "northsky_elite",
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("vip_leads")
      .insert([lead])
      .select()
      .single();

    if (error) console.error("Lead error:", error.message);

    res.json({
      success: true,
      id: data?.id || null,
    });
  } catch (err) {
    console.error("Demo error:", err);
    res.status(500).json({ success: false });
  }
});

/* =========================================
   STRIPE CHECKOUT
========================================= */
app.post("/api/stripe/checkout", async (req, res) => {
  try {
    const { priceId, email, companyName } = req.body;

    if (!priceId) {
      return res.status(400).json({ success: false, error: "Missing priceId" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: email || undefined,
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: {
        company: companyName || "",
        source: "northsky_elite",
      },
      success_url: `${process.env.APP_URL || "http://localhost:" + PORT}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.APP_URL || "http://localhost:" + PORT}/pricing`,
    });

    res.json({ success: true, url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/* =========================================
   STRIPE PORTAL
========================================= */
app.post("/api/stripe/portal", async (req, res) => {
  try {
    const { customerId } = req.body;

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.APP_URL || "http://localhost:" + PORT}/dashboard`,
    });

    res.json({ success: true, url: session.url });
  } catch (err) {
    console.error("Portal error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

/* =========================================
   STRIPE WEBHOOK → SUPABASE SYNC
========================================= */
app.post("/api/stripe/webhook", async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature error:", err.message);
    return res.status(400).send("Invalid signature");
  }

  try {
    const data = event.data?.object;

    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        await supabase.from("subscriptions").upsert({
          stripe_customer_id: data.customer,
          stripe_subscription_id: data.id,
          status: data.status,
          plan: data?.items?.data?.[0]?.price?.nickname || "unknown",
          current_period_end: new Date(data.current_period_end * 1000).toISOString(),
          updated_at: new Date().toISOString(),
        });
        break;
      }

      case "customer.subscription.deleted": {
        await supabase
          .from("subscriptions")
          .update({
            status: "canceled",
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_subscription_id", data.id);
        break;
      }

      case "invoice.payment_succeeded": {
        await supabase.from("payments").insert({
          stripe_customer_id: data.customer,
          stripe_invoice_id: data.id,
          amount_paid: data.amount_paid,
          currency: data.currency,
          status: "paid",
          created_at: new Date().toISOString(),
        });
        break;
      }

      case "invoice.payment_failed":
        console.log("Payment failed:", data.customer);
        break;

      default:
        console.log("Unhandled:", event.type);
    }

    res.json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err);
    res.status(500).json({ error: "Webhook failed" });
  }
});

/* =========================================
   STATS DASHBOARD
========================================= */
app.get("/api/stats", async (req, res) => {
  try {
    const [leads, events, subs] = await Promise.all([
      supabase.from("vip_leads").select("*", { count: "exact", head: true }),
      supabase.from("events").select("*", { count: "exact", head: true }),
      supabase.from("subscriptions").select("*").eq("status", "active"),
    ]);

    const latest = await supabase
      .from("vip_leads")
      .select("name, company, created_at")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    res.json({
      success: true,
      stats: {
        pageViews: cache.pageViews,
        vipRequests: leads.count || 0,
        trackedEvents: events.count || 0,
        activeSubscriptions: subs.data?.length || 0,
        latestLead: latest.data || null,
      },
    });
  } catch (err) {
    console.error("Stats error:", err);
    res.status(500).json({ success: false });
  }
});

/* =========================================
   FALLBACK ROUTE
========================================= */
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/* =========================================
   START SERVER
========================================= */
app.listen(PORT, () => {
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("NorthSky running");
  console.log("PORT:", PORT);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━");
});