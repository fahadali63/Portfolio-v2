# Fahad Ali — portfolio content

Content kept from portfolio v2 (removed 18 Oct 2026). The v3 site reads it from here.

| Folder | What it holds |
| --- | --- |
| `data/` | All site text and facts as TypeScript (`copy.ts` holds the v3 hero and captions): `site.ts` (positioning, about, headlines, SEO), `experience.ts`, `education.ts`, `skills.ts`, `projects.ts`, `research.ts`, `certifications.ts`, `metrics.ts`, `engagements.ts`, `contact.ts`. Each item records its `source` and whether it is `verified`. `schema.ts` describes the shapes; `media.generated.json` lists image sizes. |
| `docs/` | `previous-site-extract.md` (full text of the v1 site), `content-inventory.md` (every fact with its source), `conflicts.md` (figures already corrected, privacy rules, decisions), `assets.md` (every image/PDF and whether it may be shown). |
| `originals/` | Private originals: drawing PDFs, research reports, certificates, résumés, the portrait photo. **Never publish this folder.** |
| `../public/media/` | Images ready for the web (moved there so the site can serve them): project drawing pages (title blocks cropped; roll numbers and phone numbers painted out), certificate previews, portrait, research image. |

## Rules carried over (see `docs/conflicts.md`)

- The v1 site (fahadalicv.netlify.app) is the source of truth for facts; do not reintroduce older figures (e.g. 3,000 acres → 2,828; ~1,800 sq ft → 1,716).
- Letters that show the national ID number (The Spatio, The Union Associates, Al-Akbari) are listed without any preview.
- Only the portfolio Drive folder may be linked as a folder; never the root Drive folder.
- City and country only; one phone number; business client names withheld; no roll numbers.
