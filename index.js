// index.js – NorthSky landing page interactions
(function() {
  "use strict";

  // ------------------------------
  // SCROLL REVEAL ANIMATIONS
  // ------------------------------
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll("[data-reveal]").forEach((el, idx) => {
    // Staggered delay (optional)
    el.style.transitionDelay = `${(idx % 4) * 60}ms`;
    revealObserver.observe(el);
  });

  // ------------------------------
  // STATISTICS NUMBER COUNTERS
  // ------------------------------
  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.getAttribute("data-count"));
          const suffix = el.getAttribute("data-suffix") || "";
          const prefix = el.getAttribute("data-prefix") || "";
          const display = el.getAttribute("data-display");

          // Static value (no animation)
          if (display) {
            countObserver.unobserve(el);
            return;
          }

          const duration = 1600;
          const startTime = performance.now();

          function animate(now) {
            const p = Math.min((now - startTime) / duration, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            const current = Math.round(ease * target);
            el.textContent = prefix + current + suffix;
            if (p < 1) requestAnimationFrame(animate);
          }
          requestAnimationFrame(animate);
          countObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll("[data-count]").forEach((el) => {
    countObserver.observe(el);
  });

  // ------------------------------
  // HERO DASHBOARD COUNTERS
  // ------------------------------
  function runHeroCounter(id, target, suffix, duration = 1800, delay = 800) {
    const el = document.getElementById(id);
    if (!el) return;
    setTimeout(() => {
      const start = performance.now();
      function step(now) {
        const p = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        const value = Math.round(ease * target);
        el.textContent = value + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }, delay);
  }

  runHeroCounter("counter-close", 41, "%", 1800, 800);
  runHeroCounter("counter-leads", 127, "", 1400, 800);

  // ------------------------------
  // FEATURE TABS (AI Lead Scoring, Storm Intelligence, CRM Auto-Sync)
  // ------------------------------
  function switchFeat(index) {
    const features = document.querySelectorAll(".feat");
    const panels = document.querySelectorAll(".preview-panel");
    if (!features.length || !panels.length) return;

    features.forEach((feat) => feat.classList.remove("active"));
    panels.forEach((panel) => panel.classList.remove("active"));

    const targetFeat = document.querySelector(`.feat[data-feat="${index}"]`);
    const targetPanel = document.getElementById(`feat-${index}`);
    if (targetFeat) targetFeat.classList.add("active");
    if (targetPanel) targetPanel.classList.add("active");
  }

  // Attach click handlers to feature items
  document.querySelectorAll(".feat").forEach((feat) => {
    const idx = feat.getAttribute("data-feat");
    if (idx !== null && !feat.hasAttribute("data-listener")) {
      feat.setAttribute("data-listener", "true");
      feat.addEventListener("click", () => switchFeat(parseInt(idx)));
    }
  });

  // ------------------------------
  // FAQ TOGGLE (Accordion)
  // ------------------------------
  function toggleFaq(btn) {
    const item = btn.closest(".faq-item");
    if (!item) return;
    const isOpen = item.classList.contains("open");

    // Close all other FAQ items
    document.querySelectorAll(".faq-item.open").forEach((faq) => {
      faq.classList.remove("open");
    });

    // Open the clicked one if it was closed
    if (!isOpen) item.classList.add("open");
  }

  // Attach listeners to all FAQ buttons
  document.querySelectorAll(".faq-btn").forEach((btn) => {
    if (!btn.hasAttribute("data-faq-listener")) {
      btn.setAttribute("data-faq-listener", "true");
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        toggleFaq(btn);
      });
    }
  });

  // Ensure at least one FAQ is open (first one by default)
  if (!document.querySelector(".faq-item.open")) {
    const firstFaq = document.querySelector(".faq-item");
    if (firstFaq) firstFaq.classList.add("open");
  }

  // ------------------------------
  // SMOOTH SCROLL FOR INTERNAL LINKS
  // ------------------------------
  // Handle "See how it works" button
  const seeHowBtn = document.querySelector(".btn-outline");
  if (seeHowBtn) {
    seeHowBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const featuresSection = document.getElementById("features");
      if (featuresSection) featuresSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  // Handle all anchor links with hash (#)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function(e) {
      const targetId = this.getAttribute("href").slice(1);
      if (targetId && document.getElementById(targetId)) {
        e.preventDefault();
        document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // ------------------------------
  // DEMO BUTTON HANDLER (Redirect to your backend booking page)
  // ------------------------------
  const DEMO_URL = "https://exchange-8gxt.onrender.com";

  function openDemo() {
    window.open(DEMO_URL, "_blank");
  }

  // Attach to all demo trigger buttons (primary, white, nav-cta)
  const demoButtons = document.querySelectorAll(".btn-primary, .btn-white, .nav-cta");
  demoButtons.forEach((btn) => {
    if (!btn.hasAttribute("data-demo-listener")) {
      btn.setAttribute("data-demo-listener", "true");
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        openDemo();
      });
    }
  });
})();