"use client";

import { useMemo, useState } from "react";

import { demoCredentials } from "@/lib/mock-data";

const roleDescriptions = {
  guest: "Public preview access to institute content and admissions storytelling.",
  student: "Personal learning dashboard with tests, notices, and study material.",
  educator: "Course delivery, grading, messaging, and operational teaching controls.",
  admin: "Account management, permissions, and institute-wide governance tools.",
} as const;

export function MockLoginForm() {
  const [selectedRole, setSelectedRole] = useState<(typeof demoCredentials)[number]["role"]>(
    "student",
  );
  const selectedCredential = useMemo(
    () => demoCredentials.find((item) => item.role === selectedRole) ?? demoCredentials[1],
    [selectedRole],
  );
  const [form, setForm] = useState({
    email: demoCredentials[1].email,
    password: demoCredentials[1].password,
  });
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(payload.error ?? "Login failed.");
        return;
      }

      window.location.assign("/dashboard");
    } catch {
      setError("Unable to reach the local login route.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <p className="section-label">SmartIQ Access</p>
        <h2 className="text-4xl font-semibold tracking-[-0.05em] text-[var(--color-heading)]">
          Sign in to the role-based workspace
        </h2>
        <p className="max-w-2xl text-sm leading-7 text-[var(--color-muted)]">
          The structure stays the same as our current product. What changes here is the
          visual treatment and the clarity of role selection, inspired by a cleaner
          educator-management interface.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {demoCredentials.map((credential) => {
          const isSelected = credential.role === selectedRole;

          return (
            <button
              key={credential.role}
              type="button"
              onClick={() => {
                setSelectedRole(credential.role);
                setForm({
                  email: credential.email,
                  password: credential.password,
                });
              }}
              className={`rounded-[1.75rem] border p-5 text-left ${
                isSelected
                  ? "border-[rgba(71,105,255,0.28)] bg-[linear-gradient(135deg,rgba(71,105,255,0.12),rgba(49,182,210,0.08))] shadow-[0_18px_40px_rgba(22,32,51,0.08)]"
                  : "surface-soft border-[var(--color-border)]"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-strong)]">
                  {credential.role}
                </p>
                <span className="pill">{isSelected ? "Active" : "Demo"}</span>
              </div>
              <p className="mt-3 text-base font-semibold text-[var(--color-heading)]">
                {credential.label}
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                {roleDescriptions[credential.role]}
              </p>
            </button>
          );
        })}
      </div>

      <div className="surface-soft rounded-[2rem] p-6">
        <p className="keyword-line">Selected Access</p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-2xl font-semibold text-[var(--color-heading)]">
              {selectedCredential.label}
            </p>
            <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
              {selectedCredential.email}
            </p>
          </div>
          <span className="rounded-full bg-[var(--color-highlight)] px-4 py-2 text-sm font-semibold text-[var(--color-accent)]">
            {selectedCredential.password}
          </span>
        </div>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[var(--color-heading)]">
            Email address
          </span>
          <input
            value={form.email}
            onChange={(event) =>
              setForm((current) => ({ ...current, email: event.target.value }))
            }
            className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] px-4 py-3 text-[var(--color-heading)] outline-none focus:border-[var(--color-accent)]"
            placeholder="student@smartiq.demo"
            autoComplete="email"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[var(--color-heading)]">
            Password
          </span>
          <input
            type="password"
            value={form.password}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                password: event.target.value,
              }))
            }
            className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] px-4 py-3 text-[var(--color-heading)] outline-none focus:border-[var(--color-accent)]"
            placeholder="Student@123"
            autoComplete="current-password"
          />
        </label>

        {error ? (
          <p className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-700 dark:text-rose-200">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isPending}
          className="action-button w-full justify-center px-6 py-4 text-base disabled:cursor-not-allowed disabled:opacity-75"
        >
          {isPending ? "Opening workspace..." : `Continue as ${selectedCredential.label}`}
        </button>
      </form>
    </div>
  );
}
