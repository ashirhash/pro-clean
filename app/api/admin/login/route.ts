import { NextResponse } from "next/server";
import { verifyCredentials } from "@/lib/auth";
import { createSessionToken, SESSION_COOKIE } from "@/lib/session";

export async function POST(request: Request) {
  const { username, password, rememberMe } = await request.json();

  if (typeof username !== "string" || typeof password !== "string") {
    return NextResponse.json(
      { error: "Username and password are required." },
      { status: 400 }
    );
  }

  if (!verifyCredentials(username, password)) {
    return NextResponse.json(
      { error: "Invalid username or password." },
      { status: 401 }
    );
  }

  // Default to remembering the session even if the client omits the flag,
  // matching the previous always-persistent behavior.
  const remember = rememberMe !== false;

  const token = await createSessionToken(remember);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    // Omitting maxAge makes it a browser-session cookie that clears on
    // close, matching an unchecked "remember me".
    ...(remember ? { maxAge: 60 * 60 * 24 * 7 } : {}),
  });

  return response;
}