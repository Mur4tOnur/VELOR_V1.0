"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { LANDING_HUD_TOP_PADDING_CLASS } from "@/lib/landing-hud-layout";

const HERO_CURRENCIES: { code: string; symbol: string }[] = [
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
  { code: "BTC", symbol: "₿" },
  { code: "USD", symbol: "$" },
  { code: "JPY", symbol: "¥" },
  { code: "CHF", symbol: "Fr" },
];

function HeroCurrencyCycle() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % HERO_CURRENCIES.length);
    }, 2200);
    return () => window.clearInterval(id);
  }, []);

  const current = HERO_CURRENCIES[index];

  return (
    <div
      className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/25 sm:h-16 sm:w-16"
      aria-live="polite"
    >
      <span className="sr-only">Markets: {current.code}</span>
      <span
        key={current.code}
        className="velor-hero-currency-in text-lg font-medium tabular-nums text-white sm:text-xl"
        aria-hidden
      >
        {current.symbol}
      </span>
    </div>
  );
}

const SplineViewer = dynamic(() => import("@/components/SplineViewerLoader"), {
  ssr: false,
  loading: () => (
    <div
      className="flex h-full w-full items-center justify-center bg-gradient-to-br from-white/[0.04] via-transparent to-cyan-500/[0.06] ring-1 ring-inset ring-white/[0.08]"
      aria-hidden
    >
      <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
        Loading 3D…
      </p>
    </div>
  ),
});

function isSplineCodeSceneUrl(url: string) {
  return url.includes("scene.splinecode");
}

/** Reject dangerous schemes (e.g. javascript:) if env is ever mis-set. */
function isSafeSceneUrl(url: string): boolean {
  try {
    const u = new URL(url);
    if (u.protocol === "https:") return true;
    if (process.env.NODE_ENV === "development" && u.protocol === "http:") {
      return u.hostname === "localhost" || u.hostname === "127.0.0.1";
    }
    return false;
  } catch {
    return false;
  }
}

/**
 * `NEXT_PUBLIC_SPLINE_SCENE_URL`: use the **.splinecode** public URL from Spline (loaded via
 * `@splinetool/react-spline`), or any **https** embed page URL for a plain iframe.
 */
function SplineStage() {
  const url = process.env.NEXT_PUBLIC_SPLINE_SCENE_URL?.trim();

  if (url && !isSafeSceneUrl(url)) {
    return (
      <div
        className="flex h-full w-full items-center justify-center bg-gradient-to-br from-white/[0.04] via-transparent to-cyan-500/[0.06] ring-1 ring-inset ring-white/[0.08]"
        aria-hidden
      >
        <p className="max-w-[14rem] px-2 text-center text-[11px] uppercase tracking-[0.2em] text-zinc-500">
          Invalid scene URL
          <span className="mt-2 block font-normal normal-case tracking-normal text-zinc-600">
            Use an https:// URL in NEXT_PUBLIC_SPLINE_SCENE_URL
          </span>
        </p>
      </div>
    );
  }

  if (url) {
    if (isSplineCodeSceneUrl(url)) {
      return (
        <SplineViewer
          scene={url}
          className="h-full w-full min-h-0"
          style={{ minHeight: 0 }}
        />
      );
    }

    return (
      <iframe
        title="VELOR 3D scene"
        src={url}
        className="h-full w-full border-0 bg-transparent"
        allow="accelerometer; autoplay; xr-spatial-tracking; gyroscope; fullscreen"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <div
      className="flex h-full w-full items-center justify-center bg-gradient-to-br from-white/[0.04] via-transparent to-cyan-500/[0.06] ring-1 ring-inset ring-white/[0.08]"
      aria-hidden
    >
      <p className="max-w-[12rem] text-center text-[11px] uppercase tracking-[0.2em] text-zinc-500">
        3D scene
        <span className="mt-2 block font-normal normal-case tracking-normal text-zinc-600">
          Add NEXT_PUBLIC_SPLINE_SCENE_URL
        </span>
      </p>
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className={`relative flex min-h-[100dvh] flex-col overflow-x-hidden bg-black text-white ${LANDING_HUD_TOP_PADDING_CLASS}`}
      aria-labelledby="hero-title"
    >
        {/* Prism / light rays */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div
            className="absolute -left-1/4 top-0 h-[120%] w-[70%] rotate-12 opacity-50 blur-3xl"
            style={{
              background:
                "linear-gradient(105deg, transparent 0%, rgba(56,189,248,0.12) 35%, rgba(250,204,21,0.08) 55%, transparent 85%)",
            }}
          />
          <div
            className="absolute -right-1/4 bottom-0 h-[90%] w-[60%] -rotate-6 opacity-40 blur-3xl"
            style={{
              background:
                "linear-gradient(200deg, transparent 40%, rgba(59,130,246,0.15) 70%, rgba(251,191,36,0.06) 100%)",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_45%,rgba(255,255,255,0.06),transparent_55%)]" />
        </div>

        {/* Spline: decorative only — pointer events disabled so HUD/links stay primary */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] flex min-h-[100dvh] w-full items-center justify-center"
          aria-hidden={!process.env.NEXT_PUBLIC_SPLINE_SCENE_URL}
        >
          <div className="h-full min-h-[100dvh] w-full max-w-[100vw]">
            <SplineStage />
          </div>
        </div>

        {/* Readability over 3D */}
        <div
          className="pointer-events-none absolute inset-0 z-[10] bg-gradient-to-b from-black/55 via-black/25 to-black/70"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-[10] bg-gradient-to-r from-black/50 via-transparent to-black/40"
          aria-hidden
        />

        <div className="relative z-20 flex flex-1 flex-col justify-end px-5 pb-6 pt-4 sm:px-8 sm:pb-10 lg:min-h-0 lg:pb-14 lg:pt-8">
          <div className="grid max-w-7xl gap-10 lg:mx-auto lg:w-full lg:grid-cols-2 lg:items-end lg:gap-16 xl:max-w-[90rem]">
            <div className="max-w-xl">
              <p className="mb-3 text-[10px] font-medium uppercase leading-relaxed tracking-[0.2em] text-zinc-400 sm:text-[11px] sm:tracking-[0.22em]">
                <span className="mr-2 text-white/70" aria-hidden>
                  →
                </span>
                Build your FREEDOM from today.
              </p>
              <h1
                id="hero-title"
                className="text-[clamp(2.25rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-tight text-white"
              >
                Clarity in{" "}
                <span className="font-instrument-serif text-[clamp(2.55rem,6.85vw,5.15rem)] font-normal italic tracking-tight">
                  Chaos
                </span>
              </h1>
            </div>

            <div className="flex max-w-md flex-col gap-5 lg:justify-self-end lg:text-right">
              <div className="flex items-center gap-4 lg:ml-auto lg:flex-row-reverse">
                <HeroCurrencyCycle />
                <p className="text-sm leading-relaxed text-zinc-400 sm:text-base">
                  Identify overextension, exhaustion, and value zones with a
                  clean market intelligence engine.
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-10 flex max-w-7xl flex-wrap items-center justify-between gap-4 text-[9px] font-medium uppercase tracking-[0.2em] text-zinc-500 sm:text-[10px] xl:max-w-[90rem]">
            <span>Our partners</span>
            <span className="text-right">Backed by 30+ global brands</span>
          </div>
        </div>

        {/* Fade into next section (black) */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[22] h-32 bg-gradient-to-b from-transparent via-black/70 to-black sm:h-40"
          aria-hidden
        />
    </section>
  );
}
