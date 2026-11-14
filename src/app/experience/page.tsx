import type { Metadata } from "next";
import { Experience } from "@/components/sections/Experience";

export const metadata: Metadata = {
  title: "Experience",
  description: "Fahad Ali's experience, one career at a time: urban planning and GIS, then business development.",
  alternates: { canonical: "/experience" },
};

export default function Page() {
  return (
    <main id="main" className="main main--page">
      <Experience track="planning" title="Planning & GIS experience" caption="Newest first. Open a role for the details." level={1} />
      <Experience track="business" title="Business development experience" caption="Newest first. Open a role for the details." />
    </main>
  );
}
