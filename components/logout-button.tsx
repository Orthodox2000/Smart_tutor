"use client";

import { useState } from "react";

export function LogoutButton() {
  const [isPending, setIsPending] = useState(false);

  async function handleLogout() {
    setIsPending(true);

    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "same-origin",
      });

      window.location.assign("/");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isPending}
      className="rounded-full border border-[var(--color-border)] bg-[var(--color-panel)] px-5 py-3 text-sm font-semibold text-[var(--color-heading)]"
    >
      {isPending ? "Signing out..." : "Logout"}
    </button>
  );
}
