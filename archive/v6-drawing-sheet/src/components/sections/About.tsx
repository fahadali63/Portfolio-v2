import { contact } from "@content/contact.ts";
import { education, languages } from "@content/education.ts";
import { roles } from "@content/index.ts";
import { about } from "@content/pages.ts";
import { site } from "@content/site.ts";
import { businessSkills, planningSkills } from "@content/skills.ts";
import { ArrowRight, Download, Plus } from "lucide-react";
import { Block, noDot, TitleBlock } from "@/components/Sheet";
import { ContactStrip } from "./Home";

/** About: the facts first (who, where, doing what now), then the two paths side by side, then how he works. */
export function About() {
  const now = roles.find((r) => r.end === "present");
  const glance = [
    { label: "Based in", value: site.location },
    { label: "Studying", value: `${education.degree}, ${education.schoolShort} · ${education.period}` },
    ...(now ? [{ label: "Currently", value: `${now.title}, ${now.orgName}` }] : []),
    { label: "Open to", value: "Planning, GIS and business development roles" },
    { label: "Languages", value: languages.join(", ") },
  ];
  const paths = [
    { track: "planning", label: "Urban planning and GIS", href: "/planning", code: "P-01", steps: about.paths.planning },
    { track: "business", label: "Business development", href: "/business", code: "B-01", steps: about.paths.business },
  ] as const;
  return (
    <>
      <TitleBlock
        code="G-02"
        title={about.title}
        lead={
          <>
            <p className="title-block__lead-strong">{about.lead}</p>
            <p>{about.now}</p>
          </>
        }
        aside={
          <figure className="portrait portrait--about">
            <picture>
              <source type="image/avif" srcSet="/media/portrait/fahad-photo-sm.avif 540w, /media/portrait/fahad-photo.avif 1086w" sizes="(min-width: 1024px) 30vw, 100vw" />
              <img src="/media/portrait/fahad-photo.webp" srcSet="/media/portrait/fahad-photo-sm.webp 540w, /media/portrait/fahad-photo.webp 1086w" sizes="(min-width: 1024px) 30vw, 100vw" alt={site.photoAlt} width={1086} height={1448} fetchPriority="high" />
            </picture>
            <figcaption>
              <span>G-02</span>
              <span>{contact.coordinates}</span>
            </figcaption>
          </figure>
        }
      >
        <p className="btn-row">
          {contact.resumes.map((r) => (
            <a key={r.track} className="btn btn--secondary" href={r.file} download={r.download} data-track={r.track}>
              <Download size={16} strokeWidth={1.5} aria-hidden="true" /> {noDot(r.label)}
            </a>
          ))}
        </p>
      </TitleBlock>

      <Block id="glance" title={about.glanceTitle}>
        <dl className="spec">
          {glance.map((g) => (
            <div key={g.label}>
              <dt>{g.label}</dt>
              <dd>{g.value}</dd>
            </div>
          ))}
        </dl>
      </Block>

      <Block id="path" title={about.pathTitle} caption={about.pathLead}>
        <div className="paths">
          {paths.map(({ track, label, href, code, steps }) => (
            <div key={track} className="path" data-track={track}>
              <h3 className="path__title">
                <span className="track-dot" aria-hidden="true" /> {label}
              </h3>
              <ol className="path__steps">
                {steps.map((s) => (
                  <li key={s.when + s.text.slice(0, 12)}>
                    <span className="path__when">{s.when}</span>
                    <p>{s.text}</p>
                  </li>
                ))}
              </ol>
              <a className="text-link" href={href}>
                {code} {track === "planning" ? "Planning" : "Business"} profile <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
              </a>
            </div>
          ))}
        </div>
      </Block>

      <Block id="habits" title={about.habitsTitle}>
        <ol className="expertise expertise--three">
          {about.habits.map((h, i) => (
            <li key={h.title}>
              <span className="expertise__num">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="expertise__title">{h.title}</h3>
              <p>{h.text}</p>
            </li>
          ))}
        </ol>
      </Block>

      <Block id="more" title={about.moreTitle}>
        <div className="folds" data-accordion>
          <details className="fold">
            <summary>
              Education
              <Plus size={16} strokeWidth={1.5} aria-hidden="true" className="fold__icon" />
            </summary>
            <div className="fold__body">
              <p>
                <strong>{education.degree}</strong>
                <br />
                {education.school} · {education.period}
              </p>
            </div>
          </details>
          <details className="fold">
            <summary>
              Planning and GIS tools
              <Plus size={16} strokeWidth={1.5} aria-hidden="true" className="fold__icon" />
            </summary>
            <div className="fold__body">
              <ul className="chips">
                {planningSkills.tools.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </details>
          <details className="fold">
            <summary>
              Business development tools
              <Plus size={16} strokeWidth={1.5} aria-hidden="true" className="fold__icon" />
            </summary>
            <div className="fold__body">
              <ul className="chips">
                {businessSkills.tools.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </details>
          <details className="fold">
            <summary>
              Awards
              <Plus size={16} strokeWidth={1.5} aria-hidden="true" className="fold__icon" />
            </summary>
            <div className="fold__body">
              <ul className="bullets">
                {planningSkills.achievements.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          </details>
        </div>
      </Block>

      <ContactStrip />
    </>
  );
}
