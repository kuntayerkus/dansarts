"use client";

import { motion } from "framer-motion";

const easing = [0.16, 1, 0.3, 1] as const;

interface Benefit {
  index: string;
  title: string;
  copy: string;
}

const benefits: Benefit[] = [
  {
    index: "01",
    title: "Premium Klientel",
    copy: "30–55 yaş, yüksek gelir, deneyim odaklı bir kitleyi mekanınıza taşırız. F&B harcamaları ortalama gece kullanıcısının üzerindedir.",
  },
  {
    index: "02",
    title: "Düşük Sezon Canlandırma",
    copy: "Salı–Çarşamba akşamları gibi düşük yoğunluklu zaman dilimlerini canlandırır, doluluğunuzu ve ortalama gece cirosunu artırırız.",
  },
  {
    index: "03",
    title: "Sinematik İçerik",
    copy: "Her etkinlik kendi prodüksiyon ekibimizce çekilir. Mekanınız Reels, aftermovie ve carousel içeriklerinde featured yer alır — telif sizde.",
  },
  {
    index: "04",
    title: "Marka Yükseltme",
    copy: "TDSF tescilli bir ustanın imzasını taşıyan etkinlik mekanınızın kültürel pozisyonunu güçlendirir. Doğal bir sosyal kanıt katmanı.",
  },
  {
    index: "05",
    title: "Çapraz Pazarlama",
    copy: "Etkinlik markamızın Instagram, mailing listesi ve davet ağı üzerinden duyurulur. Tüm kurumsal görsellerde co-brand yer alır.",
  },
];

interface Model {
  rom: string;
  name: string;
  italic: string;
  frame: string;
  fit: string;
}

const models: Model[] = [
  {
    rom: "I.",
    name: "F&B",
    italic: "Taahhüdü",
    frame: "Mekan ücretsiz tahsis edilir; etkinlik konukları belirli bir minimum F&B harcaması taahhüt eder.",
    fit: "Lobi barlar · Butik şarap evleri",
  },
  {
    rom: "II.",
    name: "Gelir",
    italic: "Paylaşımı",
    frame: "Etkinlik bilet/üyelik geliri ile F&B geliri belirlenmiş bir oranda paylaşılır. Karşılıklı verim odaklı.",
    fit: "Roof-top sahneler · Butik mekanlar",
  },
  {
    rom: "III.",
    name: "Yıllık",
    italic: "Sponsorluk",
    frame: "Mekan, yıllık etkinlik takvimimizin partneri olarak konumlanır. Sabit ücret + içerik paketi.",
    fit: "Lüks oteller · Premium markalar",
  },
];

/**
 * Partnership — "Partnership Models"
 * Venue partnership thesis: 5 benefits + 3 commercial frameworks.
 */
