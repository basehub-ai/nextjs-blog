import Link from "next/link";
import Date from "./date";
import CoverImage from "./cover-image";
import Avatar from "./avatar";
import { fragmentOn } from "basehub";

export const PostMetaFragment = fragmentOn("PostsItem", {
  _id: true,
  _slug: true,
  _title: true,
  author: {
    _title: true,
    avatar: {
      url: true,
      alt: true,
    },
  },
  coverImage: {
    url: true,
    alt: true,
  },
  date: true,
  excerpt: true,
});

export type PostMetaFragment = fragmentOn.infer<typeof PostMetaFragment>;

export function HeroPost({
  _title,
  coverImage,
  date,
  excerpt,
  author,
  _slug,
}: PostMetaFragment) {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage title={_title} slug={_slug} url={coverImage.url} />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link href={`/posts/${_slug}`} className="hover:underline">
              {_title}
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
