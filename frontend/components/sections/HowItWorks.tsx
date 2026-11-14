import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { STEPS } from "@/lib/constants";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-border py-section">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="From username to technical insight."
          description="Three focused steps turn public GitHub information into a structured, AI-generated report."
        />

        <ol className="mt-12 grid gap-8 md:grid-cols-3 md:gap-0">
          {STEPS.map((step, index) => (
            <li
              key={step.number}
              className={`border-t border-border pt-6 md:border-t-0 md:border-l md:pl-8 md:pt-0 ${
                index === 0 ? "md:border-l-0 md:pl-0" : ""
              }`}
            >
              <p className="font-mono text-5xl font-medium tracking-tight text-accent sm:text-6xl">
                {String(step.number).padStart(2, "0")}
              </p>
              <h3 className="mt-5 text-xl font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
