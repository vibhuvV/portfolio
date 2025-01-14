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
    <div className={className}>
      <button
        {...props}
        className="hover:text-gray-500"
        onClick={handleClick}
        title={title}
        id={id}
      >
        {isCopied ? (
          <ClipboardCheck className="w-5 h-5 text-green-600" />
        ) : (
          <Clipboard className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}
