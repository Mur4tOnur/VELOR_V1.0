"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { useAuth } from "@/components/auth/AuthProvider";
import { LandingNavOverlay } from "@/components/LandingNavOverlay";
import { cn } from "@/lib/utils";

export { LANDING_HUD_TOP_PADDING_CLASS } from "@/lib/landing-hud-layout";

const HERO_LOGO_CLASS =
  "min-w-0 whitespace-nowrap text-center text-sm font-bold uppercase tracking-[0.16em] text-white transition-opacity hover:opacity-90 min-[400px]:text-base sm:text-lg sm:tracking-[0.22em] md:text-xl md:tracking-[0.25em] lg:text-2xl lg:tracking-[0.28em]";

/** Center logo: scroll-to-top on `/`, otherwise link home (avoids same-route navigation remount). */
export function HeroBrandMark() {
  const pathname = usePathname();
  const onLandingHome = pathname === "/";

  if (onLandingHome) {
    return (
      <button
        type="button"
        className={HERO_LOGO_CLASS}
        aria-current="page"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        VELOR
      </button>
    );
  }

  return (
    <Link href="/" className={HERO_LOGO_CLASS}>
      VELOR
    </Link>
  );
}

export type LandingHudProps = {
  className?: string;
  /**
   * `fixed` — stays on top while scrolling (default).
   * `static` — normal flow; use inside a custom wrapper or alternate layouts.
   */
  variant?: "fixed" | "static";
};

export function LandingHud({ className, variant = "fixed" }: LandingHudProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isFixed = variant === "fixed";
  const { user, ready, signOut } = useAuth();
  const router = useRouter();
  const isAuthed = Boolean(ready && user);

  return (
    <>
      <LandingNavOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
      <header
        className={cn(
          "relative isolate grid w-full shrink-0 items-center gap-x-2 gap-y-2 px-4 py-4 sm:gap-x-3 sm:px-8 sm:py-6",
          isAuthed
            ? "max-sm:grid-cols-2 max-sm:grid-rows-[auto_auto] max-sm:gap-y-3 sm:grid-cols-[1fr_auto_1fr]"
            : "grid-cols-[1fr_auto_1fr]",
          isFixed && "fixed inset-x-0 top-0 z-[70] overflow-visible",
          !isFixed && "relative overflow-visible",
          className,
        )}
      >
        {/* Dark tint — soft gradient only (no blur = no sharp blur edge) */}
        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 -z-10 h-[calc(100%+2.75rem)] sm:h-[calc(100%+3.5rem)] bg-gradient-to-b to-transparent",
            isFixed &&
              "from-black/55 via-black/22 supports-[backdrop-filter]:from-black/38",
            !isFixed && "from-black/85 via-black/40",
          )}
          aria-hidden
        />
        {/* Frost: blur on its own layer, faded out with a mask (blur cannot gradient natively) */}
        {isFixed ? (
          <div
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[calc(100%+3.75rem)] sm:h-[calc(100%+4.25rem)] backdrop-blur-md backdrop-saturate-125"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, #000 0%, #000 22%, rgba(0,0,0,0.55) 48%, rgba(0,0,0,0.12) 78%, transparent 100%)",
              maskImage:
                "linear-gradient(to bottom, #000 0%, #000 22%, rgba(0,0,0,0.55) 48%, rgba(0,0,0,0.12) 78%, transparent 100%)",
            }}
            aria-hidden
          />
        ) : null}
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className={cn(
            "inline-flex min-w-0 shrink-0 items-center gap-2 justify-self-start rounded-full border border-white/80 bg-black/20 px-3 py-2 text-[9px] font-medium uppercase tracking-[0.16em] text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/5 sm:px-4 sm:text-[10px] sm:tracking-[0.18em]",
            isAuthed && "max-sm:col-start-1 max-sm:row-start-1 sm:col-auto sm:row-auto",
          )}
          aria-expanded={menuOpen}
          aria-haspopup="dialog"
        >
          <span className="flex flex-col gap-0.5" aria-hidden>
            <span className="block h-px w-3.5 bg-white sm:w-4" />
            <span className="block h-px w-3.5 bg-white sm:w-4" />
          </span>
          <span className="max-[360px]:sr-only">Menu</span>
        </button>

        <div
          className={cn(
            "relative z-10 flex min-w-0 justify-center justify-self-center px-1",
            isAuthed &&
              "max-sm:col-span-2 max-sm:row-start-2 max-sm:w-full max-sm:justify-self-center sm:col-auto sm:col-span-1 sm:row-auto sm:w-auto",
          )}
        >
          <HeroBrandMark />
        </div>

        <div
          className={cn(
            "flex min-w-0 shrink-0 flex-nowrap items-center justify-end justify-self-end gap-1.5 sm:gap-2",
            isAuthed &&
              "max-sm:col-start-2 max-sm:row-start-1 max-sm:min-w-0 max-sm:justify-self-end sm:col-auto sm:row-auto",
          )}
        >
          {!ready ? (
            <span className="h-8 w-16 animate-pulse rounded-full bg-white/10 sm:w-24" aria-hidden />
          ) : user ? (
            <>
              {/* Nickname only from sm+ — mobile shows name in menu overlay to avoid crowding the logo */}
              <span className="hidden max-w-[9rem] truncate text-[10px] font-medium text-white/70 sm:inline">
                {user.name}
              </span>
              <Link
                href="/dashboard"
                className="whitespace-nowrap rounded-full border border-white/80 bg-black/20 px-2.5 py-2 text-[9px] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/5 sm:px-4 sm:text-[10px] sm:tracking-[0.12em]"
              >
                Dashboard
              </Link>
              <button
                type="button"
                onClick={() => {
                  signOut();
                  router.push("/");
                }}
                className="whitespace-nowrap rounded-full border border-white/25 bg-transparent px-2.5 py-2 text-[9px] font-semibold uppercase tracking-[0.1em] text-white/90 backdrop-blur-sm transition-colors hover:border-white/45 hover:bg-white/5 sm:px-4 sm:text-[10px] sm:tracking-[0.12em]"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="whitespace-nowrap rounded-full border border-white/80 bg-black/20 px-2.5 py-2 text-[9px] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/5 sm:px-4 sm:text-[10px] sm:tracking-[0.12em]"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="whitespace-nowrap rounded-full bg-white px-2.5 py-2 text-[9px] font-semibold uppercase tracking-[0.1em] text-black transition-opacity hover:opacity-90 sm:px-5 sm:text-[10px] sm:tracking-[0.12em]"
              >
                Get started
              </Link>
            </>
          )}
        </div>
      </header>
    </>
  );
}