export default function Partnership() {
  return (
    <section
      id="partnerlik"
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
            Bölüm 07 · Partnership &amp; Venue Program
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
            Mekanınıza
            <br />
            yeni bir <em className="not-italic gold-shimmer animate-shimmer">prestij</em>
            <br />
            tabakası.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 0.85, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.5, ease: easing, delay: 0.3 }}
            className="col-span-12 md:col-span-5 md:pt-8 max-w-md text-text/75 text-sm md:text-base font-light leading-[1.85]"
          >
            Bir Dans Arts etkinliğine ev sahipliği yapmak yalnızca bir alan
            tahsisi değildir; mekanınız için ölçülebilir bir{" "}
            <span className="text-accent/90">marka</span>,{" "}
            <span className="text-accent/90">gelir</span> ve{" "}
            <span className="text-accent/90">içerik</span> yatırımıdır.
          </motion.p>
        </div>

        {/* Benefits — staircase row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ duration: 1.4, ease: easing }}
          className="flex items-baseline justify-between mb-10 md:mb-12 border-b border-line/60 pb-5"
        >
          <p className="text-[11px] uppercase tracking-whisper text-accent/80">
            Mekanınızın Kazanımları
          </p>
          <p className="hidden md:block text-[10px] uppercase tracking-whisper text-text/40">
            05 Madde
          </p>
        </motion.div>

        <ul className="grid grid-cols-1 md:grid-cols-5 gap-px bg-line/60 border border-line/60 mb-24 md:mb-32">
          {benefits.map((b, i) => (
            <motion.li
              key={b.index}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{
                duration: 1.2,
                ease: easing,
                delay: 0.08 + i * 0.08,
              }}
              className="group relative bg-background p-7 md:p-8 transition-colors duration-700 hover:bg-surface"
            >
              <span className="serif text-accent/80 text-3xl md:text-4xl font-light leading-none">
                {b.index}
              </span>
              <p className="mt-6 text-[11px] uppercase tracking-whisper text-text">
                {b.title}
              </p>
              <div className="gold-rule h-px w-10 mt-4 origin-left transition-transform duration-700 group-hover:scale-x-150" />
              <p className="mt-5 text-text/65 text-sm font-light leading-[1.8]">
                {b.copy}
              </p>
            </motion.li>
          ))}
        </ul>

        {/* Models — three commercial frameworks */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.4, ease: easing }}
          className="flex items-baseline justify-between mb-10 md:mb-12 border-b border-line/60 pb-5"
        >
          <p className="text-[11px] uppercase tracking-whisper text-accent/80">
            Önerdiğimiz Ortaklık Çerçeveleri
          </p>
          <p className="hidden md:block text-[10px] uppercase tracking-whisper text-text/40">
            Üç Model
          </p>
        </motion.div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-px bg-line/60 border border-line/60">
          {models.map((m, i) => (
            <motion.li
              key={m.rom}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{
                duration: 1.3,
                ease: easing,
                delay: 0.12 + i * 0.1,
              }}
              className="group relative bg-background p-8 md:p-12 transition-colors duration-700 hover:bg-surface"
            >
              <span className="serif italic text-accent/70 text-2xl font-light tracking-editorial">
                Model {m.rom}
              </span>

              <h3 className="mt-8 serif font-light leading-[0.95] text-text text-[36px] md:text-[52px] tracking-tight">
                <span className="block">{m.name}</span>
                <span className="block italic text-accent/90 mt-1">
                  {m.italic}
                </span>
              </h3>

              <div className="gold-rule h-px w-16 mt-8 origin-left transition-transform duration-1000 group-hover:scale-x-150" />

              <p className="mt-7 text-text/70 text-sm md:text-base font-light leading-[1.85]">
                {m.frame}
              </p>

              <div className="mt-8 pt-6 border-t border-line/60">
                <p className="text-[10px] uppercase tracking-whisper text-accent/70 mb-2">
                  En Uygun
                </p>
                <p className="text-text/85 text-sm font-light tracking-wide">
                  {m.fit}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.5, ease: easing, delay: 0.3 }}
          className="mt-20 md:mt-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-12 border border-accent/30 px-8 md:px-12 py-10 md:py-12"
        >
          <div>
            <p className="text-[10px] uppercase tracking-whisper text-accent/80 mb-4">
              Mekanınız için bir Dans Arts gecesi
            </p>
            <p className="serif text-text text-2xl md:text-3xl font-light leading-snug max-w-2xl">
              Brief'inizi paylaşın; mekan profili ve hedef kitlenize göre özel
              bir model birlikte tasarlayalım.
            </p>
          </div>
          <a
            href="#basvuru"
            className="group inline-flex items-center gap-4 border border-accent/50 px-8 py-4 text-[11px] uppercase tracking-whisper text-accent transition-colors duration-700 hover:bg-accent hover:text-background whitespace-nowrap"
          >
            <span>Brief Gönder</span>
            <span
              aria-hidden="true"
              className="block h-px w-8 bg-accent/60 transition-all duration-700 group-hover:w-12 group-hover:bg-background"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
