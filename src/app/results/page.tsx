import type { Metadata } from "next";
import { Results } from "@/components/sections/Results";

export const metadata: Metadata = {
  title: "Results",
  description: "Business development results at Ideas Animation Studio: projects closed, conversion and monthly target attainment.",
  alternates: { canonical: "/results" },
};

export default function Page() {
  return (
    <main id="main" className="main main--page">
      <Results level={1} />
    </main>
  );
}
