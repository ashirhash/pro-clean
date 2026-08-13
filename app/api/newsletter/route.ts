import { NextResponse } from "next/server";
// import { CONTACT_EMAIL, EMAIL_FROM, resend } from "@/lib/sendMail";

export async function POST(request: Request) {
  const { email } = await request.json();

  // if (typeof email !== "string" || !email.trim()) {
  //   return NextResponse.json(
  //     { error: "A valid email is required." },
  //     { status: 400 }
  //   );
  // }

  // const { error } = await resend.emails.send({
  //   from: EMAIL_FROM,
  //   to: CONTACT_EMAIL,
  //   replyTo: email,
  //   subject: "New newsletter signup",
  //   text: `Please add this email address to the newsletter list:\n${email}`,
  // });

  // if (error) {
  //   return NextResponse.json({ error: error.message }, { status: 502 });
  // }

  return NextResponse.json({ ok: true });
}
