"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const easing = [0.16, 1, 0.3, 1] as const;
const STORAGE_KEY = "dansarts_intro_seen";
const DURATION_MS = 2200;

/**
 * IntroLoader
 * ----------------------------------------------------------------------
 * First-visit cinematic curtain. Only shown once per browser session.
 * - Pauses Lenis (if mounted) so the underlying Hero doesn't move.
 * - Restores body overflow + Lenis on completion.
 * - Respects prefers-reduced-motion: collapses to an instant fade.
 */
export default function IntroLoader() {
  const [show, setShow] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let alreadySeen = false;
    try {
      alreadySeen = window.sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      alreadySeen = false;
    }
    if (alreadySeen) {
      setShow(false);
      return;
    }
    setShow(true);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const total = reduceMotion ? 600 : DURATION_MS;

    const lenis = window.__lenis;
    lenis?.stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
      setShow(false);
      document.body.style.overflow = prevOverflow;
      lenis?.start();
    }, total);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = prevOverflow;
      lenis?.start();
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: easing }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          aria-hidden="true"
        >
          <div className="flex flex-col items-center">
            <motion.span
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              animate={{ opacity: 1, letterSpacing: "0.6em" }}
              transition={{ duration: 1.4, ease: easing }}
              className="serif text-accent text-[clamp(28px,6vw,72px)] font-light pl-[0.6em]"
            >
              DANS ARTS
            </motion.span>

            <motion.span
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.6, ease: easing, delay: 0.4 }}
              className="gold-rule h-px w-40 md:w-64 mt-6 origin-center"
            />

            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 0.7, y: 0 }}
              transition={{ duration: 1.2, ease: easing, delay: 0.9 }}
              className="mt-6 text-[10px] uppercase tracking-whisper text-text/60"
            >
              Reyhan Şafak · İzmir
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
