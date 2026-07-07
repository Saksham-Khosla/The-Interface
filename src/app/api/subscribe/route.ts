import { NextRequest, NextResponse } from "next/server";

// Wires the site's email signup to Beehiiv (subscriber tracking) and Resend
// (personalised welcome email based on chosen industries).
//
// Required Vercel env vars:
//   BEEHIIV_API_KEY          — Beehiiv Settings → Integrations → API
//   BEEHIIV_PUBLICATION_ID   — e.g. pub_95d81915-b09d-49c7-80ff-28c83657c027
//   RESEND_API_KEY           — Resend dashboard → API Keys
//
// None of these values ever reach the browser — this route is server-side only.

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ─── Industry metadata for email personalisation ───────────────────────────

type IndustryMeta = {
  name: string;
  color: string;        // accent colour used in the email template
  eyebrow: string;      // "This week · Finance"
  headline: string;
  body: string;
};

const INDUSTRY_META: Record<string, IndustryMeta> = {
  finance: {
    name: "Finance",
    color: "#4ade80",
    eyebrow: "This week &middot; Finance",
    headline: "How AI Agents Are Entering Finance",
    body: "Welcome to The Inference. Every week we take one industry and break down what AI is actually changing &mdash; no hype, no roundups. Here&rsquo;s where banks and funds are already trusting autonomous agents with real workflows, and where humans still have the final say. A good place to start.",
  },
  education: {
    name: "Education",
    color: "#fbbf24",
    eyebrow: "This week &middot; Education",
    headline: "AI Tutors Are Getting Disturbingly Good",
    body: "Welcome to The Inference. Every week we take one industry and break down what AI is actually changing &mdash; no hype, no roundups. This week: the personalised tutoring tools already outperforming human teachers in early trials, and why universities are scrambling to respond.",
  },
  law: {
    name: "Law",
    color: "#a78bfa",
    eyebrow: "This week &middot; Law",
    headline: "Can AI Replace Junior Lawyers?",
    body: "Welcome to The Inference. Every week we take one industry and break down what AI is actually changing &mdash; no hype, no roundups. This week: how contract review tools are reshaping BigLaw billing, and where the real legal work still requires a human.",
  },
  healthcare: {
    name: "Healthcare",
    color: "#f87171",
    eyebrow: "This week &middot; Healthcare",
    headline: "The AI Tools Quietly Entering Clinical Care",
    body: "Welcome to The Inference. Every week we take one industry and break down what AI is actually changing &mdash; no hype, no roundups. This week: why healthcare AI is moving slower than expected &mdash; and the specific workflows where it&rsquo;s already trusted with real patient decisions.",
  },
  work: {
    name: "Work",
    color: "#38bdf8",
    eyebrow: "This week &middot; Work",
    headline: "What Happens When AI Agents Do Your Busywork",
    body: "Welcome to The Inference. Every week we take one industry and break down what AI is actually changing &mdash; no hype, no roundups. This week: the autonomous tools that are already replacing entire layers of office work &mdash; and the jobs that turn out to be harder to automate than expected.",
  },
  startups: {
    name: "Startups",
    color: "#fb923c",
    eyebrow: "This week &middot; Startups",
    headline: "The Vertical AI Land Grab Is Just Getting Started",
    body: "Welcome to The Inference. Every week we take one industry and break down what AI is actually changing &mdash; no hype, no roundups. This week: why the most important AI companies of the next decade are being built right now &mdash; and how to spot them before everyone else does.",
  },
  media: {
    name: "Media",
    color: "#f472b6",
    eyebrow: "This week &middot; Media",
    headline: "AI Video Is Getting Good Enough to Worry About",
    body: "Welcome to The Inference. Every week we take one industry and break down what AI is actually changing &mdash; no hype, no roundups. This week: the AI video and audio tools reshaping how content is made &mdash; and what it means for the humans who used to make it.",
  },
};

const ALL_CHIPS = [
  { slug: "finance",    name: "Finance",    color: "#4ade80" },
  { slug: "education",  name: "Education",  color: "#fbbf24" },
  { slug: "law",        name: "Law",        color: "#a78bfa" },
  { slug: "healthcare", name: "Healthcare", color: "#f87171" },
  { slug: "work",       name: "Work",       color: "#38bdf8" },
  { slug: "startups",   name: "Startups",   color: "#fb923c" },
  { slug: "media",      name: "Media",      color: "#f472b6" },
];

// ─── Email builder ─────────────────────────────────────────────────────────

