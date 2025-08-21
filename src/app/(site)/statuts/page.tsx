export default function StatutsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
      {/* Titre */}
      <h1 className="text-3xl font-bold text-[#0A2E73]">Statuts & Règlement intérieur</h1>

      {/* Boutons */}
      <div className="flex gap-4">
        <a
          href="/statuts-ae-cpdec.pdf"
          download
          className="rounded-lg bg-[#0A2E73] text-white px-6 py-3 font-semibold hover:bg-[#08306b] transition"
        >
          📥 Télécharger le PDF
        </a>
        <a
          href="/statuts-ae-cpdec.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-[#0A2E73] text-[#0A2E73] px-6 py-3 font-semibold hover:bg-[#0A2E73] hover:text-white transition"
        >
          🔍 Ouvrir dans un onglet
        </a>
      </div>
    </div>
  );
}
