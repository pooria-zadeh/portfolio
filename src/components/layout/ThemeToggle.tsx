'use client';

import { useSyncExternalStore } from 'react';
import { MoonIcon, SunIcon } from '@/components/icons';
import { applyTheme, DEFAULT_THEME, readTheme, type Theme } from '@/lib/theme';

/** Subscribe to html[data-theme] changes so the label tracks the real attribute. */
function subscribe(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
}

/**
 * Flips html[data-theme] and persists the choice. The inline bootstrap in
 * layout.tsx sets the attribute before hydration; this component reads it
 * through useSyncExternalStore (server snapshot = default theme), and the
 * icons swap purely via CSS so server markup never mismatches.
 */
export function ThemeToggle({ className = '' }: { className?: string }) {
  const theme = useSyncExternalStore<Theme>(subscribe, readTheme, () => DEFAULT_THEME);
  const next: Theme = theme === 'light' ? 'dark' : 'light';

  return (
    <button
      type="button"
      data-testid="theme-toggle"
      aria-label={`Switch to ${next} theme`}
      onClick={() => applyTheme(next)}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card/60 text-secondary transition-colors hover:border-accent/60 hover:text-fg ${className}`}
    >
      <SunIcon className="hidden dark:block" />
      <MoonIcon className="block dark:hidden" />
    </button>
  );
}
