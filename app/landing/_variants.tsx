import type { ComponentType } from "react";
import type { SectionKey } from "./page";
import RednessLanding from "./_variant-redness";

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
     (full list lives in _i18n.tsx) */

export type Variant = {
  slug: string;
  label: string; // internal name (not shown to users)
  note: string; // the hypothesis this arm tests
  sections?: SectionKey[]; // structural variant: reuse shared sections
  copy?: Record<string, string>; // no-code copy overrides (i18n key → text)
  Custom?: ComponentType; // fully custom layout variant (own sections, shared shell)
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
    label: "Redness Box — product-led",
    note: "Short, product-first layout: concern (redness) → box + price → before/after → what's inside → tracker → how it works → no-bias proof → review. Shared header/buy bar.",
    Custom: RednessLanding,
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
