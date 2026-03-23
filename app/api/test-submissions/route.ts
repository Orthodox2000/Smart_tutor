import { NextResponse } from "next/server";

import { getSessionUser } from "@/lib/auth";
import { createTestSubmissionDraft, getTestSubmissionsForRole } from "@/lib/mock-data";

export async function GET() {
  const session = await getSessionUser();

  if (!session) {
    return NextResponse.json(
      { error: "Login is required to access submissions." },
      { status: 401 },
    );
  }

  return NextResponse.json({
    submissions: getTestSubmissionsForRole(session.role, session.id),
  });
}

export async function POST(request: Request) {
  const session = await getSessionUser();

  if (!session || session.role !== "student") {
    return NextResponse.json(
      { error: "Only students can submit assigned tests." },
      { status: 403 },
    );
  }

  const body = (await request.json()) as {
    testId?: string;
    answers?: number[];
  };

  if (!body.testId) {
    return NextResponse.json({ error: "Test id is required." }, { status: 400 });
  }

  const result = createTestSubmissionDraft({
    testId: body.testId,
    studentId: session.id,
    studentName: session.name,
    answers: body.answers ?? [],
  });

  if (!result) {
    return NextResponse.json({ error: "Test could not be scored." }, { status: 404 });
  }

  return NextResponse.json(result, { status: 201 });
}
