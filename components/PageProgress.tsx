"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "hero", label: "Asalet" },
  { id: "atmosfer", label: "Atmosfer" },
  { id: "oncu", label: "Öncü" },
  { id: "deneyim", label: "Sahne" },
  { id: "basvuru", label: "Davet" },
];

/**
 * PageProgress
 * --------------------------------------------------------
 * Whisper-quiet right-edge indicator: a 1px gold rule that fills
 * with document progress, with five tick marks for the sections.
 * Click a tick to scroll. Active section's tick brightens.
 * Desktop only.
 */
export default function PageProgress() {
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState<string>("hero");

  // Document scroll progress (0..1)
  useEffect(() => {
    const compute = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(1, window.scrollY / total) : 0);
    };
    compute();
    const lenis = window.__lenis;
    if (lenis) {
      lenis.on("scroll", compute);
      return () => lenis.off("scroll", compute);
    }
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, []);

  // Active section
  useEffect(() => {
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!elements.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-30% 0px -30% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleJump = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = window.__lenis;
    if (lenis) lenis.scrollTo(el, { duration: 1.6, lock: true });
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      aria-hidden="true"
      className="hidden md:block fixed right-5 lg:right-7 top-1/2 -translate-y-1/2 z-30 h-[40vh] w-px"
    >
      {/* Track */}
      <span
        aria-hidden="true"
        className="absolute inset-y-0 right-0 w-px bg-line/80"
      />

      {/* Gold fill — scales with document progress */}
      <span
        aria-hidden="true"
        className="absolute top-0 right-0 w-px bg-accent origin-top"
        style={{
          height: "100%",
          transform: `scaleY(${progress.toFixed(4)})`,
          transition: "transform 220ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      {/* Section ticks */}
      <nav aria-label="Sayfa bölümleri">
        {sections.map((s, i) => {
          const top = (i / (sections.length - 1)) * 100;
          const active = activeId === s.id;
          return (
            <button
              key={s.id}
              onClick={() => handleJump(s.id)}
              aria-label={`${s.label} bölümüne git`}
              className="group absolute right-0 -translate-y-1/2 flex items-center gap-3 cursor-pointer"
              style={{ top: `${top}%` }}
            >
              <span
                className={`text-[9px] uppercase tracking-whisper transition-all duration-700 ease-couture whitespace-nowrap ${
                  active
                    ? "text-accent opacity-90 translate-x-0"
                    : "text-text/45 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                }`}
              >
                {s.label}
              </span>
              <span
                className={`block h-px transition-all duration-700 ease-couture ${
                  active
                    ? "w-4 bg-accent"
                    : "w-2 bg-text/40 group-hover:w-3 group-hover:bg-accent/70"
                }`}
              />
            </button>
          );
        })}
      </nav>
    </div>
  );
}
