import { copy } from "@content/copy.ts";
import { organisations, roles } from "@content/index.ts";
import type { Track } from "@content/schema.ts";
import { ArrowUpRight, BriefcaseBusiness, Building2, Clapperboard, Cog, Globe, Landmark, Layers, Map, type LucideIcon } from "lucide-react";

/** A plain icon for the kind of organisation, never a stand-in for its real logo. */
const kindIcon: Record<string, LucideIcon> = {
  innotec: Cog,
  "ideas-animation": Clapperboard,
  "the-spatio": Layers,
  lda: Landmark,
  "union-associates": Map,
  "al-akbari": Building2,
  "spider-marketing": Globe,
};

const groups: { track: Track; label: string; Icon: LucideIcon; href: string }[] = [
  { track: "planning", label: "Urban Planning & GIS", Icon: Map, href: "/planning" },
  { track: "business", label: "Business Development", Icon: BriefcaseBusiness, href: "/business" },
];

/** Organisations, split by career, each with what it does, the roles held there and a link out. */
export function WorkedWith({ level = 2 }: { level?: 1 | 2 } = {}) {
  const H = level === 1 ? "h1" : "h2";
  return (
    <>
      <section className="panel page-head" aria-labelledby="worked-title">
        <H id="worked-title" className="display page-head__title">
          <span className="shine">{copy.workedWith.title}</span>
        </H>
        <p className="page-head__lead">{copy.workedWith.caption}</p>
      </section>
      {groups.map(({ track, label, Icon, href }) => (
        <section key={track} className="panel" aria-labelledby={`orgs-${track}`} data-track={track}>
          <div className="panel-head">
            <h2 id={`orgs-${track}`} className="eyebrow track-tag">
              <Icon size={13} strokeWidth={2} aria-hidden="true" /> {label}
            </h2>
            <a className="text-link" href={href}>
              Experience in detail <ArrowUpRight size={15} strokeWidth={1.9} aria-hidden="true" />
            </a>
          </div>
          <ul className="orgs">
            {organisations
              .filter((o) => o.track === track)
              .map((o) => {
                const OrgIcon = kindIcon[o.slug] ?? Globe;
                const held = roles.filter((r) => r.org === o.slug).map((r) => r.title);
                const body = (
                  <>
                    <span className="org-card__icon" aria-hidden="true">
                      <OrgIcon size={20} strokeWidth={1.7} />
                    </span>
                    <span className="org-card__name">{o.name}</span>
                    <span className="small">{o.kind}</span>
                    <span className="org-card__roles">{held.join(" · ")}</span>
                    {o.url && (
                      <span className="org-card__link">
                        {o.urlLabel} <ArrowUpRight size={15} strokeWidth={1.9} aria-hidden="true" />
                        <span className="visually-hidden"> (opens in new tab)</span>
                      </span>
                    )}
                  </>
                );
                return (
                  <li key={o.slug}>
                    {o.url ? (
                      <a className="inner org-card" href={o.url} target="_blank" rel="noopener">
                        {body}
                      </a>
                    ) : (
                      <div className="inner org-card">{body}</div>
                    )}
                  </li>
                );
              })}
          </ul>
        </section>
      ))}
    </>
  );
}
