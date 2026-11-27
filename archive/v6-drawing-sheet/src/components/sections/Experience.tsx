import { org, rolesFor } from "@content/index.ts";
import type { Track } from "@content/schema.ts";
import { byStartDesc, roleDates } from "@/lib/format";
import { ArrowUpRight, Plus } from "lucide-react";
import { Block } from "@/components/Sheet";

/** The roles of one career, newest first. Each row opens to what the role involved and a link to the organisation. */
export function Experience({ track, title, caption }: { track: Track; title: string; caption?: string }) {
  const timeline = [...rolesFor(track)].sort(byStartDesc);
  return (
    <Block id={`experience-${track}`} title={title} caption={caption} track={track}>
      <ul className="roles">
        {timeline.map((r) => {
          const o = org(r.org);
          return (
            <li key={r.slug}>
              <details className="role">
                <summary>
                  <span className="role__when">{roleDates(r)}</span>
                  <span className="role__main">
                    <span className="role__title">
                      {r.title}
                      {r.end === "present" && <span className="tag tag--now">Now</span>}
                    </span>
                    <span className="role__org">
                      {r.orgName} · {r.location}
                    </span>
                  </span>
                  <Plus size={16} strokeWidth={1.5} aria-hidden="true" className="fold__icon" />
                </summary>
                <div className="role__body">
                  {r.project && <p className="role__project">{r.project}</p>}
                  {r.summary && <p>{r.summary}</p>}
                  {r.bullets.length > 0 && (
                    <ul className="bullets">
                      {r.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                  {r.note && <p className="meta">{r.note}</p>}
                  {o.url && (
                    <p>
                      <a className="text-link" href={o.url} target="_blank" rel="noopener">
                        {o.urlLabel} <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
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
    </Block>
  );
}
