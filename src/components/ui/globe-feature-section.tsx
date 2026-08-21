"use client";

import React from "react";
import { CircleDot, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import globeImage from "@/assets/globe.png";

const REGIONS = [
  {
    name: "EUROPE",
    copy: "Industrial equipment, OEM products, engineering components and specialized machinery.",
  },
  {
    name: "ASIA",
    copy: "Manufacturing, industrial components, machinery, electrical equipment and competitive sourcing.",
  },
  {
    name: "NORTH AMERICA",
    copy: "Specialized equipment, heavy machinery, OEM components and technical products.",
  },
  {
    name: "AFRICA",
    copy: "Regional sourcing, local suppliers, industrial equipment and supply-chain support.",
  },
] as const;

export default function GlobalPresence() {
  return (
    <section className="relative w-full overflow-hidden bg-[#08090B] pt-10 pb-14 sm:pt-12 sm:pb-16 md:pt-14 md:pb-20 lg:pt-12 lg:pb-20">
      <div className="relative w-full">
        <div className="relative flex flex-col items-center justify-between gap-8 md:gap-10 lg:gap-12 lg:flex-row">
          <AnimatedContainer className="relative z-10 w-full px-4 sm:px-6 md:px-10 xl:px-14 2xl:px-20 lg:w-[55%] lg:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]">
            <div className="max-w-2xl space-y-6 sm:space-y-7 lg:space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5">
                <CircleDot className="w-3.5 h-3.5 text-white/80 fill-white/80" />
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.26em] text-white/85">
                  Our Global Network
                </span>
              </div>

              <div className="space-y-5 sm:space-y-6">
                <h1 className="font-semibold tracking-tight text-white text-[34px] sm:text-[40px] md:text-[46px] lg:text-[52px] leading-[1.04] tracking-[-0.02em]">
                  Sourcing Without Borders.
                </h1>
                <p className="max-w-xl text-[15px] sm:text-[16px] md:text-[17px] leading-relaxed text-white/60">
                  Our procurement network extends across key industrial markets in Europe, Asia, North America and Africa, connecting businesses with reliable suppliers and manufacturers wherever the right equipment can be found.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 sm:gap-y-6 pt-1 border-t border-white/5">
                {REGIONS.map((region, i) => (
                  <RegionItem key={region.name} region={region} delay={0.22 + i * 0.08} />
                ))}
              </div>

              <div className="pt-2">
                <p className="max-w-xl text-[15px] sm:text-[16px] font-semibold tracking-tight text-white/90 leading-snug">
                  One global network. Multiple sourcing markets. One procurement partner.
                </p>
              </div>
            </div>
          </AnimatedContainer>

          <AnimatedContainer delay={0.3} className="relative w-full lg:w-[45%] lg:absolute lg:top-1/2 lg:right-0 lg:-translate-y-1/2 lg:-translate-y-[6%]">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] lg:aspect-square lg:h-[82vh] lg:min-h-[560px]">
              <div className="pointer-events-none absolute -inset-y-24 left-0 w-[260px] bg-gradient-to-r from-[#08090B] via-[#08090B]/90 to-transparent z-20" />
              <img
                src={globeImage}
                alt="Global network of procurement markets"
                className="absolute inset-0 w-full h-full object-contain object-[55%_center] sm:object-[60%_center] md:object-[58%_center] lg:object-[52%_45%] lg:scale-[0.82] xl:scale-[0.86] 2xl:scale-[0.92] select-none"
                draggable={false}
              />
            </div>
          </AnimatedContainer>
        </div>
      </div>
    </section>
  );
}

type RegionT = (typeof REGIONS)[number];

function RegionItem({ region, delay = 0 }: { region: RegionT; delay?: number }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className="pt-6 space-y-2">
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-white/80" strokeWidth={2.25} />
          <h3 className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.22em] text-white/90">
            {region.name}
          </h3>
        </div>
        <p className="pl-[22px] text-[13px] sm:text-[14px] leading-relaxed text-white/55">
          {region.copy}
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ filter: "blur(3px)", y: 6, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="pt-6 space-y-2"
    >
      <div className="flex items-center gap-2">
        <MapPin className="w-3.5 h-3.5 text-white/80" strokeWidth={2.25} />
        <h3 className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.22em] text-white/90">
          {region.name}
        </h3>
      </div>
      <p className="pl-[22px] text-[13px] sm:text-[14px] leading-relaxed text-white/55">
        {region.copy}
      </p>
    </motion.div>
  );
}

type AnimatedContainerProps = {
  delay?: number;
  className?: React.ComponentProps<typeof motion.div>["className"];
  children: React.ReactNode;
};

function AnimatedContainer({
  className,
  delay = 0.1,
  children,
}: AnimatedContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", y: 12, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
