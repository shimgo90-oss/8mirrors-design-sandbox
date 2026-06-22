import type { ComponentType } from "react";

/* ───────────────────────── Landing A/B variants ─────────────────────────
   Each variant is its own URL: /lp/<slug>  (e.g. /lp/original, /lp/lean).
   Point the SAME ad at different slugs and compare conversion.

   ┌─ MARKETER GUIDE (no React needed) ──────────────────────────────────┐
   │ To make a new variant, copy a block below and change:               │
   │  • slug   → the URL: /lp/<slug>  (lowercase-with-dashes)            │
   │  • note   → the hypothesis you're testing                           │
   │  • sections → which blocks show, in order (pick from the list)      │
   │  • copy   → reword any text WITHOUT touching code (key → new text)  │
   │ Need a NEW kind of block or layout? That's a Claude job — file a    │
   │ request and leave `Custom` to the dev lane.                         │
   └─────────────────────────────────────────────────────────────────────┘

   Available sections:
     hero · what-you-get · report-archive · team · stories · offer · footer

   Common copy keys (override in `copy`):
     hero.titleA · hero.titleB · hero.sub · hero.cta · bar.cta
     (full list lives in _i18n.tsx)

   TEMPLATE pages — box (template: "pdp") & redness (template: "story") — have more
   knobs: template · images · links · lists (+ their own copy/section keys).
   Defaults & all keys live in _tpl-pdp.tsx / _tpl-story.tsx. How-to: MARKETER.md §2½. */

/* A landing variant = a config object a marketer edits. The fields below are the
   ONLY things a marketer touches (content/order/destination) — layout/color/type
   stay locked inside the template files (_tpl-pdp.tsx, _tpl-story.tsx). */
export type LandingConfig = {
  slug: string;
  label: string; // internal name (not shown to users)
  note: string; // the hypothesis this arm tests
  template?: "pdp" | "story"; // pick a template → renders via _tpl-<name>.tsx
  sections?: string[]; // section keys: reorder / remove (template defines the set)
  copy?: Record<string, string>; // text only (key → text)
  images?: Record<string, string>; // photo slots (key → /path.jpg); empty = placeholder
  links?: { cta?: string }; // CTA destination (checkout/quiz URL)
  lists?: Record<string, unknown>; // repeatable content (reviews, faq, products, stats…)
};

export type Variant = LandingConfig & {
  Custom?: ComponentType; // legacy fully-custom layout (own sections, shared shell)
};

export const VARIANTS: Variant[] = [
  {
    slug: "original",
    label: "Original — full",
    note: "Baseline. The full narrative landing exactly as shipped at /landing.",
    sections: ["hero", "what-you-get", "report-archive", "team", "stories", "offer", "footer"],
  },
  {
    slug: "lean",
    label: "Lean — fast to CTA",
    note: "Hypothesis: a shorter page that reaches the offer faster converts better on paid traffic.",
    sections: ["hero", "what-you-get", "offer", "footer"],
  },
  {
    slug: "redness",
    label: "Redness Box — story-led",
    note: "Story-led: concern (redness) → box + price → why it's yours → before/after → tracker → no-bias → how it works → review. Leads with the pain, holds price till desire is built.",
    template: "story",
    // Renders STORY_DEFAULTS (the redness baseline). Clone + edit copy/images/lists for a new story variant.
  },
  {
    slug: "box",
    label: "Custom Routine Box — PDP",
    note: "Hypothesis: a transactional product-detail page (price + CTA up top, spec-style contents, star reviews, FAQ) converts the $119 box better than a story-led page. Skin-type-agnostic — fits any skin, not a single concern.",
    template: "pdp",
    // PDP defaults minus "howto" — the How-to-use section is dropped for this variant.
    sections: ["hero", "results", "info", "experts", "faq", "reviews", "footer"],
    images: {
      // gallery.0 = the lead hero shot (curated-routine moodboard). gallery.1..5 left as
      // placeholders for the per-step product category shots. Swap any in here.
      "gallery.0": "/lp/box/gallery-new-1-chatgpt-final-shift-right.png",
      "gallery.1": "/lp/box/gallery-new-2.jpg",
      "gallery.2": "/lp/box/gallery-new-3.jpg",
      "gallery.3": "/lp/box/gallery-new-4.jpg",
      "gallery.4": "/lp/box/gallery-new-5.jpg",
      "gallery.5": "/lp/box/gallery-new-6.jpg",
      // Real customer before/after (Week 1 → Week 8) for the "Real results" section.
      "results.before": "/lp/box/results-before.jpg",
      "results.after": "/lp/box/results-after.jpg",
    },
    // Stripe checkout (LIVE) — drives all 3 buy buttons (hero CTA, bottom CTA, sticky bar).
    links: { cta: "https://buy.stripe.com/6oU8wOgDu7sdcwS2je2wU03" },
    // A marketer clones this block, changes slug + note, then edits copy/images/links/lists/sections.
  },
  {
    // ── EXAMPLE: copy-only variant (marketer template) ──
    // Same blocks as `lean`, but the hero/CTA wording is reframed around the
    // outcome. Edit the strings below — no code change needed. Duplicate this
    // block, change `slug`, and reword to spin up your own message test.
    slug: "routine",
    label: "Routine-led (copy test)",
    note: "Hypothesis: leading with the personalized routine outcome (not 'analysis/report') converts better.",
    sections: ["hero", "what-you-get", "offer", "footer"],
    copy: {
      "hero.titleA": "Your skin, finally on a routine that",
      "hero.titleB": "fits",
      "hero.sub": "Tell us your skin in 2 minutes. Get a routine matched to you — not a generic shelf of products.",
      "hero.cta": "Build my routine",
      "bar.cta": "Build my routine",
    },
  },
];

export const VARIANT_MAP: Record<string, Variant> = Object.fromEntries(
  VARIANTS.map((v) => [v.slug, v])
);
