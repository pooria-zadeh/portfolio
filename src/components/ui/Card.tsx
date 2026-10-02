import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface CardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  /** Render as a different element (article, li, div). */
  as?: 'div' | 'article' | 'li';
  /** Draw the decorative corner brackets. */
  brackets?: boolean;
  className?: string;
}

/** Bordered surface with optional corner-bracket decoration (the reference site's card motif). */
export function Card({ children, as: Tag = 'div', brackets = true, className, ...rest }: CardProps) {
  return (
    <Tag
      {...rest}
      className={cn(
        'relative rounded-xl border border-border bg-card/80 p-6 shadow-card backdrop-blur-sm transition-colors duration-300 hover:border-accent/50 sm:p-7',
        className,
      )}
    >
      {brackets && (
        <span aria-hidden className="pointer-events-none absolute inset-0">
          <span className="absolute top-2 left-2 h-3 w-3 border-t border-l border-accent/60" />
          <span className="absolute right-2 bottom-2 h-3 w-3 border-r border-b border-accent/60" />
        </span>
      )}
      {children}
    </Tag>
  );
}
