# 8mirrors Design System

*Adapted from the Cal.com DESIGN.md (VoltAgent / getdesign.md) — grayscale calm base with a two-color accent system and an editorial serif display voice.*

## 1. Visual Theme & Atmosphere

8mirrors is a quiet, grayscale canvas interrupted by two precise moments of color. The base is drawn directly from Cal.com's monochromatic restraint — near-black headings on soft gray surfaces, generous whitespace, and shadow-based depth rather than decorative flourish. Where Cal.com goes pure grayscale, 8mirrors introduces a disciplined two-color accent system: **Mirror Cyan (`#62d8f4`)** as the primary interactive color and **Lumen Lime (`#ecff8c`)** as the secondary highlight. These colors are treated like spotlights in an otherwise black-and-white photograph — rare, deliberate, and always paired with black text for maximum contrast.

The display typeface is **Fraunces**, a variable serif with editorial personality. Fraunces replaces Cal Sans as the voice of headlines: where Cal Sans speaks with geometric confidence, Fraunces speaks with quiet sophistication — soft bracketed serifs, subtle contrast between thick and thin strokes, and an optical-size axis that makes large headlines feel carved rather than set. Body text stays on **Inter** for rock-solid readability. The pairing creates a clear division: Fraunces for identity, Inter for information.

The mood is calm, premium, and reflective — appropriate for a brand whose name evokes mirrors and quiet observation. Depth comes from Cal.com's multi-layered shadow system (ring borders + diffused shadows + contact edges), never from gradients or glow. Color, when it appears, is never decorative — it signals an action, a state, or a moment of emphasis.

**Key Characteristics:**
- Grayscale canvas with a **two-color accent system** (Mirror Cyan + Lumen Lime)
- **Fraunces** variable serif for headings; **Inter** for body
- Accent colors are **always paired with black text** for contrast and AAA accessibility
- Multi-layered shadow system (ring borders + diffused + contact) for depth
- Generous whitespace: 80–96px section spacing
- Border-radius scale from 2px (subtle) to 9999px (pill)
- No gradients, no illustrations — typography + product UI only

## 2. Color Palette & Roles

### Primary (Accent)
- **Mirror Cyan** (`#62d8f4`): Primary interactive color — CTAs, links, focus rings, active states, key highlights. When used as a background, **text must be black (`#111111` or `#242424`)** — contrast ratio ≈ 13:1 (AAA).
- **Mirror Cyan Hover** (`#3fc4e0`, ~8% darker): Button and link hover state.
- **Mirror Cyan Subtle** (`#e8f9fd`, Cyan at ~10% opacity on white): Background tints for informational sections, selected rows, hover surfaces.

### Secondary (Accent)
- **Lumen Lime** (`#ecff8c`): Secondary highlight — badges, pills, tag backgrounds, emphasized inline highlights, "new" markers, success moments. **Always pair with black text** — contrast ratio ≈ 17:1 (AAA).
- **Lumen Lime Hover** (`#dff56a`, ~8% darker): Hover state for lime elements.
- **Lumen Lime Subtle** (`#f9ffdf`): Faint lime tint for background washes.

### Neutrals & Text
- **Charcoal** (`#242424`): Primary headings, body text, dark-button backgrounds — Cal.com's signature warm near-black.
- **Midnight** (`#111111`): Maximum-contrast text on light backgrounds and on accent colors.
- **Mid Gray** (`#898989`): Secondary text, descriptions, muted labels.
- **Border Gray** (`rgba(34, 42, 53, 0.08)`): Shadow-ring borders — never CSS `border`.

### Surface & Background
- **Pure White** (`#ffffff`): Primary canvas, card surfaces.
- **Canvas Gray** (`#f7f7f7`): Section differentiation, subtle background blocks.
- **Soft Gray** (`#f0f0f0`): Deeper background tier for contrast against white cards.

### Semantic
- **Link**: Mirror Cyan (`#62d8f4`) — with underline on hover. Replaces Cal.com's `#0099ff`.
- **Focus Ring**: Mirror Cyan at 50% opacity (`rgba(98, 216, 244, 0.5)`), 2px outline, 2px offset.
- **Error**: `#e5484d` (reserved — use sparingly, only in form validation)
- **Success**: Lumen Lime (`#ecff8c`) with black text — repurposed as the positive-state color.

