"use client";

import { RefObject, useEffect, useRef, useState } from "react";

export interface VideoScrubOptions {
  /** Section that defines the scroll-trigger window (tall sticky parent). */
  sectionRef: RefObject<HTMLElement | null>;
  /** The <video> element being scrubbed. */
  videoRef: RefObject<HTMLVideoElement | null>;
  /** If true, preload immediately (Hero). Default lazy via IntersectionObserver. */
  eager?: boolean;
}

interface VideoScrubState {
  /** True once the video has decoded its first frame. */
  ready: boolean;
  /** 0..1 progress through the section. */
  progress: number;
  /** 0..1 normalized scroll velocity — feeds the cinematic motion blur. */
  velocity: number;
}

/**
 * useVideoScrub
 * ------------------------------------------------------------------
 * Scroll-driven video scrub. Replaces the legacy WebP-sequence pipeline:
 * one MP4/WebM file, hardware decode, ~3–5 MB instead of ~25 MB across
 * 600+ HTTP requests.
 *
 * - Lazy loads via IntersectionObserver unless `eager: true`.
 * - Sets `video.currentTime` from Lenis scroll progress on rAF.
 * - Tracks velocity (decayed) so the scene can apply motion blur.
 * - Skips redundant currentTime writes (< 1 frame at 60fps) to avoid
 *   Safari's seeking jitter.
 *
 * REQUIREMENT: encode the source with all-keyframe GOP (`-g 1`) so seek
 * is frame-accurate everywhere; see CLAUDE.md for the ffmpeg command.
 */
export default function useVideoScrub({
  sectionRef,
  videoRef,
  eager = false,
}: VideoScrubOptions): VideoScrubState {
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [velocity, setVelocity] = useState(0);

  const rafRef = useRef<number | null>(null);
  const targetTimeRef = useRef(0);
  const lastProgressRef = useRef(0);
  const lastTickAtRef = useRef(0);
  const velocityRef = useRef(0);

  // ---- Lazy load --------------------------------------------------------
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    if (eager) {
      video.preload = "auto";
      video.load();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          video.preload = "auto";
          video.load();
          observer.disconnect();
        }
      },
      // Start fetching when within ~1 viewport of the scene
      { rootMargin: "100% 0px 100% 0px" }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [eager, sectionRef, videoRef]);

  // ---- Ready signal -----------------------------------------------------
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.readyState >= 2) setReady(true);

    const onLoadedData = () => setReady(true);
    const onError = () => {
      // Silent in prod; the loading veil simply stays up.
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.warn("[useVideoScrub] video failed to load:", video.currentSrc);
      }
    };
    video.addEventListener("loadeddata", onLoadedData);
    video.addEventListener("error", onError);
    return () => {
      video.removeEventListener("loadeddata", onLoadedData);
      video.removeEventListener("error", onError);
    };
  }, [videoRef]);

  // ---- Scroll → currentTime ---------------------------------------------
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const computeProgress = () => {
      const rect = section.getBoundingClientRect();
      const winH = window.innerHeight || 1;
      const total = section.offsetHeight - winH;
      if (total <= 0) return 0;
      const p = -rect.top / total;
      return Math.max(0, Math.min(1, p));
    };

    const tick = () => {
      rafRef.current = null;
      const dur = video.duration;
      if (!dur || isNaN(dur)) return;
      const target = targetTimeRef.current;
      // Skip writes smaller than ~half a frame at 60fps to dodge Safari jitter
      if (Math.abs(video.currentTime - target) > 0.008) {
        try {
          video.currentTime = target;
        } catch {
          /* seeking can throw mid-buffering — ignore */
        }
      }
    };

    const requestTick = () => {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(tick);
    };

    lastTickAtRef.current = performance.now();
    const handleScroll = () => {
      const now = performance.now();
      const dt = Math.max(1, now - lastTickAtRef.current);
      lastTickAtRef.current = now;

      const p = computeProgress();
      const dp = p - lastProgressRef.current;
      lastProgressRef.current = p;

      // Velocity: progress-per-second, normalized to 0..1
      const v = Math.min(1, (Math.abs(dp) / dt) * 1000 * 0.35);
      velocityRef.current = velocityRef.current * 0.65 + v * 0.35;
      setVelocity(velocityRef.current);
      setProgress(p);

      const dur = video.duration;
      if (dur && !isNaN(dur)) {
        targetTimeRef.current = p * dur;
        requestTick();
      }
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

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      if (removeLenis) removeLenis();
      else window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionRef, videoRef]);

  // ---- Velocity decay (so blur fades when scroll stops) -----------------
  useEffect(() => {
    let raf = 0;
    const decay = () => {
      if (velocityRef.current > 0.001) {
        velocityRef.current *= 0.86;
        setVelocity(velocityRef.current);
      } else if (velocityRef.current !== 0) {
        velocityRef.current = 0;
        setVelocity(0);
      }
      raf = requestAnimationFrame(decay);
    };
    raf = requestAnimationFrame(decay);
    return () => cancelAnimationFrame(raf);
  }, []);

  return { ready, progress, velocity };
}
