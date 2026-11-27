import { copy } from "@content/copy.ts";
import { attainment, businessMetrics } from "@content/index.ts";
import { pctOfTarget } from "@content/metrics.ts";
import { Plus } from "lucide-react";
import { Block, noDot, TitleBlock } from "@/components/Sheet";

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

/**
 * Results: the figures, then one main chart (locked revenue against target, month by month), then a
 * narrow ranked list of the conversion figures, and the numbers as a table for anyone who wants them.
 */
export function Results() {
  const months = attainment.months.map((m) => ({ ...m, pct: pctOfTarget(m) }));
  const best = months.reduce((a, b) => (b.pct > a.pct ? b : a));
  const met = months.filter((m) => m.pct >= 100).length;
  const total = months.reduce((n, m) => n + m.locked, 0);
  const yMax = 12000;
  const ticks = [0, 3000, 6000, 9000, 12000];
  const W = 640;
  const H = 280;
  const pad = { l: 40, r: 8, t: 12, b: 28 };
  const plotW = W - pad.l - pad.r;
  const plotH = H - pad.t - pad.b;
  const slot = plotW / months.length;
  const barW = Math.min(22, slot / 3);
  const y = (v: number) => pad.t + plotH - (v / yMax) * plotH;

  const conversion = [
    { label: "Meetings converted, Oct 2025", value: 100, shown: "100%" },
    { label: "Meetings converted, overall", value: 80, shown: "80%+" },
    { label: "Months at or above target", value: Math.round((met / months.length) * 100), shown: `${met} of ${months.length}` },
  ];

  return (
    <>
      <TitleBlock
        code="B-02"
        track="business"
        title={copy.results.title}
        lead={<p>{noDot(copy.results.caption)}.</p>}
        meta={[
          { label: "Period", value: attainment.period },
          { label: "Locked in period", value: usd(total) },
        ]}
      />

      <section className="figures" aria-label="Key numbers" data-track="business">
        {businessMetrics.map((m) => (
          <div key={m.slug} className="figure">
            <p className="figure__label">{m.label}</p>
            <p className="figure__value">{m.value}</p>
            <p className="figure__note">{m.qualifier}</p>
          </div>
        ))}
      </section>

      <Block id="attainment" title="Locked revenue against target" caption={`${attainment.period}, ${attainment.sourceLabel}`} track="business" wide>
        <figure className="chart">
          <div className="chart__head">
            <div>
              <p className="chart__figure">{usd(best.locked)}</p>
              <p className="meta">
                Best month, {best.month} 2025: {best.pct}% of a {usd(best.target)} target
              </p>
            </div>
            <ul className="legend" aria-hidden="true">
              <li>
                <span className="legend__key legend__key--target" /> Target
              </li>
              <li>
                <span className="legend__key legend__key--locked" /> Locked
              </li>
            </ul>
          </div>
          <svg className="chart__svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="chart-desc" preserveAspectRatio="none">
            <desc id="chart-desc">
              Monthly target and locked revenue, {attainment.period}: {months.map((m) => `${m.month} target ${usd(m.target)}, locked ${usd(m.locked)}, ${m.pct}%`).join("; ")}.
            </desc>
            {ticks.map((t) => (
              <g key={t}>
                <line className="chart__grid" x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} />
                <text className="chart__tick" x={pad.l - 8} y={y(t) + 4} textAnchor="end">
                  {t ? `${t / 1000}k` : "0"}
                </text>
              </g>
            ))}
            {months.map((m, i) => {
              const cx = pad.l + slot * i + slot / 2;
              const isBest = m.month === best.month;
              return (
                <g key={m.month}>
                  <rect className="chart__bar chart__bar--target" x={cx - barW - 2} y={y(m.target)} width={barW} height={plotH + pad.t - y(m.target)} rx="2" />
                  <rect className={`chart__bar chart__bar--locked${isBest ? " is-best" : ""}`} x={cx + 2} y={y(m.locked)} width={barW} height={plotH + pad.t - y(m.locked)} rx="2" />
                  <text className="chart__tick" x={cx} y={H - 8} textAnchor="middle">
                    {m.month}
                  </text>
                </g>
              );
            })}
          </svg>
          <figcaption className="meta">Thousands of US dollars. In each pair the pale bar is the target and the dark bar is revenue locked; the best month is marked.</figcaption>
        </figure>
        <aside className="ranked" aria-labelledby="ranked-title">
          <h3 id="ranked-title" className="ranked__title">
            Conversion
          </h3>
          <ul>
            {conversion.map((c) => (
              <li key={c.label}>
                <div className="ranked__row">
                  <span>{c.label}</span>
                  <strong>{c.shown}</strong>
                </div>
                <span className="ranked__bar" aria-hidden="true">
                  <span style={{ width: `${c.value}%` }} />
                </span>
              </li>
            ))}
          </ul>
        </aside>
        <details className="fold fold--table">
          <summary>
            The numbers as a table
            <Plus size={16} strokeWidth={1.5} aria-hidden="true" className="fold__icon" />
          </summary>
          <div className="fold__body">
            <table className="table">
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
                    <td>{usd(m.target)}</td>
                    <td>{usd(m.locked)}</td>
                    <td>{m.pct}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      </Block>
    </>
  );
}
