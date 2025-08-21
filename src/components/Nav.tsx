"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-[#0A2E73] text-white sticky top-0 z-50">
      <nav className="container flex items-center justify-between h-14">
        {/* Logo + titre compressibles */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/images/logo.png"
            alt="AE-CPDEC"
            className="h-8 w-8 rounded bg-white"
          />
          <span className="font-extrabold leading-none">
            <span className="mr-1">AE-</span>
            <span className="hidden xs:inline">CPDEC</span>
            <span className="inline xs:hidden">CPDEC</span>
          </span>
        </Link>

        {/* Bouton burger : visible < md */}
        <button
          onClick={() => setOpen((s) => !s)}
          className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg hover:bg-white/10"
          aria-label="Ouvrir le menu"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor">
            <path strokeWidth="2" strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16"/>
          </svg>
        </button>

        {/* Liens : cachés en mobile */}
        <ul className="hidden md:flex items-center gap-6 text-[15px] font-medium">
          <li><Link href="/">Accueil</Link></li>
          <li><Link href="/news">Actualités</Link></li>
          <li><Link href="/join">Nous rejoindre</Link></li>
          <li><Link href="/contact">Nous contacter</Link></li>
          <li><Link href="/statuts">Statuts</Link></li>
        </ul>
      </nav>

      {/* Menu mobile déroulant */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-[#0A2E73]">
          <ul className="container py-3 space-y-2 text-base">
            <li><Link href="/" onClick={()=>setOpen(false)}>Accueil</Link></li>
            <li><Link href="/news" onClick={()=>setOpen(false)}>Actualités</Link></li>
            <li><Link href="/join" onClick={()=>setOpen(false)}>Nous rejoindre</Link></li>
            <li><Link href="/contact" onClick={()=>setOpen(false)}>Nous contacter</Link></li>
            <li><Link href="/statuts" onClick={()=>setOpen(false)}>Statuts</Link></li>
          </ul>
        </div>
      )}
    </header>
  );
}
