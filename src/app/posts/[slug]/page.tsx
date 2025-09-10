import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { SITE_NAME } from "@/lib/constants";
import markdownToHtml from "@/lib/markdownToHtml";
import { PostBody } from "@/app/_components/post-body";
import FadeTransition from "@/app/_components/fade-transition";

export default async function Post(props: Params) {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <FadeTransition>
      <main>
        <div className="container px-4 mx-auto">
          <div className="py-2">
            <article className="mb-32">
              <h1 className="text-xl">{post.title}</h1>
              <p className="text-gray-500 text-sm mb-4">
                {post.date
                  ? new Date(post.date)
                      .toLocaleDateString("ja-JP", {
                        year: "numeric",
                        month: "2-digit",
                      })
                      .replace("/", "/")
                  : ""}
              </p>
              <PostBody content={content} />
            </article>
          </div>
        </div>
      </main>
    </FadeTransition>
  );
}

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | ${SITE_NAME}`;

  return {
    title,
    openGraph: {
      title,
      images: [post.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
