"use client";

import React, { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const SPIRAL_CFG = {
  points: 700,
  dotRadius: 1.8,
  duration: 3.0,
  color: "#ffffff",
  pulseEffect: true,
  opacityMin: 0.25,
  opacityMax: 0.9,
  sizeMin: 0.5,
  sizeMax: 1.4,
} as const;

const DEFAULT_FAQS = [
  {
    q: "What does your team do?",
    a: "We design and build digital products end‑to‑end: research, UX/UI, front‑end/back‑end, infrastructure, and release support.",
  },
  {
    q: "How is your workflow structured?",
    a: "Iteratively. Solution storyboards → quick prototypes → user testing → prioritization → production integration. Transparent at every stage.",
  },
  {
    q: "Which stack and tools do you use?",
    a: "TypeScript/React/Next.js, Node.js, Python, Postgres, Redis, Tailwind, Playwright, CI/CD on GitHub Actions. Deployment — containers and clouds.",
  },
  {
    q: "Can we see code or a demo?",
    a: "Yes. We prepare private demo environments, give repository access and supply documented examples.",
  },
  {
    q: "How do you estimate timelines and budgets?",
    a: "We evaluate MVPs by impact metrics — value/complexity. We provide T‑shirt sizing bounds, then lock sprints with checkpoints.",
  },
  {
    q: "Do you take over existing products?",
    a: "Yes. We audit, clean up architecture/CI, eliminate debts, set up monitoring and take over under SLA.",
  },
] as const;

export type FAQEntry = { q: string; a: string };

export type FAQWithSpiralProps = {
  faqs?: readonly FAQEntry[];
  className?: string;
  titleId?: string;
  kicker?: string;
  title?: string;
  description?: string;
  showFooter?: boolean;
  footerText?: string;
};

export function FAQWithSpiral({
  faqs = DEFAULT_FAQS,
  className,
  titleId = "faq-heading",
  kicker,
  title = "FAQ",
  description = "Clean, minimalistic, black‑and‑white.",
  showFooter = false,
  footerText,
}: FAQWithSpiralProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const spiralRef = useRef<HTMLDivElement | null>(null);
  const [spiralSize, setSpiralSize] = useState(400);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const w = el.getBoundingClientRect().width;
      setSpiralSize(Math.round(Math.min(560, Math.max(240, w))));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!spiralRef.current || spiralSize < 80) return;

    const SIZE = spiralSize;
    const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
    const N = SPIRAL_CFG.points;
    const DOT = SPIRAL_CFG.dotRadius;
    const CENTER = SIZE / 2;
    const PADDING = 4;
    const MAX_R = CENTER - PADDING - DOT;

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", String(SIZE));
    svg.setAttribute("height", String(SIZE));
    svg.setAttribute("viewBox", `0 0 ${SIZE} ${SIZE}`);

    for (let i = 0; i < N; i++) {
      const idx = i + 0.5;
      const frac = idx / N;
      const r = Math.sqrt(frac) * MAX_R;
      const theta = idx * GOLDEN_ANGLE;
      const x = CENTER + r * Math.cos(theta);
      const y = CENTER + r * Math.sin(theta);

      const c = document.createElementNS(svgNS, "circle");
      c.setAttribute("cx", x.toFixed(3));
      c.setAttribute("cy", y.toFixed(3));
      c.setAttribute("r", String(DOT));
      c.setAttribute("fill", SPIRAL_CFG.color);
      c.setAttribute("opacity", "0.6");

      if (SPIRAL_CFG.pulseEffect) {
        const animR = document.createElementNS(svgNS, "animate");
        animR.setAttribute("attributeName", "r");
        animR.setAttribute(
          "values",
          `${DOT * SPIRAL_CFG.sizeMin};${DOT * SPIRAL_CFG.sizeMax};${DOT * SPIRAL_CFG.sizeMin}`,
        );
        animR.setAttribute("dur", `${SPIRAL_CFG.duration}s`);
        animR.setAttribute("begin", `${(frac * SPIRAL_CFG.duration).toFixed(3)}s`);
        animR.setAttribute("repeatCount", "indefinite");
        animR.setAttribute("calcMode", "spline");
        animR.setAttribute("keySplines", "0.4 0 0.6 1;0.4 0 0.6 1");
        c.appendChild(animR);

        const animO = document.createElementNS(svgNS, "animate");
        animO.setAttribute("attributeName", "opacity");
        animO.setAttribute(
          "values",
          `${SPIRAL_CFG.opacityMin};${SPIRAL_CFG.opacityMax};${SPIRAL_CFG.opacityMin}`,
        );
        animO.setAttribute("dur", `${SPIRAL_CFG.duration}s`);
        animO.setAttribute("begin", `${(frac * SPIRAL_CFG.duration).toFixed(3)}s`);
        animO.setAttribute("repeatCount", "indefinite");
        animO.setAttribute("calcMode", "spline");
        animO.setAttribute("keySplines", "0.4 0 0.6 1;0.4 0 0.6 1");
        c.appendChild(animO);
      }

      svg.appendChild(c);
    }

    spiralRef.current.innerHTML = "";
    spiralRef.current.appendChild(svg);
  }, [spiralSize]);

  const list = faqs as FAQEntry[];
  const filtered = query
    ? list.filter(({ q, a }) => (q + a).toLowerCase().includes(query.toLowerCase()))
    : list;

  const year = new Date().getFullYear();
  const footer =
    footerText ?? `© ${year} Your team — products that move metrics.`;

  return (
    <div className={cn("relative w-full overflow-hidden bg-black text-white", className)}>
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-30 [mask-image:radial-gradient(circle_at_center,rgba(255,255,255,1),rgba(255,255,255,0.1)_60%,transparent_75%)]"
        style={{ mixBlendMode: "screen" }}
      >
        <div ref={containerRef} className="flex aspect-square w-full max-w-[560px] justify-center">
          <div ref={spiralRef} className="flex items-center justify-center" />
        </div>
      </div>

      <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
        {kicker ? (
          <p className="mb-4 text-center text-[10px] font-medium uppercase tracking-[0.22em] text-white/50 md:mb-6 md:text-left">
            {kicker}
          </p>
        ) : null}

        <header className="mb-8 flex flex-col gap-5 border-b border-white/20 pb-6 sm:mb-10 md:flex-row md:items-end md:justify-between md:gap-6">
          <div className="min-w-0 text-center md:text-left">
            <h2
              id={titleId}
              className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
            >
              {title}
            </h2>
            <p className="mt-2 text-sm text-white/70 md:text-base">{description}</p>
          </div>
          <div className="w-full shrink-0 md:w-auto md:max-w-xs">
            <label htmlFor="faq-search" className="sr-only">
              Search questions
            </label>
            <input
              id="faq-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions…"
              className="h-10 w-full rounded-xl border border-white/20 bg-black/40 px-3 text-sm text-white outline-none backdrop-blur-sm transition placeholder:text-white/40 focus:border-white/60 md:w-56 lg:w-64"
              autoComplete="off"
            />
          </div>
        </header>

        <section className="relative" aria-label="Frequently asked questions">
          {filtered.length === 0 ? (
            <p className="rounded-2xl border border-white/15 bg-black/40 px-5 py-8 text-center text-sm text-white/60">
              No questions match “{query}”. Try another term.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
              {filtered.map((item, i) => (
                <FAQItem key={item.q} q={item.q} a={item.a} index={i + 1} />
              ))}
            </div>
          )}
        </section>

        {showFooter ? (
          <footer className="mt-12 border-t border-white/10 pt-6 text-xs text-white/50 sm:mt-16">
            {footer}
          </footer>
        ) : null}
      </div>
    </div>
  );
}

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/15 bg-black/40 p-4 transition hover:border-white/40 sm:p-5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-3 text-left"
        aria-expanded={open}
      >
        <div className="flex min-w-0 items-baseline gap-2 sm:gap-3">
          <span className="shrink-0 text-xs tabular-nums text-white/40">
            {String(index).padStart(2, "0")}
          </span>
          <span className="text-base font-semibold leading-tight sm:text-lg">{q}</span>
        </div>
        <span className="ml-1 shrink-0 text-white/60 transition group-hover:text-white" aria-hidden>
          {open ? "–" : "+"}
        </span>
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(.4,0,.2,1)]",
          open ? "mt-3 grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="text-sm text-white/70">{a}</p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100">
        <div
          className="absolute -inset-1 rounded-2xl border border-white/10"
          style={{
            maskImage:
              "radial-gradient(180px 180px at var(--x,50%) var(--y,50%),white,transparent)",
          }}
        />
      </div>
    </div>
  );
}
