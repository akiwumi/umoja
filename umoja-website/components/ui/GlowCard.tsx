'use client';

/**
 * GlowCard
 *
 * A dark-themed card that applies a soft green glow on hover.
 * The glow is achieved by toggling the `animate-glow-pulse` class
 * (defined in globals.css) while the mouse is over the card.
 */
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlowCard({ children, className }: GlowCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        // Base card styles
        'rounded-2xl border border-[#1E3318] bg-[#0D1F0D] p-8 transition-all duration-300',
        // Permanent subtle shadow; glow-pulse animates on hover
        hovered ? 'animate-glow-pulse scale-[1.02]' : 'shadow-lg',
        className,
      )}
    >
      {children}
    </div>
  );
}
