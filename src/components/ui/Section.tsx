import type { ReactNode } from 'react';
import { Container } from '@/components/ui/Container';
import type { SectionId } from '@/data/types';
import { cn } from '@/lib/cn';

interface SectionProps {
  id: SectionId;
  children: ReactNode;
  className?: string;
}

/** Page section with an anchor target offset for the fixed header. */
export function Section({ id, children, className }: SectionProps) {
  return (
    <section id={id} className={cn('relative scroll-mt-24 py-20 sm:py-28', className)}>
      <Container>{children}</Container>
    </section>
  );
}
