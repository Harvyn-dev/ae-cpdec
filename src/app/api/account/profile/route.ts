import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request) {
  const session = await getServerSession();
  const userId = (session as any)?.user?.id;
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const { firstName, lastName, phone, className } = await req.json();

  // Validation numéro CI
  const ok = /^(?:\+225)?(01|05|07|21|25|27)\d{8}$/.test(String(phone).replace(/\s+/g, ""));
  if (!ok) return new Response("Numéro invalide", { status: 400 });

  await prisma.user.update({
    where: { id: userId },
    data: { firstName, lastName, phone, className },
  });

  return new Response(null, { status: 204 });
}
