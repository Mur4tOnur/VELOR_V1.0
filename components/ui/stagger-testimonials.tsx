"use client";

import Image from "next/image";
import React, { useCallback, useLayoutEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SQRT_5000 = Math.sqrt(5000);

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=150&h=150&q=80`;

const testimonials = [
  {
    tempId: 0,
    testimonial:
      "VELOR helped me stop reacting to noise and start reading market context with much more discipline.",
    by: "Deniz A., Crypto Investor",
    imgSrc: unsplash("photo-1573496359142-b8d87734a5a2"),
  },
  {
    tempId: 1,
    testimonial:
      "Having alerts, sentiment, and portfolio visibility in one place makes my workflow cleaner and faster.",
    by: "Kerem T., Multi-Asset Trader",
    imgSrc: unsplash("photo-1507003211169-0a1dd7228f2d"),
  },
  {
    tempId: 2,
    testimonial:
      "The biggest difference is clarity. I can quickly see when conditions are stretched and when patience matters more.",
    by: "Mert Y., Position Trader",
    imgSrc: unsplash("photo-1506794778202-cad84cf45f1d"),
  },
  {
    tempId: 3,
    testimonial:
      "Risk framing finally feels honest—less hype, more context. I use it to sanity-check my sizing before I act.",
    by: "Selin K., Risk Analyst",
    imgSrc: unsplash("photo-1494790108377-be9c29b29330"),
  },
  {
    tempId: 4,
    testimonial:
      "My swing routine is simpler: one screen for sentiment, structure, and where I might be wrong—not three tabs and a dozen opinions.",
    by: "Can Ö., Swing Trader",
    imgSrc: unsplash("photo-1472099645785-5658abf4ff4e"),
  },
  {
    tempId: 5,
    testimonial:
      "Reporting for stakeholders used to take forever. Now the story is visual and consistent—still our judgment, just clearer.",
    by: "Elif S., Family Office Associate",
    imgSrc: unsplash("photo-1438761681033-6461ffad8d80"),
  },
  {
    tempId: 6,
    testimonial:
      "I like that the indicators read like context, not commands. It reduced the urge to overtrade on every flicker.",
    by: "Barış M., Retail Trader",
    imgSrc: unsplash("photo-1500648767791-00dcc994a43e"),
  },
  {
    tempId: 7,
    testimonial:
      "Long horizon, same emotions. VELOR helps me label regimes and wait—especially when the feed is screaming.",
    by: "Zeynep D., Long-Term Investor",
    imgSrc: unsplash("photo-1544725176-7c40e5a71c5e"),
  },
  {
    tempId: 8,
    testimonial:
      "Speed matters for me, but so does layout density. This feels built for scanning under pressure without feeling chaotic.",
    by: "Onur Y., Active Trader",
    imgSrc: unsplash("photo-1519085360753-af011dbf6a62"),
  },
  {
    tempId: 9,
    testimonial:
      "When I explain market backdrops to clients, having one coherent narrative beats juggling five screenshots.",
    by: "Ayşe N., Wealth Advisor",
    imgSrc: unsplash("photo-1524504388940-b1c1722653e1"),
  },
];

type LayoutMetrics = {
  cardSize: number;
  spread: number;
  minHeight: number;
};

function readLayoutMetrics(): LayoutMetrics {
  if (typeof window === "undefined") {
    return { cardSize: 320, spread: 0.85, minHeight: 560 };
  }
  const w = window.innerWidth;

  let cardSize: number;
  if (w < 380) cardSize = 232;
  else if (w < 480) cardSize = 252;
  else if (w < 640) cardSize = 278;
  else if (w < 900) cardSize = 320;
  else cardSize = 365;

  let spread: number;
  if (w < 400) spread = 0.42;
  else if (w < 480) spread = 0.52;
  else if (w < 640) spread = 0.62;
  else if (w < 900) spread = 0.82;
  else spread = 1;

  let minHeight: number;
  if (w < 400) minHeight = Math.max(440, Math.round(cardSize * 1.75));
  else if (w < 640) minHeight = 520;
  else minHeight = 600;

  return { cardSize, spread, minHeight };
}

interface TestimonialCardProps {
  position: number;
  testimonial: (typeof testimonials)[0];
  handleMove: (steps: number) => void;
  cardSize: number;
  spread: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize,
  spread,
}) => {
  const isCenter = position === 0;
  const corner = Math.min(50, Math.round(cardSize * 0.13));
  const stripeTop = Math.round(cardSize * 0.13);
  const translateX = (cardSize / 1.5) * position * spread;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => handleMove(position)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleMove(position);
        }
      }}
      className={cn(
        "absolute left-1/2 top-[42%] cursor-pointer border-2 p-4 transition-all duration-500 ease-in-out sm:top-1/2 sm:p-6 md:p-8",
        isCenter
          ? "z-10 border-primary bg-primary text-primary-foreground"
          : "z-0 border-white/10 bg-black text-white hover:border-white/25",
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(${corner}px 0%, calc(100% - ${corner}px) 0%, 100% ${corner}px, 100% 100%, calc(100% - ${corner}px) 100%, ${corner}px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%)
          translateX(${translateX}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter
          ? "0px 8px 0px 4px hsl(var(--border))"
          : "0px 0px 0px 0px transparent",
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-border"
        style={{
          right: -2,
          top: stripeTop,
          width: SQRT_5000 * (cardSize / 365),
          height: 2,
        }}
      />
      <Image
        src={testimonial.imgSrc}
        alt={testimonial.by.split(",")[0]?.trim() ?? "Customer"}
        width={48}
        height={56}
        className="mb-3 h-12 w-11 bg-muted object-cover object-top sm:mb-4 sm:h-14 sm:w-12"
        style={{
          boxShadow: "3px 3px 0px hsl(var(--background))",
        }}
        sizes="48px"
      />
      <h3
        className={cn(
          "line-clamp-6 text-sm font-medium sm:line-clamp-none sm:text-base md:text-xl",
          isCenter ? "text-primary-foreground" : "text-white",
        )}
      >
        &ldquo;{testimonial.testimonial}&rdquo;
      </h3>
      <p
        className={cn(
          "absolute bottom-4 left-4 right-4 mt-2 text-xs italic sm:bottom-8 sm:left-8 sm:right-8 sm:text-sm",
          isCenter ? "text-primary-foreground/80" : "text-white/60",
        )}
      >
        — {testimonial.by}
      </p>
    </div>
  );
};

const SSR_LAYOUT: LayoutMetrics = {
  cardSize: 320,
  spread: 0.82,
  minHeight: 560,
};

export const StaggerTestimonials: React.FC = () => {
  const [layout, setLayout] = useState<LayoutMetrics>(SSR_LAYOUT);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = useCallback((steps: number) => {
    setTestimonialsList((prev) => {
      const newList = [...prev];
      if (steps > 0) {
        for (let i = steps; i > 0; i--) {
          const item = newList.shift();
          if (!item) return prev;
          newList.push({ ...item, tempId: Math.random() });
        }
      } else {
        for (let i = steps; i < 0; i++) {
          const item = newList.pop();
          if (!item) return prev;
          newList.unshift({ ...item, tempId: Math.random() });
        }
      }
      return newList;
    });
  }, []);

  useLayoutEffect(() => {
    const updateSize = () => setLayout(readLayoutMetrics());
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const { cardSize, spread, minHeight } = layout;

  return (
    <div
      className="relative w-full overflow-hidden bg-black"
      style={{ minHeight }}
    >
      {testimonialsList.map((testimonial, index) => {
        const position = testimonialsList.length % 2
          ? index - (testimonialsList.length + 1) / 2
          : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
            spread={spread}
          />
        );
      })}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 sm:bottom-4">
        <button
          type="button"
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-11 w-11 items-center justify-center text-xl transition-colors sm:h-14 sm:w-14 sm:text-2xl",
            "border-2 border-border bg-background hover:bg-primary hover:text-primary-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="size-5 sm:size-6" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-11 w-11 items-center justify-center text-xl transition-colors sm:h-14 sm:w-14 sm:text-2xl",
            "border-2 border-border bg-background hover:bg-primary hover:text-primary-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight className="size-5 sm:size-6" aria-hidden />
        </button>
      </div>
    </div>
  );
};
