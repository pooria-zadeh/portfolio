import type { SectionMeta } from '@/data/types';

interface SectionHeadingProps {
  section: SectionMeta;
}

/** Dotted mono eyebrow, two-digit index and display title — identical for every section. */
export function SectionHeading({ section }: SectionHeadingProps) {
  return (
    <div className="mb-10 sm:mb-14">
      <p
        data-section-eyebrow
        className="mb-3 flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-accent uppercase"
      >
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_var(--accent)]" />
        {section.eyebrow}
      </p>
      <div className="flex items-baseline gap-4">
        <span data-section-index aria-hidden className="font-mono text-sm text-accent/80 tabular-nums">
          {section.number}
        </span>
        <h2 className="font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl">{section.title}</h2>
      </div>
    </div>
  );
}
