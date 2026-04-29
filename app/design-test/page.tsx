"use client";

import { useState } from "react";

export default function DesignTest() {
  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);

  return (
    <main className="min-h-screen bg-white">
      {/* ─── Nav ─── */}
      <nav className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-[rgba(34,42,53,0.08)]">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-display text-xl font-medium text-charcoal tracking-tight">
            8mirrors
          </div>
          <div className="flex items-center gap-8">
            <a
              href="#"
              className="text-sm font-medium text-midnight relative after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-0.5 after:bg-mirror-cyan"
            >
              Home
            </a>
            <a href="#" className="text-sm font-medium text-midnight hover:text-mirror-cyan-hover">
              Features
            </a>
            <a href="#" className="text-sm font-medium text-midnight hover:text-mirror-cyan-hover">
              Pricing
            </a>
            <button
              className="px-5 py-2.5 rounded-lg text-sm font-medium text-midnight transition-colors"
              style={{ backgroundColor: "var(--color-mirror-cyan)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--color-mirror-cyan-hover)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--color-mirror-cyan)")
              }
            >
              Get started
            </button>
          </div>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="max-w-[1200px] mx-auto px-6 pt-24 pb-24 text-center">
        <h1
          className="font-display text-charcoal mx-auto max-w-4xl"
          style={{
            fontSize: "clamp(40px, 7vw, 72px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            fontWeight: 400,
          }}
        >
          A quiet mirror for{" "}
          <span
            className="inline-block px-2 text-midnight"
            style={{ backgroundColor: "var(--color-lumen-lime)" }}
          >
            self-reflection
          </span>{" "}
          in your daily routine.
        </h1>

        <p className="mt-8 text-lg text-mid-gray max-w-2xl mx-auto" style={{ lineHeight: 1.55 }}>
          8mirrors helps you notice patterns, not chase metrics. A calm, editorial
          space for quiet observation — one thought at a time.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            className="px-6 py-3 rounded-lg text-sm font-medium text-midnight transition-colors"
            style={{ backgroundColor: "var(--color-mirror-cyan)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--color-mirror-cyan-hover)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--color-mirror-cyan)")
            }
          >
            Start reflecting
          </button>
          <button className="px-6 py-3 rounded-lg text-sm font-medium text-charcoal bg-white" style={{ boxShadow: "var(--shadow-card)" }}>
            View demo
          </button>
        </div>
      </section>

      {/* ─── Feature cards ─── */}
      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <h2
          className="font-display text-charcoal text-center mb-16"
          style={{
            fontSize: "48px",
            lineHeight: 1.1,
            letterSpacing: "-0.015em",
            fontWeight: 400,
          }}
        >
          Three ways to look inward
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              tag: "Daily",
              title: "Morning prompts",
              body: "One question a day. No streaks, no gamification. Just a small mirror held up each morning.",
            },
            {
              tag: "Weekly",
              title: "Pattern reviews",
              body: "See what themes recurred this week. Your own words, organized into quiet patterns.",
              highlight: true,
            },
            {
              tag: "Monthly",
              title: "Private archives",
              body: "An editorial-style summary of your month. Readable like a magazine, not a dashboard.",
            },
          ].map((card) => (
            <article
              key={card.title}
              className="bg-white rounded-2xl p-6"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <span
                className="inline-block rounded-full px-3 py-1 text-xs font-medium text-midnight mb-5"
                style={{
                  backgroundColor: card.highlight
                    ? "var(--color-lumen-lime)"
                    : "var(--color-mirror-cyan-subtle)",
                }}
              >
                {card.tag}
              </span>
              <h3
                className="font-display text-charcoal mb-3"
                style={{
                  fontSize: "24px",
                  lineHeight: 1.2,
                  letterSpacing: "-0.005em",
                  fontWeight: 500,
                }}
              >
                {card.title}
              </h3>
              <p className="text-base text-mid-gray" style={{ lineHeight: 1.6 }}>
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ─── Form sample ─── */}
      <section className="bg-canvas py-24">
        <div className="max-w-[560px] mx-auto px-6">
          <h2
            className="font-display text-charcoal text-center mb-3"
            style={{
              fontSize: "32px",
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              fontWeight: 500,
            }}
          >
            Join the waitlist
          </h2>
          <p className="text-center text-mid-gray mb-10" style={{ lineHeight: 1.55 }}>
            We&apos;ll send one quiet email when we&apos;re ready.
          </p>

          <form
            className="bg-white rounded-2xl p-8"
            style={{ boxShadow: "var(--shadow-card)" }}
            onSubmit={(e) => e.preventDefault()}
          >
            <label
              htmlFor="email"
              className="block text-sm font-medium text-charcoal mb-2"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="you@example.com"
              className="w-full rounded-lg px-3 py-3 text-charcoal text-base bg-white outline-none transition-shadow"
              style={{
                boxShadow: focused
                  ? "0 0 0 2px rgba(98, 216, 244, 0.5), var(--shadow-input-ring)"
                  : "var(--shadow-input-ring)",
              }}
            />

            <button
              type="submit"
              className="mt-6 w-full py-3 rounded-lg text-sm font-medium text-midnight transition-colors"
              style={{ backgroundColor: "var(--color-mirror-cyan)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--color-mirror-cyan-hover)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--color-mirror-cyan)")
              }
            >
              Reserve my spot
            </button>

            <p className="mt-4 text-xs text-mid-gray text-center">
              No spam. Unsubscribe any time.
            </p>
          </form>
        </div>
      </section>

      <footer className="max-w-[1200px] mx-auto px-6 py-12 text-center text-sm text-mid-gray">
        © 2026 8mirrors · DESIGN.md test page
      </footer>
    </main>
  );
}
