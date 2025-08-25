// src/lib/email.ts
import { Resend } from "resend";

// instancie le client Resend (ne pas planter si la clé n'est pas présente)
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
export const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

/**
 * Envoie l'email de vérification de compte.
 * Export *nommé* — c'est bien CE nom qu'on importe ailleurs.
 */
export async function sendEmailVerification(to: string, verifyUrl: string) {
  // Sécurité: en l'absence de clé, on log au lieu de planter
  if (!resend) {
    console.warn("[email] RESEND_API_KEY manquant — lien de vérification:", verifyUrl);
    return;
  }

  await resend.emails.send({
    from: "AE-CPDEC <noreply@your-domain.com>", // ⚠️ mets un domaine vérifié Resend
    to,
    subject: "Vérifie ton adresse email — AE-CPDEC",
    html: `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;">
        <h2>Bienvenue à l’AE-CPDEC 👋</h2>
        <p>Merci de t’être inscrit. Clique sur le bouton ci-dessous pour vérifier ton adresse email.</p>
        <p style="margin:24px 0;">
          <a href="${verifyUrl}" style="background:#0A2E73;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none;display:inline-block">
            Vérifier mon email
          </a>
        </p>
        <p>Ou copie ce lien dans ton navigateur :<br/>
          <a href="${verifyUrl}">${verifyUrl}</a>
        </p>
        <hr/>
        <p style="color:#666">Ce lien expirera dans 30 minutes.</p>
      </div>
    `,
  });
}
