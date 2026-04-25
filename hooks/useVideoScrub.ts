"use client";

import { RefObject, useCallback, useEffect, useRef, useState } from "react";

export interface VideoScrubOptions {
  /** Public-relative folder, e.g. "/assets/frames" */
  basePath?: string;
  /** Folder under base, e.g. "girl" or "shoe" */
  sequence: "girl" | "shoe";
  /** Frame count of the desktop sequence (1-indexed). */
  desktopFrameCount: number;
  /** Frame count of the mobile sequence (1-indexed). */
  mobileFrameCount: number;
  /** Mobile breakpoint (px). */
  mobileBreakpoint?: number;
  /** Number of high-priority frames to await before "ready". */
  priorityCount?: number;
  /** Section element used as the scroll-trigger window. */
  sectionRef: RefObject<HTMLElement | null>;
  /** Canvas element rendered to. */
  canvasRef: RefObject<HTMLCanvasElement | null>;
}

interface VideoScrubState {
  /** True after the priority frames have decoded — render UI then. */
  ready: boolean;
  /** 0..1 progress through the section. */
  progress: number;
}

/**
 * useVideoScrub
 * ------------------------------------------------------------------
 * Drives a <canvas> as a scroll-scrubbed image sequence.
 *
 * - Picks `desktop/` or `mobile/` folder based on viewport.
 * - Pre-loads PRIORITY_COUNT frames eagerly (so first paint is never blank),
 *   then trickles the rest in the background.
 * - Subscribes to the global Lenis instance for buttery scroll values.
 * - Falls back gracefully to native scroll if Lenis isn't mounted.
 * - Honors devicePixelRatio (capped at 2 for perf) on resize.
 * - "cover" layout: image fills the canvas, cropping if necessary.
 */
