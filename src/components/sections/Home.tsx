import { contact } from "@content/contact.ts";
import { organisations, projects } from "@content/index.ts";
import { hasMedia } from "@content/media.ts";
import { home } from "@content/pages.ts";
import { site } from "@content/site.ts";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ShortcutStroke } from "@/components/Brand";
import { CopyButton } from "@/components/CopyButton";
import { Img } from "@/components/Img";
import { MailCta } from "@/components/MailCta";
import { noDot } from "@/components/Sheet";

/** Home, first screen: the name, the shortcut stroke, one line, the portrait. No role label, no numbers. */
export function Intro() {
  return (
    <section className="intro grid-bg" aria-labelledby="page-title">
      <div className="intro__text">
        <p className="eyebrow">
          <span className="status-dot" aria-hidden="true" /> {site.availabilityShort} · {site.location}
        </p>
        <h1 id="page-title" className="intro__title">
          {home.title}
        </h1>
        <ShortcutStroke width={300} thickness={14} className="intro__stroke" />
        <p className="intro__lead">{home.lead}</p>
        <p className="btn-row">
          <a className="btn btn--primary" href="#choose">
            {home.prompt} <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
          </a>
        </p>
      </div>
      <figure className="intro__photo">
        <picture>
          <source type="image/avif" srcSet="/media/portrait/fahad-photo-sm.avif 540w, /media/portrait/fahad-photo.avif 1086w" sizes="(min-width: 1024px) 34vw, 90vw" />
          <img src="/media/portrait/fahad-photo.webp" srcSet="/media/portrait/fahad-photo-sm.webp 540w, /media/portrait/fahad-photo.webp 1086w" sizes="(min-width: 1024px) 34vw, 90vw" alt={site.photoAlt} width={1086} height={1448} fetchPriority="high" />
        </picture>
      </figure>
    </section>
  );
}

/** Home, the one decision: two careers, each a picture-led card. */
export function Chooser() {
  const fa = projects.find((p) => p.slug === "fa-avenue-1") ?? projects[0];
  const faImg = fa && (hasMedia(`projects/${fa.slug}/card`) ? `projects/${fa.slug}/card` : fa.cover);
  const bizOrgs = organisations.filter((o) => o.track === "business");
  const [planning, business] = home.careers;
  return (
    <section className="chooser" id="choose" aria-labelledby="chooser-title">
      <h2 id="chooser-title" className="visually-hidden">
        {home.prompt}
      </h2>
      <a href={planning.href} className="choice choice--planning" data-track="planning">
        <span className="choice__media">{faImg && <Img id={faImg} alt={fa!.coverAlt} />}</span>
        <span className="choice__body">
          <span className="eyebrow">
            <span className="track-dot" aria-hidden="true" /> {String(projects.length)} projects · every drawing sheet
          </span>
          <span className="choice__title">{planning.label}</span>
          <span className="choice__line">{planning.short}</span>
          <span className="choice__cta">
            {planning.cta} <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
          </span>
        </span>
      </a>
      <a href={business.href} className="choice choice--business" data-track="business">
        <span className="choice__media choice__media--type" aria-hidden="true">
          {bizOrgs.map((o) => (
            <span key={o.slug}>{o.name}</span>
          ))}
        </span>
        <span className="choice__body">
          <span className="eyebrow">
            <span className="track-dot" aria-hidden="true" /> B2B services · lead to signed scope
          </span>
          <span className="choice__title">{business.label}</span>
          <span className="choice__line">{business.short}</span>
          <span className="choice__cta">
            {business.cta} <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
          </span>
        </span>
      </a>
    </section>
  );
}

/** The closing band on most pages: one line, the primary action, the address to copy, two side doors. */
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
          LinkedIn <ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
          <span className="visually-hidden"> (opens in new tab)</span>
        </a>
      </div>
    </section>
  );
}
