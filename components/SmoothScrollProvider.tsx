"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

/**
 * Global smooth-scroll layer.
 *
 * We deliberately keep the Lenis instance on `window` so that
 * useVideoScrub() — and any other scroll-bound hook — can subscribe
 * without prop drilling or context.
 *
 * Easing is intentionally slow & couture (no snappy springs).
 */
declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      // "yağ gibi akan" — smooth, slow, premium
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
      lerp: 0.085,
    });

    window.__lenis = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Respect users who explicitly request reduced motion
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyReduceMotion = () => {
      if (reduceMotion.matches) lenis.stop();
      else lenis.start();
    };
    applyReduceMotion();
    reduceMotion.addEventListener("change", applyReduceMotion);

    return () => {
      cancelAnimationFrame(rafId);
      reduceMotion.removeEventListener("change", applyReduceMotion);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}
