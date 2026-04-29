"use client";

import { motion } from "framer-motion";

const easing = [0.16, 1, 0.3, 1] as const;

const items = [
  "HILTON VIYANA BALOSU",
  "BUENOS AIRES · 2003",
  "ATATÜRK KÜLTÜR MERKEZİ",
  "SOFYA SALSA KONGRESİ",
  "YUNTA BRAVA · ÇEŞME",
  "I. ANKARA TANGO FESTİVALİ",
  "TDSF TÜRKİYE 1.LİĞİ · 2008",
  "İZMİR FUARI",
];

/**
 * PressMarquee — "Sahnedeki İmzalar"
 * Continuous strip of stages where Reyhan Şafak performed.
 * Two duplicated rows keep the loop seamless.
 */
export default function PressMarquee() {
  return (
    <section
      aria-label="Sahnedeki İmzalar"
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
            Sahnedeki İmzalar · 1995 → Bugün
          </span>
        </motion.div>

        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.2, ease: easing, delay: 0.2 }}
          className="hidden md:inline-block text-[10px] uppercase tracking-whisper text-accent/60 border border-accent/30 px-3 py-1"
        >
          Uluslararası
        </motion.span>
      </div>

      <div className="group/marquee relative">
        <div
          className="flex w-max animate-marquee whitespace-nowrap will-change-transform group-hover/marquee:[animation-play-state:paused]"
        >
          {[...items, ...items].map((label, i) => (
            <span
              key={`${label}-${i}`}
              className="serif italic font-light text-text/40 hover:text-accent/80 transition-colors duration-700 text-2xl md:text-4xl tracking-editorial mx-10 md:mx-16"
            >
              {label}
            </span>
          ))}
        </div>

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
