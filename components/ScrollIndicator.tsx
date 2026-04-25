"use client";

import { motion } from "framer-motion";

interface ScrollIndicatorProps {
  visible: boolean;
}

/**
 * A whisper-quiet vertical line that "breathes" — invites the
 * user to scroll without shouting. Disappears when scroll begins.
 */
export default function ScrollIndicator({ visible }: ScrollIndicatorProps) {
  return (
    <motion.div
      aria-hidden="true"
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 8 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="absolute bottom-10 md:bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
    >
      <span className="text-[10px] uppercase tracking-whisper text-accent/70">
        Sanatı Keşfetmek İçin Kaydırın
      </span>
      <span className="block h-12 w-px bg-gradient-to-b from-accent/80 via-accent/40 to-transparent origin-top animate-breathe" />
    </motion.div>
  );
}
