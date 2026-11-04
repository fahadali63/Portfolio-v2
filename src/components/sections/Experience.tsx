import { copy } from "@content/copy.ts";
import { roles } from "@content/index.ts";
import { byStartDesc, roleDates, trackName } from "@/lib/format";
import { Plus } from "lucide-react";

/** Both careers in one timeline, newest first. Each row opens to its bullet points (native <details>). */
export function Experience({ level = 2 }: { level?: 1 | 2 } = {}) {
  const H = level === 1 ? "h1" : "h2";
  const timeline = [...roles].sort(byStartDesc);
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="section-head">
        <H id="experience-title" className="display h2">
          {copy.experience.title}
        </H>
        <p className="small">{copy.experience.caption}</p>
      </div>
      <ul className="rows">
        {timeline.map((r) => {
          const hasBody = r.bullets.length > 0 || r.summary || r.note || r.project;
          return (
            <li key={r.slug} data-track={r.track}>
              <details className="row" open={false}>
                <summary>
                  <span className="row__when">{roleDates(r)}</span>
                  <span className="row__main">
                    <span className="row__title display" style={{ display: "block" }}>
                      {r.title}
                    </span>
                    <span className="row__sub" style={{ display: "block" }}>
                      {r.orgName} · {r.location}
                    </span>
                  </span>
                  <span className="row__tags">
                    {r.end === "present" && <span className="pill">Now</span>}
                    <span className="pill pill--outline">{trackName[r.track]}</span>
                  </span>
                  {hasBody ? (
                    <span className="row__toggle" aria-hidden="true">
                      <Plus size={18} strokeWidth={1.75} />
                    </span>
                  ) : (
                    <span aria-hidden="true" />
                  )}
                </summary>
                {hasBody && (
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
                  </div>
                )}
              </details>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
