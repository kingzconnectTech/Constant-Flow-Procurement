import React from "react";
import {
  Globe2,
  Wrench,
  ShieldCheck,
  CircleDollarSign,
  Package,
  Search,
  CircleDot,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { FeatureCard } from "@/components/ui/grid-feature-cards";

const FEATURES = [
  {
    title: "Global Supplier Network",
    icon: Globe2,
    accent: "#D78034",
    description:
      "Access qualified suppliers across Europe, Asia, North America and Africa.",
  },
  {
    title: "Technical Expertise",
    icon: Wrench,
    accent: "#080A7E",
    description:
      "We understand technical specifications, drawings, standards and project requirements to help source the right equipment.",
  },
  {
    title: "Vetted Suppliers",
    icon: ShieldCheck,
    accent: "#2E7D4F",
    description:
      "We identify and work with reliable, qualified suppliers to reduce procurement risk.",
  },
  {
    title: "Competitive Pricing",
    icon: CircleDollarSign,
    accent: "#D78034",
    description:
      "We create competitive sourcing opportunities to help clients achieve better commercial value without compromising requirements.",
  },
  {
    title: "End-to-End Procurement",
    icon: Package,
    accent: "#080A7E",
    description:
      "From supplier identification and quotation to negotiation, logistics and delivery, we support the complete procurement cycle.",
  },
  {
    title: "Hard-to-Find Equipment",
    icon: Search,
    accent: "#0A0C3A",
    description:
      "Need a specialized component or obsolete/OEM part? We help locate difficult-to-source industrial equipment and components through our global network.",
  },
] as const;

export default function ProcurementFeatureGrid() {
  return (
    <section className="relative w-full bg-brand-page overflow-hidden py-16 sm:py-20 md:py-24 lg:py-28">
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <div className="absolute -top-24 -left-40 h-[340px] w-[340px] rounded-full bg-[#080A7E]/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-40 h-[420px] w-[420px] rounded-full bg-[#D78034]/12 blur-3xl" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 md:px-10 xl:px-14 2xl:px-20">
        <div className="mx-auto w-full max-w-7xl space-y-10 sm:space-y-12 lg:space-y-16">
          <AnimatedContainer className="mx-auto max-w-3xl text-center space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D78034]/20 bg-[#D78034]/8 px-3 py-1.5">
              <CircleDot className="w-3.5 h-3.5 text-[#D78034] fill-[#D78034]" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-[#B35E14]">
                Why Constantflow
              </span>
            </div>

            <h2 className="font-semibold tracking-tight text-[#0A0C1A] text-[32px] sm:text-[40px] lg:text-[46px] leading-[1.04]">
              More Than Procurement.
              <br className="hidden sm:block" /> A Smarter Way to Source.
            </h2>

            <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-[#5A5E7A]">
              From supplier discovery to technical evaluation and delivery,
              Constantflow simplifies complex industrial procurement — giving
              businesses access to reliable sources, competitive options, and
              end-to-end procurement support.
            </p>
          </AnimatedContainer>

          <AnimatedContainer
            delay={0.25}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7"
          >
            {FEATURES.map((feature, i) => (
              <FeatureCard key={i} feature={feature} />
            ))}
          </AnimatedContainer>
        </div>
      </div>
    </section>
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
      initial={{ filter: "blur(4px)", y: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
