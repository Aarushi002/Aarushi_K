import { NextResponse } from "next/server";

/**
 * Delivers contact form submissions to your inbox via Web3Forms.
 *
 * Setup: https://web3forms.com — get an access key, then set `WEB3FORMS_ACCESS_KEY`
 * in `.env.local` (local) and in Vercel → Project → Settings → Environment Variables (production).
 */

const TO_LABEL = "aarushikrishna5@gmail.com";

type Body = {
  name?: string;
  email?: string;
  projectType?: string;
  budget?: string;
  message?: string;
  _gotcha?: string;
};

function validate(data: Body) {
  const errors: string[] = [];
  const name = data.name?.trim() ?? "";
  const email = data.email?.trim() ?? "";
  const projectType = data.projectType?.trim() ?? "";
  const budget = data.budget?.trim() ?? "";
  const message = data.message?.trim() ?? "";

  if (!name) errors.push("Name is required.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.push("Valid email is required.");
  if (!projectType) errors.push("Project type is required.");
  if (!budget) errors.push("Budget is required.");
  if (message.length < 12) errors.push("Message is too short.");

  return { name, email, projectType, budget, message, errors };
}

function parseJsonSafe<T>(text: string): { ok: true; value: T } | { ok: false } {
  try {
    return { ok: true, value: JSON.parse(text) as T };
  } catch {
    return { ok: false };
  }
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { error: "Content-Type must be application/json." },
      { status: 415 },
    );
  }

  let raw: Body;
  try {
    const text = await request.text();
    const parsed = parseJsonSafe<Body>(text);
    if (!parsed.ok || parsed.value === null || typeof parsed.value !== "object") {
      return NextResponse.json(
        { error: "Invalid or empty JSON body. Refresh the page and try again." },
        { status: 400 },
      );
    }
    raw = parsed.value;
  } catch {
    return NextResponse.json(
      { error: "Could not read request body. Refresh the page and try again." },
      { status: 400 },
    );
  }

  if (raw._gotcha) {
    return NextResponse.json({ error: "Rejected." }, { status: 400 });
  }

  const { name, email, projectType, budget, message, errors } = validate(raw);
  if (errors.length) {
    return NextResponse.json({ error: errors.join(" ") }, { status: 400 });
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY?.trim();
  if (!accessKey) {
    return NextResponse.json(
      {
        error:
          "Email is not configured. Add WEB3FORMS_ACCESS_KEY to .env.local (then restart dev), or to Vercel → Environment Variables (then redeploy).",
      },
      { status: 503 },
    );
  }

  const messageBody = [
    `Portfolio contact form`,
    `────────────────────────`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Project type: ${projectType}`,
    `Budget: ${budget}`,
    ``,
    `Message:`,
    message,
    ``,
    `— Sent from site contact form (notify ${TO_LABEL})`,
  ].join("\n");

  let wfRes: Response;
  try {
    wfRes = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `[Portfolio] ${name} — ${projectType}`,
        from_name: name,
        email,
        replyto: email,
        message: messageBody,
      }),
    });
  } catch {
    return NextResponse.json(
      { error: "Could not reach the email service. Check your network and try again." },
      { status: 502 },
    );
  }

  const wfText = await wfRes.text();
  const wfParsed = parseJsonSafe<{ success?: boolean; message?: string }>(wfText);
  if (!wfParsed.ok) {
    return NextResponse.json(
      {
        error: `Email service returned a non-JSON response (${wfRes.status}). Verify WEB3FORMS_ACCESS_KEY and try again.`,
      },
      { status: 502 },
    );
  }

  const payload = wfParsed.value;
  if (!wfRes.ok || !payload.success) {
    return NextResponse.json(
      {
        error:
          payload.message ||
          `Email service error (${wfRes.status}). Check your Web3Forms key and inbox.`,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
