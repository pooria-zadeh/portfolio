import { Container } from '@/components/ui/Container';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { footer } from '@/data/footer';
import { site } from '@/data/site';

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-2/60">
      <Container className="flex flex-col items-start gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs text-secondary">
          © {new Date().getFullYear()} {site.name}
        </p>
        <p className="font-mono text-xs text-secondary">{footer.builtWith}</p>
        <SocialLinks label="Social" includeEmail />
      </Container>
    </footer>
  );
}
