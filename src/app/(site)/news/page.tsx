// src/app/news/page.tsx
import Link from "next/link";
import { prisma } from "@/lib/prisma";

function formatAbidjan(d: Date | string) {
  const date = typeof d === "string" ? new Date(d) : d;
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Africa/Abidjan",
  }).format(date);
}

type SP = Record<string, string | string[] | undefined>;

export default async function NewsPage({
  searchParams,
}: {
  searchParams?: Promise<SP> | undefined; // Next 15: peut être une Promise
}) {
  const sp: SP | undefined = searchParams ? await searchParams : undefined;

  const rawId = sp?.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  const items = await prisma.news.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, body: true, kind: true, createdAt: true },
  });

  if (!items.length) {
    return (
      <div className="rounded-2xl bg-white p-8 border text-[#0A2E73]/75">
        Aucune actualité pour le moment.
      </div>
    );
  }

  const current = items.find((n) => n.id === id) ?? items[0];
  const others = items.filter((n) => n.id !== current.id);

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Article complet */}
      <article className="lg:col-span-2 rounded-2xl bg-white border p-6 md:p-8">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl md:text-3xl font-bold text-[#0A2E73]">
            {current.title}
          </h1>
          <span className="shrink-0 text-xs uppercase bg-[#E9C823] text-[#0A2E73] px-2 py-0.5 rounded font-bold">
            {current.kind}
          </span>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Publié le {formatAbidjan(current.createdAt)}
        </p>

        {current.body && (
          <div className="prose max-w-none mt-6">
            <p className="whitespace-pre-wrap leading-relaxed text-gray-800">
              {current.body}
            </p>
          </div>
        )}
      </article>

      {/* Plus d’actualités (sans bouton) */}
      <aside className="space-y-4">
        <h2 className="text-lg font-semibold text-[#0A2E73]">
          Plus d’actualités
        </h2>
        <ul className="space-y-4">
          {others.map((n) => (
            <li key={n.id}>
              <Link
                href={`/news?id=${n.id}`}
                className="block rounded-2xl bg-white border p-5 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold text-[#0A2E73] line-clamp-2">
                    {n.title}
                  </h3>
                  <span className="shrink-0 text-[11px] uppercase bg-[#E9C823] text-[#0A2E73] px-2 py-0.5 rounded font-bold">
                    {n.kind}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Publié le {formatAbidjan(n.createdAt)}
                </p>
                {n.body && (
                  <p className="mt-2 text-gray-700 line-clamp-3">{n.body}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
