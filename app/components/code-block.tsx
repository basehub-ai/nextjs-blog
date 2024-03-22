import { ReactNode } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeBlock({
  ...props
}: {
  children: ReactNode;
  isInline?: boolean;
  language: string;
  code: string;
}) {
  return props.isInline ? (
    <span className="dark:bg-white/20 bg-black/20 dark:text-white text-black font-mono px-1 py-0.5 rounded-md text-sm">
      {props.children}
    </span>
  ) : (
    <SyntaxHighlighter
      language={props.language}
      style={vscDarkPlus}
      customStyle={{
        backgroundColor: "black",
      }}
    >
      {props.code}
    </SyntaxHighlighter>
  );
}
