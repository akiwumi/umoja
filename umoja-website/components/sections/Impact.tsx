'use client';

/**
 * Impact
 *
 * Deep-green section communicating the scale of the opportunity.
 * Features a large animated counter, two quote cards, and a
 * Framer Motion parallax text reveal on scroll.
 */
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import { IMPACT } from '@/lib/constants';

/* ── Quote card ── */
interface QuoteCardProps {
  text: string;
  source: string;
  delay: number;
}

function QuoteCard({ text, source, delay }: QuoteCardProps) {
  return (
    <RevealOnScroll direction="up" delay={delay}>
      <div className="relative rounded-xl bg-[#22261C]/60 border border-[#E8BC20]/20 p-7">
        {/* Gold left accent bar */}
        <div className="absolute inset-y-0 left-0 w-1 rounded-l-xl bg-[#E8BC20]" />
        <p className="text-white/80 leading-relaxed text-sm md:text-base italic mb-4 pl-2">
          &ldquo;{text}&rdquo;
        </p>
        <p className="text-[#E8BC20] text-xs font-semibold uppercase tracking-wider pl-2">
          — {source}
        </p>
      </div>
    </RevealOnScroll>
  );
}

export default function Impact() {
  const containerRef = useRef<HTMLDivElement>(null);

  /* ── Parallax on the body paragraph ── */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const bodyY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const bodyOpacity = useTransform(scrollYProgress, [0.1, 0.4, 0.8, 1], [0, 1, 1, 0.6]);

  return (
    <section
      ref={containerRef}
      className="bg-[#1A1D16] section-padding relative overflow-hidden"
    >
      {/* ── Background radial glow ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(78,122,60,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-8">

        {/* ── Section heading ── */}
        <RevealOnScroll direction="up">
          <div className="text-center mb-16">
            <span className="inline-block rounded-full border border-[#6A9556]/30 bg-[#6A9556]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#8AAF78] mb-4">
              The Opportunity
            </span>
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              {IMPACT.heading}
            </h2>
            <div className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent via-[#E8BC20] to-transparent" />
          </div>
        </RevealOnScroll>

        {/* ── Large stat ── */}
        <RevealOnScroll direction="up" delay={0.1}>
          <div className="text-center mb-16">
            <div className="font-display text-7xl font-bold text-[#E8BC20] sm:text-8xl md:text-9xl leading-none">
              <AnimatedCounter
                target={IMPACT.bigStatTarget}
                suffix={IMPACT.bigStatSuffix}
                duration={2.5}
              />
            </div>
            <p className="mt-4 text-lg text-white/60 font-medium">
              {IMPACT.bigStatLabel}
            </p>
          </div>
        </RevealOnScroll>

        {/* ── Quote cards ── */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-16">
          {IMPACT.quotes.map((quote, idx) => (
            <QuoteCard
              key={idx}
              text={quote.text}
              source={quote.source}
              delay={idx * 0.15}
            />
          ))}
        </div>

        {/* ── Parallax body paragraph ── */}
        <motion.div
          style={{ y: bodyY, opacity: bodyOpacity }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-base text-white/60 leading-relaxed md:text-lg">
            {IMPACT.body}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
