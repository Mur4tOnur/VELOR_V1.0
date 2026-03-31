"use client";

import React, { useEffect, useId, useState } from "react";

import { cn } from "@/lib/utils";

export function TextHoverEffect({
  text,
  className,
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const gradId = `textGradient-${uid}`;
  const maskGradId = `revealMask-${uid}`;
  const maskId = `textMask-${uid}`;

  const svgRef = React.useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (!svgRef.current) return;
    const svgRect = svgRef.current.getBoundingClientRect();
    const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
    const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
    if (Number.isFinite(cxPercentage) && Number.isFinite(cyPercentage)) {
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  /** viewBox 300×100: stroke in user units — keep ≥1.2 so outlines survive scaling */
  const STROKE = 1.65;
  const textClass =
    "fill-none font-[helvetica] text-7xl font-bold uppercase [text-rendering:geometricPrecision]";

  return (
    <div
      className={cn(
        "relative w-full cursor-pointer select-none uppercase",
        "min-h-[11rem] sm:min-h-[13rem] md:min-h-[15rem]",
        className,
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
    >
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox="0 0 300 100"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        className="pointer-events-none mx-auto block h-full min-h-[10.5rem] w-full max-w-6xl sm:min-h-[12.5rem] md:min-h-[14rem]"
      >
      <defs>
        <linearGradient id={gradId} gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="100%" y2="100%">
          {hovered ? (
            <>
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="25%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#c4b5fd" />
              <stop offset="75%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#7c3aed" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="hsl(263.4, 70%, 58%)" />
              <stop offset="100%" stopColor="hsl(263.4, 70%, 52%)" />
            </>
          )}
        </linearGradient>

        <radialGradient id={maskGradId} gradientUnits="userSpaceOnUse" cx={maskPosition.cx} cy={maskPosition.cy} r="38%">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </radialGradient>
        <mask id={maskId}>
          <rect x="0" y="0" width="100%" height="100%" fill={`url(#${maskGradId})`} />
        </mask>
      </defs>
      {/* Subtle outer echo on hover */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth={STROKE + 0.35}
        strokeLinejoin="round"
        strokeLinecap="round"
        className={cn(textClass, "stroke-violet-400/25")}
        style={{ opacity: hovered ? 0.9 : 0, transition: "opacity 0.25s ease" }}
      >
        {text}
      </text>
      {/* Solid primary outline — always fully drawn (no dash mismatch) */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth={STROKE}
        strokeLinejoin="round"
        strokeLinecap="round"
        className={cn(textClass, "stroke-primary")}
        style={{ strokeOpacity: 0.92 }}
      >
        {text}
      </text>
      {/* Cursor-follow gradient accent */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke={`url(#${gradId})`}
        strokeWidth={STROKE}
        strokeLinejoin="round"
        strokeLinecap="round"
        mask={`url(#${maskId})`}
        className={textClass}
      >
        {text}
      </text>
      </svg>
    </div>
  );
}

export function FooterBackgroundGradient() {
  return <div className="absolute inset-0 z-0 bg-black" aria-hidden />;
}
