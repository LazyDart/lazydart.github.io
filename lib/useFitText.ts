// lib/useFitText.ts
import { useEffect, useMemo, useRef, useState } from "react";

type Options = { min?: number; max?: number; lines?: number; debounceMs?: number; };

export function useFitText({
  min: minOpt = 1.25,
  max: maxOpt = 4,
  lines: linesOpt = 2,
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

  function readVars(el: HTMLElement) {
    const cs = getComputedStyle(el);
    const parse = (v: string | null, fallback: number) => {
      const num = parseFloat(v || "");
      return Number.isFinite(num) ? num : fallback;
    };
    // supports values like "1.2rem" or "20px"; we need REMs
    const rootPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const toRem = (v: string | null, fallbackRem: number) => {
      if (!v) return fallbackRem;
      const s = v.trim();
      if (s.endsWith("rem")) return parseFloat(s) || fallbackRem;
      if (s.endsWith("px")) return (parseFloat(s) || (fallbackRem * rootPx)) / rootPx;
      const n = parseFloat(s);
      return Number.isFinite(n) ? n : fallbackRem;
    };

    const minRem = toRem(cs.getPropertyValue("--fit-min"), minOpt);
    const maxRem = toRem(cs.getPropertyValue("--fit-max"), maxOpt);
    const lines = Math.max(1, Math.round(parse(cs.getPropertyValue("--fit-lines"), linesOpt)));
    return { minRem, maxRem, lines };
  }

  function apply(rem: number) {
    const el = ref.current;
    if (el) el.style.setProperty("--title-size", `${rem}rem`);
  }

  function fitsAt(rem: number, el: HTMLElement, container: HTMLElement, lines: number): boolean {
    el.style.setProperty("--title-size", `${rem}rem`);
    const rect = el.getBoundingClientRect();
    const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
    const usedLines = Math.max(1, Math.round(rect.height / lineHeight));
    const okWidth = el.scrollWidth <= container.getBoundingClientRect().width + 0.5;
    return okWidth && usedLines <= lines;
  }

  function measure() {
    const el = ref.current;
    if (!el) return;
    const container = el.parentElement ?? el;

    const { minRem, maxRem, lines } = readVars(el);

    // hide while sizing
    el.style.setProperty("opacity", "0");

    // early exit if max fits
    if (fitsAt(maxRem, el, container, lines)) {
      apply(maxRem);
      setReady(true);
      el.style.removeProperty("opacity");
      return;
    }

    // binary search
    let lo = minRem;
    let hi = maxRem;
    for (let i = 0; i < 6; i++) {
      const mid = (lo + hi) / 2;
      if (fitsAt(mid, el, container, lines)) lo = mid;
      else hi = mid;
    }
    const finalRem = Math.max(minRem, Math.min(maxRem, lo));
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
  }, [schedule]);

  return { ref, ready };
}

