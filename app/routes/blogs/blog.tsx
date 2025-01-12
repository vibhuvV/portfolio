import { readPost } from "~/lib/utils.server3";
import type { Route } from "./+types/blog";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function clientLoader({ params }: Route.LoaderArgs) {
  const markdown = await readPost(params.blogId);
  return { markdown };
}

const Blog = ({ loaderData }: Route.ComponentProps) => {
  return loaderData.markdown;
};

export default Blog;
