import { contact } from "@content/contact.ts";
import { education } from "@content/education.ts";
import { organisations } from "@content/index.ts";
import { about, home } from "@content/pages.ts";
import { site } from "@content/site.ts";
import { ArrowRight, BriefcaseBusiness, Check, Download, Map, MessageCircle, Plus } from "lucide-react";
import { CopyButton } from "@/components/CopyButton";
import { MailCta } from "@/components/MailCta";

/** Home, step 1: who this is, in one glance. No role label and no numbers; those live on the career pages. */
export function Intro() {
  return (
    <section className="panel intro" aria-labelledby="intro-title">
      <div className="intro__text">
        <p className="status-pill">
          <span className="status-dot" aria-hidden="true" /> {home.status}
        </p>
        <h1 id="intro-title" className="display intro__title">
          <span className="shine">{home.title}</span>
        </h1>
        <p className="intro__lead">{home.lead}</p>
      </div>
      <div className="intro__photo">
        <picture>
          <source type="image/avif" srcSet="/media/portrait/fahad-photo-sm.avif 540w, /media/portrait/fahad-photo.avif 1086w" sizes="(min-width: 960px) 220px, 40vw" />
          <img src="/media/portrait/fahad-photo.webp" srcSet="/media/portrait/fahad-photo-sm.webp 540w, /media/portrait/fahad-photo.webp 1086w" sizes="(min-width: 960px) 220px, 40vw" alt={site.photoAlt} width={1086} height={1448} fetchPriority="high" />
        </picture>
      </div>
    </section>
  );
}

/** Home, step 2: the only decision on the page. */
export function Chooser() {
  return (
    <section className="chooser" aria-labelledby="chooser-title">
      <h2 id="chooser-title" className="step-label">
        <span className="step-label__num">1</span> {home.prompt}
      </h2>
      <ul className="chooser__grid">
        {home.careers.map((c) => {
          const Icon = c.track === "planning" ? Map : BriefcaseBusiness;
          return (
            <li key={c.track}>
              <a href={c.href} className="panel choice" data-track={c.track}>
                <span className="choice__icon" aria-hidden="true">
                  <Icon size={26} strokeWidth={1.6} />
                </span>
                <span className="choice__title display">{c.label}</span>
                <span className="choice__line">{c.line}</span>
                <span className="choice__inside">
                  {c.inside.map((t) => (
                    <span key={t}>
                      <Check size={14} strokeWidth={2.25} aria-hidden="true" /> {t}
                    </span>
                  ))}
                </span>
                <span className="choice__cta">
                  {c.cta}
                  <span className="choice__arrow" aria-hidden="true">
                    <ArrowRight size={18} strokeWidth={2} />
                  </span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/** Home, step 3 (optional): the things people ask before choosing, folded away. */
export function HomeFaq() {
  const planning = organisations.filter((o) => o.track === "planning").map((o) => o.name);
  const business = organisations.filter((o) => o.track === "business").map((o) => o.name);
  return (
    <section className="panel faq" aria-labelledby="faq-title" data-accordion>
      <h2 id="faq-title" className="step-label">
        <span className="step-label__num">2</span> {home.faqTitle}
      </h2>
      <details className="fold">
        <summary>
          Who is Fahad, in one paragraph?
          <span className="fold__toggle" aria-hidden="true">
            <Plus size={16} strokeWidth={2} />
          </span>
        </summary>
        <div className="fold__body">
          <p>{about.lead}</p>
          <p>
            <a className="text-link" href="/about">
              Read the full About page <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
            </a>
          </p>
        </div>
      </details>
      <details className="fold">
        <summary>
          Can I just have the résumé?
          <span className="fold__toggle" aria-hidden="true">
            <Plus size={16} strokeWidth={2} />
          </span>
        </summary>
        <div className="fold__body">
          <p>Yes. There is one for each career, so you get the relevant one.</p>
          <p className="btn-row">
            {contact.resumes.map((r) => (
              <a key={r.track} className="btn-ghost" href={r.file} download={r.download} data-track={r.track}>
                <Download size={16} strokeWidth={1.75} aria-hidden="true" /> {r.label}
              </a>
            ))}
          </p>
        </div>
      </details>
      <details className="fold">
        <summary>
          Where has he worked?
          <span className="fold__toggle" aria-hidden="true">
            <Plus size={16} strokeWidth={2} />
          </span>
        </summary>
        <div className="fold__body">
          <p>
            <strong>Planning &amp; GIS:</strong> {planning.join(", ")}.
          </p>
          <p>
            <strong>Business development:</strong> {business.join(", ")}.
          </p>
          <p>
            <a className="text-link" href="/worked-with">
              See each organisation and its website <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
            </a>
          </p>
        </div>
      </details>
      <details className="fold">
        <summary>
          Where is he based, and what is he studying?
          <span className="fold__toggle" aria-hidden="true">
            <Plus size={16} strokeWidth={2} />
          </span>
        </summary>
        <div className="fold__body">
          <p>
            {site.location}. {education.degree} at {education.school}, {education.period}.
          </p>
        </div>
      </details>
    </section>
  );
}

/** A slim closing strip: one line, the primary action, and the two fastest side doors. */
export function ContactStrip({ title = home.contactTitle, lead = home.contactLead }: { title?: string; lead?: string } = {}) {
  return (
    <section className="panel strip" aria-labelledby="strip-title">
      <div className="strip__text">
        <h2 id="strip-title" className="display strip__title">
          <span className="shine">{title}</span>
        </h2>
        <p className="small">{lead}</p>
      </div>
      <div className="strip__actions">
        <MailCta />
        <span className="strip__mail">
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <CopyButton value={contact.email} label="Copy email" />
        </span>
        <span className="strip__side">
          <a className="icon-btn" href={contact.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn (opens in new tab)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="4" />
              <path d="M8 10.5v6M8 7.5v.01M12 16.5v-6M12 13c0-1.4 1-2.5 2.3-2.5 1.4 0 2.2 1 2.2 2.7v3.3" />
            </svg>
          </a>
          <a className="icon-btn" href={contact.whatsapp} target="_blank" rel="noopener" aria-label="WhatsApp (opens in new tab)">
            <MessageCircle size={18} strokeWidth={1.75} aria-hidden="true" />
          </a>
        </span>
      </div>
    </section>
  );
}
