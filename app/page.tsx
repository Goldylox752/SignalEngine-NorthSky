"use client";

import { useEffect, useRef, useState } from "react";

/* -----------------------------
   MAIN PAGE
------------------------------*/
export default function Page() {
  const [leads, setLeads] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const cursor = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  /* -----------------------------
     CURSOR EFFECT
  ------------------------------*/
  useEffect(() => {
    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const animate = () => {
      if (cursor.current && ring.current) {
        cursor.current.style.transform = `translate(${mx}px, ${my}px)`;

        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;

        ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", move);
    animate();

    return () => window.removeEventListener("mousemove", move);
  }, []);

  /* -----------------------------
     HERO ANIMATION
  ------------------------------*/
  useEffect(() => {
    const t = setTimeout(() => setLeads(24), 500);
    return () => clearTimeout(t);
  }, []);

  /* -----------------------------
     STRIPE CHECKOUT
  ------------------------------*/
  async function checkout(priceId: string) {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId }),
    });

    const data = await res.json();
    if (data.url) window.location.href = data.url;
  }

  /* -----------------------------
     DEMO SUBMIT
  ------------------------------*/
  async function submitDemo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      company: form.get("company"),
    };

    await fetch("/api/demo-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setModalOpen(false);
    alert("Request submitted");
  }

  return (
    <main className="bg-[#060A14] text-white overflow-x-hidden">

      {/* CURSOR */}
      <div ref={cursor} className="fixed w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-[9999]" />
      <div ref={ring} className="fixed w-8 h-8 border border-cyan-400/40 rounded-full pointer-events-none z-[9998]" />

      {/* NAV */}
      <nav className="fixed top-0 w-full flex justify-between items-center px-8 h-[70px] bg-black/40 backdrop-blur border-b border-white/10 z-50">
        <div className="font-bold tracking-widest text-lg">
          NORTH<span className="text-cyan-400">SKY</span>
        </div>

        <div className="hidden md:flex gap-8 text-sm text-gray-400">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="bg-cyan-400 text-black px-4 py-2 text-sm font-bold"
        >
          Request Demo
        </button>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex flex-col md:flex-row items-center justify-between px-8 pt-28 max-w-6xl mx-auto">
        <div className="max-w-xl">
          <div className="text-cyan-400 text-xs uppercase tracking-widest mb-4">
            Live pipeline intelligence
          </div>

          <h1 className="text-6xl md:text-7xl font-bold leading-[0.95]">
            CLOSE MORE<br />
            ROOFING<br />
            <span className="text-transparent stroke-white [-webkit-text-stroke:2px_white]">
              DEALS
            </span>
          </h1>

          <p className="text-gray-400 mt-6 leading-relaxed">
            Real-time roofing lead intelligence that helps teams respond faster,
            qualify smarter, and close more jobs.
          </p>

          <div className="flex gap-3 mt-8">
            <button
              onClick={() => setModalOpen(true)}
              className="bg-cyan-400 text-black px-6 py-3 font-bold"
            >
              Get Access
            </button>

            <a
              href="#pricing"
              className="border border-white/20 px-6 py-3 text-gray-300"
            >
              View Pricing
            </a>
          </div>

          <div className="mt-10 text-sm text-gray-400">
            <span className="text-yellow-400">★★★★★</span>{" "}
            Trusted by <strong className="text-white">200+ teams</strong>
          </div>
        </div>

        {/* DASHBOARD */}
        <div className="mt-16 md:mt-0 w-full md:w-[420px] bg-[#0C1220] border border-white/10 rounded-xl p-5">
          <div className="flex justify-between text-xs text-gray-400 mb-4">
            <span>NorthSky Live</span>
            <span className="text-green-400">● LIVE</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-[#111827] p-3 rounded">
              <div className="text-cyan-400 text-xl font-bold">{leads}</div>
              <div className="text-xs text-gray-400">Leads</div>
            </div>

            <div className="bg-[#111827] p-3 rounded">
              <div className="text-cyan-400 text-xl font-bold">34%</div>
              <div className="text-xs text-gray-400">Conv</div>
            </div>

            <div className="bg-[#111827] p-3 rounded">
              <div className="text-cyan-400 text-xl font-bold">$186k</div>
              <div className="text-xs text-gray-400">Pipeline</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-8 py-24 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-10">Everything you need</h2>

        <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-300">
          <div className="p-6 bg-white/5 border border-white/10">
            AI Lead Scoring
          </div>
          <div className="p-6 bg-white/5 border border-white/10">
            Territory Intelligence
          </div>
          <div className="p-6 bg-white/5 border border-white/10">
            CRM Sync
          </div>
          <div className="p-6 bg-white/5 border border-white/10">
            Real-time Alerts
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="px-8 py-24 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-10">Pricing</h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="border border-white/10 p-6 bg-white/5">
            <h3 className="font-bold">Starter</h3>
            <p className="text-cyan-400 text-3xl mt-2">$297</p>
            <button
              onClick={() => checkout("price_starter")}
              className="mt-6 w-full bg-white text-black py-2 font-bold"
            >
              Start
            </button>
          </div>

          <div className="border border-cyan-400 p-6 bg-white/5">
            <h3 className="font-bold">Pro</h3>
            <p className="text-cyan-400 text-3xl mt-2">$697</p>
            <button
              onClick={() => checkout("price_pro")}
              className="mt-6 w-full bg-cyan-400 text-black py-2 font-bold"
            >
              Start Trial
            </button>
          </div>

          <div className="border border-white/10 p-6 bg-white/5">
            <h3 className="font-bold">Enterprise</h3>
            <p className="text-gray-400 text-xl mt-2">Custom</p>
            <button
              onClick={() => setModalOpen(true)}
              className="mt-6 w-full border border-white/20 py-2"
            >
              Contact
            </button>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-24 px-8">
        <h2 className="text-5xl font-bold">Your pipeline, fully loaded</h2>
        <p className="text-gray-400 mt-4">
          Join roofing teams closing more with NorthSky
        </p>

        <button
          onClick={() => setModalOpen(true)}
          className="mt-8 bg-cyan-400 text-black px-8 py-3 font-bold"
        >
          Request Demo
        </button>
      </section>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#0C1220] p-8 w-full max-w-md border border-white/10">
            <h3 className="text-xl font-bold mb-4">Request Demo</h3>

            <form onSubmit={submitDemo} className="flex flex-col gap-3">
              <input name="name" placeholder="Name" className="p-2 bg-black/30" />
              <input name="email" placeholder="Email" className="p-2 bg-black/30" />
              <input name="company" placeholder="Company" className="p-2 bg-black/30" />

              <button className="bg-cyan-400 text-black py-2 font-bold">
                Submit
              </button>
            </form>

            <button
              onClick={() => setModalOpen(false)}
              className="mt-4 text-gray-400 text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}