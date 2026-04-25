"use client";

import { motion } from "framer-motion";

const easing = [0.16, 1, 0.3, 1] as const;

/**
 * Pioneer — "The Pioneer"
 * Editorial, asymmetric portrait of Reyhan Şafak.
 * No canvas; just typography and slow fades.
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
          {/* Left: large typographic name + biography */}
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

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.4, ease: easing, delay: 0.4 }}
              className="gold-rule h-px w-32 md:w-48 mt-10 md:mt-14 origin-left"
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 0.85, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.5, ease: easing, delay: 0.5 }}
              className="dropcap mt-10 md:mt-14 max-w-xl text-text/80 text-base md:text-lg font-light leading-[1.85]"
            >
              İzmir merkezli bir öncü; Latin danslarının zarafetini sahnede
              yeniden yorumlayan bir imza. Yarışma pistlerinden uluslararası
              workshop salonlarına uzanan yolculuğunda, her hareketi titiz bir
              estetik anlayışıyla biçimlendirir. Reyhan Şafak için dans, bir
              gösteriden çok bir duruş — sahnenin önünde geçirilmiş yılların
              sessiz bir ifadesi.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 0.7, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.5, ease: easing, delay: 0.7 }}
              className="mt-8 max-w-xl text-text/70 text-base md:text-lg font-light leading-[1.85]"
            >
              Dans Arts, onun vizyonu etrafında şekillenen bir atölye:
              davete açık, ölçülü, prestijli. Sıradan bir kurs değil — bir
              yaşam tarzının zarif bir uzantısı.
            </motion.p>
          </div>

          {/* Right: vertical letterpress + portrait placeholder */}
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
                  15+
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-whisper text-text/60">
                  Sahne Yılı
                </p>
              </div>
              <div>
                <p className="serif text-accent text-3xl md:text-4xl font-light">
                  04
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-whisper text-text/60">
                  Latin Stili
                </p>
              </div>
              <div>
                <p className="serif text-accent text-3xl md:text-4xl font-light">
                  ∞
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-whisper text-text/60">
                  Detay
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
