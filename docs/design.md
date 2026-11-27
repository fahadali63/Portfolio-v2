# Portfolio v7 — the brand kit applied in full (27 Nov 2026)

The brand below now drives the whole site: the kit's logo lockups (`public/brand/`), card layout and tokens in
`src/app/brand.css`, the logo and shortcut stroke in `src/components/Brand.tsx`. The glass layout and `BrandMark.tsx`
mentioned below were replaced; the v6 drawing-sheet design is archived in `archive/v6-drawing-sheet/`.

---

# Brand v6 — "The Shortcut" (22 Nov 2026)

New personal identity, applied on top of the Glass layout (`src/app/glass.css`, token blocks at the top).

- **Logo:** an f whose red crossbar is a desire line (`src/components/BrandMark.tsx`). It sits on a mustard tile in the nav and footer. The favicon is `src/app/icon.svg`.
- **Colour, 60/30/10:** Lahore Mustard `#F2B92B` / Night Ink `#0B0B0C` / Signal Red `#C8102E`.
  - Dark (default): ink page, paper text `#FAF6EC`, mustard accent; planning = mustard, business = coral `#FF5A4E`.
  - Light: mustard page, ink text and buttons; planning = `#5C4300`, business = Red Deep `#8F0B21`. All text is 5.2:1 or better.
- **Type:** Bricolage Grotesque for display, Instrument Sans for body (was Inter).
- **Backdrop:** mustard, mustard-deep and a faint red glow over the survey grid.
- Full brand kit: the `Fahad-Ali-Files` repo.

---

# Design — portfolio v4 "Marigold" (current)

