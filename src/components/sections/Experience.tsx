import { ArrowUpRightIcon } from '@/components/icons';
import { Card } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { experience } from '@/data/experience';
import { getSection } from '@/data/site';

export function Experience() {
  const section = getSection('experience');
  return (
    <Section id={section.id}>
      <Reveal>
        <SectionHeading section={section} />
      </Reveal>
      <ol className="relative flex flex-col gap-6 sm:ml-3 sm:border-l sm:border-border sm:pl-8">
        {experience.map((role, i) => (
          <li key={role.company} data-role className="relative">
            <Reveal delay={Math.min(i * 0.05, 0.2)}>
              <span
                aria-hidden
                className="absolute top-8 -left-[2.55rem] hidden h-3 w-3 rounded-full border-2 border-accent bg-bg sm:block"
              />
              <Card as="article">
                <header className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <div className="min-w-0">
                    <h3 className="font-display text-xl font-semibold tracking-tight text-fg">{role.title}</h3>
                    <p className="mt-1 flex flex-wrap items-center gap-x-2 text-sm text-secondary">
                      {role.href ? (
                        <a
                          href={role.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 font-medium text-accent hover:underline"
                        >
                          {role.company}
                          <ArrowUpRightIcon size={13} />
                        </a>
                      ) : (
                        <span className="font-medium text-accent">{role.company}</span>
                      )}
                      <span aria-hidden>·</span>
                      <span>{role.tagline}</span>
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3 font-mono text-xs text-secondary">
                    <span className="whitespace-nowrap">
                      {role.start} — {role.end}
                    </span>
                    {role.current && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-success/40 bg-success/10 px-2.5 py-0.5 text-[10px] tracking-wide text-success uppercase">
                        <span aria-hidden className="h-1 w-1 rounded-full bg-success" />
                        Current
                      </span>
                    )}
                  </div>
                </header>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {role.bullets.map((bullet) => (
                    <li key={bullet} data-bullet className="flex items-start gap-3 text-sm leading-relaxed text-secondary">
                      <span aria-hidden className="mt-[9px] h-px w-3 shrink-0 bg-accent/70" />
                      <span className="min-w-0">{bullet}</span>
                    </li>
                  ))}
                </ul>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {role.stack.map((tech) => (
                    <Chip key={tech}>{tech}</Chip>
                  ))}
                </ul>
              </Card>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
