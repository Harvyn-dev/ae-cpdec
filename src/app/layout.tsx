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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="min-h-dvh flex flex-col">
        <Providers>
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
