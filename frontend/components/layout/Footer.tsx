import { Container } from "@/components/ui/Container";
import { GITHUB_REPO_URL, NAV_LINKS } from "@/lib/constants";

const footerLinks = NAV_LINKS.filter((link) => !link.external);

const linkClasses =
  "inline-block rounded-sm text-sm text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export async function Footer() {
  "use cache";

  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <Container className="py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm space-y-3">
            <a
              href="#home"
              className="inline-block font-mono text-lg font-semibold tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              GitScope
            </a>
            <p className="text-sm leading-6 text-muted">
              Turn public GitHub profiles and repositories into clear,
              AI-powered technical insights.
            </p>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-[0.24em] text-subtle">
                Navigation
              </p>
              <nav
                aria-label="Footer navigation"
                className="mt-4 flex flex-col items-start gap-2.5"
              >
                {footerLinks.map((link) => (
                  <a key={link.href} href={link.href} className={linkClasses}>
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            <div>
              <p className="font-mono text-xs font-medium uppercase tracking-[0.24em] text-subtle">
                Repository
              </p>
              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-4 ${linkClasses}`}
              >
                GitHub repository
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-xs text-subtle">
            © {year} GitScope. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
