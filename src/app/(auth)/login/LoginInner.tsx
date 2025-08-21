"use client";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function LoginInner() {
  const r = useRouter();
  const q = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email: fd.get("email"),
      password: fd.get("password"),
    });
    setLoading(false);
    if (res?.ok) r.push("/");
    else setError(res?.error || "Email ou mot de passe incorrect");
  }

  return (
    <div className="bg-white border rounded-2xl p-6 shadow-sm">
      <h1 className="text-2xl font-bold mb-1 text-[#0A2E73]">Se connecter</h1>
      {q.get("registered") && (
        <p className="text-sm text-green-700 mb-2">
          Compte créé. Vous pouvez vous connecter.
        </p>
      )}

      <form className="grid gap-3" onSubmit={onSubmit}>
        <label className="text-sm">
          Email
          <input name="email" type="email" className="input" required />
        </label>
        <label className="text-sm">
          Mot de passe
          <input name="password" type="password" className="input" required />
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          disabled={loading}
          className="bg-[#0A2E73] hover:brightness-110 text-white rounded-md py-2 transition"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>

      <div className="mt-4 flex items-center justify-between text-sm">
        <Link href="/register" className="text-[#0A2E73] underline">
          Créer un compte
        </Link>
        <Link href="/forgot" className="text-[#0A2E73] underline">
          Mot de passe oublié ?
        </Link>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          border: 1px solid #e5e7eb;
          border-radius: 0.6rem;
          padding: 0.6rem;
          margin-top: 0.25rem;
        }
        .input:focus {
          outline: 2px solid #0a2e73;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}
