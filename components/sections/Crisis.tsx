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
    <section className="bg-[#E8F5E9] section-padding">
      <div className="mx-auto max-w-7xl px-6 md:px-8">

        {/* ── Section heading ── */}
        <RevealOnScroll direction="up">
          <div className="text-center mb-16">
            <span className="inline-block rounded-full border border-[#2E7D32]/30 bg-[#2E7D32]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#2E7D32] mb-4">
              The Challenge
            </span>
            <h2 className="font-display text-3xl font-bold text-[#051F05] sm:text-4xl md:text-5xl">
              Africa&rsquo;s Education Emergency
            </h2>
            <div className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent via-[#2E7D32] to-transparent" />
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
              <div className="relative overflow-hidden rounded-2xl bg-white border border-[#C8E6C9] p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                {/* Decorative top border accent */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#43A047] to-[#66BB6A]" />

                {/* Stat number */}
                <div className="mb-3">
                  <span className="font-display text-5xl font-bold text-[#2E7D32] md:text-6xl">
                    <AnimatedCounter
                      target={item.stat}
                      prefix={item.prefix}
                      suffix={item.suffix}
                      duration={2.2}
                    />
                  </span>
                </div>

                {/* Label */}
                <h3 className="font-display text-lg font-semibold text-[#051F05] mb-2 leading-snug">
                  {item.label}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#263238]/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* ── Body text ── */}
        <RevealOnScroll direction="up" delay={0.4}>
          <div className="mt-16 mx-auto max-w-3xl text-center">
            <p className="text-base text-[#263238]/80 leading-relaxed md:text-lg">
              {CRISIS_BODY}
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
