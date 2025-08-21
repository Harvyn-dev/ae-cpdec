// src/app/(auth)/layout.tsx
import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Colonne visuelle gauche */}
      <div className="hidden md:flex bg-[#0A2E73] items-center justify-center p-8">
        <div className="text-center text-white">
          <div className="mb-6">
            {/* Place le fichier public/logo.png (ou change le src) */}
            <Image
              src="/images/logo.png"
              alt="AE-CPDEC"
              width={160}
              height={160}
              className="mx-auto rounded-lg p-4 bg-white/10"
              priority
            />
          </div>
          <h1 className="text-3xl font-bold mb-2">AE-CPDEC</h1>
          <p className="text-lg text-blue-100">
            Association des Étudiants du CPDEC.
          </p>
        </div>
      </div>

      {/* Colonne droite : contenu des pages du segment (auth) */}
      <div className="flex items-center justify-center p-6">{children}</div>
    </div>
  );
}
