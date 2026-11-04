import type { Metadata } from "next";
import { Engagements } from "@/components/sections/Engagements";

export const metadata: Metadata = {
  title: "Engagements",
  description: "Selected business development engagements Fahad Ali sourced and closed. Client names withheld.",
  alternates: { canonical: "/engagements" },
};

export default function Page() {
  return (
    <main id="main" className="main main--page">
      <Engagements level={1} />
    </main>
  );
}
