// extrait de src/app/api/auth/[...nextauth]/route.ts
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: { email: {}, password: {} },
      async authorize(creds) {
        const email = String(creds?.email || "").toLowerCase().trim();
        const password = String(creds?.password || "");

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user?.passwordHash) return null;

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) return null;

        if (!user.emailVerified) {
          throw new Error("EMAIL_NOT_VERIFIED");
        }

        return { id: user.id, email: user.email, name: `${user.firstName} ${user.lastName}` };
      },
    }),
  ],
  pages: { signIn: "/login" },
});

export { handler as GET, handler as POST };
