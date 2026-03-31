import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Activity, Bell, Gauge, LucideIcon, ShieldAlert } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";

type AlertTone = "bull" | "bear" | "fade";

type FeatureImage = {
  variant: "image";
  icon: LucideIcon;
  title: string;
  description: string;
  darkSrc: string;
  lightSrc: string;
  alt: string;
};

type FeatureGauge = {
  variant: "gauge";
  icon: LucideIcon;
  title: string;
  description: string;
  indexValue: number;
};

type FeatureAlerts = {
  variant: "alerts";
  icon: LucideIcon;
  title: string;
  description: string;
  alerts: { symbol: string; label: string; tone: AlertTone }[];
};

type FeatureItem = FeatureImage | FeatureGauge | FeatureAlerts;

const FEATURE_ITEMS: FeatureItem[] = [
  {
    variant: "image",
    icon: Activity,
    title: "Indicator Engine",
    description:
      "Detect stretched, overheated, discounted, and value conditions with VELOR’s market context engine.",
    darkSrc:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1207&h=929&q=80",
    lightSrc:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1207&h=929&q=80",
    alt: "Trading charts and market data",
  },
  {
    variant: "gauge",
    icon: Gauge,
    title: "Fear & Greed",
    description:
      "Track sentiment and emotional extremes with a clean market mood layer built for fast context.",
    indexValue: 62,
  },
  {
    variant: "alerts",
    icon: Bell,
    title: "Smart Alerts",
    description:
      "Surface FADE, OVERHEAT, DISCOUNT, and VALUE conditions without drowning in noisy signals.",
    alerts: [
      { symbol: "BTC", label: "DISCOUNT", tone: "bull" },
      { symbol: "ETH", label: "VALUE", tone: "bull" },
      { symbol: "NQ", label: "FADE", tone: "fade" },
      { symbol: "SPX", label: "OVERHEAT", tone: "bear" },
    ],
  },
  {
    variant: "image",
    icon: ShieldAlert,
    title: "Portfolio Risk",
    description:
      "See allocation, concentration, and cash exposure in one place so every position stays intentional.",
    darkSrc:
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1207&h=929&q=80",
    lightSrc:
      "https://images.unsplash.com/photo-1554224154-22dec7c081ca?auto=format&fit=crop&w=1207&h=929&q=80",
    alt: "Finance and risk overview",
  },
];

function FearGreedGaugeMock({ value }: { value: number }) {
  const clamped = Math.min(100, Math.max(0, value));
  const pct = `${clamped}%`;
  const zone =
    clamped <= 25
      ? "Extreme fear"
      : clamped <= 45
        ? "Fear"
        : clamped <= 55
          ? "Neutral"
          : clamped <= 75
            ? "Greed"
            : "Extreme greed";

  return (
    <div
      className="relative flex flex-col items-center justify-center gap-4 px-2 py-4"
      role="group"
      aria-label={`Mock sentiment index ${clamped} out of 100, ${zone}`}
    >
      <div className="relative h-4 w-full max-w-[280px] overflow-hidden rounded-full border border-white/10 bg-black/40 shadow-inner">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-400 opacity-90"
          style={{ width: "100%" }}
        />
        <div
          className="absolute top-1/2 z-[1] size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-zinc-900 shadow-md ring-2 ring-white/20"
          style={{ left: pct }}
          aria-hidden
        />
      </div>
      <div className="text-center">
        <p className="text-4xl font-semibold tabular-nums tracking-tight text-card-foreground sm:text-5xl">
          {clamped}
        </p>
        <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Index · 0–100
        </p>
        <p className="mt-2 text-sm text-muted-foreground">{zone}</p>
      </div>
    </div>
  );
}

