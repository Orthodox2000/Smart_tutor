import { NextResponse } from "next/server";

import { createSessionResponse } from "@/lib/auth";
import { findDemoUser } from "@/lib/mock-data";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    email?: string;
    password?: string;
  };

  const email = body.email?.trim().toLowerCase();
  const password = body.password?.trim();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required." },
      { status: 400 },
    );
  }

  const user = findDemoUser(email, password);

  if (!user) {
    return NextResponse.json(
      { error: "Invalid demo credentials." },
      { status: 401 },
    );
  }

  return createSessionResponse(user);
}
