"use client";

import Link from "next/link";
import { useEffect } from "react";

const NAV_LINKS = [
  { href: "#hero", label: "Home" },
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
  { href: "#final-cta", label: "Get started" },
  { href: "#footer", label: "Footer" },
] as const;

type LandingNavOverlayProps = {
  open: boolean;
  onClose: () => void;
};

export function LandingNavOverlay({ open, onClose }: LandingNavOverlayProps) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-black/96 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
    >
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-4 sm:px-8 sm:py-5">
        <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-zinc-500">
          Menu
        </span>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-white/20 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:border-white/40 hover:bg-white/5"
        >
          Close
        </button>
      </div>
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-8 sm:px-8">
        {NAV_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            onClick={onClose}
            className="border-b border-white/[0.06] py-4 text-lg font-medium tracking-tight text-white transition-colors hover:text-white/80 sm:text-xl"
          >
            {label}
          </Link>
        ))}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/dashboard"
            onClick={onClose}
            className="rounded-full border border-white/80 bg-transparent px-5 py-3 text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-white/5"
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard"
            onClick={onClose}
            className="rounded-full bg-white px-5 py-3 text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-black transition-opacity hover:opacity-90"
          >
            GET STARTED
          </Link>
        </div>
      </nav>
    </div>
  );
}
