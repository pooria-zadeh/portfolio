import { SITE_URL, site } from '@/data/site';

/** schema.org Person record rendered in the root layout. */
export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    jobTitle: site.shortRole,
    description: site.summary,
    email: `mailto:${site.email}`,
    url: SITE_URL,
    address: { '@type': 'PostalAddress', addressLocality: 'Waterloo', addressRegion: 'ON', addressCountry: 'CA' },
    sameAs: Object.values(site.links),
    knowsAbout: ['React', 'Next.js', 'TypeScript', 'Nest.js', 'Node.js', 'Python', 'Observability', 'AI-assisted development'],
  };
}
