import Link from "next/link";

import { LiveClock } from "@/components/live-clock";
import { LogoutButton } from "@/components/logout-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { getSessionUser } from "@/lib/auth";
import { getDashboardBundle } from "@/lib/mock-data";

export default async function DashboardPage() {
  const session = await getSessionUser();
  const dashboard = getDashboardBundle(session?.role ?? "guest", session?.id);
  const roleLabel = session?.role ?? "guest";

  return (
    <main className="section-shell min-h-screen pb-10 pt-8">
      <header className="surface graph-paper rounded-[2rem] p-5 sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Link href="/" className="brand-mark">
                SmartIQ
              </Link>
              <span className="pill">{dashboard.roleLabel}</span>
            </div>
            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[var(--color-heading)] sm:text-4xl">
              {dashboard.heroTitle}
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--color-muted)]">
              {dashboard.heroDescription}
            </p>
          </div>

          <div className="flex items-center gap-3 self-start">
            <LiveClock label="Dashboard Clock" className="hidden lg:block lg:min-w-[220px]" />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboard.stats.map((item) => (
          <article key={item.label} className="surface rounded-[1.75rem] p-5">
            <p className="text-sm uppercase tracking-[0.22em] text-[var(--color-muted)]">
              {item.label}
            </p>
            <p className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[var(--color-heading)]">
              {item.value}
            </p>
            <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
              {item.detail}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        <article className="surface rounded-[2rem] p-6">
          <p className="section-label">Logged In User</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-heading)]">
            {session ? session.name : "Guest visitor"}
          </h2>
          <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
            {session ? session.email : "No authenticated account is active right now."}
          </p>
          <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
            Access level: {dashboard.roleLabel}
          </p>
          <div className="mt-5">
            {session ? <LogoutButton /> : <Link href="/login" className="action-button px-5 py-3">Login</Link>}
          </div>
        </article>

        <article className="surface rounded-[2rem] p-6">
          <p className="section-label">Role View</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-heading)]">
            {roleLabel === "student"
              ? "Student dashboard"
              : roleLabel === "educator"
                ? "Educator dashboard"
                : roleLabel === "admin"
                  ? "Admin dashboard"
                  : "Guest preview dashboard"}
          </h2>
          <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
            Each role sees different content, permissions, and actions after login.
          </p>
        </article>

        <article className="surface rounded-[2rem] p-6">
          <p className="section-label">Today</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-heading)]">
            Recommended next step
          </h2>
          <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
            {roleLabel === "student"
              ? "Review tests, open your materials, and check new faculty messages."
              : roleLabel === "educator"
                ? "Issue the next test, review pending grading, and update batch notices."
                : roleLabel === "admin"
                  ? "Check approvals, manage accounts, and validate role access requests."
                  : "Explore programs and sign in with any demo role for a full workflow preview."}
          </p>
        </article>

        <article className="surface rounded-[2rem] p-6">
          <p className="section-label">Support Contact</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-heading)]">
            {roleLabel === "student"
              ? "Contact faculty"
              : roleLabel === "educator"
                ? "Contact admin"
                : roleLabel === "admin"
                  ? "Leadership support"
                  : "Admissions help"}
          </h2>
          <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
            {roleLabel === "student"
              ? "Faculty desk: Amit Deshmukh | mentor@smartiqacademy.local | +91 98765 43210"
              : roleLabel === "educator"
                ? "Admin desk: Nisha Kulkarni | admin@smartiqacademy.local | +91 98765 43210"
                : roleLabel === "admin"
                  ? "Operations line: director@smartiqacademy.local | +91 98765 43210"
                  : "Admissions desk: hello@smartiqacademy.local | +91 98765 43210"}
          </p>
        </article>
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <article className="surface rounded-[2rem] p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="section-label">Priority Board</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[var(--color-heading)]">
                {dashboard.primaryPanel.title}
              </h2>
            </div>
            <span className="pill">{dashboard.primaryPanel.badge}</span>
          </div>

          <div className="mt-6 grid gap-4">
            {dashboard.primaryPanel.items.map((item) => (
              <div key={item.title} className="surface-soft rounded-3xl p-5">
                <div className="flex items-start justify-between gap-4">
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

        <article className="surface rounded-[2rem] p-6">
          <p className="section-label">Role Permissions</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[var(--color-heading)]">
            What this role can do right now
          </h2>

          <div className="mt-6 space-y-4">
            {dashboard.permissions.map((group) => (
              <div key={group.title} className="surface-soft rounded-3xl p-5">
                <p className="text-base font-semibold text-[var(--color-heading)]">
                  {group.title}
                </p>
                <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                  {group.description}
                </p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <article className="surface rounded-[2rem] p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="section-label">Courses</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[var(--color-heading)]">
                Learning and management tracks
              </h2>
            </div>
            <span className="pill">{dashboard.courses.length} tracks</span>
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

        <article className="surface rounded-[2rem] p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="section-label">Tests And Messages</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[var(--color-heading)]">
                Operational flow for daily activity
              </h2>
            </div>
            <span className="pill">{dashboard.tests.length} items</span>
          </div>

          <div className="mt-6 grid gap-4">
            {dashboard.tests.map((test) => (
              <div key={test.title} className="surface-soft rounded-3xl p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-[var(--color-heading)]">
                      {test.title}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                      {test.summary}
                    </p>
                  </div>
                  <span className="pill">{test.status}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-3xl border border-dashed border-[var(--color-border)] p-5 text-sm leading-7 text-[var(--color-muted)]">
            Local APIs available: <code>/api/auth/session</code>, <code>/api/dashboard</code>,{" "}
            <code>/api/courses</code>, <code>/api/messages</code>, <code>/api/tests</code>,{" "}
            <code>/api/users</code>, and <code>/api/institute</code>.
          </div>
        </article>
      </section>

      <section className="mt-6">
        <article className="surface rounded-[2rem] p-6">
          <p className="section-label">Messages</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[var(--color-heading)]">
            Communication board
          </h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {dashboard.messages.map((message) => (
              <div key={message.title} className="surface-soft rounded-3xl p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-base font-semibold text-[var(--color-heading)]">
                    {message.title}
                  </p>
                  <span className="pill">{message.channel}</span>
                </div>
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
                  {message.body}
                </p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
