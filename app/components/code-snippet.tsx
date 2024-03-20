import { ReactNode } from "react";
import { type Highlighter, getHighlighter } from "shiki";

type Code = {
  children: ReactNode;
  isInline: boolean;
  language: string;
  code: string;
};

type CodeSnippet = {
  data: Code;
};

export default async function CodeSnippet({ data }: CodeSnippet) {
  const highlighter: Highlighter = await getHighlighter({
    themes: ["dark-plus"],
    langs: [data.language],
  });

  const html = highlighter.codeToHtml(data.code, {
    theme: "dark-plus",
    lang: data.language,
  });

  return data.isInline ? (
    <span className="dark:bg-gray-800 bg-gray-400 font-mono px-1 py-0.5 rounded-md text-sm">
      {data.children}
    </span>
  ) : (
    <code dangerouslySetInnerHTML={{ __html: html }} />
  );
}
