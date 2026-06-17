"use client";

import { useRef, useState } from "react";
import { LandingExperience } from "./page";
import type { LandingConfig } from "./_variants";

/* ─────────────────────────────────────────────────────────────────────────
   PDP TEMPLATE — config-driven product-detail page.

   Everything a marketer touches lives in the variant config (see _variants.tsx):
     • copy   — every text string (key → text)
     • images — every photo slot (key → /path.jpg); empty = placeholder
     • links  — CTA destination
     • lists  — repeatable content (benefits, products, reviews, faq, stats…)
     • sections — which blocks show, in what order (reorder / remove)

   Layout, color, type, spacing, shadows = locked in this file (design judgment).
   Need a brand-NEW section? Add a component below + register it in SECTIONS,
   then list its key in the variant's `sections`. 고고 reviews the PR.
   ───────────────────────────────────────────────────────────────────────── */

/* ── locked design atoms ── */

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
          <span className="font-body" style={{ color: "#b6b1a6", fontSize: 16, fontWeight: 500 }}>{label ?? "[ photo ]"}</span>
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

function Stars() {
  return <span aria-hidden style={{ color: "#111111", fontSize: 13, letterSpacing: "1px" }}>★★★★★</span>;
}

function VerifiedIcon() {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
      <circle cx="12" cy="12" r="9" fill="var(--color-mirror-cyan)" />
      <path d="M8.4 12.2l2.4 2.4 4.8-5" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GuaranteeIcon() {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
      <path d="M12 3l7 2.5v5c0 4.2-2.9 7.6-7 8.5-4.1-.9-7-4.3-7-8.5v-5L12 3Z" stroke="#62d8f4" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke="#62d8f4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CtaButton({ href = "#", children }: { href?: string; children: React.ReactNode }) {
  return (
    <a href={href} className="flex w-full items-center justify-center rounded-lg text-midnight font-body" style={{ background: "var(--color-mirror-cyan)", padding: "15px 22px", fontSize: 16, fontWeight: 700 }}>
      {children}
    </a>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s ease" }}>
      <path d="M6 9l6 6 6-6" stroke="#9a9a93" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Accordion({ title, defaultOpen = false, children }: { title: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ boxShadow: "inset 0 1px 0 #e7e4dd" }}>
      <button type="button" onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between" style={{ padding: "16px 2px", gap: 12 }}>
        <span className="font-body text-charcoal text-left" style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.35 }}>{title}</span>
        <Chevron open={open} />
      </button>
      {open && <div className="font-body text-mid-gray" style={{ fontSize: 14, lineHeight: 1.55, paddingBottom: 18, paddingRight: 24 }}>{children}</div>}
    </div>
  );
}

