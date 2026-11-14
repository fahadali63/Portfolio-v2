"use client";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { openCommandPalette } from "./CommandPalette";

/** A small tile, not a text field: it opens the quick-actions modal and shows the shortcut for this keyboard. */
export function SearchWidget() {
  const [mac, setMac] = useState(false);
  useEffect(() => setMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)), []);
  return (
    <button type="button" className="search-widget" onClick={openCommandPalette} aria-haspopup="dialog" aria-keyshortcuts="Control+K Meta+K">
      <span className="search-widget__icon" aria-hidden="true">
        <Search size={18} strokeWidth={1.75} />
      </span>
      <span className="search-widget__text">
        <span className="search-widget__title">Quick search</span>
        <span className="search-widget__sub">Pages, projects, actions</span>
      </span>
      <span className="search-widget__keys" aria-hidden="true">
        <kbd className="kbd">{mac ? "⌘" : "Ctrl"}</kbd>
        <kbd className="kbd">K</kbd>
      </span>
    </button>
  );
}
