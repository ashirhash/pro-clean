import { sendMail } from "@/lib/sendMail";
import { NextResponse } from "next/server";
// import { CONTACT_EMAIL, EMAIL_FROM, resend } from "@/lib/sendMail";

export async function POST(request: Request) {
  const { name, userEmail, message } = await request.json();

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

  await sendMail({name, userEmail, message});

  console.log("api: ",{ name, userEmail, message });
  

  return NextResponse.json({ ok: "got the data!!" });
}
