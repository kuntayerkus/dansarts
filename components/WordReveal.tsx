"use client";

import { motion } from "framer-motion";

const easing = [0.16, 1, 0.3, 1] as const;

interface WordRevealProps {
  text: string;
  /** Render tag — currently `p` or `h2`. Default `p`. */
  as?: "p" | "h2";
  className?: string;
  /** Per-word delay in seconds. */
  stagger?: number;
  /** Initial delay before the first word. */
  delay?: number;
}

const container = (stagger: number, delay: number) => ({
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

const word = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.0, ease: easing },
  },
};

/**
 * WordReveal
 * Splits text into spans and reveals them word-by-word with a slow,
 * editorial fade-up. Supports `<p>` (default) and `<h2>` tags.
 */
export default function WordReveal({
  text,
  as = "p",
  className = "",
  stagger = 0.06,
  delay = 0,
}: WordRevealProps) {
  const words = text.split(/\s+/).filter(Boolean);
  const variants = container(stagger, delay);
  const viewport = { once: true, margin: "-12%" };

  const inner = words.map((w, i) => (
    <span
      key={`${w}-${i}`}
      className="inline-block whitespace-pre"
      style={{ marginRight: "0.25em" }}
    >
      <motion.span
        variants={word}
        className="inline-block"
        style={{ willChange: "transform, opacity, filter" }}
      >
        {w}
      </motion.span>
    </span>
  ));

  if (as === "h2") {
    return (
      <motion.h2
        variants={variants}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className={className}
      >
        {inner}
      </motion.h2>
    );
  }

  return (
    <motion.p
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className={className}
    >
      {inner}
    </motion.p>
  );
}
