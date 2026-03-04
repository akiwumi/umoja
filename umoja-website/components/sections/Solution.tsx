'use client';

/**
 * Solution
 *
 * Three GlowCards presenting UMOJA-ai's core product pillars
 * on a dark charcoal background.
 */
import { BrainCircuit, Wifi, Globe } from 'lucide-react';
import GlowCard from '@/components/ui/GlowCard';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import { SOLUTION_CARDS } from '@/lib/constants';

/* Icon map — keeps constants.ts icon-library-agnostic */
const ICON_MAP = {
  BrainCircuit,
  Wifi,
  Globe,
} as const;

type IconName = keyof typeof ICON_MAP;

export default function Solution() {
  return (
    <section className="bg-[#1A1D16] section-padding">
      <div className="mx-auto max-w-7xl px-6 md:px-8">

        {/* ── Heading ── */}
        <RevealOnScroll direction="up">
          <div className="text-center mb-6">
            <span className="inline-block rounded-full border border-[#6A9556]/30 bg-[#6A9556]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#8AAF78] mb-4">
              Our Platform
            </span>
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              A New Way to Teach
            </h2>
            <div className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent via-[#E8BC20] to-transparent" />
          </div>
        </RevealOnScroll>

        {/* ── Tagline ── */}
        <RevealOnScroll direction="up" delay={0.1}>
          <p className="text-center text-xl font-medium text-[#E8BC20] mb-16 italic">
            &ldquo;We empower teachers. We don&rsquo;t replace them.&rdquo;
          </p>
        </RevealOnScroll>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {SOLUTION_CARDS.map((card, idx) => {
            const Icon = ICON_MAP[card.iconName as IconName];
            return (
              <RevealOnScroll
                key={card.title}
                direction="up"
                delay={idx * 0.15}
              >
                <GlowCard className="h-full flex flex-col">
                  {/* Icon */}
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-[#1E3318]/60 text-[#8AAF78]">
                    <Icon size={28} strokeWidth={1.5} />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl font-semibold text-white mb-3">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-white/60 leading-relaxed flex-grow">
                    {card.description}
                  </p>
                </GlowCard>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
