"use client";

import * as React from "react";
import { Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export interface PlanFeature {
  label: string;
  included: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  priceMonthly: number;
  priceYearly: number;
  users: string;
  features: PlanFeature[];
  recommended?: boolean;
  /** Overrides global `buttonLabel` for this plan’s CTA. */
  ctaLabel?: string;
  /** When set, CTA renders as a link (e.g. `mailto:` for sales). */
  ctaHref?: string;
}

export interface PricingModuleProps {
  title?: string;
  subtitle?: string;
  annualBillingLabel?: string;
  buttonLabel?: string;
  plans: PricingPlan[];
  defaultAnnual?: boolean;
  className?: string;
  titleId?: string;
}

export function PricingModule({
  title = "Pricing Plans",
  subtitle = "Choose a plan that fits your needs.",
  annualBillingLabel = "Annual billing",
  buttonLabel = "Get started",
  plans,
  defaultAnnual = false,
  className,
  titleId = "pricing-heading",
}: PricingModuleProps) {
  const [isAnnual, setIsAnnual] = React.useState(defaultAnnual);

  return (
    <div className={cn("w-full px-4 text-foreground md:px-8", className)}>
      <div className="mx-auto max-w-6xl text-center">
        <h2 id={titleId} className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h2>
        <p className="mb-8 text-sm text-muted-foreground sm:text-base">{subtitle}</p>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <Switch
            id="billing-toggle"
            checked={isAnnual}
            onCheckedChange={(next) => setIsAnnual(next)}
            aria-label={annualBillingLabel}
          />
          <label
            htmlFor="billing-toggle"
            className="cursor-pointer text-sm text-muted-foreground select-none"
          >
            {annualBillingLabel}
          </label>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={cn(
                "relative rounded-xl border border-border bg-card transition-all hover:border-primary/30 hover:shadow-md",
                plan.recommended &&
                  "z-[1] scale-[1.02] border-primary ring-1 ring-primary/30 sm:scale-[1.03]",
              )}
            >
              {plan.recommended ? (
                <div className="absolute -top-3 left-1/2 w-fit -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Recommended
                </div>
              ) : null}

              <CardHeader className="pt-8 text-center">
                <div className="mb-4 flex justify-center">{plan.icon}</div>
                <CardTitle className="text-xl sm:text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-xs sm:text-sm">{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="text-center">
                <div className="mb-2 text-3xl font-bold tabular-nums transition-all duration-300">
                  ${isAnnual ? plan.priceYearly : plan.priceMonthly}
                </div>
                <p className="mb-6 text-sm text-muted-foreground">
                  {plan.priceMonthly === 0 && plan.priceYearly === 0
                    ? "Forever"
                    : `/ ${isAnnual ? "year" : "month"}`}
                </p>

                {plan.ctaHref ? (
                  <a
                    href={plan.ctaHref}
                    className={cn(
                      "mb-6 inline-flex h-10 w-full items-center justify-center whitespace-nowrap rounded-lg px-8 text-sm font-medium transition-colors outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary/50",
                      plan.recommended
                        ? "bg-primary text-primary-foreground shadow-sm shadow-black/5 hover:bg-primary/90"
                        : "border border-border bg-background shadow-sm shadow-black/5 hover:bg-muted/30 hover:text-foreground",
                    )}
                  >
                    {plan.ctaLabel ?? buttonLabel}
                  </a>
                ) : (
                  <Button
                    variant={plan.recommended ? "default" : "outline"}
                    className="mb-6 w-full"
                  >
                    {plan.ctaLabel ?? buttonLabel}
                  </Button>
                )}

                <div className="text-left text-sm">
                  {plan.users ? (
                    <>
                      <h3 className="mb-2 font-semibold">Overview</h3>
                      <p className="mb-4 text-muted-foreground">✓ {plan.users}</p>
                    </>
                  ) : null}

                  <h3 className="mb-2 font-semibold">Highlights</h3>
                  <ul className="space-y-2">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        {f.included ? (
                          <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                        ) : (
                          <X className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden />
                        )}
                        <span
                          className={
                            f.included
                              ? "text-muted-foreground"
                              : "text-muted-foreground/60 line-through"
                          }
                        >
                          {f.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