### Gradient System
- **No gradients.** Depth and emphasis come from shadows and the accent palette, not color transitions.

## 3. Typography Rules

### Font Family
- **Service Wordmark**: `SUIT Variable` — reserved **exclusively for the "8mirrors" service name / logo wordmark** (splash, nav logo, app launcher). Never used for content text, headings, or UI. Local font file: `/Users/yusim/Desktop/8m/design-guide/font/SUIT-Variable-ttf/SUIT-Variable.ttf`. Use weight 800 for the wordmark.
- **Display**: `Fraunces` — variable serif with optical-size and soft/hard axes. Load via Google Fonts. Use `font-optical-sizing: auto` and `font-variation-settings: "SOFT" 50, "WONK" 0` as defaults. Reserved for headings (24px+) and marketing/editorial moments.
- **Body**: `Inter` — variable font for all body text, labels, and UI.
- **Mono**: `JetBrains Mono` — code blocks and technical content.

> **Wordmark rule**: Only the literal string "8mirrors" (service name) uses SUIT Variable. Page titles like "Diagnosis", "Home", "Settings" use Fraunces (hero level) or Inter (nav/action bar). Do not substitute SUIT for general Korean text — use Inter with system Korean fallback instead.

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display Hero | Fraunces | 72px | 400 | 1.05 | -0.02em | Editorial hero — optical size shines at large |
| Section Heading | Fraunces | 48px | 400 | 1.10 | -0.015em | Large section titles |
| Feature Heading | Fraunces | 32px | 500 | 1.15 | -0.01em | Feature block headlines |
| Sub-heading | Fraunces | 24px | 500 | 1.20 | -0.005em | Smaller headings |
| Card Title | Fraunces | 20px | 500 | 1.25 | 0 | Smallest Fraunces usage — do not go below 20px |
| Body Large | Inter | 18px | 400 | 1.55 | -0.005em | Intro paragraphs, lead text |
| Body | Inter | 16px | 400 | 1.60 | 0 | Default body |
| Body Small | Inter | 14px | 400 | 1.55 | 0 | Descriptions, secondary content |
| UI Label | Inter | 14px | 500 | 1.00 | 0 | Buttons, nav, labels |
| Caption | Inter | 12px | 500 | 1.40 | +0.01em | Small UI text, metadata |
| Code | JetBrains Mono | 14px | 500 | 1.50 | 0 | Code snippets |

### Principles
- **Fraunces at large, Inter at small**: Fraunces is exclusively for headings (20px+). Never use it for body text — the serifs lose definition and the personality works against readability.
- **Negative tracking on Fraunces**: At display sizes, apply -0.01em to -0.02em letter-spacing to tighten the serif rhythm. At 20px, let it breathe at 0.
- **Weight 400–500 only for Fraunces**: The variable axis supports more, but 400 (regular) and 500 (medium) carry the voice. Avoid 600+ — it looks heavy-handed.
- **Inter handles everything else**: Body, labels, buttons, captions — all Inter. One body font, zero ambiguity.

## 4. Component Stylings

### Buttons
- **Primary CTA (Mirror Cyan)**: `#62d8f4` background, **`#111111` black text**, 8px radius, 12px vertical / 20px horizontal padding, Inter 14px weight 500. Hover: `#3fc4e0`. Focus: 2px outline `rgba(98, 216, 244, 0.5)` at 2px offset. This is the workhorse CTA.
- **Dark Primary**: `#242424` background, white text, 8px radius. Use for secondary/alternative dark CTAs when cyan would be too loud.
- **Ghost / White**: White background with shadow-ring border, `#242424` text. Uses the multi-layered shadow system for subtle elevation.
- **Lime Badge Button**: `#ecff8c` background, **black text**, 9999px pill radius — reserved for "New", "Beta", promotional tags. Not for primary actions.
- **Inset highlight**: Dark buttons may feature `rgba(255, 255, 255, 0.15) 0px 2px 0px inset` for a subtle 3D bevel.

