"use client";

import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-panel)] px-4 py-2 text-sm font-semibold text-[var(--color-heading)] shadow-[0_12px_30px_rgba(15,23,42,0.08)]"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      <span className="relative flex h-6 w-11 items-center rounded-full bg-[var(--color-background-strong)] p-1">
        <span
          className={`h-4 w-4 rounded-full bg-[var(--color-accent)] transition-transform duration-500 ease-out ${
            isDark ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </span>
      <span>{isDark ? "Dark" : "Light"}</span>
    </button>
  );
}
