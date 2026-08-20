interface ExperienceItemProps {
  title: string;
  company: string;
  period: string;
  description: string[];
}

export default function ExperienceItem({
  title,
  company,
  period,
  description,
}: ExperienceItemProps) {
  const [dates, location] = period.split("|").map((part) => part.trim());

  return (
    <li className="relative pl-8">
      <span
        aria-hidden="true"
        className="absolute -left-[5px] top-[0.45rem] h-[11px] w-[11px] rounded-full border-2 border-base bg-accent"
      />
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h4 className="text-base font-semibold text-ink sm:text-lg">
          {title} <span className="font-normal text-muted">· {company}</span>
        </h4>
        <p className="font-mono text-xs tracking-wide text-faint">{dates}</p>
      </div>
      {location && (
        <p className="mt-0.5 font-mono text-xs tracking-wide text-faint">
          {location}
        </p>
      )}
      {description.length > 0 && (
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted marker:text-faint">
          {description.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </li>
  );
}
