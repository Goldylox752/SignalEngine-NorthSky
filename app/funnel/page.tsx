"use client";

import { useState } from "react";

const results = [
  { value: "34%", label: "Higher close rates" },
  { value: "<7min", label: "Storm alerts speed" },
  { value: "2M+", label: "Leads scored" },
  { value: "200+", label: "Roofing teams" },
];

const features = [
  {
    title: "AI Lead Scoring",
    body: "Instantly know which roofing leads will actually close before your competitors respond.",
  },
  {
    title: "Storm Intelligence",
    body: "Get real-time storm zones and automatically generated lead clusters in your area.",
  },
  {
    title: "CRM Auto Sync",
    body: "HubSpot, Salesforce, JobNimbus updated automatically — no manual entry.",
  },
];

const faqs = [
  {
    q: "How fast can we get started?",
    a: "Most roofing teams are fully set up within 24 hours.",
  },
  {
    q: "Do you integrate with CRMs?",
    a: "Yes — HubSpot, Salesforce, JobNimbus, and more.",
  },
  {
    q: "Is there a contract?",
    a: "No long-term contracts. Cancel anytime.",
  },
];

export default function FunnelPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="page">

      {/* HERO */}
      <section className="hero">
        <div className="badge">Built for roofing companies closing more jobs</div>

        <h1>
          Stop wasting time on bad roofing leads.
          <br />
          Close the ones that actually convert.
        </h1>

        <p>
          NorthSky uses AI + storm intelligence to show roofing teams exactly
          which leads are most likely to turn into paid jobs.
        </p>

        <div className="ctaRow">
          <button className="primaryBtn">Book Free Demo</button>
          <button className="ghostBtn">See How It Works</button>
        </div>

        <div className="trust">
          No credit card required • Setup in 24 hours • Cancel anytime
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="stats">
        {results.map((r) => (
          <div key={r.label} className="statCard">
            <h2>{r.value}</h2>
            <p>{r.label}</p>
          </div>
        ))}
      </section>

      {/* VALUE */}
      <section className="section">
        <h2>Why roofing teams switch to NorthSky</h2>

        <div className="grid">
          {features.map((f) => (
            <div key={f.title} className="card">
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STRONG CTA */}
      <section className="ctaBox">
        <h2>See your pipeline in action</h2>
        <p>
          Watch how top roofing teams prioritize leads, respond faster,
          and close more jobs automatically.
        </p>

        <button className="primaryBtn large">Book Your Demo</button>
      </section>

      {/* OBJECTION HANDLING */}
      <section className="section">
        <h2>Questions teams ask before switching</h2>

        <div className="faq">
          {faqs.map((f, i) => (
            <div key={f.q} className="faqItem">
              <div
                className="faqQ"
                onClick={() =>
                  setOpenFaq(openFaq === i ? null : i)
                }
              >
                {f.q}
                <span>{openFaq === i ? "−" : "+"}</span>
              </div>

              {openFaq === i && <p>{f.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final">
        <h2>Your pipeline, fully optimized.</h2>
        <p>Join roofing teams already closing more jobs with AI.</p>

        <button className="primaryBtn large">Book Free Demo</button>
      </section>

      {/* STYLES */}
      <style jsx>{`
        .page {
          background: #0a0a0f;
          color: white;
          font-family: Inter, sans-serif;
        }

        section {
          padding: 80px 20px;
          max-width: 1100px;
          margin: auto;
        }

        .hero {
          text-align: center;
          padding-top: 120px;
        }

        .badge {
          display: inline-block;
          padding: 8px 14px;
          border: 1px solid #2d2d3a;
          border-radius: 999px;
          color: #9fb3ff;
          margin-bottom: 20px;
        }

        h1 {
          font-size: 52px;
          line-height: 1.1;
        }

        p {
          color: #a1a1aa;
          max-width: 600px;
          margin: 16px auto;
        }

        .ctaRow {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 24px;
          flex-wrap: wrap;
        }

        .primaryBtn {
          background: #4169e1;
          color: white;
          border: none;
          padding: 14px 22px;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 600;
        }

        .primaryBtn:hover {
          background: #6b8ff0;
        }

        .ghostBtn {
          background: transparent;
          border: 1px solid #2d2d3a;
          color: white;
          padding: 14px 22px;
          border-radius: 10px;
        }

        .trust {
          margin-top: 18px;
          font-size: 13px;
          color: #777;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          text-align: center;
        }

        .statCard {
          background: #13131a;
          padding: 20px;
          border-radius: 14px;
          border: 1px solid #222;
        }

        .statCard h2 {
          font-size: 28px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .card {
          background: #13131a;
          padding: 20px;
          border-radius: 14px;
          border: 1px solid #222;
        }

        .ctaBox {
          text-align: center;
          background: #101018;
          border: 1px solid #222;
          border-radius: 16px;
        }

        .faqItem {
          border-top: 1px solid #222;
          padding: 16px 0;
        }

        .faqQ {
          display: flex;
          justify-content: space-between;
          cursor: pointer;
        }

        .final {
          text-align: center;
        }

        .large {
          padding: 18px 26px;
          font-size: 16px;
        }

        @media (max-width: 900px) {
          .stats,
          .grid {
            grid-template-columns: 1fr;
          }

          h1 {
            font-size: 36px;
          }
        }
      `}</style>
    </div>
  );
}