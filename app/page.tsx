import Hero from "@/components/Hero";
import Atmosphere from "@/components/Atmosphere";

/**
 * DANS ARTS — Home
 *
 * Bölümler aşamalı olarak inşa edilecek:
 *   01. Hero        — girl sequence (canvas scrub)  ✦ inşa edildi
 *   02. Atmosphere  — shoe sequence (canvas scrub)  ✦ inşa edildi
 *   03. The Pioneer — Reyhan Şafak portresi          → sıradaki sprint
 *   04. Boutique    — Eğitim listelemesi             → sıradaki sprint
 *   05. Application — Lead form                       → sıradaki sprint
 */
export default function HomePage() {
  return (
    <main className="relative">
      <Hero />
      <Atmosphere />

      {/* Geçiş köprüsü — bir sonraki bölüm için zarif bir nefes */}
      <section className="relative bg-background py-32 md:py-48">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <span className="text-[10px] uppercase tracking-whisper text-accent/70">
            Devam Edecek
          </span>
          <p className="mt-8 serif text-text/80 text-2xl md:text-4xl font-light leading-snug">
            Bir öncünün hikayesi, bir kadronun zarafeti<br />
            ve davete açık bir deneyim — yakında.
          </p>
          <div className="gold-rule h-px w-24 mx-auto mt-12" />
        </div>
      </section>
    </main>
  );
}
