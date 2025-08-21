// src/app/(site)/page.tsx
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import NewsCarousel, { NewsItem } from "@/components/NewsCarousel";
import OfficersSection from "@/components/OfficersSection";

export default async function HomePage() {
  // Évènements (inchangé)
  const upcoming = await prisma.news.findMany({
    where: { startsAt: { gt: new Date() } },
    orderBy: { startsAt: "asc" },
    take: 3,
  });

  // Dernières actus pour le carrousel
  const latest = await prisma.news.findMany({
    orderBy: { createdAt: "desc" },
    take: 8,
    select: { id: true, title: true, body: true, kind: true, startsAt: true, createdAt: true },
  });

  const carouselItems: NewsItem[] = latest.map(n => ({
    id: n.id,
    title: n.title,
    body: n.body,
    kind: n.kind,
    startsAt: n.startsAt ? n.startsAt.toISOString() : null,
  }));

  return (
    <div className="space-y-12 md:space-y-14">
      {/* HERO — agrandie */}
      <section className="relative overflow-hidden rounded-3xl text-white min-h-[360px] md:min-h-[460px]">
      <Image
        src="/images/hero.jpg"
        alt="AE-CPDEC — Passation"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[70%_40%]" // ← focus vers la droite/haut
      />

        <div className="absolute inset-0 bg-[#0A2E73]/60" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0A2E73]/20 via-transparent to-black/25" />

        <div className="relative px-8 py-10 md:px-14 md:py-16 flex h-full items-start md:items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow">
              Bienvenue à l’AE-CPDEC
            </h1>
            <p className="mt-4 max-w-2xl text-white/90 drop-shadow-sm text-lg">
              Association des Étudiants du Centre de Préparation aux Diplômes de l’Expertise
              Comptable (INP-HB INTEC).
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/news"
                className="bg-white text-[#0A2E73] px-5 py-2.5 rounded-lg font-semibold"
              >
                Voir les actualités
              </Link>
              <Link
                href="/join"
                className="bg-[#E9C823] text-[#0A2E73] px-5 py-2.5 rounded-lg font-semibold"
              >
                Nous rejoindre
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CARROUSEL D’ACTUALITÉS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#0A2E73]">Dernières actualités</h2>
          <Link href="/news" className="text-sm font-medium underline">Tout voir</Link>
        </div>
        <NewsCarousel items={carouselItems} />
      </section>

      <section className="bg-gray-50 rounded-2xl p-8 md:p-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A2E73] mb-6">À propos de nous</h2>
          <p className="text-lg text-gray-700 mb-8">
            L'AE-CPDEC accompagne les étudiants dans leur parcours vers l'expertise comptable. Notre mission est de
            créer un environnement d'apprentissage collaboratif et de faciliter l'insertion professionnelle de nos
            membres.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-[#0A2E73] mb-3">Mission</h3>
              <p className="text-gray-600">Accompagner les étudiants vers l'excellence en expertise comptable</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-[#0A2E73] mb-3">Vision</h3>
              <p className="text-gray-600">Devenir la référence des associations étudiantes en comptabilité</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-[#0A2E73] mb-3">Valeurs</h3>
              <p className="text-gray-600">Excellence, solidarité et professionnalisme</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0A2E73] text-white rounded-2xl p-8 md:p-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">L'AE-CPDEC en chiffres</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-[#E9C823] mb-2">150+</div>
              <p className="text-white/90">Membres actifs</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-[#E9C823] mb-2">85%</div>
              <p className="text-white/90">Taux de réussite</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-[#E9C823] mb-2">5+</div>
              <p className="text-white/90">Événements par an</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-[#E9C823] mb-2">15+</div>
              <p className="text-white/90">Cabinets partenaires</p>
            </div>
          </div>
        </div>
      </section>

      <OfficersSection
  officers={[
    {
      role: "PR",
      firstName: "Chris-Ivan",
      lastName: "ABBA",
      className: "DCG 3",
      photo: "/officers/pr.jpg",
    },
    {
      role: "VP",
      firstName: "X",
      lastName: "Y",
      className: "DCG 3",
      photo: "/officers/vp.jpg",
    },
    {
      role: "SG",
      firstName: "Nathan",
      lastName: "BROU",
      className: "DCG 3",
      photo: "/officers/sg.jpg",
    },
  ]}
/>

    </div>
  );
}
