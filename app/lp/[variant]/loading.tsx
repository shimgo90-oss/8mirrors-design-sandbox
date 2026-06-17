/* Skeleton shown while a /lp/<variant> page loads (Next App Router Suspense
   fallback). PDP-shaped placeholder — calm pulse, no color/gradient (DESIGN.md). */

const BAR = "#ece9e2";
const FAINT = "#f1efe9";
const DOT = "#d9d6cf";

function Bar({ h, w = "100%", r = 8, mt = 0 }: { h: number; w?: number | string; r?: number; mt?: number }) {
  return <div className="animate-pulse" style={{ height: h, width: w, borderRadius: r, background: BAR, marginTop: mt }} />;
}

export default function Loading() {
  return (
    <main className="mx-auto bg-white" style={{ maxWidth: 480, minHeight: "100dvh" }}>
      {/* faux header — real logo for instant brand, skeleton for the rest */}
      <div className="flex items-center justify-between px-6" style={{ height: 56 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="8mirrors" style={{ height: 18, width: "auto" }} />
        <div className="animate-pulse" style={{ height: 18, width: 54, borderRadius: 6, background: BAR }} />
      </div>

      <div className="px-6" style={{ paddingTop: 36 }}>
        {/* gallery */}
        <div className="animate-pulse" style={{ height: 360, borderRadius: 16, background: BAR }} />
        {/* dots */}
        <div className="mt-3 flex items-center justify-center" style={{ gap: 6 }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="animate-pulse rounded-full" style={{ width: i === 0 ? 18 : 6, height: 6, background: i === 0 ? "#bdbab2" : DOT }} />
          ))}
        </div>
        {/* thumbnails */}
        <div className="mt-3 grid gap-1.5" style={{ gridTemplateColumns: "repeat(6, minmax(0, 1fr))" }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse" style={{ height: 46, borderRadius: 8, background: BAR }} />
          ))}
        </div>

        {/* title / price / cta block */}
        <div style={{ marginTop: 24 }}>
          <Bar h={10} w="42%" r={4} />
          <Bar h={28} w="86%" r={6} mt={12} />
          <Bar h={13} w="96%" r={4} mt={14} />
          <Bar h={13} w="68%" r={4} mt={6} />
          <Bar h={14} w="46%" r={4} mt={16} />
          <Bar h={30} w="32%" r={6} mt={14} />
          <div className="animate-pulse" style={{ height: 50, borderRadius: 8, background: BAR, marginTop: 18 }} />
        </div>

        {/* a content card */}
        <div className="animate-pulse" style={{ height: 230, borderRadius: 16, background: FAINT, marginTop: 30 }} />
      </div>
    </main>
  );
}
