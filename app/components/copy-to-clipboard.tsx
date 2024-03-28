"use client";

import { useState } from "react";
import CheckIcon from "./icons/check-icon";
import ClipboardIcon from "./icons/clipboard-icon";

export default function CopyToClipboard({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      console.log("Copied to clipboard");
    } catch (error) {
      console.error("Error copying to clipboard", error);
    } finally {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  return (
    <button
      onClick={copyToClipboard}
      className="text-[#646464] hover:text-[#c4c4c4] transition-colors duration-200 ease-in-out"
    >
      {copied ? <CheckIcon /> : <ClipboardIcon />}
    </button>
  );
}
