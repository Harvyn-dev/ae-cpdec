import { prisma } from '@/lib/prisma';
import { sendVerificationEmail } from '@/lib/email';
import { randomBytes } from 'crypto';
import { addMinutes } from 'date-fns';

export async function POST(req: Request) {
  const body = await req.json();
  const { firstName, lastName, email, phone, password, className } = body;

  // Vérifier numéro Côte d'Ivoire
  if (!/^(\+225|225)[0-9]{8}$/.test(phone)) {
    return new Response(JSON.stringify({ error: 'Numéro invalide, il doit être en Côte d’Ivoire' }), { status: 400 });
  }

  // Créer user
  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      phone,
      className,
      passwordHash: password, // à hasher avec bcrypt
    }
  });

  // Générer token
  const token = randomBytes(32).toString('hex');

  await prisma.emailVerificationToken.create({
    data: {
      token,
      userId: user.id,
      expiresAt: addMinutes(new Date(), 30) // 30 min
    }
  });

  // Envoyer email
  await sendVerificationEmail(email, token);

  return new Response(JSON.stringify({ message: 'Inscription réussie, vérifiez votre email' }), { status: 201 });
}
