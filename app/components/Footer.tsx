// components/Footer.tsx
import { Container } from "./Container";

export function Footer() {
  return (
    <footer>
      <Container>
        <div className="section" style={{ borderTop: "1px solid #1b1f2a" }}>
          <small style={{ color: "var(--muted)" }}>© {new Date().getFullYear()} My App</small>
        </div>
      </Container>
    </footer>
  );
}
