import { format } from "date-fns";

export default function DateComponent({ dateString }: { dateString: string }) {
  return (
    <time dateTime={dateString} className="text-gray-500 font-mono">
      {format(new Date(dateString), "LLLL	d, yyyy")}
    </time>
  );
}
