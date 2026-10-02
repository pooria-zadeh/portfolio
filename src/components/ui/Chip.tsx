import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface ChipProps {
  children: ReactNode;
  className?: string;
}

export function Chip({ children, className }: ChipProps) {
  return (
    <li
      data-chip
      className={cn(
        'rounded-md border border-border bg-muted/60 px-2.5 py-1 font-mono text-[11px] leading-5 text-secondary',
        className,
      )}
    >
      {children}
    </li>
  );
}
