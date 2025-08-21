// src/app/(auth)/layout.tsx
import Image from "next/image";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="hidden md:flex items-center justify-center bg-[#0A2E73] p-10">
        <div className="max-w-md text-center text-white space-y-4">
          <Image
            src="/ae-cpdec-logo.jpg"
            alt="AE-CPDEC"
            width={280}
            height={280}
            className="mx-auto rounded-xl bg-white/10 p-4"
            priority
          />
          <h1 className="text-2xl font-semibold">AE-CPDEC</h1>
          <p className="opacity-90">Association des Étudiants du CPDEC.</p>
        </div>
      </div>

      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
