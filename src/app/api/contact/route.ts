import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  const session = await getServerSession();
  const form = await req.formData();
  await prisma.contactMessage.create({
    data: {
      userId: (session as any)?.user?.id ?? null,
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      subject: String(form.get("subject") || ""),
      message: String(form.get("message") || ""),
    },
  });
  return new Response(null, { status: 302, headers: { Location: "/contact" } });
}
