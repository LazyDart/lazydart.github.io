import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function BlogIndex() {
  const posts = getAllPosts();

  
  return (
    <main>
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            {/* Link navigates to /blog/[slug] */}
            <Link href={`/blog/${post.slug}`}>
              {post.title} ({post.date})
            </Link>
            <p>{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}