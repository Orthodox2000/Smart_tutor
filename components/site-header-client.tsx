"use client";

import Link from "next/link";
import { useState } from "react";

import { LogoutButton } from "@/components/logout-button";
import { MockLoginForm } from "@/components/mock-login-form";
import { ThemeToggle } from "@/components/theme-toggle";
import type { DemoCredential, SessionUser } from "@/lib/types";

type SiteHeaderClientProps = {
  session: SessionUser | null;
  credentials: DemoCredential[];
};

function shortenSessionName(name: string) {
  return name.slice(0, 8);
}

const links = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/mock-test", label: "Mock Test" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeaderClient({ session, credentials }: SiteHeaderClientProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isQuickLoginOpen, setIsQuickLoginOpen] = useState(false);

  function closeMenu() {
    setIsMobileMenuOpen(false);
  }

  return (
    <header className="section-shell sticky top-3 z-30 pt-3 sm:top-4 sm:pt-5">
      <div className="surface shell-bar rounded-[1.75rem] px-3 py-3 sm:px-5 lg:rounded-full lg:px-5">
        <div className="flex min-h-[3.5rem] items-center justify-between gap-3 overflow-hidden">
          <Link href="/" className="brand-mark max-w-[10rem] truncate sm:max-w-none" onClick={closeMenu}>
            Smart Tutor
          </Link>

          <div className="hidden min-w-0 flex-1 items-center justify-center gap-2 lg:flex">
            <nav className="flex min-w-0 flex-wrap items-center justify-center gap-2">
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
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            {session ? (
              <div className="surface-soft min-w-[110px] rounded-full px-4 py-2 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                  Signed In
                </p>
                <p className="truncate text-sm font-semibold text-[var(--color-heading)]" title={session.name}>
                  {shortenSessionName(session.name)}
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

          <div className="flex items-center gap-2 lg:hidden">
            {!session ? (
              <button
                type="button"
                onClick={() => {
                  setIsQuickLoginOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="action-button min-h-11 px-4 py-2.5 text-sm"
              >
                Login
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((current) => !current)}
              className="mobile-menu-button inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-panel)] text-[var(--color-heading)]"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">{isMobileMenuOpen ? "Close menu" : "Open menu"}</span>
              <span className="flex flex-col items-center justify-center gap-1.5">
                <span
                  className={`block h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ${
                    isMobileMenuOpen ? "translate-y-2 rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 rounded-full bg-current transition-opacity duration-300 ${
                    isMobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ${
                    isMobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        <div
          className={`mobile-menu-panel lg:hidden ${
            isMobileMenuOpen ? "mobile-menu-panel-open" : "mobile-menu-panel-closed"
          }`}
        >
          <div className="mt-4 grid gap-3 border-t border-[var(--color-border)] pt-4">
            <nav className="grid gap-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="nav-link rounded-[1.1rem] px-4 py-3 text-sm font-semibold text-[var(--color-heading)]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="surface-soft rounded-[1.4rem] p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-[var(--color-heading)]">Theme</p>
                <ThemeToggle />
              </div>
            </div>

            {session ? (
              <>
                <div className="surface-soft rounded-[1.4rem] px-4 py-3 text-center">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">
                    Signed In
                  </p>
                  <p className="mt-1 truncate text-sm font-semibold text-[var(--color-heading)]" title={session.name}>
                    {shortenSessionName(session.name)}
                  </p>
                </div>
                <div className="grid gap-2">
                  <Link href="/dashboard" onClick={closeMenu} className="action-button justify-center px-5 py-3">
                    Dashboard
                  </Link>
                  <LogoutButton />
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>

      {!session ? (
        <div
          className={`mobile-login-overlay lg:hidden ${isQuickLoginOpen ? "mobile-login-overlay-open" : "mobile-login-overlay-closed"}`}
        >
          <div className="mobile-login-sheet surface rounded-[2rem] p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="section-label">Quick Login</p>
                <p className="mt-2 text-lg font-semibold text-[var(--color-heading)]">
                  Mobile access
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsQuickLoginOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-panel)] text-[0px] before:content-['x'] before:text-lg before:font-semibold before:leading-none before:text-[var(--color-heading)]"
                aria-label="Close login"
              >
                ×
              </button>
            </div>
            <div className="mt-5 max-h-[72dvh] overflow-y-auto pr-1">
              <MockLoginForm
                credentials={credentials}
                compact
                onSuccess={() => setIsQuickLoginOpen(false)}
              />
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
