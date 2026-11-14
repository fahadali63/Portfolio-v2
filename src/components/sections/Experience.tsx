import { org, rolesFor } from "@content/index.ts";
import type { Track } from "@content/schema.ts";
import { byStartDesc, roleDates } from "@/lib/format";
import { ArrowUpRight, Plus } from "lucide-react";

/** The roles of one career, newest first. Each row opens to its bullet points and a link to the organisation. */
export function Experience({ track, title, caption, level = 2 }: { track: Track; title: string; caption?: string; level?: 1 | 2 }) {
  const H = level === 1 ? "h1" : "h2";
  const timeline = [...rolesFor(track)].sort(byStartDesc);
  const id = `experience-${track}`;
  return (
    <section id={id} className="section panel" aria-labelledby={`${id}-title`} data-track={track}>
      <div className="section-head">
        <H id={`${id}-title`} className="display h2">
          <span className="shine">{title}</span>
        </H>
        {caption && <p className="small">{caption}</p>}
      </div>
      <ul className="rows">
        {timeline.map((r) => {
          const o = org(r.org);
          return (
            <li key={r.slug}>
              <details className="row">
                <summary>
                  <span className="row__when">{roleDates(r)}</span>
                  <span className="row__main">
                    <span className="row__title" style={{ display: "block" }}>
                      {r.title}
                    </span>
                    <span className="row__sub" style={{ display: "block" }}>
                      {r.orgName} · {r.location}
                    </span>
                  </span>
                  <span className="row__tags">{r.end === "present" && <span className="pill pill--now">Now</span>}</span>
                  <span className="row__toggle" aria-hidden="true">
                    <Plus size={18} strokeWidth={1.75} />
                  </span>
                </summary>
                <div className="row__body">
                  {r.project && <p className="label">{r.project}</p>}
                  {r.summary && <p className="small">{r.summary}</p>}
                  {r.bullets.length > 0 && (
                    <ul className="bullets">
                      {r.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                  {r.note && <p className="small">{r.note}</p>}
                  {o.url && (
                    <p>
                      <a className="text-link" href={o.url} target="_blank" rel="noopener">
                        {o.name} · {o.urlLabel} <ArrowUpRight size={15} strokeWidth={1.9} aria-hidden="true" />
                        <span className="visually-hidden"> (opens in new tab)</span>
                      </a>
                    </p>
                  )}
                </div>
              </details>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
