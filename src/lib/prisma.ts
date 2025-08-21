// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

declare global {
  // Évite de recréer le client à chaque HMR en dev
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
