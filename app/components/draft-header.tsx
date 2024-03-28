"use client";

import { useRouter } from "next/navigation";

export default function DraftHeader({ draft }: { draft: boolean }) {
  const router = useRouter();

  const disableDraftMode = async () => {
    try {
      const response = await fetch("/api/disable-draft", {
        method: "GET",
      });
      if (response.ok) {
        router.refresh();
      } else {
        console.error("Failed to exit draft mode. Please try again later.");
      }
    } catch (error) {
      console.error(
        "An error occurred when trying to exit draft mode. Please try again.",
        error
      );
    }
  };

  if (!draft) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full rounded-b-3xl bg-[#0E0E0E] shadow shadow-white/10 py-3">
      <div className="flex flex-row justify-center items-center text-sm text-center text-white">
        <p>
          You're in <span className="font-semibold">draft mode</span>.
        </p>
        <button
          onClick={() => disableDraftMode()}
          className="underline hover:text-orange-500 transition-colors duration-200 ms-1 me-1"
        >
          Click here
        </button>
        <p>to exit.</p>
      </div>
    </div>
  );
}
