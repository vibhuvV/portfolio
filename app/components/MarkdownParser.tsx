import ReactMarkdown from "react-markdown";

import { cn } from "~/lib/utils";
import { CodeBlock } from "./CodeBlock";

interface MarkdownParserProps {
  markdown: string;
}

const MarkdownParser = ({ markdown }: MarkdownParserProps) => {
  return (
    <ReactMarkdown
      className="text-body"
      components={{
        h1({ node, children, className, ...props }) {
          return (
            <h1
              {...props}
              className={cn("mt-10 mb-4 text-3xl font-bold text-ink", className)}
            >
              {children}
            </h1>
          );
        },
        h2({ node, children, className, ...props }) {
          return (
            <h2
              {...props}
              className={cn(
                "mt-10 mb-4 text-2xl font-semibold text-ink",
                className
              )}
            >
              {children}
            </h2>
          );
        },
        h3({ node, children, className, ...props }) {
          return (
            <h3
              {...props}
              className={cn("mt-8 mb-3 text-xl font-semibold text-ink", className)}
            >
              {children}
            </h3>
          );
        },
        h4({ node, children, className, ...props }) {
          return (
            <h4
              {...props}
              className={cn("mt-6 mb-2 text-lg font-semibold text-ink", className)}
            >
              {children}
            </h4>
          );
        },
        h5({ node, children, className, ...props }) {
          return (
            <h5
              {...props}
              className={cn("mt-4 text-base font-semibold text-ink", className)}
            >
              {children}
            </h5>
          );
        },
        h6({ node, children, className, ...props }) {
          return (
            <h6
              {...props}
              className={cn("mt-4 text-sm font-semibold text-ink", className)}
            >
              {children}
            </h6>
          );
        },
        p({ node, children, className, ...props }) {
          return (
            <p {...props} className={cn("my-4 leading-relaxed", className)}>
              {children}
            </p>
          );
        },
        pre({ node, children, ...props }) {
          return <CodeBlock {...props}>{children}</CodeBlock>;
        },
        ul({ node, children, className, ...props }) {
          return (
            <ul
              {...props}
              className={cn(
                "my-4 list-disc space-y-1.5 pl-6 marker:text-faint",
                className
              )}
            >
              {children}
            </ul>
          );
        },
        ol({ node, children, className, ...props }) {
          return (
            <ol
              {...props}
              className={cn(
                "my-4 list-decimal space-y-1.5 pl-6 marker:text-faint",
                className
              )}
            >
              {children}
            </ol>
          );
        },
        li({ node, children, className, key, ...props }) {
          return (
            <li {...props} key={key} className={cn("leading-relaxed", className)}>
              {children}
            </li>
          );
        },
        hr({ node, className, ...props }) {
          return <hr {...props} className={cn("my-10 border-line", className)} />;
        },
        a({ node, className, ...props }) {
          return (
            <a
              {...props}
              target="_blank"
              className={cn(
                "font-medium text-accent underline-offset-4 transition-colors duration-200 hover:text-accent-hover hover:underline",
                className
              )}
            />
          );
        },
        code({ node, className, ...props }) {
          return (
            <code
              {...props}
              className={cn(
                "rounded border border-line bg-surface px-1.5 py-0.5 text-[0.9em]",
                className
              )}
            />
          );
        },
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
};

export default MarkdownParser;
