import { motion } from "framer-motion";

interface ExperienceItemProps {
  title: string;
  company: string;
  period: string;
  description: string[];
}

export default function ExperienceItem({
  title,
  company,
  period,
  description,
}: ExperienceItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="border-l-2 border-blue-200 pl-6 py-2"
    >
      <h4 className="text-xl font-semibold text-gray-200">{title}</h4>
      <p className="text-gray-400 font-medium">{company}</p>
      <p className="text-sm text-gray-500 mb-2">{period}</p>
      {description.map((item) => (
        <p className="text-gray-300" key={item}>
          {item}
        </p>
      ))}
    </motion.div>
  );
}
