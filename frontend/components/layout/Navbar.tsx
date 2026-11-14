import { MobileMenu } from "@/components/layout/MobileMenu";
import { Container } from "@/components/ui/Container";
import { NAV_LINKS } from "@/lib/constants";

const linkClasses =
  "rounded-md px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <Container className="flex h-16 items-center justify-between gap-6">
        <a
          href="#home"
          className="font-mono text-lg font-semibold tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          GitScope
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className={linkClasses}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <MobileMenu links={NAV_LINKS} />
      </Container>
    </header>
  );
}
