import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Inter"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      keyframes: {
        "blur-in": {
          "0%": { filter: "blur(0.2rem)" },
          "100%": { filter: "blur(0)" },
        },
        "opacity-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-up": {
          "0%": { transform: "translateY(1rem)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        "load-in": `blur-in 600ms ease-in-out, opacity-in 300ms ease-in-out, fade-up 500ms ease-in-out`,
        "fade-up": "opacity-in 700ms ease-in-out, fade-up 700ms ease-in-out",
      },
    },
  },
} satisfies Config;
