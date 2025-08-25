import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sha256Hex } from "@/lib/hash";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const rawToken = searchParams.get("token");
  if (!rawToken) {
    return NextResponse.json({ error: "Token manquant" }, { status: 400 });
  }

  const tokenHash = await sha256Hex(rawToken);

  const rec = await prisma.emailVerificationToken.findFirst({
    where: { tokenHash },
    include: { user: true },
  });

  if (!rec) {
    return NextResponse.json({ error: "Token invalide" }, { status: 400 });
  }
  if (rec.usedAt) {
    return NextResponse.json({ error: "Token déjà utilisé" }, { status: 400 });
  }
  if (rec.expiresAt < new Date()) {
    return NextResponse.json({ error: "Token expiré" }, { status: 400 });
  }

  await prisma.$transaction([
    prisma.user.update({
      where: { id: rec.userId },
      data: { emailVerified: new Date() },
    }),
    prisma.emailVerificationToken.update({
      where: { id: rec.id },
      data: { usedAt: new Date() },
    }),
  ]);

  // Redirige vers login avec un message
  const base =
    process.env.NEXTAUTH_URL?.replace(/\/$/, "") || "http://localhost:3000";
  return NextResponse.redirect(`${base}/login?verified=1`);
}
