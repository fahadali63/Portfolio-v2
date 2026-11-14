import { contact } from "@content/contact.ts";
import { businessMetrics, certificationsFor, engagements, homeHighlights, projects, research, rolesFor } from "@content/index.ts";
import { careerPages } from "@content/pages.ts";
import type { Track } from "@content/schema.ts";
import { site } from "@content/site.ts";
import { businessSkills, planningSkills } from "@content/skills.ts";
import { ArrowRight, ArrowUpRight, BriefcaseBusiness, Download, Map, Plus } from "lucide-react";
import { NavIcon } from "@/components/shell/NavIcon";
import type { NavIcon as IconName } from "@/components/shell/nav";
import { ContactStrip } from "./Home";
import { Experience } from "./Experience";
import { Recognition } from "./Recognition";

type Deeper = { href: string; label: string; note: string; icon: IconName };

/**
 * One career, top to bottom in the order a recruiter reads: what he does → the résumé → the numbers →
 * what he is good at → where he did it → the proof → how to reach him. Nothing from the other career.
 */
export function Career({ track }: { track: Track }) {
  const t = site.tracks[track];
  const page = careerPages[track];
  const resume = contact.resumes.find((r) => r.track === track)!;
  const Icon = track === "planning" ? Map : BriefcaseBusiness;
  const roles = rolesFor(track);
  const skills = track === "planning" ? planningSkills : businessSkills;

  const numbers =
    track === "planning"
      ? [
          ...homeHighlights.filter((m) => m.track === "planning").map((m) => ({ value: m.value, label: m.label, note: m.qualifier })),
          { value: String(projects.length), label: "Projects in the portfolio", note: "Master plans, urban design, GIS and CAD" },
          { value: String(roles.length), label: "Planning & GIS roles", note: "Public sector, consultants and a developer" },
        ]
      : businessMetrics.map((m) => ({ value: m.value, label: m.label, note: m.qualifier }));

  const deeper: Deeper[] =
    track === "planning"
      ? [
          { href: "/portfolio", label: "Portfolio", note: `${projects.length} projects, every drawing sheet`, icon: "map" },
          { href: "/research", label: "Research", note: `${research.length} coursework reports, UET Lahore`, icon: "book" },
          { href: "/certificates", label: "Certificates", note: `${certificationsFor("planning").length} certificates, letters and awards`, icon: "award" },
        ]
      : [
          { href: "/results", label: "Results", note: "Monthly targets against locked revenue", icon: "chart" },
          { href: "/engagements", label: "Engagements", note: `${engagements.length} wins, client names withheld`, icon: "handshake" },
          { href: "#awards", label: "Awards", note: `${certificationsFor("business").length} recognitions from Ideas Animation Studio`, icon: "award" },
        ];

  return (
    <>
      <section className="panel career-head" aria-labelledby="career-title" data-track={track}>
        <p className="eyebrow track-tag">
          <Icon size={13} strokeWidth={2} aria-hidden="true" /> {page.label}
        </p>
        <h1 id="career-title" className="display career-head__title">
          <span className="shine">{t.headline}</span>
        </h1>
        <p className="career-head__role">{t.title}</p>
        <p className="career-head__summary">{t.summary}</p>
        <p className="btn-row">
          <a className="btn-solid" href={resume.file} download={resume.download}>
            <Download size={17} strokeWidth={1.9} aria-hidden="true" /> Download résumé
            <span className="btn-solid__meta">PDF</span>
          </a>
          <a className="btn-ghost" href={page.proof.href}>
            {page.proof.label} <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
          </a>
        </p>
      </section>

      <ul className="numbers" aria-label="Key numbers">
        {numbers.map((n) => (
          <li key={n.label} className="panel number reveal" data-track={track}>
            <p className="number__value display">{n.value}</p>
            <p className="number__label">{n.label}</p>
            <p className="small">{n.note}</p>
          </li>
        ))}
      </ul>

      <section className="panel" aria-labelledby="expertise-title">
        <div className="panel-head">
          <h2 id="expertise-title" className="display h2">
            <span className="shine">{page.expertiseTitle}</span>
          </h2>
        </div>
        <ul className="expertise">
          {skills.expertise.map((e, i) => (
            <li key={e.title} className="inner">
              <span className="expertise__num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="expertise__title">{e.title}</h3>
              <p className="small">{e.detail}</p>
            </li>
          ))}
        </ul>
        <div className="folds" data-accordion>
          <details className="fold">
            <summary>
              Skills
              <span className="fold__toggle" aria-hidden="true">
                <Plus size={16} strokeWidth={2} />
              </span>
            </summary>
            <div className="fold__body">
              {"groups" in skills ? (
                skills.groups.map((g) => (
                  <div key={g.name} className="chip-group">
                    <p className="label">{g.name}</p>
                    <ul className="chips">
                      {g.items.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <ul className="chips">
                  {skills.skills.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              )}
            </div>
          </details>
          <details className="fold">
            <summary>
              Software &amp; tools
              <span className="fold__toggle" aria-hidden="true">
                <Plus size={16} strokeWidth={2} />
              </span>
            </summary>
            <div className="fold__body">
              <ul className="chips">
                {skills.tools.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </details>
          {"achievements" in skills && (
            <details className="fold">
              <summary>
                Awards
                <span className="fold__toggle" aria-hidden="true">
                  <Plus size={16} strokeWidth={2} />
                </span>
              </summary>
              <div className="fold__body">
                <ul className="bullets">
                  {skills.achievements.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            </details>
          )}
        </div>
      </section>

      <Experience track={track} title={page.experienceTitle} caption="Newest first. Open a role for what I did there." />

      <section className="deeper" aria-labelledby="deeper-title">
        <h2 id="deeper-title" className="step-label">
          {page.deeperTitle}
        </h2>
        <ul className="deeper__grid">
          {deeper.map((d) => (
            <li key={d.href}>
              <a href={d.href} className="panel link-card" data-track={track}>
                <span className="link-card__icon" aria-hidden="true">
                  <NavIcon name={d.icon} size={20} />
                </span>
                <span className="link-card__title display">{d.label}</span>
                <span className="small">{d.note}</span>
                <ArrowUpRight size={18} strokeWidth={1.9} aria-hidden="true" className="link-card__arrow" />
              </a>
            </li>
          ))}
        </ul>
      </section>

      {track === "business" && <Recognition track="business" id="awards" />}

      <ContactStrip title={t.closing} lead="Email is fastest. LinkedIn and WhatsApp work too." />
    </>
  );
}
