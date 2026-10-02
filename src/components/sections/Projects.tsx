import { ArrowUpRightIcon } from '@/components/icons';
import { Card } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { projects } from '@/data/projects';
import { getSection } from '@/data/site';
import type { Project } from '@/data/types';

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card as="article" data-project className="group flex h-full flex-col">
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">{project.kind}</p>
        {project.status && (
          <span className="rounded-md border border-border bg-muted/60 px-2 py-0.5 font-mono text-[10px] tracking-wide text-secondary uppercase">
            {project.status}
          </span>
        )}
      </div>
      <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-fg">
        {project.href ? (
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-start gap-1.5 transition-colors group-hover:text-accent"
          >
            {project.title}
            <ArrowUpRightIcon size={16} className="mt-1 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        ) : (
          project.title
        )}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-secondary text-pretty">{project.description}</p>
      <ul className="mt-4 flex flex-col gap-1.5">
        {project.outcomes.map((outcome) => (
          <li key={outcome} className="flex items-start gap-2.5 text-sm text-fg/90">
            <span aria-hidden className="mt-[9px] h-px w-3 shrink-0 bg-accent-2/80" />
            <span className="min-w-0">{outcome}</span>
          </li>
        ))}
      </ul>
      <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
        {project.stack.map((tech) => (
          <Chip key={tech}>{tech}</Chip>
        ))}
      </ul>
    </Card>
  );
}

export function Projects() {
  const section = getSection('work');
  return (
    <Section id={section.id}>
      <Reveal>
        <SectionHeading section={section} />
      </Reveal>
      <div data-testid="projects-grid" className="grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={(i % 2) * 0.08}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
