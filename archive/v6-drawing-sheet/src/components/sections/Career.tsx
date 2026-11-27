import { contact } from "@content/contact.ts";
import { businessMetrics, certificationsFor, engagements, homeHighlights, projects, research, rolesFor } from "@content/index.ts";
import { careerPages } from "@content/pages.ts";
import type { Track } from "@content/schema.ts";
import { site } from "@content/site.ts";
import { businessSkills, planningSkills } from "@content/skills.ts";
import { ArrowRight, Download, Plus } from "lucide-react";
import { Block, noDot, TitleBlock } from "@/components/Sheet";
import { NavIcon } from "@/components/shell/NavIcon";
import { sheetFor, type NavIcon as IconName } from "@/components/shell/nav";
import { roleDates } from "@/lib/format";
import { ContactStrip } from "./Home";
import { Experience } from "./Experience";
import { Recognition } from "./Recognition";

type Evidence = { href: string; code: string; label: string; note: string; icon: IconName };

/**
 * One career, top to bottom in the order a recruiter reads: what he does and the résumé, the numbers,
 * what he is good at, where he did it, the evidence, how to reach him. Nothing from the other career.
 */
export function Career({ track }: { track: Track }) {
  const t = site.tracks[track];
  const page = careerPages[track];
  const resume = contact.resumes.find((r) => r.track === track)!;
  const roles = rolesFor(track);
  const latest = [...roles].sort((a, b) => (a.end === "present" ? -1 : b.end === "present" ? 1 : 0))[0];
  const skills = track === "planning" ? planningSkills : businessSkills;
  const code = sheetFor(track === "planning" ? "/planning" : "/business").code;

  const numbers =
    track === "planning"
      ? [
          ...homeHighlights.filter((m) => m.track === "planning").map((m) => ({ value: m.value, label: m.label, note: m.qualifier })),
          { value: String(projects.length), label: "Projects in the portfolio", note: "Master plans, urban design, GIS and CAD" },
          { value: String(roles.length), label: "Planning and GIS roles", note: "Public sector, consultants and a developer" },
        ]
      : businessMetrics.map((m) => ({ value: m.value, label: m.label, note: m.qualifier }));

  const evidence: Evidence[] =
    track === "planning"
      ? [
          { href: "/portfolio", code: "P-02", label: "Portfolio", note: `${projects.length} projects, every drawing sheet`, icon: "map" },
          { href: "/research", code: "P-03", label: "Research", note: `${research.length} coursework reports, UET Lahore`, icon: "book" },
          { href: "/certificates", code: "P-04", label: "Certificates", note: `${certificationsFor("planning").length} certificates, letters and awards`, icon: "award" },
        ]
      : [
          { href: "/results", code: "B-02", label: "Results", note: "Locked revenue against monthly targets", icon: "chart" },
          { href: "/engagements", code: "B-03", label: "Engagements", note: `${engagements.length} wins, client names withheld`, icon: "handshake" },
          { href: "#awards", code: "B-01", label: "Awards", note: `${certificationsFor("business").length} recognitions, further down this page`, icon: "award" },
        ];

  return (
    <>
      <TitleBlock
        code={code}
        track={track}
        title={noDot(t.headline)}
        lead={
          <>
            <p className="title-block__role">{t.title}</p>
            <p>{t.summary}</p>
          </>
        }
        meta={latest ? [{ label: latest.end === "present" ? "Current role" : "Latest role", value: `${latest.title}, ${roleDates(latest)}` }] : []}
      >
        <p className="btn-row">
          <a className="btn btn--primary" href={resume.file} download={resume.download}>
            <Download size={16} strokeWidth={1.5} aria-hidden="true" /> Download résumé
            <span className="btn__meta">PDF</span>
          </a>
          <a className="btn btn--secondary" href={page.proof.href}>
            {page.proof.label}
          </a>
        </p>
      </TitleBlock>

      <section className="figures" aria-label={page.numbersTitle} data-track={track}>
        {numbers.map((n) => (
          <div key={n.label} className="figure">
            <p className="figure__label">{n.label}</p>
            <p className="figure__value">{n.value}</p>
            <p className="figure__note">{n.note}</p>
          </div>
        ))}
      </section>

      <Block id="expertise" title={page.expertiseTitle} track={track}>
        <ol className="expertise">
          {skills.expertise.map((e, i) => (
            <li key={e.title}>
              <span className="expertise__num">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="expertise__title">{e.title}</h3>
              <p>{e.detail}</p>
            </li>
          ))}
        </ol>
        <div className="folds folds--inset" data-accordion>
          <details className="fold">
            <summary>
              Skills
              <Plus size={16} strokeWidth={1.5} aria-hidden="true" className="fold__icon" />
            </summary>
            <div className="fold__body">
              {"groups" in skills ? (
                skills.groups.map((g) => (
                  <div key={g.name} className="chip-group">
                    <p className="meta">{g.name}</p>
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
              Software and tools
              <Plus size={16} strokeWidth={1.5} aria-hidden="true" className="fold__icon" />
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
                <Plus size={16} strokeWidth={1.5} aria-hidden="true" className="fold__icon" />
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
      </Block>

      <Experience track={track} title={page.experienceTitle} caption="Newest first. Open a role for what I did there." />

      <Block id="evidence" title={page.deeperTitle} caption="The work behind the summary" track={track}>
        <ul className="index">
          {evidence.map((d) => (
            <li key={d.href}>
              <a href={d.href} className="index__row">
                <span className="index__code">{d.code}</span>
                <NavIcon name={d.icon} />
                <span className="index__label">{d.label}</span>
                <span className="index__note">{d.note}</span>
                <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" className="index__arrow" />
              </a>
            </li>
          ))}
        </ul>
      </Block>

      {track === "business" && <Recognition track="business" id="awards" />}

      <ContactStrip title={t.closing} lead="Email is fastest. LinkedIn and WhatsApp work too." />
    </>
  );
}
