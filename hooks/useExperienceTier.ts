"use client";

import { useEffect, useState } from "react";

/**
 * Experience tier — combined connection + motion + data preference signal.
 *
 * - `full`  → 4G/Wi-Fi, no save-data flag, no reduce-motion → load video,
 *             enable scrub, cursor trail, magnetic interactions.
 * - `soft`  → 3G OR `Save-Data` ON OR `prefers-reduced-data` OR
 *             `prefers-reduced-motion` → skip video bytes, show poster as a
 *             static still, downgrade decorative interactions.
 * - `still` → 2G / slow-2g → poster only, no decorative animation at all.
 *
 * Notes
 * -----
 * - `navigator.connection` is Chromium-only. Firefox & Safari fall back to
 *   the OS-level media queries (`prefers-reduced-data`,
 *   `prefers-reduced-motion`), which is the right behaviour: if we can't
 *   measure the network, respect the user's stated preferences.
 * - We start at `full` on SSR and the first client paint, then re-evaluate
 *   in `useEffect`. This avoids hydration mismatch and flickering posters
 *   on the happy path (most users).
 * - We listen to `navigator.connection.change` so that mid-session network
 *   degradation (e.g., car-park 5G drops to 3G) downgrades the experience
 *   live.
 */
export type ExperienceTier = "full" | "soft" | "still";

interface NetworkInformationLike {
  effectiveType?: string;
  saveData?: boolean;
  addEventListener?: (type: "change", listener: () => void) => void;
  removeEventListener?: (type: "change", listener: () => void) => void;
}

interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInformationLike;
  mozConnection?: NetworkInformationLike;
  webkitConnection?: NetworkInformationLike;
}

const getConnection = (): NetworkInformationLike | undefined => {
  if (typeof navigator === "undefined") return undefined;
  const nav = navigator as NavigatorWithConnection;
  return nav.connection ?? nav.mozConnection ?? nav.webkitConnection;
};

const matchSafe = (query: string): boolean => {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia(query).matches;
};

const computeTier = (): ExperienceTier => {
  if (typeof window === "undefined") return "full";

  const reduceMotion = matchSafe("(prefers-reduced-motion: reduce)");
  const reduceData = matchSafe("(prefers-reduced-data: reduce)");
  const conn = getConnection();
  const effectiveType = conn?.effectiveType;
  const saveData = conn?.saveData === true;

  if (effectiveType === "slow-2g" || effectiveType === "2g") return "still";
  if (saveData || reduceData || reduceMotion) return "soft";
  if (effectiveType === "3g") return "soft";
  return "full";
};

export default function useExperienceTier(): ExperienceTier {
  // Start at "full" so SSR and the initial client render agree (no
  // hydration mismatch). The real value lands on the next paint.
  const [tier, setTier] = useState<ExperienceTier>("full");

  useEffect(() => {
    const update = () => setTier(computeTier());
    update();

    const conn = getConnection();
    const motionMql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const dataMql = window.matchMedia("(prefers-reduced-data: reduce)");

    conn?.addEventListener?.("change", update);
    motionMql.addEventListener("change", update);
    dataMql.addEventListener("change", update);

    return () => {
      conn?.removeEventListener?.("change", update);
      motionMql.removeEventListener("change", update);
      dataMql.removeEventListener("change", update);
    };
  }, []);

  return tier;
}
