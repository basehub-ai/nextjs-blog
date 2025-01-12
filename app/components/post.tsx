import { RichText } from "basehub/react-rich-text";
import { CodeBlock } from "basehub/react-code-block";
import CoverImage from "@/app/components/cover-image";
import Avatar from "@/app/components/avatar";
import Date from "@/app/components/date";
import { BodyImage } from "./body-image";
import { fragmentOn } from "basehub";
import { PostMetaFragment } from "./hero-post";

export const PostFragment = fragmentOn("PostsItem", {
  ...PostMetaFragment,
  body: { json: { content: true } },
});

export type PostFragment = fragmentOn.infer<typeof PostFragment>;

export function Post({ _title, author, date, coverImage, body }: PostFragment) {
  return (
    <article>
      <h1 className="mb-12 text-center text-6xl font-bold leading-tight tracking-tighter md:text-left md:text-7xl md:leading-none lg:text-8xl">
        {_title}
      </h1>

      <div className="hidden md:block md:mb-6">
        {author && <Avatar title={author._title} url={author.avatar.url} />}
      </div>
      <div className="hidden md:block md:mb-12 text-base dark:text-white/60 text-black/60">
        <Date dateString={date} />
      </div>

      <div className="mb-8 sm:mx-0 md:mb-16">
        <CoverImage title={_title} url={coverImage.url} />
      </div>

      <div className="mx-auto max-w-2xl">
        <div className="mb-6 block md:hidden">
          {author && <Avatar title={author._title} url={author.avatar.url} />}
        </div>
        <div className="mb-12 text-base dark:text-white/60 text-black/60 block md:hidden">
          <Date dateString={date} />
        </div>
      </div>

      <div className="mx-auto max-w-2xl">
        <div className="prose dark:prose-invert hover:prose-a:text-orange-500">
          <RichText
            components={{
              img: (props) => <BodyImage {...props} />,
              pre: ({ code, language }) => (
                <CodeBlock theme="slack-dark" snippets={[{ code, language }]} />
              ),
            }}
          >
            {body.json.content}
          </RichText>
        </div>
      </div>
    </article>
  );
}
