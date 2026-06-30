import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import "./globals.css";

// GA4 measurement ID. One property tracks all pages (/, /landing, /lp/*) so
// landing variants can be compared by page path. Override via env if it changes.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-JK6D1ZR0YQ";

// Microsoft Clarity project ID. Session recordings + heatmaps for all pages.
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || "xezhjnp0ke";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["SOFT", "WONK", "opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

// Public domain for canonical + OG image URLs. Override via NEXT_PUBLIC_SITE_URL
// (e.g. when a custom domain is attached).
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://8mirrors-global.vercel.app";
const TITLE = "8mirrors | K-Skincare Matchmaker";
const DESC = "A complete 5-step skincare routine, built for your exact skin by Seoul experts. Any skin type. Shipped worldwide.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESC,
  openGraph: {
    title: TITLE,
    description: DESC,
    type: "website",
    siteName: "8mirrors",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="font-body antialiased">{children}</body>
      <GoogleAnalytics gaId={GA_ID} />
      <Script id="ms-clarity" strategy="afterInteractive">
        {`(function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${CLARITY_ID}");`}
      </Script>
    </html>
  );
}
