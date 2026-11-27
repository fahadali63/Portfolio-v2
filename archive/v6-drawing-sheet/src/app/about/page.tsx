import type { Metadata } from "next";
import { About } from "@/components/sections/About";

export const metadata: Metadata = {
  title: "About",
  description: "About Fahad Ali: City & Regional Planning student at UET Lahore with two working careers, planning and GIS, and business development.",
  alternates: { canonical: "/about" },
};

export default function Page() {
  return (
    <main id="main" className="main sheet">
      <About />
    </main>
  );
}
