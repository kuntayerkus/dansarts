import { Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-background border-t border-line/60">
      <div className="mx-auto max-w-7xl px-6 md:px-12 py-16 md:py-20">
        <div className="gold-rule h-px w-24 mb-12 md:mb-16" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start">
          <div>
            <p className="serif text-accent text-2xl tracking-editorial">
              DANS&nbsp;ARTS
            </p>
            <p className="mt-4 text-[10px] uppercase tracking-whisper text-text/50">
              Reyhan Şafak · İzmir
            </p>
          </div>

          <nav className="flex flex-col gap-4 md:items-center">
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
          </nav>

          <div className="md:text-right">
            <p className="text-[10px] uppercase tracking-whisper text-text/40">
              © 2026 Dans Arts
            </p>
            <p className="mt-2 text-[10px] uppercase tracking-whisper text-text/30">
              Tüm hakları saklıdır
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
