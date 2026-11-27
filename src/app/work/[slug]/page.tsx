import { projects } from "@content/index.ts";
import { Img } from "@/components/Img";
import { Block, TitleBlock } from "@/components/Sheet";
import { PlateCard, projectCode } from "@/components/sections/Work";
import { splitTitle } from "@/lib/format";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
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

/** One project: its title block, what it is and what Fahad did, then every drawing sheet at full width. */
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((x) => x.slug === slug);
  const p = projects[index];
  if (!p) notFound();
  const next = projects[(index + 1) % projects.length]!;
  const prev = projects[(index - 1 + projects.length) % projects.length]!;
  const [name, subtitle] = splitTitle(p.title);

  const meta = [
    { label: "Category", value: p.category },
    ...(p.location ? [{ label: "Location", value: p.location }] : []),
    ...(p.year ? [{ label: "Year", value: p.year }] : []),
    { label: "Sheets", value: String(p.pages.length) },
  ];

  return (
    <main id="main" className="main">
      <nav className="crumbs" aria-label="Breadcrumb">
        <a href="/portfolio" className="text-link">
          <ArrowLeft size={14} strokeWidth={1.5} aria-hidden="true" /> All projects
        </a>
      </nav>

      <TitleBlock code={projectCode(p)} track="planning" title={name} lead={subtitle ? <p className="title-block__lead-strong">{subtitle}</p> : undefined} meta={meta} />

      <Block id="overview" title="Overview" track="planning">
        <div className="prose">
          <p className="prose__lead">{p.summary}</p>
          {p.keyFacts.length > 0 && (
            <ul className="bullets">
              {p.keyFacts.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          )}
        </div>
        <dl className="spec spec--stack">
          {p.contribution && (
            <div>
              <dt>My part</dt>
              <dd>{p.contribution}</dd>
            </div>
          )}
          {p.credit && (
            <div>
              <dt>Credit</dt>
              <dd>{p.credit}</dd>
            </div>
          )}
          <div>
            <dt>Tools</dt>
            <dd>
              <ul className="chips">
                {p.tools.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
        {p.driveUrl && (
          <p>
            <a className="btn btn--secondary" href={p.driveUrl} target="_blank" rel="noopener">
              Open the full file <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
              <span className="visually-hidden"> (opens in new tab)</span>
            </a>
          </p>
        )}
      </Block>

      <section className="drawings" aria-label="Drawing sheets">
        {p.pages.map((page, i) => (
          <figure key={page.image} className="drawing">
            <Img id={page.image} alt={page.alt} priority={i === 0} />
            <figcaption>
              <span className="drawing__code">
                Sheet {i + 1} of {p.pages.length}
              </span>
              <span>{page.alt}</span>
            </figcaption>
          </figure>
        ))}
      </section>

      <Block id="more" title="More projects" action={<a className="text-link" href="/portfolio">All projects</a>} track="planning" wide>
        <ul className="plates__row plates__row--flush">
          {[prev, next].map((q) => (
            <PlateCard key={q.slug} p={q} />
          ))}
        </ul>
      </Block>
    </main>
  );
}
