// components/Section.tsx
import { PropsWithChildren } from "react";

export function Section({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  return <section className={`section ${className}`}>{children}</section>;
}
