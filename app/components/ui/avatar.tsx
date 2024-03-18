import Image from "next/image";

export default function Avatar({ title, url }: { title: string; url: string }) {
  return (
    <div className="flex items-center">
      <div className="mr-4 w-12 h-12">
        <Image
          alt={title}
          className="object-cover h-full rounded-full"
          height={48}
          width={48}
          src={url}
        />
      </div>
      <div className="text-xl font-bold">{title}</div>
    </div>
  );
}
