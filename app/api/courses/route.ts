import { NextResponse } from "next/server";

import { getSessionUser } from "@/lib/auth";
import { createCourse, getCoursesForRole } from "@/lib/data-store";
import { sanitizeTextInput, sanitizeTextareaInput } from "@/lib/validation";

export async function GET() {
  const session = await getSessionUser();
  const role = session?.role ?? "guest";

  return NextResponse.json({
    role,
    courses: await getCoursesForRole(role),
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

  const title = sanitizeTextInput(body.title, 80);
  const schedule = sanitizeTextInput(body.schedule, 50);
  const summary = sanitizeTextareaInput(body.summary, 220);

  if (!title || !schedule || !summary) {
    return NextResponse.json({ error: "Title, schedule, and summary are required." }, { status: 400 });
  }

  const draft = await createCourse({
    title,
    schedule,
    summary,
    createdBy: session.name,
  });

  return NextResponse.json({ course: draft }, { status: 201 });
}
