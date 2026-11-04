import type { Metadata } from "next";
import { Experience } from "@/components/sections/Experience";

export const metadata: Metadata = {
  title: "Experience",
  description: "Fahad Ali's experience in urban planning, GIS and business development.",
  alternates: { canonical: "/experience" },
};

export default function Page() {
  return (
    <main id="main" className="main main--page">
      <Experience level={1} />
    </main>
  );
}
