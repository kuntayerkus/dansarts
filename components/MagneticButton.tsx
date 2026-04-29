"use client";

import {
  ButtonHTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import useExperienceTier from "@/hooks/useExperienceTier";

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  /** Max pixel offset toward the cursor. */
  strength?: number;
  /** As a child for non-button elements. */
  as?: "button" | "a";
  href?: string;
}

/**
 * MagneticButton
 * ----------------------------------------------------------------------
 * Subtle cursor-attraction effect. Only active on fine-pointer devices.
 * Falls back to a regular button on touch.
 */
export default function MagneticButton({
  children,
  strength = 14,
  as = "button",
  href,
  className = "",
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const tier = useExperienceTier();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Decorative: only attach the magnetic effect on the full tier.
    // Reduced-motion + Save-Data + 3G already short-circuit via useExperienceTier.
    if (tier !== "full") return;
    const fine =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      tx = (dx / rect.width) * strength * 2;
      ty = (dy / rect.height) * strength * 2;
      tx = Math.max(-strength, Math.min(strength, tx));
      ty = Math.max(-strength, Math.min(strength, ty));
      schedule();
    };

    const onLeave = () => {
      tx = 0;
      ty = 0;
      schedule();
    };

    const tick = () => {
      raf = 0;
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      if (Math.abs(cx - tx) > 0.05 || Math.abs(cy - ty) > 0.05) schedule();
    };

    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(tick);
    };

    const node = el as HTMLElement;
    node.addEventListener("mousemove", onMove);
    node.addEventListener("mouseleave", onLeave);
    return () => {
      node.removeEventListener("mousemove", onMove);
      node.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
      node.style.transform = "";
    };
  }, [strength, tier]);

  const sharedProps = {
    "data-magnetic": "true",
    className: `inline-block transition-transform duration-300 ease-couture ${className}`,
    style: { willChange: "transform" as const },
  };

  if (as === "a") {
    return (
      <a
        ref={ref as React.MutableRefObject<HTMLAnchorElement | null>}
        href={href}
        {...sharedProps}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.MutableRefObject<HTMLButtonElement | null>}
      {...sharedProps}
      {...rest}
    >
      {children}
    </button>
  );
}
