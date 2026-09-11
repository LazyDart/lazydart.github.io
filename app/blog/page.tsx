// app/blog/page.tsx
import Link from "next/link";

import { getAllPosts } from "@/lib/posts";

import { Container } from "@/app/components/Container";
import { Section } from "@/app/components/Section";
import styles from "./page.module.css";

export default function BlogIndex() {
    const posts = getAllPosts();
    return (
        <Section>
        <Container>
            <h1 className={styles.heading}>Blog</h1>
            <div className={styles.list}>
            {posts.map(p => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className={styles.row}>
                    <span className={styles.date}>{p.date}</span>
                    <span className={styles.title}>{p.title}</span>
                </Link>
            ))}
            </div>
        </Container>
        </Section>
    );
}
