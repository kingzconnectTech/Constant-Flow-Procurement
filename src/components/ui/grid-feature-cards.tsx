import { cn } from "@/lib/utils";
import React from "react";

type FeatureType = {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description: string;
  accent?: string;
  index?: string;
};

type FeatureCardProps = React.ComponentProps<"div"> & {
  feature: FeatureType;
};

export function FeatureCard({ feature, className, ...props }: FeatureCardProps) {
  const p = genRandomPattern();
  const accent = feature.accent ?? "#080A7E";

  return (
    <div
      className={cn(
        "relative overflow-hidden p-6 sm:p-7 md:p-8 bg-white border border-[#DDE1EF]/80",
        className
      )}
      {...props}
    >
      <div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#080A7E]/15 via-[#D78034]/10 to-[#080A7E]/5 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] opacity-100">
          <GridPattern
            width={20}
            height={20}
            x="-12"
            y="4"
            squares={p}
            className="fill-[#080A7E]/10 stroke-[#080A7E]/25 absolute inset-0 h-full w-full mix-blend-overlay"
          />
        </div>
      </div>
      {feature.index ? (
        <div className="relative z-10 flex items-start gap-4">
          <div
            className="flex items-center justify-center shrink-0 h-12 w-12 rounded-2xl bg-white shadow-[0_8px_20px_rgba(10,12,26,0.08),inset_0_1px_0_rgba(255,255,255,0.8)] border border-[#DDE1EF]/70"
            style={{ color: accent }}
          >
            <feature.icon className="size-6" strokeWidth={1.75} aria-hidden />
          </div>
          <div className="shrink-0 flex items-end h-12">
            <span
              className="text-[28px] sm:text-[30px] md:text-[32px] font-semibold leading-none tracking-tight"
              style={{ color: `${accent}26` }}
            >
              {feature.index}
            </span>
          </div>
        </div>
      ) : (
        <div
          className="relative z-10 inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-white shadow-[0_8px_20px_rgba(10,12,26,0.08),inset_0_1px_0_rgba(255,255,255,0.8)] border border-[#DDE1EF]/70"
          style={{ color: accent }}
        >
          <feature.icon className="size-6" strokeWidth={1.75} aria-hidden />
        </div>
      )}
      <h3 className="relative z-10 mt-6 text-[17px] sm:text-[18px] md:text-[19px] font-semibold tracking-tight text-[#0A0C1A] leading-snug">
        {feature.title}
      </h3>
      <p className="text-[#5A5E7A] relative z-20 mt-3 text-sm sm:text-[15px] font-normal leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
}

function GridPattern({
  width,
  height,
  x,
  y,
  squares,
  ...props
}: React.ComponentProps<"svg"> & {
  width: number;
  height: number;
  x: string;
  y: string;
  squares?: number[][];
}) {
  const patternId = React.useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={0.7}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([sx, sy], index) => (
            <rect
              strokeWidth="0"
              key={index}
              width={width + 1}
              height={height + 1}
              x={sx * width}
              y={sy * height}
              fill="currentColor"
            />
          ))}
        </svg>
      )}
    </svg>
  );
}

function genRandomPattern(length?: number): number[][] {
  const len = length ?? 5;
  return Array.from({ length: len }, () => [
    Math.floor(Math.random() * 4) + 7,
    Math.floor(Math.random() * 6) + 1,
  ]);
}
