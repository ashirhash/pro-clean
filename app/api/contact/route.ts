import { sendMail } from "@/lib/sendMail";
import { NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const { name, userEmail, message, company } = await request.json();

  // --- Honeypot: real users never fill this hidden field ---
  if (typeof company === "string" && company.trim().length > 0) {
    // Return a fake success so bots don't learn they were caught
    return NextResponse.json({ ok: "got the data!!" });
  }

  // --- Basic presence validation ---
  if (
    typeof name !== "string" ||
    typeof userEmail !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !userEmail.trim() ||
    !message.trim()
  ) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  // --- Length limits ---
  if (name.length > 100 || userEmail.length > 200 || message.length > 5000) {
    return NextResponse.json(
      { error: "One of your fields is too long." },
      { status: 400 }
    );
  }

  // --- Email format check ---
  if (!EMAIL_REGEX.test(userEmail)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const result = await sendMail({ name, userEmail, message });

  if (!result.success) {
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: "got the data!!" });
}