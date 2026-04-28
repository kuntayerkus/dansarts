"use client";

import { motion } from "framer-motion";
import ScrubScene from "./ScrubScene";

/**
 * Atmosphere — "Sahnemiz: İzmir"
 * Translates the brand thesis: each evening is a different elite venue.
 * Roof-tops · butik şarap evleri · lobi barlar · lüks oteller.
 */
export default function Atmosphere() {
  return (
    <ScrubScene
      id="manifesto"
      src="/assets/videos/slow-latin-shoes.mp4"
      poster="/assets/videos/poster-shoes.webp"
      scrollLength={3.5}
      vignette={0.7}
    >
      {({ ready, progress }) => {
        const fadeIn = (start: number, end: number) =>
          Math.max(0, Math.min(1, (progress - start) / (end - start)));
        const fadeOut = (start: number, end: number) =>
          1 - Math.max(0, Math.min(1, (progress - start) / (end - start)));

        const headlineOpacity = fadeIn(0.05, 0.2) * fadeOut(0.55, 0.75);
        const subOpacity = fadeIn(0.15, 0.3) * fadeOut(0.6, 0.8);
        const closingOpacity = fadeIn(0.7, 0.85);

        return (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: ready ? 1 : 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-8 md:top-12 left-6 md:left-12 flex items-center gap-3"
            >
              <span className="block h-px w-8 bg-accent/60" />
              <span className="text-[10px] uppercase tracking-whisper text-accent/70">
                Bölüm 02 · Atmosfer
              </span>
            </motion.div>

            {/* Headline */}
            <div
              className="absolute inset-0 flex items-end md:items-center px-6 md:px-16 pb-24 md:pb-0"
              style={{ opacity: headlineOpacity }}
            >
              <div className="max-w-2xl md:ml-[8%]">
                <p className="text-[10px] uppercase tracking-whisper text-accent/70 mb-5 md:mb-7">
                  Adres değil
                </p>
                <h2 className="serif font-light text-text leading-[1.0] text-[40px] md:text-[72px] lg:text-[92px] tracking-tight">
                  Bir <em className="not-italic italic text-accent">Deneyim.</em>
                </h2>
                <div
                  className="gold-rule h-px w-24 md:w-32 mt-7 md:mt-9"
                  style={{ transform: `scaleX(${headlineOpacity})`, transformOrigin: "left" }}
                />
                <p
                  className="mt-7 md:mt-9 text-text/75 text-sm md:text-base font-light leading-relaxed max-w-md"
                  style={{ opacity: subOpacity }}
                >
                  Bir akşam Karşıyaka'nın saklı bir terasında, bir başka akşam
                  Alsancak'ın bir butik şarap evinde, bir başka akşam ise
                  Çeşme'nin lüks bir lobi barında. Her sınıf, her gece — yalnızca
                  bir kez yaşanır, yaşayan unutmaz.
                </p>
              </div>
            </div>

            {/* Bottom-right closing */}
            <div
              className="absolute bottom-10 md:bottom-14 right-6 md:right-12 max-w-xs text-right"
              style={{ opacity: closingOpacity }}
            >
              <p className="text-[10px] uppercase tracking-whisper text-accent/80 mb-3">
                Sahnemizin adı
              </p>
              <p className="serif text-text text-2xl md:text-3xl font-light leading-snug italic">
                İzmir.
              </p>
            </div>
          </>
        );
      }}
    </ScrubScene>
  );
}
