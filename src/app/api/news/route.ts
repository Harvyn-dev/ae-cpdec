// src/app/api/news/route.ts
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

async function sendEmail(to: string[], subject: string, html: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !to.length) return { skipped: true };

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "AE-CPDEC <no-reply@ae-cpdec.org>",
      to,
      subject,
      html,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    console.error("Resend error:", err);
  }
  return { ok: res.ok };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, body: content, kind, startsAt } = body as {
      title: string;
      body?: string;
      kind: string;
      startsAt?: string | null;
    };

    if (!title || !kind) {
      return new Response(JSON.stringify({ error: "title et kind requis" }), { status: 400 });
    }

    // 1) crée l’actualité
    const news = await prisma.news.create({
      data: {
        title,
        body: content ?? "",
        kind,
        startsAt: startsAt ? new Date(startsAt) : null,
      },
    });

    // 2) récupère les abonnés
    const subs = await prisma.user.findMany({
      where: { subscribed: true },
      select: { id: true, email: true },
    });

    // 3) notifications internes (non lues)
    if (subs.length) {
      await prisma.notification.createMany({
        data: subs.map((u) => ({
          userId: u.id,
          title: "Nouvelle actualité",
          body: news.title,
          newsId: news.id,
          readAt: null,
          createdAt: new Date(),
        })),
        skipDuplicates: true,
      });
    }

    // 4) emails
    const to = subs.map((s) => s.email).filter(Boolean) as string[];
    if (to.length) {
      await sendEmail(
        to,
        `Nouvelle actualité • ${news.title}`,
        `
          <div style="font-family:system-ui,Segoe UI,Roboto,Arial">
            <h2>Nouvelle actualité</h2>
            <p><strong>${news.title}</strong></p>
            ${news.body ? `<p>${news.body.replace(/\n/g, "<br/>")}</p>` : ""}
            <p style="margin-top:16px">
              <a href="${process.env.NEXTAUTH_URL ?? "http://localhost:3000"}/news?id=${news.id}">
                Lire sur le site
              </a>
            </p>
          </div>
        `
      );
    }

    return Response.json({ ok: true, newsId: news.id });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "server_error" }), { status: 500 });
  }
}
