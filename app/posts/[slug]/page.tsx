import Link from "next/link";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { basehub } from "basehub";
import { Pump } from "basehub/react-pump";
import { MoreStories } from "@/app/components/ui/more-stories";
import { Post } from "@/app/components/ui/post";
import { getMorePosts, postBySlugQuery } from "@/lib/queries";

export async function generateStaticParams() {
  const {
    blog: { posts },
  } = await basehub({ cache: "no-store" }).query({
    blog: {
      posts: {
        items: {
          _slug: true,
        },
      },
    },
  });

  return posts.items.map((post) => ({ slug: post._slug }));
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <Pump
      next={{ revalidate: 60 }}
      draft={draftMode().isEnabled}
      queries={[postBySlugQuery(params.slug)]}
    >
      {async ([{ blog }]) => {
        const [post] = blog.posts.items;
        if (!post) notFound();

        const morePosts = await getMorePosts(
          params.slug,
          draftMode().isEnabled
        );

        return (
          <main className="container mx-auto px-5">
            <h2 className="mb-20 mt-8 text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter">
              <Link href="/" className="hover:underline">
                Blog
              </Link>
              .
            </h2>
            <Post post={post} />
            <hr className="border-accent-2 mt-28 mb-24" />
            <MoreStories morePosts={morePosts} />
          </main>
        );
      }}
    </Pump>
  );
}
