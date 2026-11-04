import { copy } from "@content/copy.ts";
import { homeHighlights, roles } from "@content/index.ts";
import { site } from "@content/site.ts";
import { businessSkills, planningSkills } from "@content/skills.ts";
import { TrackFilter } from "@/components/shell/TrackFilter";
import { ArrowRight, BriefcaseBusiness, Map, Sparkles } from "lucide-react";

/** Hero card + portrait card, the numbers, availability, and a ticker of what Fahad does. */
export function Hero() {
  const [a, b, c] = copy.headline;
  const now = roles.find((r) => r.end === "present");
  const [s1, s2, s3, s4] = homeHighlights;
  const ticker = [...planningSkills.expertise.slice(0, 4), ...businessSkills.expertise.slice(0, 4)].map((e) => e.title);
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__grid">
        <div className="mcard hero__card">
          <p className="eyebrow">
            <Sparkles size={12} strokeWidth={2} aria-hidden="true" /> Town planning &amp; business development
          </p>
          <h1 id="hero-title" className="hero__title">
            {a}
            <br />
            {b}
            <br />
            {c}.
          </h1>
          <p className="hero__intro">{copy.intro}</p>
          <div className="hero__cta">
            <a href="/contact" className="btn btn--dark">
              <ArrowRight size={16} strokeWidth={2} aria-hidden="true" /> Let&apos;s talk
            </a>
            <a href="/portfolio" className="btn btn--line">
              See my work
            </a>
          </div>
        </div>
        <div className="mcard hero__photo">
<picture>
            <source type="image/avif" srcSet="/media/portrait/fahad-photo-sm.avif 540w, /media/portrait/fahad-photo.avif 1086w" sizes="(min-width: 960px) 40vw, 100vw" />
            <img src="/media/portrait/fahad-photo.webp" srcSet="/media/portrait/fahad-photo-sm.webp 540w, /media/portrait/fahad-photo.webp 1086w" sizes="(min-width: 960px) 40vw, 100vw" alt={site.photoAlt} width={1086} height={1448} fetchPriority="high" />
          </picture>
        </div>
      </div>

      <ul className="stat-grid" aria-label="Highlights">
        {[s1, s2, s3, s4].filter((m): m is NonNullable<typeof m> => !!m).map((m, i) => (
          <li key={m.slug} className={`mcard stat stat--${i + 1}`} data-track={m.track}>
            <p className="eyebrow">
              {m.track === "planning" ? <Map size={12} strokeWidth={2} aria-hidden="true" /> : <BriefcaseBusiness size={12} strokeWidth={2} aria-hidden="true" />}
              {m.track === "planning" ? "Planning" : "Business"}
            </p>
            <p className="stat__value">{m.value}</p>
            <p className="stat__label">{m.label}</p>
          </li>
        ))}
        <li className="mcard mcard--dark stat stat--now">
          <p className="eyebrow">Availability</p>
          <p className="stat__value">Now</p>
          <p className="stat__label">
            {now ? `${now.title} at ${now.orgName}` : site.availability}
          </p>
          <p className="stat__status">
            <span className="status-dot" aria-hidden="true" /> {site.availabilityShort}
          </p>
        </li>
      </ul>

      <div className="ticker" aria-label="What I do">
        <ul className="ticker__track">
          {[...ticker, ...ticker].map((t, i) => (
            <li key={i} aria-hidden={i >= ticker.length ? "true" : undefined}>
              {t}
            </li>
          ))}
        </ul>
      </div>

      <div className="hero__filter">
        <span>Show work from</span>
        <TrackFilter />
      </div>
    </section>
  );
}
