// components/Header.tsx
import Link from "next/link";
import { Container } from "./Container";

export function Header() {
  return (
    <header className="site-nav">
      <Container>
        <nav style={{ display: "flex", alignItems: "center", gap: "1.5rem", height: 64 }}>
          <Link href="/" className="brand">MIŁOSZ TKACZ</Link>
          <div style={{ marginLeft: "auto", display: "flex", gap: "1.5rem" }}>
            <Link href="/blog">BLOG</Link>
          </div>
        </nav>
      </Container>
    </header>
  );
}
