import { contact } from "@content/contact.ts";
import { site } from "@content/site.ts";
import { Download, Menu, X } from "lucide-react";
import { MailCta } from "@/components/MailCta";
import { SearchWidget } from "./SearchWidget";
import { SideNav } from "./SideNav";
import { ThemeToggle } from "./ThemeToggle";

/**
 * The left rail, top to bottom in the order it gets used: who this is, find anything, the drawing set by
 * career, take a résumé, get in touch. On phones it collapses to a bar and the menu button opens it.
 */
export function Sidebar() {
  return (
    <header className="side">
      <div className="side__bar">
        <a href="/" className="brand" aria-label={`${site.name}, home`}>
          <span className="brand__mark" aria-hidden="true">
            FA
          </span>
          <span className="brand__text">
            <span className="brand__name">{site.name}</span>
            <span className="brand__status">
              <span className="status-dot" aria-hidden="true" /> {site.availabilityShort}
            </span>
          </span>
        </a>
        <button type="button" className="icon-btn side__toggle" data-nav-toggle aria-expanded="false" aria-controls="side-body" aria-label="Menu">
          <Menu className="nav-open-icon" size={18} strokeWidth={1.5} aria-hidden="true" />
          <X className="nav-close-icon" size={18} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>

      <div className="side__body" id="side-body">
        <SearchWidget />
        <nav aria-label="Main" className="side__nav">
          <SideNav />
        </nav>
        <div className="side__foot">
          <p className="side__foot-label">Résumés</p>
          <ul className="side__resumes">
            {contact.resumes.map((r) => (
              <li key={r.track}>
                <a href={r.file} download={r.download} className="nav-row" data-track={r.track}>
                  <Download size={16} strokeWidth={1.5} aria-hidden="true" />
                  <span className="nav-row__label">{r.track === "planning" ? "Urban planning" : "Business development"}</span>
                  <span className="nav-row__code">PDF</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="side__actions">
            <MailCta block />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
