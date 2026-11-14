import { UsernameForm } from "@/components/forms/UsernameForm";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-heading" className="py-section">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-16">
          <div className="max-w-2xl text-left">
            <h1
              id="hero-heading"
              className="text-4xl font-semibold leading-[1.05] text-foreground sm:text-5xl lg:text-6xl"
            >
              Understand Any GitHub Developer.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
              Explore GitHub profiles, analyze repositories, and uncover the
              technologies and technical expertise behind any developer using
              AI.
            </p>

            <div className="mt-8 max-w-xl">
              <UsernameForm />
              <p className="mt-3 text-xs text-subtle">
                Only public GitHub data is analyzed.
              </p>
            </div>
          </div>

          <aside
            aria-label="Sample GitScope report"
            className="w-full max-w-xl lg:ml-auto"
          >
            <div className="overflow-hidden rounded-md border border-border bg-surface">
              <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-foreground">
                  Sample output
                </p>
                <p className="font-mono text-[11px] text-subtle">
                  GitScope report
                </p>
              </div>

              <div className="px-5 py-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
                      Developer
                    </p>
                    <p className="mt-1 font-mono text-lg text-foreground">
                      example-dev
                    </p>
                  </div>
                  <span className="rounded-sm border border-border-strong px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                    Public profile
                  </span>
                </div>

                <div className="mt-6 border-t border-border pt-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
                    Languages
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    TypeScript, Python, and Go, with most repositories centered
                    on web applications and developer tooling.
                  </p>
                </div>

                <div className="mt-5 border-t border-border pt-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
                    Frameworks and tools
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    React, Next.js, FastAPI, PostgreSQL, Docker, and GitHub
                    Actions.
                  </p>
                </div>

                <div className="mt-5 border-t border-border pt-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
                    Summary
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    A product-minded developer focused on full-stack
                    applications, automation, and practical developer tools.
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-3 text-right font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
              Static preview · fictional profile
            </p>
          </aside>
        </div>
      </Container>
    </section>
  );
}
