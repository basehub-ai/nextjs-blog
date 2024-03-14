import { draftMode } from "next/headers";
import { Pump } from "basehub/react-pump";
import { Intro } from "./components/ui/intro";
import { HeroPost } from "./components/ui/hero-post";
import { MoreStories } from "./components/ui/more-stories";
import { allPostsQuery } from "@/lib/queries";

export default async function Page() {
  return (
    <Pump
      next={{ revalidate: 60 }}
      draft={draftMode().isEnabled}
      queries={[allPostsQuery()]}
    >
      {async ([{ blog }]) => {
        "use server";

        const heroPost = blog.posts.items[0];
        const morePosts = blog.posts.items.slice(1);

        return (
          <main className="container mx-auto px-5">
            <Intro />
            {heroPost && (
              <HeroPost
                title={heroPost._title}
                coverImage={heroPost.coverImage}
                date={heroPost.date}
                author={heroPost.author}
                slug={heroPost._slug}
                excerpt={heroPost.excerpt}
              />
            )}
            <MoreStories morePosts={morePosts} />
          </main>
        );
      }}
    </Pump>
  );
}
