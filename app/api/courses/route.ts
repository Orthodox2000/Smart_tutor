import { NextResponse } from "next/server";

import { getSessionUser } from "@/lib/auth";
import { createCourseDraft, getCoursesForRole } from "@/lib/mock-data";

export async function GET() {
  const session = await getSessionUser();
  const role = session?.role ?? "guest";

  return NextResponse.json({
    role,
    courses: getCoursesForRole(role),
  });
}

export async function POST(request: Request) {
  const session = await getSessionUser();

  if (!session || !["educator", "admin"].includes(session.role)) {
    return NextResponse.json(
      { error: "Only educators and admins can create courses." },
      { status: 403 },
    );
  }

  const body = (await request.json()) as {
    title?: string;
    schedule?: string;
    summary?: string;
  };

  const draft = createCourseDraft({
    title: body.title,
    schedule: body.schedule,
    summary: body.summary,
    createdBy: session.name,
  });

  return NextResponse.json({ course: draft }, { status: 201 });
}
