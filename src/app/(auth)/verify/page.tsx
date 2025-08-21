// src/app/(auth)/verify/page.tsx
import { Suspense } from "react";
import VerifyInner from "./VerifyInner";

export const dynamic = "force-dynamic"; // évite le prerender
export const revalidate = 0;

export default function VerifyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-lg">
        <Suspense
          fallback={
            <div className="bg-white border rounded-2xl p-8 shadow-sm">
              <div className="h-6 w-48 bg-gray-200 rounded mb-6" />
              <div className="space-y-3">
                <div className="h-10 w-full bg-gray-200 rounded" />
                <div className="h-10 w-56 bg-gray-200 rounded" />
              </div>
            </div>
          }
        >
          <VerifyInner />
        </Suspense>
      </div>
    </div>
  );
}
