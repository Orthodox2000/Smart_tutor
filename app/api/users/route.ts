import { NextResponse } from "next/server";

import { getSessionUser } from "@/lib/auth";
import { createUserDraft, getStudentDirectory, getUsersForAdmin } from "@/lib/mock-data";

export async function GET() {
  const session = await getSessionUser();

  if (session?.role !== "admin") {
    return NextResponse.json(
      { error: "Only admins can access user management." },
      { status: 403 },
    );
  }

  return NextResponse.json({
    users: getUsersForAdmin(),
    students: getStudentDirectory(),
  });
}

export async function POST(request: Request) {
  const session = await getSessionUser();

  if (session?.role !== "admin") {
    return NextResponse.json(
      { error: "Only admins can create new accounts." },
      { status: 403 },
    );
  }

  const body = (await request.json()) as {
    name?: string;
    email?: string;
    role?: string;
  };

  const user = createUserDraft({
    name: body.name,
    email: body.email,
    role: body.role,
  });

  return NextResponse.json({ user }, { status: 201 });
}

export async function PATCH(request: Request) {
  const session = await getSessionUser();

  if (session?.role !== "admin") {
    return NextResponse.json(
      { error: "Only admins can edit account details." },
      { status: 403 },
    );
  }

  const body = (await request.json()) as {
    id?: string;
    name?: string;
    email?: string;
    role?: string;
  };

  const updatedUser = createUserDraft({
    name: body.name,
    email: body.email,
    role: body.role,
  });

  return NextResponse.json(
    {
      user: {
        ...updatedUser,
        id: body.id ?? updatedUser.id,
        updatedAt: new Date().toISOString(),
      },
    },
    { status: 200 },
  );
}
