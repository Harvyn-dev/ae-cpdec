import { prisma } from "@/lib/prisma";

// ordre d’affichage souhaité
const ROLE_ORDER: Record<string, number> = { PR: 0, SG: 1, VP: 2 };

export default async function ContactPage() {
  // 1) On ne récupère que les rôles principaux
  // 2) On tente un DISTINCT en base (si un doublon exact existe)
  const raw = await prisma.officer.findMany({
    where: { role: { in: ["PR", "SG", "VP"] } },
    distinct: ["firstName", "lastName", "role"], // Postgres: DISTINCT ON
  });

  // 3) Dédoublonnage côté serveur (au cas où) + tri PR → SG → VP + limite 3
  const officers = raw
    .filter(
      (o, i, self) =>
        i ===
        self.findIndex(
          (p) =>
            p.firstName === o.firstName &&
            p.lastName === o.lastName &&
            p.role === o.role
        )
    )
    .sort((a, b) => (ROLE_ORDER[a.role] ?? 99) - (ROLE_ORDER[b.role] ?? 99))
    .slice(0, 3);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Liste des 3 membres */}
      <section className="space-y-3">
        <h1 className="text-3xl font-extrabold mb-2">Nous contacter</h1>

        {officers.map((o) => (
          <div key={`${o.firstName}-${o.lastName}-${o.role}`} className="rounded-2xl bg-white p-5 border">
            <p className="text-xs uppercase tracking-wide text-[#0A2E73]/60">
              Membre du bureau
            </p>
            <p className="mt-1 font-semibold text-lg">
              {o.firstName} {o.lastName}
            </p>
            <p className="text-sm text-gray-600">{o.role}</p>
          </div>
        ))}
      </section>

      {/* Formulaire de contact */}
      <form action="/api/contact" method="post" className="rounded-2xl bg-white p-6 border grid gap-3">
        <h2 className="font-bold text-lg">Poser une question</h2>
        <input name="name" placeholder="Votre nom" className="w-full border rounded-lg p-2.5" required />
        <input name="email" type="email" placeholder="Votre email" className="w-full border rounded-lg p-2.5" required />
        <input name="phone" placeholder="Téléphone (optionnel)" className="w-full border rounded-lg p-2.5" />
        <input name="subject" placeholder="Sujet" className="w-full border rounded-lg p-2.5" required />
        <textarea name="message" rows={5} placeholder="Message" className="w-full border rounded-lg p-2.5" required />
        <button className="bg-[#0A2E73] text-white rounded-lg py-2.5 font-semibold hover:brightness-110">
          Envoyer
        </button>
      </form>
    </div>
  );
}
