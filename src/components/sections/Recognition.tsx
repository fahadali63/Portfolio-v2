import { copy } from "@content/copy.ts";
import { certificationsFor } from "@content/index.ts";
import { media } from "@content/media.ts";
import type { Certificate } from "@content/schema.ts";
import { Img } from "@/components/Img";
import { Award, FileLock } from "lucide-react";

function Doc({ c }: { c: Certificate }) {
  const meta = [c.issuer, c.date].filter(Boolean).join(" · ");
  return (
    <li className="doc" data-track={c.track}>
      {c.publicPreview && c.image ? (
        <a
          className="doc__frame"
          href={media(c.image).src}
          data-lightbox
          data-title={c.title}
          data-alt={c.imageAlt}
          aria-label={`View certificate: ${c.title}`}
        >
          <Img id={`${c.image}-tile`} alt={c.imageAlt ?? c.title} />
        </a>
      ) : c.publicPreview ? (
        <div className="doc__frame doc__frame--none">
          <Award size={28} strokeWidth={1.5} aria-hidden="true" style={{ justifySelf: "center" }} />
          <span className="label" style={{ fontSize: "1rem" }}>
            {c.kind === "recognition" ? "Recognition" : "Award"}
          </span>
        </div>
      ) : (
        <div className="doc__frame doc__frame--none">
          <FileLock size={28} strokeWidth={1.5} aria-hidden="true" style={{ justifySelf: "center" }} />
          <span className="label" style={{ fontSize: "1rem" }}>
            {copy.recognition.noPreview}
          </span>
        </div>
      )}
      <h4 className="doc__title">{c.title}</h4>
      <p className="small">{meta}</p>
    </li>
  );
}

export function Recognition({ level = 2 }: { level?: 1 | 2 } = {}) {
  const H = level === 1 ? "h1" : "h2";
  const planning = certificationsFor("planning");
  const business = certificationsFor("business");
  return (
    <section id="recognition" className="section" aria-labelledby="recognition-title">
      <div className="section-head">
        <H id="recognition-title" className="display h2">
          {copy.recognition.title}
        </H>
        <p className="small">{copy.recognition.caption}</p>
      </div>

      <h3 className="display h3" style={{ marginBottom: 16 }} data-track="planning">
        {copy.recognition.planningTitle}
      </h3>
      <ul className="docs" data-track="planning">
        {planning.map((c) => (
          <Doc key={c.slug} c={c} />
        ))}
      </ul>

      <div className="sub-head" data-track="business">
        <h3 className="display h3">{copy.recognition.businessTitle}</h3>
        <p className="small">Ideas Animation Studio</p>
      </div>
      <ul className="docs docs--three" data-track="business">
        {business.map((c) => (
          <Doc key={c.slug} c={c} />
        ))}
      </ul>
    </section>
  );
}
