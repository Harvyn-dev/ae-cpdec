import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function GET() {
  const session = await getServerSession();
  const userId = (session as any)?.user?.id;
  if (!userId) return Response.json({ unread: 0 });
  const unread = await prisma.notification.count({ where: { userId, isRead: false } });
  return Response.json({ unread });
}