/* swipeable image gallery + dots + tappable thumbnails (Sephora/Ulta pattern) */
function HeroGallery({ slides, img }: { slides: string[]; img: (k: string) => string | undefined }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const go = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const ch = el.children[i] as HTMLElement | undefined;
    if (ch) el.scrollTo({ left: ch.offsetLeft - (el.clientWidth - ch.offsetWidth) / 2, behavior: "smooth" });
  };
  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    let idx = 0, best = Infinity;
    Array.from(el.children).forEach((ch, i) => {
      const c = (ch as HTMLElement).offsetLeft + (ch as HTMLElement).offsetWidth / 2;
      const d = Math.abs(c - center);
      if (d < best) { best = d; idx = i; }
    });
    setActive(idx);
  };
  return (
    <div>
      <div ref={ref} onScroll={onScroll} className="flex overflow-x-auto no-scrollbar" style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none", msOverflowStyle: "none", gap: 12 }}>
        {slides.map((label, i) => (
          <div key={i} className="shrink-0" style={{ width: "85%", scrollSnapAlign: "center" }}>
            {img(`gallery.${i}`) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={img(`gallery.${i}`)} alt={label} className="w-full rounded-2xl object-cover" style={{ height: 360 }} />
            ) : (
              <div className="w-full rounded-2xl flex items-center justify-center" style={{ height: 360, backgroundColor: "#ece9e2" }}>
                <span className="font-body" style={{ color: "#b6b1a6", fontSize: 16, fontWeight: 500 }}>[ {label} ]</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-center" style={{ gap: 6 }}>
        {slides.map((_, i) => (
          <span key={i} className="rounded-full" style={{ width: i === active ? 18 : 6, height: 6, background: i === active ? "#242424" : "#d9d6cf", transition: "width 0.2s ease, background 0.2s ease" }} />
        ))}
      </div>
      <div className="mt-3 grid gap-1.5" style={{ gridTemplateColumns: `repeat(${slides.length}, minmax(0, 1fr))` }}>
        {slides.map((label, i) => (
          <button key={i} type="button" onClick={() => go(i)} className="rounded-lg flex items-center justify-center overflow-hidden" style={{ aspectRatio: "1 / 1", backgroundColor: "#ece9e2", boxShadow: i === active ? "0 0 0 2px var(--color-mirror-cyan)" : undefined }}>
            {img(`gallery.${i}`) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={img(`gallery.${i}`)} alt={label} className="h-full w-full object-cover" />
            ) : (
              <span className="font-body" style={{ color: "#b6b1a6", fontSize: 8.5, fontWeight: 600, textAlign: "center", lineHeight: 1.1, padding: "0 2px" }}>{label}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

/* full-bleed media cards (image/video bg) + dots — for "How to use" */
function HowToCarousel({ items, img }: { items: { title: string; body: string }[]; img: (k: string) => string | undefined }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    let idx = 0, best = Infinity;
    Array.from(el.children).forEach((ch, i) => {
      const c = (ch as HTMLElement).offsetLeft + (ch as HTMLElement).offsetWidth / 2;
      const d = Math.abs(c - center);
      if (d < best) { best = d; idx = i; }
    });
    setActive(idx);
  };
  return (
    <div>
      <div ref={ref} onScroll={onScroll} className="flex overflow-x-auto no-scrollbar" style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none", msOverflowStyle: "none", gap: 12 }}>
        {items.map((h, i) => (
          <div key={i} className="shrink-0" style={{ width: "85%", scrollSnapAlign: "center" }}>
            <div className="relative w-full rounded-2xl overflow-hidden" style={{ height: 340, backgroundColor: "#ece9e2" }}>
              {img(`howto.${i}`) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={img(`howto.${i}`)} alt={h.title} className="absolute inset-0 h-full w-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-body" style={{ color: "#b6b1a6", fontSize: 14, fontWeight: 500 }}>[ step {i + 1} — image / video ]</span>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0" style={{ padding: 18, background: "rgba(17,17,17,0.55)" }}>
                <div className="font-body" style={{ color: "#ffffff", fontSize: 17, fontWeight: 700, lineHeight: 1.25 }}>{h.title}</div>
                <p className="font-body" style={{ color: "rgba(255,255,255,0.85)", fontSize: 13.5, lineHeight: 1.5, marginTop: 3 }}>{h.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-center" style={{ gap: 6 }}>
        {items.map((_, i) => (
          <span key={i} className="rounded-full" style={{ width: i === active ? 18 : 6, height: 6, background: i === active ? "#242424" : "#d9d6cf", transition: "width 0.2s ease, background 0.2s ease" }} />
        ))}
      </div>
    </div>
  );
}

const BENEFIT_ICONS = [
  () => (<svg width={24} height={24} viewBox="0 0 24 24" fill="none" aria-hidden><path d="M5 19c0-7 6-13 14-13 0 8-6 14-14 13Z" stroke="#62d8f4" strokeWidth="1.6" strokeLinejoin="round" /><path d="M9 15c2-2 4-3 6-3.5" stroke="#62d8f4" strokeWidth="1.6" strokeLinecap="round" /></svg>),
  () => (<svg width={24} height={24} viewBox="0 0 24 24" fill="none" aria-hidden><path d="M4 18h4v-4h4v-4h4V6h4" stroke="#242424" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>),
  () => (<svg width={24} height={24} viewBox="0 0 24 24" fill="none" aria-hidden><circle cx="12" cy="8.5" r="3.5" stroke="#62d8f4" strokeWidth="1.6" /><path d="M5.5 19c0-3.3 2.9-5.5 6.5-5.5s6.5 2.2 6.5 5.5" stroke="#62d8f4" strokeWidth="1.6" strokeLinecap="round" /></svg>),
  () => (<svg width={24} height={24} viewBox="0 0 24 24" fill="none" aria-hidden><rect x="3" y="7" width="11" height="8" rx="1" stroke="#242424" strokeWidth="1.6" /><path d="M14 9h4l3 3v3h-7" stroke="#242424" strokeWidth="1.6" strokeLinejoin="round" /><circle cx="7" cy="17" r="1.6" stroke="#242424" strokeWidth="1.6" /><circle cx="17" cy="17" r="1.6" stroke="#242424" strokeWidth="1.6" /></svg>),
];

const SECTIONcn = "flex flex-col px-6";

/* ── default content (the polished baseline a marketer starts from) ── */

// Short by default. benefits / custom / results stay registered below — a marketer
// re-adds any of them just by listing its key here.
export const PDP_DEFAULT_SECTIONS = [
  "hero", "info", "reviews", "howitworks", "howto", "results", "faq", "cta",
];

export const PDP_DEFAULTS = {
  copy: {
    "bar.cta": "Get my box",
    "bar.promo": "Order now — free shipping + a free gift",
    "hero.eyebrow": "Custom K-beauty routine",
    "hero.title": "The Custom Routine Box",
    "hero.sub": "A complete 5-step routine, built for your exact skin by Seoul experts. Any skin type — oily, dry, sensitive or combination.",
    "hero.rating": "4.9 · 682 skins analyzed",
    "hero.price": "$119",
    "hero.shipNote": "Free worldwide shipping",
    "hero.cta": "Get my box",
    "hero.installment": "or 4 interest-free payments of $29.75 with Afterpay",
    "hero.guarantee": "30-day happiness guarantee · free returns",
    "hero.reassure": "Built per-person · expert analysis included · no subscription",
    "contents.eyebrow": "What's in the box",
    "contents.title": "Your custom 5-step routine",
    "contents.intro": "Five real K-beauty products, handpicked for your skin — so your exact set is unique to you.",
    "detail.eyebrow": "What you also get",
    "faq.eyebrow": "FAQ",
    "info.descriptionTitle": "Description",
    "info.contentsTitle": "What's in the box",
    "info.benefitsTitle": "Benefits",
    "description.body": "8mirrors builds a complete skincare routine made for your skin — not a one-size-fits-all kit. Tell us about your skin and send a photo; Seoul skin experts review it over 4–5 days and build your custom AM & PM routine of real K-beauty products, delivered to your door. It works for any skin type — oily, dry, sensitive or combination.",
    "info.benefitsNote": "No brand pays to be in your box — 682+ skins analyzed, $0 paid by brands. Just what's right for your skin.",
    "howto.eyebrow": "How to use",
    "howitworks.eyebrow": "How it works",
    "experts.eyebrow": "Built by Seoul experts",
    "experts.title": "Every box is built by hand.",
    "experts.avatarsNote": "Your Seoul skin team",
    "experts.intro": "Real skin experts from TheBom Studio in Myeongdong, Seoul read your skin and build your routine — no algorithm, no brand quotas. The same expert care, now shipped to you.",
    "experts.howTitle": "How it works",
    "custom.eyebrow": "How it's built for you",
    "custom.title": "One box, built differently for every skin.",
    "custom.sub": "Oily, dry, sensitive, combination — a real expert reads your skin and builds the box for you, not off a shelf.",
    "results.eyebrow": "Real results",
    "results.beforeCap": "Week 1",
    "results.afterCap": "Week 8",
    "results.headline": "Based on real customer journeys",
    "results.disclaimer": "Individual results vary. Photos shared with customer consent.",
    "reviews.eyebrow": "Reviews",
    "reviews.rating": "4.9",
    "reviews.count": "682 reviews",
    "proof.eyebrow": "Why you can trust the picks",
    "proof.note": "Built by the team behind TheBom Studio in Myeongdong, Seoul — the same expert care, now shipped to you.",
    "cta.price": "$119",
    "cta.shipNote": "Free worldwide shipping",
    "cta.line": "Your full routine, the analysis behind it, and a tracker — built for your skin.",
    "cta.cta": "Get my box",
  } as Record<string, string>,
  lists: {
    thumbs: ["Cleanser", "Toner", "Serum", "Cream", "SPF"],
    benefits: [
      { title: "Built for your skin", sub: "Not one-size-fits-all" },
      { title: "Full 5-step routine", sub: "Cleanser to SPF" },
      { title: "Expert-built in Seoul", sub: "Read by real pros" },
      { title: "Shipped worldwide", sub: "Straight to your door" },
    ],
    products: [
      { step: "Cleanser", role: "Gentle cleanser", desc: "Clears the day without stripping your skin", when: "AM · PM" },
      { step: "Toner", role: "Balancing toner", desc: "Preps and rehydrates right after cleansing", when: "AM · PM" },
      { step: "Serum", role: "Targeted serum", desc: "Your main concern, addressed directly", when: "AM · PM" },
      { step: "Cream", role: "Moisturizer", desc: "Seals in hydration, weighted to your skin type", when: "AM · PM" },
      { step: "SPF", role: "Daily sunscreen", desc: "Protects the progress your routine makes", when: "AM" },
    ],
    extras: [
      { title: "Expert skin analysis", sub: "Your skin read by Seoul pros — the reason every pick fits" },
      { title: "Skin report", sub: "Your skin type, needs and what to expect, in plain language" },
      { title: "Progress tracker", sub: "A simple sheet to watch your skin improve, week by week" },
    ],
    detail: [
      { title: "Skin analysis", body: "Before anything ships, Seoul skin experts read your photos and answers over 4–5 days — your skin type, triggers, sensitivities and what it actually needs. Every product in your box is chosen from this, not a generic quiz." },
      { title: "Skin report", body: "A plain-language report you keep: what's going on with your skin, why each step is in your routine, and what to expect week by week." },
      { title: "Progress tracker", body: "A tracker in the box to log your routine daily and watch your skin change over the weeks — so you see it working, not guess." },
    ],
    stats: [
      { big: "682+", sub: "skins analyzed" },
      { big: "$0", sub: "paid by brands to be picked" },
    ],
    flow: [
      { t: "Tell us your skin", s: "Answer a few quick questions and send one photo." },
      { t: "Experts read your skin", s: "Seoul skin pros study your photo over 4–5 days — not an algorithm.", emph: "They write you a detailed analysis report" },
      { t: "We build & ship your box", s: "Your custom 5-step routine, made for you and sent to your door." },
      { t: "Track your results", s: "Log your routine and watch your skin improve, week by week." },
    ],
    howto: [
      { title: "Open your box", body: "Check your custom products and the progress tracker inside." },
      { title: "Morning & night", body: "Apply your basic AM and PM steps every day." },
      { title: "Twice a week", body: "Add your special treatment or mask step about 2× a week." },
    ],
    reviews: [
      { body: "everything just showed up matched to me — no more cart full of random products. my skin's the calmest it's been in years", who: "Bellevue, WA", date: "2 weeks ago" },
      { body: "the routine actually made sense for MY skin. i stopped guessing and just followed it.", who: "Austin, TX", date: "3 weeks ago" },
      { body: "my redness calmed down so much by week 6. the tracker kept me consistent.", who: "Portland, OR", date: "1 month ago" },
      { body: "love that nothing was random — every product had a reason. worth it.", who: "Brooklyn, NY", date: "1 month ago" },
      { body: "skin feels balanced for the first time in years. the report explained everything.", who: "San Diego, CA", date: "2 months ago" },
      { body: "easy to follow morning and night. my texture is noticeably smoother.", who: "Chicago, IL", date: "2 months ago" },
    ] as { body: string; who: string; date?: string }[],
    buildSteps: [
      { t: "Experts read your skin", s: "From your photos and answers — type, triggers and needs" },
      { t: "They design your routine", s: "AM & PM steps built around what your skin actually needs" },
      { t: "They pick every product", s: "No brand quotas — only what fits your skin goes in the box" },
    ],
    faq: [
      { q: "I'm not in South Korea. Can I still get one?", a: "Yes — it's made for people outside Korea who want healthy, glowing skin. It ships worldwide." },
      { q: "How long until it arrives?", a: "Each box is built personally by our experts, so allow 5–7 business days for your analysis and routine before it ships." },
      { q: "I already have a routine. Do I have to change everything?", a: "No. We keep the products that are working for your skin and only swap what isn't." },
      { q: "What if my skin changes?", a: "We reassess and adjust your routine when your skin shifts with the season or your lifestyle." },
      { q: "Shipping & returns", a: "Free worldwide shipping. Because each box is built personally for you, allow 5–7 business days for your analysis and routine before it ships. 30-day happiness guarantee with free returns." },
    ],
  },
};

/* ── section components: pure functions of the resolved config context ── */

type Ctx = {
  c: (k: string) => string;
  img: (k: string) => string | undefined;
  cta: string;
  L: typeof PDP_DEFAULTS.lists;
};

const SECTIONS: Record<string, (ctx: Ctx) => React.ReactNode> = {
  hero: ({ c, img, cta, L }) => (
    <section className={SECTIONcn} style={{ paddingTop: 92, paddingBottom: 24 }}>
      <HeroGallery slides={["The box", ...L.thumbs]} img={img} />
      <div className="mt-6">
        <Eyebrow>{c("hero.eyebrow")}</Eyebrow>
        <h1 className="mt-2 font-display text-charcoal" style={{ fontSize: "clamp(26px, 7vw, 34px)", lineHeight: 1.12, fontWeight: 500, letterSpacing: "-0.015em" }}>{c("hero.title")}</h1>
        <div className="mt-3 inline-flex items-center" style={{ gap: 8 }}>
          <Stars />
          <span className="font-body text-charcoal" style={{ fontSize: 13, textDecoration: "underline", textUnderlineOffset: 2, textDecorationColor: "#cfcdc6" }}>{c("hero.rating")}</span>
        </div>
        <div className="mt-4 flex items-baseline gap-2.5">
          <span className="font-body text-charcoal" style={{ fontSize: 22, fontWeight: 700, lineHeight: 1 }}>{c("hero.price")}</span>
          <span className="font-body text-mid-gray" style={{ fontSize: 13 }}>{c("hero.shipNote")}</span>
        </div>
        {c("hero.installment") && <p className="mt-1.5 font-body text-mid-gray" style={{ fontSize: 12.5 }}>{c("hero.installment")}</p>}
        <div className="mt-5"><CtaButton href={cta}>{c("hero.cta")}</CtaButton></div>
        {c("hero.guarantee") && (
          <div className="mt-3 flex items-center justify-center" style={{ gap: 6 }}>
            <GuaranteeIcon />
            <span className="font-body text-mid-gray" style={{ fontSize: 12.5 }}>{c("hero.guarantee")}</span>
          </div>
        )}
        <p className="mt-2 text-center font-body text-mid-gray" style={{ fontSize: 12 }}>{c("hero.reassure")}</p>
      </div>
    </section>
  ),

  benefits: ({ L }) => (
    <section className={SECTIONcn} style={{ paddingTop: 8, paddingBottom: 36 }}>
      <div className="grid grid-cols-2 gap-3">
        {L.benefits.map((b, i) => {
          const Icon = BENEFIT_ICONS[i % BENEFIT_ICONS.length];
          return (
            <div key={b.title + i} className="flex flex-col rounded-2xl bg-white" style={{ padding: "18px 16px", boxShadow: "var(--shadow-card)" }}>
              <Icon />
              <div className="mt-2.5 font-body text-charcoal" style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.3 }}>{b.title}</div>
              <div className="mt-0.5 font-body text-mid-gray" style={{ fontSize: 12.5, lineHeight: 1.4 }}>{b.sub}</div>
            </div>
          );
        })}
      </div>
    </section>
  ),

  contents: ({ c, L }) => (
    <section className={SECTIONcn} style={{ paddingTop: 26, paddingBottom: 28 }}>
      <Eyebrow>{c("contents.eyebrow")}</Eyebrow>
      <p className="mt-2 font-body text-charcoal" style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.3 }}>{c("contents.title")}</p>
      <p className="mt-1.5 font-body text-mid-gray" style={{ fontSize: 13.5, lineHeight: 1.5, maxWidth: 380 }}>{c("contents.intro")}</p>
      {/* glanceable 5-step routine — categories are constant, the products inside vary per person */}
      <div className="mt-5 flex items-start" style={{ gap: 4 }}>
        {L.products.map((p, i) => (
          <div key={p.step + i} className="flex flex-1 flex-col items-center text-center">
            <div className="flex items-center justify-center rounded-full font-body text-charcoal" style={{ width: 34, height: 34, background: "var(--color-canvas)", boxShadow: "var(--shadow-input-ring)", fontSize: 13, fontWeight: 700 }}>{i + 1}</div>
            <div className="mt-2 font-body text-charcoal" style={{ fontSize: 11.5, fontWeight: 600, lineHeight: 1.2 }}>{p.step}</div>
          </div>
        ))}
      </div>
    </section>
  ),

  info: ({ c, L, img }) => (
    <section className={SECTIONcn} style={{ paddingTop: 22, paddingBottom: 8 }}>
      <div className="flex flex-col">
        <Accordion title={c("info.descriptionTitle")} defaultOpen>
          <p className="font-body text-mid-gray" style={{ fontSize: 14, lineHeight: 1.6 }}>{c("description.body")}</p>
        </Accordion>
        <Accordion title={c("info.contentsTitle")}>
          <p className="font-body text-charcoal" style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.3 }}>{c("contents.title")}</p>
          <p className="font-body text-mid-gray" style={{ fontSize: 13.5, lineHeight: 1.5, marginTop: 4 }}>{c("contents.intro")}</p>
          <div className="flex items-start" style={{ gap: 4, marginTop: 16 }}>
            {L.products.map((p, i) => (
              <div key={p.step + i} className="flex flex-1 flex-col items-center text-center">
                <div className="flex items-center justify-center rounded-full font-body text-charcoal" style={{ width: 32, height: 32, background: "var(--color-canvas)", boxShadow: "var(--shadow-input-ring)", fontSize: 12.5, fontWeight: 700 }}>{i + 1}</div>
                <div className="mt-2 font-body text-charcoal" style={{ fontSize: 11, fontWeight: 600, lineHeight: 1.2 }}>{p.step}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-col" style={{ gap: 12, marginTop: 20 }}>
            {L.detail.map((d, i) => (
              <div key={d.title + i} className="flex items-start" style={{ gap: 9 }}>
                <CheckIcon />
                <div>
                  <div className="font-body text-charcoal" style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.3 }}>{d.title}</div>
                  <p className="font-body text-mid-gray" style={{ fontSize: 13, lineHeight: 1.5, marginTop: 2 }}>{d.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Accordion>
        <Accordion title={c("info.benefitsTitle")}>
          <ul className="flex flex-col" style={{ gap: 8 }}>
            {L.benefits.map((b, i) => (
              <li key={b.title + i} className="flex items-start" style={{ gap: 9 }}>
                <CheckIcon />
                <span className="font-body text-mid-gray" style={{ fontSize: 13.5, lineHeight: 1.4 }}><span className="text-charcoal" style={{ fontWeight: 600 }}>{b.title}</span> — {b.sub}</span>
              </li>
            ))}
          </ul>
          <p className="font-body text-mid-gray" style={{ fontSize: 13, lineHeight: 1.55, marginTop: 12 }}>{c("info.benefitsNote")}</p>
        </Accordion>
        <Accordion title={c("experts.eyebrow")}>
          <div className="flex items-center" style={{ gap: 11 }}>
            <div className="flex">
              {["/team1.jpg", "/team2.jpg", "/sumin.jpg"].map((def, i) => (
                <div key={i} className="rounded-full overflow-hidden bg-neutral-200" style={{ width: 44, height: 44, marginLeft: i > 0 ? -12 : 0, boxShadow: "0 0 0 2px #ffffff" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img(`experts.${i}`) || def} alt="" className="h-full w-full object-cover" style={{ objectPosition: "center 25%" }} />
                </div>
              ))}
            </div>
            <span className="font-body text-mid-gray" style={{ fontSize: 12.5, lineHeight: 1.4 }}>{c("experts.avatarsNote")}</span>
          </div>
          <p className="font-body text-mid-gray" style={{ fontSize: 13.5, lineHeight: 1.6, marginTop: 12 }}>{c("experts.intro")}</p>
          <div className="flex flex-wrap" style={{ gap: 8, marginTop: 12 }}>
            {L.stats.map((s, i) => (
              <span key={i} className="font-body" style={{ fontSize: 12.5, lineHeight: 1.3, background: "var(--color-canvas)", boxShadow: "var(--shadow-input-ring)", borderRadius: 8, padding: "6px 12px" }}>
                <span className="text-charcoal" style={{ fontWeight: 700 }}>{s.big}</span> <span className="text-mid-gray">{s.sub}</span>
              </span>
            ))}
          </div>
        </Accordion>
      </div>
    </section>
  ),

  howto: ({ c, L, img }) => (
    <section className={SECTIONcn} style={{ paddingTop: 26, paddingBottom: 12 }}>
      <Eyebrow>{c("howto.eyebrow")}</Eyebrow>
      <div className="mt-4">
        <HowToCarousel items={L.howto} img={img} />
      </div>
    </section>
  ),

  howitworks: ({ c, L }) => (
    <section className={SECTIONcn} style={{ paddingTop: 26, paddingBottom: 28 }}>
      <Eyebrow>{c("howitworks.eyebrow")}</Eyebrow>
      <div className="mt-5 flex flex-col">
        {L.flow.map((b, i) => {
          const last = i === L.flow.length - 1;
          return (
            <div key={i} className="flex" style={{ gap: 14 }}>
              <div className="flex flex-col items-center" style={{ width: 30 }}>
                <span className="shrink-0 flex items-center justify-center rounded-full font-body text-charcoal" style={{ width: 30, height: 30, background: "var(--color-canvas)", fontSize: 13, fontWeight: 700, boxShadow: "var(--shadow-input-ring)" }}>{i + 1}</span>
                {!last && <div style={{ flex: 1, width: 2, background: "#e7e4dd", marginTop: 6, marginBottom: 6, borderRadius: 1 }} />}
              </div>
              <div style={{ flex: 1, paddingBottom: last ? 0 : 22 }}>
                <div className="font-body text-charcoal" style={{ fontSize: 15.5, fontWeight: 600, lineHeight: 1.3 }}>{b.t}</div>
                <div className="font-body text-mid-gray" style={{ fontSize: 13.5, lineHeight: 1.5, marginTop: 2 }}>{b.s}</div>
                {b.emph && (
                  <span className="font-body text-midnight" style={{ display: "inline-block", marginTop: 9, background: "var(--color-lumen-lime)", padding: "4px 9px", borderRadius: 5, fontSize: 12.5, fontWeight: 600, lineHeight: 1.35 }}>{b.emph}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  ),

  custom: ({ c }) => (
    <section className={SECTIONcn} style={{ paddingTop: 26, paddingBottom: 26 }}>
      <Eyebrow>{c("custom.eyebrow")}</Eyebrow>
      <p className="mt-3 font-display text-charcoal" style={{ fontSize: 23, fontWeight: 500, lineHeight: 1.25, maxWidth: 380 }}>{c("custom.title")}</p>
      <p className="mt-3 font-body text-mid-gray" style={{ fontSize: 14, lineHeight: 1.55, maxWidth: 380 }}>{c("custom.sub")}</p>
    </section>
  ),

  results: ({ c, img }) => (
    <section className={SECTIONcn} style={{ paddingTop: 26, paddingBottom: 26 }}>
      <Eyebrow>{c("results.eyebrow")}</Eyebrow>
      <p className="mt-3 text-center font-display text-charcoal" style={{ fontSize: 21, fontWeight: 500, lineHeight: 1.25 }}>{c("results.headline")}</p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {[["results.before", "results.beforeCap"], ["results.after", "results.afterCap"]].map(([imgKey, capKey], i) => (
          <div key={imgKey}>
            <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: "4 / 5", backgroundColor: "#ece9e2" }}>
              {img(imgKey) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={img(imgKey)} alt="" className="absolute inset-0 h-full w-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center"><span className="font-body" style={{ color: "#b6b1a6", fontSize: 13 }}>[ photo ]</span></div>
              )}
              <span className="absolute font-body" style={{ top: 10, left: 10, background: i === 0 ? "rgba(17,17,17,0.6)" : "var(--color-mirror-cyan)", color: i === 0 ? "#fff" : "#111", fontSize: 10.5, fontWeight: 700, letterSpacing: "0.06em", padding: "3px 8px", borderRadius: 6 }}>{i === 0 ? "BEFORE" : "AFTER"}</span>
            </div>
            <p className="mt-2 text-center font-body text-mid-gray" style={{ fontSize: 12.5 }}>{c(capKey)}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-center font-body text-mid-gray" style={{ fontSize: 11.5, lineHeight: 1.45 }}>{c("results.disclaimer")}</p>
    </section>
  ),

  reviews: ({ c, L }) => (
    <section className={SECTIONcn} style={{ paddingTop: 26, paddingBottom: 26 }}>
      <Eyebrow>{c("reviews.eyebrow")}</Eyebrow>
      <div className="mt-4 flex items-center" style={{ gap: 18 }}>
        <div className="text-center shrink-0">
          <div className="font-body text-charcoal" style={{ fontSize: 30, fontWeight: 700, lineHeight: 1 }}>{c("reviews.rating")}</div>
          <div className="mt-1.5"><Stars /></div>
          <div className="mt-1 font-body text-mid-gray" style={{ fontSize: 12 }}>{c("reviews.count")}</div>
        </div>
        <div className="flex-1 flex flex-col" style={{ gap: 5 }}>
          {[0.88, 0.09, 0.02, 0.005, 0.005].map((p, i) => (
            <div key={i} className="flex items-center" style={{ gap: 8 }}>
              <span className="font-body text-mid-gray" style={{ fontSize: 11, width: 8, textAlign: "right" }}>{5 - i}</span>
              <div className="flex-1 rounded-full" style={{ height: 6, background: "#ece9e2" }}>
                <div className="rounded-full" style={{ width: `${p * 100}%`, height: 6, background: "#242424" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 flex flex-col" style={{ gap: 12 }}>
        {L.reviews.map((r, i) => (
          <div key={r.who + i} className="rounded-2xl bg-white" style={{ padding: 20, boxShadow: "var(--shadow-card)" }}>
            <div className="flex items-center justify-between">
              <Stars />
              {r.date && <span className="font-body text-mid-gray" style={{ fontSize: 12 }}>{r.date}</span>}
            </div>
            <p className="mt-2 font-body text-charcoal" style={{ fontSize: 15, lineHeight: 1.55 }}>&ldquo;{r.body}&rdquo;</p>
            <div className="mt-3 flex items-center" style={{ gap: 6 }}>
              <VerifiedIcon />
              <span className="font-body text-mid-gray" style={{ fontSize: 13 }}>Verified buyer · {r.who}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  ),

  proof: ({ L }) => (
    <section className={SECTIONcn} style={{ paddingTop: 12, paddingBottom: 12 }}>
      <div className="rounded-2xl bg-white flex flex-wrap items-center justify-center" style={{ padding: "13px 14px", boxShadow: "var(--shadow-card)", columnGap: 14, rowGap: 2 }}>
        {L.stats.map((s, i) => (
          <span key={i} className="font-body" style={{ fontSize: 12.5, lineHeight: 1.4 }}>
            <span className="text-charcoal" style={{ fontWeight: 700 }}>{s.big}</span>{" "}
            <span className="text-mid-gray">{s.sub}</span>
          </span>
        ))}
        <span className="font-body text-mid-gray" style={{ fontSize: 12.5 }}>Built by Seoul experts</span>
      </div>
    </section>
  ),

  detail: ({ c, L }) => (
    <section className={SECTIONcn} style={{ paddingTop: 26, paddingBottom: 28 }}>
      <Eyebrow>{c("detail.eyebrow")}</Eyebrow>
      <div className="mt-4 flex flex-col">
        {L.detail.map((d, i) => (
          <div key={d.title + i} style={{ paddingTop: i > 0 ? 16 : 0, paddingBottom: 16, boxShadow: i > 0 ? "inset 0 1px 0 #ededea" : undefined }}>
            <div className="flex items-center" style={{ gap: 9 }}>
              <CheckIcon />
              <span className="font-body text-charcoal" style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.3 }}>{d.title}</span>
            </div>
            <p className="font-body text-mid-gray" style={{ fontSize: 13.5, lineHeight: 1.6, marginTop: 6, paddingLeft: 29 }}>{d.body}</p>
          </div>
        ))}
      </div>
    </section>
  ),

  faq: ({ c, L }) => (
    <section className={SECTIONcn} style={{ paddingTop: 20, paddingBottom: 28 }}>
      <Eyebrow>{c("faq.eyebrow")}</Eyebrow>
      <div className="mt-2 flex flex-col">
        {L.faq.map((f, i) => (<Accordion key={f.q + i} title={f.q}>{f.a}</Accordion>))}
      </div>
    </section>
  ),

  cta: ({ c, cta }) => (
    <section className={SECTIONcn} style={{ paddingTop: 26, paddingBottom: 56 }}>
      <div className="rounded-2xl bg-white" style={{ padding: 24, boxShadow: "var(--shadow-card)" }}>
        <div className="flex items-baseline gap-2.5">
          <span className="font-body text-charcoal" style={{ fontSize: 22, fontWeight: 700, lineHeight: 1 }}>{c("cta.price")}</span>
          <span className="font-body text-mid-gray" style={{ fontSize: 13 }}>{c("cta.shipNote")}</span>
        </div>
        <p className="mt-2 font-body text-mid-gray" style={{ fontSize: 14, lineHeight: 1.5 }}>{c("cta.line")}</p>
        <div className="mt-5"><CtaButton href={cta}>{c("cta.cta")}</CtaButton></div>
      </div>
    </section>
  ),
};

/* ── renderer ── */

export default function PdpTemplate({ config }: { config: LandingConfig }) {
  const copy = { ...PDP_DEFAULTS.copy, ...(config.copy || {}) };
  const c = (k: string) => copy[k] ?? "";
  const images = config.images || {};
  const img = (k: string) => images[k];
  const cta = config.links?.cta || "#";
  const L = { ...PDP_DEFAULTS.lists, ...(config.lists || {}) } as typeof PDP_DEFAULTS.lists;
  const order = config.sections && config.sections.length ? config.sections : PDP_DEFAULT_SECTIONS;
  const ctx: Ctx = { c, img, cta, L };

  return (
    <LandingExperience copy={{ "bar.cta": c("bar.cta"), "bar.promo": c("bar.promo") }}>
      {order.map((key) => {
        const S = SECTIONS[key];
        return S ? <S key={key} {...ctx} /> : null;
      })}
    </LandingExperience>
  );
}
