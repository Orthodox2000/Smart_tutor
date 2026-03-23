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
    tests: getTestsForRole(session.role, session.id),
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
    assignedUserIds?: string[];
    questions?: {
      id?: string;
      prompt?: string;
      options?: string[];
      answer?: number;
    }[];
  };

  const test = createTestDraft({
    title: body.title,
    status: body.status,
    summary: body.summary,
    createdBy: session.name,
    assignedUserIds: body.assignedUserIds,
    questions: body.questions?.map((question, index) => ({
      id: question.id?.trim() || `draft-question-${index + 1}`,
      prompt: question.prompt?.trim() || `Draft question ${index + 1}`,
      options:
        question.options?.map((option) => option.trim()).filter(Boolean) ?? [
          "Option A",
          "Option B",
          "Option C",
          "Option D",
        ],
      answer: typeof question.answer === "number" ? question.answer : 0,
    })),
  });

  return NextResponse.json({ test }, { status: 201 });
}
