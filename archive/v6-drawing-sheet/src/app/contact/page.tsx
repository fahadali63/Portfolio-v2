import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Fahad Ali about town planning, GIS or business development roles.",
  alternates: { canonical: "/contact" },
};

export default function Page() {
  return (
    <main id="main" className="main sheet">
      <Contact />
    </main>
  );
}