export default function useVideoScrub({
  basePath = "/assets/frames",
  sequence,
  desktopFrameCount,
  mobileFrameCount,
  mobileBreakpoint = 768,
  priorityCount = 20,
  sectionRef,
  canvasRef,
}: VideoScrubOptions): VideoScrubState {
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  // Bumped whenever the desktop/mobile breakpoint flips so the bootstrap
  // effect re-runs with the correct frame folder.
  const [variantKey, setVariantKey] = useState(0);

  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentIndexRef = useRef(-1);
  const rafRef = useRef<number | null>(null);
  const targetIndexRef = useRef(0);

  // ---- Pick variant -------------------------------------------------------
  const pickVariant = useCallback(() => {
    if (typeof window === "undefined") {
      return { variant: "desktop" as const, count: desktopFrameCount };
    }
    const isMobile = window.innerWidth < mobileBreakpoint;
    return isMobile
      ? { variant: "mobile" as const, count: mobileFrameCount }
      : { variant: "desktop" as const, count: desktopFrameCount };
  }, [desktopFrameCount, mobileFrameCount, mobileBreakpoint]);

  // ---- Frame URL builder --------------------------------------------------
  const buildSrc = useCallback(
    (variant: "desktop" | "mobile", n: number) => {
      const padded = String(n).padStart(4, "0");
      const prefix = variant === "mobile" ? "mobile_frame_" : "frame_";
      return `${basePath}/${variant}/${sequence}/${prefix}${padded}.webp`;
    },
    [basePath, sequence]
  );

  // ---- Canvas resize (DPR-aware) ------------------------------------------
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const w = Math.max(1, Math.floor(rect.width * dpr));
    const h = Math.max(1, Math.floor(rect.height * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
  }, [canvasRef]);

  // ---- Draw a specific frame (cover-fit) ----------------------------------
  const drawFrame = useCallback(
    (idx: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const frames = framesRef.current;
      if (!frames.length) return;
      const clamped = Math.max(0, Math.min(frames.length - 1, idx));
      const img = frames[clamped];
      if (!img || !img.complete || !img.naturalWidth) {
        // Walk backwards to find a decoded one
        for (let i = clamped; i >= 0; i--) {
          const f = frames[i];
          if (f && f.complete && f.naturalWidth) {
            return drawCover(ctx, canvas, f);
          }
        }
        return;
      }

      drawCover(ctx, canvas, img);
      currentIndexRef.current = clamped;
    },
    [canvasRef]
  );

  // ---- Main loop: smooth toward targetIndex -------------------------------
  const tick = useCallback(() => {
    rafRef.current = null;
    const target = targetIndexRef.current;
    const current = currentIndexRef.current;
    // Direct draw — Lenis already eases scroll, no need to lerp again.
    if (target !== current) drawFrame(target);
  }, [drawFrame]);

  const requestTick = useCallback(() => {
    if (rafRef.current != null) return;
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  // ---- Bootstrap: load frames + bind scroll -------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const { variant, count } = pickVariant();

    // Pre-allocate Image objects but defer src assignment in two waves.
    const images: HTMLImageElement[] = new Array(count);
    framesRef.current = images;
    currentIndexRef.current = -1;
    targetIndexRef.current = 0;

    let priorityLoaded = 0;
    const priority = Math.min(priorityCount, count);
    let cancelled = false;

    const loadOne = (i: number, isPriority: boolean) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = "async";
        if ("fetchPriority" in img && isPriority) {
          (img as unknown as { fetchPriority: string }).fetchPriority = "high";
        }
        img.onload = img.onerror = () => resolve();
        img.src = buildSrc(variant, i + 1);
        images[i] = img;
      });

    // Priority wave — first N frames, awaited.
    const priorityPromises: Promise<void>[] = [];
    for (let i = 0; i < priority; i++) {
      priorityPromises.push(loadOne(i, true));
      priorityLoaded++;
    }

    Promise.all(priorityPromises).then(() => {
      if (cancelled) return;
      resizeCanvas();
      drawFrame(0);
      setReady(true);

      // Background wave — trickle in the rest, batched in chunks of 24.
      let i = priorityLoaded;
      const trickle = () => {
        if (cancelled || i >= count) return;
        const end = Math.min(count, i + 24);
        for (; i < end; i++) loadOne(i, false);
        // Yield between batches so we don't choke the scroll thread.
        setTimeout(trickle, 60);
      };
      trickle();
    });

    // Scroll subscription — global Lenis if present, else native.
    const computeProgress = () => {
      const rect = section.getBoundingClientRect();
      const winH = window.innerHeight || 1;
      // Section is `100vh sticky` inside an oversized parent. Progress is
      // 0 when section top hits viewport top, 1 when section bottom hits
      // viewport bottom. We measure against parent height.
      const total = section.offsetHeight - winH;
      if (total <= 0) return 0;
      const p = -rect.top / total;
      return Math.max(0, Math.min(1, p));
    };

    const handleScroll = () => {
      const p = computeProgress();
      setProgress(p);
      const lastIdx = (framesRef.current.length || 1) - 1;
      targetIndexRef.current = Math.round(p * lastIdx);
      requestTick();
    };

    const lenis = window.__lenis;
    let removeLenis: (() => void) | null = null;
    if (lenis) {
      lenis.on("scroll", handleScroll);
      removeLenis = () => lenis.off("scroll", handleScroll);
    } else {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }
    handleScroll();

    // Resize handling — re-pick variant if we cross the breakpoint.
    let lastVariant = variant;
    const handleResize = () => {
      resizeCanvas();
      const next = pickVariant();
      if (next.variant !== lastVariant) {
        lastVariant = next.variant;
        setReady(false);
        framesRef.current = [];
        currentIndexRef.current = -1;
        // Bump the key so the effect re-runs with the new variant; the
        // cleanup below will cancel the in-flight loads from this run.
        setVariantKey((k) => k + 1);
        return;
      }
      drawFrame(currentIndexRef.current);
    };
    window.addEventListener("resize", handleResize);

    // Initial size + first paint
    resizeCanvas();
    drawFrame(0);

    return () => {
      cancelled = true;
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
      if (removeLenis) removeLenis();
      else window.removeEventListener("scroll", handleScroll);
    };
  }, [
    canvasRef,
    sectionRef,
    pickVariant,
    buildSrc,
    drawFrame,
    requestTick,
    resizeCanvas,
    priorityCount,
    variantKey,
  ]);

  return { ready, progress };
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function drawCover(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  img: HTMLImageElement
) {
  const cw = canvas.width;
  const ch = canvas.height;
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  if (!iw || !ih) return;

  const canvasRatio = cw / ch;
  const imgRatio = iw / ih;

  let dw: number;
  let dh: number;
  let dx: number;
  let dy: number;

  if (imgRatio > canvasRatio) {
    // Image is wider — fit by height, crop sides
    dh = ch;
    dw = ih === 0 ? cw : (iw * ch) / ih;
    dx = (cw - dw) / 2;
    dy = 0;
  } else {
    // Image is taller — fit by width, crop top/bottom
    dw = cw;
    dh = iw === 0 ? ch : (ih * cw) / iw;
    dx = 0;
    dy = (ch - dh) / 2;
  }

  ctx.clearRect(0, 0, cw, ch);
  ctx.drawImage(img, dx, dy, dw, dh);
}
