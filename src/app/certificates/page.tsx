import type { Metadata } from "next";
import { certificationsFor } from "@content/index.ts";
import { Recognition } from "@/components/sections/Recognition";
import { TitleBlock } from "@/components/Sheet";

export const metadata: Metadata = {
  title: "Certificates",
  description: "Planning and GIS certificates, completion letters and awards.",
  alternates: { canonical: "/certificates" },
};

export default function Page() {
  return (
    <main id="main" className="main">
      <TitleBlock
        code="P-04"
        track="planning"
        title="Certificates"
        lead={<p>Completion letters, a winter-school award and seminar recognition from planning work and study. Open any document to read it in full.</p>}
        meta={[{ label: "Documents", value: String(certificationsFor("planning").length) }]}
      />
      <Recognition track="planning" />
    </main>
  );
}
