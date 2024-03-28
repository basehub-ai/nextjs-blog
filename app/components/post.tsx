import { RichText } from "basehub/react-rich-text";
import CoverImage from "@/app/components/cover-image";
import Avatar from "@/app/components/avatar";
import Date from "@/app/components/date";
import BodyImage from "./body-image";
import CodeBlock from "@/app/components/code-block";
import { Post as TPost } from "@/lib/queries";

export default function Post({ post }: { post: TPost }) {
  return (
    <article>
      <h1 className="mb-12 text-center text-6xl font-bold leading-tight tracking-tighter md:text-left md:text-7xl md:leading-none lg:text-8xl">
        {post._title}
      </h1>

      <div className="hidden md:block md:mb-6">
        {post.author && (
          <Avatar title={post.author._title} url={post.author.avatar.url} />
        )}
      </div>
      <div className="hidden md:block md:mb-12 text-base dark:text-white/60 text-black/60">
        <Date dateString={post.date} />
      </div>

      <div className="mb-8 sm:mx-0 md:mb-16">
        <CoverImage title={post._title} url={post.coverImage.url} />
      </div>

      <div className="mx-auto max-w-2xl">
        <div className="mb-6 block md:hidden">
          {post.author && (
            <Avatar title={post.author._title} url={post.author.avatar.url} />
          )}
        </div>
        <div className="mb-12 text-base dark:text-white/60 text-black/60 block md:hidden">
          <Date dateString={post.date} />
        </div>
      </div>

      <div className="mx-auto max-w-2xl">
        <div className="prose dark:prose-invert hover:prose-a:text-orange-500">
          <RichText
            components={{
              img: (props) => <BodyImage {...props} />,
              pre: (props) => <CodeBlock {...props} />,
              code: (props) => <CodeBlock {...props} />,
            }}
          >
            {post.body.json.content}
          </RichText>
        </div>
      </div>
    </article>
  );
}
