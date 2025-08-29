import Link from "next/link";
import Counter from "./components/Counter";

export default function Home() {
  return (
    <main>
      <div>Next.js on GitHub Pagesd</div>
    <Counter /> {/* this part runs in the browser */}
      <li key={"blog"}>
            {/* Link navigates to /blog/[slug] */}
            <Link href={`/blog/`}>
              blog
            </Link>
        </li>
    </main>
  );
}
