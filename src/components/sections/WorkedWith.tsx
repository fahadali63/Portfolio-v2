import { copy } from "@content/copy.ts";
import { organisations } from "@content/index.ts";
import { ArrowUpRight, Building2, Clapperboard, Cog, Globe, Landmark, Layers, Map, type LucideIcon } from "lucide-react";

/** A plain icon for the kind of organisation — never a stand-in for its real logo. */
const kindIcon: Record<string, LucideIcon> = {
  innotec: Cog,
  "ideas-animation": Clapperboard,
  "the-spatio": Layers,
  lda: Landmark,
  "union-associates": Map,
  "al-akbari": Building2,
  "spider-marketing": Globe,
};

export function WorkedWith({ level = 2 }: { level?: 1 | 2 } = {}) {
  const H = level === 1 ? "h1" : "h2";
  return (
    <section id="worked-with" className="section trusted" aria-labelledby="worked-title">
      <div className="section-head section-head--small">
        <H id="worked-title" className="display h3">
          {copy.workedWith.title}
        </H>
        <p className="small">{copy.workedWith.caption}</p>
      </div>
      <ul className="grid-cells">
        {organisations.map((o) => {
          const Icon = kindIcon[o.slug] ?? Globe;
          return (
            <li key={o.slug} data-track={o.track}>
              <span className="org">
                <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                {o.name}
              </span>
            </li>
          );
        })}
        <li>
          <a className="org" href="/contact">
            {copy.workedWith.next}
            <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
          </a>
        </li>
      </ul>
    </section>
  );
}
