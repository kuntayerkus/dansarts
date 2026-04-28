"use client";

import { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./MagneticButton";

const easing = [0.16, 1, 0.3, 1] as const;
const RECIPIENT = "dansartsreyhan@gmail.com";

type Mode = "lesson" | "event";

interface FieldDef {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "date" | "select" | "textarea";
  required?: boolean;
  fullWidth?: boolean;
  options?: string[];
}

const lessonFields: FieldDef[] = [
  { name: "name", label: "Ad Soyad", type: "text", required: true },
  { name: "email", label: "E-posta", type: "email", required: true },
  { name: "phone", label: "Telefon (opsiyonel)", type: "tel" },
  {
    name: "branch",
    label: "İlgilendiğiniz Branş",
    type: "select",
    options: [
      "Sportif Latin",
      "Ballroom (Salon)",
      "Salsa / Bachata",
      "Arjantin Tango",
      "Düğün Dansı",
      "Belirsiz",
    ],
  },
  {
    name: "level",
    label: "Deneyim Seviyesi",
    type: "select",
    options: ["Başlangıç", "Orta", "İleri", "Belirsiz"],
  },
  {
    name: "message",
    label: "Mesajınız",
    type: "textarea",
    required: true,
    fullWidth: true,
  },
];

const eventFields: FieldDef[] = [
  { name: "name", label: "Ad Soyad / Şirket", type: "text", required: true },
  { name: "email", label: "E-posta", type: "email", required: true },
  { name: "phone", label: "Telefon", type: "tel", required: true },
  {
    name: "eventType",
    label: "Etkinlik Türü",
    type: "select",
    options: [
      "Düğün / İlk Dans",
      "Wine Night / Gala",
      "Masterclass",
      "Lansman",
      "Festival",
      "Diğer",
    ],
    required: true,
  },
  { name: "eventDate", label: "Tarih (opsiyonel)", type: "date" },
  { name: "venue", label: "Mekan / Şehir", type: "text", required: true },
  {
    name: "audience",
    label: "Kitle Büyüklüğü",
    type: "select",
    options: ["50–", "50–150", "150–500", "500+"],
  },
  {
    name: "budget",
    label: "Bütçe Aralığı (opsiyonel)",
    type: "select",
    options: ["Belirtmek istemiyorum", "Düşük", "Orta", "Üst"],
  },
  {
    name: "message",
    label: "Brief / Mesaj",
    type: "textarea",
    required: true,
    fullWidth: true,
  },
];

const labelByName: Record<string, string> = {
  name: "Ad Soyad / Şirket",
  email: "E-posta",
  phone: "Telefon",
  branch: "Branş",
  level: "Deneyim Seviyesi",
  eventType: "Etkinlik Türü",
  eventDate: "Tarih",
  venue: "Mekan / Şehir",
  audience: "Kitle Büyüklüğü",
  budget: "Bütçe Aralığı",
  message: "Mesaj",
};

export default function Application() {
  const [mode, setMode] = useState<Mode>("lesson");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const fields = mode === "lesson" ? lessonFields : eventFields;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const lines: string[] = [];
    for (const f of fields) {
      const v = String(data.get(f.name) || "").trim();
      if (!v) continue;
      if (f.type === "textarea") {
        lines.push("", `${labelByName[f.name] || f.label}:`, v);
      } else {
        lines.push(`${labelByName[f.name] || f.label}: ${v}`);
      }
    }

    const who = String(data.get("name") || "").trim() || "İsimsiz";
    const subject =
      mode === "lesson"
        ? `Özel Ders Talebi — ${who}`
        : `Etkinlik Brief'i — ${who}`;
    const body = lines.join("\n");

    const href = `mailto:${RECIPIENT}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setSubmitting(true);
    window.location.href = href;
    window.setTimeout(() => {
      setSubmitting(false);
      setDone(true);
    }, 800);
  };

  const submitLabel =
    mode === "lesson" ? "Ders Talebi Gönder" : "Brief'i Gönder";

  const helperText =
    mode === "event"
      ? "Brief alındıktan sonra size dönüp portfolyo / referans dosyalarınızı e-posta ile rica edeceğiz."
      : `Başvurunuz ${RECIPIENT} adresine yönlendirilir.`;

  return (
    <section
      id="basvuru"
      className="relative bg-background py-32 md:py-48 overflow-hidden border-t border-line/40"
    >
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.2, ease: easing }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <span className="block h-px w-8 bg-accent/60" />
          <span className="text-[10px] uppercase tracking-whisper text-accent/70">
            Bölüm 08 · Başvuru
          </span>
          <span className="block h-px w-8 bg-accent/60" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.6, ease: easing }}
          className="serif font-light leading-[1.05] text-text tracking-tight text-center text-[40px] md:text-[64px] lg:text-[80px]"
        >
          Sahnemizi
          <br />
          <em className="not-italic gold-shimmer animate-shimmer">paylaşalım</em>.
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.4, ease: easing, delay: 0.3 }}
          className="gold-rule h-px w-24 md:w-32 mx-auto mt-10 origin-center"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 0.8, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.5, ease: easing, delay: 0.4 }}
          className="mt-10 mx-auto max-w-xl text-center text-text/75 text-sm md:text-base font-light leading-[1.85]"
        >
          Davete açık ölçülü bir kapı. İhtiyacınızı seçin — özel ders ya da
          sahne gösterisi — size bizzat dönelim.
        </motion.p>

        {done ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: easing }}
            className="mt-20 text-center"
          >
            <p className="text-[10px] uppercase tracking-whisper text-accent/80 mb-6">
              Teşekkürler
            </p>
            <p className="serif text-text text-2xl md:text-3xl font-light leading-snug">
              E-posta uygulamanız açıldı.
              <br />
              Mesajınızı göndermeyi unutmayın.
            </p>
            <div className="gold-rule h-px w-24 mx-auto mt-10" />
          </motion.div>
        ) : (
          <>
            {/* Mode switch — two tabs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.4, ease: easing, delay: 0.45 }}
              role="tablist"
              aria-label="Başvuru türü"
              className="mt-16 mx-auto inline-flex items-stretch divide-x divide-line/60 border border-line/60 bg-surface/60"
            >
              <ModeTab
                active={mode === "lesson"}
                onClick={() => setMode("lesson")}
                label="Özel Ders"
                helper="Birebir / küçük grup"
              />
              <ModeTab
                active={mode === "event"}
                onClick={() => setMode("event")}
                label="Etkinlik Brief'i"
                helper="Sahne · gala · workshop"
              />
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.form
                key={mode}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.9, ease: easing }}
                onSubmit={onSubmit}
                className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10"
                noValidate={false}
              >
                {fields.map((f) => (
                  <Field key={`${mode}-${f.name}`} field={f} />
                ))}

                <div className="md:col-span-2 flex flex-col items-center gap-6 mt-4">
                  <MagneticButton
                    type="submit"
                    disabled={submitting}
                    strength={10}
                    className="group inline-flex items-center gap-4 border border-accent/50 px-10 py-4 text-[11px] uppercase tracking-whisper text-accent transition-colors duration-700 hover:bg-accent hover:text-background disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>{submitting ? "Gönderiliyor" : submitLabel}</span>
                    <span className="block h-px w-8 bg-accent/60 transition-all duration-700 group-hover:w-12 group-hover:bg-background" />
                  </MagneticButton>

                  <p className="text-[10px] uppercase tracking-whisper text-text/40 text-center max-w-md leading-relaxed">
                    {helperText}
                  </p>
                </div>
              </motion.form>
            </AnimatePresence>
          </>
        )}
      </div>
    </section>
  );
}

function ModeTab({
  active,
  onClick,
  label,
  helper,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  helper: string;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`group relative flex flex-col items-start gap-1 px-6 py-4 md:px-8 md:py-5 text-left transition-colors duration-700 ${
        active ? "bg-background text-text" : "text-text/60 hover:text-text"
      }`}
    >
      <span className="text-[10px] uppercase tracking-whisper text-accent/80">
        {helper}
      </span>
      <span className="serif text-lg md:text-xl font-light tracking-tight">
        {label}
      </span>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-px bg-accent transition-transform duration-700 origin-left ${
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"
        }`}
      />
    </button>
  );
}

function Field({ field }: { field: FieldDef }) {
  const { name, label, type, required, fullWidth, options } = field;
  const id = `f-${name}`;
  const wrapperClass = fullWidth ? "md:col-span-2" : "";

  return (
    <div className={wrapperClass}>
      <label
        htmlFor={id}
        className="block text-[10px] uppercase tracking-whisper text-text/60 mb-3"
      >
        {label}
        {required && <span className="text-accent ml-1">·</span>}
      </label>

      {type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          required={required}
          rows={4}
          className="input-line w-full bg-transparent text-text placeholder:text-text/30 text-base font-light py-2 resize-none"
        />
      ) : type === "select" ? (
        <select
          id={id}
          name={name}
          required={required}
          defaultValue=""
          className="input-line w-full bg-transparent text-text text-base font-light py-2 cursor-pointer appearance-none"
        >
          <option value="" disabled className="bg-background text-text/60">
            Seçiniz
          </option>
          {options?.map((opt) => (
            <option key={opt} value={opt} className="bg-background text-text">
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          autoComplete={
            type === "email" ? "email" : type === "tel" ? "tel" : undefined
          }
          className="input-line w-full bg-transparent text-text placeholder:text-text/30 text-base font-light py-2"
        />
      )}
    </div>
  );
}
