"use client";

import { Building2, Layers, Monitor, Users } from "lucide-react";

import { PricingModule, type PricingPlan } from "@/components/ui/pricing-module";

const PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    description: "For exploring the VELOR experience",
    icon: <Layers className="size-8 text-primary" aria-hidden />,
    priceMonthly: 0,
    priceYearly: 0,
    users: "",
    ctaLabel: "Get Started",
    ctaHref: "/dashboard",
    features: [
      { label: "Limited dashboard access", included: true },
      { label: "Basic market overview", included: true },
      { label: "Sample alerts", included: true },
      { label: "View-only experience", included: true },
    ],
  },
  {
    id: "basic",
    name: "Basic",
    description: "For individual investors who want clarity",
    icon: <Monitor className="size-8 text-primary" aria-hidden />,
    priceMonthly: 9,
    priceYearly: Math.round(9 * 12 * 0.8),
    users: "1 market · up to 2 brokers",
    ctaLabel: "Start Basic",
    ctaHref: "/dashboard",
    features: [
      { label: "1 market access", included: true },
      { label: "Indicator Engine", included: true },
      { label: "Fear & Greed", included: true },
      { label: "Smart Alerts", included: true },
      { label: "Up to 2 connected brokers", included: true },
    ],
  },
  {
    id: "team",
    name: "Team",
    description: "For active traders managing more context",
    icon: <Users className="size-8 text-primary" aria-hidden />,
    priceMonthly: 29,
    priceYearly: Math.round(29 * 12 * 0.8),
    users: "2 markets · up to 3 brokers",
    ctaLabel: "Choose Team",
    ctaHref: "/dashboard",
    recommended: true,
    features: [
      { label: "2 market access", included: true },
      { label: "Indicator Engine", included: true },
      { label: "Fear & Greed", included: true },
      { label: "Smart Alerts", included: true },
      { label: "Liquidation Heat Map", included: true },
      { label: "Up to 3 connected brokers", included: true },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For advanced users and professional workflows",
    icon: <Building2 className="size-8 text-primary" aria-hidden />,
    priceMonthly: 99,
    priceYearly: Math.round(99 * 12 * 0.8),
    users: "4 markets · unlimited brokers",
    ctaLabel: "Contact Sales",
    ctaHref: "mailto:support@velor.app?subject=VELOR%20Enterprise",
    features: [
      { label: "Full platform access", included: true },
      { label: "4 market access", included: true },
      { label: "Indicator Engine", included: true },
      { label: "Fear & Greed", included: true },
      { label: "Smart Alerts", included: true },
      { label: "Liquidation Heat Map", included: true },
      { label: "Funding / ETF context", included: true },
      { label: "Unlimited broker connections", included: true },
    ],
  },
];

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="dark scroll-mt-20 border-t border-white/[0.06] bg-black py-16 md:py-24 lg:py-28"
      aria-labelledby="pricing-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="mb-6 text-center text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground md:mb-8">
          Pricing
        </p>
        <PricingModule
          titleId="pricing-heading"
          title="Simple, Transparent Pricing"
          subtitle="Choose the plan that fits your workflow."
          annualBillingLabel="Pay annually and save 20%"
          buttonLabel="Get Started"
          plans={PLANS}
          defaultAnnual={false}
          className="px-0"
        />
      </div>
    </section>
  );
}
