import Link from "next/link";
import Avatar from "./avatar";
import Date from "../date";
import CoverImage from "./cover-image";

export function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: {
  title: string;
  coverImage: any;
  date: string;
  excerpt: string;
  author: any;
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
      <div className="text-base mb-4">
        <Date dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      {author && <Avatar title={author._title} url={author.avatar.url} />}
    </div>
  );
}
