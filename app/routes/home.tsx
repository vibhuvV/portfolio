import type { Route } from "./+types/home";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { BlogPost } from "~/components/BlogPost";
import ExperienceItem from "~/components/ExperienceItem";
import { SocialHandleList } from "~/components/SocialHandle";
import { SectionHeading } from "~/components/SectionHeading";
import { ProjectCard } from "~/components/ProjectCard";
import { MY_DETAILS, SOCIAL_HANDLE_LIST } from "~/lib/constants";
import { buildMeta, personJsonLd } from "~/lib/seo";
import { getBlogsMetadataList } from "~/lib/services.server";

export function meta({}: Route.MetaArgs) {
  return buildMeta({
    title: `${MY_DETAILS.name} | ${MY_DETAILS.designation}`,
    description:
      "Portfolio of Vaibhav Verma, a senior software engineer specializing in React, TypeScript, and scalable UI systems for SaaS platforms.",
    path: "",
  });
}

export async function loader({}: Route.LoaderArgs) {
  const blogs = await getBlogsMetadataList(3);
  return { blogs };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <header className="pt-4 sm:pt-8">
        {MY_DETAILS.availability && (
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs text-muted">
            <span aria-hidden="true" className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {MY_DETAILS.availability}
          </span>
        )}
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-accent">
          {MY_DETAILS.designation}
        </p>
        <h1 className="mt-4 bg-gradient-to-r from-ink via-body to-muted bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl">
          {MY_DETAILS.name}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          {MY_DETAILS.tagline}
        </p>
        <SocialHandleList socialsList={SOCIAL_HANDLE_LIST} className="mt-8" />
      </header>

      <section>
        <SectionHeading>About</SectionHeading>
        <p className="max-w-2xl leading-relaxed text-body">
          {MY_DETAILS.summary}
        </p>
      </section>

      {MY_DETAILS.projects.length > 0 && (
        <section>
          <SectionHeading>Projects</SectionHeading>
          <div className="grid gap-4 sm:grid-cols-2">
            {MY_DETAILS.projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>
      )}

      <section>
        <SectionHeading>Experience</SectionHeading>
        <ol className="relative ml-1 space-y-12 border-l border-line">
          {MY_DETAILS.experience.map((exp, index) => (
            <ExperienceItem
              key={exp.title + index}
              title={exp.title}
              company={exp.company}
              period={exp.period}
              description={exp.description}
            />
          ))}
        </ol>
      </section>

      <section>
        <SectionHeading>Skills</SectionHeading>
        <div className="grid gap-8 sm:grid-cols-2">
          {MY_DETAILS.skills.map((group) => (
            <div key={group.category}>
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-faint">
                {group.category}
              </p>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <li
                    key={skill}
                    className="cursor-default rounded-full border border-line bg-surface px-3 py-1 text-xs text-muted transition-colors duration-200 hover:border-faint hover:text-body"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading>Latest Posts</SectionHeading>
        <div className="space-y-4">
          {loaderData.blogs.map((blog) => (
            <BlogPost
              key={blog.name}
              title={blog.attributes.title}
              date={blog.attributes.datetime}
              excerpt={blog.attributes.description}
              link={`/blogs/${blog.name}`}
            />
          ))}
        </div>
        <Link
          to="/blogs"
          className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors duration-200 hover:text-accent-hover"
        >
          View all posts <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
