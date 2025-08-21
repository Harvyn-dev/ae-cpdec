import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export default async function NotificationsPage() {
  const session = await getServerSession();
  const userId = (session as any)?.user?.id;
  if (!userId) return <p>Non connecté.</p>;

  const items = await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { news: true },
  });

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-extrabold">Notifications</h1>
      <ul className="grid gap-3">
        {items.map(n => (
          <li key={n.id} className="rounded-xl bg-white p-4 border">
            <p className="font-semibold">{n.news?.title ?? "Information"}</p>
            <p className="text-sm text-gray-600">{new Date(n.createdAt).toLocaleString()}</p>
            <p className="mt-1">{n.news?.body}</p>
            <p className="mt-2 text-xs">{n.isRead ? "Lu" : "Non lu"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
