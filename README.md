# A statically generated blog example using Next.js and BaseHub

This example showcases Next.js's [Static Generation](https://nextjs.org/docs) feature using [BaseHub](https://basehub.com/) as the data source.

## Demo

### [https://nextjs-blog-basehub.vercel.app/](https://nextjs-blog-basehub.vercel.app/)

## Deploy your own

Using the Deploy Button below, you'll deploy the Next.js project as well as connect it to your BaseHub repository using the Vercel BaseHub Integration.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/basehub-ai/nextjs-blog)

## How to use

### With create next-app --example (coming soon 🚧)

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init), [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io) to bootstrap the example:

```bash
npx create next-app --example cms-basehub cms-basehub-app
```

```bash
yarn create next-app --example cms-basehub cms-basehub-app
```

```bash
pnpm create next-app --example cms-basehub cms-basehub-app
```

### With git clone (recommended up to now 🚀)

You can also clone the repository directly:

```bash
git clone git@github.com:basehub-ai/nextjs-blog.git
```

Then, navigate to the cloned folder:

```bash
cd nextjs-blog
```

Install the dependencies:

```bash
npm install
```

```bash
yarn install
```

```bash
pnpm install
```

## Configuration from scratch

### Step 1. Create an account and a repository on BaseHub

First, [create an account on BaseHub](https://basehub.com/signup/).

After creating an account, create a new blank **repository** from the [dashboard](https://basehub.com/) and assign to it any name of your liking.

### Step 2. Create new Document Block

The [Document Block](https://basehub.com/docs/basics/content-modeling-with-blocks#document) is like a page inside BaseHub. For example, if you have your Homepage, your About Page, your Pricing Page, these would all be Document Blocks, with nested blocks for things like Text, Images, etc.

Document Blocks have a structure that can’t be reused across the Repository—it’s a “singleton”.

For this example you need to create a Document Block that defines an author and a post collection with its content type, you can call it **Blog**. Once you have created the document, you can add fields to it. Likes components, collections, nested pages, rich text, media, etc.

#### Create an `Authors` collection with its content type

From your BaseHub repository, in the **Content** tab, create a new **collection** from **Blog** document:

Give it the **title** `Authors`, the **API Name** should be `authors`

Once the collection is saved, go to **Edit template** and start with a **Image** fiel block. Call it `avatar` and set it up **Is Required** constraint.

Save the content type and continue.

#### Create a `Posts` collection with its content type

From your BaseHub repository, in the **Content** tab, create a new **collection** from **Blog** document:

Give it the **title** `Posts`, the **API Name** should be `posts`

Once the collection is saved, go to **Edit template** and start with a **Date** fiel block. Call it `date` and set it up the **Is Required** constraint.

Then, do the same for the following fields:

- `cover image` - **Image** field block
- `author` - **Reference** field block with the **Authors** collection template
- `excerpt` - **Text** field block
- `body` - **Rich Text** field block

The content type is saved automatically, so you don't need to save it manually.

#### Create a `Post` instance

After creating the `Authors` and `Posts` collections, you can create a new **Author** and **Post** instance. You should start by creating a new `Post` instance first.

From your BaseHub repository, in the **Content** tab, inside **Blog** document, create a **New Row** from **Posts** collection (you should create at least **1 post entry**):

Give it the **title**, for example `My First Post`, the **API Name** should be `myFristPost` and the **Slug** should be `my-first-post`.

Then, fullfill the following fields with the data you want to display in the post.

You can play with the AI Assistant to get text suggestions for **Plain Text** and **Rich Text** fields blocks. Also, for alt text suggestions for **Image** fields blocks.

Before you continue, you must create a new **Author** instance.

#### Create an `Author` instance

Inside of your `Post` instance, you should have a **Reference** field block with the **Authors** collection template.

Create a new `Author` instance by filling the **Reference** field block with the name of the author you want to display in the post.

Then, you can navigate to the new **Author** instance by clicking it and fullfill the fields with the `avatar` image you want to display.

#### Commit your changes

After creating the `Authors` and `Posts` collections, and creating a new `Author` and `Post` instance, you should commit your changes.

Navigate to the **Commit** tab and you should see the changes you made. Add a message to the commit and click on **Commit to main** button.

It's pretty similar to a Git commit, but for your content.

Once you have committed your changes, you can continue by connecting your BaseHub repository to your Next.js application.

### Step 3. Connect your BaseHub repository to your Next.js application

From your BaseHub repository, in the **Connect** tab, you should see the instructions to connect your BaseHub repository to your Next.js application.

#### 1. First of all, you need to install the `BaseHub SDK`

```bash
npm install basehub
```

```bash
yarn add basehub
```

```bash
pnpm add basehub
```

#### 2. Then, you need to configure the set required environment variables

```bash
BASEHUB_TOKEN=<your-read-token> # read token given by BaseHub SDK
BASEHUB_DRAFT_SECRET=<secure-secret> # create a secure secret for draft content preview

# the following are optional

BASEHUB_DRAFT=<true|false> # defaults to false
BASEHUB_REF=<branch-name|commit-id> # defaults to your default branch
```

#### 3. You should generate a type-safe SDK for your app running the following command

```bash
npx basehub
```

```bash
yarn basehub
```

```bash
pnpm basehub
```

⚠️ Important: Make sure you run the generator before your app's build step. A common pattern is to run it in your [postinstall script](https://docs.npmjs.com/cli/v9/using-npm/scripts).

```json
{
  "scripts": {
    "postinstall": "basehub"
  }
}
```

#### 4. Integrate the SDK with your Next.js app

Import it into your app and retrieve your data without worrying about type definitions.

✅ This example query will be inferred from your schema.

```tsx
import { basehub } from "basehub";

const Page = async () => {
  // query variables
  let filter;
  let first = 3;
  let slugs = false;
  let toc = false;
  let wpm = 3;
  let filter1;
  let first1 = 3;
  const data = await basehub({ next: { revalidate: 30 } }).query({
    blog: {
      _id: true,
      _slug: true,
      _title: true,
      authors: {
        __args: {
          filter: filter,
          first: first,
        },
        _id: true,
        _meta: {
          totalCount: true,
        },
        _slug: true,
        _title: true,
        items: {
          _id: true,
          _slug: true,
          _title: true,
          avatar: {
            alt: true,
            aspectRatio: true,
            fileName: true,
            fileSize: true,
            height: true,
            lastModified: true,
            mimeType: true,
            rawUrl: true,
          },
        },
      },
      posts: {
        __args: {
          filter: filter1,
          first: first1,
        },
        _id: true,
        _meta: {
          totalCount: true,
        },
        _slug: true,
        _title: true,
        items: {
          _id: true,
          _slug: true,
          _title: true,
          author: {
            _id: true,
            _slug: true,
            _title: true,
          },
          body: {
            html: {
              __args: {
                slugs: slugs,
                toc: toc,
              },
            },
            markdown: true,
            plainText: true,
            readingTime: {
              __args: {
                wpm: wpm,
              },
            },
          },
          coverImage: {
            alt: true,
            aspectRatio: true,
            fileName: true,
            fileSize: true,
            height: true,
            lastModified: true,
            mimeType: true,
            rawUrl: true,
          },
          date: true,
          excerpt: true,
        },
      },
    },
  });

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default Page;
```

### Step 4. Previewing content

To set up a preview workflow with BaseHub and Next.js, you’ll need to first [configure Draft Mode in Next.js](https://nextjs.org/docs/app/building-your-application/configuring/draft-mode). If you use Vercel, the [Vercel Toolbar](https://vercel.com/docs/workflow-collaboration/draft-mode#enabling-draft-mode-in-the-vercel-toolbar) will come with Draft Mode already configured, which is great.

#### Using Pump (recommended)

To get draft content, we simply need to pass `draft={true}` to our Pump component. It’s recommended to do so conditionally, depending on the state of Next.js’ Draft Mode:

```tsx
import { basehub } from "basehub";
import { Pump } from "basehub/react-pump";
import { draftMode } from "next/headers";

const Page = async () => {
  return (
    <Pump
      next={{ revalidate: 30 }}
      draft={draftMode().isEnabled} // setting draft prop you can enable fast refresh content
      queries={[{ __typename: true }]}
    >
      {async ([data]) => {
        "use server";
        return <pre>{JSON.stringify(data, null, 2)}</pre>;
      }}
    </Pump>
  );
};

export default Page;
```

You will need to set the `BASEHUB_DRAFT_SECRET` environment variable to a secure secret. This secret will be used to generate a signed URL that will allow you to preview draft content.

### Step 8. Deploy on Vercel

You can deploy this app to the cloud with [Vercel](https://vercel.com/new/clone?repository-url=https://github.com/basehub-ai/nextjs-blog) ([Documentation](https://nextjs.org/docs/deployment)).

#### Deploy Your Local Project

To deploy your local project to Vercel, push it to GitHub and [import to Vercel](https://vercel.com/import). You will need to select your GitHub repository during the import process.

**Important**: When you import your project on Vercel, make sure to click on **Environment Variables** and set them to match your `.env.local` file.
