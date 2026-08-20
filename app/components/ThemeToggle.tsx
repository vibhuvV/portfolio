import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type ThemeChoice = "light" | "dark";

function getStoredTheme(): ThemeChoice | null {
  try {
    const value = localStorage.getItem("theme");
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function systemPrefersDark(): boolean {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyTheme() {
  const stored = getStoredTheme();
  const isDark = stored ? stored === "dark" : systemPrefersDark();
  document.documentElement.classList.toggle("dark", isDark);
}

export function ThemeToggle() {
  // Client-only, so the rendered title can't mismatch during hydration.
  const [override, setOverride] = useState<ThemeChoice | null>(null);

  useEffect(() => {
    setOverride(getStoredTheme());

    // Follow live system theme changes; stored choice (if any) still wins
    // inside applyTheme.
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", applyTheme);
    return () => media.removeEventListener("change", applyTheme);
  }, []);

  function toggle() {
    const next: ThemeChoice = document.documentElement.classList.contains(
      "dark"
    )
      ? "light"
      : "dark";

    document.documentElement.classList.toggle("dark", next === "dark");

    try {
      if (next === (systemPrefersDark() ? "dark" : "light")) {
        // Landed back on the system default — clear the override so the
        // system preference is honored on future refreshes.
        localStorage.removeItem("theme");
        setOverride(null);
      } else {
        localStorage.setItem("theme", next);
        setOverride(next);
      }
    } catch {
      // private mode — theme just won't persist
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      title={
        override
          ? `Theme: ${override} (click to change)`
          : "Theme: system (click to change)"
      }
      className="text-muted transition-colors duration-200 hover:text-ink"
    >
      <Sun className="hidden h-4 w-4 dark:block" aria-hidden="true" />
      <Moon className="h-4 w-4 dark:hidden" aria-hidden="true" />
      {!override && (
        <span className="sr-only">Currently following system theme</span>
      )}
    </button>
  );
}
