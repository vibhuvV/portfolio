import { readPostsName } from "~/lib/utils.server3";
import type { Route } from "./+types/blogs";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function clientLoader({}: Route.LoaderArgs) {
  const blogs = await readPostsName();
  return { blogs };
}

const Blog = ({ loaderData }: Route.ComponentProps) => {
  return loaderData.blogs.map((blog) => <p key={blog}>{blog}</p>);
};

export default Blog;