Final look, 18 Oct 2026, from a Showit template reference ("Marigold"): dark brown page (#2B231D) with butter-cream
bento cards (#FCEFB4), 28 px radii, flat (no shadows), heavy condensed caps (Anton) for headlines, Inter for text,
small letter-spaced eyebrows. Light appearance inverts it (cream page, brown cards); dark is the default.

- Cream pill nav with a dark active tab (follows the scroll) · theme toggle · Get in touch
- Hero: eyebrow, "TOWN PLANNER & BUSINESS DEVELOPER.", intro, Let's talk / See my work; portrait cut-out on an ochre card
- Stats: 13 · 2,828 · 100+ · 138% in cream cards + a dark "Now" card (current role, open to roles)
- Ticker of planning and business skills (pauses on hover; static with reduced motion)
- Portfolio, Research, Certificates, Results (with charts), Experience as cream cards; Worked with as a "trusted by" strip
- About: portrait card + text card with chips and "My full story"; footer is a dark card with social icons

Pages: Overview (`/`: hero, stats, ticker, a card per page, contact) · Urban Planning → `/portfolio`, `/research`, `/certificates` · Business → `/results`, `/engagements` · `/experience` · `/worked-with` · `/about` · `/contact`. The nav (`src/components/shell/nav.ts`) mirrors this; groups are dropdowns.

Styles: the MARIGOLD block at the end of `src/app/globals.css` (it overrides the earlier dashboard, clay and layout blocks).

---

# Design — portfolio v4 (clay portfolio)

> **Portfolio layout (18 Oct 2026):** the dashboard chrome (sidebar, search, breadcrumb bar, KPI grid) is gone. A floating clay nav pill, a hero (headline, intro, portrait, CTAs), four clay stats and a career filter lead straight into the work. The sales chart and conversion rings now live in Results. Styles: the PORTFOLIO LAYOUT block at the end of `globals.css`.

> **Claymorphism finish (18 Oct 2026):** same layout, but surfaces are soft raised clay — paired light/dark outer shadows plus inner highlights, 22–28 px radii, no ink outlines; fields and image wells are pressed in; the sidebar floats as a clay panel. All of it is the `CLAY` block at the end of `src/app/globals.css` (delete that block to return to the bordered look). Increased-contrast mode adds outlines back.

Rebuilt 18 Oct 2026 from a SaaS dashboard reference ("retro"): white surfaces, 1.5 px ink borders, 6 px radii,
peach fills, tan / brown / orange charts, Inter. Light and dark appearance (tokens at the top of `src/app/globals.css`).

| Reference element | Here |
| --- | --- |
| Logo square + name | "fa." on a peach square + Fahad Ali |
| Search bar | Real site search over projects, research, roles, certificates (`/` focuses it) |
| Sun icon | Light / dark toggle (remembers; follows the system until chosen) |
| Bell, avatar, Logout | No fake notifications; avatar links to About; "Email me" |
| Workspace dropdown | Career filter: Both careers / Urban Planning / Business Development (hides the other career everywhere) |
| Breadcrumb | Follows the section in view |
| Export / New report | "Save as PDF" (prints a clean CV via the print stylesheet) / "Get in touch" |
| Sidebar user card, Profile / Gifts / Support | Photo + name; Profile / CV / Contact |
| Sidebar nav with sub-items and count badge | Overview · Urban Planning (Portfolio, Research, Certificates) · Business (Results, Engagements) · Experience (9) · Worked with · About; footer: LinkedIn, WhatsApp, Email me |
| KPI cards with +/- deltas | 13 districts · 2,828 acres · 100+ projects · 138% — tagged with their career instead of invented deltas |
| Sales bar chart | Monthly target vs. locked revenue, Jul–Dec 2025 (real data, table in Results) |
| Quarterly goals rings | Conversion & targets: 100% (Oct 2025), 80%+ overall, 3 of 6 months at/above target |

Below the overview every section is a bordered card. The portfolio keeps the v3 rule: each card's width follows its
image's proportions, so drawings are shown whole and never cropped.

---

# Design — portfolio v3

Built from the reference shot supplied on 18 Oct 2026 (a one-page designer portfolio: "Hey. I'm Solt, A UI/UX & Brand Designer").
Measurements below are taken from the shot (card 610 px wide) and scaled ×1.97 to a 1200 px page.

## What the reference is made of

| Element | Reference | Here |
| --- | --- | --- |
| Page | Light warm-grey sheet (`#D9DAD5`) on a darker grey ground (`#BFC1BC`), square corners, no shadows, no gradients | Same. The sheet is 1200 px max; below that it fills the screen |
| Type — display | Tall condensed caps (Bebas Neue): logo, headline, section titles, card titles, labels | Bebas Neue 400 |
| Type — text | Condensed serif (Instrument Serif), with its *italic* for one word in the headline | Instrument Serif 400 + italic |
| Type — logos | Grey geometric sans in the logo grid | System sans, 600 |
| Colour | Ink `#1E1E1C`, greys for secondary text, hairlines `#C4C5C0`. No accent colour at all | Same; secondary grey darkened to `#55574F` so small text passes 4.5:1 |
| Header | `● NAME` left, dark pill `MENU ≡` right | `● FAHAD ALI`, menu pill opens a full list of sections |
| Hero | 3 columns: greeting + 3-line headline (caps / *italic serif* / caps) + paragraph + dark pill button with white arrow disc · portrait in an arch (flat top flush with the page edge, fully round bottom) · four right-aligned stats | "Hey. I'm Fahad," · TOWN PLANNER / *& Business* / DEVELOPER · portrait cut-out on a grey studio arch · 13 · 2,828 · 100+ · 138% |
| Capability strip | 4 columns divided by vertical hairlines, caps title + one-line serif description | Two planning and two business capabilities |
| Trusted by | Small caps title, caption on the right half, 4 × 2 grid of bordered cells with grey logos | "Worked with": the seven organisations (named, with a plain icon — never a fake logo) and an eighth cell that asks "Your team next?" |
| About | Big 3-line caps title left; serif lead + grey serif paragraphs right | "Two careers, one way of working." + the v1 About text, plus education / languages / base |
| Portfolio | Big caps title + caption; wide rounded image card; under it: caps title, one-line description, year, dark tag pill | A bento grid of all nine projects. In each row, card widths follow the images' own proportions, so every sheet is shown whole (blank margins trimmed) at one shared height. Rows: master plan + portrait housing layout · industrial estate + TOD · two CAD sets · three GIS maps. Same caption style under each card; each opens its own page |

## Extended in the same language (not shown in the reference)

- **Experience** — rows divided by hairlines: dates · caps role title + organisation · track pill; a row expands to its bullet points.
- **Results** — bordered 4-cell metric grid (like the logo grid), a monochrome bar chart of monthly attainment against a dashed 100 % line, and engagement rows with the value in a dark pill.
- **Research** — numbered rows that expand to the summary.
- **Recognition** — documents on a white mat in a 4-column grid; letters that show a national ID number get a plain "No public preview" card.
- **Contact** — big caps "Let's talk." with list rows for each way to reach him.
- **Project pages** (`/work/<slug>`) — big caps title, a 4-column fact strip, the text, then every drawing sheet full width on a white mat.

## Rules kept from the content record

Facts, credits and privacy rules come from `content/docs/conflicts.md`. Small text never goes below 14 px or under 4.5:1 contrast;
everything works without JavaScript (the menu and expanding rows use native `<details>`); reduced motion turns off the
one entrance animation.
