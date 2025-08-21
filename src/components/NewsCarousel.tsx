"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

export type NewsItem = {
  id: string;
  title: string;
  body: string | null;
  kind: string;
  startsAt?: string | null;
  createdAt?: string | null;
};

function formatAbidjan(d?: string | null) {
  if (!d) return null;
  try {
    return new Intl.DateTimeFormat("fr-FR", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Africa/Abidjan",
    }).format(new Date(d));
  } catch {
    return null;
  }
}

export default function NewsCarousel({ items }: { items: NewsItem[] }) {
  const autoplay = React.useRef(
    Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: true })
  );
  const [emblaRef, embla] = useEmblaCarousel(
    { loop: true, align: "start", duration: 22 },
    [autoplay.current]
  );

  const [selected, setSelected] = React.useState(0);
  const [snaps, setSnaps] = React.useState<number[]>([]);

  React.useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    setSnaps(embla.scrollSnapList());
    embla.on("select", onSelect);
    onSelect();
  }, [embla]);

  if (!items?.length) {
    return (
      <div className="rounded-2xl bg-white p-6 border text-[#0A2E73]/70">
        Aucune actualité pour le moment.
      </div>
    );
  }

  return (
    <div className="relative">
      {/* viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        {/* track */}
        <div className="flex gap-5">
          {items.map((n) => (
            <article
              key={n.id}
              className="
                flex-[0_0_100%]
                sm:flex-[0_0_calc(50%-0.625rem)]
                lg:flex-[0_0_calc(33.333%-0.666rem)]
              "
            >
              <div className="h-full rounded-2xl bg-white border hover:shadow-lg transition">
                <div className="p-5 flex h-full flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold text-[#0A2E73] line-clamp-2">
                      {n.title}
                    </h3>
                    <span className="shrink-0 text-[11px] uppercase bg-[#E9C823] text-[#0A2E73] px-2 py-0.5 rounded font-bold">
                      {n.kind}
                    </span>
                  </div>

                  <div className="mt-1 text-xs text-gray-500">
                    {n.startsAt
                      ? <>Le {formatAbidjan(n.startsAt)}</>
                      : n.createdAt
                      ? <>Publié le {formatAbidjan(n.createdAt)}</>
                      : null}
                  </div>

                  {n.body && (
                    <p className="mt-3 text-gray-700 line-clamp-4">{n.body}</p>
                  )}

                  <div className="mt-auto pt-3">
                    <Link
                      href={`/news?id=${n.id}`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[#0A2E73] hover:underline"
                    >
                      Lire plus →
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* flèches */}
      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2">
        <button
          onClick={() => embla?.scrollPrev()}
          className="pointer-events-auto hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 border shadow hover:bg-white"
          aria-label="Précédent"
        >
          ←
        </button>
        <button
          onClick={() => embla?.scrollNext()}
          className="pointer-events-auto hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 border shadow hover:bg-white"
          aria-label="Suivant"
        >
          →
        </button>
      </div>

      {/* puces */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {snaps.map((_, i) => (
          <button
            key={i}
            onClick={() => embla?.scrollTo(i)}
            aria-label={`Aller au slide ${i + 1}`}
            className={`h-2.5 w-2.5 rounded-full border transition ${
              i === selected
                ? "bg-[#0A2E73] border-[#0A2E73]"
                : "bg-white border-gray-300 hover:bg-gray-100"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
