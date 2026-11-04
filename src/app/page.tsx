import { Contact } from "@/components/sections/Contact";
import { Explore } from "@/components/sections/Explore";
import { Hero } from "@/components/sections/Hero";

/** Overview: who, the numbers, and a way into every page. */
export default function HomePage() {
  return (
    <main id="main" className="main">
      <Hero />
      <Explore />
      <Contact />
    </main>
  );
}
