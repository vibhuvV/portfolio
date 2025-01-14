import type { FC, HTMLAttributes, ReactElement } from "react";
import { Children, useId } from "react";
import type { Language } from "prism-react-renderer";
import { Highlight } from "prism-react-renderer";
import { CopyClipboardButton } from "./CopyToClipboard";

function getLanguageFromClassName(className: string) {
  const match = className.match(/language-(\w+)/);
  return match ? match[1] : "";
}

function isLanguageSupported(lang: string): lang is Language {
  return (
    lang === "markup" ||
    lang === "bash" ||
    lang === "clike" ||
    lang === "c" ||
    lang === "cpp" ||
    lang === "css" ||
    lang === "javascript" ||
    lang === "jsx" ||
    lang === "coffeescript" ||
    lang === "actionscript" ||
    lang === "css-extr" ||
    lang === "diff" ||
    lang === "git" ||
    lang === "go" ||
    lang === "graphql" ||
    lang === "handlebars" ||
    lang === "json" ||
    lang === "less" ||
    lang === "makefile" ||
    lang === "markdown" ||
    lang === "objectivec" ||
    lang === "ocaml" ||
    lang === "python" ||
    lang === "reason" ||
    lang === "sass" ||
    lang === "scss" ||
    lang === "sql" ||
    lang === "stylus" ||
    lang === "tsx" ||
    lang === "typescript" ||
    lang === "wasm" ||
    lang === "yaml" ||
    lang === "plaintext"
  );
}

export const CodeBlock: FC<HTMLAttributes<HTMLPreElement>> = ({ children }) => {
  if (!children) {
    throw Error("CodeBlock: children is required");
  }

  const id = useId();
  const childrenArray = Children.toArray(children);
  const codeElement = childrenArray[0] as ReactElement<
    HTMLAttributes<HTMLPreElement>,
    string
  >;
  const className = codeElement?.props?.className || "";
  const code = (codeElement.props.children as string) || "";
  const lang = getLanguageFromClassName(className);

  if (!isLanguageSupported(lang)) {
    throw Error(`CodeBlock: language ${lang} is not supported`);
  }

  return (
    <Highlight code={code.trim()} language={lang || "bash"}>
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <div className="p-2 my-4 lg:p-4 rounded-md font-normal text-sm md:text-base w-full bg-[#282a36]">
          <div className="flex justify-end gap-2">
            <span className="text-sm">{lang || "text"}</span>
            <CopyClipboardButton title="Copy code" content={code} id={id} />
          </div>
          <pre className={`overflow-scroll ${className}`}>
            <code className={className}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })} style={{}}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} style={{}} />
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
