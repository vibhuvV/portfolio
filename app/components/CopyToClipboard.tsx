import type { ButtonHTMLAttributes } from "react";
import { useCallback, useState } from "react";
import { Clipboard, ClipboardCheck } from "lucide-react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  id: string;
  title: string;
  className?: string;
  content: string;
};

export function CopyClipboardButton({
  id,
  title,
  content,
  className = "",
  ...props
}: ButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = useCallback(() => {
    navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  }, [content]);

  return (
    <button
      {...props}
      className={className}
      onClick={handleClick}
      title={title}
      aria-label={title}
      id={id}
    >
      {isCopied ? (
        <ClipboardCheck className="h-5 w-5 text-green-500" />
      ) : (
        <Clipboard className="h-5 w-5 text-faint transition-colors duration-200 hover:text-body" />
      )}
    </button>
  );
}
