import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { sha256Hex } from "@/lib/hash";
import { sendEmailVerification } from "@/lib/email";

function addMinutes(date: Date, mins: number) {
  return new Date(date.getTime() + mins * 60_000);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, className, password } = body || {};

    if (!firstName || !lastName || !email || !phone || !className || !password) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Email déjà utilisé" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(String(password), 12);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        className,
        passwordHash,
        // emailVerified: null par défaut ➜ l’utilisateur NE peut pas se connecter
      },
    });

    // Génère un token aléatoire (visible côté utilisateur)
    const rawToken = crypto.randomUUID() + crypto.randomUUID();
    const tokenHash = await sha256Hex(rawToken);

    // Stocke le hash + expiration (30 min)
    await prisma.emailVerificationToken.create({
      data: {
        tokenHash,
        userId: user.id,
        expiresAt: addMinutes(new Date(), 30),
      },
    });

    // Construit le lien public de vérification
    const base =
      process.env.NEXTAUTH_URL?.replace(/\/$/, "") || "http://localhost:3000";
    const verifyUrl = `${base}/api/auth/verify?token=${encodeURIComponent(rawToken)}`;

    // Envoi de l’email
    await sendEmailVerification(email, verifyUrl);

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      { error: "Erreur d’inscription" },
      { status: 500 }
    );
  }
}
