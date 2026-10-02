import { ArrowUpRightIcon, MailIcon } from '@/components/icons';
import { ButtonLink } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { contact } from '@/data/contact';
import { getSection, site } from '@/data/site';

export function Contact() {
  const section = getSection('contact');
  return (
    <Section id={section.id}>
      <Reveal>
        <SectionHeading section={section} />
      </Reveal>
      <Reveal>
        <Card data-testid="contact-card" className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between md:gap-10 md:p-10">
          <div className="min-w-0">
            <h3 className="font-display text-2xl font-semibold tracking-tight text-fg text-balance sm:text-3xl">
              {contact.headline}
            </h3>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-secondary">{contact.subline}</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-accent hover:underline"
            >
              <MailIcon size={16} />
              {site.email}
            </a>
          </div>
          <div className="flex shrink-0 flex-col items-start gap-4 md:items-end">
            <ButtonLink href={contact.cta.href} variant="primary">
              {contact.cta.label}
              <ArrowUpRightIcon size={16} />
            </ButtonLink>
            <SocialLinks label="Social (contact)" />
          </div>
        </Card>
      </Reveal>
    </Section>
  );
}
