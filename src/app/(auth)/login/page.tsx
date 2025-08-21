// src/app/(auth)/login/page.tsx
import { Suspense } from "react";
import LoginInner from "./LoginInner";

export const dynamic = "force-dynamic"; // pas de prerender statique
export const revalidate = 0;

export default function LoginPage() {
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="hidden md:block bg-[#0A2E73]" />
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Suspense
            fallback={
              <div className="bg-white border rounded-2xl p-8 shadow-sm">
                <div className="h-6 w-40 bg-gray-200 rounded mb-6" />
                <div className="space-y-3">
                  <div className="h-10 w-full bg-gray-200 rounded" />
                  <div className="h-10 w-full bg-gray-200 rounded" />
                  <div className="h-10 w-40 bg-gray-200 rounded" />
                </div>
              </div>
            }
          >
            <LoginInner />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
