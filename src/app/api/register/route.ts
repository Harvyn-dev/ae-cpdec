import { prisma } from '@/lib/prisma';
import {sendEmailVerification } from '@/lib/email';
import { createHash, randomBytes } from 'crypto';
import { addMinutes } from 'date-fns';

function sha256Hex(s: string) {
  return createHash("sha256").update(s).digest("hex");
}

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
 // 1) Générer un token public (ce qu’on mettra dans l’URL)
const token = randomBytes(32).toString("hex");

// 2) Hacher le token pour la base
const tokenHash = sha256Hex(token);

// 3) Enregistrer en base dans le champ *tokenHash*
await prisma.emailVerificationToken.create({
  data: {
    tokenHash,                 // ✅ bon champ
    userId: user.id,
    expiresAt: addMinutes(new Date(), 30),
  },
});

// 4) Construire l’URL de vérif et envoyer l’email
const base = process.env.NEXTAUTH_URL || "http://localhost:3000";
const verifyUrl = `${base}/verify?token=${token}&uid=${user.id}`;
await sendEmailVerification(user.email, verifyUrl);

  // Envoyer email
  await sendEmailVerification(email, token);

  return new Response(JSON.stringify({ message: 'Inscription réussie, vérifiez votre email' }), { status: 201 });
}
