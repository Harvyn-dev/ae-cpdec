// src/app/api/notifications/read/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
  }
  const { newsId } = await req.json();

  await prisma.notification.updateMany({
    where: { userId: session.user.id, newsId },
    data:  { readAt: new Date() },
  });

  return NextResponse.json({ ok: true });
}
