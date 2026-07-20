import { NextRequest, NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function buildInviteEmail(referrerEmail: string): string {
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>You've been invited to The Inference</title>
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
    You&rsquo;ve been invited to The Inference &mdash; a weekly briefing on how AI is changing specific industries.
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
                <td valign="middle" align="right" style="font-family:Arial,Helvetica,sans-serif; font-size:11px; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; color:#9A9790; white-space:nowrap;">INVITATION</td>
              </tr></table>
            </td>
          </tr>
          <tr><td height="1" style="height:1px; background-color:#E5E2DC; line-height:0; font-size:0;">&nbsp;</td></tr>

          <!-- ─── HERO ─── -->
          <tr>
            <td class="px" style="padding:48px 48px 44px;">
              <h1 class="h1" style="margin:0; font-family:Arial,Helvetica,sans-serif; font-size:46px; line-height:1.08; font-weight:800; letter-spacing:-0.025em; color:#11110F;">You&rsquo;ve been invited to The Inference.</h1>
            </td>
          </tr>

          <!-- ─── WHAT YOU'LL GET ─── -->
          <tr>
            <td class="px" style="padding:0 48px 44px;">
              <p style="margin:0 0 12px; font-family:Arial,Helvetica,sans-serif; font-size:17px; font-weight:700; letter-spacing:-0.01em; color:#11110F;">What you&rsquo;ll get</p>
              <div style="width:32px; height:3px; background-color:#3157D5; border-radius:2px; margin-bottom:24px;"></div>

              <!-- Row 1 -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:0 0 18px;">
                    <p style="margin:0 0 4px; font-family:Arial,Helvetica,sans-serif; font-size:15px; font-weight:700; color:#11110F;">One story per industry</p>
                    <p style="margin:0; font-family:Arial,Helvetica,sans-serif; font-size:14px; color:#6B6660; line-height:1.55;">Focused analysis, not endless links.</p>
                  </td>
                </tr>
                <tr><td height="1" style="height:1px; background-color:#E5E2DC; line-height:0; font-size:0; margin-bottom:18px;">&nbsp;</td></tr>

                <!-- Row 2 -->
                <tr>
                  <td style="padding:18px 0;">
                    <p style="margin:0 0 4px; font-family:Arial,Helvetica,sans-serif; font-size:15px; font-weight:700; color:#11110F;">Delivered weekly</p>
                    <p style="margin:0; font-family:Arial,Helvetica,sans-serif; font-size:14px; color:#6B6660; line-height:1.55;">A concise briefing designed to be read, not saved for later.</p>
                  </td>
                </tr>
                <tr><td height="1" style="height:1px; background-color:#E5E2DC; line-height:0; font-size:0;">&nbsp;</td></tr>

                <!-- Row 3 -->
                <tr>
                  <td style="padding:18px 0 0;">
                    <p style="margin:0 0 4px; font-family:Arial,Helvetica,sans-serif; font-size:15px; font-weight:700; color:#11110F;">Built around your interests</p>
                    <p style="margin:0; font-family:Arial,Helvetica,sans-serif; font-size:14px; color:#6B6660; line-height:1.55;">Pick the industries you follow &mdash; change them anytime.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ─── CTA ─── -->
          <tr>
            <td class="px" style="padding:0 48px 52px;">
              <!--[if mso]>
              <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://the-interface-azal.vercel.app" style="height:52px;v-text-anchor:middle;width:544px;" arcsize="8%" strokecolor="#3157D5" fillcolor="#3157D5">
              <w:anchorlock/>
              <center style="color:#FFFFFF;font-family:Arial,sans-serif;font-size:16px;font-weight:bold;">Join The Inference &rarr;</center>
              </v:roundrect>
              <![endif]-->
              <!--[if !mso]><!-- -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="border-radius:8px; background-color:#3157D5;">
                    <a href="https://the-interface-azal.vercel.app" style="display:block; padding:16px 28px; font-family:Arial,Helvetica,sans-serif; font-size:16px; font-weight:700; color:#FFFFFF; text-decoration:none; border-radius:8px; text-align:center;">Join The Inference &rarr;</a>
                  </td>
                </tr>
              </table>
              <!--<![endif]-->
            </td>
          </tr>

        </table>

        <!-- ─── FOOTER (dark) ─── -->
        <table role="presentation" class="container" width="640" cellpadding="0" cellspacing="0" border="0" style="width:640px; max-width:640px;">
          <tr>
            <td style="background-color:#0F0E0C; padding:28px 48px 26px; border-top:4px solid #3157D5;">
              <p style="margin:0 0 6px; font-family:Arial,Helvetica,sans-serif; font-size:15px; font-weight:700; color:#FFFFFF;">The Inference</p>
              <p style="margin:0 0 18px; font-family:Arial,Helvetica,sans-serif; font-size:13px; line-height:1.55; color:#6B6660;">A weekly briefing on how AI is changing specific industries.</p>
              <p style="margin:0 0 16px; font-family:Arial,Helvetica,sans-serif; font-size:13px; line-height:1.7; color:#6B6660;">
                This invitation was sent by ${referrerEmail} via The Inference.
              </p>
              <p style="margin:0 0 16px; font-family:Arial,Helvetica,sans-serif; font-size:13px; color:#6B6660;">
                <a href="https://the-interface-azal.vercel.app" style="color:#9A9790; text-decoration:underline;">Opt out of invitation emails</a>
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

export async function POST(req: NextRequest) {
  let refereeEmail: string | undefined;
  let referrerEmail: string | undefined;

  try {
    const body = await req.json();
    refereeEmail  = body?.refereeEmail;
    referrerEmail = body?.referrerEmail ?? "a reader";
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!refereeEmail || typeof refereeEmail !== "string" || !EMAIL_REGEX.test(refereeEmail)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.warn("RESEND_API_KEY not set — skipping invite email.");
    return NextResponse.json({ success: true });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "The Inference <onboarding@resend.dev>",
        to: [refereeEmail],
        subject: "You've been invited to The Inference",
        html: buildInviteEmail(referrerEmail ?? "a reader"),
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend invite error:", res.status, err);
      return NextResponse.json({ error: "Failed to send invite." }, { status: 502 });
    }
  } catch (err) {
    console.error("Resend invite request failed:", err);
    return NextResponse.json({ error: "Failed to send invite." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
