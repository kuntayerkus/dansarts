"use client";

import { motion } from "framer-motion";
import WordReveal from "./WordReveal";

const easing = [0.16, 1, 0.3, 1] as const;

interface TimelineEntry {
  year: string;
  title: string;
  copy: string;
}

const timeline: TimelineEntry[] = [
  {
    year: "1994",
    title: "Crawley · İngiltere",
    copy: "Avalon School ve The English Academy. Brian & Sylvia Wood, Crise & Raymond Brown gözetiminde iki buçuk yıllık yoğun teknik eğitim.",
  },
  {
    year: "1999",
    title: "İzmir · Dönüş",
    copy: "Hakan ve İdil Üste çiftiyle Arjantin Tango çalışmaları. Türkiye'nin sosyal dans sahnesine adım.",
  },
  {
    year: "2001",
    title: "Ege Konservatuarı",
    copy: "Doç. Dr. Gürbüz Aktaş & Nancy Rose Aktaş gözetiminde dört yıllık ileri seviye Latin eğitimi.",
  },
  {
    year: "2005",
    title: "Dans Arts · Ortaklık",
    copy: "Dans Arts Dans ve Spor Kulübü'ne ortak ve eğitmen olarak geçiş — profesyonel misyonun başlangıcı.",
  },
  {
    year: "2008",
    title: "Türkiye 1.liği",
    copy: "TDSF Kulüpler Arası Yarışması'nda Türkiye birinciliği · Aynı yıl 1. Kademe Antrenörlük belgesi.",
  },
  {
    year: "2012",
    title: "TDSF 2. Kademe",
    copy: "Türkiye Dans Sporları Federasyonu 2. Kademe Antrenörlük belgesi — yetkinliğin resmî tescili.",
  },
];

/**
 * Pioneer — "Öncü"
 * Editorial portrait of Reyhan Şafak with full heritage timeline.
 * Pulled from the 2026 brand strategy document.
 */
