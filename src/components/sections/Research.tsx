import { copy } from "@content/copy.ts";
import { research } from "@content/index.ts";
import { ArrowUpRight, Plus } from "lucide-react";
import { Block, noDot, TitleBlock } from "@/components/Sheet";

/** Coursework research, one row per report, each opening to its summary. */
export function Research() {
  const pages = research.reduce((n, r) => n + r.pages, 0);
  return (
    <>
      <TitleBlock
        code="P-03"
        track="planning"
        title={copy.research.title}
        lead={<p>{noDot(copy.research.caption)}.</p>}
        meta={[
          { label: "Reports", value: String(research.length) },
          { label: "Pages in all", value: pages.toLocaleString("en-GB") },
        ]}
      />
      <Block id="reports" title="Reports" caption="Open a report for its summary and course" track="planning">
        <ol className="roles" data-accordion>
          {research.map((r, i) => (
            <li key={r.slug}>
              <details className="role">
                <summary>
                  <span className="role__when">{String(i + 1).padStart(2, "0")}</span>
                  <span className="role__main">
                    <span className="role__title">{r.title}</span>
                    <span className="role__org">
                      {r.category} · {r.pages} pages{r.year ? ` · ${r.year}` : ""}
                    </span>
                  </span>
                  <Plus size={16} strokeWidth={1.5} aria-hidden="true" className="fold__icon" />
                </summary>
                <div className="role__body">
                  <p>{r.summary}</p>
                  <p className="meta">
                    {r.course}
                    {r.authors ? ` · ${r.authors}` : ""}
                  </p>
                  {r.driveUrl && (
                    <p>
                      <a className="text-link" href={r.driveUrl} target="_blank" rel="noopener">
                        Open the portfolio folder <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
                        <span className="visually-hidden"> (opens in new tab)</span>
                      </a>
                    </p>
                  )}
                </div>
              </details>
            </li>
          ))}
        </ol>
      </Block>
    </>
  );
}
