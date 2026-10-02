import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { about } from '@/data/about';
import { getSection } from '@/data/site';

export function About() {
  const section = getSection('about');
  return (
    <Section id={section.id}>
      <Reveal>
        <SectionHeading section={section} />
      </Reveal>
      <div data-testid="about-grid" className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-16">
        <Reveal>
          <h3 className="font-display text-2xl font-semibold tracking-tight text-fg text-balance sm:text-3xl">
            {about.headline}
          </h3>
          <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-secondary">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <Card className="h-full">
            <p className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">{about.focusAreasTitle}</p>
            <ul className="mt-5 flex flex-col gap-3">
              {about.focusAreas.map((area) => (
                <li key={area} className="flex items-start gap-3 text-sm text-fg">
                  <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 border border-accent-2" />
                  {area}
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
