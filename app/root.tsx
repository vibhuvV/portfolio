import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import stylesheet from "~/styles/app.css?url";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "stylesheet", href: stylesheet },
];

export const meta = () => [
  { name: "title", content: "Vaibhav Verma - Frontend Developer Portfolio" },
  {
    name: "description",
    content:
      "Explore the portfolio of Vaibhav Verma, a skilled frontend developer specializing in React, TypeScript, SCSS, and Python. Check out projects, blogs, and more.",
  },
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
  // { name: "twitter:image", content: "path/to/your-portfolio-image.jpg" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <main className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-950 text-gray-100 py-16 px-4 sm:px-6 lg:px-8 selection:bg-gray-400">
          <div className="max-w-4xl mx-auto">{children}</div>
        </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? error.data ?? "The requested page could not be found."
        : error.statusText || details;
  } else if (error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </>
  );
}
