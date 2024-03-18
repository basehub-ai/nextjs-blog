import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { getPreviewPostBySlug } from "@/lib/queries";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  if (secret !== process.env.BASEHUB_DRAFT_SECRET || !slug) {
    return new Response("Invalid token", { status: 401 });
  }

  const post = await getPreviewPostBySlug(slug);

  if (!post) {
    return new Response("Invalid slug", { status: 401 });
  }

  draftMode().enable();

  redirect(`/posts/${post._slug}`);
}
