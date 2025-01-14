import { Outlet } from "react-router";

export function meta() {
  return [
    {
      name: "keywords",
      content:
        "Vaibhav Verma, Frontend Developer, React Developer, TypeScript Developer, SCSS, Python, Web Development Portfolio, Web Developer Resume",
    },
    { name: "author", content: "Vaibhav Verma" },
    { name: "robots", content: "index, follow" },
    {
      property: "og:title",
      content: "Vaibhav Verma - Frontend Developer Portfolio",
    },
    {
      property: "og:description",
      content:
        "Discover Vaibhav Verma's expertise in building high-performance web applications using modern technologies like React, TypeScript, and SCSS.",
    },
    // { property: "og:image", content: "path/to/your-portfolio-image.jpg" },
    // { property: "og:url", content: "https://your-portfolio-domain.com" },
    { property: "og:type", content: "website" },
    // { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Vaibhav Verma - Frontend Developer Portfolio",
    },
    {
      name: "twitter:description",
      content:
        "Explore the projects and blogs by Vaibhav Verma, a frontend developer passionate about solving complex problems.",
    },
  ];
}

const BlogLayout = () => {
  return (
    <div className="space-y-4">
      <Outlet />
    </div>
  );
};

export default BlogLayout;
