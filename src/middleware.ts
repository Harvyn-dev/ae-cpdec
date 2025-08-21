import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const PUBLIC_PATHS = [
  "/login",
  "/register",
  "/api/auth",        // NextAuth callbacks
  "/favicon.ico",
];

function isPublic(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p))) return true;
  // fichiers et assets Next.js
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/assets") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/public")
  ) return true;
  // autoriser le PDF de statuts si tu veux qu'il reste public
  // sinon enlève la ligne ci-dessous
  // if (pathname === "/statuts-ae-cpdec.pdf") return true;

  return false;
}

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const token = await getToken({ req }); // lit le JWT NextAuth

  // 1) si route publique => on laisse passer
  if (isPublic(req)) {
    // bonus: si déjà connecté, éviter d'aller sur /login /register
    if (token && (url.pathname === "/login" || url.pathname === "/register")) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // 2) si pas connecté => rediriger vers /login?next=...
  if (!token) {
    url.pathname = "/login";
    url.searchParams.set("next", req.nextUrl.pathname + req.nextUrl.search);
    return NextResponse.redirect(url);
  }

  // 3) protection /admin pour PR/ADMIN uniquement
  if (url.pathname.startsWith("/admin")) {
    const role = (token as any)?.role;
    if (role !== "PR" && role !== "ADMIN") {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// on applique le middleware à tout (sauf fichiers statiques gérés plus haut)
export const config = { matcher: ["/((?!_next|.*\\..*).*)"] };
