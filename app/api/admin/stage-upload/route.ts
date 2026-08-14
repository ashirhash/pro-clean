import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { put, del } from "@vercel/blob";

const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json({ error: "Image is too large." }, { status: 400 });
  }

  const blob = await put(`job-photos/${randomUUID()}.jpg`, file, {
    access: "private",
    addRandomSuffix: true,
    contentType: file.type || "image/jpeg",
  });

  return NextResponse.json({ url: blob.url });
}

export async function DELETE(request: Request) {
  const { url } = await request.json();

  if (typeof url !== "string" || !url) {
    return NextResponse.json({ error: "URL is required." }, { status: 400 });
  }

  await del(url);

  return NextResponse.json({ ok: true });
}
