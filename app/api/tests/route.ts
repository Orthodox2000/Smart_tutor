import { NextResponse } from "next/server";

import { getSessionUser } from "@/lib/auth";
import { createTestDraft, getTestsForRole } from "@/lib/mock-data";

export async function GET() {
  const session = await getSessionUser();

  if (!session) {
    return NextResponse.json(
      { error: "Login is required to access tests." },
      { status: 401 },
    );
  }

  return NextResponse.json({
    tests: getTestsForRole(session.role),
  });
}

export async function POST(request: Request) {
  const session = await getSessionUser();

  if (!session || !["educator", "admin"].includes(session.role)) {
    return NextResponse.json(
      { error: "Only educators and admins can issue tests." },
      { status: 403 },
    );
  }

  const body = (await request.json()) as {
    title?: string;
    status?: string;
    summary?: string;
  };

  const test = createTestDraft({
    title: body.title,
    status: body.status,
    summary: body.summary,
    createdBy: session.name,
  });

  return NextResponse.json({ test }, { status: 201 });
}
