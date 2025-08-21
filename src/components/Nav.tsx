"use client";
import Link from "next/link";
import Image from "next/image";
import NotificationBell from "./NotificationBell";
import UserMenu from "./UserMenu";

export default function Nav() {
  const link = "px-4 py-2 !text-white font-semibold rounded-md transition hover:bg-white/20";
  return (
    <header className="w-full bg-[#0A2E73] shadow-md sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4">
          <Image src="/images/logo.png" alt="AE-CPDEC" width={72} height={72} className="rounded-full bg-white p-1" priority />
          <span className="font-bold tracking-wide text-2xl !text-white">AE-CPDEC</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link href="/" className={link}>Accueil</Link>
          <Link href="/news" className={link}>Actualités</Link>
          <Link href="/join" className={link}>Nous rejoindre</Link>
          <Link href="/contact" className={link}>Nous contacter</Link>
          <Link href="/statuts" className={link}>Statuts</Link>
          <Link href="/presidents" className={link}>Présidents</Link>
        </nav>

        <div className="flex items-center gap-4">
          <NotificationBell />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
