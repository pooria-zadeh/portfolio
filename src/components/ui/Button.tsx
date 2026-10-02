import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md';

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Adds target=_blank and rel=noreferrer. */
  external?: boolean;
}

const VARIANT: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-accent to-accent-2 text-on-accent shadow-glow hover:brightness-110 active:brightness-95',
  secondary: 'border border-border bg-card/60 text-fg hover:border-accent/60 hover:bg-card',
  ghost: 'text-secondary hover:text-fg',
};

const SIZE: Record<Size, string> = {
  sm: 'min-h-10 px-3.5 text-[13px]',
  md: 'min-h-11 px-5 text-sm',
};

/** Anchor styled as a button. Every call site links somewhere, so this is always an `<a>`. */
export function ButtonLink({
  href,
  children,
  variant = 'primary',
  size = 'md',
  external,
  className,
  ...rest
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      {...rest}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium whitespace-nowrap transition-[color,background-color,border-color,filter] duration-200',
        VARIANT[variant],
        SIZE[size],
        className,
      )}
    >
      {children}
    </a>
  );
}
