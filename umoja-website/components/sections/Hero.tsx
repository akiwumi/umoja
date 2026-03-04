'use client';

/**
 * Hero
 *
 * Full-viewport opening section featuring:
 *   - classroom.png background with layered dark overlay
 *   - Staggered Framer Motion text entrance (fires on mount, not scroll)
 *   - Animated floating SVG geometric shapes
 *   - Two CTA buttons
 */
import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { HERO } from '@/lib/constants';

/* ── Animation variants ── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

/* ── Floating shapes data ── */
interface ShapeConfig {
  id: number;
  cx: number;
  cy: number;
  r?: number;
  points?: string;
  type: 'circle' | 'polygon' | 'hexagon';
  delay: number;
  opacity: number;
  size: number;
  color: string;
}

const SHAPES: ShapeConfig[] = [
  {
    id: 1,
    type: 'hexagon',
    cx: 80,
    cy: 20,
    delay: 0,
    opacity: 0.15,
    size: 80,
    color: '#6A9556',
    points: '40,4 76,24 76,60 40,76 4,60 4,24',
  },
  {
    id: 2,
    type: 'circle',
    cx: 88,
    cy: 65,
    r: 120,
    delay: 1.2,
    opacity: 0.08,
    size: 240,
    color: '#8AAF78',
  },
  {
    id: 3,
    type: 'polygon',
    cx: 10,
    cy: 75,
    delay: 0.6,
    opacity: 0.1,
    size: 120,
    color: '#E8BC20',
    points: '60,5 115,30 115,90 60,115 5,90 5,30',
  },
  {
    id: 4,
    type: 'hexagon',
    cx: 5,
    cy: 20,
    delay: 1.8,
    opacity: 0.12,
    size: 60,
    color: '#6A9556',
    points: '30,3 57,18 57,45 30,57 3,45 3,18',
  },
  {
    id: 5,
    type: 'polygon',
    cx: 60,
    cy: 85,
    delay: 0.9,
    opacity: 0.06,
    size: 200,
    color: '#8AAF78',
    points: '100,10 190,55 190,145 100,190 10,145 10,55',
  },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">

      {/* ── Background image ── */}
      <Image
        src="/classroom.png"
        alt=""
        fill
        priority
        className="object-cover object-center"
        aria-hidden="true"
      />

      {/* ── Dark overlay: green-tinted gradient for brand consistency ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.65) 100%)',
        }}
      />

      {/* ── Floating geometric shapes ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {SHAPES.map((shape) => (
          <motion.div
            key={shape.id}
            className="absolute"
            style={{
              left: `${shape.cx}%`,
              top: `${shape.cy}%`,
              width: shape.size,
              height: shape.size,
              animationDelay: `${shape.delay}s`,
            }}
            animate={{
              y: [0, -18, 0],
              rotate: shape.type === 'polygon' ? [0, 8, 0] : [0, 3, 0],
            }}
            transition={{
              duration: 5 + shape.delay,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: shape.delay,
            }}
          >
            <svg
              viewBox={`0 0 ${shape.size} ${shape.size}`}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
              style={{ opacity: shape.opacity }}
            >
              {shape.type === 'circle' ? (
                <circle
                  cx={shape.size / 2}
                  cy={shape.size / 2}
                  r={shape.size / 2 - 2}
                  stroke={shape.color}
                  strokeWidth="2"
                />
              ) : (
                <polygon
                  points={shape.points}
                  stroke={shape.color}
                  strokeWidth="2"
                  fill={shape.color}
                  fillOpacity="0.05"
                />
              )}
            </svg>
          </motion.div>
        ))}
      </div>


      {/* ── Main content ── */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-24 text-center md:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Pre-heading badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-block rounded-full border border-[#6A9556]/40 bg-[#6A9556]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#8AAF78]">
              AI-Assisted Education
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {HERO.headline}
          </motion.h1>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="mx-auto mt-6 mb-8 h-px w-24 bg-gradient-to-r from-transparent via-[#E8BC20] to-transparent"
          />

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="mx-auto max-w-2xl text-lg text-white/70 leading-relaxed md:text-xl"
          >
            {HERO.subheadline}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Button
              variant="outline"
              href="#crisis"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#crisis')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="min-w-[160px]"
            >
              {HERO.ctaPrimary}
            </Button>
            <Button
              variant="primary"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="min-w-[160px]"
            >
              {HERO.ctaSecondary}
            </Button>
          </motion.div>
        </motion.div>

        {/* ── Scroll indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          aria-hidden="true"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex h-8 w-5 items-start justify-center rounded-full border border-white/30 p-1"
          >
            <div className="h-2 w-0.5 rounded-full bg-white/50" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
