import { ReactNode } from "react";
import { codeToHtml } from "shiki";
import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import CopyToClipboard from "./copy-to-clipboard";
import FileIcon from "./icons/file-icon";

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
    <span className="dark:bg-[#272727] bg-[#d8d8d8] dark:text-white text-black font-mono px-1 py-0.5 rounded-md text-sm border dark:border-[#3b3b3b] border-[#c4c4c4]">
      {props.children}
    </span>
  ) : (
    <div className="overflow-hidden rounded-lg border border-[#343434]">
      <header className="flex flex-row items-center justify-between h-10 p-2 bg-[#040404]">
        <FileIcon />
        <p className="ml-[5px] mr-auto font-mono font-light text-xs text-[#646464] leading-4">
          .{props.language}
        </p>

        <CopyToClipboard code={props.code} />
      </header>
      <section
        className="border-t border-[#343434] text-sm font-mono [&>pre]:overflow-x-auto [&>pre]:m-0 [&>pre]:rounded-none [&>pre]:!bg-[#040404] [&>pre]:p-4 [&>pre]:leading-snug [&_code]:block [&_code]:w-fit [&_code]:min-w-full"
        dangerouslySetInnerHTML={{ __html: html }}
      ></section>
    </div>
  );
}
