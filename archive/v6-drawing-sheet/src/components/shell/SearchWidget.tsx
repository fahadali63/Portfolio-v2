"use client";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { openCommandPalette } from "./CommandPalette";

/** Opens quick search. Shows the shortcut for this keyboard as keycaps. */
export function SearchWidget() {
  const [mac, setMac] = useState(false);
  useEffect(() => setMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)), []);
  return (
    <button type="button" className="search-widget" onClick={openCommandPalette} aria-haspopup="dialog" aria-keyshortcuts="Control+K Meta+K">
      <Search size={16} strokeWidth={1.5} aria-hidden="true" />
      <span className="search-widget__text">Search</span>
      <span className="search-widget__keys" aria-hidden="true">
        <kbd className="kbd">{mac ? "⌘" : "Ctrl"}</kbd>
        <kbd className="kbd">K</kbd>
      </span>
    </button>
  );
}
