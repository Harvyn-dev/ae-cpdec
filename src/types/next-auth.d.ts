import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role?: "USER" | "ADMIN" | "PR";
  }
  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      role?: "USER" | "ADMIN" | "PR";
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: "USER" | "ADMIN" | "PR";
  }
}
