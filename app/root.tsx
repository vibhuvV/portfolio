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
import faviconUrl from "~/assets/favicon.svg?url";
import appleTouchIconUrl from "~/assets/apple-touch-icon.png?url";
import { Navbar } from "~/components/Navbar";
import { Footer } from "~/components/Footer";

const themeScript = `(function(){try{var t=localStorage.getItem("theme");var d=t==="dark"||(t!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=JetBrains+Mono:wght@400;500;600&display=swap",
  },
  { rel: "stylesheet", href: stylesheet },
  { rel: "icon", type: "image/svg+xml", href: faviconUrl },
  { rel: "apple-touch-icon", href: appleTouchIconUrl },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fafafa" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#09090b" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-base font-sans text-body antialiased selection:bg-accent/25 selection:text-ink">
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="mx-auto w-full max-w-4xl flex-1 animate-load-in px-4 py-16 sm:px-6 sm:py-24">
            {children}
          </main>
          <Footer />
        </div>
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
  let message = "Something went wrong";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      message = "404";
      details =
        typeof error.data === "string" && error.data
          ? error.data
          : "The page you're looking for doesn't exist.";
    } else {
      message = "Error";
      details = error.statusText || details;
    }
  } else if (error && error instanceof Error) {
    details = error.message;
    stack = import.meta.env.DEV ? error.stack : undefined;
  }

  return (
    <div className="py-16 text-center">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-faint">
        {message === "404" ? "Page not found" : "Error"}
      </p>
      <h1 className="mt-4 text-6xl font-bold tracking-tight text-ink">
        {message}
      </h1>
      <p className="mt-4 text-muted">{details}</p>
      {/* Raw anchor is intentional: client-side navigation to "/" misbehaves on GitHub Pages */}
      <a
        href="/portfolio"
        className="mt-8 inline-flex items-center rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium text-body transition-colors duration-200 hover:border-faint hover:text-ink"
      >
        &larr; Back to home
      </a>
      {stack && (
        <pre className="mt-8 w-full overflow-x-auto rounded-lg border border-line bg-surface p-4 text-left text-xs text-muted">
          <code>{stack}</code>
        </pre>
      )}
    </div>
  );
}
