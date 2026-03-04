'use client';

/**
 * AnimatedCounter
 *
 * Counts from 0 to `target` using Framer Motion's animate() utility.
 * Starts only once the element scrolls into view.
 * Numbers >= 1 000 are formatted with toLocaleString().
 */
import { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'framer-motion';

interface AnimatedCounterProps {
  /** The final value to count up to. */
  target: number;
  /** Optional string prepended to the displayed number (e.g. "~"). */
  prefix?: string;
  /** Optional string appended to the displayed number (e.g. "M+"). */
  suffix?: string;
  /** Duration of the counting animation in seconds. Default 2. */
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({
  target,
  prefix = '',
  suffix = '',
  duration = 2,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, target, {
      duration,
      ease: 'easeOut',
      onUpdate(value) {
        // For decimals (e.g. 5.4) keep one decimal place; for integers use 0.
        const isDecimal = !Number.isInteger(target);
        setDisplayValue(isDecimal ? Math.round(value * 10) / 10 : Math.round(value));
      },
    });

    return () => controls.stop();
  }, [isInView, target, duration]);

  /** Format with locale separators for numbers >= 1000. */
  function formatValue(n: number): string {
    const isDecimal = !Number.isInteger(target);
    if (isDecimal) {
      return n.toFixed(1);
    }
    return n >= 1000 ? n.toLocaleString() : String(n);
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatValue(displayValue)}
      {suffix}
    </span>
  );
}
