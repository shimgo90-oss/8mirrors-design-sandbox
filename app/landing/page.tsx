"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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

function Hero() {
  return (
    <section className="snap-start flex flex-col items-center justify-center px-5 text-center" style={{ minHeight: "100svh", paddingTop: 64, paddingBottom: 140 }}>
      {/* rolling animation — sits above the coach profile */}
      <div className="rolling-mask w-full" style={{ maxWidth: 460 }}>
        <div className="grid grid-cols-3 gap-3.5 overflow-visible" style={{ height: 154 }}>
          <RollingColumn snap={1} />
          <RollingColumn snap={2} />
          <RollingColumn snap={1} />
        </div>
      </div>

      {/* Statement card — pulled up to overlap the animation */}
      <div className="relative z-10 flex flex-col items-center w-full" style={{ marginTop: -28 }}>
        <div
          className="relative w-full rounded-[28px] bg-white px-6 py-7"
          style={{ maxWidth: 440, boxShadow: "var(--shadow-card)" }}
        >
          <h1
            className="relative font-display text-charcoal"
            style={{ fontSize: "clamp(30px, 8.5vw, 44px)", lineHeight: 1.12, fontWeight: 500, letterSpacing: "-0.015em" }}
          >
            Get your skincare routine that{" "}
            <span className="text-midnight" style={{ background: "var(--color-lumen-lime)", padding: "0 6px", borderRadius: 4 }}>
              actually works
            </span>
          </h1>
          <p className="relative mt-4 text-mid-gray" style={{ fontSize: 16, lineHeight: 1.55 }}>
            Skincare is not one-size-fits-all. Our experts analyze your skin &amp; match it with the right products for you.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── How it works (auto-swipe) ───────────────────────── */

const HIW_STEPS = [
  { title: "Diagnosed online\nfrom just a single photo" }, // 사진을 보고 온라인으로 진단
  { title: "Your skin,\ndistilled into clear keywords" }, // 피부 분석 및 관리 키워드 도출
  { title: "A custom routine,\nbuilt just for your skin" }, // 피부 맞춤 커스텀 루틴
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

function HowItWorks() {
  const [step, setStep] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = () => { if (timer.current) clearInterval(timer.current); };
  const start = () => {
    stop();
    timer.current = setInterval(() => setStep((s) => (s + 1) % HIW_STEPS.length), 1800);
  };
  useEffect(() => { start(); return stop; }, []);

  const go = (dir: number) => {
    setStep((s) => (s + dir + HIW_STEPS.length) % HIW_STEPS.length);
    start(); // restart autoplay after a manual swipe
  };

  const dragX = useRef<number | null>(null);
  const onDown = (x: number) => { dragX.current = x; };
  const onUp = (x: number) => {
    if (dragX.current === null) return;
    const dx = x - dragX.current;
    dragX.current = null;
    if (dx < -40) go(1);
    else if (dx > 40) go(-1);
  };

  const cards = [<DiagnosisCard key="d" />, <KeywordsCard key="k" />, <RoutineCard key="r" />];

  return (
    <section className="snap-start flex flex-col items-center justify-center px-5 text-center" style={{ minHeight: "100svh", paddingTop: 64, paddingBottom: 140 }}>
      <Eyebrow>WHAT YOU GET</Eyebrow>
      <h2
        key={step}
        className="font-display text-charcoal mt-2 guide-bar-enter"
        style={{ fontSize: 26, fontWeight: 500, lineHeight: 1.25, minHeight: 76, whiteSpace: "pre-line" }}
      >
        {HIW_STEPS[step].title}
      </h2>

      <div
        className="relative w-full touch-pan-y select-none"
        style={{ height: 360, maxWidth: 360, cursor: "grab" }}
        onTouchStart={(e) => onDown(e.touches[0].clientX)}
        onTouchEnd={(e) => onUp(e.changedTouches[0].clientX)}
        onPointerDown={(e) => onDown(e.clientX)}
        onPointerUp={(e) => onUp(e.clientX)}
      >
        {cards.map((card, i) => {
          const pos = (i - step + cards.length) % cards.length; // 0 front, 1, 2 back
          const transforms = [
            "translate(0,0) rotate(0deg) scale(1)",
            "translate(46px,18px) rotate(5deg) scale(0.9)",
            "translate(-46px,18px) rotate(-5deg) scale(0.9)",
          ];
          return (
            <div
              key={i}
              className="absolute transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"
              style={{
                width: 220,
                height: 300,
                left: "calc(50% - 110px)",
                top: 30,
                transform: transforms[pos],
                opacity: pos === 0 ? 1 : 0.5,
                zIndex: pos === 0 ? 30 : 20 - pos,
              }}
            >
              {card}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-1.5 mt-2">
        {HIW_STEPS.map((_, i) => (
          <span
            key={i}
            className="transition-all duration-300"
            style={{
              height: 6,
              width: i === step ? 20 : 6,
              borderRadius: 3,
              background: i === step ? "var(--color-mirror-cyan)" : "#cccccc",
            }}
          />
        ))}
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

function ScoreDonut({ score }: { score: number }) {
  return (
    <div className="relative mx-auto" style={{ width: 160, height: 160 }}>
      <div
        className="absolute inset-0 rounded-full"
        style={{ background: `conic-gradient(#62d8f4 0 ${score}%, #e5e5e5 0)` }}
      />
      <div className="absolute rounded-full bg-white flex items-center justify-center" style={{ inset: 14 }}>
        <span className="text-midnight" style={{ fontSize: 56, fontWeight: 700 }}>{score}</span>
      </div>
    </div>
  );
}

function RoutineCheckVisual() {
  return (
    <div>
      <ScoreDonut score={72} />
      <div className="text-center mt-2">
        <div className="text-midnight" style={{ fontSize: 14, fontWeight: 700 }}>Routine Score</div>
        <div className="text-mid-gray" style={{ fontSize: 12 }}>Okay to Use 4 · Stop Using 2</div>
      </div>
      <div className="mt-5">
        <div className="text-midnight" style={{ fontSize: 16, fontWeight: 700 }}>✅ What You&apos;re Doing Well</div>
        <Truncate className="mt-1">Hydration and barrier care are aligned with your skin…</Truncate>
      </div>
      <div className="h-px bg-neutral-200 my-4" />
      <div>
        <div className="text-midnight" style={{ fontSize: 16, fontWeight: 700 }}>⚠️ What&apos;s Holding Your Results Back</div>
        <Truncate className="mt-1">Overlapping actives may be slowing barrier repair…</Truncate>
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
  { id: "skin-condition", num: "01", title: "Skin Condition Check", message: "Our experts read your skin from a single photo — no clinic visit needed.", Visual: SkinConditionVisual },
  { id: "routine-check", num: "02", title: "Routine Check", message: "We check what's working in your current routine — and what to drop.", Visual: RoutineCheckVisual },
  { id: "treatment-plan", num: "03", title: "Treatment Plan", message: "We map out a treatment plan paced to your skin, step by step.", Visual: TreatmentPlanVisual },
  { id: "custom-routine", num: "04", title: "Custom Routine", message: "We curate your K-beauty routine and ship it to your door.", Visual: CustomRoutineVisual },
  { id: "final-message", num: "05", title: "Final Message", message: "And we're with you through the whole journey — not just day one.", boxed: true, Visual: FinalMessageVisual },
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
  return (
    <section className="snap-start flex flex-col items-center justify-center px-6 text-center" style={{ minHeight: "100svh", paddingTop: 64, paddingBottom: 120 }}>
      <Eyebrow>MEET YOUR EXPERTS</Eyebrow>
      <div className="mt-6"><TeamAvatars size={74} /></div>
      <h2 className="font-display text-charcoal mt-7" style={{ fontSize: "clamp(26px, 7.5vw, 34px)", fontWeight: 500, lineHeight: 1.15, letterSpacing: "-0.01em" }}>
        Designed by Korean
        <br />
        skincare experts
      </h2>
      <p className="text-mid-gray mt-4" style={{ fontSize: 16, lineHeight: 1.55, maxWidth: 380 }}>
        A team of Korean skincare experts — including Sumin — analyzes your skin and designs a routine made just for you.
      </p>
    </section>
  );
}

/* ───────────────────────── Full report archive (marquee) ───────────────────────── */

const REPORT_PAGES = ["o1B2I", "aTDHd", "caInY", "fYz7t", "LQX50", "A9QXft", "aiIAQ", "OKhdI"];

function ReportArchiveSection() {
  const pages = [...REPORT_PAGES, ...REPORT_PAGES]; // duplicated for a seamless loop
  return (
    <section className="snap-start flex flex-col justify-center overflow-hidden" style={{ minHeight: "100svh", paddingTop: 72, paddingBottom: 150 }}>
      <div className="px-6 text-center">
        <Eyebrow>YOUR FULL REPORT</Eyebrow>
        <h2 className="font-display text-charcoal mt-2" style={{ fontSize: "clamp(26px, 7.5vw, 34px)", fontWeight: 500, lineHeight: 1.15, letterSpacing: "-0.01em" }}>
          All of it, in one
          <br />
          organized report
        </h2>
        <p className="text-mid-gray mt-4 mx-auto" style={{ fontSize: 16, lineHeight: 1.55, maxWidth: 380 }}>
          Every finding is compiled into a detailed, easy-to-read report — delivered straight to your inbox.
        </p>
      </div>
      <div
        className="mt-8 overflow-hidden"
        style={{ WebkitMaskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)", maskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)" }}
      >
        <div className="marquee-track" style={{ gap: 14 }}>
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

const PAYPAL_URL = "https://www.paypal.com/ncp/payment/NFWM2BSB77C86";

const MENU: [string, string][] = [
  ["About Us", "https://www.8-mirrors.com/post/8mirrors-your-go-to-skincare-guide-for-custom-skincare-routines"],
  ["What You Get", "https://www.8-mirrors.com/post/8mirrors-what-you-get"],
  ["How It Works", "https://www.8-mirrors.com/post/8mirrors-how-it-works"],
  ["Before and Afters", "https://www.8-mirrors.com/post/8mirrors-before-afters"],
  ["FAQs", "https://www.8-mirrors.com/post/8mirrors-faq-guide"],
  ["Contact Us", "https://www.8-mirrors.com/post/8mirrors-contact-us"],
];

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="fixed top-0 inset-x-0 z-[55]">
        <div
          className="mx-auto flex items-center justify-between px-4"
          style={{ maxWidth: 480, height: 52, background: "#ffffff", borderBottom: "1px solid #eee" }}
        >
          <Image src="/logo.png" alt="8mirrors" width={76} height={18} unoptimized priority style={{ height: 18, width: "auto" }} />
          <button type="button" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((v) => !v)} className="-mr-2 p-2">
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
          {MENU.map(([title, href], i) => (
            <a
              key={title}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
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
  return (
    <div className="fixed left-1/2 z-40 w-full px-5" style={{ top: 60, maxWidth: 480, transform: "translateX(-50%)", pointerEvents: "none" }}>
      <div className="transition-all duration-300" style={{ opacity: visible ? 1 : 0, transform: `translateY(${visible ? 0 : -10}px)` }}>
        <div key={title} className="flex items-start gap-3 text-left guide-bar-enter">
          <TeamAvatars size={44} />
          <div className="flex-1">
            <div className="text-mid-gray" style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em" }}>{num} · YOUR 8MIRRORS EXPERTS</div>
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
              {[["📋", "Detailed skin analysis report"], ["✨", "Custom AM & PM routine"], ["👩‍💼", "2 weeks of online skin coaching directly from our team"]].map(([e, t]) => (
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
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-50 pointer-events-none">
        <div className="mx-auto w-full bg-white pointer-events-auto" style={{ maxWidth: 480, borderTop: "1px solid #e0e0e0", boxShadow: "0 -4px 16px rgba(0,0,0,0.06)" }}>
          <div className="flex items-center gap-2.5 px-4 pt-3">
            <EyeMaskFace size={40} />
            <p className="text-mid-gray text-left" style={{ fontSize: 12, lineHeight: 1.35 }}>
              We automatically <span className="text-midnight font-semibold">blur your eyes</span> in every photo — try it with confidence.
            </p>
          </div>
          <div className="flex gap-2 px-4 pt-2.5" style={{ paddingBottom: 16 }}>
            <button type="button" onClick={() => setOpen(true)} className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-white px-4 py-3 text-midnight" style={{ fontSize: 14, fontWeight: 600, boxShadow: "var(--shadow-card)" }}>
              <InfoIcon /> How it works
            </button>
            <a href="#" className="flex flex-1 items-center justify-center rounded-lg px-4 py-3 text-midnight" style={{ fontSize: 14, fontWeight: 700, background: "var(--color-mirror-cyan)" }}>
              Try it free
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
  const [active, setActive] = useState(0);
  const [coachVisible, setCoachVisible] = useState(false);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const shown = new Set<Element>();
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const idx = refs.current.findIndex((r) => r === e.target);
          if (e.isIntersecting) {
            shown.add(e.target);
            if (idx >= 0) setActive(idx);
          } else {
            shown.delete(e.target);
          }
        });
        setCoachVisible(shown.size > 0);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    refs.current.forEach((r) => r && obs.observe(r));
    return () => obs.disconnect();
  }, []);

  const a = REPORT_PANELS[active];

  return (
    <>
      <Header />
      <main className="mx-auto bg-white snap-y snap-mandatory" style={{ maxWidth: 480, height: "100dvh", overflowY: "auto" }}>
        <Hero />
        <TeamSection />
        <HowItWorks />
        {REPORT_PANELS.map((p, i) => (
          <ReportPanel key={p.id} panel={p} panelRef={(el) => { refs.current[i] = el; }} />
        ))}
        <ReportArchiveSection />
      </main>
      <CoachBubble num={a.num} title={a.title} message={a.message} visible={coachVisible} />
      <BuyBar />
    </>
  );
}
