"use client";
import { ArrowUpRight, Copy, CornerDownLeft, Download, FileText, Mail, MessageCircle, Moon, Search, Sun } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { NavIcon } from "./NavIcon";
import type { NavIcon as IconName } from "./nav";

export type Command = {
  id: string;
  group: string;
  label: string;
  hint?: string;
  keywords?: string;
  icon?: IconName | "download" | "copy" | "external" | "theme" | "file" | "mail" | "chat";
  href?: string;
  external?: boolean;
  download?: string;
  copy?: string;
  theme?: boolean;
};

const OPEN_EVENT = "cmdk:open";
export const openCommandPalette = () => window.dispatchEvent(new Event(OPEN_EVENT));

function Icon({ name }: { name: Command["icon"] }) {
  const p = { size: 18, strokeWidth: 1.75, "aria-hidden": true } as const;
  switch (name) {
    case "download":
      return <Download {...p} />;
    case "copy":
      return <Copy {...p} />;
    case "external":
      return <ArrowUpRight {...p} />;
    case "theme":
      return <Sun {...p} />;
    case "file":
      return <FileText {...p} />;
    case "chat":
      return <MessageCircle {...p} />;
    case "mail":
    case undefined:
      return <Mail {...p} />;
    default:
      return <NavIcon name={name} />;
  }
}

/** Quick actions: Ctrl K / ⌘ K (or the search widget) opens it; type to filter, arrows to move, Enter to run. */
export function CommandPalette({ commands }: { commands: Command[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [note, setNote] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const results = useMemo(() => {
    const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!words.length) return commands;
    return commands.filter((c) => {
      const hay = `${c.label} ${c.group} ${c.hint ?? ""} ${c.keywords ?? ""}`.toLowerCase();
      return words.every((w) => hay.includes(w));
    });
  }, [commands, query]);

  const close = useCallback(() => {
    setOpen(false);
    lastFocus.current?.focus();
  }, []);

  useEffect(() => {
    const show = () => {
      lastFocus.current = document.activeElement as HTMLElement | null;
      setQuery("");
      setActive(0);
      setNote("");
      setOpen(true);
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && !e.altKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => {
          if (o) return false;
          show();
          return true;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, show);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    input.current?.focus();
    document.documentElement.dataset.cmdk = "open";
    return () => {
      delete document.documentElement.dataset.cmdk;
    };
  }, [open]);

  useEffect(() => setActive(0), [query]);
  useEffect(() => {
    list.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const run = async (c: Command | undefined) => {
    if (!c) return;
    if (c.copy) {
      try {
        await navigator.clipboard.writeText(c.copy);
        setNote(`Copied ${c.copy}`);
      } catch {
        setNote(c.copy);
      }
      return;
    }
    if (c.theme) {
      const root = document.documentElement;
      const next = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {}
      window.dispatchEvent(new Event("themechange"));
      setNote(`Switched to ${next} appearance`);
      return;
    }
    if (c.href) {
      const a = document.createElement("a");
      a.href = c.href;
      if (c.download) a.download = c.download;
      if (c.external) {
        a.target = "_blank";
        a.rel = "noopener";
      }
      document.body.appendChild(a);
      a.click();
      a.remove();
      setOpen(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(results[active]);
    } else if (e.key === "Tab") {
      e.preventDefault(); // one focus stop: the field. Arrows move through the list.
    }
  };

  if (!open) return null;

  const groups: { name: string; items: { c: Command; index: number }[] }[] = [];
  results.forEach((c, index) => {
    const g = groups.find((x) => x.name === c.group);
    if (g) g.items.push({ c, index });
    else groups.push({ name: c.group, items: [{ c, index }] });
  });

  return (
    <div className="cmdk" onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <div className="cmdk__panel" role="dialog" aria-modal="true" aria-label="Quick actions" onKeyDown={onKeyDown}>
        <div className="cmdk__field">
          <Search size={18} strokeWidth={1.75} aria-hidden="true" />
          <input
            ref={input}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, projects and actions"
            aria-label="Search pages, projects and actions"
            role="combobox"
            aria-expanded="true"
            aria-controls="cmdk-list"
            aria-activedescendant={results[active] ? `cmdk-${results[active].id}` : undefined}
            autoComplete="off"
            spellCheck={false}
          />
          <button type="button" className="kbd" onClick={close} aria-label="Close quick actions">
            Esc
          </button>
        </div>
        <div className="cmdk__list" id="cmdk-list" role="listbox" aria-label="Results" ref={list}>
          {groups.length === 0 && <p className="cmdk__empty">Nothing matches “{query}”. Try “résumé”, “portfolio” or “email”.</p>}
          {groups.map((g) => (
            <div key={g.name} role="group" aria-label={g.name}>
              <p className="cmdk__group">{g.name}</p>
              {g.items.map(({ c, index }) => (
                <div
                  key={c.id}
                  id={`cmdk-${c.id}`}
                  role="option"
                  aria-selected={index === active}
                  data-index={index}
                  className="cmdk__item"
                  onMouseMove={() => index !== active && setActive(index)}
                  onClick={() => run(c)}
                >
                  <span className="cmdk__icon">{c.theme ? <ThemeIcon /> : <Icon name={c.icon} />}</span>
                  <span className="cmdk__label">{c.label}</span>
                  {c.hint && <span className="cmdk__hint">{c.hint}</span>}
                  <CornerDownLeft size={14} strokeWidth={2} aria-hidden="true" className="cmdk__enter" />
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="cmdk__foot">
          <span aria-live="polite">{note}</span>
          <span className="cmdk__keys" aria-hidden="true">
            <span className="kbd">↑</span>
            <span className="kbd">↓</span> move
            <span className="kbd">↵</span> open
          </span>
        </div>
      </div>
    </div>
  );
}

function ThemeIcon() {
  const dark = typeof document !== "undefined" && document.documentElement.dataset.theme === "dark";
  return dark ? <Sun size={18} strokeWidth={1.75} aria-hidden="true" /> : <Moon size={18} strokeWidth={1.75} aria-hidden="true" />;
}
