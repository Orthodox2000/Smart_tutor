import { NextResponse } from "next/server";

import { getSessionUser } from "@/lib/auth";
import { getDashboardBundle, getStudentDirectory, getTestSubmissionsForRole, getUsersForAdmin } from "@/lib/mock-data";

export async function GET() {
  const session = await getSessionUser();
  const data = getDashboardBundle(session?.role ?? "guest", session?.id);

  return NextResponse.json({
    user: session,
    dashboard: data,
    users: session?.role === "admin" ? getUsersForAdmin() : [],
    students: session?.role && ["educator", "admin"].includes(session.role) ? getStudentDirectory() : [],
    submissions: getTestSubmissionsForRole(session?.role ?? "guest", session?.id),
  });
}
