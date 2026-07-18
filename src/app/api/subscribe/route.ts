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

// ─── Email builder (cream/editorial design) ────────────────────────────────

function buildWelcomeEmail(selectedSlugs: string[]): string {
  const slugs = selectedSlugs.length > 0 ? selectedSlugs : ["finance"];

  // Industry rows — one per selected industry
  const industryRowsHtml = slugs.map((slug, i) => {
    const meta = INDUSTRY_SHORT[slug] ?? { name: slug, desc: "" };
    const num  = String(i + 1).padStart(2, "0");
    const isLast = i === slugs.length - 1;
    return `
                <tr>
                  <td style="padding:18px 20px;${isLast ? "" : " border-bottom:1px solid #CBC8BE;"}">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
                      <td valign="top" width="34" style="font-family:Arial,Helvetica,sans-serif; font-size:14px; font-weight:700; color:#3157D5;">${num}</td>
                      <td style="font-family:Arial,Helvetica,sans-serif;">
                        <div style="font-size:16px; font-weight:700; color:#11110F;">${meta.name}</div>
                        <div style="font-size:14px; color:#6C6962; margin-top:3px;">${meta.desc}</div>
                      </td>
                    </tr></table>
                  </td>
                </tr>`;
  }).join("");

  // Featured story — first selected industry
  const featuredSlug = slugs[0];
  const featuredMeta = INDUSTRY_META[featuredSlug] ?? INDUSTRY_META.finance;
  const featuredName = INDUSTRY_SHORT[featuredSlug]?.name ?? featuredMeta.name;

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
      .px { padding-left: 22px !important; padding-right: 22px !important; }
      .h1 { font-size: 32px !important; line-height: 1.2 !important; }
      .cta-td { display: block !important; width: 100% !important; }
      .cta-link { display: block !important; text-align: center !important; }
    }
  </style>
