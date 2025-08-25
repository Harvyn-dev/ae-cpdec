import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);
const FROM = process.env.EMAIL_FROM || "AE-CPDEC <no-reply@ae-cpdec.org>";

export async function sendVerificationEmail(to: string, verifyUrl: string) {
  await resend.emails.send({
    from: FROM,
    to,
    subject: "Vérifiez votre adresse e-mail",
    html: `
      <div style="font-family:system-ui,Segoe UI,Roboto,Arial">
        <h2>Confirmation d’adresse e-mail</h2>
        <p>Merci de confirmer votre e-mail pour activer votre compte.</p>
        <p style="margin:22px 0">
          <a href="${verifyUrl}" style="background:#0A2E73;color:#fff;padding:12px 18px;border-radius:8px;text-decoration:none;display:inline-block">
            Vérifier mon e-mail
          </a>
        </p>
        <p>Ou copiez/collez ce lien : <a href="${verifyUrl}">${verifyUrl}</a></p>
        <p style="color:#666">Ce lien expire dans 30 minutes.</p>
      </div>
    `,
  });
}
