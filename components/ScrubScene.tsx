"use client";

import { ReactNode, useRef } from "react";
import useVideoScrub from "@/hooks/useVideoScrub";
import useExperienceTier from "@/hooks/useExperienceTier";

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
  /**
   * Render-prop for layered editorial copy.
   * `isStatic` is `true` on slow connections / reduce-motion users — the
   * video and scrub are skipped, only the poster paints. Render-props
   * should treat that as "show every layer at full opacity" rather than
   * stitching reveals to the (frozen) progress value.
   */
  children?: (state: {
    ready: boolean;
    progress: number;
    isStatic: boolean;
  }) => ReactNode;
  id?: string;
  className?: string;
}

/**
 * ScrubScene
 * --------------------------------------------------------
 * 100vh sticky video inside a tall section. One hardware-decoded MP4
 * scrubbed via `video.currentTime`. Adds cinematic motion blur on
 * fast scroll. Mobile uses the same source — `object-fit: cover` crops.
 *
 * On slow connections / reduce-motion / save-data users we skip the video
 * entirely (saving 5–6 MB per scene) and render the poster as a static
 * still in a normal-flow 100vh section. Editorial copy still layers on
 * top via the render-prop.
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
  const tier = useExperienceTier();
  const isStatic = tier !== "full";

  if (isStatic) {
    return (
      <StaticScene
        id={id}
        poster={poster}
        vignette={vignette}
        className={className}
      >
        {children}
      </StaticScene>
    );
  }

  return (
    <ScrubSceneVideo
      id={id}
      src={src}
      poster={poster}
      eager={eager}
      scrollLength={scrollLength}
      vignette={vignette}
      className={className}
    >
      {children}
    </ScrubSceneVideo>
  );
}

// ---- Full experience: video + scroll-scrub ---------------------------------

function ScrubSceneVideo({
  id,
  src,
  poster,
  eager,
  scrollLength,
  vignette,
  className,
  children,
}: Omit<ScrubSceneProps, "src"> & { src: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { ready, progress, velocity } = useVideoScrub({
    sectionRef,
    videoRef,
    eager: !!eager,
  });

  // Cap at 2.4px so it stays editorial, not soap-opera
  const blurPx = Math.min(2.4, velocity * 4.5);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`relative w-full ${className ?? ""}`}
      style={{ height: `${(scrollLength ?? 3) * 100}vh` }}
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
            background: `radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,${vignette ?? 0.55}) 100%)`,
          }}
        />

        {/* Overlay copy */}
        {children && (
          <div className="relative z-10 h-full w-full pointer-events-none">
            <div className="pointer-events-auto h-full w-full">
              {children({ ready, progress, isStatic: false })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ---- Soft / still tier: poster only, single 100vh, no scrub ----------------

function StaticScene({
  id,
  poster,
  vignette,
  className,
  children,
}: {
  id?: string;
  poster?: string;
  vignette?: number;
  className?: string;
  children?: ScrubSceneProps["children"];
}) {
  return (
    <section
      id={id}
      className={`relative w-full h-screen overflow-hidden bg-background ${className ?? ""}`}
    >
      {poster && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,${vignette ?? 0.55}) 100%)`,
        }}
      />

      {children && (
        <div className="relative z-10 h-full w-full pointer-events-none">
          <div className="pointer-events-auto h-full w-full">
            {children({ ready: true, progress: 0, isStatic: true })}
          </div>
        </div>
      )}
    </section>
  );
}
