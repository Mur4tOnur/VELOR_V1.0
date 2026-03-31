import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | VELOR",
  description: "VELOR privacy policy (placeholder).",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-[100dvh] bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-2xl">
        <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.22em] text-zinc-500">
          Placeholder
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Privacy Policy</h1>
        <p className="mt-4 text-sm leading-relaxed text-zinc-400">
          This page is a placeholder. A full privacy policy will describe how VELOR collects, uses,
          stores, and shares data once legal review is complete.
        </p>
        <div className="mt-10 space-y-4 text-sm leading-relaxed text-zinc-300">
          <p>
            Until then, assume no comprehensive policy is in effect on this URL. Do not rely on
            this text for compliance or regulatory purposes.
          </p>
          <p>
            For privacy-related inquiries, contact{" "}
            <a href="mailto:support@velor.app" className="text-primary underline-offset-4 hover:underline">
              support@velor.app
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
