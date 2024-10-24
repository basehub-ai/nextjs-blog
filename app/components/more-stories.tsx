import { PostPreview } from "./post-preview";
import { PostMetaFragment } from "./hero-post";

export function MoreStories({ morePosts }: { morePosts: PostMetaFragment[] }) {
  return (
    <section>
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        More Stories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {morePosts.map((post) => {
          return <PostPreview key={post._id} {...post} />;
        })}
      </div>
    </section>
  );
}
