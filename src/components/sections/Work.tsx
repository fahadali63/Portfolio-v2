import { copy } from "@content/copy.ts";
import { projects } from "@content/index.ts";
import { hasMedia, media } from "@content/media.ts";
import type { Project } from "@content/schema.ts";
import { Img } from "@/components/Img";
import { projectLine, splitTitle } from "@/lib/format";

/**
 * Bento rows. Each card's width follows its image's own proportions, so every image in a row shares one height
 * and is shown whole — never cropped. Change the grouping here; projects not listed are added in pairs at the end.
 * Card images come from scripts/make-cards.mjs (the sheet with its blank margins trimmed).
 */
const ROWS: string[][] = [
  ["fa-avenue-1", "fasan-villas"], // master plan · housing layout (portrait)
  ["allama-iqbal-industrial-estate", "hanjarwal-tod"], // industrial estate · TOD
  ["house-44x39", "residential-cad-series"], // architectural CAD
  ["delhi-gate-regeneration", "orange-line-landuse", "heritage-buffer-map"], // GIS & mapping
];

function rowsOf(list: Project[]): Project[][] {
  const bySlug = new Map(list.map((p) => [p.slug, p]));
  const rows = ROWS.map((r) => r.map((s) => bySlug.get(s)).filter((p): p is Project => !!p)).filter((r) => r.length);
  const placed = new Set(rows.flat().map((p) => p.slug));
  const rest = list.filter((p) => !placed.has(p.slug));
  for (let i = 0; i < rest.length; i += 2) rows.push(rest.slice(i, i + 2));
  return rows;
}

const cardImage = (p: Project) => (hasMedia(`projects/${p.slug}/card`) ? `projects/${p.slug}/card` : p.cover);

export function BentoCard({ p, lead = false }: { p: Project; lead?: boolean }) {
  const id = cardImage(p);
  const { width, height } = media(id);
  const [name] = splitTitle(p.title);
  return (
    <li className="bento__cell" style={{ flexGrow: width / height }}>
      <a className="bento__card" href={`/work/${p.slug}`}>
        <div className="media bento__media" style={{ aspectRatio: `${width} / ${height}` }}>
          <Img id={id} alt={p.coverAlt} />
        </div>
        <div className="bento__foot">
          <div className="bento__head">
            <h3 className={`bento__title display${lead ? " bento__title--lead" : ""}`}>{name}</h3>
            <span className="pill">{p.category}</span>
          </div>
          <p className="small">
            {projectLine(p)}
            {p.year ? ` · ${p.year}` : ""}
          </p>
        </div>
      </a>
    </li>
  );
}

export function Work({ level = 2 }: { level?: 1 | 2 } = {}) {
  const H = level === 1 ? "h1" : "h2";
  const rows = rowsOf(projects);
  return (
    <section id="work" className="section" aria-labelledby="work-title" data-track="planning">
      <div className="section-head">
        <H id="work-title" className="display h2">
          {copy.work.title}
        </H>
        <p className="small">{copy.work.caption}</p>
      </div>
      <div className="bento">
        {rows.map((row, i) => (
          <ul key={row[0]!.slug} className={`bento__row${row.length > 2 ? " bento__row--many" : ""}`}>
            {row.map((p) => (
              <BentoCard key={p.slug} p={p} lead={i === 0} />
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
