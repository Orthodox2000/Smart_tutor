import Link from "next/link";

import { DashboardAccountDirectory } from "@/components/dashboard-account-directory";
import { DashboardMessageCenter } from "@/components/dashboard-message-center";
import { DashboardTestStudio } from "@/components/dashboard-test-studio";
import { LiveClock } from "@/components/live-clock";
import { LogoutButton } from "@/components/logout-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { getSessionUser } from "@/lib/auth";
import { getDashboardBundle, getStudentDirectory, getUsersForAdmin } from "@/lib/mock-data";

const sidebarByRole = {
  guest: ["Preview", "Programs", "Stories", "Admissions"],
  student: ["Overview", "Courses", "Tests", "Messages"],
  educator: ["Overview", "Batches", "Tests", "Messages"],
  admin: ["Overview", "Users", "Permissions", "Operations"],
} as const;

export default async function DashboardPage() {
  const session = await getSessionUser();
  const dashboard = getDashboardBundle(session?.role ?? "guest", session?.id);
  const role = session?.role ?? "guest";
  const studentDirectory = role === "educator" || role === "admin" ? getStudentDirectory() : [];
  const managedUsers = role === "admin" ? getUsersForAdmin() : [];

  const supportContact =
    role === "student"
      ? "Faculty Desk | mentor@smartiqacademy.local"
      : role === "educator"
        ? "Admin Desk | admin@smartiqacademy.local"
        : role === "admin"
          ? "Operations Line | director@smartiqacademy.local"
          : "Admissions Desk | hello@smartiqacademy.local";

  return (
    <main className="section-shell min-h-screen overflow-x-hidden pb-10 pt-8">
      <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="dashboard-sidebar overflow-hidden rounded-[2rem] p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="truncate text-3xl font-semibold tracking-[-0.06em] text-white">
              SmartIQ
            </Link>
            <ThemeToggle />
          </div>

          <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/10 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-strong)]">
              Active Session
            </p>
            <p className="mt-3 truncate text-lg font-semibold text-white sm:text-xl" title={session?.name}>
              {session ? session.name : "Guest Preview"}
            </p>
            <p className="mt-1 truncate text-sm text-white/75" title={session?.email}>
              {session ? session.email : "Public exploration mode"}
            </p>
            <span className="mt-4 inline-flex max-w-full truncate rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/90">
              {dashboard.roleLabel}
            </span>
          </div>

          <nav className="mt-8 grid gap-3">
            {sidebarByRole[role].map((item, index) => (
              <div
                key={item}
                className={`rounded-[1.25rem] px-4 py-3 text-sm font-semibold ${
                  index === 0
                    ? "bg-white text-slate-900"
                    : "border border-white/10 bg-white/10 text-slate-200"
                }`}
              >
                {item}
              </div>
            ))}
          </nav>

          <div className="mt-8 grid gap-4">
            <LiveClock label="Workspace Clock" className="bg-white/10 text-white" />
            <div className="rounded-[1.75rem] border border-white/10 bg-white/10 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-strong)]">
                Support
              </p>
              <p className="mt-3 break-words text-sm leading-6 text-white/80">{supportContact}</p>
            </div>
            {session ? <LogoutButton /> : null}
          </div>
        </aside>

        <section className="grid min-w-0 gap-6">
          <header className="surface overflow-hidden rounded-[2rem] p-5 sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0 max-w-4xl">
                <p className="section-label">Post-Login Workspace</p>
                <h1 className="mt-3 break-words text-3xl font-semibold tracking-[-0.05em] text-[var(--color-heading)] sm:text-4xl">
                  {dashboard.heroTitle}
                </h1>
                <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                  {dashboard.heroDescription}
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <LiveClock label="Campus Time" />
                <div className="surface-soft rounded-3xl p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                    API Structure
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[var(--color-heading)]">
                    Local auth, dashboard, courses, users, tests, messages, and mock test routes remain defined.
                  </p>
                </div>
              </div>
            </div>
          </header>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {dashboard.stats.map((item) => (
              <article key={item.label} className="surface overflow-hidden rounded-[1.75rem] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
                  {item.label}
                </p>
                <p className="mt-4 break-words text-3xl font-semibold tracking-[-0.05em] text-[var(--color-heading)] sm:text-4xl">
                  {item.value}
                </p>
                <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
                  {item.detail}
                </p>
              </article>
            ))}
          </section>

          <DashboardMessageCenter
            session={session}
            role={role}
            initialMessages={dashboard.messages}
          />

          <section className="grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">
            <article className="surface overflow-hidden rounded-[2rem] p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="section-label">Priority Board</p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-heading)]">
                    {dashboard.primaryPanel.title}
                  </h2>
                </div>
                <span className="pill">{dashboard.primaryPanel.badge}</span>
              </div>

              <div className="mt-6 grid gap-4">
                {dashboard.primaryPanel.items.map((item) => (
                  <div key={item.title} className="surface-soft rounded-3xl p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-lg font-semibold text-[var(--color-heading)]">
                          {item.title}
                        </p>
                        <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                          {item.description}
                        </p>
                      </div>
                      <span className="pill">{item.meta}</span>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="surface overflow-hidden rounded-[2rem] p-5 sm:p-6">
              <p className="section-label">User + Support</p>
              <div className="mt-5 grid gap-4">
                <div className="surface-soft rounded-3xl p-5">
                  <p className="truncate text-lg font-semibold text-[var(--color-heading)]" title={session?.name}>
                    {session ? session.name : "Guest Visitor"}
                  </p>
                  <p className="mt-2 truncate text-sm leading-6 text-[var(--color-muted)]" title={session?.email}>
                    {session ? session.email : "Public mode only"}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                    Access: {dashboard.roleLabel}
                  </p>
                </div>
                <div className="surface-soft rounded-3xl p-5">
                  <p className="text-lg font-semibold text-[var(--color-heading)]">
                    Contact channel
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                    {supportContact}
                  </p>
                </div>
                <div className="surface-soft rounded-3xl p-5">
                  <p className="text-lg font-semibold text-[var(--color-heading)]">
                    Permissions snapshot
                  </p>
                  <div className="mt-4 space-y-3">
                    {dashboard.permissions.map((group) => (
                      <div key={group.title}>
                        <p className="text-sm font-semibold text-[var(--color-heading)]">
                          {group.title}
                        </p>
                        <p className="mt-1 text-sm leading-7 text-[var(--color-muted)]">
                          {group.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </section>

          <DashboardTestStudio
            session={session}
            role={role}
            initialTests={dashboard.tests}
            initialSubmissions={dashboard.submissions}
            studentDirectory={studentDirectory}
          />

          {role === "admin" ? <DashboardAccountDirectory initialUsers={managedUsers} /> : null}

          <section className="grid gap-6 lg:grid-cols-2">
            <article className="surface rounded-[2rem] p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="section-label">Courses</p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-heading)]">
                    Active learning tracks
                  </h2>
                </div>
                <span className="pill">{dashboard.courses.length} items</span>
              </div>

              <div className="mt-6 grid gap-4">
                {dashboard.courses.map((course) => (
                  <div key={course.title} className="surface-soft rounded-3xl p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-lg font-semibold text-[var(--color-heading)]">
                          {course.title}
                        </p>
                        <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                          {course.summary}
                        </p>
                      </div>
                      <span className="pill">{course.schedule}</span>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="surface overflow-hidden rounded-[2rem] p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="section-label">Results</p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-heading)]">
                    Submission and publishing flow
                  </h2>
                </div>
                <span className="pill">{dashboard.submissions.length} entries</span>
              </div>

              <div className="mt-6 grid gap-4">
                {dashboard.submissions.map((submission) => (
                  <div key={submission.id} className="surface-soft rounded-3xl p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="truncate text-lg font-semibold text-[var(--color-heading)]" title={submission.studentName}>
                          {submission.studentName}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                          Score {submission.score}/{submission.total} | {submission.publishedMessageTitle}
                        </p>
                      </div>
                      <span className="pill">{submission.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </section>
        </section>
      </div>
    </main>
  );
}
