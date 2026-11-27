import { site } from "@content/site.ts";

/**
 * The Shortcut identity, from the Fahad Ali brand kit (github.com/fahadali63/fahadbrandkit).
 * The logo files in public/brand are the kit's own artwork; nothing here redraws or retypes the mark.
 */

/** The horizontal lockup. The ink theme shows the mustard version, the mustard theme the ink version. */
export function Logo({ height = 32, className = "" }: { height?: number; className?: string }) {
  const width = Math.round((759 / 210) * height);
  return (
    <span className={`logo ${className}`} style={{ height }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="logo__img logo__img--dark" src="/brand/lockup-on-dark.svg" alt={site.name} width={width} height={height} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="logo__img logo__img--light" src="/brand/lockup-color.svg" alt="" aria-hidden="true" width={width} height={height} />
    </span>
  );
}

/** The f alone, for places where the name is already on the page. */
export function Symbol({ size = 28, className = "" }: { size?: number; className?: string }) {
  const width = Math.round((410 / 496) * size);
  return (
    <span className={`logo ${className}`} style={{ height: size }} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="logo__img logo__img--dark" src="/brand/symbol-on-dark.svg" alt="" width={width} height={size} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="logo__img logo__img--light" src="/brand/symbol-color.svg" alt="" width={width} height={size} />
    </span>
  );
}

/** The kit's stroke geometry: pressed at the start, lifting and tapering at the end. */
function strokePath(w: number, t: number) {
  const a: [number, number][] = [];
  const b: [number, number][] = [];
  const n = 40;
  const x0 = t / 2;
  const y0 = t * 1.6;
  const x1 = w - t / 2;
  const y1 = t * 0.6;
  for (let i = 0; i <= n; i++) {
    const s = i / n;
    const dx = x1 - x0;
    const dy = y1 - y0;
    const len = Math.sqrt(dx * dx + dy * dy);
    const nx = -dy / len;
    const ny = dx / len;
    const bend = Math.sin(s * Math.PI) * len * 0.04;
    const cx = x0 + dx * s + nx * bend;
    const cy = y0 + dy * s + ny * bend;
    const ww = t * (0.55 + 0.45 * Math.sin((Math.min(1, s * 1.4 + 0.15) * Math.PI) / 2)) * (1 - 0.55 * Math.pow(s, 3));
    a.push([cx + (nx * ww) / 2, cy + (ny * ww) / 2]);
    b.push([cx - (nx * ww) / 2, cy - (ny * ww) / 2]);
  }
  const pts = a.concat(b.reverse());
  return "M" + pts.map((q) => `${q[0].toFixed(1)} ${q[1].toFixed(1)}`).join(" L") + "Z";
}

/**
 * The shortcut stroke: the red desire line. The brand allows one per view, so pages use it once, under the
 * main headline. It draws itself in once on load (see .stroke in brand.css).
 */
export function ShortcutStroke({ width = 240, thickness = 12, className = "" }: { width?: number; thickness?: number; className?: string }) {
  const h = thickness * 2.4;
  return (
    <svg className={`stroke ${className}`} viewBox={`0 0 ${width} ${h}`} width={width} height={h} aria-hidden="true" focusable="false">
      <path d={strokePath(width, thickness)} />
      <circle cx={thickness / 2} cy={thickness * 1.6} r={thickness * 0.5} />
    </svg>
  );
}
