// src/app/(auth)/login/page.tsx
import { Suspense } from "react"
import LoginInner from "./LoginInner"

export const dynamic = "force-dynamic" // pas de prerender statique
export const revalidate = 0

export default function LoginPage() {
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Bande visuelle gauche */}
      <div className="hidden md:flex bg-[#0A2E73] items-center justify-center p-8">
        <div className="text-center text-white">
          <div className="mb-6">
            <img
              src="/placeholder-u9qpw.png"
              alt="AE-CPDEC Logo"
              className="mx-auto w-30 h-30 bg-white/10 rounded-lg p-4"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2">AE-CPDEC</h1>
          <p className="text-lg text-blue-100">Association des Étudiants du CPDEC.</p>
        </div>
      </div>

      {/* Colonne formulaire */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Suspense
            fallback={
              <div className="bg-white border rounded-2xl p-8 shadow-sm">
                <div className="h-6 w-40 bg-gray-200 rounded mb-6" />
                <div className="space-y-3">
                  <div className="h-10 w-full bg-gray-200 rounded" />
                  <div className="h-10 w-full bg-gray-200 rounded" />
                  <div className="h-10 w-40 bg-gray-200 rounded" />
                </div>
              </div>
            }
          >
            <LoginInner />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
