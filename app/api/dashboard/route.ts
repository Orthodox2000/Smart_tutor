import { NextResponse } from "next/server";

import { getSessionUser } from "@/lib/auth";
import { getDashboardBundle } from "@/lib/mock-data";

export async function GET() {
  const session = await getSessionUser();
  const data = getDashboardBundle(session?.role ?? "guest", session?.id);

  return NextResponse.json({
    user: session,
    dashboard: data,
  });
}
