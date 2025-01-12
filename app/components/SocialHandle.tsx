import type { AnchorHTMLAttributes, DetailedHTMLProps } from "react";
import { cn } from "~/lib/utils";

// Social Handle List
interface SocialHandle {
  readonly link: string;
  readonly title: string;
  readonly content: React.ReactNode;
}

interface SocialHandleListProps {
  readonly socialsList: SocialHandle[];
}

export const SocialHandleList = (props: SocialHandleListProps) => {
  const { socialsList } = props;

  return (
    <div className="flex justify-center space-x-6">
      {socialsList.map((social) => (
        <SocialHandleLink
          key={social.title}
          href={social.link}
          target="_blank"
          rel="noopener noreferrer"
          title={social.title}
        >
          {social.content}
        </SocialHandleLink>
      ))}
    </div>
  );
};

interface SocialHandleLinkProps
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {}

const SocialHandleLink = ({ className, ...props }: SocialHandleLinkProps) => {
  return (
    <a
      {...props}
      className={cn(
        "text-gray-200 hover:text-gray-500 transition-colors duration-200",
        className
      )}
    />
  );
};
