"use client";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { nav } from "./nav";

const clean = (p: string) => p.replace(/\/$/, "").replace(/\.html$/, "") || "/";

/** Top-level pages plus two dropdown groups. Groups are native <details>, so they work without JavaScript. */
export function NavLinks() {
  const path = clean(usePathname() || "/");
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const groups = Array.from(ref.current?.querySelectorAll<HTMLDetailsElement>("details") ?? []);
    const closeAll = (except?: HTMLDetailsElement) => groups.forEach((g) => g !== except && (g.open = false));
    const onToggle = (e: Event) => {
      const g = e.target as HTMLDetailsElement;
      if (g.open) closeAll(g);
    };
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) closeAll();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    groups.forEach((g) => g.addEventListener("toggle", onToggle));
    document.addEventListener("click", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      groups.forEach((g) => g.removeEventListener("toggle", onToggle));
      document.removeEventListener("click", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <ul className="site-nav__links" id="site-links" ref={ref}>
      {nav.map((item) => {
        if ("children" in item) {
          const active = item.children.some((c) => c.href === path);
          return (
            <li key={item.label} className="nav-group">
              <details>
                <summary className={active ? "is-active" : undefined}>
                  {item.label}
                  <ChevronDown size={14} strokeWidth={2} aria-hidden="true" />
                </summary>
                <ul className="nav-group__menu">
                  {item.children.map((c) => (
                    <li key={c.href}>
                      <a href={c.href} aria-current={c.href === path ? "page" : undefined}>
                        {c.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          );
        }
        return (
          <li key={item.href}>
            <a href={item.href} aria-current={item.href === path ? "page" : undefined}>
              {item.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
