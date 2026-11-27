import { Chooser, ContactStrip, HomeFaq, Intro } from "@/components/sections/Home";

/** Home: who this is, then one decision (which career), then the optional extras. No role label, no numbers. */
export default function HomePage() {
  return (
    <main id="main" className="main sheet">
      <Intro />
      <Chooser />
      <HomeFaq />
      <ContactStrip />
    </main>
  );
}
