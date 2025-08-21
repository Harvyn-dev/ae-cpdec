import { prisma } from "@/lib/prisma";

export default async function PresidentsPage() {
  const list = await prisma.president.findMany({ orderBy: { yearFrom: "asc" } });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-extrabold">Anciens présidents (2010–2025)</h1>
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {list.map(p => (
          <li key={p.id} className="rounded-2xl bg-white p-5 border">
            <p className="font-semibold">{p.fullName}</p>
            <p className="text-sm text-gray-600">{p.yearFrom}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
