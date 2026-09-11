// app/page.tsx
import Link from "next/link";
import { Container } from "@/app/components/Container";
import { Section } from "@/app/components/Section";
import { getAllPosts } from "@/lib/posts";
import styles from "./page.module.css";

export default function HomePage() {
  const [latest] = getAllPosts();

  return (
    <Section>
      <Container>
        <div className={`stack ${styles.hero}`} style={{ ["--stack-gap" as any]: "2.5rem" }}>
          <div>
            <h1 className={`${styles.name} gradient-text`}>Miłosz Tkacz</h1>
            <p className={styles.tagline}>Notes on consciousness, philosophy, and code.</p>
          </div>

          {latest && (
            <div className="card">
              <div className={styles.latest}>
                <span className={styles.latestLabel}>LATEST POST</span>
                <Link href={`/blog/${latest.slug}`} className={styles.latestTitle}>
                  {latest.title}
                </Link>
                <span className={styles.latestDate}>{latest.date}</span>
              </div>
            </div>
          )}

          <Link href="/blog" className={styles.blogLink}>READ ALL POSTS →</Link>
        </div>
      </Container>
    </Section>
  );
}
