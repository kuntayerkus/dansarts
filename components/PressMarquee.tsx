"use client";

import { motion } from "framer-motion";

const easing = [0.16, 1, 0.3, 1] as const;

const items = [
  "MARKA · 01",
  "FESTIVAL · 02",
  "GALA · 03",
  "MARKA · 04",
  "WORKSHOP · 05",
  "SAHNE · 06",
];

/**
 * PressMarquee
 * ----------------------------------------------------------------------
 * Continuous, infinite horizontal strip. Placeholder brands until real
 * logos are supplied. Two duplicated rows keep the loop seamless.
 */
export default function PressMarquee() {
  return (
    <section
      aria-label="Sahnedeki Markalar"
      className="relative bg-background border-y border-line/60 py-14 md:py-20 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 mb-10 md:mb-14 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.2, ease: easing }}
          className="flex items-center gap-3"
        >
          <span className="block h-px w-8 bg-accent/60" />
          <span className="text-[10px] uppercase tracking-whisper text-accent/70">
            Sahnedeki Markalar
          </span>
        </motion.div>

        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.2, ease: easing, delay: 0.2 }}
          className="text-[10px] uppercase tracking-whisper text-accent/60 border border-accent/30 px-3 py-1"
        >
          Yakında
        </motion.span>
      </div>

      <div className="relative">
        <div className="flex w-max animate-marquee whitespace-nowrap will-change-transform">
          {[...items, ...items].map((label, i) => (
            <span
              key={`${label}-${i}`}
              className="serif italic font-light text-text/40 hover:text-accent/80 transition-colors duration-700 text-3xl md:text-5xl tracking-editorial mx-10 md:mx-16"
            >
              {label}
            </span>
          ))}
        </div>

        {/* Edge fades — sıvı bir kayboluş hissi */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-background to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-background to-transparent"
        />
      </div>
    </section>
  );
}
