'use client';

/**
 * HowItWorks
 *
 * Five sequential steps explaining the in-classroom experience.
 * Desktop: horizontal timeline with animated connecting lines.
 * Mobile: vertical stacked steps.
 */
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import { HOW_IT_WORKS_STEPS } from '@/lib/constants';

/* ── Connecting line that animates its width once in view ── */
function AnimatedLine({ delay }: { delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className="hidden md:flex flex-1 items-center px-1">
      <div className="relative h-px w-full bg-[#C8E6C9]/30 overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#4CAF50] to-[#66BB6A]"
          initial={{ width: '0%' }}
          animate={isInView ? { width: '100%' } : {}}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

/* ── Single step card ── */
interface StepProps {
  number: number;
  title: string;
  description: string;
  delay: number;
  isLast: boolean;
}

function Step({ number, title, description, delay, isLast }: StepProps) {
  return (
    <>
      <RevealOnScroll direction="up" delay={delay} className="flex flex-col items-center text-center md:w-44">
        {/* Number circle */}
        <div className="relative mb-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#43A047] bg-[#E8F5E9] text-xl font-bold font-display text-[#2E7D32] shadow-md">
            {number}
          </div>
          {/* Mobile vertical connector line (hidden on md+) */}
          {!isLast && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-px h-8 bg-[#A5D6A7] md:hidden" />
          )}
        </div>

        {/* Content */}
        <h3 className="font-display text-base font-semibold text-[#051F05] mb-2">
          {title}
        </h3>
        <p className="text-xs text-[#263238]/70 leading-relaxed">
          {description}
        </p>
      </RevealOnScroll>

      {/* Desktop connecting line between steps */}
      {!isLast && <AnimatedLine delay={delay + 0.4} />}
    </>
  );
}

export default function HowItWorks() {
  return (
    <section className="bg-white section-padding">
      <div className="mx-auto max-w-7xl px-6 md:px-8">

        {/* ── Heading ── */}
        <RevealOnScroll direction="up">
          <div className="text-center mb-16">
            <span className="inline-block rounded-full border border-[#2E7D32]/30 bg-[#E8F5E9] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#2E7D32] mb-4">
              The Process
            </span>
            <h2 className="font-display text-3xl font-bold text-[#051F05] sm:text-4xl md:text-5xl">
              Inside the Classroom
            </h2>
            <div className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent via-[#43A047] to-transparent" />
          </div>
        </RevealOnScroll>

        {/* ── Steps layout ── */}
        {/* Mobile: vertical flex-col; Desktop: horizontal flex-row with lines */}
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-0 md:justify-between">
          {HOW_IT_WORKS_STEPS.map((step, idx) => (
            <Step
              key={step.number}
              number={step.number}
              title={step.title}
              description={step.description}
              delay={idx * 0.18}
              isLast={idx === HOW_IT_WORKS_STEPS.length - 1}
            />
          ))}
        </div>

        {/* ── Callout note ── */}
        <RevealOnScroll direction="up" delay={0.6}>
          <div className="mt-16 mx-auto max-w-2xl rounded-2xl bg-[#E8F5E9] border border-[#A5D6A7] px-8 py-6 text-center">
            <p className="text-sm text-[#2E7D32] font-medium leading-relaxed">
              The teacher is always in control. UMOJA-ai enhances the classroom — it never replaces the human at the centre of learning.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
