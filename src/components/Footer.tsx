import { contact } from "@content/contact.ts";
import { site } from "@content/site.ts";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/Brand";
import { nav } from "@/components/shell/nav";

/**
 * The last row of the sheet. Same grouping as the menu, each page with its sheet code, then the ways to
 * reach Fahad and the résumés. Nothing new to learn at the bottom of a page.
 */
export function Footer() {
  const reach = [
    { href: `mailto:${contact.email}`, label: contact.email },
    { href: contact.phoneHref, label: contact.phone },
    { href: contact.linkedin, label: "LinkedIn", ext: true },
    { href: contact.whatsapp, label: "WhatsApp", ext: true },
    { href: contact.instagram, label: "Instagram", ext: true },
  ];
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div className="footer__id">
          <Logo height={36} />
          <p className="footer__note">{site.availability}</p>
          <p className="footer__note footer__mono">
            {site.location}
          </p>
        </div>
        {nav.map((g) => (
          <nav key={g.id} className="footer__col" aria-label={g.label} data-track={g.track}>
            <h2 className="footer__label">
              {g.track && <span className="track-dot" aria-hidden="true" />}
              {g.label}
            </h2>
            <ul>
              {g.items.map((i) => (
                <li key={i.href}>
                  <a href={i.href} className="footer__link">
                    {i.label}
                  </a>
                </li>
              ))}
              {contact.resumes
                .filter((r) => r.track === g.track)
                .map((r) => (
                  <li key={r.file}>
                    <a href={r.file} download={r.download} className="footer__link">
                      Résumé (PDF)
                    </a>
                  </li>
                ))}
            </ul>
          </nav>
        ))}
        <div className="footer__col">
          <h2 className="footer__label">Reach me</h2>
          <ul>
            {reach.map((r) => (
              <li key={r.label}>
                <a href={r.href} className="footer__link" {...(r.ext ? { target: "_blank", rel: "noopener" } : {})}>
                  {r.label}
                  {r.ext && (
                    <>
                      <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
                      <span className="visually-hidden"> (opens in new tab)</span>
                    </>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer__base">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <a href="#top" className="footer__top">
          Back to top <ArrowUp size={14} strokeWidth={1.5} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
