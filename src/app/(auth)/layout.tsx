import type React from "react"
import Image from "next/image"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="min-h-screen grid lg:grid-cols-2">
        <div className="hidden lg:flex bg-[#0A2E73] items-center justify-center p-12">
          <div className="text-center text-white">
            <Image
              src="/images/logo.png"
              alt="AE-CPDEC Logo"
              width={150}
              height={150}
              className="mx-auto mb-8 rounded-full object-cover aspect-square"
              priority
            />
            <h1 className="text-4xl font-bold mb-4">AE-CPDEC</h1>
            <p className="text-xl text-white/90 mb-6">Association des Étudiants du CPDEC</p>
            <p className="text-white/80 leading-relaxed max-w-md">
              Cultiver l'excellence, bâtir la solidarité. Rejoignez une communauté d'étudiants engagés dans la réussite
              académique et professionnelle.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center p-6 lg:p-12 bg-white">
          <div className="w-full max-w-md">
            <div className="lg:hidden text-center mb-8">
              <Image
                src="/images/logo.png"
                alt="AE-CPDEC Logo"
                width={100}
                height={100}
                className="mx-auto mb-4"
                priority
              />
              <h1 className="text-2xl font-bold text-[#0A2E73] mb-2">AE-CPDEC</h1>
              <p className="text-sm text-gray-600">Association des Étudiants du CPDEC</p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
