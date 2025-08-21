// src/app/api/statuts/download/route.ts
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

// Force Node runtime (to use fs)
export const runtime = "nodejs";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "statuts-ae-cpdec.pdf");
    const fileBuffer = await fs.readFile(filePath);

    // ✅ Web-compatible body
    const body = new Uint8Array(fileBuffer); // or: `as unknown as BodyInit` if TS still complains

    return new Response(body, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Statuts_AE-CPDEC.pdf"',
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err) {
    console.error("Statuts download error:", err);
    return NextResponse.json({ error: "Fichier introuvable" }, { status: 404 });
  }
}
