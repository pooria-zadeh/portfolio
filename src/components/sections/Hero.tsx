import { ArrowDownIcon } from '@/components/icons';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { hero } from '@/data/hero';
import { site } from '@/data/site';

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-svh flex-col justify-center overflow-hidden pt-[var(--nav-height)]">
      {/* Decorative background: grid + glow. Clipped by overflow-hidden on the section. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
        <div className="absolute -top-40 left-1/2 h-[32rem] w-[48rem] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute top-1/3 -right-40 h-80 w-80 rounded-full bg-accent-2/10 blur-3xl" />
      </div>

      <Container className="py-16 sm:py-24">
        <Reveal>
          <p className="mb-6 flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_var(--accent)]" />
            {hero.eyebrow}
          </p>
          <h1 className="text-gradient font-display text-[clamp(2.7rem,10vw,6.75rem)] leading-[0.98] font-semibold text-balance">
            {site.name}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-secondary text-pretty sm:text-xl">{hero.pitch}</p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1.5 font-mono text-xs text-secondary">
            <span aria-hidden className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            {hero.availability}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {hero.ctas.map((cta) => (
              <ButtonLink key={cta.href} href={cta.href} variant={cta.variant}>
                {cta.label}
              </ButtonLink>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <dl data-testid="hero-stats" className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4">
            {hero.stats.map((stat) => (
              <div key={stat.label} className="flex min-w-0 flex-col gap-1 bg-card/90 p-5">
                <dd className="order-1 font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl">{stat.figure}</dd>
                <dt className="order-2 font-mono text-[11px] leading-snug tracking-wide text-secondary uppercase">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>

      <a
        href={hero.scrollCue.href}
        aria-label={hero.scrollCue.label}
        className="absolute bottom-6 left-1/2 hidden h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border border-border bg-card/60 text-secondary transition-colors hover:text-fg motion-safe:animate-bounce-slow sm:inline-flex"
      >
        <ArrowDownIcon size={16} />
      </a>
    </section>
  );
}
