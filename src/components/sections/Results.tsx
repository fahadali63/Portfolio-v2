import { copy } from "@content/copy.ts";
import { attainment, businessMetrics } from "@content/index.ts";
import { pctOfTarget } from "@content/metrics.ts";
import { SalesCharts } from "./SalesCharts";


export function Results({ level = 2 }: { level?: 1 | 2 } = {}) {
  const H = level === 1 ? "h1" : "h2";
  const months = attainment.months.map((m) => ({ ...m, pct: pctOfTarget(m) }));
  return (
    <section id="results" className="section panel" aria-labelledby="results-title" data-track="business">
      <div className="section-head">
        <H id="results-title" className="display h2">
          <span className="shine">{copy.results.title}</span>
        </H>
        <p className="small">{copy.results.caption}</p>
      </div>

      <ul className="grid-cells grid-cells--metrics">
        {businessMetrics.map((m) => (
          <li key={m.slug}>
            <div className="metric">
              <p className="metric__value">{m.value}</p>
              <p className="metric__label">{m.label}</p>
              <p className="small">
                {m.qualifier} — {m.sourceLabel}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="sub-head">
        <h3 className="display h3">{copy.results.chartTitle}</h3>
        <p className="small">{attainment.period} · {attainment.sourceLabel}</p>
      </div>
      <SalesCharts />
      <div>
        <details className="data-table">
          <summary>Show the numbers as a table</summary>
          <table>
            <caption className="visually-hidden">
              {copy.results.chartTitle}, {attainment.period}
            </caption>
            <thead>
              <tr>
                <th scope="col">Month</th>
                <th scope="col">Target</th>
                <th scope="col">Locked</th>
                <th scope="col">Attainment</th>
              </tr>
            </thead>
            <tbody>
              {months.map((m) => (
                <tr key={m.month}>
                  <th scope="row">{m.month} 2025</th>
                  <td>${m.target.toLocaleString("en-US")}</td>
                  <td>${m.locked.toLocaleString("en-US")}</td>
                  <td>{m.pct}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      </div>

    </section>
  );
}
