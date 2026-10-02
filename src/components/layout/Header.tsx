'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { CloseIcon, DownloadIcon, MenuIcon } from '@/components/icons';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { nav, sections, site } from '@/data/site';
import { cn } from '@/lib/cn';
import { withBasePath } from '@/lib/paths';

/** Which section is "current": the one occupying the band 40–55% down the viewport. */
function useActiveSection(): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = sections.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => !!el);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActiveId(visible[0].target.id);
        else if (window.scrollY < 200) setActiveId(null);
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return activeId;
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const activeId = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the menu if the viewport grows past the breakpoint while it's open.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = () => mq.matches && setMenuOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    toggleRef.current?.focus();
  }, []);

  return (
    <>
      <header
        data-testid="site-header"
        data-scrolled={scrolled || menuOpen}
        className={cn(
          'fixed inset-x-0 top-0 z-50 h-[var(--nav-height)] transition-[background-color,border-color,backdrop-filter] duration-300',
          scrolled || menuOpen ? 'border-b border-border bg-nav backdrop-blur-xl' : 'border-b border-transparent bg-transparent',
        )}
      >
        <Container className="flex h-full items-center justify-between gap-4">
          <a href="#top" className="flex min-h-10 min-w-0 items-center gap-3" aria-label={`${site.name} — home`}>
            <span
              aria-hidden
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-2 font-mono text-xs font-bold text-on-accent shadow-glow"
            >
              {site.initials}
            </span>
            <span className="truncate font-display text-sm font-semibold tracking-tight text-fg sm:text-[15px]">{site.name}</span>
          </a>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => {
                const active = activeId === item.href.slice(1);
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      data-nav-link
                      aria-current={active ? 'true' : undefined}
                      className={cn(
                        'relative inline-flex min-h-10 items-center rounded-md px-3 font-mono text-[13px] tracking-wide transition-colors',
                        active ? 'text-fg' : 'text-secondary hover:text-fg',
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className={cn(
                          'absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-accent to-accent-2 transition-opacity',
                          active ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <ButtonLink
              href={withBasePath(site.resumeHref)}
              variant="secondary"
              size="sm"
              data-testid="resume-link"
              className="hidden sm:inline-flex"
            >
              <DownloadIcon size={15} />
              Résumé
            </ButtonLink>
            <button
              ref={toggleRef}
              type="button"
              data-testid="menu-toggle"
              aria-controls="mobile-menu"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card/60 text-fg transition-colors hover:border-accent/60 md:hidden"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </Container>
      </header>
      <MobileMenu open={menuOpen} onClose={closeMenu} activeId={activeId} />
    </>
  );
}
