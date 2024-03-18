import { RichText } from "basehub/react-rich-text";
import CoverImage from "@/app/components/ui/cover-image";
import Avatar from "@/app/components/ui/avatar";
import Date from "@/app/components/date";
import { Post } from "@/lib/queries";

export function Post({ post }: { post: Post }) {
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
      <div className="hidden md:block md:mb-12 text-base">
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
        <div className="mb-12 text-base block md:hidden">
          <Date dateString={post.date} />
        </div>
      </div>

      <div className="mx-auto max-w-2xl text-lg leading-relaxed">
        <RichText
          components={{
            p(props) {
              return <p className="mb-6" {...props} />;
            },
            a(props) {
              return (
                <a
                  className="text-orange-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                />
              );
            },
            ol(props) {
              return <ol className="list-decimal ms-5" {...props} />;
            },
          }}
        >
          {post.body.json.content}
        </RichText>
      </div>
    </article>
  );
}
