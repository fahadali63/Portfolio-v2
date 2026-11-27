import { copy } from "@content/copy.ts";
import { projects } from "@content/index.ts";
import { hasMedia, media } from "@content/media.ts";
import type { Project } from "@content/schema.ts";
import { Img } from "@/components/Img";
import { noDot, TitleBlock } from "@/components/Sheet";
import { projectLine, splitTitle } from "@/lib/format";

/**
 * The portfolio as a ruled plate of drawings. Each row's cells take widths in proportion to their images,
 * so every sheet in a row shares one height and is shown whole, never cropped. Change the grouping here;
 * projects not listed are added in pairs at the end. Card images come from scripts/make-cards.mjs.
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
export const projectCode = (p: Project) => `P-02.${String(projects.findIndex((x) => x.slug === p.slug) + 1).padStart(2, "0")}`;

export function PlateCard({ p, priority = false }: { p: Project; priority?: boolean }) {
  const id = cardImage(p);
  const { width, height } = media(id);
  const [name] = splitTitle(p.title);
  return (
    <li className="plate" style={{ flexGrow: width / height }}>
      <a className="plate__link" href={`/work/${p.slug}`}>
        <div className="plate__media" style={{ aspectRatio: `${width} / ${height}` }}>
          <Img id={id} alt={p.coverAlt} priority={priority} />
        </div>
        <div className="plate__foot">
          <span className="plate__code">{projectCode(p)}</span>
          <h3 className="plate__title">{name}</h3>
          <p className="meta">
            {p.category} · {projectLine(p)}
            {p.year ? ` · ${p.year}` : ""}
          </p>
        </div>
      </a>
    </li>
  );
}

export function Work() {
  const rows = rowsOf(projects);
  const categories = new Set(projects.map((p) => p.category)).size;
  return (
    <>
      <TitleBlock
        code="P-02"
        track="planning"
        title={copy.work.title}
        lead={<p>{noDot(copy.work.caption)}.</p>}
        meta={[
          { label: "Projects", value: String(projects.length) },
          { label: "Categories", value: String(categories) },
        ]}
      />
      <section className="plates" aria-label="Projects">
        {rows.map((row, i) => (
          <ul key={row[0]!.slug} className="plates__row">
            {row.map((p) => (
              <PlateCard key={p.slug} p={p} priority={i === 0} />
            ))}
          </ul>
        ))}
      </section>
    </>
  );
}
