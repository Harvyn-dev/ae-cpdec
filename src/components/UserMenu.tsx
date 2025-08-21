"use client";
import { useState, useMemo } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

function Initials({ name, size=36 }: { name?: string; size?: number }) {
  const initials = useMemo(() => {
    if (!name) return "U";
    return name.split(" ").filter(Boolean).slice(0,2).map(s => s[0]?.toUpperCase()).join("");
  }, [name]);
  return (
    <div style={{ width: size, height: size }}
      className="flex items-center justify-center rounded-full bg-white text-[#0A2E73] font-bold"
      aria-label="Profil">
      {initials || "U"}
    </div>
  );
}

export default function UserMenu() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  if (status === "loading") {
    return <div className="w-9 h-9 rounded-full bg-white/30 animate-pulse" />;
  }

  // Non connecté → boutons Connexion / Inscription
  if (!session?.user) {
    return (
      <div className="flex items-center gap-2">
        <button onClick={() => signIn()} className="px-3 py-2 rounded-md bg-white/20 hover:bg-white/30">
          Se connecter
        </button>
        <Link href="/register" className="px-3 py-2 rounded-md bg-[#E9C823] text-[#0A2E73] font-semibold">
          S’inscrire
        </Link>
      </div>
    );
  }

  const name = session.user.name || session.user.email || "Utilisateur";
  const role = (session.user.role || "USER") as "USER" | "ADMIN" | "PR";
  const isAdmin = role === "PR" || role === "ADMIN";

  return (
    <div className="relative flex items-center gap-3">
      {/* Bouton Admin visible PR/ADMIN */}
      {isAdmin && (
        <Link
          href="/admin"
          className="hidden sm:inline-block px-3 py-2 rounded-md bg-[#E9C823] text-[#0A2E73] font-semibold"
        >
          Admin
        </Link>
      )}

      {/* Avatar / menu */}
      <button onClick={() => setOpen(o => !o)} className="flex items-center gap-2">
        <Initials name={name} />
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-56 rounded-xl bg-white text-[#0A2E73] shadow-lg border overflow-hidden"
          onMouseLeave={() => setOpen(false)}
        >
          <div className="px-4 py-3 border-b">
            <p className="font-semibold truncate">{name}</p>
            <p className="text-sm opacity-70 truncate">{session.user.email}</p>
            <p className="mt-1 text-xs opacity-60">Rôle: {role}</p>
          </div>
          <nav className="grid">
            {isAdmin && (
              <Link href="/admin" className="px-4 py-2.5 hover:bg-[#0A2E73]/5">
                Espace Admin (PR)
              </Link>
            )}
           
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="text-left px-4 py-2.5 hover:bg-[#0A2E73]/5"
            >
              Se déconnecter
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
