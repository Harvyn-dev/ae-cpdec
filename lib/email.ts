// lib/email.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmailVerificationl(email: string, token: string) {
  const verifyUrl = `${process.env.NEXTAUTH_URL}/verify?token=${token}`;

  await resend.emails.send({
    from: 'no-reply@tondomaine.com', // il faudra vérifier le domaine sur Resend
    to: email,
    subject: 'Vérifiez votre adresse email',
    html: `
      <p>Bienvenue !</p>
      <p>Cliquez sur le lien suivant pour vérifier votre adresse :</p>
      <a href="${verifyUrl}">${verifyUrl}</a>
    `
  });
}
