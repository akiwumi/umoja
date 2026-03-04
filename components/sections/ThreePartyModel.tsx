'use client';

/**
 * ThreePartyModel
 *
 * Explains the three-way partnership model between UMOJA-ai,
 * Government, and Telecom Partners on a dark navy background.
 */
import { Cpu, Building2, Radio } from 'lucide-react';
import RevealOnScroll from '@/components/ui/RevealOnScroll';
import { THREE_PARTY } from '@/lib/constants';

/* Icon map */
const ICON_MAP = {
  Cpu,
  Building2,
  Radio,
} as const;

type IconName = keyof typeof ICON_MAP;
type PartyColor = 'green' | 'gold';

/* ── Single party column ── */
interface PartyColumnProps {
  iconName: string;
  name: string;
  color: PartyColor;
  description: string;
  delay: number;
}

function PartyColumn({ iconName, name, color, description, delay }: PartyColumnProps) {
  const Icon = ICON_MAP[iconName as IconName];

  const iconBg = color === 'green' ? 'bg-[#1B5E20]/60' : 'bg-[#F9A825]/20';
  const iconColor = color === 'green' ? 'text-[#66BB6A]' : 'text-[#F9A825]';
  const nameBorderColor = color === 'green' ? 'border-[#4CAF50]/40' : 'border-[#F9A825]/40';
  const nameTextColor = color === 'green' ? 'text-[#81C784]' : 'text-[#FFCA28]';

  return (
    <RevealOnScroll direction="up" delay={delay}>
      <div className="flex flex-col items-center text-center px-6 py-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300">
        {/* Icon circle */}
        <div className={`mb-5 flex h-16 w-16 items-center justify-center rounded-full ${iconBg}`}>
          <Icon size={32} className={iconColor} strokeWidth={1.5} />
        </div>

        {/* Party name */}
        <h3 className={`font-display text-xl font-semibold mb-3 border-b pb-3 w-full ${nameBorderColor} ${nameTextColor}`}>
          {name}
        </h3>

        {/* Description */}
        <p className="text-sm text-white/60 leading-relaxed mt-3">
          {description}
        </p>
      </div>
    </RevealOnScroll>
  );
}

/* ── Connector dot between columns ── */
function Connector() {
  return (
    <div className="hidden md:flex items-center justify-center self-center px-3" aria-hidden="true">
      <div className="flex flex-col items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-1.5 w-1.5 rounded-full bg-[#4CAF50]/40" />
        ))}
      </div>
    </div>
  );
}

export default function ThreePartyModel() {
  return (
    <section className="bg-[#16213E] section-padding">
      <div className="mx-auto max-w-7xl px-6 md:px-8">

        {/* ── Heading ── */}
        <RevealOnScroll direction="up">
          <div className="text-center mb-4">
            <span className="inline-block rounded-full border border-[#4CAF50]/30 bg-[#4CAF50]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#66BB6A] mb-4">
              The Partnership Model
            </span>
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              {THREE_PARTY.heading}
            </h2>
            <div className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent via-[#F9A825] to-transparent" />
          </div>
        </RevealOnScroll>

        {/* ── Subheading ── */}
        <RevealOnScroll direction="up" delay={0.1}>
          <p className="text-center text-lg text-[#FFCA28] mb-14 font-medium">
            {THREE_PARTY.subheading}
          </p>
        </RevealOnScroll>

        {/* ── Three columns with connectors ── */}
        <div className="flex flex-col gap-6 md:flex-row md:items-stretch md:gap-0">
          {THREE_PARTY.parties.map((party, idx) => (
            <div key={party.name} className="flex flex-col md:flex-row md:flex-1 md:items-stretch">
              <div className="flex-1">
                <PartyColumn
                  iconName={party.iconName}
                  name={party.name}
                  color={party.color}
                  description={party.description}
                  delay={idx * 0.15}
                />
              </div>
              {idx < THREE_PARTY.parties.length - 1 && <Connector />}
            </div>
          ))}
        </div>

        {/* ── Centered quote ── */}
        <RevealOnScroll direction="up" delay={0.5}>
          <div className="mt-16 mx-auto max-w-3xl text-center">
            <p className="text-base text-white/50 leading-relaxed italic md:text-lg">
              {THREE_PARTY.quote}
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
