"use client";
import { useState } from "react";

export default function BroadcastPage() {
  const [loading, setLoading] = useState(false);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setLoading(true);
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    const res = await fetch("/api/admin/broadcast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setLoading(false);
    alert(res.ok ? "Email envoyé" : "Erreur");
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl bg-white p-6 border grid gap-4">
      <h2 className="font-bold text-lg">Envoyer un email aux adhérents</h2>
      <label className="text-sm">Sujet
        <input name="subject" className="mt-1 w-full border rounded-lg p-2.5" required />
      </label>
      <label className="text-sm">Message
        <textarea name="message" rows={10} className="mt-1 w-full border rounded-lg p-2.5" required />
      </label>
      <label className="inline-flex items-center gap-2 text-sm">
        <input type="checkbox" name="onlySubscribed" defaultChecked />
        N’envoyer qu’aux abonnés (recommandé)
      </label>
      <button disabled={loading} className="bg-[#0A2E73] text-white rounded-lg py-2.5 font-semibold">
        {loading ? "Envoi..." : "Envoyer"}
      </button>
    </form>
  );
}
