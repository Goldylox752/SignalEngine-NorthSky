import { stripe } from "@/lib/stripe";
import { processStripeEvent } from "@/billing/processor";

export async function POST(req) {
  try {
    const body = await req.text();
    const sig = req.headers.get("stripe-signature");

    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    await processStripeEvent(event);

    return Response.json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err.message);
    return new Response("Webhook Error", { status: 400 });
  }
}