import { site } from "@content/site.ts";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <main id="main" className="main">
    <section className="project-hero" style={{ paddingBlock: "clamp(48px, 10vw, 120px)" }}>
      <p className="hero__greeting">Error 404</p>
      <h1 className="display" style={{ marginTop: 12 }}>
        {site.copy.notFound.title}
      </h1>
      <p style={{ marginTop: 32 }}>
        <a href="/" className="btn">
          {site.copy.notFound.button}
          <span className="btn__disc" aria-hidden="true">
            <ArrowRight size={18} strokeWidth={2} />
          </span>
        </a>
      </p>
    </section>
    </main>
  );
}
