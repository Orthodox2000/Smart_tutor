import { NextResponse } from "next/server";

import { createSessionResponse } from "@/lib/auth";
import { findUserByCredentials } from "@/lib/data-store";
import { sanitizeEmailInput, sanitizePasswordInput, validateEmailFormat } from "@/lib/validation";

export async function POST(request: Request) {
  let body: {
    email?: string;
    password?: string;
  };

  try {
    body = (await request.json()) as {
      email?: string;
      password?: string;
    };
  } catch {
    return NextResponse.json({ error: "Invalid login payload." }, { status: 400 });
  }

  const email = sanitizeEmailInput(body.email);
  const password = sanitizePasswordInput(body.password);

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required." },
      { status: 400 },
    );
  }

  if (!validateEmailFormat(email)) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 },
    );
  }

  const user = await findUserByCredentials(email, password);

  if (!user) {
    return NextResponse.json(
      { error: "Invalid demo credentials." },
      { status: 401 },
    );
  }

  return createSessionResponse(user);
}
