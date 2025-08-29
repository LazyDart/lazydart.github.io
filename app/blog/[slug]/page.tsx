import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import styles from "./page.module.css"

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({slug: post.slug }));
}

export default async function BlogPost({ params }: {params: any }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    return (
    <main>
      <h1 className={styles.title}>{post.meta.title}</h1>
      <p className={styles.date}>{post.meta.date}</p>
      <article className={`${styles.article} ${post.meta.theme === "psychedelic" ? styles.psychedelic : ""}`}>
        {/* Render markdown/MDX content as React components */}
        <MDXRemote source={post.content} />
      </article>
    </main>
  );
}