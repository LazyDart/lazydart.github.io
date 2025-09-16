// components/Container.tsx
import { PropsWithChildren } from "react";

export function Container({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  return <div className={`container ${className}`}>{children}</div>;
}
