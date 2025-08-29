import Link from "next/link"

export default function Home() {
  return (
    <main>
      <div>Next.js on GitHub Pagesd</div>
      <li key={"blog"}>
            {/* Link navigates to /blog/[slug] */}
            <Link href={`/blog/`}>
              blog
            </Link>
        </li>
    </main>
  );
}
