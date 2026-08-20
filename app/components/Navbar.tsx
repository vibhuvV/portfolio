import { NavLink } from "react-router";
import { MY_DETAILS } from "~/lib/constants";
import { ThemeToggle } from "~/components/ThemeToggle";
import { cn } from "~/lib/utils";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-base/80 backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4 sm:px-6"
      >
        {/* Raw anchor is intentional: client-side navigation to "/" misbehaves on GitHub Pages */}
        <a
          href="/portfolio"
          className="text-sm font-semibold tracking-tight text-ink transition-colors duration-200 hover:text-accent"
        >
          {MY_DETAILS.name}
          <span aria-hidden="true" className="text-accent">
            .
          </span>
        </a>
        <div className="flex items-center gap-5 text-sm">
          <NavLink
            to="/blogs"
            className={({ isActive }) =>
              cn(
                "relative transition-colors duration-200 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:bg-accent after:transition-transform",
                isActive
                  ? "text-ink after:scale-x-100"
                  : "text-muted after:scale-x-0 hover:text-ink"
              )
            }
          >
            Blogs
          </NavLink>
          <a
            href={MY_DETAILS.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors duration-200 hover:text-ink"
          >
            Resume
          </a>
          <span aria-hidden="true" className="h-4 w-px bg-line" />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
