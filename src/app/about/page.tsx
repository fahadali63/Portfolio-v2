import type { Metadata } from "next";
import { About } from "@/components/sections/About";

export const metadata: Metadata = {
  title: "About",
  description: "About Fahad Ali — two careers, one way of working.",
  alternates: { canonical: "/about" },
};

export default function Page() {
  return (
    <main id="main" className="main main--page">
      <About level={1} />
    </main>
  );
}
