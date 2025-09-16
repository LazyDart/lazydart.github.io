// components/Header.tsx
import Link from "next/link";
import { Container } from "./Container";

export function Header() {
  return (
    <header className="site-nav">
      <Container>
        <nav style={{ display: "flex", alignItems: "center", gap: "1rem", height: 64 }}>
          <Link href="/" className="brand">My&nbsp;App</Link>
          <div style={{ marginLeft: "auto", display: "flex", gap: "1rem" }}>
            <Link href="/blog">Blog</Link>
            <Link href="/about">About</Link>
          </div>
        </nav>
      </Container>
    </header>
  );
}
