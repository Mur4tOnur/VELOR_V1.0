import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        "landing-sans": ["var(--font-landing-sans)", "system-ui", "sans-serif"],
        "landing-serif": ["var(--font-landing-serif)", "Georgia", "serif"],
        "instrument-serif": ["var(--font-instrument-serif)", "Georgia", "serif"],
      },
      boxShadow: {
        "glow-sm": "0 0 20px -5px rgba(52, 211, 153, 0.35)",
        "glow-violet": "0 0 28px -8px rgba(139, 92, 246, 0.4)",
      },
      keyframes: {
        velorIntroBlob1: {
          "0%, 100%": { transform: "translate(0%, 0%) scale(1)" },
          "40%": { transform: "translate(14%, -12%) scale(1.12)" },
          "70%": { transform: "translate(-12%, 8%) scale(0.92)" },
        },
        velorIntroBlob2: {
          "0%, 100%": { transform: "translate(0%, 0%) scale(1)" },
          "35%": { transform: "translate(-18%, 14%) scale(1.08)" },
          "65%": { transform: "translate(10%, -16%) scale(0.9)" },
        },
        velorIntroBlob3: {
          "0%, 100%": { transform: "translate(-50%, -50%) scale(1)" },
          "50%": { transform: "translate(-50%, -50%) scale(1.15) rotate(8deg)" },
        },
        velorIntroBand: {
          "0%": { transform: "translateX(-120%) skewX(-14deg)", opacity: "0" },
          "15%": { opacity: "0.55" },
          "50%": { opacity: "0.35" },
          "100%": { transform: "translateX(120%) skewX(-14deg)", opacity: "0" },
        },
        velorIntroShimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        "velor-intro-blob-1": "velorIntroBlob1 24s ease-in-out infinite",
        "velor-intro-blob-2": "velorIntroBlob2 32s ease-in-out infinite",
        "velor-intro-blob-3": "velorIntroBlob3 18s ease-in-out infinite",
        "velor-intro-band": "velorIntroBand 14s ease-in-out infinite",
        "velor-intro-shimmer": "velorIntroShimmer 12s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
