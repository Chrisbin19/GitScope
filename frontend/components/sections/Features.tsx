import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FEATURES } from "@/lib/constants";

export function Features() {
  return (
    <section id="features" className="py-section">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <SectionHeading
            eyebrow="Features"
            title="A clearer read on public GitHub work."
            description="GitScope examines profile context, repositories, languages, and technical focus, then brings the evidence together into one concise report."
          />

          <ul className="divide-y divide-border border-y border-border">
            {FEATURES.map((feature, index) => (
              <li
                key={feature.title}
                className="grid gap-2 py-6 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-6"
              >
                <span className="font-mono text-xs font-medium text-subtle">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-base font-medium text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-muted">
                    {feature.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
