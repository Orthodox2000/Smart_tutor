import { NextResponse } from "next/server";

import { getSessionUser } from "@/lib/auth";
import { createMessageDraft, getMessagesForRole } from "@/lib/mock-data";

export async function GET() {
  const session = await getSessionUser();

  if (!session) {
    return NextResponse.json(
      { error: "Login is required to read message boards." },
      { status: 401 },
    );
  }

  return NextResponse.json({
    messages: getMessagesForRole(session.role, session.id),
  });
}

export async function POST(request: Request) {
  const session = await getSessionUser();

  if (!session) {
    return NextResponse.json(
      { error: "Login is required to post messages." },
      { status: 401 },
    );
  }

  const body = (await request.json()) as {
    title?: string;
    body?: string;
    channel?: string;
  };

  const message = createMessageDraft({
    title: body.title,
    body: body.body,
    channel: body.channel,
    author: session.name,
  });

  return NextResponse.json({ message }, { status: 201 });
}
