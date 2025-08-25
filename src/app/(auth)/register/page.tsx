"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const CLASSES = [
  "DCG première année",
  "DCG deuxième année",
  "DCG troisième année",
  "DSCG première année",
  "DSCG deuxième année",
];

export default function RegisterPage() {
  const r = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries()) as any;
    if (data.password !== data.confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          className: data.className, // <- select
          password: data.password,
        }),
      });
      if (!res.ok) throw new Error((await res.json())?.error || "Erreur d'inscription");
      r.push("/login?registered=1");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white border rounded-2xl p-6 shadow-sm">
      <h1 className="text-2xl font-bold mb-1 text-[#0A2E73]">Créer un compte</h1>
      <p className="text-sm text-gray-600 mb-4">Rejoignez l’AE-CPDEC en quelques secondes.</p>

      <form className="grid grid-cols-2 gap-3" onSubmit={onSubmit}>
        <label className="col-span-1 text-sm">
          Prénom
          <input name="firstName" className="input" required />
        </label>
        <label className="col-span-1 text-sm">
          Nom
          <input name="lastName" className="input" required />
        </label>

        <label className="col-span-2 text-sm">
          Email
          <input type="email" name="email" className="input" required />
        </label>

        <label className="col-span-1 text-sm">
          Numéro
          <input name="phone" className="input" required />
        </label>

        <label className="col-span-1 text-sm">
          Classe
          <select name="className" className="input" required defaultValue="">
            <option value="" disabled>Choisir une classe</option>
            {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>

        <label className="col-span-1 text-sm">
          Mot de passe
          <input type="password" name="password" className="input" required />
        </label>
        <label className="col-span-1 text-sm">
          Confirmer
          <input type="password" name="confirm" className="input" required />
        </label>

        {error && <p className="col-span-2 text-sm text-red-600">{error}</p>}

        <button disabled={loading}
          className="col-span-2 bg-[#0A2E73] hover:brightness-110 text-white rounded-md py-2 transition">
          {loading ? "Création..." : "S'inscrire"}
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600">
        Déjà membre ?{" "}
        <Link href="/login" className="text-[#0A2E73] font-medium underline">Se connecter</Link>
      </p>

      <style jsx>{`
        .input{width:100%;border:1px solid #e5e7eb;border-radius:.6rem;padding:.6rem;margin-top:.25rem}
        .input:focus{outline:2px solid #0A2E73; outline-offset:2px}
      `}</style>
    </div>
  );

}