import { contact } from "@content/contact.ts";
import { Mail, Menu, X } from "lucide-react";
import { NavLinks } from "./NavLinks";
import { ThemeToggle } from "./ThemeToggle";

/** Nav pill: name · pages (two with sub-pages) · appearance · Get in touch. Phones: a menu button opens the links. */
export function SiteNav() {
  return (
    <header className="site-nav-wrap">
      <nav className="site-nav" aria-label="Main">
        <a href="/" className="brand">
          <span className="brand__mark" aria-hidden="true">
            fa.
          </span>
          <span className="brand__name">Fahad Ali</span>
        </a>
        <NavLinks />
        <div className="site-nav__end">
          <ThemeToggle />
          <a href="/contact" className="btn btn--accent">
            <Mail size={16} strokeWidth={1.75} aria-hidden="true" />
            <span className="hide-sm">Get in touch</span>
            <span className="visually-hidden show-sm-inline">Get in touch</span>
          </a>
          <button type="button" className="sq-btn show-md" data-nav-toggle aria-expanded="false" aria-controls="site-links" aria-label="Menu">
            <Menu className="nav-open-icon" size={18} strokeWidth={1.75} aria-hidden="true" />
            <X className="nav-close-icon" size={18} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
      </nav>
      <p className="visually-hidden">
        Contact: <a href={`mailto:${contact.email}`}>{contact.email}</a>
      </p>
    </header>
  );
}
