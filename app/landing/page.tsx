"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LocaleProvider, useI18n, LOCALES, type Locale } from "./_i18n";

function SuminAvatar({ size }: { size: number }) {
  return (
    <span
      className="inline-block shrink-0 rounded-full overflow-hidden bg-neutral-200"
      style={{ width: size, height: size, boxShadow: "0 0 0 3px #fff, 0 4px 12px rgba(34,42,53,0.18)" }}
    >
      <Image
        src="/sumin.jpg"
        alt="Sumin, your skin coach"
        width={size * 2}
        height={size * 2}
        className="w-full h-full object-cover"
        style={{ objectPosition: "center 26%" }}
        unoptimized
        priority
      />
    </span>
  );
}

/* 8mirrors Landing — ported from 8m-26-05-13.pen "Landing Page" frame.
   Hero (rolling cards) → How it works (auto-swipe) → Report previews → Sumin sticky bar.
   Copy is English (US target). Korean planning spec mapped 1:1 — adjust freely. */

/* ───────────────────────── shared bits ───────────────────────── */

function BottleIcon({ color = "#bbbbbb", size = 28 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 2h6v3l1.2 1.8c.5.8.8 1.7.8 2.6V20a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V9.4c0-.9.3-1.8.8-2.6L9 5V2Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M7.2 12h9.6" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-mid-gray font-body" style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em" }}>
      {children}
    </span>
  );
}

function SectionNum({ n }: { n: string }) {
  return (
    <span className="text-mid-gray" style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.15em" }}>
      {n}
    </span>
  );
}

