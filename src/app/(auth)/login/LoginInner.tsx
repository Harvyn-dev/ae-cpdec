"use client"

import type React from "react"

import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useState } from "react"

export default function LoginInner() {
  const router = useRouter()
  const q = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    const fd = new FormData(e.currentTarget)
    const email = String(fd.get("email") || "")
    const password = String(fd.get("password") || "")
    const callbackUrl = q.get("next") || "/"

    setLoading(true)
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl,
    })
    setLoading(false)

    if (res?.ok) router.push(callbackUrl)
    else setError(res?.error || "Email ou mot de passe incorrect")
  }

  return (
    <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold mb-2 text-[#0A2E73]">Se connecter</h1>
        <p className="text-gray-600">Accédez à votre espace AE-CPDEC</p>
      </div>

      {q.get("registered") && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
          <p className="text-sm text-green-700">✓ Compte créé avec succès. Vous pouvez vous connecter.</p>
        </div>
      )}

      <form className="space-y-6" onSubmit={onSubmit} autoComplete="on">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            className="input-clean"
            placeholder="votre@email.com"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Mot de passe</label>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            className="input-clean"
            placeholder="••••••••"
            required
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <button
          disabled={loading}
          className="w-full bg-[#0A2E73] hover:bg-[#0A2E73]/90 text-white font-medium rounded-lg py-3 px-4 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <Link
            href="/register"
            className="text-[#0A2E73] hover:text-[#E9C823] font-medium transition-colors duration-200"
          >
            Créer un compte
          </Link>
          <Link
            href="/forgot"
            className="text-[#0A2E73] hover:text-[#E9C823] font-medium transition-colors duration-200"
          >
            Mot de passe oublié ?
          </Link>
        </div>
      </div>

      <style jsx>{`
        .input-clean {
          width: 100%;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          padding: 0.75rem;
          background: #fff;
          color: #111827;
          transition: border-color 0.2s ease;
          font-size: 0.95rem;
        }
        .input-clean:focus {
          outline: none;
          border-color: #0A2E73;
        }
        .input-clean::placeholder {
          color: #9ca3af;
        }
      `}</style>
    </div>
  )
}
