import { copy } from "@content/copy.ts";
import { education, languages } from "@content/education.ts";
import { site } from "@content/site.ts";
import { ArrowRight, UserRound } from "lucide-react";

export function About({ level = 2 }: { level?: 1 | 2 } = {}) {
  const H = level === 1 ? "h1" : "h2";
  const [fieldwork, business, habit] = site.about.paragraphs;
  return (
    <section id="about" className="about-grid" aria-labelledby="about-title">
      <div className="mcard about__photo">
  <picture>
          <source type="image/avif" srcSet="/media/portrait/fahad-photo-sm.avif 540w, /media/portrait/fahad-photo.avif 1086w" sizes="(min-width: 960px) 40vw, 100vw" />
          <img src="/media/portrait/fahad-photo.webp" srcSet="/media/portrait/fahad-photo-sm.webp 540w, /media/portrait/fahad-photo.webp 1086w" sizes="(min-width: 960px) 40vw, 100vw" alt={site.photoAlt} width={1086} height={1448} loading="lazy" />
        </picture>
      </div>
      <div className="mcard about__body">
        <p className="eyebrow">
          <UserRound size={12} strokeWidth={2} aria-hidden="true" /> About me
        </p>
        <H id="about-title" className="display h2">
          I&apos;m Fahad Ali,
          <br />
          {copy.about.title.replace(/\.$/, "")}.
        </H>
        <p className="about__lead">{habit}</p>
        <p>{fieldwork}</p>
        <p>{business}</p>
        <ul className="chips" aria-label="At a glance">
          <li>{education.degree}</li>
          <li>{education.schoolShort} · {education.period}</li>
          <li>{languages.join(" · ")}</li>
          <li>{site.location}</li>
        </ul>
        <p>
          <a href="/experience" className="btn btn--dark">
            My full story <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
          </a>
        </p>
      </div>
    </section>
  );
}
