import { getServerSession } from "next-auth";

export async function requireRole(roles: Array<"PR"|"ADMIN">) {
  const session = await getServerSession();
  const user = (session as any)?.user;
  if (!user) throw new Error("UNAUTHORIZED");
  if (!roles.includes(user.role)) throw new Error("FORBIDDEN");
  return user as { id: string; email: string; role: "PR"|"ADMIN"|"USER" };
}
