"use client";

import ClipboardIcon from "./icons/clipboard-icon";

export default function CopyToClipboard({ code }: { code: string }) {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      console.log("Copied to clipboard");
    } catch (error) {
      console.error("Error copying to clipboard", error);
    } finally {
      setTimeout(() => {
        // do something
      }, 2000);
    }
  };

  return (
    <button
      onClick={copyToClipboard}
      className="text-neutral-500 hover:text-neutral-300 transition-colors duration-200 ease-in-out"
    >
      <ClipboardIcon />
    </button>
  );
}
