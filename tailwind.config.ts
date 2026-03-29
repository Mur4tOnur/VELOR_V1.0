import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        "landing-sans": ["var(--font-landing-sans)", "system-ui", "sans-serif"],
        "landing-serif": ["var(--font-landing-serif)", "Georgia", "serif"],
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
