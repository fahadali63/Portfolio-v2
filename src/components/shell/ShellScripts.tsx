"use client";
import { useEffect } from "react";

/**
 * Small page behaviours:
 * - phones: [data-nav-toggle] opens/closes the rail; Escape or a link click closes it
 * - panels fade up the first time they scroll into view (skipped for reduced motion)
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
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && root.dataset.nav === "open" && setNav(false);
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);

    const onToggle = (e: Event) => {
      const d = e.target as HTMLDetailsElement;
      if (!d.open) return;
      d.closest("[data-accordion]")?.querySelectorAll<HTMLDetailsElement>("details[open]").forEach((o) => o !== d && o.parentElement === d.parentElement && (o.open = false));
    };
    document.addEventListener("toggle", onToggle, true);

    const targets = Array.from(document.querySelectorAll<HTMLElement>(".main > *, .main .reveal, .footer"));
    let io: IntersectionObserver | undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-in"));
    } else {
      io = new IntersectionObserver(
        (entries) =>
          entries.forEach((en) => {
            if (!en.isIntersecting) return;
            en.target.classList.add("is-in");
            io?.unobserve(en.target);
          }),
        { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
      );
      targets.forEach((el, i) => {
        el.style.setProperty("--reveal-delay", `${Math.min(i, 4) * 60}ms`);
        io!.observe(el);
      });
    }
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("toggle", onToggle, true);
      io?.disconnect();
    };
  }, []);
  return null;
}
