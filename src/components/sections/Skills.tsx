import { Card } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { education, languages } from '@/data/education';
import { getSection } from '@/data/site';
import { skillGroups } from '@/data/skills';

export function Skills() {
  const section = getSection('skills');
  return (
    <Section id={section.id}>
      <Reveal>
        <SectionHeading section={section} />
      </Reveal>
      <ul data-testid="skills-grid" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <li key={group.name} data-skill-group={group.name} className="h-full">
            <Reveal delay={Math.min(i * 0.04, 0.2)} className="h-full">
              <Card className="h-full">
              <h3 className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">{group.name}</h3>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <Chip key={item}>{item}</Chip>
                ))}
              </ul>
              </Card>
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">Education</p>
            <ul className="mt-4 flex flex-col gap-4">
              {education.map((entry) => (
                <li key={entry.degree} className="flex flex-col gap-1 border-l border-border pl-4 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <p className="font-display text-base font-semibold text-fg">{entry.degree}</p>
                    <p className="text-sm text-secondary">{entry.school}</p>
                  </div>
                  <p className="font-mono text-xs text-secondary">{entry.year}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">Languages</p>
            <ul className="mt-4 flex flex-col gap-3">
              {languages.map((language) => (
                <li key={language.name} className="flex items-baseline justify-between border-l border-border pl-4">
                  <span className="text-sm font-medium text-fg">{language.name}</span>
                  <span className="font-mono text-xs text-secondary">{language.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
