import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export default async function ProfilePage() {
  const session = await getServerSession();
  const userId = (session as any)?.user?.id;
  const me = userId ? await prisma.user.findUnique({ where: { id: userId } }) : null;

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-extrabold">Mon profil</h1>
      {!me ? (
        <p>Non connecté.</p>
      ) : (
        <div className="rounded-2xl bg-white p-6 border grid sm:grid-cols-2 gap-4">
          <p><span className="font-semibold">Nom :</span> {me.lastName}</p>
          <p><span className="font-semibold">Prénom :</span> {me.firstName}</p>
          <p><span className="font-semibold">Email :</span> {me.email}</p>
          <p><span className="font-semibold">Téléphone :</span> {me.phone}</p>
          <p><span className="font-semibold">Classe :</span> {me.className}</p>
          <p><span className="font-semibold">Polo :</span> {me.poloSize ?? "—"}</p>
        </div>
      )}
    </div>
  );
}
