import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { findDemoUserById } from "@/lib/mock-data";
import type { SessionUser } from "@/lib/types";

const SESSION_COOKIE = "smartiq_session";

export async function getSessionUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE)?.value;

  if (!sessionCookie) {
    return null;
  }

  return findDemoUserById(sessionCookie);
}

export function createSessionResponse(user: SessionUser) {
  const response = NextResponse.json({ user });

  response.cookies.set({
    name: SESSION_COOKIE,
    value: user.id,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}

export function clearSessionResponse() {
  const response = NextResponse.json({ ok: true });

  response.cookies.set({
    name: SESSION_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
