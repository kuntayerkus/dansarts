"use client";

import { motion } from "framer-motion";

const easing = [0.16, 1, 0.3, 1] as const;

interface Experience {
  index: string;
  name: string;
  italic?: string;
  duration: string;
  audience: string;
  copy: string;
  feature?: boolean;
}

const experiences: Experience[] = [
  {
    index: "01",
    name: "VIP Düğün Dansı",
    italic: "Programı",
    duration: "8–12 hafta",
    audience: "Üst segment çiftler",
    copy: "Çiftin hikayesine, müziğine ve gelinlik–damatlık yapısına özel tasarlanan koreografi. Prova çekimi ve düğün günü destek dahil.",
    feature: true,
  },
  {
    index: "02",
    name: "Exclusive Latin",
    italic: "& Wine Night",
    duration: "3 saat / etkinlik",
    audience: "40–60 davetli",
    copy: "Davetli bazlı premium etkinlik. Sahne gösterisi, katılımcı dans deneyimi ve kuratörlü şarap akışı bir arada.",
    feature: true,
  },
  {
    index: "03",
    name: "Özel Ders",
    duration: "60 dk / ders",
    audience: "Bireyler · Çiftler",
    copy: "Birebir veya çift olarak yapılandırılan, kişiye özel hedef ve tempoda ilerleyen program.",
  },
  {
    index: "04",
    name: "Butik Grup",
    italic: "Sınıfı",
    duration: "90 dk / sınıf",
    audience: "6–8 kişi",
    copy: "Salsa, Bachata veya Arjantin Tango. Premium bir mekanda, sınırlı kontenjanla, davete açık küçük grup.",
  },
  {
    index: "05",
    name: "Masterclass",
    italic: "Sportif & Ballroom",
    duration: "120 dk / oturum",
    audience: "İleri öğrenciler · Yarışmacılar",
    copy: "TDSF antrenörü gözetiminde ileri seviye teknik ve yarışma hazırlığı.",
  },
];

/**
 * BoutiqueExperiences — "Boutique Experiences"
 * Premium service portfolio per the 2026 brand strategy doc.
 */
export default function BoutiqueExperiences() {
  return (
    <section
      id="deneyim"
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
            Bölüm 06 · Boutique Experiences
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
            Davete açık,
            <br />
            <em className="not-italic gold-shimmer animate-shimmer">ölçülü, prestijli.</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 0.85, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.5, ease: easing, delay: 0.3 }}
            className="col-span-12 md:col-span-5 md:pt-8 max-w-md text-text/75 text-sm md:text-base font-light leading-[1.85]"
          >
            Düğün dansından roof-top wine night'a, özel dersten masterclass'a —
            her hat, kişisel hedeflerinize ve etkinlik formatınıza özel olarak
            yapılandırılır.
          </motion.p>
        </div>

        {/* Featured experiences (2 columns) */}
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line/60 border border-line/60 mb-px">
          {experiences
            .filter((e) => e.feature)
            .map((exp, i) => (
              <ExperienceCard key={exp.index} exp={exp} delay={0.15 + i * 0.12} large />
            ))}
        </ul>

        {/* Standard experiences (3 columns) */}
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-px bg-line/60 border-x border-b border-line/60">
          {experiences
            .filter((e) => !e.feature)
            .map((exp, i) => (
              <ExperienceCard key={exp.index} exp={exp} delay={0.1 + i * 0.1} />
            ))}
        </ul>

        {/* Footnote: investment */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.4, ease: easing, delay: 0.3 }}
          className="mt-10 md:mt-14 text-center text-[10px] uppercase tracking-whisper text-text/45"
        >
          Yatırım kalemleri · Etkinlik kapsamına ve hedeflerinize göre özel olarak yapılandırılır.
        </motion.p>
      </div>
    </section>
  );
}

function ExperienceCard({
  exp,
  delay,
  large = false,
}: {
  exp: Experience;
  delay: number;
  large?: boolean;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 1.3, ease: easing, delay }}
      className="group relative bg-background p-8 md:p-12 transition-colors duration-700 hover:bg-surface"
    >
      <div className="flex items-start justify-between mb-10 md:mb-14">
        <span className="text-[10px] uppercase tracking-whisper text-accent/70">
          {exp.index}
        </span>
        <span className="text-[10px] uppercase tracking-whisper text-text/40">
          {exp.duration}
        </span>
      </div>

      <h3
        className={`serif font-light leading-[0.95] text-text tracking-tight ${
          large
            ? "text-[40px] md:text-[60px]"
            : "text-[32px] md:text-[44px]"
        }`}
      >
        <span className="block">{exp.name}</span>
        {exp.italic && (
          <span className="block italic text-accent/90 mt-1">
            {exp.italic}
          </span>
        )}
      </h3>

      <div className="gold-rule h-px w-16 mt-8 md:mt-10 origin-left transform-gpu transition-transform duration-1000 group-hover:scale-x-150" />

      <p
        className={`mt-6 md:mt-8 max-w-md text-text/70 font-light leading-[1.85] ${
          large ? "text-base md:text-lg" : "text-sm md:text-base"
        }`}
      >
        {exp.copy}
      </p>

      <p className="mt-8 text-[10px] uppercase tracking-whisper text-text/55">
        Hedef · <span className="text-text/75">{exp.audience}</span>
      </p>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/0 to-transparent transition-all duration-1000 group-hover:via-accent/60"
      />
    </motion.li>
  );
}