### Cards & Containers
- **Shadow Card**: White background, multi-layered shadow: `rgba(19, 19, 22, 0.7) 0px 1px 5px -4px, rgba(34, 42, 53, 0.08) 0px 0px 0px 1px, rgba(34, 42, 53, 0.05) 0px 4px 8px 0px`. The ring shadow (`0px 0px 0px 1px`) acts as a shadow-border.
- **Radius**: 8px (standard), 12px (medium), 16px (large), 24px (hero).
- **Accent Card**: On rare occasions, a card can use a Mirror Cyan or Lumen Lime background as a focal point — always with black text and the same shadow stack.
- **Hover**: Subtle shadow deepening — do not use color shifts.

### Inputs & Forms
- **Text input**: White background, `#242424` text, 8px radius, shadow-ring border (`0px 0px 0px 1px rgba(34, 42, 53, 0.12)`), 12px padding.
- **Focus**: 2px Mirror Cyan outline at 50% opacity, 2px offset — the focus ring is one of the primary uses of the accent color.
- **Label**: Inter 14px weight 500, `#242424`, 6px gap to input.
- **Placeholder**: `#898989`.

### Navigation
- **Top nav**: White/transparent background, Inter links 14px weight 500 in `#111111`.
- **Active link**: Mirror Cyan (`#62d8f4`) underline 2px, 4px offset — color is the state signal.
- **CTA button**: Mirror Cyan primary in nav.
- **Sticky**: Fixed on scroll with a subtle bottom shadow when scrolled.

### Highlights & Inline Emphasis
- **Text highlight**: `background: #ecff8c; color: #111111; padding: 0 4px;` — like a highlighter pen over key phrases in Fraunces headings. Powerful when used once per section, cheap when overused.
- **Inline link**: Mirror Cyan `#62d8f4` text with 1px underline, 2px offset. On hover: `#3fc4e0`.

## 5. Layout Principles

### Spacing System
- **Base unit**: 8px
- **Scale**: 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128 (px)
- **Section padding**: 80px–96px vertical between major sections
- **Card padding**: 16px–24px internal
- **Component gaps**: 8px–16px between related elements

### Grid & Container
- **Max width**: 1200px content container, centered
- **Column patterns**: Full-width hero, centered text blocks, 2–3 column feature grids
- **Breakpoints**: 640px, 768px, 1024px, 1280px

### Whitespace Philosophy
- **Generous section spacing**: 80–96px creates a breathable, premium feel
- **Centered editorial headlines**: Fraunces headings centered with 32px+ margins above and below
- **Let accent colors breathe**: Never cluster cyan and lime next to each other — at least 48px of neutral space between accent moments

### Border Radius Scale
- 2px (subtle inline), 4px (small UI), 8px (standard), 12px (medium), 16px (large), 24px (hero), 9999px (pill)

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| 0 — Flat | No shadow | Page canvas, basic containers |
| 1 — Inset | `rgba(0,0,0,0.16) 0px 1px 1.9px 0px inset` | Pressed/recessed, input wells |
| 2 — Ring + Soft (workhorse) | `rgba(19,19,22,0.7) 0px 1px 5px -4px, rgba(34,42,53,0.08) 0px 0px 0px 1px, rgba(34,42,53,0.05) 0px 4px 8px` | Cards, containers |
| 3 — Alt Elevation | `rgba(36,36,36,0.7) 0px 1px 5px -4px, rgba(36,36,36,0.05) 0px 4px 8px` | Alt cards without ring border |
| 4 — Button Inset Highlight | `rgba(255,255,255,0.15) 0px 2px 0px inset` | Dark button 3D effect |
| 5 — Soft Ambient | `rgba(34,42,53,0.05) 0px 4px 8px` | Subtle grounding shadow |

### Shadow Philosophy
- **Ring borders over CSS borders**: Use `0px 0px 0px 1px` shadows as hairline borders — they don't affect layout
- **Multi-layer compositing**: Every elevated surface gets 2–3 layered shadows (contact + ring + diffuse)
- **Subtle, never heavy**: All shadows stay under 10% opacity except the sharp contact layer
- **No colored shadows**: Shadows remain grayscale — the accent palette never leaks into depth

## 7. Do's and Don'ts

