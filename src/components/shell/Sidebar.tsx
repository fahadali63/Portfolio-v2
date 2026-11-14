import { contact } from "@content/contact.ts";
import { site } from "@content/site.ts";
import { ChevronDown, Download, Menu, X } from "lucide-react";
import { MailCta } from "@/components/MailCta";
import { SearchWidget } from "./SearchWidget";
import { SideNav } from "./SideNav";
import { ThemeToggle } from "./ThemeToggle";

/**
 * Left rail, top to bottom in the order it gets used: who this is → find anything → browse by career →
 * take the résumé → get in touch. On phones it collapses to a bar; the menu button opens the rail as a drawer.
 */
export function Sidebar() {
  return (
    <header className="side">
      <div className="side__bar">
        <a href="/" className="brand">
          <span className="brand__mark" aria-hidden="true">
            fa.
          </span>
          <span className="brand__text">
            <span className="brand__name">{site.name}</span>
            <span className="brand__status">
              <span className="status-dot" aria-hidden="true" /> {site.availabilityShort}
            </span>
          </span>
        </a>
        <button type="button" className="icon-btn side__toggle" data-nav-toggle aria-expanded="false" aria-controls="side-body" aria-label="Menu">
          <Menu className="nav-open-icon" size={18} strokeWidth={1.75} aria-hidden="true" />
          <X className="nav-close-icon" size={18} strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>

      <div className="side__body" id="side-body">
        <SearchWidget />

        <nav aria-label="Main" className="side__nav">
          <SideNav />
        </nav>

        <div className="side__foot">
          <details className="resume-menu">
            <summary>
              <Download size={16} strokeWidth={1.75} aria-hidden="true" />
              Download résumé
              <ChevronDown size={14} strokeWidth={2} aria-hidden="true" className="resume-menu__chev" />
            </summary>
            <ul>
              {contact.resumes.map((r) => (
                <li key={r.track}>
                  <a href={r.file} download={r.download} data-track={r.track}>
                    <span className="nav-sec__dot" aria-hidden="true" />
                    {r.track === "planning" ? "Urban Planning" : "Business Development"}
                    <span className="resume-menu__type">PDF</span>
                  </a>
                </li>
              ))}
            </ul>
          </details>
          <div className="side__actions">
            <MailCta block />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
