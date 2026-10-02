'use client';

import { useEffect, useRef } from 'react';
import { DownloadIcon } from '@/components/icons';
import { ButtonLink } from '@/components/ui/Button';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { nav, site } from '@/data/site';
import { withBasePath } from '@/lib/paths';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  activeId: string | null;
}

/**
 * Full-width panel under the header on small screens. Rendered only while
 * open (so it is truly hidden otherwise), locks body scroll, closes on
 * Escape and on any link choice. Focus is returned to the toggle by Header.
 */
export function MobileMenu({ open, onClose, activeId }: MobileMenuProps) {
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    firstLink.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-x-0 top-[var(--nav-height)] bottom-0 z-40 overflow-y-auto border-t border-border bg-bg/95 backdrop-blur-xl md:hidden"
    >
      <nav aria-label="Mobile" className="px-4 pt-4 pb-6">
        <ul className="flex flex-col">
          {nav.map((item, i) => {
            const active = activeId === item.href.slice(1);
            return (
              <li key={item.href}>
                <a
                  ref={i === 0 ? firstLink : undefined}
                  href={item.href}
                  data-nav-link
                  aria-current={active ? 'true' : undefined}
                  onClick={onClose}
                  className="flex min-h-12 items-center justify-between border-b border-border/70 font-display text-lg text-fg"
                >
                  {item.label}
                  <span aria-hidden className="font-mono text-xs text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
        <div className="mt-6 flex flex-col gap-4">
          <ButtonLink href={withBasePath(site.resumeHref)} variant="primary" data-testid="resume-link-mobile" onClick={onClose}>
            <DownloadIcon size={16} />
            Résumé (PDF)
          </ButtonLink>
          <SocialLinks label="Social (menu)" includeEmail />
        </div>
      </nav>
    </div>
  );
}
