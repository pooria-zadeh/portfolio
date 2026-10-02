import { GitHubIcon, LinkedInIcon, MailIcon, StackOverflowIcon } from '@/components/icons';
import { socialLinks } from '@/data/site';
import type { SocialId } from '@/data/types';
import { cn } from '@/lib/cn';

const ICONS: Record<SocialId, (p: { size?: number }) => React.JSX.Element> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  stackoverflow: StackOverflowIcon,
  email: MailIcon,
};

interface SocialLinksProps {
  /** Accessible name for the wrapping <nav>; must be unique per page. */
  label: string;
  className?: string;
  includeEmail?: boolean;
}

/** Icon-only social links with accessible names. */
export function SocialLinks({ label, className, includeEmail = false }: SocialLinksProps) {
  const links = socialLinks.filter((l) => includeEmail || l.id !== 'email');
  return (
    <nav aria-label={label} className={cn('flex items-center gap-2', className)}>
      {links.map((link) => {
        const Icon = ICONS[link.id];
        const external = link.href.startsWith('http');
        return (
          <a
            key={link.id}
            href={link.href}
            aria-label={link.label}
            title={link.label}
            {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card/60 text-secondary transition-colors hover:border-accent/60 hover:text-fg"
          >
            <Icon size={17} />
          </a>
        );
      })}
    </nav>
  );
}
