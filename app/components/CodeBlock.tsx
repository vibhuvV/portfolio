import type { FC, HTMLAttributes, ReactElement } from "react";
import { Children, useId } from "react";
import type { Language } from "prism-react-renderer";
import { Highlight } from "prism-react-renderer";
import { CopyClipboardButton } from "./CopyToClipboard";

const LANGUAGE_ALIASES: Record<string, string> = {
  sh: "bash",
  shell: "bash",
  zsh: "bash",
  console: "bash",
  js: "javascript",
  ts: "typescript",
  py: "python",
  yml: "yaml",
  md: "markdown",
  html: "markup",
  xml: "markup",
  svg: "markup",
  coffee: "coffeescript",
  objc: "objectivec",
  kt: "kotlin",
  kts: "kotlin",
};

const SUPPORTED_LANGUAGES = new Set([
  "markup",
  "mathml",
  "ssml",
  "atom",
  "rss",
  "regex",
  "clike",
  "javascript",
  "actionscript",
  "coffeescript",
  "css",
  "yaml",
  "markdown",
  "graphql",
  "sql",
  "typescript",
  "jsx",
  "tsx",
  "swift",
  "kotlin",
  "c",
  "objectivec",
  "reason",
  "rust",
  "go",
  "cpp",
  "python",
  "json",
  "webmanifest",
  "plaintext",
]);

function getLanguageFromClassName(className: string) {
  const match = className.match(/language-(\w+)/);
  return match ? match[1] : "";
}

function resolveLanguage(lang: string): Language {
  const base = LANGUAGE_ALIASES[lang] ?? lang;
  return SUPPORTED_LANGUAGES.has(base) ? base : "plaintext";
}

export const CodeBlock: FC<HTMLAttributes<HTMLPreElement>> = ({ children }) => {
  const id = useId();

  if (!children) {
    return null;
  }

  const childrenArray = Children.toArray(children);
  const codeElement = childrenArray[0] as ReactElement<
    HTMLAttributes<HTMLPreElement>,
    string
  >;
  const className = codeElement?.props?.className || "";
  const code = (codeElement.props.children as string) || "";
  const rawLang = getLanguageFromClassName(className);
  const language = resolveLanguage(rawLang);

  return (
    <Highlight code={code.trim()} language={language}>
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <div className="my-6 w-full rounded-lg border border-line bg-[#282a36] p-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-faint">
              {rawLang || "text"}
            </span>
            <CopyClipboardButton title="Copy code" content={code} id={id} />
          </div>
          <pre className={`overflow-x-auto text-sm md:text-base ${className}`}>
            <code className={className}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </code>
          </pre>
        </div>
      )}
    </Highlight>
  );
};
