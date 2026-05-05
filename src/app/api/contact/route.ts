import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * Delivers contact form submissions to your inbox via SMTP.
 * Configure SMTP_* vars in `.env.local` and deployment env settings.
 */

const TO_LABEL = process.env.CONTACT_TO_EMAIL?.trim() || "aarushikrishna5@gmail.com";

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

  const host = process.env.SMTP_HOST?.trim();
  const portValue = process.env.SMTP_PORT?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const secure =
    (process.env.SMTP_SECURE?.trim() || "").toLowerCase() === "true";

  if (!host || !portValue || !user || !pass) {
    return NextResponse.json(
      {
        error:
          "Email is not configured. Add SMTP_HOST, SMTP_PORT, SMTP_USER and SMTP_PASS to .env.local (then restart dev).",
      },
      { status: 503 },
    );
  }

  const port = Number.parseInt(portValue, 10);
  if (!Number.isFinite(port) || port <= 0) {
    return NextResponse.json(
      { error: "SMTP_PORT must be a valid numeric port." },
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

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: process.env.CONTACT_FROM_EMAIL?.trim() || user,
      to: TO_LABEL,
      replyTo: email,
      subject: `[Portfolio] ${name} — ${projectType}`,
      text: messageBody,
    });
  } catch {
    return NextResponse.json(
      {
        error:
          "Could not send email via SMTP. Verify SMTP credentials and app password, then try again.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
