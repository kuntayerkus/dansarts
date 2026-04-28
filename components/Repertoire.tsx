"use client";

import { motion } from "framer-motion";

const easing = [0.16, 1, 0.3, 1] as const;

interface Pillar {
  index: string;
  title: string;
  italic: string;
  copy: string;
  branches: string[];
}

const pillars: Pillar[] = [
  {
    index: "01",
    title: "Sportif",
    italic: "Latin",
    copy: "Ritmin ve enerjinin en üst seviyeye çıktığı; teknik disiplinin ön planda olduğu yarışma branşları.",
    branches: ["Cha Cha Cha", "Rumba", "Samba", "Jive", "Paso Doble"],
  },
  {
    index: "02",
    title: "Ballroom",
    italic: "Salon",
    copy: "Zarafetin ve asaletin pist üzerindeki karşılığı. İngiliz ekolüyle harmanlanmış profesyonel salon eğitimi.",
    branches: [
      "Slow Vals",
      "Viyana Valsi",
      "Foxtrot",
      "Quick Step",
      "International Tango",
    ],
  },
  {
    index: "03",
    title: "Sosyal",
    italic: "Danslar",
    copy: "Sosyal hayatın ritmik tarafı. Latin gecelerinin vazgeçilmezleri ve duyguların dansı Arjantin Tango.",
    branches: [
      "Salsa",
      "Bachata",
      "Merengue",
      "Arjantin Tango",
      "Swing & Rock'n'Roll",
    ],
  },
];

const supplementary = [
  "Club Cha Cha",
  "La Rueda",
  "Two Step",
  "Line Dance",
  "Oryantal Ritim",
  "Modern Dans Altyapısı",
];

/**
 * Repertoire — "Sahne"
 * Three-pillar branch repertoire from the 2026 brand strategy doc.
 */
export default function Repertoire() {
  return (
    <section
      id="sahne"
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
            Bölüm 05 · Sahne &amp; Repertuvar
          </span>
        </motion.div>

        <div className="grid grid-cols-12 gap-y-12 md:gap-y-0 md:gap-x-12 mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.6, ease: easing }}
            className="col-span-12 md:col-span-7 serif font-light leading-[1.0] text-text tracking-tight text-[40px] md:text-[64px] lg:text-[80px]"
          >
            Üç sütun,
            <br />
            <em className="not-italic gold-shimmer animate-shimmer">tek bir imza.</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 0.85, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.5, ease: easing, delay: 0.3 }}
            className="col-span-12 md:col-span-5 md:pt-8 max-w-md text-text/75 text-sm md:text-base font-light leading-[1.85]"
          >
            Sportif Latin, Ballroom ve Sosyal Danslar. Her sütun başlangıç,
            orta ve ileri seviye olmak üzere üç kademede yapılandırılır.
            Özel ihtiyaçlar için kişiye özel koreografi programı tasarlanır.
          </motion.p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-px bg-line/60 border border-line/60">
          {pillars.map((p, i) => (
            <motion.li
              key={p.index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 1.4,
                ease: easing,
                delay: 0.15 + i * 0.12,
              }}
              className="group relative bg-background p-8 md:p-12 transition-colors duration-700 hover:bg-surface"
            >
              <div className="flex items-start justify-between mb-10 md:mb-14">
                <span className="text-[10px] uppercase tracking-whisper text-accent/70">
                  Sütun {p.index}
                </span>
                <span className="text-[10px] uppercase tracking-whisper text-text/40">
                  Üç kademe
                </span>
              </div>

              <h3 className="serif font-light leading-[0.95] text-text text-[44px] md:text-[60px] tracking-tight">
                <span className="block">{p.title}</span>
                <span className="block italic text-accent/90 mt-1">
                  {p.italic}
                </span>
              </h3>

              <div className="gold-rule h-px w-16 mt-8 md:mt-10 origin-left transform-gpu transition-transform duration-1000 group-hover:scale-x-150" />

              <p className="mt-6 md:mt-8 max-w-sm text-text/70 text-sm md:text-base font-light leading-[1.85]">
                {p.copy}
              </p>

              <ul className="mt-8 md:mt-10 grid grid-cols-1 gap-2.5">
                {p.branches.map((b) => (
                  <li
                    key={b}
                    className="flex items-center gap-3 text-[13px] tracking-wide text-text/80 font-light"
                  >
                    <span
                      aria-hidden="true"
                      className="block h-px w-3 bg-accent/50 transition-all duration-700 group-hover:w-5 group-hover:bg-accent"
                    />
                    {b}
                  </li>
                ))}
              </ul>

              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/0 to-transparent transition-all duration-1000 group-hover:via-accent/60"
              />
            </motion.li>
          ))}
        </ul>

        {/* Supplementary repertoire */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 1.4, ease: easing }}
          className="mt-20 md:mt-28 grid grid-cols-12 gap-y-8 md:gap-y-0 md:gap-x-12 border-t border-line/60 pt-12 md:pt-16"
        >
          <div className="col-span-12 md:col-span-4">
            <p className="text-[10px] uppercase tracking-whisper text-accent/70 mb-3">
              Destekleyici Repertuvar
            </p>
            <h3 className="serif text-text text-2xl md:text-3xl font-light leading-snug tracking-tight">
              Ek branşlar &amp; <em className="italic text-accent">retro</em>.
            </h3>
          </div>

          <div className="col-span-12 md:col-span-8 md:pt-2">
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
              {supplementary.map((b) => (
                <li
                  key={b}
                  className="flex items-center gap-3 text-sm text-text/75 font-light"
                >
                  <span
                    aria-hidden="true"
                    className="block h-px w-3 bg-accent/40"
                  />
                  {b}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-text/55 text-xs font-light leading-relaxed max-w-2xl">
              Tüm branşlar başlangıç, orta ve ileri seviye olmak üzere üç
              kademede yapılandırılır. Özel ihtiyaçlar için kişiye özel
              koreografi programları tasarlanır.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
