import { createHash, timingSafeEqual } from "crypto";

function hash(value: string) {
  return createHash("sha256").update(value).digest();
}

function safeEqual(a: string, b: string) {
  return timingSafeEqual(hash(a), hash(b)); 
}

export function verifyCredentials(username: string, password: string) {
  const validUsername = process.env.ADMIN_USERNAME;
  const validPassword = process.env.ADMIN_PASSWORD;

  if (!validUsername || !validPassword) return false;

  return safeEqual(username, validUsername) && safeEqual(password, validPassword);
}