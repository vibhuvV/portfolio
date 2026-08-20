import { getBlogMetadataAndBody, readPost } from "~/lib/utils.server";
import type { Route } from "./+types/blog";
import stylesUrl from "~/styles/code-theme.css?url";
import { data, Link } from "react-router";
import MarkdownParser from "~/components/MarkdownParser";
import { MY_DETAILS } from "~/lib/constants";
import { buildMeta } from "~/lib/seo";
import { formatDate } from "~/lib/utils";

export function links() {
  return [{ rel: "stylesheet", href: stylesUrl }];
}

export function meta({ data, params }: Route.MetaArgs) {
  return buildMeta({
    title: `${data.attributes.title} | ${MY_DETAILS.name}`,
    description: data.attributes.description,
    path: `/blogs/${params.blogId}`,
  });
}

export async function loader({ params }: Route.LoaderArgs) {
  try {
    const content = await readPost(params.blogId);
    const parsed = await getBlogMetadataAndBody(content);
    const wordCount = parsed.body.trim().split(/\s+/).length;
    const readingTime = Math.max(1, Math.round(wordCount / 200));

    return { ...parsed, readingTime };
  } catch (err) {
    throw data("No blog found", { status: 404 });
  }
}

const Blog = ({ loaderData }: Route.ComponentProps) => {
  return (
    <>
      <Link
        to=".."
        className="text-sm text-muted transition-colors duration-200 hover:text-ink"
      >
        &larr; All Blogs
      </Link>
      <header>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {loaderData.attributes.title}
        </h1>
        <p className="mt-3 font-mono text-xs tracking-wide text-faint">
          {formatDate(loaderData.attributes.datetime)} &middot;{" "}
          {loaderData.readingTime} min read
        </p>
      </header>
      <hr className="border-line" />
      <article>
        <MarkdownParser markdown={loaderData.body} />
      </article>
    </>
  );
};

export default Blog;
