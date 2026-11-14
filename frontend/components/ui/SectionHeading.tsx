export type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
};

const headingTags = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
} as const;

export function SectionHeading({
  eyebrow,
  title,
  description,
  level = 2,
  className,
}: SectionHeadingProps) {
  const Heading = headingTags[level];

  return (
    <div
      className={`flex max-w-3xl flex-col items-start gap-3 text-left ${className ?? ""}`}
    >
      <p className="font-mono text-xs font-medium uppercase tracking-[0.24em] text-subtle">
        {eyebrow}
      </p>
      <Heading className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
        {title}
      </Heading>
      {description ? (
        <p className="max-w-2xl text-base leading-7 text-muted">{description}</p>
      ) : null}
    </div>
  );
}
