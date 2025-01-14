import type { Route } from "./+types/home";
import { Link } from "react-router";
import { BlogPost } from "~/components/BlogPost";
import ExperienceItem from "~/components/ExperienceItem";
import { SocialHandleList } from "~/components/SocialHandle";
import { MY_DETAILS, SOCIAL_HANDLE_LIST } from "~/lib/constants";
import { getBlogsMetadataList } from "~/lib/services.server";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `${MY_DETAILS.name} | ${MY_DETAILS.designation}` },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  const blogs = await getBlogsMetadataList(3);
  return { blogs };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-16 animate-load-in">
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
            {MY_DETAILS.name}
          </h1>
          <h2 className="text-2xl text-gray-200 font-light">
            {MY_DETAILS.designation}
          </h2>
        </div>
        <div className="mt-5">
          <SocialHandleList socialsList={SOCIAL_HANDLE_LIST} />
        </div>
      </header>

      <section>
        <h3 className="text-3xl font-semibold mb-6 text-gray-500">About Me</h3>
        <p className="text-gray-200 leading-relaxed">{MY_DETAILS.summary}</p>
      </section>

      <section>
        <h3 className="text-3xl font-semibold mb-6 text-gray-500">
          Experience
        </h3>
        <div className="space-y-8">
          {MY_DETAILS.experience.map((exp, index) => (
            <ExperienceItem
              key={exp.title + index}
              title={exp.title}
              company={exp.company}
              period={exp.period}
              description={exp.description}
            />
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-3xl font-semibold mb-6 text-gray-500">Skills</h3>
        <div className="flex flex-wrap gap-3">
          {MY_DETAILS.skills.map((skill) => (
            <span
              key={skill}
              className="bg-blue-950 text-gray-300 px-4 py-2 rounded-full text-sm hover:shadow-gray-800 cursor-default shadow-md transition-shadow duration-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-3xl font-semibold mb-6 text-gray-500">
          Latest Blog Posts
        </h3>
        <div className="space-y-8">
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
        <div className="mt-8">
          <Link
            to="/blogs"
            className="text-blue-500 hover:text-blue-600 font-medium transition-colors duration-200 hover:underline"
          >
            View all posts &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
