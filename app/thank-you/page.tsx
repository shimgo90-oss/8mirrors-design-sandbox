import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

// Where customers go after a successful Stripe checkout. Set the Stripe Payment
// Link's "After payment → redirect" to https://<domain>/thank-you (both test & live).
export const metadata: Metadata = {
  title: "Order confirmed · 8mirrors",
  description: "Your Custom Routine Box is confirmed.",
  robots: { index: false, follow: false },
};

export default function ThankYou() {
  return (
    <main
      className="flex min-h-screen flex-col items-center px-6"
      style={{ backgroundColor: "#f7f6f3", paddingTop: 64, paddingBottom: 64 }}
    >
      <div className="flex w-full flex-col items-center text-center" style={{ maxWidth: 440 }}>
        <Image src="/logo.png" alt="8mirrors" width={84} height={20} unoptimized priority style={{ height: 20, width: "auto" }} />

        {/* Confirmation badge — cyan disc, black check, layered shadow for depth (no glow/gradient) */}
        <div
          className="flex items-center justify-center rounded-full"
          style={{
            marginTop: 40,
            width: 72,
            height: 72,
            background: "var(--color-mirror-cyan)",
            boxShadow: "0 1px 1px rgba(34,40,51,0.10), 0 0 0 1px rgba(34,40,51,0.06), 0 12px 28px rgba(34,40,51,0.16)",
          }}
        >
          <svg width={34} height={34} viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 12.5l4.2 4.2L19 7" stroke="#111111" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h1 className="font-display" style={{ marginTop: 28, fontSize: 32, lineHeight: 1.1, fontWeight: 500, color: "var(--color-charcoal)", letterSpacing: "-0.015em" }}>
          You&rsquo;re in.
        </h1>

        <p className="font-body" style={{ marginTop: 14, fontSize: 16, lineHeight: 1.55, color: "var(--color-charcoal)" }}>
          Your Custom Routine Box is confirmed. Thank you for trusting your skin with us.
        </p>

        {/* What happens next — email-led, no action needed from the customer */}
        <div
          className="w-full rounded-2xl bg-white text-left"
          style={{ marginTop: 28, padding: 22, boxShadow: "var(--shadow-card)" }}
        >
          <p className="font-body" style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--color-mid-gray)" }}>
            What happens next
          </p>
          <p className="font-body" style={{ marginTop: 10, fontSize: 15.5, lineHeight: 1.55, color: "var(--color-charcoal)" }}>
            Check your inbox &mdash; in a few minutes we&rsquo;ll email you a short set of questions to start your skin analysis. <strong style={{ fontWeight: 700 }}>No action needed right now</strong>; just keep an eye out for that email.
          </p>
        </div>

        <p className="font-body" style={{ marginTop: 18, fontSize: 13.5, lineHeight: 1.5, color: "var(--color-mid-gray)" }}>
          Once you reply, our Korean experts review your skin over 4&ndash;5 days &mdash; then your box ships, free worldwide.
        </p>

        {/* Secondary action — back to the product page (ring instead of border, not cyan: this is not the primary CTA) */}
        <Link
          href="/lp/box"
          className="font-body"
          style={{
            marginTop: 28,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            background: "#ffffff",
            boxShadow: "inset 0 0 0 1px rgba(34,40,51,0.14), 0 1px 2px rgba(34,40,51,0.06)",
            padding: "15px 22px",
            fontSize: 16,
            fontWeight: 700,
            color: "var(--color-charcoal)",
          }}
        >
          Back to the Custom Routine Box
        </Link>

        <p className="font-body" style={{ marginTop: 22, fontSize: 13, lineHeight: 1.5, color: "var(--color-mid-gray)" }}>
          Didn&rsquo;t get the email? Check your spam folder, or reach us at{" "}
          <a href="mailto:contact@haebom.day" style={{ color: "var(--color-charcoal)", textDecoration: "underline", textUnderlineOffset: 3, textDecorationColor: "#cfcdc6" }}>
            contact@haebom.day
          </a>.
        </p>
      </div>
    </main>
  );
}
