// Makes the portfolio card image for each project: the chosen sheet with its blank white margins trimmed,
// so the bento grid can show the whole drawing at its true proportions (no cropping).
// Sources are the already-redacted sheets in public/media/projects/<slug>/ — nothing private is re-exposed.
// Writes <slug>/card.webp + .avif and registers "projects/<slug>/card" in content/data/media.generated.json.
// Usage: node scripts/make-cards.mjs   (change a source below and run again)
import { existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import sharp from "sharp";

/** Which sheet represents each project in the grid. `photo: true` = a render or photograph: no white margin added. */
const sources = {
  "fa-avenue-1": { page: "page-1" }, // full master-plan sheet
  "fasan-villas": { page: "page-1" }, // portrait layout plan
  "allama-iqbal-industrial-estate": { page: "page-1", photo: true }, // aerial perspective
  "hanjarwal-tod": { page: "page-1" }, // TOD sheet: renders, land use, legibility map
  "house-44x39": { page: "page-1", photo: true }, // dusk visualisation
  "residential-cad-series": { page: "page-1" }, // 10-marla sections and elevations
  "delhi-gate-regeneration": { page: "page-1" },
  "orange-line-landuse": { page: "page-1" },
  "heritage-buffer-map": { page: "page-1" },
};

const MANIFEST = "content/data/media.generated.json";
const manifest = JSON.parse(readFileSync(MANIFEST, "utf8"));

for (const [slug, { page, photo }] of Object.entries(sources)) {
  const dir = `public/media/projects/${slug}`;
  // Trim near-white edges, keep a hair of breathing room, cap the width at 1600 px.
  const trimmed = await sharp(`${dir}/${page}.webp`).trim({ background: "#ffffff", threshold: 28 }).toBuffer({ resolveWithObject: true });
  const pad = photo ? 0 : Math.round(Math.min(trimmed.info.width, trimmed.info.height) * 0.012);
  const base = sharp(trimmed.data)
    .extend({ top: pad, bottom: pad, left: pad, right: pad, background: "#ffffff" })
    .resize({ width: 1600, withoutEnlargement: true });
  await base.clone().webp({ quality: 84 }).toFile(`${dir}/card.webp`);
  await base.clone().avif({ quality: 58 }).toFile(`${dir}/card.avif`);
  const meta = await sharp(`${dir}/card.webp`).metadata();
  manifest[`projects/${slug}/card`] = { src: `/media/projects/${slug}/card.webp`, avif: `/media/projects/${slug}/card.avif`, width: meta.width, height: meta.height };
  console.log(`✓ ${slug.padEnd(32)} ${meta.width} × ${meta.height}  (${(meta.width / meta.height).toFixed(2)})`);

  // The earlier wide banners are replaced by these cards.
  for (const ext of ["webp", "avif"]) if (existsSync(`${dir}/wide.${ext}`)) rmSync(`${dir}/wide.${ext}`);
  delete manifest[`projects/${slug}/wide`];
}

const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync(MANIFEST, JSON.stringify(sorted, null, 2) + "\n");
