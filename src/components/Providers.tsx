"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  // Le SessionProvider rend useSession() disponible partout côté client
  return <SessionProvider>{children}</SessionProvider>;
}
