import type { Metadata } from "next";
import { Career } from "@/components/sections/Career";

export const metadata: Metadata = {
  title: "Business Development",
  description: "Fahad Ali's business development profile: experience at Innotec and Ideas Animation Studio, results against target, enterprise engagements and the résumé.",
  alternates: { canonical: "/business" },
};

export default function Page() {
  return (
    <main id="main" className="main sheet" data-track="business">
      <Career track="business" />
    </main>
  );
}
