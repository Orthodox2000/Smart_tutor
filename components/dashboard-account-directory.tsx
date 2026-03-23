"use client";

import { useState } from "react";

import type { ManagedUser, Role } from "@/lib/types";

type DashboardAccountDirectoryProps = {
  initialUsers: ManagedUser[];
};

export function DashboardAccountDirectory({
  initialUsers,
}: DashboardAccountDirectoryProps) {
  const [users, setUsers] = useState(initialUsers);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, ManagedUser>>({});
  const [status, setStatus] = useState("");

  async function handleSave(userId: string) {
    const draft = drafts[userId];

    if (!draft) {
      return;
    }

    const response = await fetch("/api/users", {
      method: "PATCH",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draft),
    });

    if (!response.ok) {
      setStatus("Account update could not be prepared.");
      return;
    }

    const data = (await response.json()) as { user: ManagedUser };
    setUsers((current) => current.map((item) => (item.id === userId ? { ...item, ...data.user } : item)));
    setEditingUserId(null);
    setStatus("Editable account draft prepared.");
  }

  return (
    <section className="surface overflow-hidden rounded-[2rem] p-5 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="section-label">Account Directory</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-heading)]">
            All enrolled accounts
          </h2>
        </div>
        <span className="pill">{users.length} accounts</span>
      </div>

      {status ? <p className="mt-4 text-sm font-semibold text-[var(--color-heading)]">{status}</p> : null}

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {users.map((user) => {
          const currentDraft = drafts[user.id] ?? user;
          const isEditing = editingUserId === user.id;

          return (
            <div key={user.id} className="surface-soft rounded-[1.75rem] p-5">
              {isEditing ? (
                <div className="grid gap-3">
                  <input
                    value={currentDraft.name}
                    onChange={(event) =>
                      setDrafts((current) => ({
                        ...current,
                        [user.id]: { ...currentDraft, name: event.target.value.slice(0, 48) },
                      }))
                    }
                    className="surface-soft rounded-2xl px-4 py-3 text-sm text-[var(--color-heading)] outline-none"
                  />
                  <input
                    value={currentDraft.email}
                    onChange={(event) =>
                      setDrafts((current) => ({
                        ...current,
                        [user.id]: { ...currentDraft, email: event.target.value.slice(0, 60) },
                      }))
                    }
                    className="surface-soft rounded-2xl px-4 py-3 text-sm text-[var(--color-heading)] outline-none"
                  />
                  <select
                    value={currentDraft.role}
                    onChange={(event) =>
                      setDrafts((current) => ({
                        ...current,
                        [user.id]: { ...currentDraft, role: event.target.value as Role },
                      }))
                    }
                    className="surface-soft rounded-2xl px-4 py-3 text-sm text-[var(--color-heading)] outline-none"
                  >
                    <option value="guest">Guest</option>
                    <option value="student">Student</option>
                    <option value="educator">Educator</option>
                    <option value="admin">Admin</option>
                  </select>
                  <div className="flex flex-wrap gap-3">
                    <button type="button" onClick={() => handleSave(user.id)} className="action-button px-5 py-3">
                      Save Draft
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingUserId(null)}
                      className="surface rounded-full px-5 py-3 text-sm font-semibold text-[var(--color-heading)]"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="truncate text-lg font-semibold text-[var(--color-heading)]" title={user.name}>
                        {user.name}
                      </p>
                      <p className="mt-1 truncate text-sm text-[var(--color-muted)]" title={user.email}>
                        {user.email}
                      </p>
                    </div>
                    <span className="pill">{user.role}</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{user.program}</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">Status: {user.status}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingUserId(user.id);
                      setDrafts((current) => ({ ...current, [user.id]: user }));
                    }}
                    className="action-button mt-4 px-5 py-3"
                  >
                    Edit Account
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
