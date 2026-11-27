"use client";
import { useEffect } from "react";

/**
 * Small page behaviours:
 * - phones: [data-nav-toggle] opens and closes the menu; Escape, a link or a tap outside closes it
 * - accordions in one [data-accordion] group close each other
 */
export function ShellScripts() {
  useEffect(() => {
    const root = document.documentElement;
    const setNav = (open: boolean) => {
      root.dataset.nav = open ? "open" : "closed";
      document.querySelectorAll("[data-nav-toggle]").forEach((b) => b.setAttribute("aria-expanded", String(open)));
    };
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("[data-nav-toggle]")) setNav(root.dataset.nav !== "open");
      else if (root.dataset.nav === "open" && (t.closest(".side a") || !t.closest(".side"))) setNav(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || root.dataset.nav !== "open") return;
      setNav(false);
      document.querySelector<HTMLElement>("[data-nav-toggle]")?.focus();
    };
    const onToggle = (e: Event) => {
      const d = e.target as HTMLDetailsElement;
      if (!(d instanceof HTMLDetailsElement) || !d.open) return;
      d.closest("[data-accordion]")
        ?.querySelectorAll<HTMLDetailsElement>("details[open]")
        .forEach((o) => o !== d && o.parentElement === d.parentElement && (o.open = false));
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    document.addEventListener("toggle", onToggle, true);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("toggle", onToggle, true);
    };
  }, []);
  return null;
}
