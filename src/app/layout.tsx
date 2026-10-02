import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import { SkipLink } from '@/components/layout/SkipLink';
import { SmoothScroll } from '@/components/ui/SmoothScroll';
import { SITE_URL, site } from '@/data/site';
import { personJsonLd } from '@/lib/json-ld';
import { themeBootstrapScript } from '@/lib/theme';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk', display: 'swap' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono', display: 'swap' });

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
    { media: '(prefers-color-scheme: dark)', color: '#0b0b10' },
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
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
