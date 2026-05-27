"use client";

import Image from "next/image";

export default function ReportMobilePreview() {
  return (
    <main className="min-h-screen bg-neutral-100 flex flex-col items-center py-6 px-4">
      <div className="mb-4 text-center">
        <h1 className="text-base font-semibold text-neutral-900">
          Mobile Report — Scale Preview
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          iPhone 15 Pro · 393pt width · 8mirrors Skin Report
        </p>
      </div>

      <div
        className="relative bg-white rounded-[44px] overflow-hidden shadow-2xl"
        style={{
          width: 393,
          maxWidth: "100%",
          aspectRatio: "393 / 852",
          maxHeight: "calc(100dvh - 100px)",
        }}
      >
        <div className="absolute inset-0 overflow-y-auto overscroll-contain">
          <Image
            src="/mobile-report.webp"
            alt="8mirrors Mobile Report"
            width={786}
            height={6400}
            className="w-full h-auto block"
            priority
            unoptimized
          />
        </div>
      </div>

      <div className="mt-4 text-[11px] text-neutral-400">
        Scroll the phone frame ↑↓ · Tap interactions not yet wired
      </div>
    </main>
  );
}
