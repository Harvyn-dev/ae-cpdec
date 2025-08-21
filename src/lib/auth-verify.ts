import { prisma } from "./prisma";
import { verifyPassword } from "./password";

export async function verifyUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;

  if (user.lockedUntil && user.lockedUntil > new Date()) {
    throw new Error("Compte verrouillé temporairement. Réessaie plus tard.");
  }

  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) {
    const attempts = user.loginAttempts + 1;
    if (attempts >= 5) {
      await prisma.user.update({
        where: { id: user.id },
        data: { loginAttempts: 0, lockedUntil: new Date(Date.now() + 15 * 60 * 1000) }
      });
      throw new Error("Trop de tentatives. Verrou 15 min.");
    }
    await prisma.user.update({ where: { id: user.id }, data: { loginAttempts: attempts } });
    return null;
  }

  await prisma.user.update({ where: { id: user.id }, data: { loginAttempts: 0, lockedUntil: null } });
  return user;
}
