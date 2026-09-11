// components/Footer.tsx
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="section">
          <small>© {new Date().getFullYear()} MIŁOSZ TKACZ</small>
        </div>
      </Container>
    </footer>
  );
}
