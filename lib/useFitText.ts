// lib/useFitText.ts
import { useEffect, useMemo, useRef, useState } from "react";

type Options = {
  min?: number;
  max?: number;
  lines?: number;
  debounceMs?: number;
};

export function useFitText({
  min = 1.25,
  max = 4,
  lines = 2,
  debounceMs = 50,
}: Options = {}) {
  const ref = useRef<HTMLElement | null>(null);
  const [ready, setReady] = useState(false);

  const roRef = useRef<ResizeObserver | null>(null);
  const ioRef = useRef<IntersectionObserver | null>(null);
  const rafRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);

  const schedule = useMemo(
    () => (fn: () => void) => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(fn);
      }, debounceMs);
    },
    [debounceMs]
  );

  function apply(rem: number) {
    const el = ref.current;
    if (el) el.style.setProperty("--title-size", `${rem}rem`);
  }

  function fitsAt(rem: number, el: HTMLElement, container: HTMLElement): boolean {
    el.style.setProperty("--title-size", `${rem}rem`);
    const rect = el.getBoundingClientRect();
    const style = getComputedStyle(el);
    const lineHeight = parseFloat(style.lineHeight);
    const usedLines = Math.max(1, Math.round(rect.height / lineHeight));
    const containerWidth = container.getBoundingClientRect().width;
    return usedLines <= lines && el.scrollWidth <= containerWidth + 0.5;
  }

  function measure() {
    const el = ref.current;
    if (!el) return;
    const container = el.parentElement ?? el;

    el.style.setProperty("opacity", "0"); // hide while measuring

    // Quick early exit
    if (fitsAt(max, el, container)) {
      apply(max);
      setReady(true);
      el.style.removeProperty("opacity");
      return;
    }

    let lo = min;
    let hi = max;
    for (let i = 0; i < 6; i++) {
      const mid = (lo + hi) / 2;
      if (fitsAt(mid, el, container)) lo = mid;
      else hi = mid;
    }

    const finalRem = Math.max(min, Math.min(max, lo));
    apply(finalRem);
    setReady(true);
    el.style.removeProperty("opacity");
  }

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const container = el.parentElement ?? el;

    roRef.current = new ResizeObserver(() => schedule(measure));
    roRef.current.observe(container);

    ioRef.current = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) schedule(measure);
    });
    ioRef.current.observe(el);

    schedule(measure);

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      roRef.current?.disconnect();
      ioRef.current?.disconnect();
    };
  }, [schedule, min, max, lines]);

  return { ref, ready };
}

