import crypto from "crypto";

export function generateSixDigits() {
  // 6 chiffres non triviaux
  return String(Math.floor(100000 + Math.random() * 900000));
}

export function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}