### Do
- Use **Fraunces for headings (20px+)** and **Inter for everything else** — respect the division strictly
- **Always pair accent colors with black text** (`#111111`) — both Mirror Cyan and Lumen Lime require AAA-contrast black
- Use Mirror Cyan sparingly and intentionally — CTAs, focus rings, key links, active states
- Use Lumen Lime as a **highlighter**, not a background — one highlighted phrase per section is plenty
- Apply negative letter-spacing (-0.01 to -0.02em) to Fraunces at display sizes
- Use the multi-layered shadow stack for all card elevation — never CSS borders
- Keep backgrounds pure white or canvas gray (`#f7f7f7`)
- Apply generous section spacing (80px+)

### Don't
- Don't use Fraunces below 20px or for body text — the serifs fall apart
- Don't put white text on Mirror Cyan or Lumen Lime — contrast fails, accessibility breaks
- Don't place Mirror Cyan and Lumen Lime adjacent to each other — they're two separate moments, not a palette
- Don't use accent colors for decorative fills — they signal interaction or emphasis only
- Don't introduce gradients, glows, or additional brand colors
- Don't use CSS `border` when a ring shadow can do the same work
- Don't use Fraunces at weight 600+ — it overpowers the editorial voice
- Don't reduce section spacing below 48px, even on mobile

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | <640px | Single column, hero Fraunces ~40px, stacked features, hamburger nav |
| Tablet | 640–1024px | 2-column grids, hero ~56px |
| Desktop | 1024–1280px | Full layout, 3-column grids, hero 64–72px |
| Large | >1280px | Max-width 1200px centered |

### Touch Targets
- Buttons: minimum 44×44px tap area, 8px radius
- Primary CTA: Mirror Cyan full-width on mobile for thumb accessibility
- Nav links: 12px vertical padding minimum

### Collapsing Strategy
- **Navigation**: Horizontal → hamburger at <768px
- **Hero**: 72px Fraunces → ~40px on mobile, still weight 400
- **Feature grids**: 3-col → 2-col → 1-col
- **Section spacing**: 96px → 48px on mobile (never below)

## 9. Agent Prompt Guide

### Quick Color Reference
- **Primary Accent**: Mirror Cyan `#62d8f4` — CTA bg, links, focus. **Black text (`#111111`) on top.**
- **Secondary Accent**: Lumen Lime `#ecff8c` — highlights, badges. **Black text only.**
- **Primary Text**: Charcoal `#242424`
- **Max Contrast Text**: Midnight `#111111`
- **Secondary Text**: Mid Gray `#898989`
- **Background**: Pure White `#ffffff`
- **Canvas**: Canvas Gray `#f7f7f7`
- **Shadow Border**: `rgba(34, 42, 53, 0.08)` ring
- **Focus Ring**: `rgba(98, 216, 244, 0.5)` 2px outline, 2px offset

### Fonts
- **Display**: Fraunces (Google Fonts, variable) — 20px+ only, weights 400–500
- **Body**: Inter (variable) — all body and UI text
- **Mono**: JetBrains Mono

### Example Component Prompts
- "Create a hero section with white background, 72px Fraunces heading at weight 400, line-height 1.05, letter-spacing -0.02em, `#242424` text, centered. Include a primary CTA button with `#62d8f4` background, black text, 8px radius, 14px Inter weight 500, 12px/20px padding."
- "Design a card with white background, 16px radius, multi-layered shadow stack (contact + ring + soft), 24px internal padding. Title: 24px Fraunces weight 500. Body: 16px Inter weight 400, `#898989`."
- "Build a feature section with a 48px Fraunces heading where one key phrase is wrapped in a `#ecff8c` highlighter background (inline, 4px horizontal padding, black text)."
- "Navigation bar: white background, Inter 14px weight 500 links in `#111111`, active link with 2px Mirror Cyan underline. Right-side CTA button in Mirror Cyan with black text."
- "Form input: white background, 8px radius, shadow-ring border, 12px padding. Focus state: 2px Mirror Cyan outline at 50% opacity, 2px offset."

### Iteration Guide
When refining existing screens generated with this system:
1. Headings are **Fraunces** (400–500), body is **Inter** — never mix
2. Accent colors appear rarely and always pair with **black text**
3. Never adjacent: Mirror Cyan and Lumen Lime always have neutral space between them
4. Card elevation uses the shadow stack — no CSS borders
5. Section spacing is 80px+ on desktop, 48px minimum on mobile
6. The overall tone should feel like a **calm editorial publication** with two precise moments of color — not a colorful dashboard
