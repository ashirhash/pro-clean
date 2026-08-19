import { NextResponse } from "next/server";
import { del, get } from "@vercel/blob";
import { sendJobCompletionEmail, type EmailAttachment } from "@/lib/sendMail";
import type { CategoryCount } from "@/utils/interface";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isCategoryCountArray = (value: unknown): value is CategoryCount[] =>
  Array.isArray(value) &&
  value.every(
    (item) =>
      item != null &&
      typeof item === "object" &&
      typeof (item as CategoryCount).label === "string" &&
      typeof (item as CategoryCount).count === "number"
  );

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
  const {
    clientEmail,
    beforeUrls,
    afterUrls,
    invoiceUrl,
    invoiceFileName,
    beforeCategories: rawBeforeCategories,
    afterCategories: rawAfterCategories,
  } = await request.json();

  const beforeCategories = isCategoryCountArray(rawBeforeCategories)
    ? rawBeforeCategories
    : undefined;
  const afterCategories = isCategoryCountArray(rawAfterCategories)
    ? rawAfterCategories
    : undefined;

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

  // Invoice is optional. If the client sent either field, both must be
  // present and well-formed — but sending neither (null/undefined) is fine.
  const hasInvoice = invoiceUrl != null || invoiceFileName != null;
  if (
    hasInvoice &&
    (typeof invoiceUrl !== "string" ||
      !invoiceUrl ||
      typeof invoiceFileName !== "string" ||
      !invoiceFileName)
  ) {
    return NextResponse.json(
      { error: "Invalid invoice data." },
      { status: 400 }
    );
  }

  const allUrls = hasInvoice
    ? [...beforeUrls, ...afterUrls, invoiceUrl as string]
    : [...beforeUrls, ...afterUrls];

  try {
    const [beforeImages, afterImages, invoice] = await Promise.all([
      Promise.all(
        beforeUrls.map((url, i) => fetchAsAttachment(url, `before-${i + 1}.jpg`))
      ),
      Promise.all(
        afterUrls.map((url, i) => fetchAsAttachment(url, `after-${i + 1}.jpg`))
      ),
      hasInvoice
        ? fetchAsAttachment(invoiceUrl as string, invoiceFileName as string)
        : Promise.resolve(undefined),
    ]);

    const result = await sendJobCompletionEmail({
      clientEmail,
      beforeImages,
      afterImages,
      invoice,
      beforeCategories,
      afterCategories,
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
