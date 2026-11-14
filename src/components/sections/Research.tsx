import { copy } from "@content/copy.ts";
import { research } from "@content/index.ts";
import { ArrowUpRight, Plus } from "lucide-react";

export function Research({ level = 2 }: { level?: 1 | 2 } = {}) {
  const H = level === 1 ? "h1" : "h2";
  return (
    <section id="research" className="section panel" aria-labelledby="research-title" data-track="planning">
      <div className="section-head">
        <H id="research-title" className="display h2">
          <span className="shine">{copy.research.title}</span>
        </H>
        <p className="small">{copy.research.caption}</p>
      </div>
      <ol className="rows">
        {research.map((r, i) => (
          <li key={r.slug}>
            <details className="row row--numbered">
              <summary>
                <span className="row__num">{String(i + 1).padStart(2, "0")}</span>
                <span className="row__main">
                  <span className="row__serif-title">{r.title}</span>
                  <span className="row__sub" style={{ display: "block" }}>
                    {r.topic} · {r.pages} pages{r.year ? ` · ${r.year}` : ""}
                  </span>
                </span>
                <span className="row__tags">
                  <span className="pill pill--outline">{r.category}</span>
                </span>
                <span className="row__toggle" aria-hidden="true">
                  <Plus size={18} strokeWidth={1.75} />
                </span>
              </summary>
              <div className="row__body">
                <p style={{ maxWidth: "40em" }}>{r.summary}</p>
                <p className="small">
                  {r.course}
                  {r.authors ? ` · ${r.authors}` : ""}
                </p>
                {r.driveUrl && (
                  <p>
                    <a className="text-link" href={r.driveUrl} target="_blank" rel="noopener">
                      Open the portfolio folder <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
                      <span className="visually-hidden"> (opens in new tab)</span>
                    </a>
                  </p>
                )}
              </div>
            </details>
          </li>
        ))}
      </ol>
    </section>
  );
}
