import { Chooser, ContactStrip, Intro } from "@/components/sections/Home";

/** Home: who this is, then one decision (which career). No role label, no numbers, no extra reading. */
export default function HomePage() {
  return (
    <main id="main" className="main">
      <Intro />
      <Chooser />
      <ContactStrip />
    </main>
  );
}