function buildWelcomeEmail(industries: string[]): string {
  // Feature the first selected industry; fall back to Finance
  const featuredSlug = industries[0] ?? "finance";
  const featured = INDUSTRY_META[featuredSlug] ?? INDUSTRY_META.finance;

  // Show all OTHER industries as "also covering" chips
  const otherChips = ALL_CHIPS.filter((c) => c.slug !== featuredSlug);
  const chipsHtml = otherChips
    .map(
      (c) =>
        `<span class="chip" style="display:inline-block; margin:0 8px 8px 0; padding:7px 12px; border:1px solid rgba(125,211,252,0.12); border-radius:999px; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-size:12.5px; color:#9aa4b8; white-space:nowrap;"><span style="color:${c.color};">&bull;</span>&nbsp; ${c.name}</span>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>Welcome to The Inference</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
  <style>
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    body { margin: 0 !important; padding: 0 !important; width: 100% !important; }
    a { color: #7dd3fc; }
    :root { color-scheme: dark; supported-color-schemes: dark; }
    @media only screen and (max-width: 620px) {
      .container { width: 100% !important; }
      .px { padding-left: 24px !important; padding-right: 24px !important; }
      .h1 { font-size: 27px !important; line-height: 1.15 !important; }
      .chip { display: inline-block !important; margin: 0 6px 8px 0 !important; }
    }
  </style>
</head>
<body style="margin:0; padding:0; background-color:#040710;">

  <!-- Preheader (hidden preview text) -->
  <div style="display:none; max-height:0; overflow:hidden; mso-hide:all; font-size:1px; line-height:1px; color:#040710; opacity:0;">
    Your personalised briefing starts with ${featured.name} &mdash; here&rsquo;s what&rsquo;s happening.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#040710;">
    <tr>
      <td align="center" style="padding:32px 16px 48px;">

        <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0"
          style="width:600px; max-width:600px; background-color:#070c1a; border-radius:16px; border:1px solid rgba(125,211,252,0.10); overflow:hidden;">

          <!-- Accent bar (colour matches the featured industry) -->
          <tr>
            <td style="height:4px; background-color:${featured.color}; line-height:0; font-size:0;">&nbsp;</td>
          </tr>

          <!-- Header: logo + label -->
          <tr>
            <td class="px" style="padding:24px 40px; border-bottom:1px solid rgba(125,211,252,0.08);">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td valign="middle">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
                      <td valign="middle" style="padding-right:11px;">
                        <!-- ∴ logo tile -->
                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="40" height="40"
                          style="width:40px; height:40px; background-color:#0e1830; border:1px solid rgba(125,211,252,0.22); border-radius:11px;">
                          <tr><td align="center" valign="middle" style="height:40px;">
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center"><tr>
                              <td style="line-height:0; padding-bottom:3px;"><div style="width:5px; height:5px; background-color:#7dd3fc; border-radius:50%; font-size:0; line-height:0;">&nbsp;</div></td>
                            </tr></table>
                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center"><tr>
                              <td style="line-height:0; padding-right:4px;"><div style="width:5px; height:5px; background-color:#7dd3fc; border-radius:50%; font-size:0; line-height:0;">&nbsp;</div></td>
                              <td style="line-height:0;"><div style="width:5px; height:5px; background-color:#3b82f6; border-radius:50%; font-size:0; line-height:0;">&nbsp;</div></td>
                            </tr></table>
                          </td></tr>
                        </table>
                      </td>
                      <td valign="middle" style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-size:18px; font-weight:800; letter-spacing:-0.02em; white-space:nowrap;">
                        <span style="color:#ffffff;">The </span><span style="color:#7dd3fc;">Inference</span>
                      </td>
                    </tr></table>
                  </td>
                  <td valign="middle" align="right" style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color:#5d6577; white-space:nowrap;">
                    Welcome
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Hero: featured industry spotlight -->
          <tr>
            <td class="px" style="padding:40px 48px 0;">
              <!-- Eyebrow -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
                <td valign="middle" style="padding-right:9px; line-height:0;">
                  <div style="width:8px; height:8px; background-color:${featured.color}; border-radius:50%; font-size:0; line-height:0;">&nbsp;</div>
                </td>
                <td valign="middle" style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-size:11.5px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:${featured.color};">
                  ${featured.eyebrow}
                </td>
              </tr></table>

              <h1 class="h1" style="margin:16px 0 0; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-size:31px; line-height:1.13; font-weight:800; letter-spacing:-0.03em; color:#ffffff;">
                ${featured.headline}
              </h1>

              <p style="margin:16px 0 0; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-size:16px; line-height:1.65; color:#9aa4b8;">
                ${featured.body}
              </p>
            </td>
          </tr>

          <!-- CTA button -->
          <tr>
            <td class="px" style="padding:26px 48px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="border-radius:10px; background-color:#2563eb;">
                    <!--[if mso]>
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"
                      href="https://the-interface-azal.vercel.app"
                      style="height:46px;v-text-anchor:middle;width:210px;" arcsize="22%"
                      strokecolor="#2563eb" fillcolor="#2563eb">
                    <w:anchorlock/>
                    <center style="color:#ffffff;font-family:Helvetica,Arial,sans-serif;font-size:15px;font-weight:bold;">Visit The Inference &rarr;</center>
                    </v:roundrect>
                    <![endif]-->
                    <!--[if !mso]><!-- -->
                    <a href="https://the-interface-azal.vercel.app"
                      style="display:inline-block; padding:14px 26px; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-size:15px; font-weight:700; color:#ffffff; text-decoration:none; border-radius:10px; background-color:#2563eb;">
                      Visit The Inference &rarr;
                    </a>
                    <!--<![endif]-->
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Other industries chips -->
          <tr>
            <td class="px" style="padding:36px 48px 0;">
              <p style="margin:0 0 14px; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-size:13px; line-height:1.6; color:#6b7384;">
                You&rsquo;ll get one of these every week &mdash; across six more industries:
              </p>
              ${chipsHtml}
            </td>
          </tr>

          <!-- Reply invitation -->
          <tr>
            <td class="px" style="padding:32px 48px 0; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-size:16px; line-height:1.65; color:#9aa4b8;">
              <p style="margin:0;">Got a story tip or a question? Just hit reply &mdash; a real person reads every message.</p>
            </td>
          </tr>

          <!-- Sign-off -->
          <tr>
            <td class="px" style="padding:22px 48px 44px; font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-size:16px; line-height:1.6; color:#9aa4b8;">
              <p style="margin:0 0 4px;">Talk next week,</p>
              <p style="margin:0; font-size:18px; font-weight:800; letter-spacing:-0.02em;">
                <span style="color:#ffffff;">The </span><span style="color:#7dd3fc;">Inference</span>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="px" style="padding:24px 48px 34px; border-top:1px solid rgba(125,211,252,0.08); font-family:'Helvetica Neue',Helvetica,Arial,sans-serif; font-size:12px; line-height:1.7; color:#565d6e;">
              You&rsquo;re receiving this because you subscribed at The Inference.<br>
              <a href="https://app.beehiiv.com/unsubscribe" style="color:#7c8696; text-decoration:underline;">Unsubscribe</a>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ─── Route handler ─────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  let email: string | undefined;
  let industries: string[] = [];

  try {
    const body = await req.json();
    email = body?.email;
    industries = Array.isArray(body?.industries) ? body.industries : [];
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const beehiivApiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;
  const resendApiKey  = process.env.RESEND_API_KEY;

  if (!beehiivApiKey || !publicationId) {
    console.error("Missing BEEHIIV_API_KEY or BEEHIIV_PUBLICATION_ID env vars.");
    return NextResponse.json(
      { error: "Subscriptions aren't configured yet. Please try again later." },
      { status: 500 }
    );
  }

  // ── Step 1: Subscribe in Beehiiv (tracking only — no Beehiiv welcome email) ──
  try {
    const beehiivRes = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${beehiivApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          send_welcome_email: false, // Resend handles the personalised welcome
          utm_source: "website",
          utm_medium: "organic",
          utm_campaign: industries.length > 0 ? industries.join(",") : "general",
        }),
      }
    );

    if (!beehiivRes.ok) {
      const errorBody = await beehiivRes.text();
      console.error("Beehiiv subscribe error:", beehiivRes.status, errorBody);
      return NextResponse.json(
        { error: "Something went wrong subscribing you. Please try again." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("Beehiiv subscribe request failed:", err);
    return NextResponse.json(
      { error: "Something went wrong subscribing you. Please try again." },
      { status: 500 }
    );
  }

  // ── Step 2: Send personalised welcome email via Resend ──────────────────
  if (resendApiKey) {
    const featuredName =
      (industries[0] && INDUSTRY_META[industries[0]]?.name) ?? "AI";

    try {
      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "The Inference <onboarding@resend.dev>",
          to: [email],
          subject: `Welcome — your ${featuredName} briefing is ready`,
          html: buildWelcomeEmail(industries),
        }),
      });

      if (!resendRes.ok) {
        const resendError = await resendRes.text();
        // Don't fail the whole subscription — Beehiiv already captured the subscriber
        console.error("Resend email error:", resendRes.status, resendError);
      }
    } catch (err) {
      console.error("Resend request failed:", err);
      // Same — non-fatal
    }
  } else {
    console.warn("RESEND_API_KEY not set — skipping personalised welcome email.");
  }

  return NextResponse.json({ success: true });
}
