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
    },
  },
  plugins: [],
};

export default config;
