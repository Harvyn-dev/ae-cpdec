export default function JoinPage() {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold">Nous rejoindre</h1>
          <div className="hidden md:flex items-center gap-2 text-sm">
            <span className="px-2 py-1 rounded bg-[#0A2E73] text-white">1. Payer</span>
            <span className="px-2 py-1 rounded bg-[#E9C823] text-[#0A2E73]">2. Envoyer la preuve</span>
            <span className="px-2 py-1 rounded bg-white border">3. Choisir la taille</span>
          </div>
        </div>
  
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Infos paiement */}
          <section className="rounded-2xl bg-white p-6 border">
            <h2 className="font-bold text-lg">Frais & Moyens de paiement</h2>
            <p className="mt-2">Adhésion annuelle : <b>10 000 FCFA</b></p>
            <div className="mt-4 grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border p-4">
                <p className="font-semibold">MTN MoMo et WAVE</p>
                <p className="text-[#0A2E73]/80">05 00 52 26 26</p>
              </div>
              <div className="rounded-xl border p-4">
                <p className="font-semibold">WAVE</p>
                <p className="text-[#0A2E73]/80">01 50 67 27 09</p>
              </div>
              <div className="rounded-xl border p-4">
                <p className="font-semibold">MOOV MONEY</p>
                <p className="text-[#0A2E73]/80">01 73 99 00 41</p>
              </div>
              <div className="rounded-xl border p-4">
                <p className="font-semibold">ORANGE MONEY</p>
                <p className="text-[#0A2E73]/80">07 12 13 41 28</p>
              </div>
            </div>
            <div className="mt-4 rounded-xl bg-[#0A2E73]/5 border p-4">
              <p>Règlement en espèces ? Contact trésorier : <b>+225 01 23 45 67</b></p>
            </div>
          </section>
  
          {/* Formulaire preuve + taille */}
          <form
            action="/api/join/proof"
            method="post"
            encType="multipart/form-data"
            className="rounded-2xl bg-white p-6 border grid gap-4"
          >
            <h2 className="font-bold text-lg">Validation d’adhésion</h2>
  
            <label className="text-sm">Méthode
              <select name="method" className="mt-1 w-full border rounded-lg p-2.5" required>
                <option value="depôt">Dépôt</option>
                <option value="cash">Espèces</option>
              </select>
            </label>
  
            <label className="text-sm">Montant (min 10 000)
              <input
                type="number"
                name="amountCFA"
                min={10000}
                defaultValue={10000}
                className="mt-1 w-full border rounded-lg p-2.5"
                required
              />
            </label>
  
            <label className="text-sm">Référence du dépôt (si dépôt)
              <input name="reference" className="mt-1 w-full border rounded-lg p-2.5" />
            </label>
  
            <label className="text-sm">Capture de paiement (PNG/JPG)
              <input type="file" name="image" accept="image/png,image/jpeg" className="mt-1 w-full border rounded-lg p-2.5" />
            </label>
  
            <label className="text-sm">Taille du polo
              <select name="poloSize" className="mt-1 w-full border rounded-lg p-2.5" required>
                <option>XS</option><option>S</option><option>M</option>
                <option>L</option><option>XL</option><option>XXL</option>
              </select>
            </label>
  
            <button className="mt-2 bg-[#0A2E73] text-white rounded-lg py-2.5 font-semibold hover:brightness-110">
              Envoyer & valider
            </button>
          </form>
        </div>
      </div>
    );
  }
  