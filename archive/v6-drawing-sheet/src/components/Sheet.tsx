import { contact } from "@content/contact.ts";
import type { Track } from "@content/schema.ts";
import type { ReactNode } from "react";

/** Short strings never end in a period. */
export const noDot = (s: string) => s.replace(/\.$/, "");

const trackName: Record<Track, string> = { planning: "Urban planning", business: "Business development" };

type Meta = { label: string; value: ReactNode };

/**
 * The title block that opens every page, laid out like the one on a drawing sheet: the title and lead on
 * the left, a small ruled table of facts on the right, with the sheet code first.
 */
export function TitleBlock({
  code,
  title,
  lead,
  track,
  meta = [],
  children,
  level = 1,
  id = "page-title",
  aside,
}: {
  code: string;
  title: ReactNode;
  lead?: ReactNode;
  track?: Track;
  meta?: Meta[];
  children?: ReactNode;
  level?: 1 | 2;
  id?: string;
  aside?: ReactNode;
}) {
  const H = level === 1 ? "h1" : "h2";
  const rows: Meta[] = [
    { label: "Sheet", value: code },
    ...(track ? [{ label: "Discipline", value: trackName[track] }] : []),
    ...meta,
    { label: "Drawn at", value: contact.coordinates },
  ];
  return (
    <section className="title-block" aria-labelledby={id} data-track={track}>
      <div className="title-block__main">
        {track && (
          <p className="kicker">
            <span className="track-dot" aria-hidden="true" /> {trackName[track]}
          </p>
        )}
        <H id={id} className="title-block__title">
          {title}
        </H>
        {lead && <div className="title-block__lead">{lead}</div>}
        {children}
      </div>
      {aside ?? (
        <dl className="title-block__meta">
          {rows.map((r) => (
            <div key={r.label}>
              <dt>{r.label}</dt>
              <dd>{r.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}

/**
 * A section of the sheet: a narrow heading column on the left, the content on the right, ruled apart.
 * Every page below the title block is a stack of these, so the whole site reads off one grid.
 */
export function Block({
  id,
  title,
  caption,
  children,
  track,
  action,
  wide = false,
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
    <section id={id} className={`block${wide ? " block--wide" : ""}`} aria-labelledby={`${id}-title`} data-track={track}>
      <header className="block__head">
        <h2 id={`${id}-title`} className="block__title">
          {title}
        </h2>
        {caption && <p className="block__caption">{caption}</p>}
        {action && <div className="block__action">{action}</div>}
      </header>
      <div className="block__body">{children}</div>
    </section>
  );
}
