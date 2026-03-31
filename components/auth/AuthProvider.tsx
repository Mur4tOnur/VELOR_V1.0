"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import * as AuthStorage from "@/lib/auth-storage";
import type { SessionUser } from "@/lib/auth-storage";

type AuthResult = { ok: true } | { ok: false; error: string };

type AuthContextValue = {
  user: SessionUser | null;
  ready: boolean;
  signIn: (email: string, password: string) => AuthResult;
  signUp: (name: string, email: string, password: string) => AuthResult;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [ready, setReady] = useState(false);

  const syncFromStorage = useCallback(() => {
    setUser(AuthStorage.readSession());
  }, []);

  useEffect(() => {
    syncFromStorage();
    setReady(true);
    const onStorage = (e: StorageEvent) => {
      if (e.key === "velor_session" || e.key === null) syncFromStorage();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [syncFromStorage]);

  const signIn = useCallback((email: string, password: string): AuthResult => {
    const r = AuthStorage.authenticate(email, password);
    if (r.ok) {
      AuthStorage.writeSession(r.user);
      setUser(r.user);
      return { ok: true };
    }
    return r;
  }, []);

  const signUp = useCallback((name: string, email: string, password: string): AuthResult => {
    const emailNorm = email.trim().toLowerCase();
    const nameNorm = name.trim() || emailNorm.split("@")[0] || "User";
    const res = AuthStorage.registerUser({
      name: nameNorm,
      email: emailNorm,
      password,
    });
    if (!res.ok) return res;
    const session: SessionUser = { email: emailNorm, name: nameNorm };
    AuthStorage.writeSession(session);
    setUser(session);
    return { ok: true };
  }, []);

  const signOut = useCallback(() => {
    AuthStorage.writeSession(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, ready, signIn, signUp, signOut }),
    [user, ready, signIn, signUp, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
