import Link from "next/link";
import Avatar from "./avatar";
import Date from "./date";
import CoverImage from "./cover-image";
import { Post } from "@/lib/queries";

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: {
  title: string;
  coverImage: Post["coverImage"];
  date: string;
  excerpt: string;
  author: Post["author"];
  slug: string;
}) {
  return (
    <div>
      <div className="mb-5">
        <CoverImage title={title} slug={slug} url={coverImage.url} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link href={`/posts/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      <div className="text-base dark:text-white/60 text-black/60 mb-4">
        <Date dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      {author && <Avatar title={author._title} url={author.avatar.url} />}
    </div>
  );
}
