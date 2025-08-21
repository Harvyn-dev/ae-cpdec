import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 bg-[#0A2E73] text-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-10">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              {/* Mets ton logo dans /public/logo.png */}
              <img
                src="/logo.png"
                alt="AE-CPDEC"
                className="h-10 w-10 rounded bg-white/10 p-2"
              />
              <span className="text-lg font-semibold">AE-CPDEC</span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Association des Étudiants du Centre de Préparation aux Diplômes de
              l’Expertise Comptable (INP-HB INTEC).
            </p>
          </div>

          {/* Navigation */}
          <nav className="grid grid-cols-2 gap-6 md:col-span-2 md:grid-cols-3">
            <div>
              <h3 className="font-semibold mb-3">Site</h3>
              <ul className="space-y-2 text-white/90">
                <li><Link href="/" className="hover:underline">Accueil</Link></li>
                <li><Link href="/news" className="hover:underline">Actualités</Link></li>
                <li><Link href="/join" className="hover:underline">Nous rejoindre</Link></li>
                <li><Link href="/statuts" className="hover:underline">Statuts</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Association</h3>
              <ul className="space-y-2 text-white/90">
                <li><Link href="/presidents" className="hover:underline">Présidents</Link></li>
                <li><Link href="/contact" className="hover:underline">Nous contacter</Link></li>
                <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Légal</h3>
              <ul className="space-y-2 text-white/90">
                <li><Link href="/mentions-legales" className="hover:underline">Mentions légales</Link></li>
                <li><Link href="/confidentialite" className="hover:underline">Confidentialité</Link></li>
                <li><Link href="/cookies" className="hover:underline">Cookies</Link></li>
              </ul>
            </div>
          </nav>

          {/* Contact */}
          <div className="space-y-3">
            <h3 className="font-semibold">Contact</h3>
            <p className="text-white/90 text-sm">
              Email : <a href="mailto:contact@ae-cpdec.org" className="underline">contact@ae-cpdec.org</a><br/>
              Téléphone : <a href="tel:+22501020304" className="underline">+225 01 02 03 04</a>
            </p>
            <div className="flex items-center gap-3 pt-2">
              {/* Icônes simples en emoji pour éviter des libs, remplace si besoin */}
              <a href="https://facebook.com" aria-label="Facebook" className="hover:opacity-80">📘</a>
              <a href="https://twitter.com" aria-label="X/Twitter" className="hover:opacity-80">🐦</a>
              <a href="https://www.linkedin.com" aria-label="LinkedIn" className="hover:opacity-80">🔗</a>
              <a href="https://instagram.com" aria-label="Instagram" className="hover:opacity-80">📸</a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-white/70 text-sm">© {year} AE-CPDEC. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
