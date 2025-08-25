"use client"
import { useRouter } from "next/navigation"
import type React from "react"

import { useState } from "react"
import Link from "next/link"

const CLASSES = [
  "DCG première année",
  "DCG deuxième année",
  "DCG troisième année",
  "DSCG première année",
  "DSCG deuxième année",
]

export default function RegisterPage() {
  const r = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const fd = new FormData(e.currentTarget)
    const data = Object.fromEntries(fd.entries()) as any
    if (data.password !== data.confirm) {
      setError("Les mots de passe ne correspondent pas.")
      return
    }
    setLoading(true)
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          className: data.className,
          password: data.password,
        }),
      })
      if (!res.ok) throw new Error((await res.json())?.error || "Erreur d'inscription")
      r.push("/login?registered=1")
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold mb-2 text-[#0A2E73]">Créer un compte</h1>
        <p className="text-gray-600">Rejoignez l'AE-CPDEC et accédez à tous nos services</p>
      </div>

      <form className="space-y-6" onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">Prénom</label>
            <input name="firstName" placeholder="Votre prénom" className="input-simple" required />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">Nom</label>
            <input name="lastName" placeholder="Votre nom" className="input-simple" required />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 block">Adresse email</label>
          <input type="email" name="email" placeholder="votre.email@exemple.com" className="input-simple" required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">Numéro de téléphone</label>
            <input name="phone" placeholder="Votre numéro" className="input-simple" required />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">Classe</label>
            <select name="className" className="input-simple appearance-none bg-white" required defaultValue="">
              <option value="" disabled>
                Choisir une classe
              </option>
              {CLASSES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">Mot de passe</label>
            <input type="password" name="password" placeholder="••••••••" className="input-simple" required />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">Confirmer le mot de passe</label>
            <input type="password" name="confirm" placeholder="••••••••" className="input-simple" required />
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800 font-medium">{error}</p>
          </div>
        )}

        <button
          disabled={loading}
          className="w-full bg-[#0A2E73] hover:bg-[#0A2E73]/90 text-white rounded-lg py-3 px-4 font-medium transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Création..." : "Créer mon compte"}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-600">
          Déjà membre ?{" "}
          <Link
            href="/login"
            className="text-[#0A2E73] font-medium hover:text-[#E9C823] transition-colors duration-200"
          >
            Se connecter
          </Link>
        </p>
      </div>

      <style jsx>{`
        .input-simple {
          width: 100%;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          padding: 0.75rem;
          background: #fff;
          color: #111827;
          font-size: 0.95rem;
          transition: border-color 0.2s ease;
        }
        .input-simple:focus {
          outline: none;
          border-color: #0A2E73;
        }
        .input-simple::placeholder {
          color: #9ca3af;
        }
      `}</style>
    </div>
  )
}
