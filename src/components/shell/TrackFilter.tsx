"use client";
import { ChevronDown, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Value = "all" | "planning" | "business";
const options: { value: Value; label: string }[] = [
  { value: "all", label: "Both careers" },
  { value: "planning", label: "Urban Planning" },
  { value: "business", label: "Business Development" },
];

/**
 * The reference's workspace switcher, given a real job: show both careers, or only one.
 * Sets <html data-filter>; CSS hides anything marked data-track for the other career.
 */
export function TrackFilter() {
  const [value, setValue] = useState<Value>("all");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const v = (document.documentElement.dataset.filter as Value) || "all";
    setValue(v);
    const onDoc = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("click", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);
  const choose = (v: Value) => {
    document.documentElement.dataset.filter = v;
    try {
      localStorage.setItem("filter", v);
    } catch {}
    setValue(v);
    setOpen(false);
  };
  const current = options.find((o) => o.value === value)!;
  return (
    <div className="dropdown" ref={ref}>
      <button type="button" className="btn btn--outline" aria-expanded={open} aria-haspopup="listbox" onClick={() => setOpen((o) => !o)}>
        <span className="hide-sm-text">{current.label}</span>
        <ChevronDown size={16} strokeWidth={1.75} aria-hidden="true" />
      </button>
      {open && (
        <ul className="dropdown__menu" role="listbox" aria-label="Show work from">
          {options.map((o) => (
            <li key={o.value} role="option" aria-selected={o.value === value}>
              <button type="button" onClick={() => choose(o.value)}>
                {o.label}
                {o.value === value && <Check size={16} strokeWidth={2} aria-hidden="true" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
