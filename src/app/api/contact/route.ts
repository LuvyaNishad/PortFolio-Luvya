import { siteConfig } from "@/config/site";

export const runtime = "nodejs";

interface ContactPayload {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  /** Honeypot — must stay empty. Bots fill it, humans never see it. */
  company?: string;
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/**
 * Provider-agnostic contact endpoint.
 *
 * Configure ONE of these via environment variables (no code change needed):
 *   • RESEND_API_KEY   — sends email via Resend. Optional: RESEND_FROM
 *                        (defaults to "Portfolio <onboarding@resend.dev>").
 *   • CONTACT_WEBHOOK_URL — POSTs the message JSON to a webhook
 *                        (Discord / Slack / Zapier / n8n …).
 *
 * If neither is set the route responds 501 with `unconfigured: true`, and
 * the client falls back to a prefilled mailto: so a message is never lost.
 */
export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: silently accept & drop obvious bot submissions.
  if (body.company && body.company.trim() !== "") {
    return Response.json({ ok: true }, { status: 200 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const subject = (body.subject ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || !email || !message) {
    return Response.json(
      { error: "Please fill in your name, email and message." },
      { status: 422 }
    );
  }
  if (!isEmail(email)) {
    return Response.json(
      { error: "Please enter a valid email address." },
      { status: 422 }
    );
  }
  if (message.length > 5000) {
    return Response.json({ error: "Message is too long." }, { status: 422 });
  }

  const subjectLine = `Portfolio enquiry${subject ? ` — ${subject}` : ""} from ${name}`;
  const text = `Name: ${name}\nEmail: ${email}\nTopic: ${subject || "—"}\n\n${message}`;

  const resendKey = process.env.RESEND_API_KEY;
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

  try {
    if (resendKey) {
      const from = process.env.RESEND_FROM || "Portfolio <onboarding@resend.dev>";
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [siteConfig.email],
          reply_to: email,
          subject: subjectLine,
          text,
        }),
      });
      if (!res.ok) {
        console.error("Resend error:", res.status, await res.text().catch(() => ""));
        return Response.json({ error: "Could not send message right now." }, { status: 502 });
      }
      return Response.json({ ok: true }, { status: 200 });
    }

    if (webhookUrl) {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text, name, email, subject, message }),
      });
      if (!res.ok) {
        return Response.json({ error: "Could not send message right now." }, { status: 502 });
      }
      return Response.json({ ok: true }, { status: 200 });
    }

    return Response.json(
      { error: "Contact delivery is not configured yet.", unconfigured: true },
      { status: 501 }
    );
  } catch (err) {
    console.error("Contact route error:", err);
    return Response.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
