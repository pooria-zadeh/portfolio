import type { Metadata, Viewport } from 'next';
import { Fraunces, IBM_Plex_Mono, Manrope } from 'next/font/google';
import { SkipLink } from '@/components/layout/SkipLink';
import { SmoothScroll } from '@/components/ui/SmoothScroll';
import { SITE_URL, site } from '@/data/site';
import { personJsonLd } from '@/lib/json-ld';
import { themeBootstrapScript } from '@/lib/theme';
import './globals.css';

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' });
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz', 'SOFT', 'WONK'],
});
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
});

const TITLE = `${site.name} — ${site.shortRole}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: `%s — ${site.name}` },
  description: site.summary,
  alternates: { canonical: '/' },
  openGraph: {
    title: TITLE,
    description: site.summary,
    url: SITE_URL,
    siteName: site.name,
    locale: 'en_CA',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: site.summary },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#100e14' },
    { media: '(prefers-color-scheme: light)', color: '#faf6f1' },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${manrope.variable} ${fraunces.variable} ${plexMono.variable}`}>
      <body className="min-h-svh bg-bg font-sans text-fg antialiased">
        {/* Constant, build-time strings — no user input reaches either script. */}
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }} />
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <SkipLink />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