export default function Pioneer() {
  return (
    <section
      id="oncu"
      className="relative bg-background py-32 md:py-48 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.2, ease: easing }}
          className="flex items-center gap-3 mb-16 md:mb-24"
        >
          <span className="block h-px w-8 bg-accent/60" />
          <span className="text-[10px] uppercase tracking-whisper text-accent/70">
            Bölüm 03 · Öncü
          </span>
        </motion.div>

        <div className="grid grid-cols-12 gap-y-16 md:gap-y-0 md:gap-x-12">
          {/* Left: name + biography */}
          <div className="col-span-12 md:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.6, ease: easing }}
              className="serif font-light leading-[0.95] text-text tracking-tight text-[44px] md:text-[88px] lg:text-[112px]"
            >
              <span className="block">Reyhan</span>
              <span className="block italic text-accent">Şafak</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.4, ease: easing, delay: 0.3 }}
              className="mt-8 text-[10px] uppercase tracking-whisper text-accent/75"
            >
              Kurucu &amp; Baş Eğitmen · TDSF 2. Kademe Antrenör
            </motion.p>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.4, ease: easing, delay: 0.4 }}
              className="gold-rule h-px w-32 md:w-48 mt-8 md:mt-10 origin-left"
            />

            <WordReveal
              as="p"
              text="İzmir'in köklü dans kültürünün yapı taşlarından biri. 1994'ten bu yana 32 yılı aşan tecrübesi ve uluslararası vizyonuyla, Türkiye Dans Sporları Federasyonu 2. Kademe Antrenör unvanını taşıyan sayılı dans ustalarından. Kariyeri boyunca on binden fazla öğrenciye dans eğitimi verdi; Ballroom, Sportif Latin, Sosyal Latin ve Arjantin Tango branşlarında derin bir uzmanlık geliştirdi."
              stagger={0.022}
              delay={0.4}
              className="dropcap mt-10 md:mt-14 max-w-xl text-text/85 text-base md:text-lg font-light leading-[1.85]"
            />

            <WordReveal
              as="p"
              text="2008'de TDSF Kulüpler Arası Yarışması'nda Türkiye 1.liği ile şampiyonluk gururunu yaşadı. Bugün Dans Arts'ın Baş Eğitmeni olarak çeyrek asrı aşan tecrübesini yeni nesle aktarmaya devam ediyor."
              stagger={0.028}
              delay={0.2}
              className="mt-8 max-w-xl text-text/70 text-base md:text-lg font-light leading-[1.85]"
            />

            <motion.figure
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.4, ease: easing, delay: 0.5 }}
              className="mt-12 md:mt-16 max-w-xl border-l border-accent/40 pl-6 md:pl-8"
            >
              <blockquote className="serif italic text-text/85 text-lg md:text-xl font-light leading-relaxed">
                “Dans, atılan adımların değil; hissedilen ritmin dışa
                vurumudur.”
              </blockquote>
              <figcaption className="mt-4 text-[10px] uppercase tracking-whisper text-accent/70">
                Reyhan Şafak
              </figcaption>
            </motion.figure>
          </div>

          {/* Right: portrait placeholder + stat trio */}
          <div className="col-span-12 md:col-span-5 md:pt-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.8, ease: easing, delay: 0.3 }}
              className="relative aspect-[3/4] w-full max-w-md mx-auto md:ml-auto md:mr-0 bg-surface border border-line/60"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="serif text-accent/40 text-[clamp(72px,14vw,160px)] tracking-editorial select-none">
                  R · Ş
                </span>
              </div>

              <div className="absolute inset-x-0 top-0 p-6 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-whisper text-accent/70">
                  Sahne 01
                </span>
                <span className="text-[10px] uppercase tracking-whisper text-text/40">
                  İzmir 2026
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-whisper text-text/50">
                  Portre
                </span>
                <span className="text-[10px] uppercase tracking-whisper text-accent/70">
                  Yakında
                </span>
              </div>

              <div className="pointer-events-none absolute inset-0 ring-1 ring-accent/10" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.5, ease: easing, delay: 0.6 }}
              className="mt-8 md:mt-10 grid grid-cols-3 gap-6 max-w-md mx-auto md:ml-auto md:mr-0"
            >
              <div>
                <p className="serif text-accent text-3xl md:text-4xl font-light">
                  32
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-whisper text-text/60">
                  Yıllık Tecrübe
                </p>
              </div>
              <div>
                <p className="serif text-accent text-3xl md:text-4xl font-light">
                  10K+
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-whisper text-text/60">
                  Öğrenci
                </p>
              </div>
              <div>
                <p className="serif text-accent text-3xl md:text-4xl font-light">
                  TDSF
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-whisper text-text/60">
                  2. Kademe
                </p>
              </div>
            </motion.div>

            {/* Akademik altyapı */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.5, ease: easing, delay: 0.7 }}
              className="mt-10 md:mt-12 max-w-md mx-auto md:ml-auto md:mr-0"
            >
              <p className="text-[10px] uppercase tracking-whisper text-accent/70 mb-3">
                Akademik Altyapı
              </p>
              <p className="text-text/70 text-sm font-light leading-[1.85]">
                Anadolu Üniversitesi İşletme Fakültesi · 19 Mayıs Üniversitesi
                Turizm ve Otelcilik. Pratik yön kadar yönetimsel ve pedagojik
                boyut da hâkimiyet altında.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.6, ease: easing }}
          className="mt-32 md:mt-44"
        >
          <div className="flex items-center gap-3 mb-12 md:mb-16">
            <span className="block h-px w-8 bg-accent/60" />
            <span className="text-[10px] uppercase tracking-whisper text-accent/70">
              Yolculuk · 1994 → Bugün
            </span>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-3 gap-px bg-line/60 border border-line/60">
            {timeline.map((entry, i) => (
              <motion.li
                key={entry.year}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{
                  duration: 1.2,
                  ease: easing,
                  delay: 0.1 + i * 0.08,
                }}
                className="group relative bg-background p-8 md:p-10 transition-colors duration-700 hover:bg-surface"
              >
                <p className="serif text-accent text-3xl md:text-4xl font-light leading-none">
                  {entry.year}
                </p>
                <p className="mt-5 text-[11px] uppercase tracking-whisper text-text/85">
                  {entry.title}
                </p>
                <div className="gold-rule h-px w-12 mt-5 origin-left transform-gpu transition-transform duration-1000 group-hover:scale-x-150" />
                <p className="mt-5 text-text/65 text-sm font-light leading-[1.85]">
                  {entry.copy}
                </p>
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  );
}
