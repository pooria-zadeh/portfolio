import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/** Centred content column with a 16px gutter on phones. */
export function Container({ children, className }: ContainerProps) {
  return <div className={cn('mx-auto w-full max-w-[68rem] px-4 sm:px-6 lg:px-8', className)}>{children}</div>;
}
