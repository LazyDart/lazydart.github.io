// components/FitTitle.tsx
"use client";
import { useEffect, useRef } from "react";
import { useFitText } from "@/lib/useFitText"; // your faster hook

type Props = { text: string; className?: string; min?: number; max?: number; lines?: number; };

export function FitTitle({ text, className, min = 1.25, max = 4, lines = 2 }: Props) {
  const { ref, ready } = useFitText({ min, max, lines }); // return "ready"
  const elRef = useRef<HTMLElement | null>(null);

  // tie the inner ref together (optional; useFitTextFast can expose "ref" directly)
  useEffect(() => { elRef.current = ref.current; }, [ref]);

  return (
    <h1
      ref={ref as any}
      className={className}
      data-fit={ready ? "ready" : "pending"}
      style={{
        // a small, safe default so it never renders HUGE initially
        ["--title-size" as any]: `${Math.min(max, 10)}rem`,
        // optional: reserve space ≈ lines * line-height * initial size (reduces layout shift)
        ["--lines" as any]: lines,
      }}
    >
      {text}
    </h1>
  );
}
