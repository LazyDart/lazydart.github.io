// app/blog/[slug]/page.tsx
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container } from "@/app/components/Container";
import { Section } from "@/app/components/Section";
import { FitTitle } from "@/app/components/FitTitle";
import styles from "./page.module.css";


export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({slug: post.slug }));
}

export default async function BlogPost({ params }: {params: any }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    return (
    <Section>
      <Container>
        <FitTitle 
            text={post.meta.title}
            className={styles.postTitle}
            min={10}
            max={100}
            lines={1}
        />
        <p className={styles.date}>{post.meta.date}</p>
        <article className={`stack ${styles.article}`}>
            {/* Render markdown/MDX content as React components */}
            <MDXRemote source={post.content} />
        </article>
      </Container>
    </Section>
  );
}