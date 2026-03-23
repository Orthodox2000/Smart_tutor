import Link from "next/link";

import { LogoutButton } from "@/components/logout-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { getSessionUser } from "@/lib/auth";

export async function SiteHeader() {
  const session = await getSessionUser();

  const links = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses" },
    { href: "/mock-test", label: "Mock Test" },
    { href: "/contact", label: "Contact" },
    { href: "/dashboard", label: session ? "Dashboard" : "Preview" },
  ];

  return (
    <header className="section-shell sticky top-4 z-30 pt-5">
      <div className="surface shell-bar rounded-[2rem] px-4 py-3 sm:px-5 lg:rounded-full">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="brand-mark whitespace-nowrap">
              SmartIQ
            </Link>
            <div className="lg:hidden">
              <ThemeToggle />
            </div>
          </div>

          <nav className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:flex lg:flex-wrap lg:items-center lg:justify-center lg:gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link rounded-full px-4 py-2 text-sm font-semibold text-[var(--color-muted)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            {session ? (
              <div className="surface-soft rounded-full px-4 py-2 text-right">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                  Signed In
                </p>
                <p className="text-sm font-semibold text-[var(--color-heading)]">
                  {session.name}
                </p>
              </div>
            ) : null}
            <ThemeToggle />
            {session ? (
              <>
                <Link href="/dashboard" className="action-button px-5 py-3">
                  Dashboard
                </Link>
                <LogoutButton />
              </>
            ) : (
              <Link href="/login" className="action-button px-5 py-3">
                Login
              </Link>
            )}
          </div>
        </div>

        {session ? (
          <div className="mt-3 flex flex-col gap-3 lg:hidden">
            <div className="surface-soft rounded-[1.5rem] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                Signed In
              </p>
              <p className="mt-1 text-sm font-semibold text-[var(--color-heading)]">
                {session.name} | {session.label}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Link href="/dashboard" className="action-button px-5 py-3">
                Dashboard
              </Link>
              <LogoutButton />
            </div>
          </div>
        ) : (
          <div className="mt-3 grid grid-cols-1 lg:hidden">
            <Link href="/login" className="action-button px-5 py-3">
              Login
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
