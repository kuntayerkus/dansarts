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

    // Hash anchor click → Lenis-driven smooth scroll. Lenis does NOT
    // intercept anchor clicks on its own, so without this every
    // "#atmosfer / #oncu / #deneyim / #basvuru" tap would be a no-op
    // (or a jarring native jump that fights the smooth layer).
    const onAnchorClick = (e: MouseEvent) => {
      // Honor open-in-new-tab modifiers.
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }
      const anchor = (e.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;
      // Only same-page hash links.
      if (anchor.target && anchor.target !== "_self") return;
      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("#") || href.length < 2) return;
      const id = decodeURIComponent(href.slice(1));
      const el = document.getElementById(id);
      if (!el) return;

      e.preventDefault();

      if (reduceMotion.matches) {
        el.scrollIntoView({ behavior: "auto", block: "start" });
      } else {
        lenis.scrollTo(el, { duration: 1.6, lock: true });
      }
      // Keep the URL shareable without a native jump.
      history.replaceState(null, "", href);
    };
    document.addEventListener("click", onAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      reduceMotion.removeEventListener("change", applyReduceMotion);
      document.removeEventListener("click", onAnchorClick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}
