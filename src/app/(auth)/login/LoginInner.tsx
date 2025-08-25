"use client";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function LoginInner() {
  const router = useRouter();
  const q = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");            // ← NEW: on garde l'email saisi
  const [error, setError] = useState<string | null>(null);

  const [resending, setResending] = useState(false); // ← NEW: état bouton renvoi
  const [resentMsg, setResentMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setResentMsg(null);

    const fd = new FormData(e.currentTarget);
    const emailForm = String(fd.get("email") || email || "");
    const password = String(fd.get("password") || "");

    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email: emailForm,
      password,
    });
    setLoading(false);

    if (res?.ok) router.push("/");
    else if (res?.error === "EMAIL_NOT_VERIFIED") {
      setError("Votre e-mail n’est pas encore vérifié. Vérifiez votre boîte mail ou renvoyez le lien ci-dessous.");
    } else {
      setError(res?.error || "Email ou mot de passe incorrect");
    }
  }

  async function resendVerification() {
    setResentMsg(null);
    setError(null);
    // on exige un email non vide
    const target = email.trim();
    if (!target) {
      setError("Renseignez votre e-mail puis cliquez sur « Renvoyer ».");
      return;
    }

    try {
      setResending(true);
      const res = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: target }),
      });
      // Réponse générique (ok:true même si l'user n'existe pas, par sécurité)
      if (!res.ok) throw new Error("Impossible d’envoyer l’e-mail pour le moment.");
      setResentMsg("Si un compte existe, un nouvel e-mail de vérification vient d’être envoyé.");
    } catch (e: any) {
      setError(e.message || "Erreur lors de l’envoi.");
    } finally {
      setResending(false);
    }
  }

  return (
    <div className="bg-white border rounded-2xl p-6 shadow-sm">
      <h1 className="text-2xl font-bold mb-1 text-[#0A2E73]">Se connecter</h1>

      {q.get("registered") && (
        <p className="text-sm text-amber-700 mb-2">
          Compte créé ✅ — vérifiez votre e-mail pour activer votre compte.
        </p>
      )}
      {q.get("verify") === "ok" && (
        <p className="text-sm text-green-700 mb-2">E-mail vérifié ✅ Vous pouvez vous connecter.</p>
      )}
      {q.get("verify") === "invalid" && (
        <p className="text-sm text-red-600 mb-2">Lien invalide ou expiré. Vous pouvez renvoyer l’e-mail ci-dessous.</p>
      )}

      <form className="grid gap-3" onSubmit={onSubmit} autoComplete="on">
        <label className="text-sm">
          Email
          <input
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            className="input"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}   // ← NEW: on contrôle l'email
          />
        </label>
        <label className="text-sm">
          Mot de passe
          <input name="password" type="password" autoComplete="current-password" className="input" required />
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {resentMsg && <p className="text-sm text-green-700">{resentMsg}</p>}

        <button
          disabled={loading}
          className="bg-[#0A2E73] hover:brightness-110 text-white rounded-md py-2 transition disabled:opacity-60"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>

      {/* Lien et bouton de renvoi */}
      <div className="mt-4 flex items-center justify-between text-sm">
        <Link href="/register" className="text-[#0A2E73] underline">
          Créer un compte
        </Link>
        <Link href="/forgot" className="text-[#0A2E73] underline">
          Mot de passe oublié ?
        </Link>
      </div>

      <div className="mt-3">
        <button
          type="button"
          onClick={resendVerification}
          disabled={resending}
          className="text-sm text-[#0A2E73] underline disabled:opacity-60"
        >
          {resending ? "Envoi..." : "Renvoyer l’e-mail de vérification"}
        </button>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          border: 1px solid #e5e7eb;
          border-radius: 0.6rem;
          padding: 0.6rem;
          margin-top: 0.25rem;
          background: #fff;
          color: #111827;
        }
        .input:focus {
          outline: 2px solid #0a2e73;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}
