/**
 * Root layout
 *
 * Wraps every page with:
 *   - Global CSS (design tokens, Google Fonts, keyframes)
 *   - Sonner toast provider
 *   - Persistent Navbar + Footer
 *
 * No next/font — fonts are loaded via the Google Fonts @import in globals.css.
 */
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'sonner';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { META } from '@/lib/constants';

export const metadata: Metadata = {
  title: META.title,
  description: META.description,
  openGraph: {
    title: META.title,
    description: META.description,
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* Global toast notifications */}
        <Toaster
          position="top-center"
          richColors
          toastOptions={{
            style: {
              fontFamily: 'var(--font-body)',
            },
          }}
        />

        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
