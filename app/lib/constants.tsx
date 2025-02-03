import { Mail, LinkedinIcon, FileUser } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";

export const MY_DETAILS = {
  name: "Vaibhav",
  designation: "Frontend Developer",
  email: "dev.vaibhaverma@gmail.com",
  summary: `I’m Vaibhav Verma, a frontend web developer with expertise in React, TypeScript,
  and SCSS. I’m passionate about solving complex problems, building scalable solutions, and
  continuously improving my skills. Currently, I’m exploring Golang and backend development
  while developing dynamic, multi-tenant web applications. Let’s create innovative web solutions
  together!`,

  experience: [
    {
      title: "Frontend Developer - II",
      company: "Kwalee",
      description: [
        "Developed scalable dashboards and optimized pipelines, improving user engagement, retention, and operational efficiency.",
      ],
      period: "January, 2024 - February, 2025",
    },
    {
      title: "Frontend Developer - II",
      company: "Josh Technology Group",
      description: [
        "Built secure, user-centric solutions for a parking platform, enhancing security, scalability, and client satisfaction.",
      ],
      period: "October, 2022 - December, 2023",
    },
    {
      title: "Frontend Developer",
      company: "Josh Technology Group",
      description: [
        "Delivered high-quality web applications and reusable UI libraries, boosting development efficiency across projects.",
      ],
      period: "August, 2021 - September, 2022",
    },
    {
      title: "Frontend Developer - Intern",
      company: "Josh Technology Group",
      description: [
        "Collaborated with cross-functional teams to create data-driven dashboards, improving stakeholder decision-making.",
      ],
      period: "January, 2021 - July, 2021",
    },
    {
      title: "Web Developer - Trainee",
      company: "ONS Tech",
      description: [
        "Gained full-stack web development experience by assisting in building access management systems and admin dashboards.",
      ],
      period: "March, 2019 - July, 2019",
    },
  ],

  skills: [
    "React",
    "JavaScript",
    "TypeScript",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "Next.js",
    "Remix",
    "Golang",
    "Git",
    "React Router",
    "MaterialUI",
    "Responsive Design",
    "RESTful APIs",
  ],

  resumeUrl: "http://tinyurl.com/dev-vaibhav-resume",

  get mailTo() {
    return `mailto:${this.email}`;
  },

  social: {
    github: {
      username: "vibhuvV",
      get link() {
        return `https://github.com/${this.username}`;
      },
    },
    linkedIn: {
      username: "vaibhaw-v",
      get link() {
        return `https://www.linkedin.com/in/${this.username}`;
      },
    },
  },
};

export const SOCIAL_HANDLE_LIST = [
  {
    content: <SiGithub className="w-4 h-4 md:w-6 md:h-6" />,
    link: MY_DETAILS.social.github.link,
    title: "Github",
  },
  {
    content: <LinkedinIcon className="w-4 h-4 md:w-6 md:h-6" />,
    link: MY_DETAILS.social.linkedIn.link,
    title: "Linkedin",
  },
  {
    content: <Mail className="w-4 h-4 md:w-6 md:h-6" />,
    link: MY_DETAILS.mailTo,
    title: "Email",
  },
  {
    content: <FileUser className="w-4 h-4 md:w-6 md:h-6" />,
    link: MY_DETAILS.resumeUrl,
    title: "Resume",
  },
];
