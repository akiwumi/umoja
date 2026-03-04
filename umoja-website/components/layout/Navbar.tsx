'use client';

/**
 * Navbar
 *
 * Fixed top navigation that:
 *   - Starts transparent
 *   - Transitions to a dark frosted-glass background after 20 px of scroll
 *   - Collapses to a hamburger menu on mobile
 *   - Includes a gold "Partner With Us" CTA that scrolls to #contact
 */
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS, SITE } from '@/lib/constants';
import Button from '@/components/ui/Button';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* ── Detect scroll ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Close mobile menu when viewport widens to desktop ── */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  function handleNavClick(href: string) {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-[#1A1D16]/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent',
      ].join(' ')}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
        {/* ── Logo ── */}
        <a
          href="#"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center hover:opacity-80 transition-opacity"
          aria-label="UMOJA-ai — home"
        >
          <Image
            src="/umoja-logo.gif"
            alt={SITE.name}
            width={140}
            height={40}
            className="h-9 w-auto"
            unoptimized
            priority
          />
        </a>

        {/* ── Desktop links ── */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium text-white/80 hover:text-white transition-colors cursor-pointer min-h-[44px] px-1"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* ── Desktop CTA ── */}
        <div className="hidden md:block">
          <Button
            variant="primary"
            onClick={() => handleNavClick('#contact')}
            className="text-sm"
          >
            Partner With Us
          </Button>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          className="flex md:hidden items-center justify-center min-h-[44px] min-w-[44px] rounded-lg text-white hover:bg-white/10 transition-colors"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* ── Mobile dropdown ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden bg-[#1A1D16]/98 backdrop-blur-md border-t border-white/10 md:hidden"
          >
            <ul className="flex flex-col px-6 py-4 gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="w-full text-left text-base font-medium text-white/80 hover:text-white py-3 px-2 rounded-lg hover:bg-white/5 transition-colors min-h-[44px]"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="pt-3 pb-1">
                <Button
                  variant="primary"
                  onClick={() => handleNavClick('#contact')}
                  className="w-full"
                >
                  Partner With Us
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
