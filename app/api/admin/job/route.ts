import { NextResponse } from "next/server";
import { del, get } from "@vercel/blob";
import { sendJobCompletionEmail, type EmailAttachment } from "@/lib/sendMail";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function fetchAsAttachment(
  url: string,
  filename: string
): Promise<EmailAttachment> {
  const result = await get(url, { access: "private" });
  if (!result || result.statusCode !== 200) {
    throw new Error(`Failed to fetch staged photo: ${url}`);
  }
  const arrayBuffer = await new Response(result.stream).arrayBuffer();
  return { filename, content: Buffer.from(arrayBuffer) };
}

export async function POST(request: Request) {
  const { clientEmail, beforeUrls, afterUrls } = await request.json();

  if (typeof clientEmail !== "string" || !EMAIL_REGEX.test(clientEmail)) {
    return NextResponse.json(
      { error: "A valid client email is required." },
      { status: 400 }
    );
  }

  const isStringArray = (value: unknown): value is string[] =>
    Array.isArray(value) && value.every((item) => typeof item === "string");

  if (
    !isStringArray(beforeUrls) ||
    !isStringArray(afterUrls) ||
    beforeUrls.length === 0 ||
    afterUrls.length === 0
  ) {
    return NextResponse.json(
      {
        error: "At least one before photo and one after photo are required.",
      },
      { status: 400 }
    );
  }

  const allUrls = [...beforeUrls, ...afterUrls];

  try {
    const [beforeImages, afterImages] = await Promise.all([
      Promise.all(
        beforeUrls.map((url, i) => fetchAsAttachment(url, `before-${i + 1}.jpg`))
      ),
      Promise.all(
        afterUrls.map((url, i) => fetchAsAttachment(url, `after-${i + 1}.jpg`))
      ),
    ]);

    const result = await sendJobCompletionEmail({
      clientEmail,
      beforeImages,
      afterImages,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: "Failed to send the completion email. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error building job completion email:", err);
    return NextResponse.json(
      { error: "Failed to process photos. Please try again." },
      { status: 500 }
    );
  } finally {
    await del(allUrls).catch((err) =>
      console.error("Failed to clean up staged photos:", err)
    );
  }
}
