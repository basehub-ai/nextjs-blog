import { ReactNode } from "react";
import { codeToHtml } from "shiki";
import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";

export default async function CodeBlock({
  ...props
}: {
  children: ReactNode;
  isInline?: boolean;
  language: string;
  code: string;
}) {
  const html = await codeToHtml(props.code, {
    lang: props.language,
    theme: "slack-dark",
    transformers: [
      transformerNotationDiff(),
      transformerNotationErrorLevel(),
      transformerNotationHighlight(),
      transformerNotationWordHighlight(),
    ],
  });

  return props.isInline ? (
    <span className="dark:bg-white/20 bg-black/20 dark:text-white text-black font-mono px-1 py-0.5 rounded-md text-sm border dark:border-white/10 border-black/10">
      {props.children}
    </span>
  ) : (
    <section
      className="font-mono text-sm"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
