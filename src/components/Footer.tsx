export default function Footer() {
    const year = new Date().getFullYear();
  
    return (
      <footer className="mt-10 border-t border-gray-200 bg-white text-[#0A2E73]">
        <div className="mx-auto max-w-6xl px-4 py-3 text-center text-xs sm:text-sm">
          © {year} AE-CPDEC – Tous droits réservés.
        </div>
      </footer>
    );
  }
  