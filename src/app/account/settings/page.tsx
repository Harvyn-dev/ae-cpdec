"use client";
import { useEffect, useState } from "react";

const CLASSES = [
  "DCG première année","DCG deuxième année","DCG troisième année",
  "DSCG première année","DSCG deuxième année",
];

export default function SettingsPage() {
  const [data, setData] = useState<any>(null);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/account/me");
      if (res.ok) setData(await res.json());
    })();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setMsg(null);
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    const res = await fetch("/api/account/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setMsg(res.ok ? "Enregistré ✅" : "Erreur ❌");
  }

  if (!data) return <p>Chargement…</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-extrabold">Paramètres</h1>

      <form onSubmit={onSubmit} className="rounded-2xl bg-white p-6 border grid sm:grid-cols-2 gap-4">
        <label className="text-sm">Prénom
          <input name="firstName" defaultValue={data.firstName} className="mt-1 w-full border rounded-lg p-2.5" required />
        </label>
        <label className="text-sm">Nom
          <input name="lastName" defaultValue={data.lastName} className="mt-1 w-full border rounded-lg p-2.5" required />
        </label>
        <label className="text-sm">Téléphone (CI)
          <input
            name="phone"
            defaultValue={data.phone}
            className="mt-1 w-full border rounded-lg p-2.5"
            required
            pattern="^(?:\+225)?(01|05|07|21|25|27)\d{8}$"
            title="Numéro Côte d'Ivoire (ex: 07XXXXXXXX ou +22507XXXXXXXX)"
          />
        </label>
        <label className="text-sm">Classe
          <select name="className" defaultValue={data.className} className="mt-1 w-full border rounded-lg p-2.5" required>
            {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <div className="sm:col-span-2 flex items-center justify-between">
          <button className="bg-[#0A2E73] text-white rounded-lg py-2.5 px-4 font-semibold">Enregistrer</button>
          {msg && <span className="text-sm">{msg}</span>}
        </div>
      </form>
    </div>
  );
}
