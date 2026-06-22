import Stripe from "stripe";
import type { NextRequest } from "next/server";

// Stripe webhook → Slack conversion alert.
// Stripe delivers events here; on a completed checkout we post to Slack.
//
// Required env (set in Vercel → Project → Settings → Environment Variables):
//   STRIPE_WEBHOOK_SECRET       whsec_... from the Stripe webhook endpoint (TEST)
//   STRIPE_WEBHOOK_SECRET_LIVE  whsec_... from the LIVE webhook endpoint (optional, add at go-live)
//   SLACK_WEBHOOK_URL           https://hooks.slack.com/services/... (target channel)
//   STRIPE_SECRET_KEY           sk_... (optional; only the instance needs it, not verification)
//
// Register the endpoint in Stripe (Developers → Webhooks → Add endpoint):
//   URL:    https://8mirrors-global.vercel.app/api/stripe-webhook
//   Events: checkout.session.completed

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_placeholder");

// Accept both test- and live-mode signing secrets so one endpoint serves both.
const WEBHOOK_SECRETS = [
  process.env.STRIPE_WEBHOOK_SECRET,
  process.env.STRIPE_WEBHOOK_SECRET_LIVE,
].filter((s): s is string => Boolean(s));

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL || "";

function verify(body: string, sig: string): Stripe.Event | null {
  for (const secret of WEBHOOK_SECRETS) {
    try {
      return stripe.webhooks.constructEvent(body, sig, secret);
    } catch {
      // try the next secret
    }
  }
  return null;
}

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  if (!sig || WEBHOOK_SECRETS.length === 0) {
    return new Response("Missing signature or webhook secret", { status: 400 });
  }

  const body = await req.text();
  const event = verify(body, sig);
  if (!event) {
    return new Response("Signature verification failed", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const s = event.data.object as Stripe.Checkout.Session;
    const amount = ((s.amount_total ?? 0) / 100).toLocaleString("en-US", {
      style: "currency",
      currency: (s.currency ?? "usd").toUpperCase(),
    });
    const email = s.customer_details?.email ?? "unknown";
    const name = s.customer_details?.name ?? "";
    const who = name ? `${name} · ${email}` : email;
    const mode = s.livemode ? "LIVE 💳" : "test 🧪";

    const text = [
      `🎉 *New Custom Routine Box order* (${mode})`,
      `• Amount: *${amount}*`,
      `• Customer: ${who}`,
      `• Session: \`${s.id}\``,
    ].join("\n");

    if (SLACK_WEBHOOK_URL) {
      try {
        await fetch(SLACK_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });
      } catch {
        // Never fail the webhook because Slack is down — Stripe would retry forever.
      }
    }
  }

  // Always 200 so Stripe marks the event delivered.
  return new Response("ok", { status: 200 });
}
