import { ReactNode } from "react";
import Nav from "@/components/Nav";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
    </>
  );
}
