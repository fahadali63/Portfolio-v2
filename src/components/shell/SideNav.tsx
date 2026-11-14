"use client";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NavIcon } from "./NavIcon";
import { groupForPath, nav } from "./nav";

const clean = (p: string) => p.replace(/\/$/, "").replace(/\.html$/, "") || "/";

/**
 * Labelled groups. The two career groups fold: the one you are in is open, the other stays shut,
 * so the menu never shows more than one career's pages unless the visitor opens it.
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
          <section key={g.id} className={`nav-sec${foldable ? " nav-sec--fold" : ""}${current === g.id ? " is-current" : ""}`} data-track={g.track} data-open={isOpen}>
            {foldable ? (
              <h2 className="nav-sec__label">
                <button type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpen((o) => ({ ...o, [g.id]: !isOpen }))}>
                  <span className="nav-sec__dot" aria-hidden="true" />
                  {g.label}
                  <span className="nav-sec__count" aria-hidden="true">
                    {g.items.length}
                  </span>
                  <ChevronDown size={14} strokeWidth={2} aria-hidden="true" className="nav-sec__chev" />
                </button>
              </h2>
            ) : (
              <h2 className="nav-sec__label">
                <span>{g.label}</span>
              </h2>
            )}
            <div className="nav-sec__panel" id={panelId} hidden={!isOpen}>
              <ul>
                {g.items.map((i) => (
                  <li key={i.href}>
                    <a href={i.href} className="nav-item" aria-current={i.href === path ? "page" : undefined}>
                      <span className="nav-item__icon">
                        <NavIcon name={i.icon} />
                      </span>
                      {i.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}
    </div>
  );
}
