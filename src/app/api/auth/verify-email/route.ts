import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

function sha256Hex(s: string) {
  return crypto.createHash("sha256").update(s).digest("hex");
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const raw = url.searchParams.get("token");

  if (!raw) return NextResponse.redirect(new URL("/login?verified=0", url.origin));

  const tokenHash = sha256Hex(raw);

  const token = await prisma.emailVerificationToken.findFirst({
    where: {
      tokenHash,
      usedAt: null,
      expiresAt: { gt: new Date() },
    },
  });

  if (!token) {
    return NextResponse.redirect(new URL("/login?verified=0", url.origin));
  }

  await prisma.$transaction([
    prisma.user.update({
      where: { id: token.userId },
      data: { emailVerified: new Date() },
    }),
    prisma.emailVerificationToken.update({
      where: { id: token.id },
      data: { usedAt: new Date() },
    }),
  ]);

  return NextResponse.redirect(new URL("/login?verified=1", url.origin));
}
