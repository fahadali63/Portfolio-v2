# Fahad Ali — Portfolio (v3)

A one-page portfolio with a page for each planning project, built with Next.js and exported to plain HTML.
Design: light grey sheet, tall condensed caps (Bebas Neue) with a serif (Instrument Serif), portrait in an arch —
see [docs/design.md](docs/design.md).

| Route | Page |
|---|---|
| `/` | Hero · capabilities · worked with · `#about` · `#work` · `#experience` · `#results` · `#research` · `#recognition` · `#contact` |
| `/work/<slug>` | One page per project, with every drawing sheet |

The old addresses `/urban-planning`, `/business-development` and `/contact` redirect to the matching section (`netlify.toml`).

## Run it

Needs Node.js 22 or newer.

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:3000.

| Command | What it does |
|---|---|
| `npm run dev` | Live preview while editing |
| `npm run build` | Writes the finished site to `out/`, then scans it for anything private |
| `npm run portrait` | Re-crops the hero portrait from `content/originals/photo/fahad-cutout.png` |
| `node scripts/make-cards.mjs` | Remakes the portfolio card images (each project's sheet with blank margins trimmed) |

## Where things are

```
content/data/      every fact (roles, projects, research, certificates, metrics, contact) + copy.ts (hero and captions)
content/docs/      the content record: v1 text, sources, corrected figures and privacy rules
content/originals/ private originals — never committed or published
public/media/      web-ready images (drawings already redacted)
src/app/           pages and the one stylesheet (globals.css — colours and type at the top)
src/components/    header, footer and one file per home-page section
```

## Changing content

- **Any fact:** edit the file in `content/data/`. Items with `verified: false` or a `TODO` never appear.
- **Hero words, captions:** `content/data/copy.ts`.
- **Add a project:** add its images under `public/media/projects/<slug>/` and to `content/data/media.generated.json`,
  then copy one object in `content/data/projects.ts`. Add it to `scripts/make-cards.mjs` and run it for a trimmed card image,
  and place it in a row of `ROWS` in `src/components/sections/Work.tsx` (unplaced projects are added in pairs at the end).
- **Portfolio grid:** each row's cards take widths in proportion to their images, so every image is shown whole at one shared
  height. Two or three per row works best; a portrait sheet pairs well with a landscape one.
- **Current role:** in `content/data/experience.ts`, give the old role an end month and add the new one with `end: "present"`.

## Deploying

Netlify reads `netlify.toml` (build `npm run build`, publish `out`). For a custom domain, change `domain` in
`content/data/site.ts` and rebuild.
