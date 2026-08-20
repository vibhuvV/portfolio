import type { Route } from "./+types/blogs";
import { getBlogsMetadataList } from "~/lib/services.server";
import { BlogPost } from "~/components/BlogPost";
import { MY_DETAILS } from "~/lib/constants";
import { SectionHeading } from "~/components/SectionHeading";
import { buildMeta } from "~/lib/seo";

export function meta({}: Route.MetaArgs) {
  return buildMeta({
    title: `Blogs | ${MY_DETAILS.name}`,
    description:
      "Articles on web development, React Router, static site generation, and deployment written by Vaibhav Verma.",
    path: "/blogs",
  });
}

export async function loader({}: Route.LoaderArgs) {
  const blogs = await getBlogsMetadataList();
  return { blogs };
}

const Blog = ({ loaderData }: Route.ComponentProps) => {
  return (
    <>
      {/* Raw anchor is intentional: client-side navigation to "/" misbehaves on GitHub Pages */}
      <a
        href="/portfolio"
        className="text-sm text-muted transition-colors duration-200 hover:text-ink"
      >
        &larr; Home
      </a>
      <div>
        <SectionHeading>Blog</SectionHeading>
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
      </div>
    </>
  );
};

export default Blog;
