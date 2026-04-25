"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./MagneticButton";

const easing = [0.16, 1, 0.3, 1] as const;

/**
 * StickyCTA
 * ----------------------------------------------------------------------
 * Soft pill that appears once the user scrolls past the Hero (≈ 80vh)
 * and disappears when the application section is in view, so it never
 * shadows the form itself.
 */
export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const y = window.scrollY || window.pageYOffset;
      const threshold = window.innerHeight * 0.8;
      const target = document.getElementById("basvuru");
      const inApplication =
        !!target &&
        target.getBoundingClientRect().top < window.innerHeight * 0.6;
      setVisible(y > threshold && !inApplication);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="sticky-cta"
          initial={{ opacity: 0, y: 20, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.94 }}
          transition={{ duration: 0.9, ease: easing }}
          className="pointer-events-auto fixed bottom-6 right-6 md:bottom-10 md:right-10 z-40"
        >
          <MagneticButton
            as="a"
            href="#basvuru"
            strength={10}
            className="group relative inline-flex items-center gap-3 rounded-full border border-accent/40 bg-background/80 px-5 py-3 text-[10px] uppercase tracking-whisper text-accent shadow-[0_8px_40px_rgba(212,175,55,0.12)] backdrop-blur-md transition-colors duration-700 hover:bg-accent hover:text-background"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span>Özel Deneyime Başvur</span>
            <span className="block h-px w-6 bg-accent/60 transition-all duration-700 group-hover:w-10 group-hover:bg-background" />
          </MagneticButton>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
