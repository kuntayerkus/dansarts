"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";

const easing = [0.16, 1, 0.3, 1] as const;
const RECIPIENT = "dansartsreyhan@gmail.com";

/**
 * Application — "The Application"
 * Bölüm 05. Minimalist, underlined inputs. On submit, opens the user's
 * email client via mailto to RECIPIENT with the form contents pre-filled.
 */
export default function Application() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const message = String(data.get("message") || "").trim();

    const subject = `Özel Deneyime Başvuru — ${name || "İsimsiz"}`;
    const body = [
      `Ad Soyad: ${name}`,
      `E-posta: ${email}`,
      phone ? `Telefon: ${phone}` : null,
      "",
      "Mesaj:",
      message,
    ]
      .filter(Boolean)
      .join("\n");

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

  return (
    <section
      id="basvuru"
      className="relative bg-background py-32 md:py-48 overflow-hidden"
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
            Bölüm 05 · Başvuru
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
          Özel Deneyime
          <br />
          <em className="not-italic gold-shimmer animate-shimmer">Başvur</em>.
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
          Dans Arts'ın atölye kapısı, davete açık ölçülü bir kapıdır.
          Aşağıdaki kısa formu doldurun; sizinle bizzat iletişime geçelim.
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
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.5, ease: easing, delay: 0.5 }}
            onSubmit={onSubmit}
            className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10"
            noValidate={false}
          >
            <Field name="name" label="Ad Soyad" type="text" required />
            <Field name="email" label="E-posta" type="email" required />
            <Field
              name="phone"
              label="Telefon (opsiyonel)"
              type="tel"
              required={false}
            />
            <Field
              name="message"
              label="Mesajınız"
              type="textarea"
              required
              fullWidth
            />

            <div className="md:col-span-2 flex flex-col items-center gap-6 mt-4">
              <button
                type="submit"
                disabled={submitting}
                className="group inline-flex items-center gap-4 border border-accent/50 px-10 py-4 text-[11px] uppercase tracking-whisper text-accent transition-colors duration-700 hover:bg-accent hover:text-background disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{submitting ? "Gönderiliyor" : "Özel Deneyime Başvur"}</span>
                <span className="block h-px w-8 bg-accent/60 transition-all duration-700 group-hover:w-12 group-hover:bg-background" />
              </button>
              <p className="text-[10px] uppercase tracking-whisper text-text/40 text-center">
                Başvurunuz {RECIPIENT} adresine yönlendirilir.
              </p>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}

interface FieldProps {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea";
  required?: boolean;
  fullWidth?: boolean;
}

function Field({ name, label, type, required, fullWidth }: FieldProps) {
  const id = `f-${name}`;
  const isTextarea = type === "textarea";
  return (
    <div className={fullWidth ? "md:col-span-2" : ""}>
      <label
        htmlFor={id}
        className="block text-[10px] uppercase tracking-whisper text-text/60 mb-3"
      >
        {label}
        {required && <span className="text-accent ml-1">·</span>}
      </label>
      {isTextarea ? (
        <textarea
          id={id}
          name={name}
          required={required}
          rows={4}
          className="input-line w-full bg-transparent text-text placeholder:text-text/30 text-base font-light py-2 resize-none"
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          autoComplete={
            type === "email" ? "email" : type === "tel" ? "tel" : "name"
          }
          className="input-line w-full bg-transparent text-text placeholder:text-text/30 text-base font-light py-2"
        />
      )}
    </div>
  );
}