function SmartAlertsMock({
  alerts,
}: {
  alerts: { symbol: string; label: string; tone: AlertTone }[];
}) {
  const toneClass: Record<AlertTone, string> = {
    bull: "border-emerald-500/35 bg-emerald-500/[0.08] text-emerald-100",
    bear: "border-red-500/35 bg-red-500/[0.08] text-red-100",
    fade: "border-amber-500/35 bg-amber-500/[0.08] text-amber-100",
  };

  return (
    <div className="flex flex-col gap-2 px-1 py-2">
      {alerts.map((row) => (
        <div
          key={`${row.symbol}-${row.label}`}
          className={cn(
            "flex flex-wrap items-center justify-between gap-2 rounded-lg border px-3 py-2.5 text-left font-mono text-[11px] uppercase tracking-wide sm:text-xs",
            toneClass[row.tone],
          )}
        >
          <span className="font-semibold text-white/95">{row.symbol}</span>
          <span className="text-[10px] font-medium sm:text-[11px]">
            {row.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export function Features() {
  return (
    <section
      id="features"
      className="dark scroll-mt-20 bg-black py-16 md:py-32"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto max-w-2xl px-6 lg:max-w-5xl">
        <h2
          id="features-heading"
          className="mb-10 text-center text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground"
        >
          Features
        </h2>
        <div className="mx-auto grid gap-4 lg:grid-cols-2">
          {FEATURE_ITEMS.map((item) => (
            <FeatureCard key={item.title}>
              <CardHeader className="space-y-0 p-0 pb-3">
                <CardHeading
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                />
              </CardHeader>

              <CardContent className="pt-0">
                <div className="relative mb-6 sm:mb-0">
                  <div className="absolute -inset-6 [background:radial-gradient(50%_50%_at_75%_50%,transparent,hsl(var(--background))_100%)]" />
                  <div
                    className={cn(
                      "relative overflow-hidden border border-border/80",
                      item.variant === "image"
                        ? "aspect-[76/59]"
                        : "min-h-[200px] sm:min-h-[220px]",
                    )}
                  >
                    {item.variant === "image" && (
                      <DualModeImage
                        darkSrc={item.darkSrc}
                        lightSrc={item.lightSrc}
                        alt={item.alt}
                        width={1207}
                        height={929}
                      />
                    )}
                    {item.variant === "gauge" && (
                      <FearGreedGaugeMock value={item.indexValue} />
                    )}
                    {item.variant === "alerts" && (
                      <SmartAlertsMock alerts={item.alerts} />
                    )}
                  </div>
                </div>
              </CardContent>
            </FeatureCard>
          ))}
        </div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  children: ReactNode;
  className?: string;
}

const FeatureCard = ({ children, className }: FeatureCardProps) => (
  <Card
    className={cn(
      "group relative rounded-none border-border/80 bg-card/80 shadow-zinc-950/20 backdrop-blur-sm",
      className,
    )}
  >
    <CardDecorator />
    {children}
  </Card>
);

const CardDecorator = () => (
  <>
    <span className="border-primary absolute -left-px -top-px block size-2 border-l-2 border-t-2" />
    <span className="border-primary absolute -right-px -top-px block size-2 border-r-2 border-t-2" />
    <span className="border-primary absolute -bottom-px -left-px block size-2 border-b-2 border-l-2" />
    <span className="border-primary absolute -bottom-px -right-px block size-2 border-b-2 border-r-2" />
  </>
);

interface CardHeadingProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const CardHeading = ({ icon: Icon, title, description }: CardHeadingProps) => (
  <div className="p-6 pb-2">
    <span className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
      <Icon className="size-4 shrink-0" aria-hidden />
      {title}
    </span>
    <p className="mt-6 text-balance text-xl font-semibold leading-snug tracking-tight text-card-foreground sm:text-2xl">
      {description}
    </p>
  </div>
);

interface DualModeImageProps {
  darkSrc: string;
  lightSrc: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

const DualModeImage = ({
  darkSrc,
  lightSrc,
  alt,
  width,
  height,
  className,
}: DualModeImageProps) => (
  <>
    <Image
      src={darkSrc}
      className={cn("hidden size-full object-cover dark:block", className)}
      alt={`${alt} (dark)`}
      width={width}
      height={height}
      sizes="(min-width: 1024px) 50vw, 100vw"
    />
    <Image
      src={lightSrc}
      className={cn("size-full object-cover shadow dark:hidden", className)}
      alt={`${alt} (light)`}
      width={width}
      height={height}
      sizes="(min-width: 1024px) 50vw, 100vw"
    />
  </>
);
