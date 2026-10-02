import { site } from './site';

export const contact = {
  headline: 'Looking for a senior developer who ships end to end?',
  subline: `${site.availability} on product and platform teams. ${site.shortLocation} — remote-friendly.`,
  cta: { label: 'Send a message', href: `mailto:${site.email}` },
} as const;
