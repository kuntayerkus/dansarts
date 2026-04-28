"use client";

import { ReactNode, useRef } from "react";
import useVideoScrub from "@/hooks/useVideoScrub";

interface ScrubSceneProps {
  /** Absolute public path to the MP4. Must be encoded with -g 1 for frame-accurate seek. */
  src: string;
  /** First-frame poster shown until the video decodes (and as a 404 fallback). */
  poster?: string;
  /** Eager-load this scene's video. Hero = true; below-the-fold = false. */
  eager?: boolean;
  /** Section height in viewports — slower scrub = taller section. */
  scrollLength?: number;
  /** Vignette opacity (0..1). */
  vignette?: number;
  /** Render-prop for layered editorial copy. */
  children?: (state: { ready: boolean; progress: number }) => ReactNode;
  id?: string;
  className?: string;
}

/**
 * ScrubScene
 * --------------------------------------------------------
 * 100vh sticky video inside a tall section. One hardware-decoded MP4
 * scrubbed via `video.currentTime`. Adds cinematic motion blur on
 * fast scroll. Mobile uses the same source — `object-fit: cover` crops.
 */
export default function ScrubScene({
  src,
  poster,
  eager = false,
  scrollLength = 3,
  vignette = 0.55,
  children,
  id,
  className = "",
}: ScrubSceneProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { ready, progress, velocity } = useVideoScrub({
    sectionRef,
    videoRef,
    eager,
  });

  // Cap at 2.4px so it stays editorial, not soap-opera
  const blurPx = Math.min(2.4, velocity * 4.5);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`relative w-full ${className}`}
      style={{ height: `${scrollLength * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-background">
        {/* Single hardware-decoded source. Encode -g 1 for frame-accurate seek. */}
        <video
          ref={videoRef}
          src={src}
          muted
          playsInline
          preload={eager ? "auto" : "metadata"}
          poster={poster}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover will-change-[filter]"
          style={{
            filter: blurPx > 0.05 ? `blur(${blurPx.toFixed(2)}px)` : "none",
            transition: "filter 280ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />

        {/* Loading veil — dissolves once first frame is decoded */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 bg-background transition-opacity duration-1500 ease-couture pointer-events-none ${
            ready ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Editorial vignette */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,${vignette}) 100%)`,
          }}
        />

        {/* Overlay copy */}
        {children && (
          <div className="relative z-10 h-full w-full pointer-events-none">
            <div className="pointer-events-auto h-full w-full">
              {children({ ready, progress })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
