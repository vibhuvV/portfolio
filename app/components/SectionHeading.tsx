interface SectionHeadingProps {
  children: React.ReactNode;
}

export function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <h2 className="mb-8 flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.25em] text-faint">
      <span aria-hidden="true" className="h-px w-8 bg-accent/70" />
      {children}
    </h2>
  );
}
