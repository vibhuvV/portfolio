import { Mail, LinkedinIcon, FileUser } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";

export const MY_DETAILS = {
  name: "Vaibhav Verma",
  designation: "Senior Software Engineer",
  email: "dev.vaibhaverma@gmail.com",
  summary: `Frontend Engineer with 6+ years of experience owning React and TypeScript-based products, building scalable UI systems, and optimizing performance for SaaS platforms used by thousands of users. Strong focus on component architecture, state management, accessibility (WCAG), and measurable performance improvements. Experienced in collaborating cross-functionally to deliver production-grade, user-centric features.`,

  experience: [
    {
      title: "Senior Software Engineer",
      company: "WPP",
      description: [],
      period: "June 2026 – Present | Gurugram, India",
    },
    {
      title: "Senior Software Engineer",
      company: "Sourcefuse Technologies",
      description: [
        "Developed an event-driven inventory prediction module using React and Node.js, integrating generative AI to enhance demand forecasting for a supply chain platform serving 200+ enterprise users.",
        "Built a customizable analytics dashboard using React, Recharts, and DND Kit to visualize 3,000+ monthly transactions.",
        "Optimized frontend performance (code splitting, lazy loading, memoization), reducing initial page load time from 2.4s to 0.8s.",
        "Implemented real-time collaboration features and AI-powered email automation using LangChain.",
      ],
      period: "Feb 2025 – Present | Remote",
    },
    {
      title: "Software Developer - II",
      company: "Kwalee",
      description: [
        "Architected and delivered HitSeeker, a multi-tenant SaaS platform for game publishing with dynamic subdomain routing, custom theming, and brand-specific configurations.",
        "Implemented internationalization (i18n) with RTL support and multi-theme system with WCAG 2.1 AA compliance.",
        "Built Kanban-style project management interface with drag-and-drop using DND Kit, managing 500+ active game submission workflows.",
        "Reduced API response times and server load by 30% by optimizing GraphQL queries and implementing RTK Query caching.",
      ],
      period: "Jan 2024 – Jan 2025 | Remote",
    },
    {
      title: "Senior Software Developer - I",
      company: "Josh Technology Group",
      description: [
        "Developed enterprise parking management dashboard in React and TypeScript, serving 3,000+ concurrent users across 26+ parking facilities with 99.8% uptime.",
        "Migrated authentication to GCP Identity Platform with MFA and reCAPTCHA integration.",
        "Mentored junior developers on React best practices and contributed to engineering documentation.",
      ],
      period: "Oct 2022 – Dec 2023 | Gurugram, India",
    },
    {
      title: "Software Developer",
      company: "Josh Technology Group",
      description: [
        "Created a reusable component library using Material UI, establishing design system patterns that reduced development cycles across multiple teams.",
        "Delivered data visualization dashboards with interactive charts and complex filtering logic.",
        "Redesigned analytics dashboards with improved visual hierarchy, adopted by 4+ internal teams.",
      ],
      period: "Feb 2021 – Sep 2022 | Gurugram, India",
    },
    {
      title: "Web Developer Intern",
      company: "ONS Tech",
      description: [
        "Contributed to full-stack admin panel development using HTML, CSS, JavaScript, and PHP with database integration.",
      ],
      period: "Mar 2019 – Jul 2019 | Chandigarh, India",
    },
  ],

  skills: [
    "React.js",
    "TypeScript",
    "Next.js",
    "JavaScript (ES6+)",
    "HTML",
    "CSS",
    "SCSS",
    "Tailwind CSS",
    "Material UI",
    "Ant Design",
    "Redux Toolkit",
    "TanStack Query",
    "GraphQL",
    "REST APIs",
    "DND Kit",
    "Recharts",
    "Node.js",
    "Express.js",
    "AWS (Amplify, Cognito, S3, Lambda)",
    "Google Cloud Platform",
    "WCAG 2.1 AA Accessibility",
    "Internationalization (i18n & RTL)",
    "Vite",
    "Webpack",
    "Docker",
    "Jest",
    "Storybook",
    "Git",
    "GitHub Actions",
    "CI/CD",
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
