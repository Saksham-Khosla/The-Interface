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

// ─── Industry short descriptions (mirrors src/lib/industries.ts shortDesc) ──

const INDUSTRY_SHORT: Record<string, { name: string; desc: string }> = {
  finance:    { name: "Finance",    desc: "Banking, markets, fintech and investing." },
  education:  { name: "Education",  desc: "Schools, universities and learning technology." },
  law:        { name: "Law",        desc: "Legal work, regulation and the changing profession." },
  healthcare: { name: "Healthcare", desc: "Clinical systems, diagnostics and patient care." },
  work:       { name: "Work",       desc: "Productivity, hiring and the future of the office." },
  startups:   { name: "Startups",   desc: "Venture, founding and building in the AI era." },
  media:      { name: "Media",      desc: "Publishing, entertainment and content creation." },
};

// ─── Email builder ─────────────────────────────────────────────────────────

function buildWelcomeEmail(selectedSlugs: string[]): string {
  const slugs = selectedSlugs.length > 0 ? selectedSlugs : ["finance"];

  // Dynamic industry count label
  const countWords = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven"];
  const nLabel = countWords[slugs.length] ?? String(slugs.length);
  const industryLabel = `${nLabel} ${slugs.length === 1 ? "industry" : "industries"}, chosen by you.`;

  // Industry rows with horizontal dividers (no bordered card)
  const industryRowsHtml = slugs.map((slug, i) => {
    const meta = INDUSTRY_SHORT[slug] ?? { name: slug, desc: "" };
    const num  = String(i + 1).padStart(2, "0");
    const isFirst = i === 0;
    const isLast  = i === slugs.length - 1;
    const topPad  = isFirst ? "0" : "16px";
    const botPad  = isLast  ? "0" : "16px";
    return `
              <tr>
                <td style="padding:${topPad} 0 ${botPad};">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
                    <td valign="top" width="34" style="font-family:Arial,Helvetica,sans-serif; font-size:13px; font-weight:700; color:#3157D5; padding-top:2px;">${num}</td>
                    <td style="font-family:Arial,Helvetica,sans-serif;">
                      <div style="font-size:16px; font-weight:700; color:#11110F; line-height:1.2;">${meta.name}</div>
                      <div style="font-size:13.5px; color:#5A6080; margin-top:3px;">${meta.desc}</div>
                    </td>
                  </tr></table>
                </td>
              </tr>${isLast ? "" : `
              <tr><td height="1" style="height:1px; background-color:#C5CCE8; padding:0; line-height:0; font-size:0;">&nbsp;</td></tr>`}`;
  }).join("");

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>Welcome to The Inference</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
  <style>
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    body { margin: 0 !important; padding: 0 !important; width: 100% !important; }
    a { color: #3157D5; }
    @media only screen and (max-width: 620px) {
      .container { width: 100% !important; }
      .px { padding-left: 24px !important; padding-right: 24px !important; }
      .h1 { font-size: 34px !important; line-height: 1.12 !important; }
    }
  </style>
</head>
<body style="margin:0; padding:0; background-color:#F0EFE9;">
  <div style="display:none; max-height:0; overflow:hidden; mso-hide:all; font-size:1px; line-height:1px; color:#F0EFE9; opacity:0;">
    Your personalised Brief is ready. Here&rsquo;s what to expect from The Inference, weekly.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F0EFE9;">
    <tr>
      <td align="center" style="padding:0;">

        <!-- Top cobalt bar -->
        <table role="presentation" class="container" width="640" cellpadding="0" cellspacing="0" border="0" style="width:640px; max-width:640px;">
          <tr><td height="4" style="height:4px; background-color:#3157D5; line-height:0; font-size:0;">&nbsp;</td></tr>
        </table>

        <table role="presentation" class="container" width="640" cellpadding="0" cellspacing="0" border="0" style="width:640px; max-width:640px; background-color:#FFFFFF;">

          <!-- ─── HEADER ─── -->
          <tr>
            <td class="px" style="padding:28px 48px 22px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
                <td valign="middle" style="font-family:Arial,Helvetica,sans-serif; font-size:18px; font-weight:700; letter-spacing:-0.01em; color:#11110F;">The Inference</td>
                <td valign="middle" align="right" style="font-family:Arial,Helvetica,sans-serif; font-size:11px; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; color:#9A9790; white-space:nowrap;">WELCOME</td>
              </tr></table>
            </td>
          </tr>
          <tr><td height="1" style="height:1px; background-color:#E5E2DC; line-height:0; font-size:0;">&nbsp;</td></tr>

          <!-- ─── HERO ─── -->
          <tr>
            <td class="px" style="padding:48px 48px 44px;">
              <h1 class="h1" style="margin:0 0 28px; font-family:Arial,Helvetica,sans-serif; font-size:46px; line-height:1.08; font-weight:800; letter-spacing:-0.025em; color:#11110F;">You are in.</h1>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="3" bgcolor="#3157D5" style="background-color:#3157D5; border-radius:2px; font-size:0;">&nbsp;</td>
                  <td style="padding-left:16px; font-family:Arial,Helvetica,sans-serif; font-size:16px; line-height:1.65; color:#4A4840;">You will receive your personalised Brief weekly.</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ─── INDUSTRIES (blue/lavender bg) ─── -->
          <tr>
            <td class="px" style="padding:40px 48px; background-color:#E4EAF9;">
              <p style="margin:0 0 8px; font-family:Arial,Helvetica,sans-serif; font-size:12px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:#3157D5;">YOUR BRIEF COVERS</p>
              <p style="margin:0 0 24px; font-family:Arial,Helvetica,sans-serif; font-size:22px; font-weight:700; letter-spacing:-0.02em; line-height:1.2; color:#11110F;">${industryLabel}</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                ${industryRowsHtml}
              </table>
              <p style="margin:22px 0 0; font-family:Arial,Helvetica,sans-serif; font-size:14px;">
                <a href="https://the-interface-azal.vercel.app" style="color:#3157D5; text-decoration:none; font-weight:700;">Edit your industries &rarr;</a>
              </p>
            </td>
          </tr>

          <!-- ─── CTA (cobalt bg) ─── -->
          <tr>
            <td class="px" style="padding:40px 48px; background-color:#3157D5;">
              <p style="margin:0 0 6px; font-family:Arial,Helvetica,sans-serif; font-size:24px; font-weight:700; letter-spacing:-0.02em; color:#FFFFFF;">Your Brief is waiting.</p>
              <p style="margin:0 0 26px; font-family:Arial,Helvetica,sans-serif; font-size:15px; line-height:1.6; color:#B8C5EC;">Read it whenever suits you.</p>
              <!--[if mso]>
              <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://the-interface-azal.vercel.app" style="height:46px;v-text-anchor:middle;width:210px;" arcsize="10%" strokecolor="#FFFFFF" fillcolor="#FFFFFF">
              <w:anchorlock/>
              <center style="color:#3157D5;font-family:Arial,sans-serif;font-size:15px;font-weight:bold;">View your Brief &rarr;</center>
              </v:roundrect>
              <![endif]-->
              <!--[if !mso]><!-- -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="border-radius:6px; background-color:#FFFFFF;">
                    <a href="https://the-interface-azal.vercel.app" style="display:block; padding:13px 28px; font-family:Arial,Helvetica,sans-serif; font-size:15px; font-weight:700; color:#3157D5; text-decoration:none; border-radius:6px; white-space:nowrap;">View your Brief &rarr;</a>
                  </td>
                </tr>
              </table>
              <!--<![endif]-->
            </td>
          </tr>

          <!-- ─── FOOTER ─── -->
          <tr>
            <td style="background-color:#0F0E0C; padding:28px 48px 26px;">
              <p style="margin:0 0 6px; font-family:Arial,Helvetica,sans-serif; font-size:15px; font-weight:700; color:#FFFFFF;">The Inference</p>
              <p style="margin:0 0 18px; font-family:Arial,Helvetica,sans-serif; font-size:13px; line-height:1.55; color:#6B6660;">A weekly briefing on how AI is changing specific industries.</p>
              <p style="margin:0 0 16px; font-family:Arial,Helvetica,sans-serif; font-size:13px; color:#6B6660;">
                <a href="https://the-interface-azal.vercel.app" style="color:#9A9790; text-decoration:underline;">Manage preferences</a>
                &nbsp;&middot;&nbsp;
                <a href="https://app.beehiiv.com/unsubscribe" style="color:#9A9790; text-decoration:underline;">Unsubscribe</a>
                &nbsp;&middot;&nbsp;
                <a href="mailto:hello@theinference.co" style="color:#9A9790; text-decoration:underline;">Contact</a>
              </p>
              <p style="margin:0; font-family:Arial,Helvetica,sans-serif; font-size:12px; color:#4A4740;">&copy; 2026 The Inference. All rights reserved.</p>
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
