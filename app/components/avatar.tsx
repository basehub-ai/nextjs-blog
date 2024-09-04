import { BaseHubImage } from "basehub/next-image";

export default function Avatar({ title, url }: { title: string; url: string }) {
  return (
    <div className="flex items-center">
      <div className="mr-4 w-12 h-12">
        <BaseHubImage
          alt={title}
          className="object-cover h-full rounded-full"
          height={96}
          width={96}
          src={url}
        />
      </div>
      <div className="text-xl font-bold">{title}</div>
    </div>
  );
}
