import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createHash } from "crypto";

function sha256Hex(s: string) {
  return createHash("sha256").update(s).digest("hex");
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    const uid = searchParams.get("uid"); // facultatif si tu veux vérifier que ça correspond

    if (!token) {
      return NextResponse.json({ message: "Token manquant" }, { status: 400 });
    }

    // 1) On hash le token reçu
    const tokenHash = sha256Hex(token);

    // 2) On récupère l’enregistrement par le champ unique tokenHash
    const record = await prisma.emailVerificationToken.findUnique({
      where: { tokenHash },
      include: { user: true },
    });

    // 3) Vérifs de base
    if (!record) {
      return NextResponse.json({ message: "Lien invalide ou expiré" }, { status: 400 });
    }
    if (record.usedAt) {
      return NextResponse.json({ message: "Ce lien a déjà été utilisé" }, { status: 400 });
    }
    if (record.expiresAt < new Date()) {
      return NextResponse.json({ message: "Lien expiré" }, { status: 400 });
    }
    if (uid && record.userId !== uid) {
      return NextResponse.json({ message: "Lien non valide pour cet utilisateur" }, { status: 400 });
    }

    // 4) On valide l’email de l’utilisateur + on marque le token utilisé
    const now = new Date();

    await prisma.$transaction([
      prisma.user.update({
        where: { id: record.userId },
        data: { emailVerified: now },
      }),
      prisma.emailVerificationToken.update({
        where: { tokenHash },
        data: { usedAt: now },
      }),
      // Optionnel: supprimer le token après usage
      // prisma.emailVerificationToken.delete({ where: { tokenHash } }),
    ]);

    // 5) Redirection vers la page de login (ou home) avec un flag
    const base = process.env.NEXTAUTH_URL || "http://localhost:3000";
    return NextResponse.redirect(`${base}/login?verified=1`);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
