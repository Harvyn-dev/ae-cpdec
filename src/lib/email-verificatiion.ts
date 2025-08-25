import crypto from "crypto"

export function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString("hex")
}

export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex")
}

export function createVerificationUrl(token: string): string {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000"
  return `${baseUrl}/verify-email?token=${token}`
}
