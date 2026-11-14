import { copy } from "@content/copy.ts";
import { engagements } from "@content/index.ts";

/** Selected engagements — client names withheld. */
export function Engagements({ level = 2 }: { level?: 1 | 2 } = {}) {
  const H = level === 1 ? "h1" : "h2";
  return (
    <section id="engagements" className="section panel" aria-labelledby="engagements-title" data-track="business">
      <div className="section-head">
        <H id="engagements-title" className="display h2">
          <span className="shine">{copy.results.engagementsTitle}</span>
        </H>
        <p className="small">{copy.results.engagementsCaption}</p>
      </div>
      <ul className="rows">
        {engagements.map((e) => (
          <li key={e.slug} className="deal">
            <div>
              <h4 className="label">{e.descriptor}</h4>
              <p className="deal__desc">{e.title}</p>
            </div>
            <p className="deal__how small">{e.how}</p>
            <div className="deal__side">
              <span className="pill">{e.value}</span>
              <span className="small">{e.terms}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
