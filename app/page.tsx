// app/page.tsx
import { Container } from "@/app/components/Container";
import { Section } from "@/app/components/Section";

export default function HomePage() {
  return (
    <Section>
      <Container>
        <div className="stack" style={{ ["--stack-gap" as any]: "1.25rem" }}>
          <h1>Welcome 👋</h1>
          <p>This page respects a consistent max-width and left/right margin via <code>Container</code>, with comfy vertical rhythm via <code>Section</code> and <code>.stack</code>.</p>
          <div className="card">
            <p>Drop content in cards for emphasis.</p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
