import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-4 text-center text-white">
      <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">VELOR</p>
      <h1 className="mb-3 text-xl font-semibold">Password reset</h1>
      <p className="mb-8 max-w-sm text-sm text-zinc-400">
        This build uses mock auth only. Use sign in with your local account, or create a new one on the sign up page.
      </p>
      <Link
        href="/login"
        className="rounded-full border border-white/20 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-white/40 hover:bg-white/5"
      >
        Back to sign in
      </Link>
    </div>
  );
}
