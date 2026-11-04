import type { Metadata } from "next";
import { WorkedWith } from "@/components/sections/WorkedWith";

export const metadata: Metadata = {
  title: "Worked with",
  description: "Organisations Fahad Ali has worked with.",
  alternates: { canonical: "/worked-with" },
};

export default function Page() {
  return (
    <main id="main" className="main main--page">
      <WorkedWith level={1} />
    </main>
  );
}
