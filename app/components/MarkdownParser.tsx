import ReactMarkdown from "react-markdown";

import { cn } from "~/lib/utils";
import { CodeBlock } from "./CodeBlock";

interface MarkdownParserProps {
  markdown: string;
}

const MarkdownParser = ({ markdown }: MarkdownParserProps) => {
  return (
    <ReactMarkdown
      className="text-gray-300 animate-load-in"
      components={{
        h1({ node, children, className, ...props }) {
          return (
            <h1
              {...props}
              className={cn("text-4xl font-semibold my-10", className)}
            >
              {children}
            </h1>
          );
        },
        h2({ node, children, className, ...props }) {
          return (
            <h2
              {...props}
              className={cn("text-3xl font-semibold my-8", className)}
            >
              {children}
            </h2>
          );
        },
        h3({ node, children, className, ...props }) {
          return (
            <h3
              {...props}
              className={cn("text-2xl font-semibold my-6", className)}
            >
              {children}
            </h3>
          );
        },
        h4({ node, children, className, ...props }) {
          return (
            <h4
              {...props}
              className={cn("text-xl font-semibold my-4", className)}
            >
              {children}
            </h4>
          );
        },
        h5({ node, children, className, ...props }) {
          return (
            <h5
              {...props}
              className={cn("text-lg font-semibold my-2", className)}
            >
              {children}
            </h5>
          );
        },
        h6({ node, children, className, ...props }) {
          return (
            <h6
              {...props}
              className={cn("text-md font-semibold my-1", className)}
            >
              {children}
            </h6>
          );
        },
        p({ node, children, className, ...props }) {
          return (
            <p {...props} className={cn("text-base my-3", className)}>
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
              className={cn("list-disc list-inside ml-4", className)}
            >
              {children}
            </ul>
          );
        },
        ol({ node, children, className, ...props }) {
          return (
            <ul
              {...props}
              className={cn("list-decimal list-inside ml-4", className)}
            >
              {children}
            </ul>
          );
        },
        li({ node, children, className, key, ...props }) {
          return (
            <li {...props} key={key} className={cn("leading-8", className)}>
              {children}
            </li>
          );
        },
        hr({ node, className, ...props }) {
          return <hr {...props} className={cn("my-8", className)} />;
        },
        a({ node, className, ...props }) {
          return (
            <a
              {...props}
              target="_blank"
              className={cn(
                "text-base my-3 text-blue-500 hover:text-blue-600 font-medium transition-colors duration-200 hover:underline",
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
                "text-base my-3 bg-[#282a36] p-1 rounded",
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
