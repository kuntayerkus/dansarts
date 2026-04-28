"use client";

import { motion } from "framer-motion";

const easing = [0.16, 1, 0.3, 1] as const;

interface Festival {
  index: string;
  name: string;
  city: string;
  year: string;
}

const festivals: Festival[] = [
  {
    index: "I.",
    name: "II. World Tango Festivali",
    city: "Buenos Aires · Arjantin",
    year: "2003",
  },
  {
    index: "II.",
    name: "Bulgaristan Salsa Kongresi",
    city: "Sofya · Bulgaristan",
    year: "2006",
  },
  {
    index: "III.",
    name: "Yunta Brava Tango Festivalleri",
    city: "Bodrum · Çeşme",
    year: "2007–2008",
  },
  {
    index: "IV.",
    name: "I. Uluslararası Ankara Tango Festivali",
    city: "Ankara",
    year: "2009",
  },
];

interface Stage {
  name: string;
  detail: string;
}

const stages: Stage[] = [
  { name: "Hilton Viyana Balosu", detail: "Avusturya · Uluslararası gala gösterisi" },
  { name: "Atatürk Kültür Merkezi", detail: "İzmir · Özel Dans Arts gösterisi" },
  { name: "İzmir Fuarı", detail: "Dünya Mutfakları Gösterisi" },
  { name: "TDSF Kulüpler Arası Yarışması", detail: "Türkiye 1.liği · 2008" },
];

const tangoMasters = [
  "Juan Carlos Copes & Johana Copes",
  "Sebastian Arce & Mariana Montes",
  "Julio Balmaceda & Corina Delarosa",
  "Aurora Lubiz & Jorge Firpo",
  "Claudia Codega & Estaban Moreno",
  "Geraldine Rojas & Javier Rodriguez",
];

const latinMasters = [
  "Luis Vazques & Melissa Fernandes",
  "Super Mario",
  "Tropical Gem",
  "Susana Montero",
  "Raymond Brown",
];

/**
 * InternationalVision — "Uluslararası Vizyon"
 * Festivals attended, stages shared, masters worked with.
 * Sourced from the 2026 brand strategy document (page 2).
 */
export default function InternationalVision() {
  return (
    <section
      id="vizyon"
      className="relative bg-background py-32 md:py-48 overflow-hidden border-t border-line/40"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.2, ease: easing }}
          className="flex items-center gap-3 mb-12 md:mb-16"
        >
          <span className="block h-px w-8 bg-accent/60" />
          <span className="text-[10px] uppercase tracking-whisper text-accent/70">
            Bölüm 04 · Uluslararası Vizyon
          </span>
        </motion.div>

        <div className="grid grid-cols-12 gap-y-12 md:gap-y-0 md:gap-x-12 mb-20 md:mb-28">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.6, ease: easing }}
            className="col-span-12 md:col-span-7 serif font-light leading-[1.0] text-text tracking-tight text-[40px] md:text-[64px] lg:text-[80px]"
          >
            Buenos Aires'tan
            <br />
            <em className="not-italic gold-shimmer animate-shimmer">İzmir'e.</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 0.85, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.5, ease: easing, delay: 0.3 }}
            className="col-span-12 md:col-span-5 md:pt-8 max-w-md text-text/75 text-sm md:text-base font-light leading-[1.85]"
          >
            Eğitim kalitesi, yıllar boyunca dünyanın en iyi isimleriyle yapılan
            çalışmalarla şekillendi. Buenos Aires'tan Sofya'ya, Hilton Viyana'dan
            Atatürk Kültür Merkezi'ne — sahne her seferinde yeniden tanımlandı.
          </motion.p>
        </div>

        {/* Festivals */}
        <div className="mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.4, ease: easing }}
            className="flex items-baseline justify-between mb-10 md:mb-12 border-b border-line/60 pb-5"
          >
            <p className="text-[11px] uppercase tracking-whisper text-accent/80">
              Katılım Sağlanan Uluslararası Festivaller
            </p>
            <p className="text-[10px] uppercase tracking-whisper text-text/40 hidden md:block">
              2003 → 2009
            </p>
          </motion.div>

          <ul className="divide-y divide-line/60">
            {festivals.map((f, i) => (
              <motion.li
                key={f.index}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{
                  duration: 1.2,
                  ease: easing,
                  delay: 0.1 + i * 0.08,
                }}
                className="group grid grid-cols-12 gap-4 py-6 md:py-7 transition-colors duration-700 hover:bg-surface/50 px-2 md:px-4 -mx-2 md:-mx-4"
              >
                <span className="col-span-2 md:col-span-1 serif italic text-accent/70 text-lg md:text-xl font-light">
                  {f.index}
                </span>
                <span className="col-span-10 md:col-span-6 serif text-text text-lg md:text-2xl font-light tracking-tight transition-colors group-hover:text-accent">
                  {f.name}
                </span>
                <span className="col-span-7 md:col-span-3 text-text/65 text-xs md:text-sm font-light tracking-wide self-center">
                  {f.city}
                </span>
                <span className="col-span-5 md:col-span-2 text-accent/75 text-xs md:text-sm font-light tracking-editorial self-center text-right">
                  {f.year}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Masters worked with */}
        <div className="mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.4, ease: easing }}
            className="flex items-baseline justify-between mb-10 md:mb-12 border-b border-line/60 pb-5"
          >
            <p className="text-[11px] uppercase tracking-whisper text-accent/80">
              Birlikte Çalışılan Dünya Devleri
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line/60 border border-line/60">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 1.4, ease: easing }}
              className="bg-background p-8 md:p-12"
            >
              <p className="text-[10px] uppercase tracking-whisper text-accent/80 mb-5">
                Tango Efsaneleri
              </p>
              <ul className="space-y-3">
                {tangoMasters.map((m) => (
                  <li
                    key={m}
                    className="serif italic text-text/85 text-base md:text-lg font-light leading-snug"
                  >
                    {m}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 1.4, ease: easing, delay: 0.15 }}
              className="bg-background p-8 md:p-12"
            >
              <p className="text-[10px] uppercase tracking-whisper text-accent/80 mb-5">
                Latin Ustaları
              </p>
              <ul className="space-y-3">
                {latinMasters.map((m) => (
                  <li
                    key={m}
                    className="serif italic text-text/85 text-base md:text-lg font-light leading-snug"
                  >
                    {m}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Featured Stages */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.4, ease: easing }}
            className="flex items-baseline justify-between mb-10 md:mb-12 border-b border-line/60 pb-5"
          >
            <p className="text-[11px] uppercase tracking-whisper text-accent/80">
              Öne Çıkan Sahneler
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {stages.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{
                  duration: 1.2,
                  ease: easing,
                  delay: 0.1 + i * 0.07,
                }}
                className="group relative pl-6 border-l border-line/80 hover:border-accent/60 transition-colors duration-700"
              >
                <p className="serif text-text text-xl md:text-2xl font-light tracking-tight transition-colors group-hover:text-accent">
                  {s.name}
                </p>
                <p className="mt-2 text-text/60 text-sm font-light tracking-wide">
                  {s.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
