// app/components/TextFillBox.tsx
"use client";

import { useEffect, useRef } from "react";

type Props = {
  text: string;
  maxFontPixels?: number;
  minFontPixels?: number;
  widthOnly?: boolean;
  className?: string;
  deps?: any[]; // force rerun when these change (e.g., [text])
};

export default function TextFillBox({
  text,
  maxFontPixels = 0,
  minFontPixels = 4,
  widthOnly = false,
  className = "",
  deps = []
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let cleanupResize: (() => void) | null = null;
    let ro: ResizeObserver | null = null;

    const waitForFonts = async () => {
      // Safari supports document.fonts but it's safer to guard
      if ((document as any).fonts?.ready) {
        try { await (document as any).fonts.ready; } catch {}
      }
    };

    const waitForStableLayout = async (el: HTMLElement): Promise<void> => {
      // Resolve when el has nonzero size AND stays stable for ~100ms
      return new Promise((resolve) => {
        let lastW = 0, lastH = 0;
        let stableMs = 0;
        const tick = () => {
          if (cancelled) return;
          const { width, height } = el.getBoundingClientRect();
          const changed = width !== lastW || height !== lastH;
          lastW = width; lastH = height;
          if (width > 0 && height > 0 && !changed) {
            stableMs += 50;
          } else {
            stableMs = 0;
          }
          if (stableMs >= 100) resolve();
          else setTimeout(tick, 50);
        };
        tick();
      });
    };

    (async () => {
      const el = ref.current;
      if (!el) return;

      // Hidden by default to avoid a flash; reveal when ready
      el.dataset.fit = "pending";

      await waitForFonts();
      await waitForStableLayout(el);
      if (cancelled) return;

      const { default: TextFill } = await import("textfilljs");

      const run = () => {
        if (cancelled || !ref.current) return;
        TextFill(ref.current, {
          maxFontPixels,
          minFontPixels,
          widthOnly,
          autoResize: false, // we manage resize ourselves for better control
        });
        ref.current!.dataset.fit = "ready";
      };

      // Initial run
      run();

      // Re-run on container resize (grid/flex changes, sidebar toggle, etc.)
      ro = new ResizeObserver(() => run());
      ro.observe(el);

      // Re-run on window resize & DPR changes (zoom)
      const onWin = () => run();
      window.addEventListener("resize", onWin);
      const mq = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
      mq.addEventListener?.("change", onWin);

      cleanupResize = () => {
        window.removeEventListener("resize", onWin);
        mq.removeEventListener?.("change", onWin);
      };
    })();

    return () => {
      cancelled = true;
      cleanupResize?.();
      ro?.disconnect();
    };
    // re-run when these change
  }, [maxFontPixels, minFontPixels, widthOnly, ...deps]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        // TextFill needs measurable width & height
        // You can override these via className or parent layout
        width: "100%",
        height: "100%",
        overflow: "hidden",
        lineHeight: 1, // play nicely with resizing
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center"
      }}
    >
      {/* Default expected inner tag is <span>; you can change via `innerTag` option */}
      <span>{text}</span>
    </div>
  );
}
