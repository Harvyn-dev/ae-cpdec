import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";

export async function POST(req: Request) {
  const { firstName, lastName, email, phone, className, password } = await req.json();
  if (!firstName || !lastName || !email || !phone || !className || !password)
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 });

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return NextResponse.json({ error: "Email déjà utilisé" }, { status: 409 });

  const passwordHash = await hashPassword(password);
  await prisma.user.create({
    data: { firstName, lastName, email, phone, className, passwordHash, subscribed: true },
  });

  return NextResponse.json({ ok: true });
}
