import { Post } from "@/lib/queries";
import PostPreview from "./post-preview";

export default function MoreStories({ morePosts }: { morePosts: Post[] }) {
  return (
    <section>
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        More Stories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {morePosts.map((post) => (
          <PostPreview
            key={post._slug}
            title={post._title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post._slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  );
}
