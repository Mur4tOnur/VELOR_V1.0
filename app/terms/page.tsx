import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | VELOR",
  description: "VELOR terms of service (placeholder).",
};

export default function TermsPage() {
  return (
    <main className="min-h-[100dvh] bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-2xl">
        <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.22em] text-zinc-500">
          Placeholder
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Terms of Service</h1>
        <p className="mt-4 text-sm leading-relaxed text-zinc-400">
          This page is a placeholder. Final terms are not published yet. Nothing here constitutes a
          binding agreement until replaced with approved legal copy.
        </p>
        <div className="mt-10 space-y-4 text-sm leading-relaxed text-zinc-300">
          <p>
            VELOR is a market intelligence platform. Use of the product is subject to terms that
            will describe acceptable use, disclaimers, and limitations of liability once finalized.
          </p>
          <p>
            For questions in the meantime, contact{" "}
            <a href="mailto:hello@velor.app" className="text-primary underline-offset-4 hover:underline">
              hello@velor.app
            </a>
            .
          </p>
        </div>
        <p className="mt-12">
          <Link
            href="/"
            className="text-sm font-medium text-white/90 underline-offset-4 transition-colors hover:text-primary hover:underline"
          >
            ← Back to home
          </Link>
        </p>
      </div>
    </main>
  );
}
