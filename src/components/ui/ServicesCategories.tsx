import { ArrowRight, CircleDot } from "lucide-react";
import { GradientCard } from "@/components/ui/gradient-card";
import { RouterLink } from "@/router";

import condenserAsset from "@/assets/condenser.png";
import excavatorAsset from "@/assets/excavator.png";
import transformerAsset from "@/assets/transformer.png";
import pipeAsset from "@/assets/pipe.png";

type Category = {
  title: string;
  badgeColor: string;
  gradient: "navy" | "gold" | "navy-alt" | "gold-alt";
  imageUrl: string;
  ctaText: string;
  ctaHref: string;
  bullets: string[];
};

const CATEGORIES: Category[] = [
  {
    title: "Oil & Gas Equipment",
    badgeColor: "#D78034",
    gradient: "navy",
    imageUrl: condenserAsset,
    ctaText: "EXPLORE OIL & GAS",
    ctaHref: "#request-rfq",
    bullets: [
      "Pumps & Compressors",
      "Valves & Actuators",
      "Pipes, Fittings & Flanges",
    ],
  },
  {
    title: "Heavy Equipment",
    badgeColor: "#080A7E",
    gradient: "gold",
    imageUrl: excavatorAsset,
    ctaText: "EXPLORE HEAVY EQUIPMENT",
    ctaHref: "#request-rfq",
    bullets: [
      "Construction Machinery",
      "Cranes & Hoisting",
      "Generators & Power Systems",
    ],
  },
  {
    title: "Industrial Components",
    badgeColor: "#FFD89B",
    gradient: "navy-alt",
    imageUrl: pipeAsset,
    ctaText: "EXPLORE INDUSTRIAL COMPONENTS",
    ctaHref: "#request-rfq",
    bullets: [
      "Mechanical Components",
      "Electrical Equipment",
      "Instrumentation",
    ],
  },
  {
    title: "Power Equipment",
    badgeColor: "#0A0C3A",
    gradient: "gold-alt",
    imageUrl: transformerAsset,
    ctaText: "EXPLORE POWER EQUIPMENT",
    ctaHref: "#request-rfq",
    bullets: [
      "Transformers & Switchgear",
      "Generators & Turbines",
      "HV / MV / LV Distribution",
    ],
  },
];

export default function ServicesCategories() {
  return (
    <section
      id="services"
      className="relative w-full bg-[#F8F9FC] overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none opacity-70">
        <div className="absolute -top-24 -left-28 h-72 w-72 rounded-full bg-[#D78034]/8 blur-3xl" />
        <div className="absolute top-40 -right-28 h-80 w-80 rounded-full bg-[#080A7E]/8 blur-3xl" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 md:px-10 xl:px-14 2xl:px-20 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 xl:gap-12 items-start">
          <div className="lg:col-span-3 xl:col-span-3 flex flex-col justify-between pl-0">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D78034]/20 bg-[#D78034]/8 px-3 py-1.5">
                <CircleDot className="w-3.5 h-3.5 text-[#D78034] fill-[#D78034]" />
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-[#B35E14]">
                  WHAT WE PROCURE
                </span>
              </div>

              <h2 className="font-semibold tracking-tight text-[#0A0C1A] text-[34px] sm:text-[42px] lg:text-[44px] leading-[1.02]">
                Critical Equipment.
                <br className="hidden sm:block" /> Sourced Globally.
              </h2>

              <p className="max-w-md text-[15px] sm:text-base leading-relaxed text-[#5A5E7A]">
                From oil &amp; gas equipment to heavy machinery, industrial
                components and power systems, we connect businesses with
                reliable sources across global markets.
              </p>
            </div>

            <RouterLink
              to="/categories"
              className="group mt-10 lg:mt-14 inline-flex w-fit items-center gap-2.5 rounded-full border border-[#0A0C1A]/12 bg-white px-5 py-3 text-[13px] sm:text-sm font-bold uppercase tracking-[0.16em] text-[#0A0C1A] shadow-[0_8px_22px_rgba(10,12,26,0.06)] transition-all hover:-translate-y-0.5 hover:border-[#D78034]/40 hover:shadow-[0_12px_30px_rgba(215,128,52,0.14)]"
            >
              VIEW ALL CATEGORIES
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#D78034]" />
            </RouterLink>
          </div>

          <div className="lg:col-span-9 xl:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-5 xl:gap-6 2xl:gap-7">
            {CATEGORIES.map((c) => (
              <GradientCard
                key={c.title}
                badgeColor={c.badgeColor}
                title={c.title}
                ctaText={c.ctaText}
                ctaHref={c.ctaHref}
                imageUrl={c.imageUrl}
                gradient={c.gradient}
                bullets={c.bullets}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
