import { getBlogMetadataAndBody, readPost } from "~/lib/utils.server";
import type { Route } from "./+types/blog";
import stylesUrl from "~/styles/code-theme.css?url";
import { data, Link } from "react-router";
import MarkdownParser from "~/components/MarkdownParser";

export function links() {
  return [{ rel: "stylesheet", href: stylesUrl }];
}

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: data.attributes.title },
    { name: "description", content: data.attributes.description },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  try {
    const content = await readPost(params.blogId);
    return getBlogMetadataAndBody(content);
  } catch (err) {
    throw data("No blog found", { status: 404 });
  }
}

const Blog = ({ loaderData }: Route.ComponentProps) => {
  return (
    <>
      <Link
        to=".."
        className="tracking-wider text-sm text-gray-500 hover:underline"
      >
        &larr; All Blogs
      </Link>
      <h1 className="text-4xl text-gray-300 font-semibold">
        {loaderData.attributes.title}
      </h1>
      <p className="text-sm font-light my-2 tracking-wider text-gray-500">
        Posted on {loaderData.attributes.datetime}
      </p>
      <article>
        <MarkdownParser markdown={loaderData.body} />
      </article>
    </>
  );
};

export default Blog;
