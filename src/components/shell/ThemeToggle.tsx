"use client";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

/** Light / dark. Follows the system until chosen, then remembers. */
export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);
  useEffect(() => setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light"), []);
  const next = theme === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      className="sq-btn"
      aria-label={`Switch to ${next} appearance`}
      title={`Switch to ${next} appearance`}
      onClick={() => {
        document.documentElement.dataset.theme = next;
        try {
          localStorage.setItem("theme", next);
        } catch {}
        setTheme(next);
      }}
    >
      {theme === "dark" ? <Moon size={18} strokeWidth={1.75} aria-hidden="true" /> : <Sun size={18} strokeWidth={1.75} aria-hidden="true" />}
    </button>
  );
}
