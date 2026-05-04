import { NextResponse } from "next/server";

/**
 * Delivers contact form submissions to your inbox via Web3Forms.
 *
 * Setup (one-time): https://web3forms.com — create a form with destination
 * aarushikrishna5@gmail.com (or your preferred inbox), then add to `.env.local`:
 *
 *   WEB3FORMS_ACCESS_KEY=your_key_here
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

export async function POST(request: Request) {
  try {
    const raw = (await request.json()) as Body;
    if (raw._gotcha) {
      return NextResponse.json({ error: "Rejected." }, { status: 400 });
    }

    const { name, email, projectType, budget, message, errors } =
      validate(raw);
    if (errors.length) {
      return NextResponse.json({ error: errors.join(" ") }, { status: 400 });
    }

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY?.trim();
    if (!accessKey) {
      return NextResponse.json(
        {
          error:
            "Email delivery is not configured. Set WEB3FORMS_ACCESS_KEY in .env.local (see api/contact/route.ts).",
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

    const res = await fetch("https://api.web3forms.com/submit", {
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

    const payload = (await res.json()) as { success?: boolean; message?: string };

    if (!res.ok || !payload.success) {
      return NextResponse.json(
        { error: payload.message || "Could not send message. Try again later." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
}
