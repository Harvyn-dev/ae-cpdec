"use client";
import { useState } from "react";

export default function NewNewsPage() {
  const [loading, setLoading] = useState(false);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const body = Object.fromEntries(fd.entries());
    const res = await fetch("/api/admin/news", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setLoading(false);
    alert(res.ok ? "Actualité publiée + notifications envoyées" : "Erreur");
    if (res.ok) window.location.href = "/news";
  }
  return (
    <form onSubmit={onSubmit} className="rounded-2xl bg-white p-6 border grid gap-4">
      <h2 className="font-bold text-lg">Nouvelle actualité / évènement</h2>
      <label className="text-sm">Titre
        <input name="title" className="mt-1 w-full border rounded-lg p-2.5" required />
      </label>
      <label className="text-sm">Type
        <select name="kind" className="mt-1 w-full border rounded-lg p-2.5" required>
          <option value="EVENT">Évènement</option>
          <option value="INFO">Information</option>
        </select>
      </label>
      <label className="text-sm">Date/heure (si évènement)
        <input type="datetime-local" name="startsAt" className="mt-1 w-full border rounded-lg p-2.5" />
      </label>
      <label className="text-sm">Contenu
        <textarea name="body" rows={8} className="mt-1 w-full border rounded-lg p-2.5" required />
      </label>
      <button disabled={loading} className="bg-[#0A2E73] text-white rounded-lg py-2.5 font-semibold">
        {loading ? "Publication..." : "Publier"}
      </button>
    </form>
  );
}
