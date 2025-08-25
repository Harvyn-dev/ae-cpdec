import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) {
  console.warn("RESEND_API_KEY manquant — les emails ne seront pas envoyés.");
}

export const resend = new Resend(apiKey);

/**
 * Envoie l’email de vérification.
 * @param to    adresse email du destinataire
 * @param link  URL de vérification complète (avec token)
 */
export async function sendEmailVerification(to: string, link: string) {
  if (!apiKey) return;

  const from = process.env.EMAIL_FROM || "no-reply@example.com";
  const subject = "Vérifie ton adresse email – AE-CPDEC";
  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto">
      <h2>Bienvenue à l’AE-CPDEC 👋</h2>
      <p>Merci de t’être inscrit. Clique sur le bouton ci-dessous pour vérifier ton adresse email&nbsp;:</p>
      <p>
        <a href="${link}"
           style="display:inline-block;background:#0A2E73;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none">
          Vérifier mon email
        </a>
      </p>
      <p>Ou copie ce lien dans ton navigateur&nbsp;:<br/><code>${link}</code></p>
      <p style="color:#6b7280">Ce lien expire dans 30 minutes.</p>
    </div>
  `;

  await resend.emails.send({
    from,
    to,
    subject,
    html,
  });
}
