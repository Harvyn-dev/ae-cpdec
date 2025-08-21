"use client";

import Image from "next/image";

type Officer = {
  role: "PR" | "VP" | "SG";
  firstName: string;
  lastName: string;
  className: string;      // ex: "DCG 2"
  photo?: string;         // chemin depuis /public
};

const ROLE_LABEL: Record<Officer["role"], string> = {
  PR: "Président",
  VP: "Vice-présidente",
  SG: "Secrétaire générale",
};

export default function OfficersSection({ officers }: { officers: Officer[] }) {
  return (
    <section className="rounded-2xl p-8 md:p-12 bg-white border">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0A2E73] text-center">
          Le Bureau
        </h2>

        <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {officers.map((o) => (
            <li
              key={o.role}
              className="rounded-2xl bg-[#0A2E73]/[0.03] border hover:shadow-md transition"
            >
              <div className="p-6 flex flex-col items-center text-center">
                <div className="relative h-36 w-36 rounded-full overflow-hidden ring-4 ring-white shadow">
                  {o.photo ? (
                    <Image
                      src={o.photo}
                      alt={`${o.firstName} ${o.lastName}`}
                      fill
                      sizes="144px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-[#0A2E73] text-white text-3xl font-semibold">
                      {o.firstName[0]}
                      {o.lastName[0]}
                    </div>
                  )}
                </div>

                <span className="mt-4 inline-flex items-center gap-2 text-xs uppercase bg-[#E9C823] text-[#0A2E73] px-2.5 py-1 rounded-full font-bold tracking-wide">
                  {ROLE_LABEL[o.role]}
                </span>

                <h3 className="mt-3 text-xl font-semibold text-[#0A2E73]">
                  {o.firstName} <span className="uppercase">{o.lastName}</span>
                </h3>

                <p className="text-sm text-gray-600">
                  {o.className}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
