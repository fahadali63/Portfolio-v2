import type { Metadata } from "next";
import { Recognition } from "@/components/sections/Recognition";

export const metadata: Metadata = {
  title: "Certificates",
  description: "Certificates, letters and awards — planning and business development.",
  alternates: { canonical: "/certificates" },
};

export default function Page() {
  return (
    <main id="main" className="main main--page">
      <Recognition level={1} />
    </main>
  );
}
