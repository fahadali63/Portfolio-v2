import type { Metadata } from "next";
import { Recognition } from "@/components/sections/Recognition";

export const metadata: Metadata = {
  title: "Certificates",
  description: "Planning and GIS certificates, completion letters and awards.",
  alternates: { canonical: "/certificates" },
};

export default function Page() {
  return (
    <main id="main" className="main main--page">
      <Recognition track="planning" level={1} />
    </main>
  );
}
