import { ArrowUpRight } from "lucide-react";
import type { Project } from "~/lib/constants";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="flex flex-col rounded-xl border border-line bg-surface p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-faint sm:p-6">
      <h3 className="text-lg font-semibold">
        {project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-ink transition-colors duration-200 hover:text-accent"
          >
            {project.title}
            <ArrowUpRight aria-hidden="true" className="h-4 w-4 text-faint" />
          </a>
        ) : (
          project.title
        )}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {project.description}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <li
            key={tech}
            className="rounded-full border border-line px-2.5 py-0.5 font-mono text-xs text-faint"
          >
            {tech}
          </li>
        ))}
      </ul>
    </article>
  );
}
