import { contact } from "@content/contact.ts";
import { education, languages } from "@content/education.ts";
import { roles } from "@content/index.ts";
import { about } from "@content/pages.ts";
import { site } from "@content/site.ts";
import { businessSkills, planningSkills } from "@content/skills.ts";
import { ArrowRight, BriefcaseBusiness, Download, GraduationCap, Languages, Map, MapPin, Plus, Sparkles, Target } from "lucide-react";
import { ContactStrip } from "./Home";

/** About: specific facts first (who, where, doing what now), then the two paths side by side, then how he works. */
export function About() {
  const now = roles.find((r) => r.end === "present");
  const glance = [
    { Icon: MapPin, label: "Based in", value: site.location },
    { Icon: GraduationCap, label: "Studying", value: `${education.degree}, ${education.schoolShort} · ${education.period}` },
    ...(now ? [{ Icon: BriefcaseBusiness, label: "Currently", value: `${now.title}, ${now.orgName}` }] : []),
    { Icon: Target, label: "Open to", value: "Planning, GIS and business development roles" },
    { Icon: Languages, label: "Languages", value: languages.join(" · ") },
  ];
  const paths = [
    { track: "planning", label: "Urban Planning & GIS", Icon: Map, href: "/planning", steps: about.paths.planning },
    { track: "business", label: "Business Development", Icon: BriefcaseBusiness, href: "/business", steps: about.paths.business },
  ] as const;
  return (
    <>
      <section className="panel about-head" aria-labelledby="about-title">
        <div className="about-head__photo">
          <picture>
            <source type="image/avif" srcSet="/media/portrait/fahad-photo-sm.avif 540w, /media/portrait/fahad-photo.avif 1086w" sizes="(min-width: 960px) 300px, 60vw" />
            <img src="/media/portrait/fahad-photo.webp" srcSet="/media/portrait/fahad-photo-sm.webp 540w, /media/portrait/fahad-photo.webp 1086w" sizes="(min-width: 960px) 300px, 60vw" alt={site.photoAlt} width={1086} height={1448} fetchPriority="high" />
          </picture>
        </div>
        <div className="about-head__text">
          <p className="eyebrow">
            <Sparkles size={13} strokeWidth={2} aria-hidden="true" /> About
          </p>
          <h1 id="about-title" className="display page-head__title">
            <span className="shine">{about.title}</span>
          </h1>
          <p className="about-head__lead">{about.lead}</p>
          <p>{about.now}</p>
          <p className="btn-row">
            {contact.resumes.map((r) => (
              <a key={r.track} className="btn-ghost" href={r.file} download={r.download} data-track={r.track}>
                <Download size={16} strokeWidth={1.75} aria-hidden="true" /> {r.label}
              </a>
            ))}
          </p>
        </div>
      </section>

      <section className="panel" aria-labelledby="glance-title">
        <div className="panel-head">
          <h2 id="glance-title" className="display h2">
            <span className="shine">{about.glanceTitle}</span>
          </h2>
        </div>
        <dl className="glance">
          {glance.map(({ Icon, label, value }) => (
            <div key={label} className="inner glance__item">
              <dt>
                <Icon size={15} strokeWidth={1.8} aria-hidden="true" /> {label}
              </dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="panel" aria-labelledby="path-title">
        <div className="panel-head panel-head--stack">
          <h2 id="path-title" className="display h2">
            <span className="shine">{about.pathTitle}</span>
          </h2>
          <p className="small">{about.pathLead}</p>
        </div>
        <div className="paths">
          {paths.map(({ track, label, Icon, href, steps }) => (
            <div key={track} className="inner path" data-track={track}>
              <h3 className="eyebrow track-tag">
                <Icon size={13} strokeWidth={2} aria-hidden="true" /> {label}
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
                Open the {track === "planning" ? "planning" : "business"} profile <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="panel" aria-labelledby="habits-title">
        <div className="panel-head">
          <h2 id="habits-title" className="display h2">
            <span className="shine">{about.habitsTitle}</span>
          </h2>
        </div>
        <ol className="habits">
          {about.habits.map((h, i) => (
            <li key={h.title} className="inner">
              <span className="expertise__num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="expertise__title">{h.title}</h3>
              <p className="small">{h.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="panel" aria-labelledby="more-title" data-accordion>
        <div className="panel-head">
          <h2 id="more-title" className="display h2">
            <span className="shine">{about.moreTitle}</span>
          </h2>
        </div>
        <details className="fold">
          <summary>
            Education
            <span className="fold__toggle" aria-hidden="true">
              <Plus size={16} strokeWidth={2} />
            </span>
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
            Planning &amp; GIS tools
            <span className="fold__toggle" aria-hidden="true">
              <Plus size={16} strokeWidth={2} />
            </span>
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
            <span className="fold__toggle" aria-hidden="true">
              <Plus size={16} strokeWidth={2} />
            </span>
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
            <span className="fold__toggle" aria-hidden="true">
              <Plus size={16} strokeWidth={2} />
            </span>
          </summary>
          <div className="fold__body">
            <ul className="bullets">
              {planningSkills.achievements.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </details>
      </section>

      <ContactStrip />
    </>
  );
}
