import { motion } from "framer-motion";

interface BlogPostProps {
  title: string;
  date: string;
  excerpt: string;
  link: string;
}

export function BlogPost({ title, date, excerpt, link }: BlogPostProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6"
    >
      <h4 className="text-xl font-semibold mb-2">
        <a
          href={link}
          className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
        >
          {title}
        </a>
      </h4>
      <p className="text-sm text-gray-500 mb-3">{date}</p>
      <p className="text-gray-400">{excerpt}</p>
    </motion.div>
  );
}
