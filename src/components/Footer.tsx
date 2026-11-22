import { contact } from "@content/contact.ts";
import { site } from "@content/site.ts";
import { ArrowUp, ArrowUpRight, Download } from "lucide-react";
import { NavIcon } from "@/components/shell/NavIcon";
import { nav } from "@/components/shell/nav";
import { BrandMark } from "@/components/BrandMark";

/**
 * Footer: the same grouping as the menu, so nothing new to learn at the bottom of a page.
 * Identity → each career's pages → ways to reach him and the résumés → a quiet legal line.
 */
export function Footer() {
  const careers = nav.filter((g) => g.track);
  const reach = [
    { href: `mailto:${contact.email}`, label: contact.email },
    { href: contact.phoneHref, label: contact.phone },
    { href: contact.linkedin, label: "LinkedIn", ext: true },
    { href: contact.whatsapp, label: "WhatsApp", ext: true },
    { href: contact.instagram, label: "Instagram", ext: true },
  ];
  return (
    <footer className="footer panel">
      <div className="footer__top">
        <div className="footer__id">
          <a href="/" className="brand">
            <span className="brand__mark" aria-hidden="true">
            <BrandMark />
          </span>
            <span className="brand__text">
              <span className="brand__name">{site.name}</span>
              <span className="brand__status">{site.location}</span>
            </span>
          </a>
          <p className="footer__status">
            <span className="status-dot" aria-hidden="true" /> {site.availability}
          </p>
        </div>

        {careers.map((g) => (
          <nav key={g.id} className="footer__col" aria-label={g.label} data-track={g.track}>
            <h2 className="footer__label">
              <span className="nav-sec__dot" aria-hidden="true" /> {g.label}
            </h2>
            <ul>
              {g.items.map((i) => (
                <li key={i.href}>
                  <a href={i.href} className="footer__link">
                    <NavIcon name={i.icon} size={15} /> {i.label}
                  </a>
                </li>
              ))}
              <li>
                {contact.resumes
                  .filter((r) => r.track === g.track)
                  .map((r) => (
                    <a key={r.file} href={r.file} download={r.download} className="footer__link">
                      <Download size={15} strokeWidth={1.75} aria-hidden="true" /> Résumé (PDF)
                    </a>
                  ))}
              </li>
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
                      <ArrowUpRight size={14} strokeWidth={1.9} aria-hidden="true" />
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
        <ul className="footer__meta">
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/worked-with">Worked with</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
        <a href="#top" className="footer__top-link">
          Back to top <ArrowUp size={15} strokeWidth={2} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
