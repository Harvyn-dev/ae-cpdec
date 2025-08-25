import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { sendVerificationEmail } from "@/lib/mailer";

const APP_URL = process.env.NEXTAUTH_URL || "http://localhost:3000";

function sha256Hex(s: string) {
  return crypto.createHash("sha256").update(s).digest("hex");
}

export async function POST(req: Request) {
  const { email } = await req.json();
  const normalized = String(email || "").toLowerCase().trim();
  if (!normalized) return NextResponse.json({ ok: false, error: "EMAIL_REQUIRED" }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { email: normalized } });
  // Réponse générique
  if (!user || user.emailVerified) return NextResponse.json({ ok: true });

  await prisma.emailVerificationToken.updateMany({
    where: { userId: user.id, usedAt: null },
    data: { usedAt: new Date() },
  });

  const rawToken = crypto.randomBytes(32).toString("hex");
  const tokenHash = sha256Hex(rawToken);
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

  await prisma.emailVerificationToken.create({
    data: { tokenHash, userId: user.id, expiresAt },
  });

  const verifyUrl = `${APP_URL}/api/auth/verify-email?token=${encodeURIComponent(rawToken)}`;
  await sendVerificationEmail(user.email, verifyUrl);

  return NextResponse.json({ ok: true });
}
