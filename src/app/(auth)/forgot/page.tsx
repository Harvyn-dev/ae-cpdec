"use client";
import { useState } from "react";
import Link from "next/link";

export default function ForgotPage() {
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    // TODO: implémenter l'API de reset (token par email)
    console.log("reset for:", fd.get("email"));
    setSent(true);
  }

  return (
    <div className="bg-white border rounded-2xl p-6 shadow-sm">
      <h1 className="text-2xl font-bold mb-1 text-[#0A2E73]">Mot de passe oublié</h1>
      <p className="text-sm text-gray-600 mb-4">Entrez votre email pour recevoir un lien de réinitialisation.</p>

      {sent ? (
        <p className="text-green-700">Si un compte existe, un email a été envoyé.</p>
      ) : (
        <form className="grid gap-3" onSubmit={onSubmit}>
          <label className="text-sm">
            Email
            <input type="email" name="email" className="input" required />
          </label>
          <button className="bg-[#0A2E73] text-white rounded-md py-2">Envoyer</button>
        </form>
      )}

      <p className="mt-4 text-sm">
        <Link href="/login" className="text-[#0A2E73] underline">Retour à la connexion</Link>
      </p>

      <style jsx>{`
        .input{width:100%;border:1px solid #e5e7eb;border-radius:.6rem;padding:.6rem;margin-top:.25rem}
        .input:focus{outline:2px solid #0A2E73; outline-offset:2px}
      `}</style>
    </div>
  );
}
