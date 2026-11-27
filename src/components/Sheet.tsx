import type { Track } from "@content/schema.ts";
import type { ReactNode } from "react";
import { ShortcutStroke } from "@/components/Brand";

/** Short strings never end in a period. */
export const noDot = (s: string) => s.replace(/\.$/, "");

const trackName: Record<Track, string> = { planning: "Urban planning", business: "Business development" };

type Meta = { label: string; value: ReactNode };

/**
 * The hero that opens every page: an eyebrow, a big Bricolage headline with the red shortcut stroke under
 * it (the page's one red moment), a short lead, actions, and an optional picture or a row of quick facts.
 * `code` is kept for page bookkeeping only and is not shown.
 */
export function TitleBlock({
  title,
  lead,
  track,
  meta = [],
  children,
  level = 1,
  id = "page-title",
  aside,
  eyebrow,
}: {
  code?: string;
  title: ReactNode;
  lead?: ReactNode;
  track?: Track;
  meta?: Meta[];
  children?: ReactNode;
  level?: 1 | 2;
  id?: string;
  aside?: ReactNode;
  eyebrow?: ReactNode;
}) {
  const H = level === 1 ? "h1" : "h2";
  return (
    <section className={`hero${aside ? " hero--split" : ""}`} aria-labelledby={id} data-track={track}>
      <div className="hero__main">
        {(eyebrow || track) && (
          <p className="eyebrow">
            {track && <span className="track-dot" aria-hidden="true" />}
            {eyebrow ?? trackName[track!]}
          </p>
        )}
        <H id={id} className="hero__title">
          {title}
        </H>
        <ShortcutStroke width={220} thickness={11} className="hero__stroke" />
        {lead && <div className="hero__lead">{lead}</div>}
        {children}
        {meta.length > 0 && (
          <ul className="facts" aria-label="Quick facts">
            {meta.map((m) => (
              <li key={m.label}>
                <span className="facts__label">{m.label}</span>
                <span className="facts__value">{m.value}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      {aside}
    </section>
  );
}

/** A section: its heading on top, then the content. */
export function Block({
  id,
  title,
  caption,
  children,
  track,
  action,
}: {
  id: string;
  title: ReactNode;
  caption?: ReactNode;
  children: ReactNode;
  track?: Track;
  action?: ReactNode;
  wide?: boolean;
}) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-title`} data-track={track}>
      <header className="section__head">
        <div>
          <h2 id={`${id}-title`} className="section__title">
            {title}
          </h2>
          {caption && <p className="section__caption">{caption}</p>}
        </div>
        {action && <div className="section__action">{action}</div>}
      </header>
      <div className="section__body">{children}</div>
    </section>
  );
}
