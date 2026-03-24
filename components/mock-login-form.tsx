"use client";

import { useMemo, useState } from "react";

import type { DemoCredential } from "@/lib/types";
import { sanitizeEmailInput, sanitizePasswordInput } from "@/lib/validation";

const roleDescriptions = {
  guest: "Public preview access to institute content and admissions storytelling.",
  student: "Personal learning dashboard with tests, notices, and study material.",
  educator: "Course delivery, grading, messaging, and operational teaching controls.",
  admin: "Account management, permissions, and institute-wide governance tools.",
} as const;

type MockLoginFormProps = {
  credentials: DemoCredential[];
  compact?: boolean;
  onSuccess?: () => void;
};

export function MockLoginForm({ credentials, compact = false, onSuccess }: MockLoginFormProps) {
  const fallbackCredential =
    credentials[1] ??
    credentials[0] ?? {
      role: "student" as const,
      label: "Student Workspace",
      email: "",
      password: "",
    };
  const [selectedRole, setSelectedRole] = useState<DemoCredential["role"]>(
    "student",
  );
  const selectedCredential = useMemo(
    () => credentials.find((item) => item.role === selectedRole) ?? fallbackCredential,
    [credentials, fallbackCredential, selectedRole],
  );
  const [form, setForm] = useState({
    email: fallbackCredential?.email ?? "",
    password: fallbackCredential?.password ?? "",
  });
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    setError("");

    const payload = {
      email: sanitizeEmailInput(form.email),
      password: sanitizePasswordInput(form.password),
    };

    if (!payload.email || !payload.password) {
      setError("Enter both email and password to continue.");
      setIsPending(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responsePayload = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(responsePayload.error ?? "Login failed.");
        return;
      }

      onSuccess?.();
      window.location.assign("/dashboard");
    } catch {
      setError("Unable to reach the local login route.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className={compact ? "space-y-6" : "space-y-8"}>
      <div className={compact ? "space-y-3" : "space-y-4"}>
        <p className="section-label">Smart Tutor Access</p>
        <h2
          className={`font-semibold tracking-[-0.05em] text-[var(--color-heading)] ${
            compact ? "text-2xl leading-tight sm:text-3xl" : "text-4xl"
          }`}
        >
          Sign in to the role-based workspace
        </h2>
        <p className={`max-w-2xl text-sm text-[var(--color-muted)] ${compact ? "leading-6" : "leading-7"}`}>
          {compact
            ? "Choose a role and continue with the prepared demo credentials."
            : "The structure stays the same as our current product. What changes here is the visual treatment and the clarity of role selection, inspired by a cleaner educator-management interface."}
        </p>
      </div>

      {compact ? (
        <div className="surface-soft rounded-[1.6rem] p-4">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[var(--color-heading)]">
              Demo role
            </span>
            <select
              value={selectedRole}
              onChange={(event) => {
                const nextRole = event.target.value as DemoCredential["role"];
                const nextCredential =
                  credentials.find((item) => item.role === nextRole) ?? fallbackCredential;
                setSelectedRole(nextRole);
                setForm({
                  email: nextCredential.email,
                  password: nextCredential.password,
                });
                setError("");
              }}
              className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] px-4 py-3 text-sm font-semibold text-[var(--color-heading)] outline-none"
            >
              {credentials.map((credential) => (
                <option key={credential.role} value={credential.role}>
                  {credential.label}
                </option>
              ))}
            </select>
          </label>
          <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
            {roleDescriptions[selectedCredential.role]}
          </p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {credentials.map((credential) => {
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
                  setError("");
                }}
                className={`rounded-[1.75rem] border p-5 text-left ${
                  isSelected
                    ? "border-[rgba(112,45,255,0.28)] bg-[linear-gradient(135deg,rgba(112,45,255,0.12),rgba(143,97,255,0.08))] shadow-[0_18px_40px_rgba(8,15,52,0.08)]"
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
      )}

      <div className={`surface-soft rounded-[2rem] ${compact ? "p-5" : "p-6"}`}>
        <p className="keyword-line">Selected Access</p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className={`${compact ? "text-xl" : "text-2xl"} font-semibold text-[var(--color-heading)]`}>
              {selectedCredential.label}
            </p>
            <p className={`mt-2 text-sm text-[var(--color-muted)] ${compact ? "leading-6" : "leading-7"}`}>
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
              setForm((current) => ({ ...current, email: sanitizeEmailInput(event.target.value) }))
            }
            className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-panel)] px-4 py-3 text-[var(--color-heading)] outline-none focus:border-[var(--color-accent)]"
            placeholder="student@smarttutor.demo"
            autoComplete="email"
            inputMode="email"
            autoCapitalize="none"
            autoCorrect="off"
            autoFocus={compact}
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
                password: sanitizePasswordInput(event.target.value),
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
