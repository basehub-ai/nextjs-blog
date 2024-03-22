import { ReactNode } from "react";
import { Highlighter, getHighlighter } from "shiki";

export default async function CodeSnippet({
  ...props
}: {
  children: ReactNode;
  isInline?: boolean;
  language: string;
  code: string;
}) {
  const highlighter: Highlighter = await getHighlighter({
    themes: ["dark-plus"],
    langs: [props.language],
  });

  const html = highlighter.codeToHtml(props.code, {
    theme: "dark-plus",
    lang: props.language,
  });

  return props.isInline ? (
    <span className="dark:bg-white/20 bg-black/20 dark:text-white text-black font-mono px-1 py-0.5 rounded-md text-sm">
      {props.children}
    </span>
  ) : (
    <section dangerouslySetInnerHTML={{ __html: html }} />
  );
}
