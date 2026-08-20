import type { AnchorHTMLAttributes, DetailedHTMLProps } from "react";
import { cn } from "~/lib/utils";

interface SocialHandle {
  readonly link: string;
  readonly title: string;
  readonly content: React.ReactNode;
}

interface SocialHandleListProps {
  readonly socialsList: SocialHandle[];
  readonly className?: string;
}

export const SocialHandleList = ({
  socialsList,
  className,
}: SocialHandleListProps) => (
  <div className={cn("flex items-center gap-5", className)}>
    {socialsList.map((social) => (
      <SocialHandleLink
        key={social.title}
        href={social.link}
        target="_blank"
        rel="noopener noreferrer"
        title={social.title}
        aria-label={social.title}
      >
        {social.content}
      </SocialHandleLink>
    ))}
  </div>
);

interface SocialHandleLinkProps
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {}

const SocialHandleLink = ({ className, ...props }: SocialHandleLinkProps) => (
  <a
    {...props}
    className={cn(
      "text-muted transition-colors duration-200 hover:text-accent",
      className
    )}
  />
);
