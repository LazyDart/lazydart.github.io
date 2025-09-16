// app/components/TextFillBox.tsx (App Router) or any client component
"use client";

import { useEffect, useRef } from "react";

type Props = {
  text: string;
  maxFontPixels?: number;   // 0 means “no upper cap”
  minFontPixels?: number;
  widthOnly?: boolean;
  className?: string;       // allow sizing via CSS
};

export default function TextFillBox({
  text,
  maxFontPixels = 0,
  minFontPixels = 4,
  widthOnly = false,
  className = ""
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      // dynamic import so it never runs during SSR
      const { default: TextFill } = await import("textfilljs");

      // wait for fonts (helps avoid measuring too early)
      if ("fonts" in document) {
        // @ts-ignore
        await (document as any).fonts.ready;
      }

      if (!isMounted || !containerRef.current) return;

      // Run TextFill on the container element
      TextFill(containerRef.current, {
        maxFontPixels,
        minFontPixels,
        widthOnly,
        autoResize: true,   // re-run on window resize
      });
    })();

    return () => { isMounted = false; };
  }, [maxFontPixels, minFontPixels, widthOnly]);

  return (
    <div
      ref={containerRef}
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
