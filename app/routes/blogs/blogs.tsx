import type { Route } from "./+types/blogs";
import { getBlogsMetadataList } from "~/lib/services.server";
import { BlogPost } from "~/components/BlogPost";
import { Link } from "react-router";
import { MY_DETAILS } from "~/lib/constants";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `Blogs | ${MY_DETAILS.name}` },
    {
      name: "description",
      content:
        "Discover insightful blogs on web development, programming, and technology. Stay updated with tips, tutorials, and resources to enhance your skills and knowledge. Explore our latest articles now!",
    },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  const blogs = await getBlogsMetadataList();
  return { blogs };
}

const Blog = ({ loaderData }: Route.ComponentProps) => {
  return (
    <>
      <Link
        to=".."
        className="tracking-wider text-sm text-gray-500 hover:underline"
      >
        &larr; Home
      </Link>
      <h3 className="text-3xl font-semibold mb-6 text-gray-300">Blogs</h3>
      {loaderData.blogs.map((blog) => (
        <BlogPost
          key={blog.name}
          title={blog.attributes.title}
          date={blog.attributes.datetime}
          excerpt={blog.attributes.description}
          link={`/blogs/${blog.name}`}
        />
      ))}
    </>
  );
};

export default Blog;
