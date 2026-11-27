import { copy } from "@content/copy.ts";
import { certificationsFor } from "@content/index.ts";
import { media } from "@content/media.ts";
import type { Certificate, Track } from "@content/schema.ts";
import { Img } from "@/components/Img";
import { Block } from "@/components/Sheet";
import { Award, FileLock } from "lucide-react";

function Doc({ c }: { c: Certificate }) {
  const meta = [c.issuer, c.date].filter(Boolean).join(" · ");
  return (
    <li className="doc">
      {c.publicPreview && c.image ? (
        <a className="doc__frame" href={media(c.image).src} data-lightbox data-title={c.title} data-alt={c.imageAlt} aria-label={`View certificate: ${c.title}`}>
          <Img id={`${c.image}-tile`} alt={c.imageAlt ?? c.title} />
        </a>
      ) : (
        <div className="doc__frame doc__frame--empty">
          {c.publicPreview ? <Award size={20} strokeWidth={1.5} aria-hidden="true" /> : <FileLock size={20} strokeWidth={1.5} aria-hidden="true" />}
          <span>{c.publicPreview ? (c.kind === "recognition" ? "Recognition" : "Award") : copy.recognition.noPreview}</span>
        </div>
      )}
      <h3 className="doc__title">{c.title}</h3>
      <p className="meta">{meta}</p>
    </li>
  );
}

/** The certificates of one career. Planning letters and business awards never share a page. */
export function Recognition({ track, id = "recognition" }: { track: Track; id?: string }) {
  const planning = track === "planning";
  return (
    <Block
      id={id}
      track={track}
      title={planning ? "Certificates, letters and awards" : "Awards"}
      caption={planning ? copy.recognition.caption : "From Ideas Animation Studio"}
    >
      <ul className="docs">
        {certificationsFor(track).map((c) => (
          <Doc key={c.slug} c={c} />
        ))}
      </ul>
    </Block>
  );
}
