"use client";

import { motion } from "framer-motion";

const easing = [0.16, 1, 0.3, 1] as const;

interface RepertoireCard {
  index: string;
  name: string;
  italic?: string;
  copy: string;
  videoSrc?: string;
}

const cards: RepertoireCard[] = [
  {
    index: "01",
    name: "Salsa",
    italic: "Cubana",
    copy: "Hızın değil, ölçünün dansı. Her dönüşte sahibinin imzasını taşıyan bir nabız.",
  },
  {
    index: "02",
    name: "Bachata",
    italic: "Sensual",
    copy: "Bir fısıltıdan fazlası: hareketin temasıyla yazılan, kelimesiz bir mektup.",
  },
  {
    index: "03",
    name: "Kizomba",
    copy: "Yavaşlığın asaleti. Müziğe değil, partnerin nefesine bağlı kalan bir geometri.",
  },
  {
    index: "04",
    name: "Latin",
    italic: "Show",
    copy: "Sahne için kurgulanmış, koreografisi titizlikle işlenmiş bir vitrin gösterisi.",
  },
];

/**
 * Repertoire — "The Stage"
 * Bölüm 04. Reyhan Şafak'ın repertuarı: Salsa, Bachata, Kizomba, Latin Show.
 * Asymmetric grid; video-ready card prop (`videoSrc`) reserved for future content.
 */
export default function Repertoire() {
  return (
    <section
      id="deneyim"
      className="relative bg-background py-32 md:py-48 overflow-hidden"
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
            Bölüm 04 · Sahne
          </span>
        </motion.div>

        <div className="grid grid-cols-12 gap-y-12 md:gap-y-0 md:gap-x-12 mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.6, ease: easing }}
            className="col-span-12 md:col-span-7 serif font-light leading-[1.05] text-text tracking-tight text-[40px] md:text-[64px] lg:text-[80px]"
          >
            Bir <em className="not-italic gold-shimmer animate-shimmer">repertuar</em>,
            <br />
            dört imza.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 0.8, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.5, ease: easing, delay: 0.3 }}
            className="col-span-12 md:col-span-5 md:pt-8 max-w-md text-text/75 text-sm md:text-base font-light leading-[1.85]"
          >
            Her stil, Reyhan Şafak'ın yıllar içinde damıttığı bir dilin
            farklı tonları. Aşağıdaki dört bölüm; bir gösteriden çok, bir
            tavrın özetidir.
          </motion.p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line/60">
          {cards.map((card, i) => (
            <motion.li
              key={card.index}
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
                  {card.index}
                </span>
                <span className="text-[10px] uppercase tracking-whisper text-text/40">
                  Sahneden bir an · Yakında
                </span>
              </div>

              <h3 className="serif font-light leading-none text-text text-[44px] md:text-[64px] tracking-tight">
                <span className="block">{card.name}</span>
                {card.italic && (
                  <span className="block italic text-accent/90 mt-1">
                    {card.italic}
                  </span>
                )}
              </h3>

              <div className="gold-rule h-px w-16 mt-8 md:mt-10 origin-left transform-gpu transition-transform duration-1000 group-hover:scale-x-150" />

              <p className="mt-6 md:mt-8 max-w-sm text-text/70 text-sm md:text-base font-light leading-[1.85]">
                {card.copy}
              </p>

              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/0 to-transparent transition-all duration-1000 group-hover:via-accent/60"
              />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
