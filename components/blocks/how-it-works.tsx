import { GlowCard } from "@/components/ui/spotlight-card";
import {
  LineChart,
  LucideIcon,
  ScanSearch,
  SlidersHorizontal,
} from "lucide-react";

const STEPS: {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  glowColor: "blue" | "purple" | "green";
}[] = [
  {
    title: "Detect",
    subtitle: "Market extremes",
    icon: ScanSearch,
    glowColor: "blue",
  },
  {
    title: "Interpret",
    subtitle: "Clear indicator data",
    icon: LineChart,
    glowColor: "purple",
  },
  {
    title: "Manage",
    subtitle: "Better decisions, no noise",
    icon: SlidersHorizontal,
    glowColor: "green",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="dark scroll-mt-20 border-t border-white/[0.06] bg-black py-16 md:py-28"
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <h2
          id="how-it-works-heading"
          className="mb-10 text-center text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground md:mb-14"
        >
          How It Works
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3">
          {STEPS.map(({ title, subtitle, icon: Icon, glowColor }) => (
            <GlowCard
              key={title}
              glowColor={glowColor}
              customSize
              className="min-h-[240px] w-full sm:min-h-[260px] lg:min-h-[280px]"
            >
              <div className="relative z-[1] flex h-full flex-col justify-center gap-6 text-left">
                <div className="flex items-start gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black/30 text-white/90 shadow-inner">
                    <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <h3 className="text-xl font-semibold tracking-tight text-card-foreground sm:text-2xl">
                      {title}
                    </h3>
                    <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}
