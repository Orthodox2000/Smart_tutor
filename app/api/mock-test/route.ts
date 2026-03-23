import { NextResponse } from "next/server";

import { getMockQuizQuestions } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({
    questions: getMockQuizQuestions(),
  });
}
