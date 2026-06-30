# Marketer Guide — Building Landing Variants

How to run 8mirrors landing A/B tests with **almost no code**. Just follow the steps in order.

> ## ⚠️ Two rules that prevent 90% of problems
> 1. **Always `git pull` before you start.** The live site is `main` — if you don't pull, you'll be editing an **old version** of the page (and your preview will look wrong).
> 2. **Never commit on `main`.** Always work on a `variant/<name>` branch. Committing on your local `main` makes your copy drift from the live site and you'll get stuck.
>
> **Seeing an old page / out of sync?** Easiest fix: delete the folder and **re-clone fresh** (see §4).

---

## 0. One-time — accounts & programs

### Two accounts to create
1. **GitHub account** (required, free) — sign up at https://github.com → **send your username to 고고 (the owner)** so they can grant access to this repo.
2. **Codex (OpenAI) account** — your AI assistant. (If you already use Codex, you're set.)

> Git (the tool on your computer) and GitHub (the web account) are different things, but VSCode handles the install/login for you. Don't worry about it.

### Install
1. **VSCode** — https://code.visualstudio.com
2. **Node.js** (LTS) — https://nodejs.org (needed to preview the landing on your own machine)
3. Inside VSCode, install the **Codex extension** and log in.

### Get the repo (once)
VSCode → `Cmd+Shift+P` → **Git: Clone** → paste the URL below → log in when GitHub prompts:
```
https://github.com/shimgo90-oss/8m-landing.git
```
Then, in the VSCode terminal (`Ctrl+\``), run once:
```bash
npm install
```
(Optional, for nicer commit attribution: `git config user.email "you@your-github-email.com"`.)

---

## 1. Every time you start

```bash
git checkout main && git pull         # get the latest
git checkout -b variant/<name>         # your working branch (e.g. variant/glowup)
npm run dev                            # preview at http://localhost:3000/lp/<slug>
```

> ⚠️ **Don't skip `git pull`** — it's the #1 cause of "the page looks old/wrong." And **never commit on `main`**: only ever commit on your `variant/<name>` branch.

---

## 2. Make a variant (the core — no code)

Open one file: **`app/landing/_variants.tsx`**

Copy one block and change just 4 things to get a new variant + its URL:

```ts
{
  slug: "glowup",                    // → the URL becomes /lp/glowup (lowercase-with-dashes)
  label: "Glow-up (copy test)",      // internal name, not shown to users
  note: "Hypothesis: leading with the 8-week visible change lifts conversion",
  sections: ["hero", "what-you-get", "offer", "footer"],  // which blocks, in what order
  copy: {                            // change wording only (no code)
    "hero.titleA": "In 8 weeks, the mirror",
    "hero.titleB": "feels good",      // this part gets the lime highlight
    "hero.sub": "Two minutes is all it takes. Start a routine matched to your skin.",
    "bar.cta": "Start my routine",
  },
}
```

- Blocks you can use: `hero · what-you-get · report-archive · team · stories · offer · footer`
- Copy keys you can change: see `app/landing/_i18n.tsx` (`hero.titleA`, `hero.titleB`, `hero.sub`, `hero.cta`, `bar.cta`, …)
- Stuck? Tell Codex: *"In `_variants.tsx`, copy the `lean` variant, set slug to `glowup`, and change the headline to ~."*

> ⚠️ **Copy rules**: user-facing copy is **US English** (you're writing for a US audience — use US spelling/idiom: *color*, not *colour*). Follow the tone in `context/` (brand-voice / value-prop / variant-playbook). **Don't sell "a report"** → frame it as a matched routine / visible results.

### Need a new design or block?
Go ahead — ask Codex to build it (you can edit components too). Just preview it and open a PR; **고고 reviews before it goes live**, so nothing breaks production. For bigger redesigns you can also ping 고고/Claude to build the block for you.

---

## 2½. Editing a template page (the $119 Box & Redness)

Two pages are **templates** — richer than the simple variants above, but edited the same way (in `_variants.tsx`):

- `/lp/box` → `template: "pdp"` (product-detail page)
- `/lp/redness` → `template: "story"` (story-led page)

To spin a test off one: **copy its block, change the `slug`, override only what you want.** You can touch 5 things — nothing else:

```ts
{
  slug: "box-glow",
  template: "pdp",                  // keep the same template
  label: "Box — glow angle",
  note: "Hypothesis: …",

  sections: ["hero", "results", "info", "howto", "experts", "faq", "reviews", "footer"], // reorder / remove

  copy: {                           // text only (keys live in app/landing/_tpl-pdp.tsx → PDP_DEFAULTS.copy)
    "hero.title": "The Custom Routine Box",
    "hero.price": "$119",
    "hero.cta": "Get my box",
    "bar.promo": "Order now — free shipping + a free gift",
  },

  images: {                         // photo/video slots → drop a file in /public and point to it
    "gallery.0": "/lp/box/hero.png",    // gallery.0–5 = top carousel
    "howto.0": "/lp/box/step1.jpg",     // howto.0–2  = "How to use" cards
    "results.before": "/lp/box/before.jpg",
    "results.after": "/lp/box/after.jpg",
  },

  links: { cta: "https://your-checkout-url" }, // where the buy button goes

  lists: {                          // repeatable content (arrays) — see PDP_DEFAULTS.lists
    reviews: [{ body: "…", who: "Austin, TX", date: "2 weeks ago" }],
    faq: [{ q: "…", a: "…" }],
  },
}
```

- **Where every key lives**: open `app/landing/_tpl-pdp.tsx` (or `_tpl-story.tsx`) and read `PDP_DEFAULTS` — every `copy` key, `images` slot, `lists` array, and `sections` key the template accepts is right there. Copy one, override it in your variant.
- **Locked by design** (you can't break it): layout, colors, fonts, spacing. You only change content / order / destinations.
- Leave an `images` slot empty → it shows a grey placeholder (fine for a copy test).
- **Need a new section or a layout change?** That's a Claude job — ask, and it's added to the template for everyone.

---

## 3. Preview → push → get reviewed

```bash
git add -A && git commit -m "variant: add glowup" && git push -u origin variant/glowup
```

- Pushing makes **Vercel auto-generate a preview URL** → check it on your phone (mobile test recommended).
- Open a **Pull Request** on GitHub → **고고 reviews it from a design perspective, then merges**.
- Once merged, it's automatically live at `8mirrors-design-sandbox.vercel.app/lp/<slug>` → connect your ad to it.

> 🔒 You can't merge/push directly to `main` (it's protected). Always branch → PR → 고고 approves.

---

## 4. When stuck

- What/why to test: `context/variant-playbook.md`
- Tone & wording: `context/brand-voice.md`
- Design rules: `DESIGN.md`
- Still stuck? Ask Codex, or 고고.

### Page looks old / out of sync?
Your local copy has drifted from the live site. Fastest fix — **re-clone fresh** (you lose only un-pushed local changes):
```bash
cd ..                                  # leave the project folder
# delete or rename the old project folder, then:
git clone https://github.com/shimgo90-oss/8m-landing.git
cd 8m-landing && npm install && npm run dev
```
(Or ask Codex: *"Hard-reset my local main to origin/main and start a fresh variant branch."*)
