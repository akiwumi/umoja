'use client';

/**
 * RevealOnScroll
 *
 * Wraps children in a Framer Motion div that animates into view
 * once the element enters the viewport. Fires once only.
 */
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

type Direction = 'up' | 'down' | 'left' | 'right';

interface RevealOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  direction?: Direction;
  className?: string;
}

/** Maps direction to the initial offset applied before the reveal. */
function getInitialOffset(direction: Direction): Record<string, number> {
  switch (direction) {
    case 'up':
      return { y: 40 };
    case 'down':
      return { y: -40 };
    case 'left':
      return { x: 60 };
    case 'right':
      return { x: -60 };
  }
}

export default function RevealOnScroll({
  children,
  delay = 0,
  direction = 'up',
  className,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Trigger once the element is 80 px into the viewport
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const initialOffset = getInitialOffset(direction);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...initialOffset }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
