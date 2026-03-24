import { NextResponse } from "next/server";

import { getSessionUser, hasAnyRole } from "@/lib/auth";
import { createMessage, getMessagesForRole } from "@/lib/data-store";
import { sanitizeIdList, sanitizeTextInput, sanitizeTextareaInput } from "@/lib/validation";

export async function GET() {
  const session = await getSessionUser();

  if (!session) {
    return NextResponse.json(
      { error: "Login is required to read message boards." },
      { status: 401 },
    );
  }

  return NextResponse.json({
    messages: await getMessagesForRole(session.role, session.id),
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

  if (!hasAnyRole(session, ["educator", "admin"])) {
    return NextResponse.json(
      { error: "Only educators and admins can post institute messages." },
      { status: 403 },
    );
  }

  let body: {
    title?: string;
    body?: string;
    channel?: string;
    audience?: ("guest" | "student" | "educator" | "admin")[];
    userIds?: string[];
    targetMode?: "everyone" | "selected-students";
  };

  try {
    body = (await request.json()) as {
      title?: string;
      body?: string;
      channel?: string;
      audience?: ("guest" | "student" | "educator" | "admin")[];
      userIds?: string[];
      targetMode?: "everyone" | "selected-students";
    };
  } catch {
    return NextResponse.json({ error: "Invalid message payload." }, { status: 400 });
  }

  const title = sanitizeTextInput(body.title, 80);
  const content = sanitizeTextareaInput(body.body, 280);
  const channel = sanitizeTextInput(body.channel, 40);
  const userIds = sanitizeIdList(body.userIds, 50);

  if (!title || !content || !channel) {
    return NextResponse.json(
      { error: "Title, message body, and channel are required." },
      { status: 400 },
    );
  }

  if (body.targetMode === "selected-students" && !userIds.length) {
    return NextResponse.json(
      { error: "Select at least one registered student for a targeted message." },
      { status: 400 },
    );
  }

  const message = await createMessage({
    title,
    body: content,
    channel,
    author: session.name,
    audience: body.audience,
    userIds,
  });

  return NextResponse.json({ message }, { status: 201 });
}
