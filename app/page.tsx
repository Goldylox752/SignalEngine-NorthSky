"use client";

import { useState } from "react";

const results = [
  { value: "34%", label: "Higher close rates" },
  { value: "<7min", label: "Storm alerts" },
  { value: "2M+", label: "Leads scored" },
  { value: "200+", label: "Roofing teams" },
];

const features = [
  {
    title: "AI Lead Scoring",
    body:
      "Know which roofing leads are most likely to close before your competitors even respond.",
  },
  {
    title: "Storm Intelligence",
    body:
      "Get real-time storm alerts and lead clusters the moment weather hits your territory.",
  },
  {
    title: "Automatic CRM Sync",
    body:
      "Keep HubSpot, Salesforce, and JobNimbus updated automatically with zero manual work.",
  },
];

const pricing = [
  {
    name: "Starter",
    price: "$297",
    desc: "Perfect for smaller roofing teams.",
    features: [
      "AI lead scoring",
      "500 leads/month",
      "Email alerts",
      "3 users included",
    ],
  },
  {
    name: "Pro",
    price: "$697",
    desc: "Built for growing roofing operations.",
    features: [
      "Unlimited leads",
      "Storm intelligence",
      "CRM sync",
      "Priority support",
    ],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "For multi-location roofing companies.",
    features: [
      "Unlimited users",
      "White-label",
      "Dedicated manager",
      "API access",
    ],
  },
];

const faqs = [
  {
    q: "How fast is setup?",
    a: "Most roofing teams are fully operational within 24 hours.",
  },
  {
    q: "Do you support CRMs?",
    a: "Yes. NorthSky integrates with HubSpot, Salesforce, and JobNimbus.",
  },
  {
    q: "Is there a contract?",
    a: "Starter and Pro plans are month-to-month with no long-term contract.",
  },
];

