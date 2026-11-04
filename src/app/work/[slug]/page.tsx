import { projects } from "@content/index.ts";
import { Img } from "@/components/Img";
import { BentoCard } from "@/components/sections/Work";
import { splitTitle } from "@/lib/format";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: splitTitle(p.title)[0],
    description: p.summary,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: { title: p.title, description: p.summary, url: `/work/${p.slug}` },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((x) => x.slug === slug);
  const p = projects[index];
  if (!p) notFound();
  const next = projects[(index + 1) % projects.length]!;
  const prev = projects[(index - 1 + projects.length) % projects.length]!;
  const [name, subtitle] = splitTitle(p.title);

  const facts = [
    { label: "Category", value: p.category },
    { label: "Location", value: p.location },
    { label: "Year", value: p.year },
    { label: "Key facts", value: p.keyFacts.join(" · ") || undefined },
  ].filter((f): f is { label: string; value: string } => !!f.value);

  return (
    <>
    <main id="main" className="main">
    <article>
      <a href="/portfolio" className="back">
        <ArrowLeft size={18} strokeWidth={1.75} aria-hidden="true" /> All work
      </a>

      <header className="project-hero">
        <span className="pill">{p.category}</span>
        <h1 className="display">{name}</h1>
        {subtitle && <p className="project-hero__sub">{subtitle}</p>}
      </header>

      <ul className="caps caps--facts" aria-label="Project facts">
        {facts.map((f) => (
          <li key={f.label}>
            <h2 className="label">{f.label}</h2>
            <p className="small" style={{ color: "var(--ink)", fontSize: "1.0625rem" }}>
              {f.value}
            </p>
          </li>
        ))}
      </ul>

      <div className="project-body">
        <h2 className="display h2">Overview</h2>
        <div className="project-body__text">
          <p className="about__lead">{p.summary}</p>
          {p.contribution && (
            <div>
              <h3 className="label">My part</h3>
              <p className="muted" style={{ marginTop: 8 }}>
                {p.contribution}
              </p>
            </div>
          )}
          {p.credit && (
            <div>
              <h3 className="label">Credit</h3>
              <p className="muted" style={{ marginTop: 8 }}>
                {p.credit}
              </p>
            </div>
          )}
          <ul className="tags" aria-label="Tools and tags">
            {p.tools.map((t) => (
              <li key={t} className="pill pill--outline">
                {t}
              </li>
            ))}
          </ul>
          {p.driveUrl && (
            <p>
              <a className="btn" href={p.driveUrl} target="_blank" rel="noopener">
                Open full file
                <span className="btn__disc" aria-hidden="true">
                  <ArrowUpRight size={18} strokeWidth={2} />
                </span>
                <span className="visually-hidden"> (opens in new tab)</span>
              </a>
            </p>
          )}
        </div>
      </div>

      <div className="gallery">
        {p.pages.map((page, i) => (
          <figure key={page.image} className="plate">
            <Img id={page.image} alt={page.alt} priority={i === 0} />
            <figcaption className="small">
              Sheet {i + 1} of {p.pages.length} — {page.alt}
            </figcaption>
          </figure>
        ))}
      </div>

      <section className="section" aria-labelledby="more-title">
        <div className="sub-head" style={{ marginTop: 0 }}>
          <h2 id="more-title" className="display h3">
            More projects
          </h2>
          <a href="/portfolio" className="back">
            All work <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
          </a>
        </div>
        <ul className="bento__row">
          {[prev, next].map((q) => (
            <BentoCard key={q.slug} p={q} />
          ))}
        </ul>
      </section>
    </article>
    </main>
    </>
  );
}
