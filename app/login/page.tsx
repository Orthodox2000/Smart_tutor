import Link from "next/link";
import { redirect } from "next/navigation";

import { LiveClock } from "@/components/live-clock";
import { MockLoginForm } from "@/components/mock-login-form";
import { getSessionUser } from "@/lib/auth";
import { demoCredentials } from "@/lib/mock-data";

export default async function LoginPage() {
  const session = await getSessionUser();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="section-shell min-h-screen py-10">
      <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <section className="dashboard-sidebar relative overflow-hidden rounded-[2rem] p-8 sm:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(123,148,255,0.22),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(79,211,235,0.18),transparent_34%)]" />
          <div className="relative">
            <div className="flex items-center justify-between gap-4">
              <Link href="/" className="text-3xl font-semibold tracking-[-0.06em] text-white">
                SmartIQ
              </Link>
              <Link
                href="/courses"
                className="rounded-full border border-white/12 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90"
              >
                View Courses
              </Link>
            </div>

            <div className="mt-10 max-w-xl space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">
                Modern Educator Workspace
              </p>
              <h1 className="text-4xl font-semibold leading-tight tracking-[-0.05em] text-white sm:text-5xl">
                One login flow, four role journeys, and a clearer academic product shell.
              </h1>
              <p className="text-sm leading-7 text-slate-200">
                We are keeping SmartIQ&apos;s current student, educator, admin,
                and guest structure, while merging it into a cleaner management-style
                login experience inspired by the referenced educator platform.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <LiveClock label="Campus Time" className="bg-white/10 text-white" />
              <div className="rounded-[1.75rem] border border-white/10 bg-white/10 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
                  Instant Access
                </p>
                <p className="mt-3 text-lg font-semibold text-white">
                  Demo credentials remain active
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-200">
                  Backend auth is still intentionally mocked, but routes and role permissions
                  stay preserved so UI work can move forward safely.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4">
              {demoCredentials.map((item) => (
                <div
                  key={item.role}
                  className="rounded-[1.75rem] border border-white/10 bg-white/10 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
                        {item.role}
                      </p>
                      <p className="mt-2 text-base font-semibold text-white">{item.label}</p>
                      <p className="mt-1 text-sm text-slate-200">{item.email}</p>
                    </div>
                    <span className="rounded-full border border-white/12 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white/90">
                      {item.password}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="surface rounded-[2rem] p-8 sm:p-10">
          <MockLoginForm />
        </section>
      </div>
    </main>
  );
}
