// app/blog/page.tsx
import Link from "next/link";

import { getAllPosts } from "@/lib/posts";

import { Container } from "@/app/components/Container";
import { Section } from "@/app/components/Section";

export default function BlogIndex() {
    const posts = getAllPosts();
    return (
        <Section>
        <Container>
            <h1>Blog</h1>
            <ul className="stack" style={{ ["--stack-gap" as any]: ".75rem" }}>
            {posts.map(p => (
                <li key={p.slug}>
                <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                </li>
            ))}
            </ul>
        </Container>
        </Section>
    );
}