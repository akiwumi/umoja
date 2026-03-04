'use client';

/**
 * Crisis
 *
 * Presents the scale of Africa's education emergency through three
 * animated stat cards and a supporting body paragraph.
 */
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import { CRISIS_STATS, CRISIS_BODY } from '@/lib/constants';

export default function Crisis() {
  return (
    <section className="bg-[#F2F5EE] section-padding">
      <div className="mx-auto max-w-7xl px-6 md:px-8">

        {/* ── Section heading ── */}
        <RevealOnScroll direction="up">
          <div className="text-center mb-16">
            <span className="inline-block rounded-full border border-[#3B6130]/30 bg-[#3B6130]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#3B6130] mb-4">
              The Challenge
            </span>
            <h2 className="font-display text-3xl font-bold text-[#1A1D16] sm:text-4xl md:text-5xl">
              Africa&rsquo;s Education Emergency
            </h2>
            <div className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent via-[#3B6130] to-transparent" />
          </div>
        </RevealOnScroll>

        {/* ── Stat cards ── */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {CRISIS_STATS.map((item, idx) => (
            <RevealOnScroll
              key={item.label}
              direction="up"
              delay={idx * 0.15}
            >
              <div className="relative overflow-hidden rounded-2xl bg-white border border-[#DDE8D5] p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                {/* Decorative top border accent */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#4E7A3C] to-[#8AAF78]" />

                {/* Stat number */}
                <div className="mb-3 min-w-0">
                  <span className="font-display font-bold text-[#3B6130] break-words leading-tight"
                    style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
                    <AnimatedCounter
                      target={item.stat}
                      prefix={item.prefix}
                      suffix={item.suffix}
                      finalLabel={'finalLabel' in item ? item.finalLabel : undefined}
                      duration={2.2}
                    />
                  </span>
                </div>

                {/* Label */}
                <h3 className="font-display text-lg font-semibold text-[#1A1D16] mb-2 leading-snug">
                  {item.label}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#2C3126]/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* ── Body text ── */}
        <RevealOnScroll direction="up" delay={0.4}>
          <div className="mt-16 mx-auto max-w-3xl text-center">
            <p className="text-base text-[#2C3126]/80 leading-relaxed md:text-lg">
              {CRISIS_BODY}
            </p>
          </div>
        </RevealOnScroll>

        {/* ── The challenge UMOJA-ai solves ── */}
        <RevealOnScroll direction="up" delay={0.5}>
          <div className="mt-14 mx-auto max-w-3xl text-center">
            <h3 className="font-display text-2xl font-bold text-[#1A1D16] sm:text-3xl mb-4">
              The Challenge UMOJA-ai Solves
            </h3>
            <p className="text-base text-[#2C3126]/80 leading-relaxed md:text-lg">
              Across many parts of Africa, &ldquo;free education&rdquo; often means a child can
              enter a school building, but the learning resources are missing. Families still
              pay for books and supplies, teachers are underpaid and overloaded with very large
              classes, and many schools—especially in rural areas—operate with weak
              infrastructure. The result is unequal education, poor learning outcomes, and high
              dropout rates.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
