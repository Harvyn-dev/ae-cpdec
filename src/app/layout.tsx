// src/app/layout.tsx
import type { Metadata } from "next";
import Providers from "@/components/Providers";
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AE-CPDEC",
  description: "Association des Étudiants du CPDEC",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="light" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light" />
      </head>

      {/* min-h-screen + flex-col pour coller le footer en bas */}
      <body className="min-h-screen flex flex-col">
        <Providers>
          {/* Le contenu prend toute la hauteur restante */}
          <main className="flex-1">{children}</main>
        </Providers>

        {/* Footer toujours en bas */}
        <Footer />
      </body>
    </html>
  );
}
