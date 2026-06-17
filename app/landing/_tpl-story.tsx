"use client";

import { LandingExperience } from "./page";
import type { LandingConfig } from "./_variants";

/* ─────────────────────────────────────────────────────────────────────────
   STORY TEMPLATE — config-driven story-led landing (concern → box → proof).

   Same editing model as the PDP template: a marketer edits copy / images /
   links / lists / section order in the variant config (_variants.tsx). Layout,
   color, type, spacing stay locked here. New section? add it + register in
   SECTIONS; 고고 reviews the PR.

   Lime highlight is editable via hero.titleA / hero.highlight / hero.titleB —
   the marketer picks which phrase gets the lumen-lime mark.
   ───────────────────────────────────────────────────────────────────────── */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-body" style={{ color: "var(--color-mid-gray)", fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
      {children}
    </span>
  );
}

function Img({ src, height, label, caption }: { src?: string; height: number; label?: string; caption?: string }) {
  return (
    <div className="w-full">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={label ?? ""} className="w-full rounded-2xl object-cover" style={{ height }} />
      ) : (
        <div className="w-full rounded-2xl flex items-center justify-center" style={{ height, backgroundColor: "#ece9e2" }}>
          <span className="font-body" style={{ color: "#b6b1a6", fontSize: 18, fontWeight: 500 }}>{label ?? "[ photo ]"}</span>
        </div>
      )}
      {caption && <p className="mt-2 text-center font-body" style={{ color: "var(--color-mid-gray)", fontSize: 13, lineHeight: 1.4 }}>{caption}</p>}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0" style={{ marginTop: 1 }}>
      <circle cx="12" cy="12" r="10" fill="var(--color-mirror-cyan)" />
      <path d="M8 12.2l2.6 2.6L16 9.4" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function NumBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="shrink-0 flex items-center justify-center rounded-full font-body text-mid-gray" style={{ width: 28, height: 28, background: "var(--color-canvas)", fontSize: 13, fontWeight: 700, boxShadow: "var(--shadow-input-ring)" }}>
      {children}
    </span>
  );
}

const SECTIONcn = "flex flex-col px-6";

export const STORY_DEFAULT_SECTIONS = [
  "hero", "box", "why", "beforeafter", "tracker", "nobias", "how", "reviews",
];

export const STORY_DEFAULTS = {
  copy: {
    "bar.cta": "Get my routine box",
    "hero.titleA": "Calm your redness —",
    "hero.highlight": "for good",
    "hero.titleB": "this time",
    "hero.sub": "A custom routine — cleanser to SPF — matched to your skin by Seoul experts and shipped to your door.",
    "box.name": "The Redness Routine Box",
    "box.price": "$119",
    "box.badge": "Everything below, in one box",
    "box.anchor": "Five full-size products, matched to your skin — instead of guessing, buying the wrong thing, and starting over.",
    "why.eyebrow": "Why it's truly yours",
    "why.title": "Not an off-the-shelf kit. Built from a real read of your skin.",
    "beforeafter.eyebrow": "Before / after",
    "beforeafter.beforeCap": "Week 1 — redness flare",
    "beforeafter.afterCap": "Week 8 — calmer skin",
    "beforeafter.headline": "Based on real redness-prone customer journeys",
    "tracker.eyebrow": "See it actually working",
    "tracker.title": "Redness score",
    "tracker.range": "Week 1 → Week 8",
    "tracker.caption": "Two minutes a day and your redness stops being a guess — you watch the number fall. The tracker sheet in your box keeps you honest.",
    "nobias.eyebrow": "No brand bias",
    "how.eyebrow": "How it works",
    "reviews.eyebrow": "Reviews",
    "reviews.body": "everything just showed up matched to me — no more cart full of random products. by week 5 my redness score had actually dropped",
    "reviews.who": "verified buyer, Bellevue WA",
  } as Record<string, string>,
  lists: {
    included: [
      { title: "5-step custom routine", sub: "Cleanser, toner, soothing serum, cream & SPF — chosen for your skin" },
      { title: "Expert skin analysis", sub: "Your redness, read by Seoul pros — included, not extra" },
      { title: "Your skin report", sub: "What's actually triggering your redness, explained" },
      { title: "Progress tracker", sub: "Watch your redness score drop, week by week" },
    ],
    whySteps: [
      { t: "Experts read your photos", s: "Seoul pros assess your redness, triggers and skin type" },
      { t: "They design your routine", s: "AM & PM steps built around what your skin actually needs" },
      { t: "They pick every product", s: "No brand quotas — only what fits your skin goes in the box" },
    ],
    trackerBars: [88, 78, 67, 57, 47, 39, 31, 23],
    stats: [
      { big: "682+", sub: "customers analyzed" },
      { big: "$0", sub: "paid by brands to be picked" },
    ],
    howSteps: [
      "Order your box, then snap a quick selfie",
      "We build your soothing routine + report",
      "Log your routine daily and watch redness fade",
    ],
  },
};

