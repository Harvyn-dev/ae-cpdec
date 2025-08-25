import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sha256Hex } from "@/lib/hash";
import { sendEmailVerification } from "@/lib/email";

function addMinutes(date: Date, mins: number) {
  return new Date(date.getTime() + mins * 60_000);
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email manquant" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // Réponse générique pour ne pas révéler la présence d’un compte
      return NextResponse.json({ ok: true });
    }
    if (user.emailVerified) {
      return NextResponse.json({ ok: true });
    }

    // Invalide les anciens tokens non utilisés
    await prisma.emailVerificationToken.deleteMany({
      where: { userId: user.id, usedAt: null },
    });

    const rawToken = crypto.randomUUID() + crypto.randomUUID();
    const tokenHash = await sha256Hex(rawToken);

    await prisma.emailVerificationToken.create({
      data: {
        tokenHash,
        userId: user.id,
        expiresAt: addMinutes(new Date(), 30),
      },
    });

    const base =
      process.env.NEXTAUTH_URL?.replace(/\/$/, "") || "http://localhost:3000";
    const verifyUrl = `${base}/api/auth/verify?token=${encodeURIComponent(
      rawToken
    )}`;

    await sendEmailVerification(email, verifyUrl);

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Erreur" }, { status: 500 });
  }
}
