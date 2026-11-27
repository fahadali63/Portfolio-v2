import { media } from "@content/media.ts";
import type { CSSProperties } from "react";

type Props = {
  /** media id from content/data/media.generated.json, e.g. "projects/fa-avenue-1/tile" */
  id: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  style?: CSSProperties;
  className?: string;
};

/** AVIF with a WebP fallback, explicit size (no layout shift), lazy unless priority. */
export function Img({ id, alt, priority, style, className }: Props) {
  const m = media(id);
  return (
    <picture>
      <source type="image/avif" srcSet={m.avif} />
      <img
        src={m.src}
        alt={alt}
        width={m.width}
        height={m.height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : undefined}
        style={style}
        className={className}
      />
    </picture>
  );
}
