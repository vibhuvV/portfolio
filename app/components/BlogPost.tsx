import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { formatDate } from "~/lib/utils";

interface BlogPostProps {
  title: string;
  date: string;
  excerpt: string;
  link: string;
}

export function BlogPost({ title, date, excerpt, link }: BlogPostProps) {
  return (
    <article className="group rounded-xl border border-line bg-surface p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-faint sm:p-6">
      <h3 className="text-lg font-semibold">
        <Link
          to={link}
          className="text-ink transition-colors duration-200 group-hover:text-accent"
        >
          {title}
        </Link>
      </h3>
      <p className="mt-1 font-mono text-xs tracking-wide text-faint">
        {formatDate(date)}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted">{excerpt}</p>
    </article>
  );
}
