"use client";

import { motion } from "framer-motion";
import ScrubScene from "./ScrubScene";
import ScrollIndicator from "./ScrollIndicator";
import MobileNav from "./MobileNav";

/**
 * Hero — "The Manifesto"
 * - Girl scene with cinematic dark veil that lifts on scroll.
 * - Manifesto headline anchored in the venue-rotation thesis:
 *   "Sahnemiz Her Yer. Her Akşam Yeniden."
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
      {({ ready, progress, isStatic }) => {
        // In static mode (slow connection / reduced-motion) the section is a
        // single 100vh frame: keep the veil fully lifted and the title fully
        // visible without any scroll-progress math.
        const veilOpacity = isStatic
          ? 0
          : Math.max(0, Math.min(1, 1 - progress / 0.18));
        // Manifesto headline must be at full opacity on landing — it's the
        // brand statement. We only fade it OUT as the user scrolls past 0.55.
        const titleOpacity = isStatic
          ? 1
          : Math.max(
              0,
              Math.min(1, progress > 0.55 ? 1 - (progress - 0.55) / 0.2 : 1)
            );

        return (
          <>
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-background transition-opacity"
              style={{ opacity: veilOpacity * 0.55 }}
            />

            <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 pt-8 md:pt-10 pointer-events-auto">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : -10 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="flex flex-col"
              >
                <span className="serif text-accent text-xl tracking-editorial leading-none">
                  DANS&nbsp;ARTS
                </span>
                <span className="hidden md:block text-[9px] uppercase tracking-whisper text-text/45 mt-1.5">
                  İzmir · 1995'ten Bu Yana
                </span>
              </motion.div>
              <motion.nav
                initial={{ opacity: 0 }}
                animate={{ opacity: ready ? 1 : 0 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                className="hidden md:flex items-center gap-9 text-[11px] uppercase tracking-whisper text-text/70"
              >
                <a href="#oncu" className="hover:text-accent transition-colors">
                  Öncü
                </a>
                <a href="#vizyon" className="hover:text-accent transition-colors">
                  Vizyon
                </a>
                <a href="#sahne" className="hover:text-accent transition-colors">
                  Sahne
                </a>
                <a href="#deneyim" className="hover:text-accent transition-colors">
                  Deneyim
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

            {/* Centerpiece headline — manifesto */}
            <div
              className="absolute inset-0 flex items-center justify-center px-6"
              style={{ opacity: titleOpacity, transition: "opacity 60ms linear" }}
            >
              <div className="max-w-5xl text-center">
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 12 }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                  className="mb-6 md:mb-8 flex flex-col items-center gap-1.5 text-[10px] md:text-[11px] uppercase tracking-whisper text-accent/80"
                >
                  <span>Reyhan Şafak</span>
                  <span className="block h-px w-6 bg-accent/40" aria-hidden="true" />
                  <span className="text-text/65">TDSF 2. Kademe Antrenör</span>
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 24 }}
                  transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
                  className="serif font-light leading-[1.02] text-text"
                >
                  <span className="block text-[42px] md:text-7xl lg:text-[96px] tracking-tight">
                    Sahnemiz <em className="not-italic gold-shimmer animate-shimmer">Her Yer.</em>
                  </span>
                  <span className="block text-[42px] md:text-7xl lg:text-[96px] mt-2 tracking-tight">
                    Her Akşam <em className="not-italic gold-shimmer animate-shimmer">Yeniden.</em>
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
                  Türkiye Dans Sporları Federasyonu tescilli bir ustanın imzası.
                  <br className="hidden md:block" /> İzmir'in lüks otellerinde,
                  butik şarap evlerinde ve roof-top sahnelerinde davete açık bir
                  dans deneyimi.
                </motion.p>

                {/* Heritage stat row */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 14 }}
                  transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 1.9 }}
                  className="mt-10 md:mt-14 flex items-center justify-center gap-8 md:gap-14 text-text/70"
                >
                  <Stat value="10.000+" label="Öğrenci" />
                  <span className="block h-8 w-px bg-line/80" />
                  <Stat value="32" label="Yıllık Tecrübe" />
                  <span className="hidden md:block h-8 w-px bg-line/80" />
                  <Stat value="TDSF 2." label="Kademe Antrenör" hideOnMobile />
                </motion.div>
              </div>
            </div>

            {!isStatic && <ScrollIndicator visible={ready && progress < 0.08} />}
          </>
        );
      }}
    </ScrubScene>
  );
}

function Stat({
  value,
  label,
  hideOnMobile = false,
}: {
  value: string;
  label: string;
  hideOnMobile?: boolean;
}) {
  return (
    <div className={`text-center ${hideOnMobile ? "hidden md:block" : ""}`}>
      <p className="serif text-accent text-2xl md:text-3xl font-light leading-none">
        {value}
      </p>
      <p className="mt-2 text-[9px] md:text-[10px] uppercase tracking-whisper text-text/55">
        {label}
      </p>
    </div>
  );
}
