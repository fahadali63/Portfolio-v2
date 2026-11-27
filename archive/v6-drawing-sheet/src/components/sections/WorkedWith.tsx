import { copy } from "@content/copy.ts";
import { organisations, roles } from "@content/index.ts";
import type { Track } from "@content/schema.ts";
import { ArrowUpRight } from "lucide-react";
import { Block, noDot, TitleBlock } from "@/components/Sheet";

const groups: { track: Track; label: string; href: string; code: string }[] = [
  { track: "planning", label: "Urban planning and GIS", href: "/planning", code: "P-01" },
  { track: "business", label: "Business development", href: "/business", code: "B-01" },
];

/** Organisations, split by career: what each does, the roles held there, and a link to its site. */
export function WorkedWith() {
  return (
    <>
      <TitleBlock code="G-04" title={copy.workedWith.title} lead={<p>{noDot(copy.workedWith.caption)}.</p>} meta={[{ label: "Organisations", value: String(organisations.length) }]} />
      {groups.map(({ track, label, href, code }) => (
        <Block
          key={track}
          id={`orgs-${track}`}
          track={track}
          title={label}
          action={
            <a className="text-link" href={href}>
              {code} Experience in detail
            </a>
          }
        >
          <ul className="orgs">
            {organisations
              .filter((o) => o.track === track)
              .map((o) => {
                const held = roles.filter((r) => r.org === o.slug).map((r) => r.title);
                return (
                  <li key={o.slug} className="org">
                    <div>
                      <h3 className="org__name">{o.name}</h3>
                      <p className="meta">{o.kind}</p>
                    </div>
                    <p className="org__roles">{held.join(" · ")}</p>
                    {o.url ? (
                      <a className="text-link org__link" href={o.url} target="_blank" rel="noopener">
                        {o.urlLabel} <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
                        <span className="visually-hidden"> (opens in new tab)</span>
                      </a>
                    ) : (
                      <span className="meta org__link">No public website</span>
                    )}
                  </li>
                );
              })}
          </ul>
        </Block>
      ))}
    </>
  );
}
