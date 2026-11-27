import { cta } from "@content/pages.ts";

/**
 * The primary action. At rest: an envelope and "Get in touch". On hover or focus the label swaps and the
 * envelope loops: flap opens, the letter lifts out and tilts, a spark pops, it drops back and the flap shuts.
 * All CSS (see `.cta` in site.css); stays still when the visitor prefers reduced motion.
 */
export function MailCta({ href = "/contact", block = false, rest = cta.rest, hover = cta.hover }: { href?: string; block?: boolean; rest?: string; hover?: string }) {
  return (
    <a href={href} className={`cta${block ? " cta--block" : ""}`} aria-label={rest}>
      <span className="cta__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path className="cta__flap" d="M3 10l9 6 9-6" />
          <g className="cta__letter">
            <rect x="6" y="6.5" width="12" height="11" rx="1.5" />
            <path d="M9 10h6M9 13h4" />
          </g>
          <path className="cta__body" d="M3 10v8.5A2.5 2.5 0 0 0 5.5 21h13a2.5 2.5 0 0 0 2.5-2.5V10l-9 6z" />
          <path className="cta__spark" d="M19 1.5v3M17.5 3h3" />
        </svg>
      </span>
      <span className="cta__text" aria-hidden="true">
        <span className="cta__rest">{rest}</span>
        <span className="cta__hover">{hover}</span>
      </span>
    </a>
  );
}