</head>
<body style="margin:0; padding:0; background-color:#F3F1EA;">
  <div style="display:none; max-height:0; overflow:hidden; mso-hide:all; font-size:1px; line-height:1px; color:#F3F1EA; opacity:0;">
    Your personalised Brief is ready. Here&rsquo;s what to expect from The Inference, every Monday.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F3F1EA;">
    <tr>
      <td align="center" style="padding:0;">

        <!-- Top cobalt rule -->
        <table role="presentation" class="container" width="640" cellpadding="0" cellspacing="0" border="0" style="width:640px; max-width:640px;">
          <tr><td style="height:4px; background-color:#3157D5; line-height:0; font-size:0;">&nbsp;</td></tr>
        </table>

        <table role="presentation" class="container" width="640" cellpadding="0" cellspacing="0" border="0" style="width:640px; max-width:640px; background-color:#FAF9F5;">

          <!-- Header -->
          <tr>
            <td class="px" style="padding:34px 48px 22px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
                <td valign="middle" style="font-family:Arial,Helvetica,sans-serif; font-size:20px; font-weight:700; letter-spacing:-0.01em; color:#11110F;">The Inference</td>
                <td valign="middle" align="right" style="font-family:Arial,Helvetica,sans-serif; font-size:11.5px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:#6C6962;">Welcome</td>
              </tr></table>
            </td>
          </tr>
          <tr><td class="px" style="padding:0 48px;"><div style="height:1px; background-color:#CBC8BE; line-height:0; font-size:0;">&nbsp;</div></td></tr>

          <!-- Headline -->
          <tr>
            <td class="px" style="padding:36px 48px 0;">
              <p style="margin:0; font-family:Arial,Helvetica,sans-serif; font-size:12.5px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:#3157D5;">Welcome to The Inference</p>
              <h1 class="h1" style="margin:16px 0 0; font-family:Arial,Helvetica,sans-serif; font-size:42px; line-height:1.18; font-weight:700; letter-spacing:-0.015em; color:#11110F;">You are in. Your AI briefing starts here.</h1>
            </td>
          </tr>

          <!-- Intro -->
          <tr>
            <td class="px" style="padding:20px 48px 0; font-family:Arial,Helvetica,sans-serif; font-size:16.5px; line-height:1.65; color:#3a3934;">
              <p style="margin:0;">Thanks for joining The Inference. Each week, we examine what artificial intelligence is genuinely changing across the industries you follow &mdash; without the hype, noise or generic roundups.</p>
              <p style="margin:14px 0 0;">Your personalised Brief will arrive every Monday.</p>
            </td>
          </tr>

          <!-- Your industries -->
          <tr>
            <td class="px" style="padding:36px 48px 0;">
              <p style="margin:0 0 14px; font-family:Arial,Helvetica,sans-serif; font-size:19px; font-weight:700; letter-spacing:-0.01em; color:#11110F;">Your industries</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #CBC8BE; border-radius:6px;">
                ${industryRowsHtml}
              </table>
              <p style="margin:14px 0 0; font-family:Arial,Helvetica,sans-serif; font-size:14px;"><a href="https://the-interface-azal.vercel.app" style="color:#3157D5; text-decoration:none; font-weight:700;">Edit your industries &rarr;</a></p>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td class="px" style="padding:34px 48px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
                <td class="cta-td" style="border-radius:6px; background-color:#3157D5;">
                  <!--[if mso]>
                  <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://the-interface-azal.vercel.app" style="height:52px;v-text-anchor:middle;width:640px;" arcsize="6%" strokecolor="#3157D5" fillcolor="#3157D5">
                  <w:anchorlock/>
                  <center style="color:#FAF9F5;font-family:Arial,sans-serif;font-size:17px;font-weight:bold;">View your Brief &rarr;</center>
                  </v:roundrect>
                  <![endif]-->
                  <!--[if !mso]><!-- -->
                  <a class="cta-link" href="https://the-interface-azal.vercel.app" style="display:block; padding:16px 0; font-family:Arial,Helvetica,sans-serif; font-size:17px; font-weight:700; color:#FAF9F5; text-decoration:none; border-radius:6px; text-align:center;">View your Brief &rarr;</a>
                  <!--<![endif]-->
                </td>
              </tr></table>
            </td>
          </tr>

          <!-- What to expect -->
          <tr>
            <td class="px" style="padding:44px 48px 0;">
              <p style="margin:0 0 6px; font-family:Arial,Helvetica,sans-serif; font-size:19px; font-weight:700; letter-spacing:-0.01em; color:#11110F;">What to expect</p>
              <div style="height:2px; width:36px; background-color:#3157D5; margin:12px 0 20px; font-size:0; line-height:0;">&nbsp;</div>
              <p style="margin:0 0 4px; font-family:Arial,Helvetica,sans-serif; font-size:15px; font-weight:700; color:#11110F;">One story per industry</p>
              <p style="margin:0 0 16px; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:1.55; color:#7A7570;">Focused analysis, not endless links.</p>
              <div style="height:1px; background-color:#D8D4CB; font-size:0; line-height:0; margin-bottom:16px;">&nbsp;</div>
              <p style="margin:0 0 4px; font-family:Arial,Helvetica,sans-serif; font-size:15px; font-weight:700; color:#11110F;">Delivered every Monday</p>
              <p style="margin:0 0 16px; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:1.55; color:#7A7570;">A concise briefing designed to be read, not saved for later.</p>
              <div style="height:1px; background-color:#D8D4CB; font-size:0; line-height:0; margin-bottom:16px;">&nbsp;</div>
              <p style="margin:0 0 4px; font-family:Arial,Helvetica,sans-serif; font-size:15px; font-weight:700; color:#11110F;">Built around your interests</p>
              <p style="margin:0; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:1.55; color:#7A7570;">Add or remove industries whenever you choose.</p>
            </td>
          </tr>

          <!-- Featured story card -->
          <tr>
            <td class="px" style="padding:28px 48px 44px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#E8EDFA; border-radius:10px;">
                <tr>
                  <td style="padding:24px 26px 22px;">
                    <p style="margin:0 0 10px; font-family:Arial,Helvetica,sans-serif; font-size:11px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:#3157D5;">Start here &middot; ${featuredName}</p>
                    <p style="margin:0 0 10px; font-family:Arial,Helvetica,sans-serif; font-size:20px; font-weight:700; letter-spacing:-0.02em; line-height:1.2; color:#11110F;">${featuredMeta.headline}</p>
                    <p style="margin:0 0 14px; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:1.6; color:#4A4740;">${featuredMeta.body}</p>
                    <a href="https://the-interface-azal.vercel.app" style="font-family:Arial,Helvetica,sans-serif; font-size:14px; font-weight:700; color:#3157D5; text-decoration:none;">Read the story &rarr;</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#141210; padding:28px 48px 24px;">
              <p style="margin:0 0 6px; font-family:Arial,Helvetica,sans-serif; font-size:15px; font-weight:700; color:#ffffff;">The Inference</p>
              <p style="margin:0 0 18px; font-family:Arial,Helvetica,sans-serif; font-size:13px; line-height:1.55; color:#6B6660;">A weekly briefing on how AI is changing specific industries.</p>
              <p style="margin:0 0 18px; font-family:Arial,Helvetica,sans-serif; font-size:13px; color:#6B6660;">
                <a href="https://the-interface-azal.vercel.app" style="color:#8A8580; text-decoration:underline;">Manage preferences</a>
                &nbsp;&middot;&nbsp;
                <a href="https://app.beehiiv.com/unsubscribe" style="color:#8A8580; text-decoration:underline;">Unsubscribe</a>
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

// (kept for featured story body copy)
const ALL_CHIPS = [
  { slug: "finance",    name: "Finance",    color: "#4ade80" },
  { slug: "education",  name: "Education",  color: "#fbbf24" },
  { slug: "law",        name: "Law",        color: "#a78bfa" },
  { slug: "healthcare", name: "Healthcare", color: "#f87171" },
  { slug: "work",       name: "Work",       color: "#38bdf8" },
  { slug: "startups",   name: "Startups",   color: "#fb923c" },
  { slug: "media",      name: "Media",      color: "#f472b6" },
];
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
