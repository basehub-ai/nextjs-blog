import { PostsItemGenqlSelection, QueryGenqlSelection, basehub } from "basehub";

export const POST_FRAGMENT = {
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
  body: {
    json: {
      content: true,
    },
  },
  coverImage: {
    url: true,
    alt: true,
  },
  date: true,
  excerpt: true,
} satisfies PostsItemGenqlSelection;

export const postBySlugQuery = (slug: string) => {
  return {
    blog: {
      posts: {
        __args: { first: 1, filter: { _sys_slug: { eq: slug } } },
        items: POST_FRAGMENT,
      },
    },
  } satisfies QueryGenqlSelection;
};

export const allPostsQuery = () => {
  return {
    blog: {
      posts: {
        __args: {
          first: 3,
          orderBy: "date__DESC",
        },
        items: POST_FRAGMENT,
      },
    },
  } satisfies QueryGenqlSelection;
};

export async function getMorePosts(
  slug: string,
  preview: boolean
): Promise<any> {
  const query = await basehub({
    draft: preview,
    next: { revalidate: 60 },
  }).query({
    blog: {
      posts: {
        __args: {
          filter: {
            _sys_slug: {
              notEq: slug,
            },
          },
          first: 2,
          orderBy: "date__DESC",
        },
        items: POST_FRAGMENT,
      },
    },
  });

  return query.blog.posts.items;
}

export async function getPreviewPostBySlug(slug: string | null): Promise<any> {
  const query = await basehub({ draft: true }).query({
    blog: {
      posts: {
        __args: {
          filter: {
            _sys_slug: {
              eq: slug,
            },
          },
          first: 1,
        },
        items: POST_FRAGMENT,
      },
    },
  });

  return query.blog.posts.items[0];
}
