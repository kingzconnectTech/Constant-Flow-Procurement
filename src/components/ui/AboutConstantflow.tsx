"use client";

import React from "react";
import {
  CircleDot,
  Target,
  Award,
  TrendingUp,
  Briefcase,
  Zap,
  Wrench,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import aboutBgImage from "@/assets/About_bg.png";

const CAPABILITIES: readonly {
  readonly title: string;
  readonly icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}[] = [
  { title: "Procurement Planning", icon: Target },
  { title: "Supplier Management", icon: Award },
  { title: "Technical Sourcing", icon: Wrench },
  { title: "Logistics Coordination", icon: TrendingUp },
  { title: "Contract Administration", icon: Briefcase },
  { title: "Cost Optimization", icon: Zap },
];

type AnimatedContainerProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

function AnimatedContainer({
  children,
  className,
  delay = 0,
}: AnimatedContainerProps) {
  const shouldReduceMotion = useReducedMotion();
  const initialState = shouldReduceMotion
    ? undefined
    : { opacity: 0, filter: "blur(10px)" };
  const inViewState = shouldReduceMotion
    ? undefined
    : { opacity: 1, filter: "blur(0px)" };
  return (
    <motion.div
      className={className}
      initial={initialState}
      whileInView={inViewState}
      viewport={{ once: true, amount: 0.15, margin: "-8% 0px -8% 0px" }}
      transition={{
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

function CapabilityChip({
  capability,
  index,
}: {
  capability: (typeof CAPABILITIES)[number];
  index: number;
}) {
  const Icon: React.ComponentType<React.SVGProps<SVGSVGElement>> = capability.icon;
  const reduce = Boolean(useReducedMotion());
  const initialState = reduce ? undefined : { opacity: 0, y: 10 };
  const inViewState = reduce ? undefined : { opacity: 1, y: 0 };
  return (
    <motion.div
      initial={initialState}
      whileInView={inViewState}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.12 + index * 0.05,
      }}
      className="group inline-flex items-center gap-2.5 rounded-2xl border border-[#0A0C1A]/8 bg-white/70 backdrop-blur-[2px] px-4 py-3 shadow-[0_10px_26px_rgba(10,12,26,0.05)] transition-all duration-300 hover:-translate-y-[2px] hover:border-[#D78034]/35 hover:shadow-[0_14px_32px_rgba(215,128,52,0.12)]"
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#D78034]/14 via-[#080A7E]/8 to-transparent ring-1 ring-[#0A0C1A]/6">
        <Icon className="h-4.5 w-4.5 text-[#080A7E]" strokeWidth={1.9} />
      </div>
      <span className="text-[13.5px] font-semibold tracking-tight text-[#0A0C1A]/85">
        {capability.title}
      </span>
    </motion.div>
  );
}

export default function AboutConstantflow() {
  return (
    <section className="relative w-full bg-white overflow-hidden py-[28px] sm:py-14 md:py-18 lg:py-20">
      <div className="absolute inset-0 pointer-events-none opacity-70">
        <div className="absolute -top-28 right-0 h-[380px] w-[380px] rounded-full bg-[#D78034]/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-40 h-[420px] w-[420px] rounded-full bg-[#080A7E]/10 blur-3xl" />
        <div className="absolute top-1/3 left-[44%] h-[260px] w-[260px] rounded-full bg-[#0A0C3A]/[0.06] blur-3xl" />
      </div>

      <div className="hidden sm:block absolute inset-y-0 right-0 z-0 w-full lg:w-[48%] xl:w-[46%] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/92 to-transparent lg:w-[44%] xl:w-[38%] z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.98]"
          style={{ backgroundImage: `url(${aboutBgImage})` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-white/40" />
      </div>

      <div className="relative z-10 w-full">
        <div className="relative w-full grid grid-cols-1 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] gap-10 sm:gap-12 lg:gap-0">
          <AnimatedContainer className="space-y-7 sm:space-y-8 lg:space-y-9 px-4 sm:px-6 md:px-10 xl:px-14 2xl:px-20 lg:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))] lg:pr-[2.5rem]">
            <div className="space-y-5 sm:space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#080A7E]/14 bg-[#080A7E]/6 px-3 py-1.5">
                <CircleDot className="w-3.5 h-3.5 text-[#080A7E] fill-[#080A7E]" />
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.24em] text-[#080A7E]">
                  About Constantflow
                </span>
              </div>

              <h2 className="font-semibold tracking-tight text-[#0A0C1A] text-[30px] sm:text-[36px] md:text-[42px] lg:text-[48px] leading-[1.04] tracking-[-0.02em]">
                A Procurement Partner Built for{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-[#D78034] via-[#B35E14] to-[#080A7E] bg-clip-text text-transparent">
                    Industrial Performance.
                  </span>
                </span>
              </h2>

              <div className="space-y-4.5 sm:space-y-5 text-[14.5px] sm:text-[15.5px] leading-[1.8] text-[#4C516E] sm:tracking-[-0.004em]">
                <p>
                  <span className="font-semibold text-[#0A0C1A]/90">
                    Constantflow is a results-driven procurement and supply
                    solutions company supporting the evolving demands of the oil
                    & gas and industrial sectors.
                  </span>{" "}
                  We combine strategic sourcing, technical procurement
                  expertise, efficient supply chain management, and dependable
                  service delivery to help businesses secure the critical
                  equipment, materials, and resources required to keep
                  operations moving.
                </p>

                <p>
                  With strong capabilities across{" "}
                  <span className="font-semibold text-[#0A0C1A]/85">
                    local and international procurement
                  </span>
                  , we source a wide range of industrial requirements,
                  including{" "}
                  <span className="font-semibold text-[#0A0C1A]/85">
                    oil & gas equipment, heavy-duty vehicles and machinery,
                    steel pipes and fittings, technical tools, spare parts,
                    electrical equipment, and essential operational materials
                  </span>{" "}
                  for field, infrastructure, and project-based operations.
                </p>

                <p>
                  Our expertise extends across{" "}
                  <span className="font-semibold text-[#0A0C1A]/85">
                    procurement planning, supplier and vendor management,
                    technical sourcing, logistics coordination, contract
                    administration, and cost optimization
                  </span>
                  . By combining disciplined procurement processes with an
                  established network of local suppliers and international
                  partners across key global markets, particularly Asia, we help
                  clients access quality products at competitive value while
                  maintaining the standards of{" "}
                  <span className="font-semibold text-[#080A7E]/90">
                    quality, compliance, reliability, and operational
                    efficiency
                  </span>
                  .
                </p>

                <p>
                  At Constantflow, our approach is built around one objective:{" "}
                  <span className="font-semibold text-[#0A0C1A]/90">
                    making complex procurement simpler, more reliable, and more
                    effective for our clients.
                  </span>{" "}
                  Through professionalism, innovation, and a commitment to
                  operational excellence, we deliver procurement solutions that
                  support project execution, strengthen business continuity,
                  improve operational performance, and contribute to sustainable
                  growth across the energy and industrial sectors.
                </p>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-5 pt-1 sm:pt-2">
              <div className="flex items-center gap-2">
                <span className="h-px w-10 bg-gradient-to-r from-[#D78034] to-[#080A7E] rounded-full" />
                <span className="text-[12.5px] font-bold uppercase tracking-[0.2em] text-[#0A0C1A]/60">
                  Core Capabilities
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5 sm:gap-3">
                {CAPABILITIES.map((cap, i) => (
                  <CapabilityChip key={cap.title} capability={cap} index={i} />
                ))}
              </div>
            </div>
          </AnimatedContainer>
        </div>
      </div>
    </section>
  );
}
