import { compare, hash } from "bcryptjs";
export const hashPassword = (p: string) => hash(p, 12);
export const verifyPassword = (p: string, h: string) => compare(p, h);
