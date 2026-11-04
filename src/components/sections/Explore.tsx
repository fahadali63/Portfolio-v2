import { certifications, engagements, organisations, projects, research, roles } from "@content/index.ts";
import { ArrowUpRight, BriefcaseBusiness, Map } from "lucide-react";
import { nav } from "@/components/shell/nav";

const notes: Record<string, string> = {
  "/portfolio": `${projects.length} projects — master plans, urban design, GIS, CAD`,
  "/research": `${research.length} coursework reports, UET Lahore`,
  "/certificates": `${certifications.length} certificates, letters & awards`,
  "/results": "100+ projects closed · 138% best month",
  "/engagements": `${engagements.length} wins, client names withheld`,
  "/experience": `${roles.length} roles across both careers`,
  "/worked-with": `${organisations.length} organisations`,
  "/about": "Two careers, one way of working",
};

/** A card for every page, grouped like the navigation. */
export function Explore() {
  const groups = nav.filter((i) => "children" in i) as { label: string; children: { href: string; label: string }[] }[];
  const singles = nav.filter((i) => !("children" in i) && i.href !== "/") as { href: string; label: string }[];
  return (
    <section className="explore" aria-labelledby="explore-title">
      <h2 id="explore-title" className="visually-hidden">
        Explore
      </h2>
      {groups.map((g) => {
        const track = g.label === "Business" ? "business" : "planning";
        const Icon = track === "planning" ? Map : BriefcaseBusiness;
        return (
          <div key={g.label} className="mcard explore__group" data-track={track}>
            <p className="eyebrow">
              <Icon size={12} strokeWidth={2} aria-hidden="true" /> {g.label}
            </p>
            <ul>
              {g.children.map((c) => (
                <li key={c.href}>
                  <a href={c.href} className="explore__link">
                    <span>
                      <span className="explore__title">{c.label}</span>
                      <span className="small">{notes[c.href]}</span>
                    </span>
                    <ArrowUpRight size={20} strokeWidth={1.75} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
      {singles.map((s) => (
        <a key={s.href} href={s.href} className="mcard explore__single">
          <span className="explore__title">{s.label}</span>
          <span className="small">{notes[s.href]}</span>
          <ArrowUpRight size={20} strokeWidth={1.75} aria-hidden="true" className="explore__arrow" />
        </a>
      ))}
    </section>
  );
}
