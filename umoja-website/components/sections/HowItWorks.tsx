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
      <div className="relative h-px w-full bg-[#DDE8D5]/30 overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#6A9556] to-[#8AAF78]"
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
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#4E7A3C] bg-[#F2F5EE] text-xl font-bold font-display text-[#3B6130] shadow-md">
            {number}
          </div>
          {/* Mobile vertical connector line (hidden on md+) */}
          {!isLast && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-px h-8 bg-[#B8CFA8] md:hidden" />
          )}
        </div>

        {/* Content */}
        <h3 className="font-display text-base font-semibold text-[#1A1D16] mb-2">
          {title}
        </h3>
        <p className="text-xs text-[#2C3126]/70 leading-relaxed">
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
            <span className="inline-block rounded-full border border-[#3B6130]/30 bg-[#F2F5EE] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#3B6130] mb-4">
              The Process
            </span>
            <h2 className="font-display text-3xl font-bold text-[#1A1D16] sm:text-4xl md:text-5xl">
              Inside the Classroom
            </h2>
            <div className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent via-[#4E7A3C] to-transparent" />
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

        {/* ── Detailed classroom breakdown ── */}
        <div className="mt-16 mx-auto max-w-3xl rounded-2xl bg-[#F2F5EE] border border-[#B8CFA8] px-8 py-10 md:px-12">
          <RevealOnScroll direction="up" delay={0.6}>
            <h3 className="font-display text-2xl font-bold text-[#1A1D16] sm:text-3xl text-center mb-6">
              How a Lesson Works in the Classroom
            </h3>
            <p className="text-sm text-[#2C3126]/80 leading-relaxed md:text-base">
              In a normal school day, the class receives a lesson presented by an AI avatar.
              The lesson is structured, clear, and aligned to the curriculum—so every classroom
              can access the same standard of teaching. Students can ask questions as they would
              in any classroom, and the AI responds in real time, supported by the teacher to
              ensure the answers stay clear and appropriate for the students.
            </p>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.7}>
            <div className="mt-8">
              <h4 className="font-display text-lg font-semibold text-[#3B6130] mb-2">
                The Teacher Stays in Control
              </h4>
              <p className="text-sm text-[#2C3126]/80 leading-relaxed md:text-base">
                UMOJA-ai does not replace teachers—it strengthens them. The teacher controls
                the pace of the lesson, pauses when students need time, repeats sections, and
                adds explanation in the local context. This makes learning feel familiar and
                human, while giving teachers powerful support for large classes and limited
                resources.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.8}>
            <div className="mt-8">
              <h4 className="font-display text-lg font-semibold text-[#3B6130] mb-2">
                Built for Rural Conditions
              </h4>
              <p className="text-sm text-[#2C3126]/80 leading-relaxed md:text-base">
                UMOJA-ai is designed for the realities of African infrastructure. If electricity
                is unreliable, the system includes a battery solution that can be recharged with
                solar power or electricity when available. If telecom coverage is limited or
                unavailable, lessons can still run locally and then be updated periodically as
                the school year progresses. This ensures rural schools are not left behind.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.9}>
            <div className="mt-8">
              <h4 className="font-display text-lg font-semibold text-[#3B6130] mb-2">
                Learning Beyond the Classroom
              </h4>
              <p className="text-sm text-[#2C3126]/80 leading-relaxed md:text-base">
                UMOJA-ai can also be delivered through mobile phones, so learning is not limited
                to the classroom. This expands access, supports revision at home, and makes it
                easier for students to continue learning outside school hours.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
