import { NextRequest, NextResponse } from "next/server";

// Wires the site's email signup form to Beehiiv so subscribers are actually
// saved. Requires two environment variables to be set in Vercel:
//   BEEHIIV_API_KEY          — from Beehiiv Settings → Integrations → API
//   BEEHIIV_PUBLICATION_ID   — e.g. pub_95d81915-b09d-49c7-80ff-28c83657c027
//
// The API key never reaches the browser — this route runs server-side only.

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;

  if (!apiKey || !publicationId) {
    console.error("Missing BEEHIIV_API_KEY or BEEHIIV_PUBLICATION_ID env vars.");
    return NextResponse.json(
      { error: "Subscriptions aren't configured yet. Please try again later." },
      { status: 500 }
    );
  }

  try {
    const beehiivRes = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          send_welcome_email: true,
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

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Beehiiv subscribe request failed:", err);
    return NextResponse.json(
      { error: "Something went wrong subscribing you. Please try again." },
      { status: 500 }
    );
  }
}
