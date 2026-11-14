import { copy } from "@content/copy.ts";
import { certificationsFor } from "@content/index.ts";
import { media } from "@content/media.ts";
import type { Certificate, Track } from "@content/schema.ts";
import { Img } from "@/components/Img";
import { Award, FileLock } from "lucide-react";

function Doc({ c }: { c: Certificate }) {
  const meta = [c.issuer, c.date].filter(Boolean).join(" · ");
  return (
    <li className="doc">
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

/** The certificates of one career. Planning letters and business awards never share a page. */
export function Recognition({ track, level = 2, id = "recognition" }: { track: Track; level?: 1 | 2; id?: string }) {
  const H = level === 1 ? "h1" : "h2";
  const list = certificationsFor(track);
  const planning = track === "planning";
  return (
    <section id={id} className="section panel" aria-labelledby={`${id}-title`} data-track={track}>
      <div className="section-head">
        <H id={`${id}-title`} className="display h2">
          <span className="shine">{planning ? copy.recognition.planningTitle : copy.recognition.businessTitle}</span>
        </H>
        <p className="small">{planning ? copy.recognition.caption : "Ideas Animation Studio"}</p>
      </div>
      <ul className={`docs${planning ? "" : " docs--three"}`}>
        {list.map((c) => (
          <Doc key={c.slug} c={c} />
        ))}
      </ul>
    </section>
  );
}
