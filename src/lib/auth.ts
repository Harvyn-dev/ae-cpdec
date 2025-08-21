import { getServerSession } from "next-auth";
import type { NextAuthOptions } from "next-auth";

export const auth = () => getServerSession() as any; // simple pour commencer
