/**
 * Footer
 *
 * Dark charcoal background with:
 *   - Logo + tagline on the left
 *   - Quick nav links
 *   - Copyright and Swahili note
 *
 * Server component — no interactivity required.
 */
import { SITE, NAV_LINKS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-[#1A1D16] border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">

          {/* ── Brand column ── */}
          <div className="flex flex-col gap-4">
            <span className="font-display text-2xl font-bold text-[#8AAF78]">
              {SITE.name}
            </span>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              {SITE.tagline}
            </p>
            <p className="text-xs text-white/40 italic">{SITE.footerNote}</p>
          </div>

          {/* ── Navigation column ── */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
              Navigation
            </h3>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  className="text-sm text-[#E8BC20]/80 hover:text-[#E8BC20] transition-colors font-medium"
                >
                  Partner With Us
                </a>
              </li>
            </ul>
          </div>

          {/* ── Contact column ── */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
              Get in Touch
            </h3>
            <a
              href={`mailto:${SITE.email}`}
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              {SITE.email}
            </a>
            <p className="mt-6 text-xs text-white/30 leading-relaxed">
              Building the infrastructure for equitable education across the African continent.
            </p>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-white/40">{SITE.copyright}</p>
          <p className="text-xs text-white/30 italic">{SITE.footerNote}</p>
        </div>
      </div>
    </footer>
  );
}
