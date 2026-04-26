"use client";

import { motion } from "framer-motion";
import ScrubScene from "./ScrubScene";
import ScrollIndicator from "./ScrollIndicator";
import MobileNav from "./MobileNav";

/**
 * Hero — "The Hook"
 * - Girl frame sequence (603 desktop / 301 mobile).
 * - Dark overlay lifts as the user scrolls through the first quarter.
 * - Headline animates in with a slow editorial fade.
 */
export default function Hero() {
  return (
    <ScrubScene
      id="hero"
      src="/assets/videos/slow-latin-girl.mp4"
      poster="/assets/videos/poster-girl.webp"
      eager
      scrollLength={3.5}
      vignette={0.6}
    >
      {({ ready, progress }) => {
        // Veil eases away from 0..0.18 of the scene
        const veilOpacity = Math.max(0, Math.min(1, 1 - progress / 0.18));
        // Title is at full opacity around 0.05..0.55
        const titleOpacity = Math.max(
          0,
          Math.min(
            1,
            progress < 0.05
              ? progress / 0.05
              : progress > 0.55
              ? 1 - (progress - 0.55) / 0.2
              : 1
          )
        );

        return (
          <>
            {/* Cinematic dark veil that lifts on scroll */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-background transition-opacity"
              style={{ opacity: veilOpacity * 0.55 }}
            />

            {/* Top brand mark */}
            <header className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 md:px-12 pt-8 md:pt-10">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : -10 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="flex items-center gap-3"
              >
                <span className="serif text-accent text-xl tracking-editorial">
                  DANS&nbsp;ARTS
                </span>
              </motion.div>
              <motion.nav
                initial={{ opacity: 0 }}
                animate={{ opacity: ready ? 1 : 0 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-whisper text-text/70"
              >
                <a href="#atmosfer" className="hover:text-accent transition-colors">
                  Atmosfer
                </a>
                <a href="#oncu" className="hover:text-accent transition-colors">
                  Öncü
                </a>
                <a href="#deneyim" className="hover:text-accent transition-colors">
                  Sahne
                </a>
                <a
                  href="#basvuru"
                  className="text-accent border-b border-accent/40 pb-0.5 hover:border-accent transition-colors"
                >
                  Başvuru
                </a>
              </motion.nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: ready ? 1 : 0 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                className="md:hidden"
              >
                <MobileNav />
              </motion.div>
            </header>

            {/* Centerpiece headline */}
            <div
              className="absolute inset-0 flex items-center justify-center px-6"
              style={{ opacity: titleOpacity, transition: "opacity 60ms linear" }}
            >
              <div className="max-w-4xl text-center">
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 12 }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                  className="text-[10px] md:text-[11px] uppercase tracking-whisper text-accent/80 mb-6 md:mb-8"
                >
                  Reyhan Şafak · İzmir
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 24 }}
                  transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
                  className="serif font-light leading-[1.05] text-text"
                >
                  <span className="block text-4xl md:text-7xl lg:text-[88px] tracking-tight">
                    Hareketin
                  </span>
                  <span className="block text-4xl md:text-7xl lg:text-[88px] mt-2 tracking-tight">
                    En <em className="not-italic gold-shimmer animate-shimmer">Asil</em> Hali
                  </span>
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{
                    opacity: ready ? 1 : 0,
                    scaleX: ready ? 1 : 0,
                  }}
                  transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 1.4 }}
                  className="gold-rule h-px w-32 md:w-48 mx-auto my-8 md:my-10 origin-center"
                />

                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: ready ? 0.85 : 0, y: ready ? 0 : 14 }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 1.6 }}
                  className="text-sm md:text-base font-light text-text/75 max-w-xl mx-auto leading-relaxed"
                >
                  Latin danslarının zarafetini, İzmir'in eksklüzif atölyesinde
                  yeniden tanımlayan bir vizyon. Sanatçının imzasını taşıyan,
                  davete açık bir deneyim.
                </motion.p>
              </div>
            </div>

            {/* Scroll indicator (bottom) */}
            <ScrollIndicator visible={ready && progress < 0.08} />
          </>
        );
      }}
    </ScrubScene>
  );
}