type Ctx = {
  c: (k: string) => string;
  img: (k: string) => string | undefined;
  L: typeof STORY_DEFAULTS.lists;
};

const SECTIONS: Record<string, (ctx: Ctx) => React.ReactNode> = {
  hero: ({ c, img }) => (
    <section className={`${SECTIONcn} items-center text-center`} style={{ paddingTop: 112, paddingBottom: 40 }}>
      <h1 className="font-display text-charcoal" style={{ fontSize: "clamp(28px, 7.5vw, 38px)", lineHeight: 1.16, fontWeight: 500, letterSpacing: "-0.015em", maxWidth: 440 }}>
        {c("hero.titleA")}{" "}
        <span className="text-midnight" style={{ background: "var(--color-lumen-lime)", padding: "0 6px", borderRadius: 4 }}>{c("hero.highlight")}</span>{" "}
        {c("hero.titleB")}
      </h1>
      <p className="mt-4 text-mid-gray font-body" style={{ fontSize: 15, lineHeight: 1.55, maxWidth: 350 }}>{c("hero.sub")}</p>
      <div className="mt-7 w-full" style={{ maxWidth: 420 }}>
        <Img src={img("hero")} height={360} label="[ your routine box ]" />
      </div>
    </section>
  ),

  box: ({ c, L }) => (
    <section className={SECTIONcn} style={{ paddingTop: 8, paddingBottom: 36 }}>
      <div className="rounded-2xl bg-white" style={{ padding: 22, boxShadow: "var(--shadow-card)" }}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="font-body text-charcoal" style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.3 }}>{c("box.name")}</div>
            <div className="font-body text-charcoal" style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.05, marginTop: 2 }}>{c("box.price")}</div>
          </div>
          <span className="font-body" style={{ background: "var(--color-mirror-cyan-subtle)", color: "#111111", fontSize: 12.5, fontWeight: 600, lineHeight: 1.35, padding: "8px 12px", borderRadius: 10, maxWidth: 150, textAlign: "right" }}>{c("box.badge")}</span>
        </div>
        <ul className="mt-5 flex flex-col" style={{ gap: 14 }}>
          {L.included.map((it, i) => (
            <li key={it.title + i} className="flex items-start" style={{ gap: 11 }}>
              <CheckIcon />
              <div>
                <div className="font-body text-charcoal" style={{ fontSize: 14.5, fontWeight: 600, lineHeight: 1.3 }}>{it.title}</div>
                <div className="font-body text-mid-gray" style={{ fontSize: 13, lineHeight: 1.45, marginTop: 1 }}>{it.sub}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-4 px-1 font-body text-mid-gray" style={{ fontSize: 13.5, lineHeight: 1.5 }}>{c("box.anchor")}</p>
    </section>
  ),

  why: ({ c, L }) => (
    <section className={SECTIONcn} style={{ paddingTop: 36, paddingBottom: 36 }}>
      <Eyebrow>{c("why.eyebrow")}</Eyebrow>
      <p className="mt-3 font-display text-charcoal" style={{ fontSize: 23, fontWeight: 500, lineHeight: 1.25, maxWidth: 380 }}>{c("why.title")}</p>
      <div className="mt-5 flex flex-col" style={{ gap: 16 }}>
        {L.whySteps.map((b, i) => (
          <div key={b.t + i} className="flex items-start" style={{ gap: 13 }}>
            <NumBadge>{i + 1}</NumBadge>
            <div>
              <div className="font-body text-charcoal" style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.3 }}>{b.t}</div>
              <div className="font-body text-mid-gray" style={{ fontSize: 13, lineHeight: 1.45, marginTop: 1 }}>{b.s}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  ),

  beforeafter: ({ c, img }) => (
    <section className={SECTIONcn} style={{ paddingTop: 36, paddingBottom: 36 }}>
      <Eyebrow>{c("beforeafter.eyebrow")}</Eyebrow>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <Img src={img("beforeafter.before")} height={150} caption={c("beforeafter.beforeCap")} />
        <Img src={img("beforeafter.after")} height={150} caption={c("beforeafter.afterCap")} />
      </div>
      <p className="mt-5 text-center font-display text-charcoal" style={{ fontSize: 21, fontWeight: 500, lineHeight: 1.25 }}>{c("beforeafter.headline")}</p>
    </section>
  ),

  tracker: ({ c, L }) => (
    <section className={SECTIONcn} style={{ paddingTop: 36, paddingBottom: 36 }}>
      <Eyebrow>{c("tracker.eyebrow")}</Eyebrow>
      <div className="mt-4 rounded-2xl bg-white" style={{ padding: 20, boxShadow: "var(--shadow-card)" }}>
        <div className="flex items-baseline justify-between">
          <span className="font-display text-charcoal" style={{ fontSize: 22, fontWeight: 500 }}>{c("tracker.title")}</span>
          <span className="font-body text-mid-gray" style={{ fontSize: 13, fontWeight: 500 }}>{c("tracker.range")}</span>
        </div>
        <div className="mt-5 flex items-end justify-between" style={{ height: 96, gap: 8 }}>
          {L.trackerBars.map((h, i) => (
            <div key={i} className="flex-1 rounded-t-md" style={{ height: `${h}%`, background: i === L.trackerBars.length - 1 ? "var(--color-mirror-cyan)" : "#d9d6cf" }} />
          ))}
        </div>
        <p className="mt-4 font-body text-mid-gray" style={{ fontSize: 13, lineHeight: 1.5 }}>{c("tracker.caption")}</p>
      </div>
    </section>
  ),

  nobias: ({ c, L }) => (
    <section className={SECTIONcn} style={{ paddingTop: 36, paddingBottom: 36 }}>
      <Eyebrow>{c("nobias.eyebrow")}</Eyebrow>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {L.stats.map((s, i) => (
          <div key={s.sub + i} className="flex flex-col items-center text-center rounded-2xl bg-white" style={{ padding: "24px 14px", boxShadow: "var(--shadow-card)" }}>
            <div className="font-display text-charcoal" style={{ fontSize: 30, fontWeight: 500, lineHeight: 1 }}>{s.big}</div>
            <div className="mt-2 font-body text-mid-gray" style={{ fontSize: 12.5, lineHeight: 1.4 }}>{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  ),

  how: ({ c, L }) => (
    <section className={SECTIONcn} style={{ paddingTop: 36, paddingBottom: 36 }}>
      <Eyebrow>{c("how.eyebrow")}</Eyebrow>
      <ol className="mt-4 flex flex-col" style={{ gap: 18 }}>
        {L.howSteps.map((s, i) => (
          <li key={i} className="flex items-center" style={{ gap: 14 }}>
            <NumBadge>{i + 1}</NumBadge>
            <span className="font-body text-charcoal" style={{ fontSize: 15, lineHeight: 1.4 }}>{s}</span>
          </li>
        ))}
      </ol>
    </section>
  ),

  reviews: ({ c }) => (
    <section className={SECTIONcn} style={{ paddingTop: 36, paddingBottom: 56 }}>
      <Eyebrow>{c("reviews.eyebrow")}</Eyebrow>
      <div className="mt-4 rounded-2xl bg-white" style={{ padding: 22, boxShadow: "var(--shadow-card)" }}>
        <p className="font-body text-charcoal" style={{ fontSize: 16, lineHeight: 1.55 }}>&ldquo;{c("reviews.body")}&rdquo;</p>
        <p className="mt-4 font-body text-mid-gray" style={{ fontSize: 13 }}>— {c("reviews.who")}</p>
      </div>
    </section>
  ),
};

export default function StoryTemplate({ config }: { config: LandingConfig }) {
  const copy = { ...STORY_DEFAULTS.copy, ...(config.copy || {}) };
  const c = (k: string) => copy[k] ?? "";
  const images = config.images || {};
  const img = (k: string) => images[k];
  const L = { ...STORY_DEFAULTS.lists, ...(config.lists || {}) } as typeof STORY_DEFAULTS.lists;
  const order = config.sections && config.sections.length ? config.sections : STORY_DEFAULT_SECTIONS;
  const ctx: Ctx = { c, img, L };

  return (
    <LandingExperience copy={{ "bar.cta": c("bar.cta") }}>
      {order.map((key) => {
        const S = SECTIONS[key];
        return S ? <S key={key} {...ctx} /> : null;
      })}
    </LandingExperience>
  );
}
