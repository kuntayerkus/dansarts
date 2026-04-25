"use client";

import { ReactNode, useRef } from "react";
import useVideoScrub from "@/hooks/useVideoScrub";

interface ScrubSceneProps {
  sequence: "girl" | "shoe";
  desktopFrameCount: number;
  mobileFrameCount: number;
  /** How many viewport heights the section occupies. More = slower scrub. */
  scrollLength?: number;
  /** Optional dark vignette opacity (0..1). */
  vignette?: number;
  /** Children render *inside* the sticky viewport, above the canvas. */
  children?: (state: { ready: boolean; progress: number }) => ReactNode;
  /** ID for anchor navigation. */
  id?: string;
  className?: string;
}

/**
 * ScrubScene
 * --------------------------------------------------------
 * A 100vh sticky canvas inside a tall section. As the user
 * scrolls through the section, the image sequence is scrubbed.
 *
 * The render-prop pattern lets each scene layer its own copy
 * over the canvas while reacting to `progress` and `ready`.
 */
export default function ScrubScene({
  sequence,
  desktopFrameCount,
  mobileFrameCount,
  scrollLength = 3,
  vignette = 0.55,
  children,
  id,
  className = "",
}: ScrubSceneProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { ready, progress } = useVideoScrub({
    sequence,
    desktopFrameCount,
    mobileFrameCount,
    sectionRef,
    canvasRef,
    priorityCount: 18,
  });

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`relative w-full ${className}`}
      style={{ height: `${scrollLength * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-background">
        {/* Canvas layer */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
        />

        {/* Loading veil — fades out once priority frames are ready */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 bg-background transition-opacity duration-1500 ease-couture ${
            ready ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        />

        {/* Subtle film-grain & vignette for editorial depth */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,${vignette}) 100%)`,
          }}
        />

        {/* Overlay content */}
        {children && (
          <div className="relative z-10 h-full w-full">
            {children({ ready, progress })}
          </div>
        )}
      </div>
    </section>
  );
}
