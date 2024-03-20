import { ReactNode } from "react";
import { type Highlighter, getHighlighter } from "shiki";

type CodeProps = {
  children: ReactNode;
  isInline: boolean;
  language: string;
  code: string;
};

type CodeSnippetProps = {
  data: CodeProps;
};

export default async function CodeSnippet({ data }: CodeSnippetProps) {
  const highlighter: Highlighter = await getHighlighter({
    themes: ["dark-plus"],
    langs: [data.language],
  });

  const html = highlighter.codeToHtml(data.code, {
    theme: "dark-plus",
    lang: data.language,
  });

  return data.isInline ? (
    <code>{data.children}</code>
  ) : (
    <pre dangerouslySetInnerHTML={{ __html: html }} />
  );
}