export default function Page() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Inter:wght@400;500;600;700&display=swap");

        :root {
          --bg: #0a0a0f;
          --card: #13131a;
          --border: rgba(255, 255, 255, 0.08);
          --text: #f3f4f6;
          --muted: #a1a1aa;
          --blue: #4169e1;
          --blue2: #6b8ff0;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: Inter, sans-serif;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }

        a {
          text-decoration: none;
          color: inherit;
        }

        .container {
          width: 100%;
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .serif {
          font-family: "Instrument Serif", serif;
        }

        .nav {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(10, 10, 15, 0.96);
          border-bottom: 1px solid var(--border);
        }

        .nav-inner {
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          font-size: 24px;
          font-weight: 700;
        }

        .logo span {
          color: var(--blue2);
        }

        .nav-links {
          display: flex;
          gap: 28px;
          color: var(--muted);
          font-size: 14px;
        }

        .btn {
          height: 50px;
          padding: 0 24px;
          border-radius: 10px;
          border: none;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .btn-primary {
          background: var(--blue);
          color: white;
        }

        .btn-primary:hover {
          background: var(--blue2);
          transform: translateY(-1px);
        }

        .btn-secondary {
          background: transparent;
          border: 1px solid var(--border);
          color: white;
        }

        .hero {
          padding: 110px 0 80px;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 48px;
          align-items: center;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          padding: 8px 14px;
          border-radius: 999px;
          border: 1px solid rgba(65, 105, 225, 0.2);
          background: rgba(65, 105, 225, 0.08);
          color: #b7c8ff;
          font-size: 13px;
          margin-bottom: 24px;
        }

        h1 {
          font-size: clamp(46px, 8vw, 88px);
          line-height: 0.95;
          letter-spacing: -0.04em;
          margin-bottom: 24px;
        }

        .hero p {
          color: var(--muted);
          font-size: 18px;
          line-height: 1.7;
          max-width: 560px;
        }

        .hero-actions {
          display: flex;
          gap: 14px;
          margin-top: 36px;
          flex-wrap: wrap;
        }

        .trust {
          margin-top: 18px;
          font-size: 13px;
          color: var(--muted);
        }

        .dashboard {
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.04),
            rgba(255, 255, 255, 0.02)
          );
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 20px;
        }

        .dashboard-top {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .metric-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }

        .metric-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 18px;
        }

        .metric-card h3 {
          font-size: 28px;
          margin-bottom: 6px;
        }

        .metric-card p {
          font-size: 13px;
          color: var(--muted);
        }

        .section {
          padding: 90px 0;
        }

        .section-title {
          font-size: clamp(36px, 5vw, 64px);
          line-height: 1;
          letter-spacing: -0.03em;
          margin-bottom: 16px;
        }

        .section-sub {
          color: var(--muted);
          font-size: 17px;
          line-height: 1.7;
          max-width: 620px;
        }

        .results-grid,
        .features-grid,
        .pricing-grid {
          display: grid;
          gap: 18px;
        }

        .results-grid {
          grid-template-columns: repeat(4, 1fr);
          margin-top: 48px;
        }

        .result-card {
          padding: 28px;
          border: 1px solid var(--border);
          border-radius: 18px;
          background: var(--card);
        }

        .result-card h3 {
          font-size: 36px;
          margin-bottom: 8px;
        }

        .result-card p {
          color: var(--muted);
        }

        .features-grid {
          grid-template-columns: repeat(3, 1fr);
          margin-top: 48px;
        }

        .feature-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 28px;
        }

        .feature-card h3 {
          margin-bottom: 14px;
          font-size: 22px;
        }

        .feature-card p {
          color: var(--muted);
          line-height: 1.7;
        }

        .steps {
          margin-top: 44px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        .step {
          padding: 24px;
          border-radius: 18px;
          background: var(--card);
          border: 1px solid var(--border);
        }

        .step-number {
          color: var(--blue2);
          font-weight: 700;
          margin-bottom: 14px;
        }

        .pricing-grid {
          grid-template-columns: repeat(3, 1fr);
          margin-top: 48px;
        }

        .price-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 32px;
        }

        .price-card.popular {
          border: 1px solid rgba(65, 105, 225, 0.5);
          box-shadow: 0 0 0 1px rgba(65, 105, 225, 0.2);
        }

        .price-card h3 {
          font-size: 22px;
          margin-bottom: 12px;
        }

        .price {
          font-size: 54px;
          margin-bottom: 10px;
        }

        .price-card p {
          color: var(--muted);
          margin-bottom: 24px;
        }

        .price-card ul {
          list-style: none;
          margin-bottom: 28px;
        }

        .price-card li {
          padding: 10px 0;
          border-bottom: 1px solid var(--border);
          color: #d4d4d8;
        }

        .faq {
          max-width: 760px;
          margin: 0 auto;
        }

        .faq-item {
          border-top: 1px solid var(--border);
          padding: 22px 0;
        }

        .faq-question {
          display: flex;
          justify-content: space-between;
          cursor: pointer;
          font-size: 18px;
          font-weight: 600;
        }

        .faq-answer {
          margin-top: 14px;
          color: var(--muted);
          line-height: 1.7;
        }

        .cta {
          text-align: center;
          padding: 120px 0;
        }

        .cta p {
          color: var(--muted);
          margin-top: 20px;
          font-size: 18px;
          line-height: 1.7;
          max-width: 620px;
          margin-inline: auto;
        }

        footer {
          border-top: 1px solid var(--border);
          padding: 32px 0;
          color: var(--muted);
          font-size: 14px;
        }

        .footer-inner {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }

        @media (max-width: 900px) {
          .hero-grid,
          .features-grid,
          .pricing-grid,
          .steps,
          .results-grid {
            grid-template-columns: 1fr;
          }

          .nav-links {
            display: none;
          }

          .hero {
            padding: 80px 0 60px;
          }

          h1 {
            font-size: 54px;
          }

          .hero-actions {
            flex-direction: column;
          }

          .hero-actions button {
            width: 100%;
          }

          .dashboard {
            margin-top: 20px;
          }
        }
      `}</style>

      <nav className="nav">
        <div className="container nav-inner">
          <div className="logo">
            North<span>Sky</span>
          </div>

          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
          </div>

          <button className="btn btn-primary">
            Book Demo
          </button>
        </div>
      </nav>

      <main>

        <section className="hero">
          <div className="container hero-grid">

            <div>
              <div className="badge">
                Trusted by 200+ roofing teams
              </div>

              <h1 className="serif">
                Know which roofing leads
                will close first.
              </h1>

              <p>
                AI-powered lead scoring and storm intelligence
                built for roofing sales teams.
              </p>

              <div className="hero-actions">
                <button className="btn btn-primary">
                  Book Free Demo
                </button>

                <button className="btn btn-secondary">
                  See Pricing
                </button>
              </div>

              <div className="trust">
                Setup in 24h • Cancel anytime • No credit card required
              </div>
            </div>

            <div className="dashboard">
              <div className="dashboard-top">
                <span>Live Dashboard</span>
                <span style={{ color: "#6B8FF0" }}>
                  ● LIVE
                </span>
              </div>

              <div className="metric-grid">
                <div className="metric-card">
                  <h3>24</h3>
                  <p>New Leads</p>
                </div>

                <div className="metric-card">
                  <h3>91</h3>
                  <p>Lead Score</p>
                </div>

                <div className="metric-card">
                  <h3>$186k</h3>
                  <p>Pipeline</p>
                </div>

                <div className="metric-card">
                  <h3>34%</h3>
                  <p>Close Rate</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        <section className="section">
          <div className="container">

            <h2 className="section-title serif">
              Roofing pipeline intelligence
            </h2>

            <p className="section-sub">
              NorthSky helps roofing companies respond faster,
              prioritize better leads, and close more jobs.
            </p>

            <div className="results-grid">
              {results.map((item) => (
                <div className="result-card" key={item.label}>
                  <h3 className="serif">{item.value}</h3>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        <section className="section" id="features">
          <div className="container">

            <h2 className="section-title serif">
              Built for roofing sales teams
            </h2>

            <p className="section-sub">
              Everything your team needs to move faster
              and close more profitable roofing jobs.
            </p>

            <div className="features-grid">
              {features.map((feature) => (
                <div className="feature-card" key={feature.title}>
                  <h3>{feature.title}</h3>
                  <p>{feature.body}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        <section className="section">
          <div className="container">

            <h2 className="section-title serif">
              How it works
            </h2>

            <div className="steps">

              <div className="step">
                <div className="step-number">01</div>
                <h3>Connect CRM</h3>
              </div>

              <div className="step">
                <div className="step-number">02</div>
                <h3>Score Leads</h3>
              </div>

              <div className="step">
                <div className="step-number">03</div>
                <h3>Prioritize Reps</h3>
              </div>

              <div className="step">
                <div className="step-number">04</div>
                <h3>Close More Jobs</h3>
              </div>

            </div>

          </div>
        </section>

        <section className="section" id="pricing">
          <div className="container">

            <h2 className="section-title serif">
              Simple pricing
            </h2>

            <div className="pricing-grid">
              {pricing.map((plan) => (
                <div
                  key={plan.name}
                  className={`price-card ${plan.highlight ? "popular" : ""}`}
                >
                  <h3>{plan.name}</h3>

                  <div className="price serif">
                    {plan.price}
                  </div>

                  <p>{plan.desc}</p>

                  <ul>
                    {plan.features.map((feature) => (
                      <li key={feature}>
                        ✓ {feature}
                      </li>
                    ))}
                  </ul>

                  <button className="btn btn-primary" style={{ width: "100%" }}>
                    Get Started
                  </button>
                </div>
              ))}
            </div>

          </div>
        </section>

        <section className="section" id="faq">
          <div className="container faq">

            <h2 className="section-title serif">
              Frequently asked questions
            </h2>

            {faqs.map((faq, index) => (
              <div className="faq-item" key={faq.q}>

                <div
                  className="faq-question"
                  onClick={() =>
                    setOpenFaq(openFaq === index ? null : index)
                  }
                >
                  <span>{faq.q}</span>

                  <span>
                    {openFaq === index ? "−" : "+"}
                  </span>
                </div>

                {openFaq === index && (
                  <div className="faq-answer">
                    {faq.a}
                  </div>
                )}

              </div>
            ))}

          </div>
        </section>

        <section className="cta">
          <div className="container">

            <h2 className="section-title serif">
              Your pipeline.
              <br />
              Fully loaded.
            </h2>

            <p>
              Join 200+ roofing teams using NorthSky
              to close more jobs with AI-powered lead intelligence.
            </p>

            <div
              style={{
                marginTop: 40,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <button className="btn btn-primary">
                Book Free Demo
              </button>
            </div>

          </div>
        </section>

      </main>

      <footer>
        <div className="container footer-inner">

          <div className="logo">
            North<span>Sky</span>
          </div>

          <div>
            © 2026 NorthSky Intelligence
          </div>

        </div>
      </footer>
    </>
  );
}