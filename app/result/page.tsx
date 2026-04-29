"use client";

import { useState, useEffect } from "react";

// ─── Sandbox stub data ─────────────────────────────────────────
// In production these come from the diagnosis pipeline. Hardcoded
// here so the page renders standalone in the sandbox.

const SPECTRUM = [
  { label: "Hydration", value: 0.4 },
  { label: "Oil balance", value: 0.55 },
  { label: "Sensitivity", value: 0.35 },
  { label: "Tone evenness", value: 0.5 },
];

const TOP_CONCERNS = [
  "Dehydration around the eye area",
  "Uneven texture on the cheeks",
  "Early signs of pigmentation",
];

const LOCKED_INSIGHTS = [
  { id: "hydration", title: "Hydration depth", subtitle: "Layer-by-layer moisture map" },
  { id: "sebum", title: "Sebum balance", subtitle: "Where you produce more, where less" },
  { id: "texture", title: "Texture analysis", subtitle: "Smoothness and microscarring" },
  { id: "pores", title: "Pore distribution", subtitle: "Visible pores and clarity zones" },
  { id: "sensitivity", title: "Sensitivity profile", subtitle: "Reactivity and barrier health" },
  { id: "aging", title: "Aging signals", subtitle: "Fine lines and elasticity trend" },
  { id: "pigmentation", title: "Pigmentation map", subtitle: "Spot patterns and depth" },
];

