import { Mail } from "lucide-react";
import { SiGithub, SiLinkerd } from "@icons-pack/react-simple-icons";

export const MY_DETAILS = {
  name: "Vaibhav",
  designation: "Frontend Developer",
  email: "dev.vaibhaverma@gmail.com",
  summary: `I'm a passionate frontend developer with 4 years of experience
  creating beautiful and functional web applications. I specialize in
  modern JavaScript frameworks and have a keen eye for design and user
  experience. My goal is to craft elegant, efficient, and user-centric
  digital experiences that push the boundaries of what's possible on
  the web.`,

  experience: [
    {
      title: "Senior Frontend Developer",
      company: "Tech Innovators Inc.",
      description: [
        "Lead frontend development for multiple high-traffic web applications, implementing modern React practices and optimizing performance.",
      ],
      period: "2021 - Present",
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
    "Vue.js",
    "Git",
    "Responsive Design",
    "Performance Optimization",
    "RESTful APIs",
  ],

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
    content: <SiGithub size={28} />,
    link: MY_DETAILS.social.github.link,
    title: "Vaibahv's Github",
  },
  {
    content: <SiLinkerd size={28} />,
    link: MY_DETAILS.social.linkedIn.link,
    title: "Vaibahv's Linkedin",
  },
  {
    content: <Mail size={28} />,
    link: MY_DETAILS.mailTo,
    title: "Vaibahv's Email",
  },
];
