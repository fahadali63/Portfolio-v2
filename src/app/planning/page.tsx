import type { Metadata } from "next";
import { Career } from "@/components/sections/Career";

export const metadata: Metadata = {
  title: "Urban Planning & GIS",
  description: "Fahad Ali's town planning and GIS profile: experience at The Spatio, LDA and on a NESPAK master-plan project, with the résumé, portfolio, research and certificates.",
  alternates: { canonical: "/planning" },
};

export default function Page() {
  return (
    <main id="main" className="main main--page" data-track="planning">
      <Career track="planning" />
    </main>
  );
}
