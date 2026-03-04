/**
 * Home page
 *
 * Assembles all marketing sections in order.
 * Each section (after Hero) is wrapped in a <section> with an id
 * so the Navbar scroll-to links work correctly.
 */
import Hero from '@/components/sections/Hero';
import Crisis from '@/components/sections/Crisis';
import Solution from '@/components/sections/Solution';
import HowItWorks from '@/components/sections/HowItWorks';
import ThreePartyModel from '@/components/sections/ThreePartyModel';
import WhyGhana from '@/components/sections/WhyGhana';
import Impact from '@/components/sections/Impact';
import Contact from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <>
      {/* Full-viewport hero — no section wrapper needed */}
      <Hero />

      {/* ── Anchored sections ── */}
      <section id="crisis">
        <Crisis />
      </section>

      <section id="solution">
        <Solution />
      </section>

      <section id="how-it-works">
        <HowItWorks />
      </section>

      <section id="model">
        <ThreePartyModel />
      </section>

      <section id="ghana">
        <WhyGhana />
      </section>

      <section id="impact">
        <Impact />
      </section>

      <section id="contact">
        <Contact />
      </section>
    </>
  );
}
