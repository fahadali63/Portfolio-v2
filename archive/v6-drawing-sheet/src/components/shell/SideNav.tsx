"use client";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NavIcon } from "./NavIcon";
import { groupForPath, nav } from "./nav";

const clean = (p: string) => p.replace(/\/$/, "").replace(/\.html$/, "") || "/";

/**
 * Labelled groups of sheets. The two career groups fold: the one you are in is open, the other stays
 * shut until opened, so the menu never shows both careers' pages at once by default.
 */
export function SideNav() {
  const raw = clean(usePathname() || "/");
  const path = raw.startsWith("/work/") ? "/portfolio" : raw; // a project page sits under Portfolio
  const current = groupForPath(path);
  const [open, setOpen] = useState<Record<string, boolean>>({});
  useEffect(() => setOpen({}), [path]);

  return (
    <div className="side-nav" id="site-links">
      {nav.map((g) => {
        const foldable = !!g.track;
        const isOpen = !foldable || (open[g.id] ?? current === g.id);
        const panelId = `nav-${g.id}`;
        return (
          <section key={g.id} className="nav-group" data-track={g.track} data-open={isOpen}>
            {foldable ? (
              <h2 className="nav-group__label">
                <button type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpen((o) => ({ ...o, [g.id]: !isOpen }))}>
                  <span className="track-dot" aria-hidden="true" />
                  {g.label}
                  <ChevronDown size={14} strokeWidth={1.5} aria-hidden="true" className="nav-group__chev" />
                </button>
              </h2>
            ) : (
              <h2 className="nav-group__label">
                <span>{g.label}</span>
              </h2>
            )}
            <ul id={panelId} hidden={!isOpen}>
              {g.items.map((i) => (
                <li key={i.href}>
                  <a href={i.href} className="nav-row" aria-current={i.href === path ? "page" : undefined}>
                    <NavIcon name={i.icon} />
                    <span className="nav-row__label">{i.label}</span>
                    <span className="nav-row__code">{i.code}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
