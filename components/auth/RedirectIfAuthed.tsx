"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

import { useAuth } from "@/components/auth/AuthProvider";

export function RedirectIfAuthed({ children }: { children: ReactNode }) {
  const { user, ready } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    if (user) router.replace("/dashboard");
  }, [ready, user, router]);

  if (!ready) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-black text-sm text-zinc-500">
        Loading…
      </div>
    );
  }

  if (user) return null;

  return <>{children}</>;
}
