import type { Metadata } from "next";
import { Work } from "@/components/sections/Work";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Master plans, urban design, GIS maps and CAD — studio and professional work by Fahad Ali.",
  alternates: { canonical: "/portfolio" },
};

export default function Page() {
  return (
    <main id="main" className="main main--page">
      <Work level={1} />
    </main>
  );
}