export default function ResultPage() {
  const [showSticky, setShowSticky] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Sticky CTA reveals once user scrolls past the hero/spectrum block.
  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 360);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openCheckout = () => setModalOpen(true);

  return (
    <main className="min-h-screen bg-canvas">
      {/* ─── Top bar ─── */}
      <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm">
        <div className="max-w-[480px] mx-auto px-5 h-14 flex items-center">
          <div className="font-display text-base font-medium text-charcoal tracking-tight">
            8mirrors
          </div>
        </div>
      </header>

      {/* ─── Mobile container ─── */}
      <div className="max-w-[480px] mx-auto px-5 pb-40">
        {/* Hero */}
        <section className="pt-10 pb-7 text-center">
          <p className="text-xs font-medium text-mid-gray uppercase tracking-wider mb-3">
            Your free analysis
          </p>
          <h1
            className="font-display text-charcoal"
            style={{
              fontSize: "clamp(30px, 8vw, 40px)",
              lineHeight: 1.12,
              letterSpacing: "-0.015em",
              fontWeight: 400,
            }}
          >
            Resilient combination —{" "}
            <span
              className="inline-block px-1.5 text-midnight"
              style={{ backgroundColor: "var(--color-lumen-lime)" }}
            >
              leaning slightly dry
            </span>
          </h1>
          <p className="mt-4 text-sm text-mid-gray" style={{ lineHeight: 1.6 }}>
            Based on your three photos and your intake answers.
          </p>
        </section>

        {/* Skin spectrum */}
        <section
          className="bg-white rounded-2xl p-6 mb-7"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <h2 className="text-xs font-medium text-mid-gray uppercase tracking-wider mb-5">
            Your skin spectrum
          </h2>

          <div className="space-y-4">
            {SPECTRUM.map((row) => (
              <div key={row.label}>
                <div className="flex justify-between text-xs text-charcoal mb-1.5">
                  <span className="font-medium">{row.label}</span>
                  <span className="text-mid-gray">{Math.round(row.value * 100)}</span>
                </div>
                <div
                  className="h-1.5 rounded-full overflow-hidden"
                  style={{ backgroundColor: "rgba(34, 42, 53, 0.06)" }}
                >
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${row.value * 100}%`,
                      backgroundColor: "var(--color-mirror-cyan)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Top 3 concerns */}
        <section className="mb-9">
          <h2 className="text-xs font-medium text-mid-gray uppercase tracking-wider mb-3">
            Your top 3 concerns
          </h2>
          <div className="space-y-2">
            {TOP_CONCERNS.map((kw, i) => (
              <div
                key={kw}
                className="bg-white rounded-xl px-4 py-3.5 flex items-center"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <span
                  className="font-display text-charcoal text-sm font-medium mr-3.5 shrink-0"
                  style={{ minWidth: "1.5rem" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-charcoal" style={{ lineHeight: 1.5 }}>
                  {kw}
                </span>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() =>
              alert("In production this opens the detailed explanation page.")
            }
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-charcoal underline-offset-4 hover:underline"
          >
            See detailed explanation
            <ArrowIcon />
          </button>
        </section>

        {/* Sumin's note before locked section */}
        <section className="mb-5">
          <div className="flex items-start gap-3 px-1">
            <div
              className="shrink-0 w-9 h-9 rounded-full bg-white flex items-center justify-center text-[11px] font-semibold text-charcoal"
              style={{ boxShadow: "var(--shadow-input-ring)" }}
            >
              SH
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-charcoal mb-1">
                A note from Sumin
              </p>
              <p className="text-sm text-mid-gray" style={{ lineHeight: 1.55 }}>
                The free analysis is the surface. Your full report goes deeper —
                I review it personally and add what photos alone can&apos;t show.
              </p>
            </div>
          </div>
        </section>

        {/* Locked insights */}
        <section>
          <h2 className="text-xs font-medium text-mid-gray uppercase tracking-wider mb-3">
            7 more insights in your full report
          </h2>

          <div className="grid grid-cols-1 gap-3">
            {LOCKED_INSIGHTS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={openCheckout}
                className="relative text-left bg-white rounded-2xl p-5 transition-transform active:scale-[0.985] focus-visible:outline-none"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                {/* Blurred preview content */}
                <div
                  className="opacity-30 pointer-events-none select-none"
                  style={{ filter: "blur(2.5px)" }}
                >
                  <h3
                    className="font-display text-charcoal mb-1"
                    style={{ fontSize: "20px", lineHeight: 1.2, fontWeight: 500 }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-mid-gray">{item.subtitle}</p>
                  <div
                    className="mt-3 h-1.5 rounded-full overflow-hidden"
                    style={{ backgroundColor: "rgba(34, 42, 53, 0.06)" }}
                  >
                    <div
                      className="h-full"
                      style={{ width: "65%", backgroundColor: "rgba(36, 36, 36, 0.4)" }}
                    />
                  </div>
                </div>

                {/* Lock overlay pill */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="bg-white rounded-full px-3.5 py-1.5 inline-flex items-center gap-1.5 text-[11px] font-medium text-charcoal"
                    style={{ boxShadow: "var(--shadow-card)" }}
                  >
                    <LockIcon />
                    Included in your full report
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* ─── Sticky CTA ─── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-20 px-5 pb-5 pt-10 transition-opacity duration-300"
        style={{
          opacity: showSticky ? 1 : 0,
          pointerEvents: showSticky ? "auto" : "none",
          background:
            "linear-gradient(to top, rgba(247,247,247,1) 35%, rgba(247,247,247,0))",
        }}
      >
        <div className="max-w-[480px] mx-auto">
          <button
            type="button"
            onClick={openCheckout}
            className="w-full py-4 rounded-2xl text-sm font-medium text-midnight transition-colors"
            style={{ backgroundColor: "var(--color-mirror-cyan)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--color-mirror-cyan-hover)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--color-mirror-cyan)")
            }
          >
            Get your full report — $99.90
          </button>
          <p className="text-center text-[11px] text-mid-gray mt-2.5">
            One-time. Reviewed personally by Sumin.
          </p>
        </div>
      </div>

      {/* ─── Bottom-sheet modal (checkout stub) ─── */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-30 flex items-end justify-center"
          style={{
            backgroundColor: "rgba(17, 17, 17, 0.32)",
            animation: "fadeIn 200ms ease-out",
          }}
          onClick={() => setModalOpen(false)}
        >
          <div
            className="w-full max-w-[480px] bg-white rounded-t-3xl px-6 pt-6 pb-9"
            style={{ animation: "slideUp 280ms cubic-bezier(0.4, 0, 0.2, 1)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-10 h-1 rounded-full mx-auto mb-6"
              style={{ backgroundColor: "rgba(34, 42, 53, 0.12)" }}
            />
            <h3
              className="font-display text-charcoal mb-3"
              style={{ fontSize: "24px", lineHeight: 1.2, fontWeight: 500 }}
            >
              Continue to full report
            </h3>
            <p className="text-sm text-mid-gray mb-7" style={{ lineHeight: 1.6 }}>
              In the real flow this opens checkout (Pencil node{" "}
              <code className="text-charcoal text-[12px]">8ouK3</code>). Sandbox
              stub — no payment is taken.
            </p>
            <button
              type="button"
              className="w-full py-3.5 rounded-xl text-sm font-medium text-midnight transition-colors"
              style={{ backgroundColor: "var(--color-mirror-cyan)" }}
              onClick={() => setModalOpen(false)}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--color-mirror-cyan-hover)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--color-mirror-cyan)")
              }
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

// ─── Icons ─────────────────────────────────────────────────────

function LockIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
