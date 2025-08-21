import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!token) return new Response(JSON.stringify({ message: 'Token manquant' }), { status: 400 });

  const record = await prisma.emailVerificationToken.findUnique({ where: { token } });

  if (!record || record.expiresAt < new Date()) {
    return new Response(JSON.stringify({ message: 'Lien invalide ou expiré' }), { status: 400 });
  }

  await prisma.user.update({
    where: { id: record.userId },
    data: { emailVerified: new Date() }
  });

  await prisma.emailVerificationToken.delete({ where: { id: record.id } });

  return new Response(JSON.stringify({ message: 'Email vérifié avec succès ! Vous pouvez vous connecter.' }));
}
