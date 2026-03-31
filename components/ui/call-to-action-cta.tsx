"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface CtaCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageSrc: string;
  title: string;
  description: string;
  titleId?: string;
  inputPlaceholder?: string;
  buttonText: string;
  onButtonClick?: (email: string) => void;
  /** When set with `secondaryButtonHref`, shows two actions instead of the email form. */
  secondaryButtonText?: string;
  primaryHref?: string;
  secondaryHref?: string;
}

const CtaCard = React.forwardRef<HTMLDivElement, CtaCardProps>(
  (
    {
      className,
      imageSrc,
      title,
      description,
      titleId,
      inputPlaceholder = "Email address",
      buttonText,
      onButtonClick,
      secondaryButtonText,
      primaryHref,
      secondaryHref,
      ...props
    },
    ref,
  ) => {
    const [email, setEmail] = React.useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onButtonClick?.(email);
      setEmail("");
    };

    const useDualLinks = Boolean(
      secondaryButtonText && secondaryHref && primaryHref,
    );

    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full min-h-[280px] overflow-hidden rounded-xl border border-white/10 bg-card text-card-foreground shadow-lg sm:min-h-[300px] md:min-h-[320px]",
          className,
        )}
        {...props}
      >
        <Image
          src={imageSrc}
          alt=""
          fill
          className="object-cover opacity-95 saturate-[0.85]"
          sizes="(max-width: 768px) 100vw, min(1152px, 100vw)"
          priority={false}
        />
        {/* Premium violet mist — aligns with `--primary` (~263°); replaces teal cast from photo */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background: `
              radial-gradient(ellipse 110% 75% at 78% 12%, hsla(263, 72%, 54%, 0.42) 0%, transparent 58%),
              radial-gradient(ellipse 75% 60% at 18% 58%, hsla(270, 68%, 48%, 0.32) 0%, transparent 54%),
              radial-gradient(ellipse 65% 50% at 92% 78%, hsla(280, 62%, 44%, 0.26) 0%, transparent 50%),
              radial-gradient(ellipse 50% 40% at 48% 38%, hsla(258, 65%, 46%, 0.18) 0%, transparent 52%)
            `,
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-[2] mix-blend-soft-light"
          style={{
            background:
              "radial-gradient(ellipse 90% 60% at 65% 30%, hsla(265, 80%, 62%, 0.22) 0%, transparent 55%)",
          }}
          aria-hidden
        />
        <div className="absolute inset-0 z-[3] bg-black/58" aria-hidden />

        <div className="relative z-10 grid min-h-[inherit] grid-cols-1 items-center gap-6 p-6 sm:gap-8 sm:p-8 md:grid-cols-2 md:gap-10 md:p-12 lg:p-16">
          <div className="velor-cta-fade-item flex flex-col items-start text-left text-white">
            <h2
              id={titleId}
              className="text-2xl font-extrabold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl"
            >
              {title}
            </h2>
            <p className="mt-3 max-w-xl text-base text-neutral-200 sm:mt-4 sm:text-lg">{description}</p>
          </div>

          <div className="velor-cta-fade-item velor-cta-fade-item-delay flex w-full max-w-md flex-col items-stretch justify-center md:mx-auto md:max-w-lg">
            {useDualLinks ? (
              <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-stretch">
                <Link
                  href={primaryHref!}
                  className={cn(
                    "inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-8 text-sm font-medium text-black transition-colors hover:bg-neutral-200",
                    "outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary/50",
                  )}
                >
                  {buttonText}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
                <Link
                  href={secondaryHref!}
                  className={cn(
                    "inline-flex h-12 shrink-0 items-center justify-center rounded-lg border border-white/40 bg-transparent px-8 text-sm font-medium text-white transition-colors hover:bg-white/10 hover:text-white",
                    "outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary/50",
                  )}
                >
                  {secondaryButtonText}
                </Link>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex w-full flex-col gap-3 sm:flex-row sm:items-stretch"
              >
                <Input
                  type="email"
                  placeholder={inputPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 flex-1 rounded-lg border-neutral-600 bg-neutral-900/60 text-white placeholder:text-neutral-400 focus-visible:ring-offset-0"
                  aria-label={inputPlaceholder}
                  required
                  autoComplete="email"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 shrink-0 rounded-lg bg-white text-black hover:bg-neutral-200"
                >
                  {buttonText}
                  <ArrowRight className="ml-2 size-4" aria-hidden />
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  },
);

CtaCard.displayName = "CtaCard";

export { CtaCard };
