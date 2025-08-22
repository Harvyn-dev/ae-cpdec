"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useMemo } from "react";
import { useSession, signOut } from "next-auth/react";

const NAV = [
  { href: "/", label: "Accueil" },
  { href: "/news", label: "Actualités" },
  { href: "/join", label: "Nous rejoindre" },
  { href: "/contact", label: "Nous contacter" },
  { href: "/statuts", label: "Statuts" },
];

function initialsFromName(name?: string | null) {
  if (!name) return "??";
  const parts = name.trim().split(/\s+/);
  const a = parts[0]?.[0] ?? "";
  const b = parts[1]?.[0] ?? parts[0]?.[1] ?? "";
  return (a + b).toUpperCase();
}

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const displayName = useMemo(() => {
    const u = session?.user as any;
    return u?.name || [u?.firstName, u?.lastName].filter(Boolean).join(" ") || null;
  }, [session]);

  const ini = initialsFromName(displayName);

  return (
    <header className="sticky top-0 z-50 bg-[#0A2E73] text-white shadow">
      <div className="mx-auto max-w-7xl h-16 px-4 sm:px-6 flex items-center justify-between">
        {/* Logo + titre */}
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/images/logo.png"
            alt="AE-CPDEC"
            className="h-9 w-9 rounded-full bg-white object-contain"
          />
          <span className="font-extrabold text-xl md:text-2xl leading-none">
            AE-<span className="opacity-90">CPDEC</span>
          </span>
        </Link>

        {/* Liens desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV.map((it) => {
            const active = pathname === it.href;
            return (
              <Link
                key={it.href}
                href={it.href}
                className={[
                  // tailles : base = 15px, md = 16px, lg = 18px
                  "text-[15px] md:text-base lg:text-lg",
                  "font-medium transition rounded-md px-1 py-2 outline-none focus-visible:ring-2 focus-visible:ring-white/60",
                  active ? "text-[#E9C823]" : "text-white/90 hover:text-[#E9C823]"
                ].join(" ")}
              >
                {it.label}
              </Link>
            );
          })}
        </nav>

        {/* Zone droite */}
        <div className="flex items-center gap-2">
          {!session?.user && (
            <Link
              href="/login"
              className="hidden md:inline-flex bg-[#E9C823] text-[#0A2E73] px-3 py-2 rounded-md text-[15px] md:text-base font-semibold hover:brightness-105 outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              Se connecter
            </Link>
          )}

          {session?.user && (
            <div className="relative hidden md:block">
              <button
                onClick={() => setUserOpen((v) => !v)}
                onBlur={() => setTimeout(() => setUserOpen(false), 150)}
                className="h-10 w-10 rounded-full bg-white text-[#0A2E73] font-bold grid place-items-center border outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                aria-label="Menu utilisateur"
                aria-expanded={userOpen}
              >
                {ini}
              </button>
              {userOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-md border bg-white text-[#0A2E73] shadow-lg overflow-hidden">
                  <div className="px-3 py-2 text-sm font-semibold truncate">{displayName}</div>
                  <button
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    Se déconnecter
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Burger mobile */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-white/10 outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            aria-label="Ouvrir le menu"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Tiroir mobile */}
      {open && (
        <div className="md:hidden fixed inset-0 z-[60] bg-black/50" onClick={() => setOpen(false)}>
          <div
            className="absolute right-0 top-0 h-full w-80 max-w-[85%] bg-white text-[#0A2E73] shadow-xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between px-4 h-16 border-b">
              <span className="font-bold text-lg">Menu</span>
              <button
                aria-label="Fermer"
                className="p-2 rounded hover:bg-gray-100 outline-none focus-visible:ring-2 focus-visible:ring-[#0A2E73]"
                onClick={() => setOpen(false)}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <nav className="px-2 py-3">
              {NAV.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  onClick={() => setOpen(false)}
                  className={[
                    "block rounded-md px-3 py-3 text-base font-medium",
                    "outline-none focus-visible:ring-2 focus-visible:ring-[#0A2E73]",
                    pathname === it.href ? "text-[#0A2E73]" : "text-gray-700 hover:bg-gray-100"
                  ].join(" ")}
                >
                  {it.label}
                </Link>
              ))}
            </nav>

            <div className="mt-2 border-t" />

            <div className="p-3">
              {!session?.user ? (
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="block w-full text-center bg-[#0A2E73] text-white rounded-md py-2.5 text-base font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[#0A2E73]"
                >
                  Se connecter
                </Link>
              ) : (
                <>
                  <div className="flex items-center gap-3 px-1 py-3">
                    <div className="h-10 w-10 rounded-full bg-[#0A2E73] text-white grid place-items-center font-bold text-base">
                      {ini}
                    </div>
                    <div className="truncate">
                      <div className="text-sm font-semibold truncate">{displayName}</div>
                      <div className="text-xs text-gray-500 truncate">{session?.user?.email}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="mt-2 w-full text-center rounded-md border border-[#0A2E73] text-[#0A2E73] py-2.5 text-base font-semibold hover:bg-[#0A2E73] hover:text-white transition outline-none focus-visible:ring-2 focus-visible:ring-[#0A2E73]"
                  >
                    Se déconnecter
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
