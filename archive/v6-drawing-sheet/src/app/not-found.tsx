import { site } from "@content/site.ts";
import { ArrowRight } from "lucide-react";
import { TitleBlock, noDot } from "@/components/Sheet";

export default function NotFound() {
  return (
    <main id="main" className="main sheet">
      <TitleBlock code="404" title={noDot(site.copy.notFound.title)} lead={<p>The address may have changed. Every page is in the menu, or press Ctrl K to search.</p>}>
        <p className="btn-row">
          <a href="/" className="btn btn--primary">
            {site.copy.notFound.button} <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
          </a>
        </p>
      </TitleBlock>
    </main>
  );
}
