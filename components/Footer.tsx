import { Instagram, Mail } from "lucide-react";

const team = [
  { name: "Reyhan Şafak", role: "Kurucu & Baş Eğitmen" },
  { name: "Uğur Şafak", role: "Sahne Partneri" },
  { name: "Kuntay", role: "Dijital & İçerik" },
  { name: "Seçkin", role: "Post-Prod & Ses Tasarımı" },
  { name: "Deniz", role: "Operasyon Asistanı" },
];

const navLinks = [
  { href: "#oncu", label: "Öncü" },
  { href: "#vizyon", label: "Uluslararası Vizyon" },
  { href: "#sahne", label: "Sahne · Repertuvar" },
  { href: "#deneyim", label: "Boutique Experiences" },
  { href: "#partnerlik", label: "Partnerlik" },
  { href: "#basvuru", label: "Başvuru" },
];

export default function Footer() {
  return (
    <footer className="relative bg-background border-t border-line/60">
      <div className="mx-auto max-w-7xl px-6 md:px-12 py-20 md:py-24">
        {/* Closing manifesto line */}
        <div className="mb-16 md:mb-24 max-w-3xl">
          <p className="text-[10px] uppercase tracking-whisper text-accent/70 mb-5">
            Kapanış
          </p>
          <p className="serif italic font-light text-text/85 text-2xl md:text-4xl leading-snug tracking-tight">
            “Stüdyomuz yok. Sahnemiz var.
            <br />
            Ve adı <span className="not-italic gold-shimmer animate-shimmer">İzmir.</span>”
          </p>
        </div>

        <div className="gold-rule h-px w-24 mb-12 md:mb-16" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-10 items-start">
          {/* Brand */}
          <div className="md:col-span-4">
            <p className="serif text-accent text-2xl tracking-editorial">
              DANS&nbsp;ARTS
            </p>
            <p className="mt-3 text-[10px] uppercase tracking-whisper text-text/55">
              İzmir · 1995'ten Bu Yana
            </p>
            <p className="mt-6 text-text/70 text-sm font-light leading-[1.85] max-w-sm">
              Türkiye Dans Sporları Federasyonu tescilli bir ustanın imzasıyla,
              İzmir'in seçkin sahnelerinde butik dans deneyimi.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <a
                href="https://instagram.com/dansartsreyhan"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-whisper text-text/70 hover:text-accent transition-colors"
              >
                <Instagram
                  size={14}
                  strokeWidth={1.25}
                  className="transition-colors group-hover:text-accent"
                />
                <span>@dansartsreyhan</span>
              </a>
              <a
                href="mailto:dansartsreyhan@gmail.com"
                className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-whisper text-text/70 hover:text-accent transition-colors"
              >
                <Mail
                  size={14}
                  strokeWidth={1.25}
                  className="transition-colors group-hover:text-accent"
                />
                <span>dansartsreyhan@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <p className="text-[10px] uppercase tracking-whisper text-accent/70 mb-5">
              Bölümler
            </p>
            <ul className="flex flex-col gap-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-text/70 text-sm font-light tracking-wide hover:text-accent transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Team */}
          <div className="md:col-span-5">
            <p className="text-[10px] uppercase tracking-whisper text-accent/70 mb-5">
              Ekip
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {team.map((m) => (
                <li
                  key={m.name}
                  className="flex flex-col gap-0.5 border-l border-line/80 pl-4 hover:border-accent/60 transition-colors duration-700"
                >
                  <span className="serif text-text text-base font-light tracking-tight">
                    {m.name}
                  </span>
                  <span className="text-[10px] uppercase tracking-whisper text-text/50">
                    {m.role}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="gold-rule h-px w-full mt-16 md:mt-20 opacity-40" />

        <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-[10px] uppercase tracking-whisper text-text/40">
            © 2026 Dans Arts · İzmir · Tüm hakları saklıdır
          </p>
          <p className="text-[10px] uppercase tracking-whisper text-text/40">
            TDSF 2. Kademe Antrenör · Reyhan Şafak
          </p>
        </div>
      </div>
    </footer>
  );
}
