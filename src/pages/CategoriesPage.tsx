"use client";

import { useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  CircleDot,
  Search,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  SlidersHorizontal,
  Flame,
  Truck,
  Zap,
  Boxes,
  Wrench,
  Cpu,
  Layers,
} from "lucide-react";
import DarkHeader from "../components/DarkHeader";
import Footer from "../components/ui/Footer";
import { RouterLink } from "../router";

import condenserAsset from "@/assets/condenser.png";
import excavatorAsset from "@/assets/excavator.png";
import transformerAsset from "@/assets/transformer.png";
import pipeAsset from "@/assets/pipe.png";

type CategoryItem = {
  id: string;
  title: string;
  categoryGroup: string;
  accent: string;
  badge: string;
  image: string;
  description: string;
  items: string[];
  standards: string[];
  leadTime: string;
};

const CATEGORIES_DATA: CategoryItem[] = [
  {
    id: "oil-gas",
    title: "Oil & Gas Equipment",
    categoryGroup: "Energy",
    accent: "#D78034",
    badge: "Exploration & Production",
    image: condenserAsset,
    description:
      "Engineered equipment built to withstand extreme operating pressures, corrosive environments, and stringent offshore/onshore standards.",
    items: [
      "Centrifugal & Multistage Pumps",
      "Gas Compressors & Turbines",
      "High-Pressure Gate, Ball & Butterfly Valves",
      "Wellhead & Christmas Tree Assemblies",
      "Separators, Heat Exchangers & Pressure Vessels",
      "Drilling Tools & Casing Equipment",
    ],
    standards: ["API 6D", "API 6A", "ASME Section VIII", "NACE MR0175", "ISO 9001"],
    leadTime: "Standard & Fast-Track",
  },
  {
    id: "heavy-equipment",
    title: "Heavy Equipment & Machinery",
    categoryGroup: "Construction",
    accent: "#080A7E",
    badge: "Earthmoving & Lifting",
    image: excavatorAsset,
    description:
      "Heavy-duty construction, mining, and earthmoving machinery sourced directly from certified original equipment manufacturers.",
    items: [
      "Hydraulic Excavators & Bulldozers",
      "Rough-Terrain & Crawler Cranes",
      "Wheel Loaders & Motor Graders",
      "Heavy Duty Dump Trucks & Trailers",
      "Piling Rigs & Foundation Equipment",
      "OEM Spare Parts & Undercarriage Kits",
    ],
    standards: ["CE Certified", "ISO 12100", "OSHA Compliant", "EPA Tier 4 / Euro VI"],
    leadTime: "Ex-Stock & Scheduled",
  },
  {
    id: "pipes-fittings",
    title: "Steel Pipes, Flanges & Fittings",
    categoryGroup: "Piping",
    accent: "#FFD89B",
    badge: "Tubular & Structural",
    image: pipeAsset,
    description:
      "Comprehensive range of seamless and welded steel pipes, high-yield fittings, and forged flanges for pipeline and refinery infrastructure.",
    items: [
      "Seamless (SMLS) & Welded (ERW, LSAW, SSAW) Pipes",
      "Carbon, Stainless, Alloy & Duplex Steel",
      "Forged Flanges (WN, BLIND, SO, SW, THREADED)",
      "Butt-Weld Elbows, Tees, Reducers & Caps",
      "High-Pressure Forged Fittings (3000# - 9000#)",
      "Structural Steel Beams, Plates & Tubulars",
    ],
    standards: ["ASTM A106 / A53", "API 5L (PSL1/PSL2)", "ASME B16.5 / B16.9", "EN 10204 3.1/3.2"],
    leadTime: "Mill Orders & Warehouse Stock",
  },
  {
    id: "power-electrical",
    title: "Power & Electrical Systems",
    categoryGroup: "Electrical",
    accent: "#0A0C3A",
    badge: "Generation & Distribution",
    image: transformerAsset,
    description:
      "Reliable power generation systems, high-voltage transformers, switchgear, and hazardous-area electrical supplies for continuous industrial operation.",
    items: [
      "Oil-Immersed & Dry-Type Power Transformers",
      "Medium & Low Voltage Switchgear Panels",
      "Industrial Diesel & Gas Generator Sets",
      "Variable Frequency Drives (VFD) & Motor Starters",
      "Explosion-Proof (ATEX / IECEx) Enclosures & Lighting",
      "Armored Power, Control & Instrumentation Cables",
    ],
    standards: ["IEC 60076", "IEEE C57", "ATEX / IECEx", "UL Listed", "ISO 14001"],
    leadTime: "Custom Built & Standard",
  },
  {
    id: "industrial-tools",
    title: "Technical Tools & Spare Parts",
    categoryGroup: "Maintenance",
    accent: "#2E7D4F",
    badge: "MRO & Safety",
    image: pipeAsset,
    description:
      "Critical maintenance, repair, and operations (MRO) supplies, pneumatic tools, precision measuring instruments, and certified safety gear.",
    items: [
      "Hydraulic Torque Wrenches & Bolt Tensioners",
      "Pneumatic & Electric Industrial Power Tools",
      "Precision Gauges, Transmitters & Calibrators",
      "Industrial Fasteners, Stud Bolts & Gaskets",
      "Personal Protective Equipment (PPE) & Fall Protection",
      "Plant Maintenance Consumables & Specialty Lubricants",
    ],
    standards: ["ISO 6789", "ANSI / ISEA", "EN 388", "DIN Standards"],
    leadTime: "Immediate Dispatch Available",
  },
  {
    id: "instrumentation-automation",
    title: "Instrumentation & Controls",
    categoryGroup: "Automation",
    accent: "#D78034",
    badge: "Process Automation",
    image: condenserAsset,
    description:
      "Advanced process automation sensors, flow measurement systems, control valves, and telemetry equipment for plant monitoring.",
    items: [
      "Pressure, Temperature & Level Transmitters",
      "Electromagnetic, Ultrasonic & Coriolis Flowmeters",
      "Pneumatic & Electric Control Valves with Positioners",
      "PLC / DCS Modules & SCADA Interfaces",
      "Gas Detection & Fire Safety Monitoring Systems",
      "Signal Conditioning & Isolators",
    ],
    standards: ["HART Protocol", "Foundation Fieldbus", "SIL 2 / SIL 3", "ISO 9001"],
    leadTime: "Configured to Spec",
  },
];

