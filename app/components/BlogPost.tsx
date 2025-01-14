import { Link } from "react-router";

interface BlogPostProps {
  title: string;
  date: string;
  excerpt: string;
  link: string;
}

export function BlogPost({ title, date, excerpt, link }: BlogPostProps) {
  return (
    <article className="bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 animate-load-in">
      <h4 className="text-xl font-semibold mb-2">
        <Link
          to={link}
          className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
        >
          {title}
        </Link>
      </h4>
      <p className="text-sm text-gray-500 mb-3">{date}</p>
      <p className="text-gray-400">{excerpt}</p>
    </article>
  );
}
