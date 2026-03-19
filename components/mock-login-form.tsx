"use client";

import { useMemo, useState } from "react";

import { demoCredentials } from "@/lib/mock-data";

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
        <p className="section-label">Workspace Access</p>
        <h2 className="text-4xl font-semibold tracking-[-0.05em] text-[var(--color-heading)]">
          Choose a role and enter the demo workspace
        </h2>
        <p className="max-w-xl text-sm leading-7 text-[var(--color-muted)]">
          Each role opens a different dashboard. The selected card below is the
          active login profile, so the journey is much clearer before you sign in.
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
                  ? "border-[var(--color-accent)] bg-[linear-gradient(135deg,rgba(204,154,57,0.14),rgba(117,174,226,0.12))] shadow-[0_16px_34px_rgba(88,78,42,0.12)]"
                  : "surface-soft border-[var(--color-border)]"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-strong)]">
                  {credential.role}
                </p>
                <span className="pill">{isSelected ? "Selected" : "Demo"}</span>
              </div>
              <p className="mt-3 text-base font-semibold text-[var(--color-heading)]">
                {credential.label}
              </p>
              <p className="mt-1 text-sm text-[var(--color-muted)]">{credential.email}</p>
            </button>
          );
        })}
      </div>

      <div className="surface-soft rounded-[2rem] p-5">
        <p className="keyword-line">Active Role</p>
        <p className="mt-2 text-2xl font-semibold text-[var(--color-heading)]">
          {selectedCredential.label}
        </p>
        <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
          Email: {selectedCredential.email}
        </p>
        <p className="text-sm leading-7 text-[var(--color-muted)]">
          Password: {selectedCredential.password}
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[var(--color-heading)]">
            Email
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
          {isPending ? "Opening Dashboard..." : `Login as ${selectedCredential.label}`}
        </button>
      </form>
    </div>
  );
}