const FILTER_TABS = [
  { id: "all", label: "All Categories", icon: Layers },
  { id: "Energy", label: "Oil & Gas", icon: Flame },
  { id: "Construction", label: "Heavy Machinery", icon: Truck },
  { id: "Piping", label: "Pipes & Steel", icon: Boxes },
  { id: "Electrical", label: "Power & Electrical", icon: Zap },
  { id: "Maintenance", label: "MRO & Tools", icon: Wrench },
  { id: "Automation", label: "Instrumentation", icon: Cpu },
];

export default function CategoriesPage() {
  const [selectedGroup, setSelectedGroup] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const reduceMotion = useReducedMotion();

  const filteredCategories = useMemo(() => {
    return CATEGORIES_DATA.filter((cat) => {
      const matchesGroup =
        selectedGroup === "all" || cat.categoryGroup === selectedGroup;
      const matchesSearch =
        searchQuery.trim() === "" ||
        cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.items.some((item) =>
          item.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesGroup && matchesSearch;
    });
  }, [selectedGroup, searchQuery]);

  return (
    <div className="app-shell bg-[#F8F9FC] text-[#0A0C1A]">
      <DarkHeader />

      <main>
        {/* ── Hero Banner ── */}
        <section className="relative w-full overflow-hidden bg-[#0A0C1A] text-white pt-28 pb-16 sm:pt-36 sm:pb-20 md:pt-40 md:pb-24">
          {/* Ambient Glows */}
          <div className="absolute inset-0 pointer-events-none opacity-80">
            <div className="absolute -top-32 -left-32 h-[460px] w-[460px] rounded-full bg-[#D78034]/20 blur-3xl" />
            <div className="absolute -bottom-36 right-0 h-[480px] w-[480px] rounded-full bg-[#080A7E]/30 blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[340px] w-[340px] rounded-full bg-[#080A7E]/15 blur-3xl" />
          </div>

          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D78034]/35 to-transparent" />

          <div className="relative z-10 w-full px-4 sm:px-6 md:px-10 xl:px-14 2xl:px-20">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              {/* Breadcrumb / Badge */}
              <motion.div
                initial={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-1.5 backdrop-blur-md"
              >
                <CircleDot className="w-3.5 h-3.5 text-[#D78034]" />
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-[#ffd89b]">
                  Procurement Catalog &amp; Capabilities
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.08]"
              >
                Equipment &amp; Material{" "}
                <span className="bg-gradient-to-r from-[#D78034] via-[#e69a50] to-[#ffd89b] bg-clip-text text-transparent">
                  Categories
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-[15px] sm:text-base md:text-lg text-zinc-300 leading-relaxed max-w-2xl mx-auto"
              >
                We supply mission-critical industrial equipment, structural
                piping, heavy machinery, and technical supplies through a vetted
                global network of manufacturers.
              </motion.p>

              {/* Quick Stats Banner */}
              <motion.div
                initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="pt-4 flex flex-wrap items-center justify-center gap-3"
              >
                {[
                  { label: "6 Core Sectors", icon: Boxes },
                  { label: "API / ASME / ISO Standards", icon: ShieldCheck },
                  { label: "End-to-End Logistics", icon: Truck },
                  { label: "Strict QA & Mill Certs", icon: CheckCircle2 },
                ].map(({ label, icon: StatIcon }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3.5 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-sm"
                  >
                    <StatIcon className="h-3.5 w-3.5 text-[#D78034]" strokeWidth={2} />
                    {label}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Search & Filter Controls ── */}
        <section className="relative z-20 -mt-7 w-full px-4 sm:px-6 md:px-10 xl:px-14 2xl:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl border border-[#0A0C1A]/10 bg-white p-4 sm:p-5 shadow-[0_16px_40px_rgba(10,12,26,0.08)] flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search Bar */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#0A0C1A]/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search equipment or parts..."
                  className="w-full rounded-xl border border-[#0A0C1A]/10 bg-[#F8F9FC] pl-10 pr-4 py-2.5 text-sm font-medium text-[#0A0C1A] placeholder:text-[#0A0C1A]/40 outline-none transition-all focus:border-[#D78034]/60 focus:bg-white focus:shadow-[0_0_0_3px_rgba(215,128,52,0.12)]"
                />
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
                {FILTER_TABS.map((tab) => {
                  const Icon = tab.icon;
                  const active = selectedGroup === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setSelectedGroup(tab.id)}
                      className={`inline-flex shrink-0 items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all duration-200 ${
                        active
                          ? "bg-[#0A0C1A] text-white shadow-md shadow-[#0A0C1A]/20"
                          : "bg-transparent text-[#5A5E7A] hover:bg-[#0A0C1A]/5 hover:text-[#0A0C1A]"
                      }`}
                    >
                      <Icon className={`h-3.5 w-3.5 ${active ? "text-[#D78034]" : "text-[#5A5E7A]"}`} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── Category Cards Grid ── */}
        <section className="relative w-full px-4 sm:px-6 md:px-10 xl:px-14 2xl:px-20 py-12 sm:py-16 md:py-20">
          <div className="mx-auto max-w-7xl space-y-10 sm:space-y-12">
            {filteredCategories.length === 0 ? (
              <div className="rounded-3xl border border-[#0A0C1A]/10 bg-white p-12 text-center space-y-3">
                <SlidersHorizontal className="h-10 w-10 text-[#5A5E7A] mx-auto opacity-50" />
                <h3 className="text-lg font-bold text-[#0A0C1A]">No categories found</h3>
                <p className="text-sm text-[#5A5E7A]">
                  Try adjusting your search terms or filter selection.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedGroup("all");
                    setSearchQuery("");
                  }}
                  className="mt-2 text-xs font-bold text-[#D78034] uppercase tracking-wider hover:underline"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                {filteredCategories.map((cat, index) => (
                  <motion.div
                    key={cat.id}
                    initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                      delay: (index % 2) * 0.1,
                    }}
                    className="group relative flex flex-col justify-between rounded-3xl border border-[#0A0C1A]/8 bg-white p-6 sm:p-8 shadow-[0_12px_36px_rgba(10,12,26,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D78034]/35 hover:shadow-[0_20px_50px_rgba(215,128,52,0.14)] overflow-hidden"
                  >
                    {/* Top ambient glow on hover */}
                    <div className="absolute top-0 right-0 h-44 w-44 rounded-full bg-[#D78034]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="space-y-6">
                      {/* Header with badge + image thumbnail */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2">
                          <div className="inline-flex items-center gap-2 rounded-full border border-[#0A0C1A]/10 bg-[#F8F9FC] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0A0C1A]/70">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#D78034]" />
                            {cat.badge}
                          </div>
                          <h2 className="text-2xl sm:text-[26px] font-bold text-[#0A0C1A] tracking-tight leading-tight">
                            {cat.title}
                          </h2>
                        </div>

                        {/* Image Preview */}
                        <div className="relative h-18 w-18 sm:h-20 sm:w-20 shrink-0 rounded-2xl bg-gradient-to-br from-[#0A0C1A]/5 to-[#0A0C1A]/10 p-2 border border-[#0A0C1A]/6 flex items-center justify-center overflow-hidden">
                          <img
                            src={cat.image}
                            alt={cat.title}
                            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                      </div>

                      <p className="text-[14.5px] leading-relaxed text-[#5A5E7A]">
                        {cat.description}
                      </p>

                      {/* Item list */}
                      <div className="space-y-2.5 pt-1">
                        <div className="text-[11.5px] font-bold uppercase tracking-[0.2em] text-[#0A0C1A]/45">
                          Typical Sourced Equipment &amp; Materials
                        </div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#0A0C1A]/85">
                          {cat.items.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-[13px] sm:text-[13.5px] leading-snug">
                              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D78034]" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Standards & Lead time badges */}
                      <div className="pt-3 border-t border-[#0A0C1A]/6 flex flex-wrap items-center gap-2">
                        {cat.standards.map((std) => (
                          <span
                            key={std}
                            className="rounded-lg bg-[#0A0C1A]/5 px-2.5 py-1 text-[11px] font-semibold text-[#0A0C1A]/70"
                          >
                            {std}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="mt-8 pt-4 border-t border-[#0A0C1A]/8 flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#5A5E7A]">
                        Lead Time: <span className="text-[#0A0C1A] font-bold">{cat.leadTime}</span>
                      </span>

                      <RouterLink
                        to="/contact"
                        className="group/btn inline-flex items-center gap-2 rounded-full bg-[#0A0C1A] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all duration-200 hover:bg-[#D78034] hover:shadow-[0_8px_20px_rgba(215,128,52,0.3)]"
                      >
                        Request Quote
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                      </RouterLink>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── Bottom CTA Banner ── */}
        <section className="relative w-full bg-[#0A0C1A] text-white py-16 sm:py-20 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-60">
            <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-[#D78034]/25 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-[#080A7E]/30 blur-3xl" />
          </div>

          <div className="relative z-10 w-full px-4 sm:px-6 md:px-10 xl:px-14 2xl:px-20 text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3.5 py-1.5">
              <CircleDot className="w-3 h-3 text-[#D78034]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">
                Custom Sourcing RFQ
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
              Need a Custom Specification or Project Bill of Materials?
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              Our engineering and procurement teams can review your technical
              data sheets and provide competitive proposals with complete origin
              and certification compliance.
            </p>

            <div className="pt-2">
              <RouterLink
                to="/contact"
                className="inline-flex items-center gap-3 rounded-full bg-[#D78034] px-8 py-4 text-sm font-bold text-white shadow-[0_12px_32px_rgba(215,128,52,0.35)] transition-all hover:bg-[#c97328] hover:scale-105"
              >
                Submit Your RFQ Today
                <ArrowRight className="h-4 w-4" />
              </RouterLink>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
