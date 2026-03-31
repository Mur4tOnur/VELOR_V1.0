"use client";

import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";

import { useAuth } from "@/components/auth/AuthProvider";
import { AuthBackdrop } from "@/components/auth/AuthBackdrop";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type FocusField = "name" | "email" | "password" | "confirm" | null;

export function SignUpCard() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<FocusField>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [8, -8]);
  const rotateY = useTransform(mouseX, [-300, 300], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!name.trim() || !email.trim() || !password) {
      setFormError("Fill in all fields.");
      return;
    }
    if (password.length < 8) {
      setFormError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setFormError("Passwords do not match.");
      return;
    }
    setIsLoading(true);
    const r = signUp(name, email, password);
    setIsLoading(false);
    if (!r.ok) {
      setFormError(r.error);
      return;
    }
    router.replace("/dashboard");
  };

  const fieldWrap = (field: Exclude<FocusField, null>, icon: ReactNode, child: ReactNode) => (
    <motion.div
      className={cn("relative", focusedInput === field && "z-10")}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div className="absolute -inset-[0.5px] rounded-lg bg-gradient-to-r from-white/10 via-white/5 to-white/10 opacity-0 transition-all duration-300 group-hover:opacity-100" />
      <div className="relative flex items-center overflow-hidden rounded-lg">
        {icon}
        {child}
      </div>
    </motion.div>
  );

  return (
    <AuthBackdrop>
      <Link
        href="/"
        className="absolute left-4 top-4 z-50 rounded-full border border-white/15 bg-black/40 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/80 backdrop-blur-md transition-colors hover:border-white/30 hover:text-white sm:left-6 sm:top-6 sm:px-4"
      >
        ← Home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-sm px-4"
        style={{ perspective: 1500 }}
      >
        <motion.div
          className="relative"
          style={{ rotateX, rotateY }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          whileHover={{ z: 10 }}
        >
          <div className="group relative">
            <div className="absolute -inset-[0.5px] rounded-2xl bg-gradient-to-r from-white/[0.03] via-white/[0.07] to-white/[0.03] opacity-0 transition-opacity duration-500 group-hover:opacity-70" />

            <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-black/40 p-6 shadow-2xl backdrop-blur-xl">
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, white 0.5px, transparent 0.5px), linear-gradient(45deg, white 0.5px, transparent 0.5px)",
                  backgroundSize: "30px 30px",
                }}
              />

              <div className="relative mb-5 space-y-1 text-center">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", duration: 0.8 }}
                  className="relative mx-auto flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/10"
                >
                  <span className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-lg font-bold text-transparent">
                    V
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-b from-white to-white/80 bg-clip-text text-xl font-bold text-transparent"
                >
                  Create your account
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-xs text-white/60"
                >
                  Join VELOR — mock auth, stored locally only
                </motion.p>
              </div>

              <form onSubmit={handleSubmit} className="relative space-y-3">
                {formError ? (
                  <p
                    className="rounded-lg border border-red-500/25 bg-red-950/30 px-3 py-2 text-center text-xs text-red-200/90"
                    role="alert"
                  >
                    {formError}
                  </p>
                ) : null}

                {fieldWrap(
                  "name",
                  <User
                    className={cn(
                      "absolute left-3 h-4 w-4 transition-all duration-300",
                      focusedInput === "name" ? "text-white" : "text-white/40",
                    )}
                  />,
                  <Input
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="Full name"
                    value={name}
                    onChange={(ev) => setName(ev.target.value)}
                    onFocus={() => setFocusedInput("name")}
                    onBlur={() => setFocusedInput(null)}
                    className="h-10 w-full border-transparent bg-white/5 pl-10 pr-3 text-white placeholder:text-white/30 focus-visible:border-white/20 focus-visible:ring-white/20 focus-visible:ring-offset-0"
                  />,
                )}

                {fieldWrap(
                  "email",
                  <Mail
                    className={cn(
                      "absolute left-3 h-4 w-4 transition-all duration-300",
                      focusedInput === "email" ? "text-white" : "text-white/40",
                    )}
                  />,
                  <Input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                    onFocus={() => setFocusedInput("email")}
                    onBlur={() => setFocusedInput(null)}
                    className="h-10 w-full border-transparent bg-white/5 pl-10 pr-3 text-white placeholder:text-white/30 focus-visible:border-white/20 focus-visible:ring-white/20 focus-visible:ring-offset-0"
                  />,
                )}

                {fieldWrap(
                  "password",
                  <Lock
                    className={cn(
                      "absolute left-3 h-4 w-4 transition-all duration-300",
                      focusedInput === "password" ? "text-white" : "text-white/40",
                    )}
                  />,
                  <>
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      autoComplete="new-password"
                      placeholder="Password (8+ characters)"
                      value={password}
                      onChange={(ev) => setPassword(ev.target.value)}
                      onFocus={() => setFocusedInput("password")}
                      onBlur={() => setFocusedInput(null)}
                      className="h-10 w-full border-transparent bg-white/5 pl-10 pr-10 text-white placeholder:text-white/30 focus-visible:border-white/20 focus-visible:ring-white/20 focus-visible:ring-offset-0"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 cursor-pointer rounded p-0.5 text-white/40 transition-colors hover:text-white"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </button>
                  </>,
                )}

                {fieldWrap(
                  "confirm",
                  <Lock
                    className={cn(
                      "absolute left-3 h-4 w-4 transition-all duration-300",
                      focusedInput === "confirm" ? "text-white" : "text-white/40",
                    )}
                  />,
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="confirm-password"
                    autoComplete="new-password"
                    placeholder="Confirm password"
                    value={confirm}
                    onChange={(ev) => setConfirm(ev.target.value)}
                    onFocus={() => setFocusedInput("confirm")}
                    onBlur={() => setFocusedInput(null)}
                    className="h-10 w-full border-transparent bg-white/5 pl-10 pr-3 text-white placeholder:text-white/30 focus-visible:border-white/20 focus-visible:ring-white/20 focus-visible:ring-offset-0"
                  />,
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="group/button relative mt-4 w-full"
                >
                  <div className="absolute inset-0 rounded-lg bg-white/10 opacity-0 blur-lg transition-opacity duration-300 group-hover/button:opacity-70" />
                  <div className="relative flex h-10 items-center justify-center overflow-hidden rounded-lg bg-white font-medium text-black">
                    <motion.div
                      className="absolute inset-0 -z-10 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{
                        duration: 1.5,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                      style={{
                        opacity: isLoading ? 1 : 0,
                        transition: "opacity 0.3s ease",
                      }}
                    />
                    <AnimatePresence mode="wait">
                      {isLoading ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-black/70 border-t-transparent" />
                        </motion.div>
                      ) : (
                        <motion.span
                          key="t"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-1 text-sm font-medium"
                        >
                          Create account
                          <ArrowRight className="h-3 w-3 transition-transform group-hover/button:translate-x-1" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>

                <div className="relative mb-3 mt-3 flex items-center">
                  <div className="flex-grow border-t border-white/5" />
                  <span className="mx-3 text-xs text-white/40">or</span>
                  <div className="flex-grow border-t border-white/5" />
                </div>

                <motion.button
                  type="button"
                  disabled
                  title="Not available in this demo"
                  className="relative w-full cursor-not-allowed opacity-50"
                >
                  <div className="flex h-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-xs text-white/60">
                    Continue with Google (soon)
                  </div>
                </motion.button>

                <p className="mt-4 text-center text-xs text-white/60">
                  Already have an account?{" "}
                  <Link href="/login" className="group/in relative inline-block font-medium text-white">
                    <span className="transition-colors group-hover/in:text-white/80">Sign in</span>
                    <span className="absolute bottom-0 left-0 h-px w-0 bg-white transition-all group-hover/in:w-full" />
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AuthBackdrop>
  );
}
