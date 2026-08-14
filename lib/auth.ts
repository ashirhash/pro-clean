import { createHash, timingSafeEqual } from "crypto";

function hash(value: string) {
  return createHash("sha256").update(value).digest();
}

function safeEqual(a: string, b: string) {
  return timingSafeEqual(hash(a), hash(b));
}

export function verifyCredentials(email: string, password: string) {
  const validEmail = process.env.ADMIN_USERNAME;
  const validPassword = process.env.ADMIN_PASSWORD;

  if (!validEmail || !validPassword) return false;

  return safeEqual(email, validEmail) && safeEqual(password, validPassword);
}
