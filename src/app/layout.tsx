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
    // on force le thème clair et on évite toute surprise à l’hydratation
    <html lang="fr" className="light" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light" />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
