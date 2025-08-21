import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  const session = await getServerSession();
  const userId = (session as any)?.user?.id;
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const form = await req.formData();
  const amountCFA = Number(form.get("amountCFA"));
  const method = String(form.get("method"));
  const reference = String(form.get("reference") || "");
  const poloSize = String(form.get("poloSize"));

  if (!amountCFA || amountCFA < 10000) return new Response("Montant insuffisant", { status: 400 });

  // TODO: uploader l'image vers S3/Supabase, pour l'instant on ignore le fichier
  await prisma.user.update({ where: { id: userId }, data: { poloSize: poloSize as any } });

  await prisma.paymentProof.create({
    data: { userId, amountCFA, method, reference: reference || null, imageUrl: null },
  });

  return new Response(null, { status: 302, headers: { Location: "/join" } });
}
