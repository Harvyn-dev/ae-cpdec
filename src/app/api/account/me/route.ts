import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession();
  const userId = (session as any)?.user?.id;
  if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const me = await prisma.user.findUnique({ where: { id: userId } });
  return Response.json(me);
}
