// src/app/(auth)/verify/VerifyInner.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyInner() {
  const router = useRouter();
  const search = useSearchParams();
  const token = search.get("token") || search.get("t");

  const [status, setStatus] = useState<"idle"|"loading"|"ok"|"error">("idle");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    async function run() {
      if (!token) {
        setStatus("error");
        setMessage("Lien de vérification invalide ou manquant.");
        return;
      }
      try {
        setStatus("loading");
        // Appelle ton endpoint d’API qui valide le token
        const res = await fetch(`/api/verify?token=${encodeURIComponent(token)}`, { method: "POST" });
        if (!res.ok) throw new Error(await res.text());
        setStatus("ok");
        setMessage("Votre adresse email a été vérifiée avec succès !");
        // redirection douce vers la connexion après 1.5s
        setTimeout(() => router.push("/login?registered=1"), 1500);
      } catch (e: any) {
        setStatus("error");
        setMessage(e?.message || "Une erreur est survenue pendant la vérification.");
      }
    }
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="bg-white border rounded-2xl p-8 shadow-sm text-center">
      <h1 className="text-2xl font-bold text-[#0A2E73]">Vérification du compte</h1>

      {status === "loading" && (
        <p className="mt-4 text-gray-600">Vérification en cours…</p>
      )}

      {status === "ok" && (
        <p className="mt-4 text-green-700">{message}</p>
      )}

      {status === "error" && (
        <p className="mt-4 text-red-600">{message}</p>
      )}

      <button
        onClick={() => router.push("/login")}
        className="mt-6 inline-flex items-center justify-center rounded-lg bg-[#0A2E73] px-4 py-2 text-white font-semibold hover:brightness-110"
      >
        Aller à la connexion
      </button>
    </div>
  );
}
