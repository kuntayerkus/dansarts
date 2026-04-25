"use client";

import { useEffect, useRef, useState } from "react";

/**
 * CursorTrail
 * ----------------------------------------------------------------------
 * Two-layer golden cursor: a tiny dot at the actual position and a soft
 * ring that lerps behind it. Active only on hover-capable, fine-pointer
 * devices and when reduced-motion is not set.
 *
 * On hover over interactive elements (a, button, input, [data-magnetic]),
 * the ring scales up and shifts opacity — a subtle "I see you" beat.
 */
export default function CursorTrail() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    x: 0,
    y: 0,
    rx: 0,
    ry: 0,
    hover: false,
    raf: 0 as number,
    visible: false,
  });

  useEffect(() => {
    const fine =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    if (!fine || reduce) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const s = stateRef.current;

    const onMove = (e: MouseEvent) => {
      s.x = e.clientX;
      s.y = e.clientY;
      if (!s.visible && dotRef.current && ringRef.current) {
        s.visible = true;
        dotRef.current.style.opacity = "1";
        ringRef.current.style.opacity = "1";
      }
    };

    const onLeave = () => {
      s.visible = false;
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const interactive = !!target?.closest(
        "a, button, input, textarea, select, [data-magnetic]"
      );
      s.hover = interactive;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${
          s.rx - 18
        }px, ${s.ry - 18}px, 0) scale(${interactive ? 1.6 : 1})`;
        ringRef.current.style.borderColor = interactive
          ? "rgba(212, 175, 55, 0.85)"
          : "rgba(212, 175, 55, 0.45)";
      }
    };

    const tick = () => {
      // lerp ring toward dot
      s.rx += (s.x - s.rx) * 0.18;
      s.ry += (s.y - s.ry) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${s.x - 3}px, ${
          s.y - 3
        }px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${s.rx - 18}px, ${
          s.ry - 18
        }px, 0) scale(${s.hover ? 1.6 : 1})`;
      }

      s.raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    s.raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(s.raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[90] h-9 w-9 rounded-full border opacity-0 mix-blend-difference"
        style={{
          borderColor: "rgba(212, 175, 55, 0.45)",
          transition:
            "opacity 400ms cubic-bezier(0.16, 1, 0.3, 1), border-color 300ms ease",
          willChange: "transform",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[91] h-1.5 w-1.5 rounded-full bg-accent opacity-0 mix-blend-difference"
        style={{
          transition: "opacity 200ms ease",
          willChange: "transform",
        }}
      />
    </>
  );
}
