import { Pump } from "basehub/react-pump";
import { Intro } from "../components/intro";
import { HeroPost, PostMetaFragment } from "../components/hero-post";
import { MoreStories } from "../components/more-stories";
import { LanguagesEnum } from "@/.basehub/schema";

export default async function Page({
  params: { locale },
}: {
  params: { locale: LanguagesEnum };
}) {
  return (
    <Pump
      queries={[
        {
          blog: {
            __args: {
              variants: {
                languages: locale,
              },
            },
            morePosts: true,
            posts: {
              __args: { orderBy: "date__DESC" },
              items: PostMetaFragment,
            },
          },
        },
      ]}
    >
      {async ([{ blog }]) => {
        "use server";

        const heroPost = blog.posts.items[0];
        const morePosts = blog.posts.items.slice(1);

        return (
          <main>
            <section className="container mx-auto px-5">
              <Intro />
              {heroPost && <HeroPost {...heroPost} locale={locale} />}
              <MoreStories
                morePosts={morePosts}
                title={blog.morePosts}
                locale={locale}
              />
            </section>
          </main>
        );
      }}
    </Pump>
  );
}
