import { MY_DETAILS, SOCIAL_HANDLE_LIST } from "~/lib/constants";
import { SocialHandleList } from "~/components/SocialHandle";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} {MY_DETAILS.name}
          </p>
          <p className="mt-1 font-mono text-xs text-faint">
            Built with React Router &amp; Tailwind CSS
          </p>
        </div>
        <SocialHandleList socialsList={SOCIAL_HANDLE_LIST} />
      </div>
    </footer>
  );
}
