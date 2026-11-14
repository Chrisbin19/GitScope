import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  return (
    <section id="about" className="border-t border-border py-section">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <SectionHeading
            eyebrow="About"
            title="Clarity from public GitHub evidence."
          />

          <div className="max-w-prose space-y-5 text-base leading-7 text-muted">
            <p>
              GitScope is a tool for exploring public GitHub profiles and
              repositories. It brings profile details, repository context, and
              technology signals together in a single readable report.
            </p>
            <p>
              It was built to make it faster to understand a developer&apos;s
              work from public GitHub evidence, without manually piecing
              together repositories, languages, and project descriptions.
            </p>
            <p>
              GitScope reads publicly available GitHub information and uses AI
              to organize that evidence into a concise summary of technical
              focus, languages, frameworks, tools, and areas of activity.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