function LimeChip({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center text-midnight ${className}`}
      style={{ background: "var(--color-lumen-lime)", borderRadius: 4, padding: "3px 8px", fontSize: 12, fontWeight: 500 }}
    >
      {children}
    </span>
  );
}

/* ───────────────────────── Hero ───────────────────────── */

function RollingColumn({ snap }: { snap: 1 | 2 }) {
  const slots: ("side" | "target")[] = ["side", "side", "target", "side", "side"];
  return (
    <div className="rolling-col">
      <div className={`rolling-track ${snap === 1 ? "snap-track-1" : "snap-track-2"}`}>
        {slots.map((kind, i) =>
          kind === "target" ? (
            <div
              key={i}
              className="target-card flex items-center justify-center rounded-[18px] border-2 border-transparent"
              style={{ aspectRatio: "1 / 1.1", padding: 10 }}
            >
              <BottleIcon color="#62d8f4" />
            </div>
          ) : (
            <div
              key={i}
              className="flex items-center justify-center rounded-[18px] bg-neutral-100 opacity-25"
              style={{ aspectRatio: "1 / 1.1", padding: 10 }}
            >
              <BottleIcon />
            </div>
          )
        )}
      </div>
    </div>
  );
}

// PLACEHOLDER numbers — replace with real rating/review data
function StarRow({ rating = "4.8", count = "1,200+ reviews" }: { rating?: string; count?: string }) {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <span style={{ color: "#242424", letterSpacing: 1, fontSize: 13 }}>★★★★★</span>
      <span className="text-midnight" style={{ fontSize: 13, fontWeight: 700 }}>{rating}</span>
      <span className="text-mid-gray" style={{ fontSize: 13 }}>· {count}</span>
    </div>
  );
}

function Hero() {
  const { t } = useI18n();
  return (
    <section className="snap-start flex flex-col items-center justify-center px-6 text-center" style={{ minHeight: "100svh", paddingTop: 64, paddingBottom: 140 }}>
      <h1 className="font-display text-charcoal" style={{ fontSize: "clamp(28px, 7.5vw, 38px)", lineHeight: 1.15, fontWeight: 500, letterSpacing: "-0.015em", maxWidth: 420 }}>
        {t("hero.titleA")}{" "}
        <span className="text-midnight" style={{ background: "var(--color-lumen-lime)", padding: "0 6px", borderRadius: 4 }}>
          {t("hero.titleB")}
        </span>
      </h1>
      <p className="mt-4 text-mid-gray" style={{ fontSize: 16, lineHeight: 1.55, maxWidth: 380 }}>
        {t("hero.sub")}
      </p>

      {/* rolling animation — sits just above the CTA */}
      <div className="rolling-mask w-full mt-8" style={{ maxWidth: 460 }}>
        <div className="grid grid-cols-3 gap-3.5 overflow-visible" style={{ height: 150 }}>
          <RollingColumn snap={1} />
          <RollingColumn snap={2} />
          <RollingColumn snap={1} />
        </div>
      </div>

      <a href="#" className="mt-8 inline-flex items-center justify-center rounded-lg" style={{ background: "var(--color-mirror-cyan)", color: "#111111", padding: "15px 30px", fontSize: 16, fontWeight: 700 }}>
        {t("hero.cta")}
      </a>
      <p className="mt-3 text-mid-gray" style={{ fontSize: 13 }}>{t("hero.micro")}</p>
      <div className="mt-3"><StarRow count={t("trust.reviews")} /></div>
    </section>
  );
}

/* ───────────────────────── How it works (auto-swipe) ───────────────────────── */

const HIW_STEPS = [
  { title: "We check your\ncurrent routine" }, // 루틴 점검
  { title: "A custom routine,\nbuilt just for your skin" }, // What you get — 커스텀 루틴
  { title: "All in one plan,\nstraight to your inbox" }, // 플랜 형태로 전달
] as const;

function DiagnosisCard() {
  return (
    <div className="relative h-full w-full rounded-[20px] bg-neutral-100 overflow-hidden">
      <div className="absolute" style={{ left: 18, top: 36 }}>
        <LimeChip>Dehydration</LimeChip>
      </div>
      <div className="absolute" style={{ left: 96, top: 96 }}>
        <LimeChip>Sensitivity</LimeChip>
      </div>
      <div className="absolute" style={{ left: 28, bottom: 28 }}>
        <LimeChip>Oily T-zone</LimeChip>
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-40">
        <BottleIcon color="#cfcfcf" size={44} />
      </div>
    </div>
  );
}

function KeywordsCard() {
  return (
    <div className="h-full w-full rounded-[20px] bg-white p-4 shadow-[var(--shadow-card)] flex flex-col">
      <Eyebrow>SKIN SPECTRUM</Eyebrow>
      <div className="font-display text-midnight mt-1" style={{ fontSize: 16, fontWeight: 500 }}>
        Current state
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="relative" style={{ width: 130, height: 130 }}>
          {[130, 96, 62].map((d) => (
            <div
              key={d}
              className="absolute rounded-full border border-neutral-200"
              style={{ width: d, height: d, left: (130 - d) / 2, top: (130 - d) / 2 }}
            />
          ))}
          <div
            className="absolute rounded-full"
            style={{ width: 108, height: 92, left: 11, top: 19, background: "#62d8f438", border: "2px solid #62d8f4" }}
          />
        </div>
      </div>
      <div className="flex justify-center gap-1.5">
        {["Acne", "Redness", "Sebum"].map((k) => (
          <LimeChip key={k} className="!text-[10px]">{k}</LimeChip>
        ))}
      </div>
    </div>
  );
}

function RoutineCard() {
  const steps = [
    ["01", "CLEANSER"],
    ["02", "TONER"],
    ["03", "SERUM"],
    ["04", "CREAM"],
  ];
  return (
    <div className="h-full w-full rounded-[20px] bg-white p-4 shadow-[var(--shadow-card)]">
      <Eyebrow>CUSTOM ROUTINE</Eyebrow>
      <div className="text-midnight mt-1 mb-3" style={{ fontSize: 13, fontWeight: 700 }}>
        DAILY <span className="text-mid-gray">5</span>
      </div>
      <div className="flex flex-col gap-2.5">
        {steps.map(([n, label]) => (
          <div key={n} className="flex items-center gap-2.5">
            <div className="rounded-lg bg-neutral-100 border border-neutral-200" style={{ width: 38, height: 38 }} />
            <div>
              <div className="text-midnight" style={{ fontSize: 12, fontWeight: 700 }}>{n}</div>
              <div className="text-mid-gray" style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em" }}>{label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TreatmentCard() {
  return (
    <div className="h-full w-full rounded-[20px] bg-white overflow-hidden flex flex-col" style={{ boxShadow: "var(--shadow-card)" }}>
      <div className="bg-neutral-200" style={{ height: 128 }} />
      <div className="p-4 flex-1">
        <div className="text-midnight" style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.2 }}>Reset &amp; Stabilize</div>
        <div className="flex items-center gap-2 mt-2.5"><Eyebrow>DURATION</Eyebrow><span className="text-[#525252]" style={{ fontSize: 13, fontWeight: 600 }}>4–6 weeks</span></div>
        <div className="mt-2.5">
          <Eyebrow>CARE STRATEGY</Eyebrow>
          <p className="truncate text-[#525252] mt-1" style={{ fontSize: 13 }}>Bring skin back to a calm baseline first…</p>
        </div>
      </div>
    </div>
  );
}

function RoutineCheckCard() {
  return (
    <div className="h-full w-full rounded-[20px] bg-white p-4 flex flex-col items-center justify-center" style={{ boxShadow: "var(--shadow-card)" }}>
      <Eyebrow>CURRENT ROUTINE</Eyebrow>
      <div className="mt-4"><ScoreDonut score={72} size={118} /></div>
      <div className="text-midnight mt-3" style={{ fontSize: 13, fontWeight: 700 }}>Routine Score</div>
      <div className="text-mid-gray" style={{ fontSize: 11 }}>Okay to Use 4 · Stop Using 2</div>
    </div>
  );
}

function PlanCard() {
  return (
    <div className="h-full w-full rounded-[20px] bg-white p-4 flex flex-col items-center justify-center gap-4" style={{ boxShadow: "var(--shadow-card)" }}>
      <Eyebrow>YOUR PLAN</Eyebrow>
      <div className="flex gap-2">
        {["o1B2I", "caInY", "A9QXft"].map((id) => (
          <div key={id} className="rounded-md overflow-hidden border border-neutral-200 bg-white" style={{ width: 56, aspectRatio: "595 / 842" }}>
            <Image src={`/report/${id}.webp`} alt="" width={112} height={158} className="w-full h-full object-cover" unoptimized />
          </div>
        ))}
      </div>
      <div className="text-mid-gray text-center" style={{ fontSize: 11 }}>One clear plan, to your inbox</div>
    </div>
  );
}

// Story frame visuals — only the custom-routine frame stays a block/card.
function RoutineCheckFrame() {
  return (
    <div className="flex flex-col items-center">
      <ScoreDonut score={72} size={168} />
      <div className="mt-4" style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>Routine Score</div>
      <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>Okay to Use 4 · Stop Using 2</div>
    </div>
  );
}
function PlanFrame() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-3">
        {["o1B2I", "caInY"].map((id) => (
          <div key={id} className="overflow-hidden rounded-lg" style={{ width: 132, aspectRatio: "595 / 842", boxShadow: "0 10px 24px rgba(0,0,0,0.5)" }}>
            <Image src={`/report/${id}.webp`} alt="" width={264} height={374} className="w-full h-full object-cover" unoptimized />
          </div>
        ))}
      </div>
      <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>Your full plan, page by page</div>
    </div>
  );
}

// Full-screen Instagram-story (dark, inset) for the 3 "what you get" frames.
function WhatYouGetStory() {
  const { t } = useI18n();
  const N = HIW_STEPS.length;
  const [frame, setFrame] = useState(0);
  const [fillW, setFillW] = useState(0);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => { if (timer.current) clearInterval(timer.current); timer.current = setInterval(() => setFrame((f) => (f + 1) % N), 3600); };
  useEffect(() => { start(); return () => { if (timer.current) clearInterval(timer.current); }; }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const go = (d: number) => { setFrame((f) => (f + d + N) % N); start(); };

  // progress gauge: animate fill 0 -> 100% each frame
  useEffect(() => {
    setFillW(0);
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setFillW(100)));
    return () => cancelAnimationFrame(id);
  }, [frame]);

  // dissolve the dark panel in/out as it enters view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const visuals = [<RoutineCheckFrame key="rc" />, <div key="r" style={{ width: 226 }}><RoutineCard /></div>, <PlanFrame key="p" />];

  return (
    <section ref={sectionRef} className="snap-start flex" style={{ minHeight: "100svh", paddingTop: 60, paddingBottom: 100, paddingLeft: 32, paddingRight: 32 }}>
      <div
        className="relative flex flex-1 flex-col items-center justify-center overflow-hidden rounded-[28px] px-6 text-center"
        style={{ background: "#121212", paddingTop: 64, paddingBottom: 40, opacity: visible ? 1 : 0, transition: "opacity 650ms ease" }}
      >
        {/* story progress segments — gauge fills up */}
        <div className="absolute left-0 right-0 flex gap-1 px-5" style={{ top: 18 }}>
          {Array.from({ length: N }).map((_, i) => (
            <div key={i} className="flex-1 overflow-hidden rounded-full" style={{ height: 3, background: "rgba(255,255,255,0.22)" }}>
              <div style={{ height: "100%", background: "var(--color-mirror-cyan)", width: i < frame ? "100%" : i === frame ? `${fillW}%` : "0%", transition: i === frame ? "width 3600ms linear" : "none" }} />
            </div>
          ))}
        </div>

        {/* section title */}
        <div className="absolute left-0 right-0 text-center" style={{ top: 34, color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 700, letterSpacing: "0.16em" }}>
          {t("wyg.eyebrow")}
        </div>

        {/* tap zones: left = prev, right = next */}
        <button aria-label="Previous" onClick={() => go(-1)} className="absolute inset-y-0 left-0 z-10" style={{ width: "32%" }} />
        <button aria-label="Next" onClick={() => go(1)} className="absolute inset-y-0 right-0 z-10" style={{ width: "68%" }} />

        <div key={frame} className="guide-bar-enter flex flex-col items-center" style={{ pointerEvents: "none" }}>
          <h2 className="font-display" style={{ fontSize: "clamp(26px, 7.5vw, 32px)", fontWeight: 500, lineHeight: 1.2, whiteSpace: "pre-line", minHeight: 78, letterSpacing: "-0.01em", color: "#ffffff" }}>
            {HIW_STEPS[frame].title}
          </h2>
          <div className="mt-7">{visuals[frame]}</div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Report previews ───────────────────────── */

function Truncate({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <p className={`truncate text-[#525252] ${className}`} style={{ fontSize: 14, lineHeight: 1.6, ...style }}>
      {children}
    </p>
  );
}

function SkinConditionRadar() {
  const axisLabels: [string, number, number][] = [
    ["Inflammatory Acne", 124, 12],
    ["Enlarged Pores", 240, 232],
    ["Comedones", 144, 256],
    ["Loss of Elasticity", 50, 232],
    ["Hyper-pigmentation", 8, 120],
    ["Uneven skin tone", 36, 50],
  ];
  const limeChips: [string, number, number][] = [
    ["Barrier Damage", 218, 50],
    ["Redness", 252, 120],
    ["Excess Sebum", 214, 188],
    ["Dryness", 12, 200],
  ];
  return (
    <div className="relative mx-auto" style={{ width: 320, height: 300 }}>
      {[200, 150, 100].map((d) => (
        <div key={d} className="absolute rounded-full border border-neutral-200" style={{ width: d, height: d, left: 76 + (200 - d) / 2, top: 30 + (200 - d) / 2 }} />
      ))}
      <div className="absolute rounded-full" style={{ width: 180, height: 150, left: 76, top: 55, background: "#62d8f438", border: "2px solid #62d8f4" }} />
      {axisLabels.map(([t, x, y]) => (
        <span key={t} className="absolute text-mid-gray" style={{ left: x, top: y, fontSize: 10, whiteSpace: "nowrap" }}>{t}</span>
      ))}
      {limeChips.map(([t, x, y]) => (
        <span key={t} className="absolute" style={{ left: x, top: y }}><LimeChip className="!text-[10px] !font-semibold">{t}</LimeChip></span>
      ))}
    </div>
  );
}

function SkinConditionVisual() {
  const cards = [
    ["Inflammatory Acne Activity", "Ongoing inflammatory cycles need steady, gentle care…"],
    ["Post-Inflammatory Redness & Marks", "Healing is happening, slowed by repeated irritation…"],
    ["Combination Balance Control", "Balance is the priority — not dryness or excess oil…"],
  ];
  return (
    <div>
      <Truncate>Reactive but stable, not fragile right now…</Truncate>
      <div className="mt-2"><SkinConditionRadar /></div>
      <div className="flex gap-3 overflow-x-auto -mx-4 px-4 mt-1">
        {cards.map(([title, body]) => (
          <div key={title} className="shrink-0 rounded-xl bg-white border border-neutral-200 p-4" style={{ width: 290 }}>
            <div className="text-midnight" style={{ fontSize: 16, fontWeight: 700 }}>{title}</div>
            <Truncate className="mt-1">{body}</Truncate>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScoreDonut({ score, size = 160 }: { score: number; size?: number }) {
  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      <div
        className="absolute inset-0 rounded-full"
        style={{ background: `conic-gradient(#62d8f4 0 ${score}%, #e5e5e5 0)` }}
      />
      <div className="absolute rounded-full bg-white flex items-center justify-center" style={{ inset: Math.round(size * 0.088) }}>
        <span className="text-midnight" style={{ fontSize: Math.round(size * 0.35), fontWeight: 700 }}>{score}</span>
      </div>
    </div>
  );
}

function RoutineCheckVisual() {
  return (
    <div>
      <div className="text-center text-mid-gray" style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
        We check your current routine
      </div>
      <div className="mt-3"><ScoreDonut score={72} size={128} /></div>
      <div className="text-center mt-2">
        <div className="text-midnight" style={{ fontSize: 14, fontWeight: 700 }}>Routine Score</div>
        <div className="text-mid-gray" style={{ fontSize: 12 }}>Okay to Use 4 · Stop Using 2</div>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <div className="flex items-center gap-2"><span style={{ color: "#1a9d3c", fontWeight: 700 }}>✓</span><span className="truncate text-[#444]" style={{ fontSize: 14 }}>Hydration &amp; barrier care are on track…</span></div>
        <div className="flex items-center gap-2"><span style={{ color: "#d24d4d", fontWeight: 700 }}>✕</span><span className="truncate text-[#444]" style={{ fontSize: 14 }}>Overlapping actives may slow repair…</span></div>
      </div>
    </div>
  );
}

function TreatmentPlanVisual() {
  return (
    <div className="flex gap-3 overflow-x-auto -mx-4 px-4">
      <div className="shrink-0 rounded-[20px] bg-white border border-neutral-200 overflow-hidden" style={{ width: 290 }}>
        <div className="bg-neutral-200" style={{ height: 170 }} />
        <div className="p-5">
          <div className="text-midnight" style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.2 }}>Reset &amp; Stabilize</div>
          <div className="flex items-center gap-2.5 mt-3"><Eyebrow>DURATION</Eyebrow><span className="text-[#525252] text-sm font-semibold">4–6 weeks</span></div>
          <div className="mt-3"><Eyebrow>CARE STRATEGY</Eyebrow><Truncate className="mt-1">Bring skin back to a calm, stable baseline first…</Truncate></div>
        </div>
      </div>
      <div className="shrink-0 rounded-[20px] bg-white border border-neutral-200 p-5" style={{ width: 290 }}>
        <Eyebrow>ACTION</Eyebrow>
        <div className="flex flex-col gap-3 mt-3">
          {["Simplify to core steps — cleanse, calm, protect…", "Pause overlapping actives to reduce irritation…", "Cleanse gently and consistently…"].map((t, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="shrink-0 rounded-full bg-midnight text-white flex items-center justify-center" style={{ width: 24, height: 24, fontSize: 12, fontWeight: 700 }}>{i + 1}</span>
              <span className="truncate text-[#525252] text-sm">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CustomRoutineVisual() {
  const products = [
    ["01", "CLEANSER", "ILLIYOON Ceramide Ato 5.0 Cleanser"],
    ["02", "TONER", "Anua Heartleaf 77 Soothing Toner"],
    ["03", "SERUM", "Beauty of Joseon Glow Serum"],
  ];
  return (
    <div>
      <div className="flex items-center gap-6 mb-4">
        <span className="text-mid-gray" style={{ fontSize: 20, fontWeight: 500 }}>Daily <span className="text-[13px]">5</span></span>
        <span className="text-midnight flex items-center gap-1.5" style={{ fontSize: 20, fontWeight: 700 }}>
          Special <span className="text-mid-gray text-[13px]">7</span>
          <LimeChip className="!text-[10px] !font-bold">POPULAR</LimeChip>
        </span>
      </div>
      <div className="flex gap-6 overflow-x-auto -mx-4 px-4">
        {products.map(([n, cat, name]) => (
          <div key={n} className="shrink-0 flex flex-col items-center text-center" style={{ width: 240 }}>
            <div className="rounded-[18px] bg-neutral-100 flex items-center justify-center w-full" style={{ height: 200 }}>
              <BottleIcon color="#c9b6f0" size={56} />
            </div>
            <div className="flex items-center gap-2 mt-4">
              <span className="rounded bg-midnight text-white flex items-center justify-center" style={{ width: 28, height: 22, fontSize: 11, fontWeight: 700 }}>{n}</span>
              <span className="text-mid-gray" style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em" }}>{cat}</span>
            </div>
            <div className="text-midnight mt-2" style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.3 }}>{name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FinalMessageVisual() {
  return (
    <p className="text-[#525252]" style={{ fontSize: 15, lineHeight: 1.7 }}>
      Dear Sarah 🤍
      <br />
      <br />
      Your skin journey hasn&apos;t been easy, and it makes complete sense if you&apos;ve felt frustrated or tired
      along the way. When breakouts, redness, or slow progress keep repeating, it can feel personal — but it
      isn&apos;t a failure on your part. It&apos;s simply your skin asking for time, consistency, and the right kind of
      support…
    </p>
  );
}

/* ───────────────────────── Report panel (title → Sumin bubble → reference) ───────────────────────── */

function Glimpse({ children, max = 420, boxed = false }: { children: React.ReactNode; max?: number; boxed?: boolean }) {
  return (
    <div>
      <div className="text-center text-mid-gray mb-2" style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em" }}>
        FROM YOUR FULL REPORT
      </div>
      <div
        className={`relative overflow-hidden ${boxed ? "rounded-2xl border border-neutral-200 bg-[#fafafa] px-4 pt-4" : ""}`}
        style={{
          maxHeight: max,
          pointerEvents: "none",
          WebkitMaskImage: "linear-gradient(to bottom, #000 78%, transparent)",
          maskImage: "linear-gradient(to bottom, #000 78%, transparent)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

type Panel = { id: string; num: string; title: string; message: string; boxed?: boolean; Visual: () => React.ReactElement };

function ReportPanel({ panel, panelRef }: { panel: Panel; panelRef: (el: HTMLElement | null) => void }) {
  const { boxed, Visual } = panel;
  return (
    <section
      ref={panelRef}
      className="snap-start flex flex-col justify-center px-5"
      style={{ minHeight: "100svh", paddingTop: 168, paddingBottom: 150 }}
    >
      <Glimpse max={boxed ? 400 : 440} boxed={boxed}><Visual /></Glimpse>
    </section>
  );
}

const REPORT_PANELS: Panel[] = [
  { id: "routine-check", num: "01", title: "Routine Check", message: "We check what's working in your current routine — and what to drop.", Visual: RoutineCheckVisual },
  { id: "custom-routine", num: "02", title: "Custom Routine", message: "We curate your K-beauty routine and ship it to your door.", Visual: CustomRoutineVisual },
];

/* ───────────────────────── Fixed chrome: header, coach bubble, buy bar ───────────────────────── */

/* ───────────────────────── Expert team ───────────────────────── */

const TEAM = ["/team1.jpg", "/team2.jpg", "/team3.jpg"];

function TeamAvatars({ size = 48 }: { size?: number }) {
  return (
    <div className="flex shrink-0">
      {TEAM.map((src, i) => (
        <span
          key={src}
          className="inline-block rounded-full overflow-hidden bg-neutral-200"
          style={{ width: size, height: size, marginLeft: i === 0 ? 0 : -Math.round(size * 0.3), boxShadow: "0 0 0 3px #fff", zIndex: TEAM.length - i, position: "relative" }}
        >
          <Image src={src} alt="" width={size * 2} height={size * 2} className="w-full h-full object-cover" style={{ objectPosition: "center 20%" }} unoptimized />
        </span>
      ))}
    </div>
  );
}

function TeamSection() {
  const { t } = useI18n();
  return (
    <section className="snap-start flex flex-col items-center justify-center px-6 text-center" style={{ minHeight: "100svh", paddingTop: 64, paddingBottom: 120 }}>
      <Eyebrow>{t("team.eyebrow")}</Eyebrow>
      <div className="mt-6"><TeamAvatars size={74} /></div>
      <h2 className="font-display text-charcoal mt-7" style={{ fontSize: "clamp(26px, 7.5vw, 34px)", fontWeight: 500, lineHeight: 1.15, letterSpacing: "-0.01em" }}>
        {t("team.titleA")}
        <br />
        {t("team.titleB")}
      </h2>
      <p className="text-mid-gray mt-4" style={{ fontSize: 16, lineHeight: 1.55, maxWidth: 380 }}>
        {t("team.body")}
      </p>

      {/* credibility stats — PLACEHOLDER numbers */}
      <div className="mt-7 flex items-center gap-7">
        <div className="flex flex-col items-center">
          <span className="font-display text-midnight" style={{ fontSize: 30, fontWeight: 500, lineHeight: 1 }}>12,000+</span>
          <span className="text-mid-gray mt-1" style={{ fontSize: 12 }}>{t("team.statSkinsLabel")}</span>
        </div>
        <div className="bg-neutral-200" style={{ width: 1, height: 36 }} />
        <div className="flex flex-col items-center">
          <span className="font-display text-midnight" style={{ fontSize: 30, fontWeight: 500, lineHeight: 1 }}>30+</span>
          <span className="text-mid-gray mt-1" style={{ fontSize: 12 }}>{t("team.statNatsLabel")}</span>
        </div>
      </div>

      <a href="/landing/about" className="mt-7 inline-flex items-center gap-1.5 rounded-lg bg-white px-5 py-2.5 text-midnight" style={{ fontSize: 14, fontWeight: 600, boxShadow: "var(--shadow-card)" }}>
        {t("team.more")} <span aria-hidden>→</span>
      </a>
    </section>
  );
}

/* ───────────────────────── Full report archive (marquee) ───────────────────────── */

const REPORT_PAGES = ["o1B2I", "aTDHd", "caInY", "fYz7t", "LQX50", "A9QXft", "aiIAQ", "OKhdI"];

function ReportArchiveSection() {
  const { t } = useI18n();
  const pages = [...REPORT_PAGES, ...REPORT_PAGES]; // duplicated for a seamless loop
  return (
    <section className="snap-start flex flex-col justify-center overflow-hidden" style={{ minHeight: "100svh", paddingTop: 72, paddingBottom: 150 }}>
      <div className="px-6 text-center">
        <Eyebrow>{t("full.eyebrow")}</Eyebrow>
        <h2 className="font-display text-charcoal mt-2" style={{ fontSize: "clamp(26px, 7.5vw, 34px)", fontWeight: 500, lineHeight: 1.15, letterSpacing: "-0.01em" }}>
          {t("full.titleA")}
          <br />
          {t("full.titleB")}
        </h2>
        <p className="text-mid-gray mt-4 mx-auto" style={{ fontSize: 16, lineHeight: 1.55, maxWidth: 380 }}>
          {t("full.body")}
        </p>
      </div>
      <div
        className="mt-8 overflow-hidden"
        style={{ WebkitMaskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)", maskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)" }}
      >
        <div className="marquee-track" style={{ display: "flex", flexDirection: "row", width: "max-content", gap: 14, animation: "marquee-left 36s linear infinite" }}>
          {pages.map((id, i) => (
            <div key={i} className="shrink-0 rounded-lg overflow-hidden border border-neutral-200 bg-white" style={{ width: 118, aspectRatio: "595 / 842" }}>
              <Image src={`/report/${id}.webp`} alt="Report page" width={236} height={334} className="w-full h-full object-cover" unoptimized />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Photo privacy reassurance ───────────────────────── */

function EyeMaskFace({ size = 48 }: { size?: number }) {
  return (
    <div className="relative shrink-0 overflow-hidden bg-neutral-200" style={{ width: size, height: size, borderRadius: 12 }}>
      <Image src="/face/front.png" alt="" width={size * 2} height={size * 2} className="w-full h-full object-cover" unoptimized />
      <div
        className="absolute"
        style={{ left: "14%", right: "14%", top: "35%", height: "18%", borderRadius: 999, backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", background: "rgba(255,255,255,0.4)" }}
      />
    </div>
  );
}

/* ───────────────────────── Real results (before & after) ───────────────────────── */

const BEFORE_AFTER = [
  "https://static.wixstatic.com/media/3987eb_9443f1a81e5b4a8fa363cd389cb30b84~mv2.png",
  "https://static.wixstatic.com/media/3987eb_0648fdd7364c4ec68a39d10d9c46c322~mv2.png",
  "https://static.wixstatic.com/media/3987eb_a255a356d091465e9a69f348f738a808~mv2.png",
  "https://static.wixstatic.com/media/3987eb_a8aa54b09e95438aa8b6ea4d776fb0a7~mv2.png",
  "https://static.wixstatic.com/media/3987eb_01978b53464f4520a332702e96307fcb~mv2.png",
  "https://static.wixstatic.com/media/3987eb_923f48c5fe7e4e328a1a61d439cbeb7d~mv2.png",
];

function BeforeAfterSection() {
  const { t } = useI18n();
  return (
    <section className="snap-start flex flex-col justify-center" style={{ minHeight: "100svh", paddingTop: 72, paddingBottom: 150 }}>
      <div className="px-6 text-center">
        <Eyebrow>{t("results.eyebrow")}</Eyebrow>
        <h2 className="font-display text-charcoal mt-2" style={{ fontSize: "clamp(26px, 7.5vw, 34px)", fontWeight: 500, lineHeight: 1.15, letterSpacing: "-0.01em" }}>
          {t("results.titleA")}
          <br />
          {t("results.titleB")}
        </h2>
        <p className="text-mid-gray mt-4 mx-auto" style={{ fontSize: 16, lineHeight: 1.55, maxWidth: 380 }}>
          {t("results.body")}
        </p>
        <div className="mt-4"><StarRow count={t("trust.reviews")} /></div>
      </div>
      <div className="mt-6 flex gap-3 overflow-x-auto px-6 pb-1" style={{ scrollSnapType: "x mandatory" }}>
        {BEFORE_AFTER.map((u, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={i} src={u} alt="Before and after" loading="lazy" className="shrink-0 rounded-xl border border-neutral-200" style={{ width: 264, scrollSnapAlign: "center" }} />
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── Offer (anchored price) ───────────────────────── */

function OfferSection() {
  const { t } = useI18n();
  return (
    <section className="snap-start flex flex-col justify-center px-6" style={{ minHeight: "100svh", paddingTop: 72, paddingBottom: 150 }}>
      <Eyebrow>{t("offer.eyebrow")}</Eyebrow>
      <h2 className="font-display text-charcoal mt-1.5" style={{ fontSize: 22, fontWeight: 500, lineHeight: 1.2, letterSpacing: "-0.01em" }}>
        {t("offer.titleA")} {t("offer.titleB")}
      </h2>

      <div className="mt-5 flex items-baseline gap-3">
        <span className="font-display text-midnight" style={{ fontSize: 44, lineHeight: 1, letterSpacing: "-0.02em" }}>$9.99</span>
        <span className="text-mid-gray line-through" style={{ fontSize: 15 }}>$24.99</span>
        <span className="text-midnight" style={{ background: "var(--color-lumen-lime)", borderRadius: 4, padding: "3px 8px", fontSize: 12, fontWeight: 700, lineHeight: 1 }}>{t("offer.save")}</span>
      </div>

      <ul className="mt-5 flex flex-col gap-2.5">
        {[t("offer.inc1"), t("offer.inc2"), t("offer.inc3"), t("offer.inc4")].map((item) => (
          <li key={item} className="flex gap-2.5 text-[#444]" style={{ fontSize: 16, lineHeight: 1.5 }}>
            <span style={{ color: "#62d8f4", fontWeight: 700 }}>✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center gap-3">
        <EyeMaskFace size={44} />
        <p className="text-mid-gray text-left" style={{ fontSize: 13, lineHeight: 1.4 }}>
          {t("offer.privacyA")} <span className="text-midnight font-semibold">{t("offer.privacyB")}</span>{t("offer.privacyC")}
        </p>
      </div>

      {/* PLACEHOLDER testimonial — replace with a real review */}
      <div className="mt-6 rounded-xl border border-neutral-200 p-4">
        <StarRow count="verified customer" />
        <p className="text-midnight mt-2" style={{ fontSize: 15, lineHeight: 1.5 }}>
          &ldquo;My skin finally calmed down in a few weeks — the routine actually made sense for me.&rdquo;
        </p>
        <p className="text-mid-gray mt-1" style={{ fontSize: 13 }}>— Sarah J., verified customer</p>
      </div>
    </section>
  );
}

/* ───────────────────────── Customer stories (reused StoryCard UI) ───────────────────────── */

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
      <circle cx="12" cy="12" r="4" stroke="#111" strokeWidth="1.5" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19" stroke="#111" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
      <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" stroke="#111" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function RoutineThumb() {
  return <div className="shrink-0 rounded" style={{ width: 30, height: 30, background: "#fff", boxShadow: "inset 0 0 0 1px #e0e0e0" }} />;
}

type Story = { who: string; quote: string; img: string; concerns: string[]; goals: string[]; am: number; pm: number };

const STORIES: Story[] = [
  {
    who: "ma****  ·  22  ·  USA",
    quote: "Switched my toner and the redness was gone in 3 weeks.",
    img: BEFORE_AFTER[0],
    concerns: ["Oily", "Acne", "Pores", "Redness"],
    goals: ["Calming inflammation", "Return to baseline"],
    am: 5,
    pm: 4,
  },
  {
    who: "je**  ·  31  ·  UK",
    quote: "My breakouts slowed down and my skin feels calm.",
    img: BEFORE_AFTER[2],
    concerns: ["Combination", "Breakouts", "Dryness"],
    goals: ["Reduce breakouts", "Restore the barrier"],
    am: 4,
    pm: 5,
  },
];

function StoryCard({ s }: { s: Story }) {
  return (
    <article className="flex shrink-0 flex-col gap-2.5 rounded-2xl bg-white p-3" style={{ width: 268, boxShadow: "var(--shadow-card)" }}>
      <div className="flex flex-col gap-0.5">
        <p className="text-mid-gray" style={{ fontSize: 11 }}>{s.who}</p>
        <p className="text-midnight" style={{ fontSize: 13, lineHeight: 1.4 }}>&ldquo;{s.quote}&rdquo;</p>
      </div>

      <div className="overflow-hidden rounded-lg" style={{ height: 140, background: "#f0f0f0" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={s.img} alt="Before and after" loading="lazy" className="w-full h-full object-cover" />
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-mid-gray" style={{ fontSize: 11, fontWeight: 600 }}>Concerns</span>
        <div className="flex flex-wrap gap-1.5">
          {s.concerns.map((c) => (
            <span key={c} className="rounded-full bg-white text-midnight" style={{ fontSize: 10, fontWeight: 500, padding: "2px 8px", boxShadow: "inset 0 0 0 1px #e0e0e0" }}>{c}</span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-mid-gray" style={{ fontSize: 11, fontWeight: 600 }}>Goal</span>
        {s.goals.map((g, i) => (
          <p key={g} className="text-midnight" style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.3 }}>{i + 1}. {g}</p>
        ))}
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-mid-gray" style={{ fontSize: 11, fontWeight: 600 }}>Custom Routine</span>
        <div className="flex flex-col gap-1.5 rounded-lg p-2.5" style={{ background: "var(--color-canvas)" }}>
          <div className="flex items-center gap-1.5"><SunIcon />{Array.from({ length: s.am }).map((_, i) => <RoutineThumb key={i} />)}</div>
          <div className="flex items-center gap-1.5"><MoonIcon />{Array.from({ length: s.pm }).map((_, i) => <RoutineThumb key={i} />)}</div>
        </div>
      </div>
    </article>
  );
}

function StoriesSection() {
  return (
    <section className="snap-start flex flex-col justify-center" style={{ minHeight: "100svh", paddingTop: 72, paddingBottom: 140 }}>
      <div className="px-5 text-left">
        <Eyebrow>CUSTOMER STORIES</Eyebrow>
        <h2 className="font-display text-charcoal mt-1.5" style={{ fontSize: 22, fontWeight: 500, lineHeight: 1.2, letterSpacing: "-0.01em" }}>
          Real skin, rebuilt in weeks
        </h2>
      </div>
      <div className="no-scrollbar mt-5 flex gap-3 overflow-x-auto px-5 pb-2" style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {STORIES.map((s, i) => (
          <div key={i} style={{ scrollSnapAlign: "start" }}><StoryCard s={s} /></div>
        ))}
      </div>
    </section>
  );
}

const PAYPAL_URL = "https://www.paypal.com/ncp/payment/NFWM2BSB77C86";

// Menu items → internalized in-app pages at /landing/<slug>
const MENU: [string, string][] = [
  ["About Us", "about"],
  ["What You Get", "what-you-get"],
  ["How It Works", "how-it-works"],
  ["Before and Afters", "before-afters"],
  ["FAQs", "faqs"],
  ["Contact Us", "contact"],
];

function Header() {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { locale, setLocale } = useI18n();
  return (
    <>
      <header className="fixed top-0 inset-x-0 z-[55]">
        <div
          className="mx-auto flex items-center justify-between px-4"
          style={{ maxWidth: 480, height: 52, background: "#ffffff", borderBottom: "1px solid #eee" }}
        >
          <Image src="/logo.png" alt="8mirrors" width={76} height={18} unoptimized priority style={{ height: 18, width: "auto" }} />
          <div className="flex items-center gap-1">
            <div className="relative">
              <button type="button" aria-label="Language" onClick={() => { setLangOpen((v) => !v); setOpen(false); }} className="flex items-center gap-1 p-2 text-midnight" style={{ fontSize: 13, fontWeight: 600 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden><circle cx="12" cy="12" r="9" stroke="#111" strokeWidth="1.6" /><path d="M3 12h18M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18" stroke="#111" strokeWidth="1.6" /></svg>
                {locale.toUpperCase()}
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-1 rounded-xl bg-white py-1" style={{ minWidth: 132, boxShadow: "0 10px 24px rgba(0,0,0,0.12)", border: "1px solid #eee" }}>
                  {LOCALES.map(([code, label]) => (
                    <button key={code} type="button" onClick={() => { setLocale(code as Locale); setLangOpen(false); }} className="flex w-full items-center justify-between px-4 py-2.5 text-left text-midnight" style={{ fontSize: 14, fontWeight: locale === code ? 700 : 400 }}>
                      {label}
                      {locale === code && <span style={{ color: "#62d8f4" }}>✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button type="button" aria-label="Menu" aria-expanded={open} onClick={() => { setOpen((v) => !v); setLangOpen(false); }} className="-mr-2 p-2">
            {open ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 5l14 14M19 5L5 19" stroke="#111" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M3 6h18M3 12h18M3 18h18" stroke="#111" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
          </div>
        </div>
      </header>

      {/* backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[53] bg-black/30 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        aria-hidden
      />

      {/* slide-down menu (drops from behind the header bar) */}
      <div className="fixed left-1/2 z-[54] w-full" style={{ top: 52, maxWidth: 480, transform: "translateX(-50%)" }}>
        <nav
          className={`bg-white border-b border-neutral-200 transition-transform duration-300 ease-out ${open ? "translate-y-0" : "-translate-y-[130%]"}`}
          style={{ boxShadow: "0 14px 28px rgba(0,0,0,0.1)" }}
        >
          {MENU.map(([title, slug], i) => (
            <a
              key={title}
              href={`/landing/${slug}`}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between px-5 py-4 text-midnight"
              style={{ fontSize: 16, fontWeight: 500, borderBottom: i < MENU.length - 1 ? "1px solid #f0f0f0" : "none" }}
            >
              {title}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M9 6l6 6-6 6" stroke="#bbb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}

// Fixed expert area (layout B caption) — only the text swaps per section.
function CoachBubble({ num, title, message, visible }: { num: string; title: string; message: string; visible: boolean }) {
  const { t } = useI18n();
  return (
    <div className="fixed left-1/2 z-40 w-full px-5" style={{ top: 60, maxWidth: 480, transform: "translateX(-50%)", pointerEvents: "none" }}>
      <div className="transition-all duration-300" style={{ opacity: visible ? 1 : 0, transform: `translateY(${visible ? 0 : -10}px)` }}>
        <div key={title} className="flex items-start gap-3 text-left guide-bar-enter">
          <TeamAvatars size={44} />
          <div className="flex-1">
            <div className="text-mid-gray" style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em" }}>{num} · {t("coach.label")}</div>
            <h3 className="font-display text-midnight mt-0.5" style={{ fontSize: 22, fontWeight: 500, lineHeight: 1.15 }}>{title}</h3>
            <p className="text-midnight mt-1" style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.45 }}>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="#111" strokeWidth="2" />
      <path d="M12 11v5M12 7.4h.01" stroke="#111" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function HowItWorksSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const labelCss: React.CSSProperties = { fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" };
  return (
    <div
      className={`fixed inset-0 z-[60] mx-auto transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      style={{ maxWidth: 480 }}
    >
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden />
      <div
        className={`absolute bottom-0 inset-x-0 bg-white rounded-t-3xl overflow-y-auto transition-transform duration-300 ease-out ${open ? "translate-y-0" : "translate-y-full"}`}
        style={{ maxHeight: "88vh" }}
      >
        <div className="sticky top-0 bg-white pt-3 pb-2 flex justify-center"><div className="w-12 rounded-full bg-neutral-200" style={{ height: 6 }} /></div>
        <div className="flex flex-col gap-6 px-6 pb-8 pt-3">
          <div className="flex flex-col gap-1">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-midnight" style={{ fontSize: 36, lineHeight: 1, letterSpacing: "-0.02em" }}>$9.99</span>
              <span className="text-mid-gray line-through" style={{ fontSize: 14 }}>$24.99</span>
              <span className="text-midnight" style={{ background: "var(--color-lumen-lime)", borderRadius: 4, padding: "2px 8px", fontSize: 12, fontWeight: 700, lineHeight: 1 }}>60% OFF</span>
            </div>
            <p className="text-mid-gray" style={{ fontSize: 14 }}>Skin Analysis &amp; Custom Routine — Phase 1</p>
          </div>
          <div className="h-px bg-neutral-200" />
          <div className="flex flex-col gap-3">
            <h3 className="text-mid-gray" style={labelCss}>What you get</h3>
            <ul className="flex flex-col gap-3">
              {[["📋", "A full read of your skin"], ["✨", "Custom AM & PM routine"], ["👩‍💼", "2 weeks of online skin coaching directly from our team"]].map(([e, t]) => (
                <li key={t} className="flex items-start gap-3 text-midnight" style={{ fontSize: 16, lineHeight: 1.35 }}>
                  <span style={{ fontSize: 20, lineHeight: 1 }}>{e}</span><span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="h-px bg-neutral-200" />
          <div className="flex flex-col gap-3">
            <h3 className="text-mid-gray" style={labelCss}>How it works</h3>
            <ol className="flex flex-col gap-3">
              {[["1", "Upload photos of your skin"], ["2", "Sumin — Korean skin expert & 8mirrors CEO — analyzes your skin"], ["3", "Receive your custom routine by email — 4 to 5 business days"]].map(([n, t]) => (
                <li key={n} className="flex items-start gap-3 text-midnight" style={{ fontSize: 16, lineHeight: 1.35 }}>
                  <span className="flex shrink-0 items-center justify-center rounded-full text-midnight" style={{ width: 24, height: 24, fontSize: 12, fontWeight: 600, background: "var(--color-mirror-cyan-subtle)" }}>{n}</span>
                  <span>{t}</span>
                </li>
              ))}
            </ol>
          </div>
          <p className="text-center text-mid-gray" style={{ fontSize: 12, lineHeight: 1.6 }}>Payment via PayPal or credit card · Delivered to your email</p>
          <a href={PAYPAL_URL} target="_blank" rel="noopener noreferrer" className="rounded-lg px-6 py-4 text-center text-midnight" style={{ fontSize: 16, fontWeight: 700, background: "var(--color-mirror-cyan)", boxShadow: "var(--shadow-card)" }}>
            Continue to PayPal · $9.99
          </a>
        </div>
      </div>
    </div>
  );
}

function BuyBar() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-50 pointer-events-none">
        <div className="mx-auto w-full pointer-events-auto" style={{ maxWidth: 480, background: "linear-gradient(to top, #ffffff 58%, rgba(255,255,255,0.92) 78%, rgba(255,255,255,0) 100%)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", paddingTop: 8 }}>
          <div className="flex items-center justify-center gap-2 px-4 pt-3 text-mid-gray" style={{ fontSize: 12 }}>
            <span className="line-through">$24.99</span>
            <span className="text-midnight" style={{ fontSize: 16, fontWeight: 700 }}>$9.99</span>
            <span className="text-midnight" style={{ background: "var(--color-lumen-lime)", borderRadius: 4, padding: "2px 6px", fontSize: 10, fontWeight: 700, lineHeight: 1 }}>60% OFF</span>
            <span aria-hidden>·</span>
            <span>{t("bar.delivery")}</span>
          </div>
          <div className="flex gap-2 px-4 pt-2.5" style={{ paddingBottom: 16 }}>
            <button type="button" onClick={() => setOpen(true)} className="flex items-center justify-center gap-1.5 rounded-lg bg-white px-4 py-3 text-midnight" style={{ fontSize: 14, fontWeight: 600, boxShadow: "var(--shadow-card)" }}>
              <InfoIcon /> {t("bar.how")}
            </button>
            <a href="#" className="flex flex-1 items-center justify-center rounded-lg px-4 py-3 text-midnight" style={{ fontSize: 14, fontWeight: 700, background: "var(--color-mirror-cyan)" }}>
              {t("bar.cta")}
            </a>
          </div>
        </div>
      </div>
      <HowItWorksSheet open={open} onClose={() => setOpen(false)} />
    </>
  );
}

/* ───────────────────────── Page ───────────────────────── */

export default function Landing() {
  return (
    <LocaleProvider>
      <Header />
      <main className="mx-auto bg-white snap-y snap-mandatory" style={{ maxWidth: 480, height: "100dvh", overflowY: "auto" }}>
        <Hero />
        <WhatYouGetStory />
        <TeamSection />
        <StoriesSection />
        <OfferSection />
      </main>
      <BuyBar />
    </LocaleProvider>
  );
}
