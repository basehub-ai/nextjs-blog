import Image from "next/image";
import { RichText } from "basehub/react-rich-text";
import CoverImage from "@/app/components/ui/cover-image";
import Avatar from "@/app/components/ui/avatar";
import Date from "@/app/components/date";
import CodeSnippet from "@/app/components/code-snippet";
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
      <div className="hidden md:block md:mb-12 text-base text-gray-500">
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
        <div className="mb-12 text-base text-gray-500 block md:hidden">
          <Date dateString={post.date} />
        </div>
      </div>

      <div className="mx-auto max-w-2xl">
        <div className="prose dark:prose-invert hover:prose-a:text-orange-500">
          <RichText
            components={{
              img: (props) => (
                <>
                  <Image
                    className="rounded-lg"
                    alt={props.caption ?? ""}
                    {...props}
                  />
                  {props.caption && (
                    <figcaption className="text-center">
                      {props.caption}
                    </figcaption>
                  )}
                </>
              ),
              code: (props) => <CodeSnippet data={props} />,
            }}
          >
            {post.body.json.content}
          </RichText>
        </div>
      </div>
    </article>
  );
}
