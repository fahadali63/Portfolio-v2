import { site } from "@content/site.ts";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/Brand";
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
          <Logo height={44} />
        </a>
        <button type="button" className="icon-btn side__toggle" data-nav-toggle aria-expanded="false" aria-controls="side-body" aria-label="Menu">
          <Menu className="nav-open-icon" size={18} strokeWidth={1.5} aria-hidden="true" />
          <X className="nav-close-icon" size={18} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>

      <div className="side__body" id="side-body">
        <p className="side__status">
          <span className="status-dot" aria-hidden="true" /> {site.availabilityShort}
        </p>
        <SearchWidget />
        <nav aria-label="Main" className="side__nav">
          <SideNav />
        </nav>
        <div className="side__foot">
          <div className="side__actions">
            <MailCta block />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
