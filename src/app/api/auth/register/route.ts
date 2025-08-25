import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendVerificationEmail } from "@/lib/mailer";

const APP_URL = process.env.NEXTAUTH_URL || "http://localhost:3000";

// util SHA-256 hex
function sha256Hex(s: string) {
  return crypto.createHash("sha256").update(s).digest("hex");
}

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, password, phone, className } = await req.json();

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ ok: false, error: "INVALID" }, { status: 400 });
    }

    const normalizedEmail = String(email).toLowerCase().trim();

    // Réponse générique pour ne pas divulguer l’existence d’un compte
    const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (existing) {
      // Optionnel : si non vérifié, on peut relancer un e-mail ici
      return NextResponse.json({ ok: true });
    }

    const passwordHash = await bcrypt.hash(String(password), 12);

    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        firstName: String(firstName).trim(),
        lastName: String(lastName).trim(),
        passwordHash,
        phone: String(phone || "").trim(),
        className: String(className || "").trim(),
        // emailVerified: null (par défaut)
      },
    });

    // Invalider les anciens tokens non utilisés (au cas où)
    await prisma.emailVerificationToken.updateMany({
      where: { userId: user.id, usedAt: null },
      data: { usedAt: new Date() },
    });

    // Générer token + hash
    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = sha256Hex(rawToken);
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 min

    await prisma.emailVerificationToken.create({
      data: { tokenHash, userId: user.id, expiresAt },
    });

    const verifyUrl = `${APP_URL}/api/auth/verify-email?token=${encodeURIComponent(rawToken)}`;
    await sendVerificationEmail(user.email, verifyUrl);

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("REGISTER ERROR", e);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
