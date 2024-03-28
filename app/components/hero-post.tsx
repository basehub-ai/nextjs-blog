import Link from "next/link";
import Date from "./date";
import CoverImage from "./cover-image";
import Avatar from "./avatar";
import { Post } from "@/lib/queries";

export default function HeroPost({
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
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage title={title} slug={slug} url={coverImage.url} />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link href={`/posts/${slug}`} className="hover:underline">
              {title}
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-base dark:text-white/60 text-black/60">
            <Date dateString={date} />
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          {author && <Avatar title={author._title} url={author.avatar.url} />}
        </div>
      </div>
    </section>
  );
}
