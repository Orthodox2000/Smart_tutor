import { redirect } from "next/navigation";

import { DashboardShell } from "@/components/dashboard-shell";
import { getSessionUser } from "@/lib/auth";
import { getDashboardBundle, getStudentDirectory, getUsersForAdmin } from "@/lib/data-store";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getSessionUser();

  if (!session) {
    redirect("/login");
  }

  const dashboard = await getDashboardBundle(session?.role ?? "guest", session?.id);
  const role = session?.role ?? "guest";
  const studentDirectory =
    role === "educator" || role === "admin" ? await getStudentDirectory() : [];
  const managedUsers = role === "admin" ? await getUsersForAdmin() : [];

  const supportContact =
    role === "student"
      ? "Faculty Desk | mentor@smarttutor.local"
      : role === "educator"
        ? "Admin Desk | admin@smarttutor.local"
        : role === "admin"
          ? "Operations Line | director@smarttutor.local"
          : "Admissions Desk | hello@smarttutor.local";

  return (
    <DashboardShell
      session={session}
      role={role}
      dashboard={dashboard}
      studentDirectory={studentDirectory}
      managedUsers={managedUsers}
      supportContact={supportContact}
    />
  );
}
