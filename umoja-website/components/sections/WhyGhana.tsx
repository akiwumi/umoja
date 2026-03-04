'use client';

/**
 * WhyGhana
 *
 * Split-layout section: text on the left, 2×2 stat grid on the right.
 * Explains why Ghana is UMOJA-ai's launch market.
 */
import { MapPin, Signal, Smartphone, Globe } from 'lucide-react';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import { WHY_GHANA } from '@/lib/constants';

/* Icon map */
const ICON_MAP = {
  MapPin,
  Signal,
  Smartphone,
  Globe,
} as const;

type IconName = keyof typeof ICON_MAP;

/* ── Individual stat card ── */
interface StatCardProps {
  iconName: string;
  label: string;
  description: string;
  delay: number;
}

function StatCard({ iconName, label, description, delay }: StatCardProps) {
  const Icon = ICON_MAP[iconName as IconName];

  return (
    <RevealOnScroll direction="up" delay={delay}>
      <div className="group rounded-xl border border-[#DDE8D5] bg-white p-6 hover:bg-[#3B6130] transition-all duration-300 cursor-default">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#F2F5EE] group-hover:bg-[#1E3318] transition-colors duration-300">
          <Icon
            size={20}
            className="text-[#3B6130] group-hover:text-[#8AAF78] transition-colors duration-300"
            strokeWidth={2}
          />
        </div>
        <h4 className="font-display text-base font-semibold text-[#1A1D16] group-hover:text-white mb-1.5 transition-colors duration-300">
          {label}
        </h4>
        <p className="text-xs text-[#2C3126]/70 group-hover:text-white/75 leading-relaxed transition-colors duration-300">
          {description}
        </p>
      </div>
    </RevealOnScroll>
  );
}

export default function WhyGhana() {
  return (
    <section className="bg-white section-padding">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 md:items-center">

          {/* ── Left: heading + text ── */}
          <div>
            <RevealOnScroll direction="left">
              <div className="mb-2">
                <span className="inline-block rounded-full border border-[#3B6130]/30 bg-[#F2F5EE] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#3B6130] mb-4">
                  Launch Market
                </span>
              </div>
              <h2 className="font-display text-3xl font-bold text-[#1A1D16] sm:text-4xl md:text-5xl leading-tight mb-4">
                {WHY_GHANA.heading}
              </h2>
              <div className="h-px w-20 bg-gradient-to-r from-[#4E7A3C] to-transparent mb-6" />
              <p className="text-xl font-medium text-[#3B6130] italic mb-6">
                &ldquo;{WHY_GHANA.tagline}&rdquo;
              </p>
              <p className="text-base text-[#2C3126]/75 leading-relaxed">
                {WHY_GHANA.body}
              </p>
            </RevealOnScroll>
          </div>

          {/* ── Right: 2×2 stat grid ── */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {WHY_GHANA.stats.map((stat, idx) => (
              <StatCard
                key={stat.label}
                iconName={stat.iconName}
                label={stat.label}
                description={stat.description}
                delay={idx * 0.12}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
