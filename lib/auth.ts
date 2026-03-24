import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { findUserById } from "@/lib/data-store";
import type { Role, SessionUser } from "@/lib/types";

export const SESSION_COOKIE = "smart_tutor_session";

export async function getSessionUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE)?.value;

  if (!sessionCookie) {
    return null;
  }

  return findUserById(sessionCookie);
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

export function hasAnyRole(
  session: SessionUser | null,
  roles: Role[],
): session is SessionUser {
  return Boolean(session && roles.includes(session.role));
}
