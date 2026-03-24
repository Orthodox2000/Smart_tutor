"use client";

import { useMemo, useState } from "react";

import type { ManagedUser, Role } from "@/lib/types";

type DashboardAccountDirectoryProps = {
  initialUsers: ManagedUser[];
};

type CreateAccountForm = {
  name: string;
  email: string;
  role: Role;
  program: string;
  password: string;
  confirm: boolean;
};

export function DashboardAccountDirectory({
  initialUsers,
}: DashboardAccountDirectoryProps) {
  const [users, setUsers] = useState(initialUsers);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, ManagedUser>>({});
  const [status, setStatus] = useState("");
  const [activeTab, setActiveTab] = useState<"register" | "directory">("register");
  const [createForm, setCreateForm] = useState<CreateAccountForm>({
    name: "",
    email: "",
    role: "student",
    program: "",
    password: "Student@123",
    confirm: false,
  });

  const accountCounts = useMemo(
    () => ({
      students: users.filter((item) => item.role === "student").length,
      educators: users.filter((item) => item.role === "educator").length,
      admins: users.filter((item) => item.role === "admin").length,
    }),
    [users],
  );

  async function handleCreate() {
    const response = await fetch("/api/users", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(createForm),
    });

    const payload = (await response.json()) as { user?: ManagedUser; error?: string };

    if (!response.ok || !payload.user) {
      setStatus(payload.error ?? "New account could not be created.");
      return;
    }

    setUsers((current) => [payload.user as ManagedUser, ...current]);
    setCreateForm({
      name: "",
      email: "",
      role: "student",
      program: "",
      password: "Student@123",
      confirm: false,
    });
    setActiveTab("directory");
    setStatus("New registered account draft created.");
  }

  async function handleSave(userId: string) {
    const draft = drafts[userId];

    if (!draft) {
      return;
    }

    const response = await fetch("/api/users", {
      method: "PATCH",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: draft.id,
        name: draft.name,
        email: draft.email,
        role: draft.role,
        program: draft.program,
        status: draft.status,
        password: draft.passwordHint,
      }),
    });

    const payload = (await response.json()) as { user?: ManagedUser; error?: string };

    if (!response.ok || !payload.user) {
      setStatus(payload.error ?? "Account update could not be prepared.");
      return;
    }

    setUsers((current) => current.map((item) => (item.id === userId ? { ...item, ...payload.user } : item)));
    setEditingUserId(null);
    setStatus("Editable account draft prepared.");
  }

  return (
    <section className="surface max-w-full overflow-hidden rounded-[2rem] p-5 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="section-label">Account Control</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-heading)]">
            Register and manage people
          </h2>
        </div>
        <span className="pill">{users.length} accounts</span>
      </div>

      {status ? <p className="mt-4 text-sm font-semibold text-[var(--color-heading)]">{status}</p> : null}

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setActiveTab("register")}
          className={`rounded-full px-5 py-3 text-sm font-semibold ${
            activeTab === "register"
              ? "bg-[var(--color-highlight)] text-[var(--color-accent)]"
              : "surface text-[var(--color-heading)]"
          }`}
        >
          Register Account
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("directory")}
          className={`rounded-full px-5 py-3 text-sm font-semibold ${
            activeTab === "directory"
              ? "bg-[var(--color-highlight)] text-[var(--color-accent)]"
              : "surface text-[var(--color-heading)]"
          }`}
        >
          Registered Directory
        </button>
      </div>

      {activeTab === "register" ? (
        <div className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="surface-soft rounded-[1.75rem] p-5">
            <p className="text-sm font-semibold text-[var(--color-heading)]">
              Add a new registered person
            </p>
            <div className="mt-4 grid gap-3">
              <input
                value={createForm.name}
                onChange={(event) =>
                  setCreateForm((current) => ({ ...current, name: event.target.value.slice(0, 48) }))
                }
                placeholder="Full name"
                className="surface-soft rounded-2xl px-4 py-3 text-sm text-[var(--color-heading)] outline-none"
              />
              <input
                value={createForm.email}
                onChange={(event) =>
                  setCreateForm((current) => ({ ...current, email: event.target.value.slice(0, 60) }))
                }
                placeholder="Email address"
                className="surface-soft rounded-2xl px-4 py-3 text-sm text-[var(--color-heading)] outline-none"
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <select
                  value={createForm.role}
                  onChange={(event) =>
                    setCreateForm((current) => ({
                      ...current,
                      role: event.target.value as Role,
                      password:
                        event.target.value === "admin"
                          ? "Admin@123"
                          : event.target.value === "educator"
                            ? "Educator@123"
                            : event.target.value === "student"
                              ? "Student@123"
                              : "Guest@123",
                    }))
                  }
                  className="surface-soft rounded-2xl px-4 py-3 text-sm text-[var(--color-heading)] outline-none"
                >
                  <option value="student">Student</option>
                  <option value="educator">Faculty</option>
                  <option value="admin">Admin</option>
                </select>
                <input
                  value={createForm.program}
                  onChange={(event) =>
                    setCreateForm((current) => ({ ...current, program: event.target.value.slice(0, 60) }))
                  }
                  placeholder="Program / responsibility"
                  className="surface-soft rounded-2xl px-4 py-3 text-sm text-[var(--color-heading)] outline-none"
                />
              </div>
              <input
                value={createForm.password}
                onChange={(event) =>
                  setCreateForm((current) => ({ ...current, password: event.target.value.slice(0, 24) }))
                }
                placeholder="Temporary password"
                className="surface-soft rounded-2xl px-4 py-3 text-sm text-[var(--color-heading)] outline-none"
              />
              <label className="surface rounded-2xl px-4 py-3 text-sm font-semibold text-[var(--color-heading)]">
                <input
                  type="checkbox"
                  checked={createForm.confirm}
                  onChange={(event) =>
                    setCreateForm((current) => ({ ...current, confirm: event.target.checked }))
                  }
                  className="mr-3"
                />
                Confirm and finalize this new entry
              </label>
              <button type="button" onClick={handleCreate} className="action-button px-6 py-4">
                Add Registered Account
              </button>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="surface-soft rounded-[1.75rem] p-5">
              <p className="text-sm font-semibold text-[var(--color-heading)]">Current registered mix</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="surface rounded-3xl p-4 text-center">
                  <p className="text-2xl font-semibold text-[var(--color-heading)]">{accountCounts.students}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">Students</p>
                </div>
                <div className="surface rounded-3xl p-4 text-center">
                  <p className="text-2xl font-semibold text-[var(--color-heading)]">{accountCounts.educators}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">Faculty</p>
                </div>
                <div className="surface rounded-3xl p-4 text-center">
                  <p className="text-2xl font-semibold text-[var(--color-heading)]">{accountCounts.admins}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-muted)]">Admins</p>
                </div>
              </div>
            </div>

            <div className="surface-soft rounded-[1.75rem] p-5">
              <p className="text-sm font-semibold text-[var(--color-heading)]">Creation checklist</p>
              <div className="mt-4 grid gap-3">
                <div className="surface rounded-3xl p-4 text-sm leading-6 text-[var(--color-muted)]">
                  Only admin can create new registered students, faculty, or admins.
                </div>
                <div className="surface rounded-3xl p-4 text-sm leading-6 text-[var(--color-muted)]">
                  Each new entry requires confirmation before the API accepts it.
                </div>
                <div className="surface rounded-3xl p-4 text-sm leading-6 text-[var(--color-muted)]">
                  Temporary password and program/responsibility are both included in the draft payload.
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
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
                    <div className="grid gap-3 sm:grid-cols-2">
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
                      <input
                        value={currentDraft.program}
                        onChange={(event) =>
                          setDrafts((current) => ({
                            ...current,
                            [user.id]: { ...currentDraft, program: event.target.value.slice(0, 60) },
                          }))
                        }
                        className="surface-soft rounded-2xl px-4 py-3 text-sm text-[var(--color-heading)] outline-none"
                        placeholder="Program"
                      />
                    </div>
                    <input
                      value={currentDraft.passwordHint ?? ""}
                      onChange={(event) =>
                        setDrafts((current) => ({
                          ...current,
                          [user.id]: { ...currentDraft, passwordHint: event.target.value.slice(0, 24) },
                        }))
                      }
                      className="surface-soft rounded-2xl px-4 py-3 text-sm text-[var(--color-heading)] outline-none"
                      placeholder="Password"
                    />
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
                    <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">
                      Password: {user.passwordHint ?? "Temporary password hidden"}
                    </p>
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
      )}
    </section>
  );
}
