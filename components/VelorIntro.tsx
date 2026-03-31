"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { ShaderAnimation } from "@/components/ui/shader-lines";

const SESSION_KEY = "velor_intro_completed";
const HOLD_MS_MIN = 1200;
const HOLD_MS_MAX = 1800;

type Phase = "pending" | "intro" | "gone";

function randomHoldMs() {
  return HOLD_MS_MIN + Math.random() * (HOLD_MS_MAX - HOLD_MS_MIN);
}

export function VelorIntro() {
  const [phase, setPhase] = useState<Phase>("pending");
  const [overlayVisible, setOverlayVisible] = useState(true);
  const [holdProgress, setHoldProgress] = useState(0);
  /** Remount WebGL after bfcache restore (avoids lost context / stale GL on back-forward). */
  const [shaderBootId, setShaderBootId] = useState(0);
  const reduceMotion = useReducedMotion();

  const holdMsRef = useRef(randomHoldMs());
  const rafRef = useRef<number | null>(null);
  const holdStartRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") {
        setPhase("gone");
      } else {
        setPhase("intro");
      }
    } catch {
      setPhase("intro");
    }
  }, []);

  useEffect(() => {
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        setShaderBootId((n) => n + 1);
      }
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  const clearHoldLoop = useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    holdStartRef.current = null;
    setHoldProgress(0);
  }, []);

  const finishIntro = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignore quota / private mode */
    }
    clearHoldLoop();
    setOverlayVisible(false);
  }, [clearHoldLoop]);

  const runHoldTick = useCallback(() => {
    const start = holdStartRef.current;
    if (start == null) return;
    const elapsed = performance.now() - start;
    const target = holdMsRef.current;
    const p = Math.min(1, elapsed / target);
    setHoldProgress(p);
    if (p >= 1) {
      finishIntro();
      return;
    }
    rafRef.current = requestAnimationFrame(runHoldTick);
  }, [finishIntro]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!overlayVisible || phase !== "intro") return;
      if (e.pointerType === "mouse" && e.button !== 0) return;
      e.preventDefault();
      e.currentTarget.setPointerCapture(e.pointerId);
      holdStartRef.current = performance.now();
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(runHoldTick);
    },
    [overlayVisible, phase, runHoldTick],
  );

  const onPointerStop = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      try {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
      } catch {
        /* ignore */
      }
      if (overlayVisible) clearHoldLoop();
    },
    [clearHoldLoop, overlayVisible],
  );

  useEffect(() => {
    if (phase === "gone") return;
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "intro" || !overlayVisible) return;
    const blockEscape = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") ev.preventDefault();
    };
    window.addEventListener("keydown", blockEscape, true);
    return () => window.removeEventListener("keydown", blockEscape, true);
  }, [phase, overlayVisible]);

  if (phase === "gone") {
    return null;
  }

  if (phase === "pending") {
    return (
      <div
        className="fixed inset-0 z-[110] bg-black"
        aria-hidden
      />
    );
  }

  const exitDuration = reduceMotion ? 0.22 : 0.55;
  const exitBlur = reduceMotion ? 0 : 14;
  const exitScale = reduceMotion ? 1 : 1.035;

  return (
    <AnimatePresence
      onExitComplete={() => {
        setPhase("gone");
      }}
    >
      {overlayVisible ? (
        <motion.div
          key="velor-intro"
          role="dialog"
          aria-modal="true"
          aria-label="VELOR introduction"
          aria-describedby="velor-intro-hint"
          className="fixed inset-0 z-[110] touch-none select-none bg-black"
          initial={false}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          exit={{
            opacity: 0,
            filter: `blur(${exitBlur}px)`,
            scale: exitScale,
          }}
          transition={{
            duration: exitDuration,
            ease: [0.22, 1, 0.36, 1],
          }}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerStop}
          onPointerCancel={onPointerStop}
          onLostPointerCapture={onPointerStop}
          onContextMenu={(e) => e.preventDefault()}
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          {/* Intro_Animation.md: WebGL shader lines + cinematic grade (VELOR / hold UI unchanged) */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden bg-black">
            {!reduceMotion ? (
              <ShaderAnimation
                key={shaderBootId}
                className="absolute inset-0 h-full min-h-full w-full"
              />
            ) : (
              <div
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1a1035_0%,#000000_65%)]"
                aria-hidden
              />
            )}
            <div
              className="absolute inset-0 bg-[radial-gradient(ellipse_120%_90%_at_50%_25%,rgba(88,28,135,0.22),transparent_50%),radial-gradient(ellipse_80%_60%_at_70%_100%,rgba(6,78,59,0.12),transparent_45%)] mix-blend-soft-light"
              aria-hidden
            />
            <div
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.45)_70%,rgba(0,0,0,0.88)_100%)]"
              aria-hidden
            />
          </div>

          <div className="relative flex h-full min-h-[100dvh] flex-col items-center justify-center px-6">
            <h1
              className="text-center font-semibold uppercase tracking-[0.28em] text-white sm:tracking-[0.35em]"
              style={{
                fontSize: "clamp(2.75rem, 12vw, 6.5rem)",
                lineHeight: 0.95,
                textRendering: "geometricPrecision",
                textShadow: [
                  "0 1px 0 rgba(0,0,0,0.7)",
                  "0 2px 4px rgba(0,0,0,0.88)",
                  "0 3px 10px rgba(0,0,0,0.72)",
                  "0 5px 20px rgba(0,0,0,0.45)",
                  "0 -1px 1px rgba(255,255,255,0.2)",
                  "0 -2px 6px rgba(255,255,255,0.06)",
                  "0 0 48px rgba(139,92,246,0.18)",
                  "0 0 88px rgba(6,182,212,0.07)",
                ].join(", "),
              }}
            >
              VELOR
            </h1>
            <p
              id="velor-intro-hint"
              className="mt-8 max-w-md text-center text-[11px] font-medium uppercase tracking-[0.22em] text-white/45 sm:text-xs sm:tracking-[0.28em]"
            >
              Hold for continue
            </p>
            <div
              className="mt-6 h-0.5 w-[min(200px,55vw)] overflow-hidden rounded-full bg-white/10"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(holdProgress * 100)}
              aria-label="Continue hold progress"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-400/90 via-white/80 to-cyan-300/80 transition-[width] duration-75 ease-out motion-reduce:transition-none"
                style={{ width: `${holdProgress * 100}%` }}
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/** Alias for layouts that prefer the overlay naming. */
export const IntroOverlay = VelorIntro;
