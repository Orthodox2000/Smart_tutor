import Link from "next/link";
import { redirect } from "next/navigation";

import { LiveClock } from "@/components/live-clock";
import { MockLoginForm } from "@/components/mock-login-form";
import { getSessionUser } from "@/lib/auth";
import { getDemoCredentials } from "@/lib/data-store";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const [session, demoCredentials] = await Promise.all([getSessionUser(), getDemoCredentials()]);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="section-shell min-h-screen pb-24 pt-6 sm:pb-10 sm:pt-10">
      <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <section className="surface order-1 rounded-[2rem] p-6 sm:p-8 xl:order-2 xl:p-10">
          <MockLoginForm credentials={demoCredentials} />
        </section>

        <section className="dashboard-sidebar relative order-2 overflow-hidden rounded-[2rem] p-6 sm:p-8 xl:order-1 xl:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(112,45,255,0.18),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(143,97,255,0.14),transparent_34%)]" />
          <div className="relative">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Link href="/" className="text-3xl font-semibold tracking-[-0.06em] text-[var(--color-heading)]">
                Smart Tutor
              </Link>
              <Link
                href="/courses"
                className="rounded-full border border-[var(--color-border)] bg-[var(--color-panel)] px-4 py-2 text-sm font-semibold text-[var(--color-heading)]"
              >
                View Courses
              </Link>
            </div>

            <div className="mt-10 max-w-xl space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-accent)]">
                Modern Learning Workspace
              </p>
              <h1 className="text-4xl font-semibold leading-tight tracking-[-0.05em] text-[var(--color-heading)] sm:text-5xl">
                One login flow, four role journeys, and a clearer academic product shell.
              </h1>
              <p className="text-sm leading-7 text-[var(--color-muted)]">
                We are keeping Smart Tutor&apos;s current student, educator, admin,
                and guest structure, while merging it into a cleaner management-style
                login experience inspired by the referenced dashboard design.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <LiveClock label="Campus Time" />
              <div className="surface-soft rounded-[1.75rem] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
                  Instant Access
                </p>
                <p className="mt-3 text-lg font-semibold text-[var(--color-heading)]">
                  Demo credentials remain active
                </p>
                <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
                  Backend auth is still intentionally mocked, but routes and role permissions
                  stay preserved so UI work can move forward safely.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
              {demoCredentials.map((item) => (
                <div
                  key={item.role}
                  className="surface-soft rounded-[1.75rem] p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
                        {item.role}
                      </p>
                      <p className="mt-2 text-base font-semibold text-[var(--color-heading)]">{item.label}</p>
                      <p className="mt-1 text-sm text-[var(--color-muted)]">{item.email}</p>
                    </div>
                    <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-panel)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-heading)]">
                      {item.password}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
