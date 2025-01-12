import type { Route } from "./+types/home";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BlogPost } from "~/components/BlogPost";
import ExperienceItem from "~/components/ExperienceItem";
import { SocialHandleList } from "~/components/SocialHandle";
import { MY_DETAILS, SOCIAL_HANDLE_LIST } from "~/lib/constants";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-16"
    >
      <header className="flex justify-between align-top">
        <div>
          <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
            {MY_DETAILS.name}
          </h1>
          <h2 className="text-2xl text-gray-200 font-light">
            {MY_DETAILS.designation}
          </h2>
        </div>
        <SocialHandleList socialsList={SOCIAL_HANDLE_LIST} />
      </header>

      <section>
        <h3 className="text-3xl font-semibold mb-6 text-gray-500">About Me</h3>
        <p className="text-gray-200 leading-relaxed">
          I'm a passionate frontend developer with 4 years of experience
          creating beautiful and functional web applications. I specialize in
          modern JavaScript frameworks and have a keen eye for design and user
          experience. My goal is to craft elegant, efficient, and user-centric
          digital experiences that push the boundaries of what's possible on the
          web.
        </p>
      </section>

      <section>
        <h3 className="text-3xl font-semibold mb-6 text-gray-500">
          Experience
        </h3>
        <div className="space-y-8">
          {MY_DETAILS.experience.map((exp) => (
            <ExperienceItem
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
          <BlogPost
            title="The Future of Frontend Development"
            date="May 15, 2023"
            excerpt="Exploring upcoming trends and technologies that will shape the future of frontend development."
            link="/blog/future-of-frontend"
          />
          <BlogPost
            title="Optimizing React Performance"
            date="April 2, 2023"
            excerpt="Tips and tricks to boost the performance of your React applications for a smoother user experience."
            link="/blog/optimizing-react-performance"
          />
          <BlogPost
            title="CSS Grid vs Flexbox: When to Use Which?"
            date="March 10, 2023"
            excerpt="A comprehensive guide to help you choose between CSS Grid and Flexbox for your layout needs."
            link="/blog/css-grid-vs-flexbox"
          />
        </div>
        <div className="mt-8">
          <a
            href="/blog"
            className="text-blue-500 hover:text-blue-600 font-medium transition-colors duration-200"
          >
            View all posts →
          </a>
        </div>
      </section>
    </motion.div>
  );
}
