import { contact } from "@content/contact.ts";
import { education } from "@content/education.ts";
import { organisations, projects } from "@content/index.ts";
import { about, home } from "@content/pages.ts";
import { site } from "@content/site.ts";
import { ArrowRight, Download, Plus } from "lucide-react";
import { CopyButton } from "@/components/CopyButton";
import { MailCta } from "@/components/MailCta";
import { Block, noDot } from "@/components/Sheet";

/** Home, first row: who this is. The portrait is the one image on the page; no role label, no numbers. */
export function Intro() {
  return (
    <section className="title-block title-block--home" aria-labelledby="page-title">
      <div className="title-block__main">
        <p className="kicker">
          <span className="status-dot" aria-hidden="true" /> {site.availabilityShort} · {site.location}
        </p>
        <h1 id="page-title" className="title-block__title title-block__title--hero">
          {home.title}
        </h1>
        <p className="title-block__lead">{home.lead}</p>
      </div>
      <figure className="portrait">
        <picture>
          <source type="image/avif" srcSet="/media/portrait/fahad-photo-sm.avif 540w, /media/portrait/fahad-photo.avif 1086w" sizes="(min-width: 1024px) 30vw, 100vw" />
          <img src="/media/portrait/fahad-photo.webp" srcSet="/media/portrait/fahad-photo-sm.webp 540w, /media/portrait/fahad-photo.webp 1086w" sizes="(min-width: 1024px) 30vw, 100vw" alt={site.photoAlt} width={1086} height={1448} fetchPriority="high" />
        </picture>
        <figcaption>
          <span>G-01</span>
          <span>{contact.coordinates}</span>
        </figcaption>
      </figure>
    </section>
  );
}

/** Home, second row: the only decision on the page. */
export function Chooser() {
  return (
    <section className="chooser" aria-labelledby="chooser-title">
      <h2 id="chooser-title" className="chooser__prompt">
        {home.prompt}
      </h2>
      {home.careers.map((c) => (
        <a key={c.track} href={c.href} className="choice" data-track={c.track}>
          <span className="choice__code">{c.code}</span>
          <span className="choice__title">{c.label}</span>
          <span className="choice__line">{c.line}</span>
          <ul className="choice__inside">
            {c.inside.map((t) => (
              <li key={t}>{t.replace("{projects}", String(projects.length))}</li>
            ))}
          </ul>
          <span className="choice__cta">
            {c.cta}
            <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
          </span>
        </a>
      ))}
    </section>
  );
}

function Fold({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <details className="fold">
      <summary>
        {q}
        <Plus size={16} strokeWidth={1.5} aria-hidden="true" className="fold__icon" />
      </summary>
      <div className="fold__body">{children}</div>
    </details>
  );
}

/** Home, third row: what people ask before choosing, folded away. */
export function HomeFaq() {
  const planning = organisations.filter((o) => o.track === "planning").map((o) => o.name);
  const business = organisations.filter((o) => o.track === "business").map((o) => o.name);
  return (
    <Block id="faq" title={home.faqTitle} caption={home.faqCaption}>
      <div className="folds" data-accordion>
        <Fold q="Who is Fahad, in one paragraph">
          <p>{about.lead}</p>
          <p>
            <a className="text-link" href="/about">
              Read the About page <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
            </a>
          </p>
        </Fold>
        <Fold q="Can I just have the résumé">
          <p>Yes. There is one for each career, so you get the relevant one.</p>
          <p className="btn-row">
            {contact.resumes.map((r) => (
              <a key={r.track} className="btn btn--secondary" href={r.file} download={r.download} data-track={r.track}>
                <Download size={16} strokeWidth={1.5} aria-hidden="true" /> {noDot(r.label)}
              </a>
            ))}
          </p>
        </Fold>
        <Fold q="Where has he worked">
          <p>
            <strong>Planning and GIS:</strong> {planning.join(", ")}.
          </p>
          <p>
            <strong>Business development:</strong> {business.join(", ")}.
          </p>
          <p>
            <a className="text-link" href="/worked-with">
              Each organisation, with its website <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
            </a>
          </p>
        </Fold>
        <Fold q="Where is he based, and what is he studying">
          <p>
            {site.location}. {education.degree} at {education.school}, {education.period}.
          </p>
        </Fold>
      </div>
    </Block>
  );
}

/** The closing row on most pages: the primary action, the address to copy, and the two side doors. */
export function ContactStrip({ title = home.contactTitle, lead = home.contactLead }: { title?: string; lead?: string } = {}) {
  return (
    <section className="strip" aria-labelledby="strip-title">
      <div className="strip__text">
        <h2 id="strip-title" className="strip__title">
          {noDot(title.replace(/\?$/, ""))}
        </h2>
        <p className="strip__lead">{lead}</p>
      </div>
      <div className="strip__actions">
        <MailCta />
        <span className="copy-field">
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <CopyButton value={contact.email} label="Copy email" />
        </span>
        <a className="text-link" href={contact.linkedin} target="_blank" rel="noopener">
          LinkedIn<span className="visually-hidden"> (opens in new tab)</span>
        </a>
        <a className="text-link" href={contact.whatsapp} target="_blank" rel="noopener">
          WhatsApp<span className="visually-hidden"> (opens in new tab)</span>
        </a>
      </div>
    </section>
  );
}
