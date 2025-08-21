// src/lib/email.ts
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY || "";
const resend = resendApiKey ? new Resend(resendApiKey) : null;

function baseUrl() {
  return (
    process.env.NEXTAUTH_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
  );
}

/** Envoi générique (diffusions…) */
export async function sendMail(to: string | string[], subject: string, html: string) {
  if (!resend) {
    console.log("[email] (noop) sendMail", { to, subject });
    return { id: "noop" };
  }
  const { data, error } = await resend.emails.send({
    from: "AE-CPDEC <no-reply@resend.dev>", // remplace par ton domaine vérifié
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
  });
  if (error) throw error;
  return data;
}

/** Email de vérification (inscription) */
export async function sendVerificationEmail(to: string, token: string) {
  const verifyUrl = `${baseUrl()}/verify?token=${encodeURIComponent(token)}`;

  if (!resend) {
    console.log("[email] (noop) sendVerificationEmail", { to, verifyUrl });
    return { id: "noop" };
  }

  const { data, error } = await resend.emails.send({
    from: "AE-CPDEC <no-reply@resend.dev>",
    to,
    subject: "Vérifiez votre adresse email",
    html: `
      <p>Bienvenue à l’AE-CPDEC !</p>
      <p>Pour confirmer votre adresse, cliquez ce lien :</p>
      <p><a href="${verifyUrl}">${verifyUrl}</a></p>
      <p>Si vous n’êtes pas à l’origine de cette demande, ignorez cet email.</p>
    `,
  });
  if (error) throw error;
  return data;
}
