"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const easing = [0.16, 1, 0.3, 1] as const;

const links = [
  { href: "#oncu", label: "Öncü" },
  { href: "#vizyon", label: "Uluslararası Vizyon" },
  { href: "#sahne", label: "Sahne · Repertuvar" },
  { href: "#deneyim", label: "Boutique Experiences" },
  { href: "#basvuru", label: "Başvuru" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="md:hidden inline-flex items-center justify-center text-accent/80 hover:text-accent transition-colors"
      >
        {open ? <X size={22} strokeWidth={1.25} /> : <Menu size={22} strokeWidth={1.25} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-nav-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: easing }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm md:hidden"
          >
            <div className="flex items-center justify-between px-6 pt-8">
              <span className="serif text-accent text-xl tracking-editorial">
                DANS&nbsp;ARTS
              </span>
              <button
                type="button"
                aria-label="Menüyü kapat"
                onClick={() => setOpen(false)}
                className="text-accent/80 hover:text-accent transition-colors"
              >
                <X size={22} strokeWidth={1.25} />
              </button>
            </div>

            <nav className="flex flex-col items-center justify-center h-full -mt-12 gap-7">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.9,
                    ease: easing,
                    delay: 0.08 + i * 0.06,
                  }}
                  className="serif font-light text-text text-2xl tracking-tight hover:text-accent transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, ease: easing, delay: 0.5 }}
                className="gold-rule h-px w-24 mt-6"
              />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
