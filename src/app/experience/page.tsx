import type { Metadata } from "next";
import { roles } from "@content/index.ts";
import { Experience } from "@/components/sections/Experience";
import { TitleBlock } from "@/components/Sheet";

export const metadata: Metadata = {
  title: "Experience",
  description: "Fahad Ali's experience, one career at a time: urban planning and GIS, then business development.",
  alternates: { canonical: "/experience" },
};

export default function Page() {
  return (
    <main id="main" className="main">
      <TitleBlock
        code="G-03"
        title="All experience"
        lead={<p>Both careers on one sheet, newest first within each. The career pages show the same roles with the skills and evidence around them.</p>}
        meta={[{ label: "Roles", value: String(roles.length) }]}
      />
      <Experience track="planning" title="Planning and GIS" caption="Newest first. Open a role for the details." />
      <Experience track="business" title="Business development" caption="Newest first. Open a role for the details." />
    </main>
  );
}
