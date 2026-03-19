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
    <main className="section-shell flex min-h-screen items-center py-10">
      <div className="grid w-full gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="surface relative overflow-hidden rounded-[2rem] p-8 sm:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,222,170,0.24),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(204,154,57,0.18),transparent_36%)]" />
          <div className="relative">
            <div className="flex items-center justify-between gap-3">
              <Link href="/" className="brand-mark">
                SmartIQ
              </Link>
              <Link href="/courses" className="pill">
                Courses
              </Link>
            </div>

            <div className="mt-10 space-y-5 text-center lg:text-left">
              <p className="section-label">Smooth Demo Login</p>
              <h1 className="text-4xl font-semibold tracking-[-0.05em] text-[var(--color-heading)] sm:text-5xl">
                Choose a role clearly, review the credentials, and enter the right dashboard.
              </h1>
              <p className="max-w-xl text-sm leading-7 text-[var(--color-muted)]">
                This login is intentionally local-first. It uses demo credentials
                and a session cookie so every frontend flow can be tested now and
                replaced with Firebase later without losing the UI work.
              </p>
            </div>

            <div className="mt-10 grid gap-4">
              <LiveClock label="Login Desk Clock" />
              {demoCredentials.map((item) => (
                <div key={item.role} className="surface-soft rounded-3xl p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-strong)]">
                        {item.role}
                      </p>
                      <p className="mt-2 text-base font-semibold text-[var(--color-heading)]">
                        {item.email}
                      </p>
                      <p className="mt-1 text-sm text-[var(--color-muted)]">
                        Password: {item.password}
                      </p>
                    </div>
                    <span className="pill">{item.label}</span>
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
