import { attainment, homeHighlights, projects, research } from "@content/index.ts";
import { hasMedia, media } from "@content/media.ts";
import { pctOfTarget } from "@content/metrics.ts";
import { site } from "@content/site.ts";
import { Img } from "@/components/Img";
import { splitTitle } from "@/lib/format";
import { ArrowUpRight, BriefcaseBusiness, CalendarDays, Map, Ruler, TrendingUp, Users, type LucideIcon } from "lucide-react";

const kpiIcon: Record<string, LucideIcon> = {
  "districts-digitized": Map,
  "acre-master-plan": Ruler,
  "projects-closed": Users,
  "best-month": TrendingUp,
};
const trackLabel = { planning: "Planning", business: "Business" } as const;
const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

/** Dashboard home: four headline numbers, then one row per career with real charts. */
/** Results charts: monthly target vs. locked revenue, and conversion rings. */
export function SalesCharts() {
  const months = attainment.months.map((m) => ({ ...m, pct: pctOfTarget(m) }));
  const best = months.reduce((a, b) => (b.pct > a.pct ? b : a));
  const metTarget = months.filter((m) => m.pct >= 100).length;
  const yMax = 12000;
  const ticks = [12000, 9000, 6000, 3000, 0];

  const rings = [
    { label: "Meetings converted, Oct 2025", value: 100, shown: "100%", tone: 3 },
    { label: "Meetings converted, overall", value: 80, shown: "80%+", tone: 2 },
    { label: `Months at or above target (${metTarget} of ${months.length})`, value: Math.round((metTarget / months.length) * 100), shown: `${metTarget}/${months.length}`, tone: 1 },
  ];

  const fa = projects.find((p) => p.slug === "fa-avenue-1");
  const faImg = fa && (hasMedia(`projects/${fa.slug}/card`) ? `projects/${fa.slug}/card` : fa.cover);
  const mix = Object.entries(
    projects.reduce<Record<string, number>>((acc, p) => ((acc[p.category] = (acc[p.category] ?? 0) + 1), acc), {})
  ).sort((a, b) => b[1] - a[1]);
  const mixMax = Math.max(...mix.map(([, n]) => n));

  return (
    <div className="results-charts">
      <div className="board" data-track="business">
        <figure className="card chart-card" aria-labelledby="sales-title">
          <div className="card__head">
            <div>
              <p className="big-number">{usd(best.locked)}</p>
              <p id="sales-title" className="muted">
                Best month locked — {best.month} 2025, {best.pct}% of an {usd(best.target)} target
              </p>
            </div>
            <span className="chip">
              <CalendarDays size={16} strokeWidth={1.75} aria-hidden="true" /> {attainment.period}
            </span>
          </div>
          <hr className="rule" />
          <div className="legend" aria-hidden="true">
            <span>
              <i className="dot dot--1" /> Target
            </span>
            <span>
              <i className="dot dot--3" /> Locked revenue
            </span>
          </div>
          <p className="visually-hidden">
            Monthly target and locked revenue, {attainment.period}:{" "}
            {months.map((m) => `${m.month} target ${usd(m.target)}, locked ${usd(m.locked)} (${m.pct}%)`).join("; ")}.
          </p>
          <div className="bars" aria-hidden="true">
            <div className="bars__axis">
              {ticks.map((t) => (
                <span key={t}>{t ? `${t / 1000}k` : "0"}</span>
              ))}
            </div>
            <div className="bars__plot">
              {ticks.map((t) => (
                <i key={t} className="bars__grid" style={{ bottom: `${(t / yMax) * 100}%` }} />
              ))}
              {months.map((m) => (
                <div key={m.month} className="bars__group">
                  <span className="bars__bar bars__bar--1" style={{ height: `${(m.target / yMax) * 100}%` }} title={`Target ${usd(m.target)}`} />
                  <span className="bars__bar bars__bar--3" style={{ height: `${(m.locked / yMax) * 100}%` }} title={`Locked ${usd(m.locked)}`} />
                  <span className="bars__label">{m.month}</span>
                </div>
              ))}
            </div>
          </div>
          <figcaption className="muted small">{attainment.sourceLabel}</figcaption>
        </figure>

        <div className="card goals" aria-labelledby="goals-title">
          <h4 id="goals-title" className="card__title">
            Conversion &amp; targets
          </h4>
          <p className="muted">Business development, Ideas Animation Studio</p>
          <div className="rings" aria-hidden="true">
            <svg viewBox="0 0 200 200">
              {rings.map((r, i) => {
                const radius = 88 - i * 18;
                const c = 2 * Math.PI * radius;
                return (
                  <g key={r.label} transform="rotate(-90 100 100)">
                    <circle cx="100" cy="100" r={radius} className="ring-track" />
                    <circle cx="100" cy="100" r={radius} className={`ring ring--${r.tone}`} strokeDasharray={`${(r.value / 100) * c} ${c}`} />
                  </g>
                );
              })}
            </svg>
            <div className="rings__center">
              <strong>100%</strong>
              <span>Oct 2025</span>
            </div>
          </div>
          <ul className="goal-list">
            {rings.map((r) => (
              <li key={r.label}>
                <i className={`dot dot--${r.tone}`} aria-hidden="true" />
                <span>{r.label}</span>
                <strong>{r.shown}</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
}
