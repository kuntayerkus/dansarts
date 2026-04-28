"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const easing = [0.16, 1, 0.3, 1] as const;

const youtubeSearch = (query: string) =>
  `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;

interface Festival {
  index: string;
  name: string;
  city: string;
  year: string;
  href: string;
}

const festivals: Festival[] = [
  {
    index: "I.",
    name: "II. World Tango Festivali",
    city: "Buenos Aires · Arjantin",
    year: "2003",
    href: youtubeSearch("World Tango Festival Buenos Aires 2003"),
  },
  {
    index: "II.",
    name: "Bulgaristan Salsa Kongresi",
    city: "Sofya · Bulgaristan",
    year: "2006",
    href: youtubeSearch("Bulgaria Salsa Congress Sofia"),
  },
  {
    index: "III.",
    name: "Yunta Brava Tango Festivalleri",
    city: "Bodrum · Çeşme",
    year: "2007–2008",
    href: youtubeSearch("Yunta Brava Tango Festival"),
  },
  {
    index: "IV.",
    name: "I. Uluslararası Ankara Tango Festivali",
    city: "Ankara",
    year: "2009",
    href: youtubeSearch("Uluslararası Ankara Tango Festivali"),
  },
];

interface Stage {
  name: string;
  detail: string;
  href: string;
}

const stages: Stage[] = [
  {
    name: "Hilton Viyana Balosu",
    detail: "Avusturya · Uluslararası gala gösterisi",
    href: youtubeSearch("Hilton Vienna Ball gala dance"),
  },
  {
    name: "Atatürk Kültür Merkezi",
    detail: "İzmir · Özel Dans Arts gösterisi",
    href: youtubeSearch("Atatürk Kültür Merkezi İzmir dans gösterisi"),
  },
  {
    name: "İzmir Fuarı",
    detail: "Dünya Mutfakları Gösterisi",
    href: youtubeSearch("İzmir Enternasyonal Fuarı dünya mutfakları gösterisi"),
  },
  {
    name: "TDSF Kulüpler Arası Yarışması",
    detail: "Türkiye 1.liği · 2008",
    href: youtubeSearch("TDSF kulüpler arası dans yarışması"),
  },
];

interface Master {
  name: string;
  href: string;
}

const tangoMasters: Master[] = [
  { name: "Juan Carlos Copes & Johana Copes", href: youtubeSearch("Juan Carlos Copes tango") },
  { name: "Sebastian Arce & Mariana Montes", href: youtubeSearch("Sebastian Arce Mariana Montes tango") },
  { name: "Julio Balmaceda & Corina Delarosa", href: youtubeSearch("Julio Balmaceda Corina de la Rosa tango") },
  { name: "Aurora Lubiz & Jorge Firpo", href: youtubeSearch("Aurora Lubiz Jorge Firpo tango") },
  { name: "Claudia Codega & Estaban Moreno", href: youtubeSearch("Claudia Codega Esteban Moreno tango") },
  { name: "Geraldine Rojas & Javier Rodriguez", href: youtubeSearch("Geraldine Rojas Javier Rodriguez tango") },
];

const latinMasters: Master[] = [
  { name: "Luis Vazques & Melissa Fernandes", href: youtubeSearch("Luis Vazquez Melissa Fernandez salsa") },
  { name: "Super Mario", href: youtubeSearch("Super Mario salsa dancer") },
  { name: "Tropical Gem", href: youtubeSearch("Tropical Gem salsa team") },
  { name: "Susana Montero", href: youtubeSearch("Susana Montero salsa cubana") },
  { name: "Raymond Brown", href: youtubeSearch("Raymond Brown ballroom dancer") },
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
              >
                <a
                  href={f.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${f.name} — YouTube'da izle`}
                  className="group grid grid-cols-12 gap-4 py-6 md:py-7 transition-colors duration-700 hover:bg-surface/50 px-2 md:px-4 -mx-2 md:-mx-4"
                >
                  <span className="col-span-2 md:col-span-1 serif italic text-accent/70 text-lg md:text-xl font-light">
                    {f.index}
                  </span>
                  <span className="col-span-10 md:col-span-6 serif text-text text-lg md:text-2xl font-light tracking-tight transition-colors group-hover:text-accent flex items-center gap-2">
                    <span>{f.name}</span>
                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.25}
                      className="text-accent/0 transition-all duration-700 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="col-span-7 md:col-span-3 text-text/65 text-xs md:text-sm font-light tracking-wide self-center">
                    {f.city}
                  </span>
                  <span className="col-span-5 md:col-span-2 text-accent/75 text-xs md:text-sm font-light tracking-editorial self-center text-right">
                    {f.year}
                  </span>
                </a>
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
                  <MasterLink key={m.name} master={m} />
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
                  <MasterLink key={m.name} master={m} />
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
              >
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.name} — YouTube'da izle`}
                  className="group relative block pl-6 border-l border-line/80 hover:border-accent/60 transition-colors duration-700"
                >
                  <p className="serif text-text text-xl md:text-2xl font-light tracking-tight transition-colors group-hover:text-accent flex items-center gap-2">
                    <span>{s.name}</span>
                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.25}
                      className="text-accent/0 transition-all duration-700 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </p>
                  <p className="mt-2 text-text/60 text-sm font-light tracking-wide">
                    {s.detail}
                  </p>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MasterLink({ master }: { master: Master }) {
  return (
    <li>
      <a
        href={master.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${master.name} — YouTube'da izle`}
        className="group inline-flex items-center gap-2 serif italic text-text/85 text-base md:text-lg font-light leading-snug transition-colors duration-700 hover:text-accent"
      >
        <span className="border-b border-transparent group-hover:border-accent/60 transition-colors duration-700">
          {master.name}
        </span>
        <ArrowUpRight
          size={13}
          strokeWidth={1.25}
          className="text-accent/0 transition-all duration-700 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </a>
    </li>
  );
}
