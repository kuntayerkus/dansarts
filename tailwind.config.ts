import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Premium dark base
        background: "#0A0A0A",
        surface: "#111111",
        // Brand
        primary: {
          DEFAULT: "#6B1123", // Burgundy / Bordo
          deep: "#4A0B17",
          soft: "#8C2A3C",
        },
        accent: {
          DEFAULT: "#D4AF37", // Champagne / Mat altın
          soft: "#E6C76A",
          deep: "#A38423",
        },
        text: {
          DEFAULT: "#F2EDE4", // Kırık beyaz
          muted: "#8A8378",
          dim: "#5C5750",
        },
        line: "#1F1B16",
      },
      fontFamily: {
        // Wired up via next/font in app/layout.tsx
        serif: ["var(--font-serif)", "Cinzel", "Playfair Display", "serif"],
        sans: ["var(--font-sans)", "Inter", "Montserrat", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        whisper: "0.32em",
        editorial: "0.18em",
      },
      transitionTimingFunction: {
        couture: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        "1200": "1200ms",
        "1500": "1500ms",
      },
      keyframes: {
        breathe: {
          "0%, 100%": { transform: "scaleY(1)", opacity: "0.65" },
          "50%": { transform: "scaleY(0.35)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marquee: {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "100%": { transform: "translate3d(-50%, 0, 0)" },
        },
      },
      animation: {
        breathe: "breathe 2.6s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
        marquee: "marquee 38s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
