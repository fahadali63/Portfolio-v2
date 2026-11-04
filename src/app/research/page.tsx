import type { Metadata } from "next";
import { Research } from "@/components/sections/Research";

export const metadata: Metadata = {
  title: "Research",
  description: "Coursework research by Fahad Ali at the Department of City & Regional Planning, UET Lahore.",
  alternates: { canonical: "/research" },
};

export default function Page() {
  return (
    <main id="main" className="main main--page">
      <Research level={1} />
    </main>
  );
}
