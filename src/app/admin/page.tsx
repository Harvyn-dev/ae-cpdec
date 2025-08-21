"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // attendre
    if (!session || session.user.role !== "PR") {
      router.push("/"); // redirige si pas PR
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <p className="text-center mt-10">Chargement...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">
        Tableau de Bord - PR
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gestion actualités */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">📢 Gestion des actualités</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Ajouter une actualité</button>
        </div>

        {/* Gestion événements */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">📅 Événements</h2>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg">Créer un événement</button>
        </div>

        {/* Emails */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">📧 Emails</h2>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg">Envoyer un mail</button>
        </div>

        {/* Membres */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">👥 Membres</h2>
          <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg">Voir la liste</button>
        </div>
      </div>
    </div>
  );
}
