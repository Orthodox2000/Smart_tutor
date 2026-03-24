import { NextResponse } from "next/server";

import { getMongoDatabase } from "@/lib/mongodb";

export async function GET() {
  try {
    const db = await getMongoDatabase();
    await db.command({ ping: 1 });
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    const details =
      error && typeof error === "object"
        ? {
            message: (error as any).message ?? String(error),
            code: (error as any).code,
            syscall: (error as any).syscall,
            hostname: (error as any).hostname,
          }
        : { message: String(error) };
    return NextResponse.json({ ok: false, error: details }, { status: 503 });
  }
}

