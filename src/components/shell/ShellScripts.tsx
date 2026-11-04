"use client";
import { useEffect } from "react";

/** Phones: [data-nav-toggle] opens/closes the nav links; Escape or a link click closes them. */
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
      else if (root.dataset.nav === "open" && t.closest(".site-nav__links a")) setNav(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && root.dataset.nav === "open" && setNav(false);
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);
  return null;
}
