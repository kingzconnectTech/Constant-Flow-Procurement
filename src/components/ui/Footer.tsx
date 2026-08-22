"use client";

import React from "react";
import type { ComponentProps, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Factory,
  Boxes,
  Briefcase,
  CircleDot,
  Globe2,
  Mail,
  Phone,
  X,
  Rss,
  Share2,
  Users,
  ArrowUpRight,
} from "lucide-react";
import logoSrc from "@/assets/logo.png";

interface FooterLink {
  readonly title: string;
  readonly href: string;
  readonly icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  readonly highlight?: boolean;
}

interface FooterSection {
  readonly label: string;
  readonly links: readonly FooterLink[];
}

const footerLinks: readonly FooterSection[] = [
  {
    label: "Categories",
    links: [
      { title: "Valves & Actuation", href: "/categories" },
      { title: "Pumps & Compressors", href: "/categories" },
      { title: "Piping, Fittings & Tubing", href: "/categories" },
      { title: "Instrumentation & Control", href: "/categories" },
      { title: "Heavy Machinery & Earth-Moving", href: "/categories" },
      { title: "Categories", href: "/categories" },
    ],
  },
  {
    label: "Company",
    links: [
      { title: "About Constantflow", href: "#about" },
      { title: "Why Constantflow", href: "#why" },
      { title: "How It Works", href: "#how" },
      { title: "Global Presence", href: "#global" },
      { title: "Newsletter", href: "#newsletter" },
    ],
  },
  {
    label: "Contact",
    links: [
      {
        title: "Mgt@constantflow-procurement.com",
        href: "mailto:Mgt@constantflow-procurement.com",
        icon: Mail,
        highlight: true,
      },
      {
        title: "Constantflowprocurement@gmail.com",
        href: "mailto:Constantflowprocurement@gmail.com",
        icon: Mail,
      },
      {
        title: "08108386859",
        href: "tel:+2348108386859",
        icon: Phone,
      },
    ],
  },
  {
    label: "Follow Us",
    links: [
      { title: "LinkedIn", href: "#", icon: Users },
      { title: "X / Twitter", href: "#", icon: X },
      { title: "Blog & Updates", href: "#", icon: Rss },
      { title: "Community", href: "#", icon: Share2 },
    ],
  },
] as const;

type ViewAnimationProps = {
  readonly delay?: number;
  readonly className?: ComponentProps<typeof motion.div>["className"];
  readonly children: ReactNode;
};

function AnimatedContainer({
  className,
  delay = 0.1,
  children,
}: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();
  const initialState = shouldReduceMotion
    ? undefined
    : { filter: "blur(4px)", y: -8, opacity: 0 };
  const inViewState = shouldReduceMotion
    ? undefined
    : { filter: "blur(0px)", y: 0, opacity: 1 };

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={initialState}
      whileInView={inViewState}
      viewport={{ once: true, amount: 0.2, margin: "-6% 0px -6% 0px" }}
      transition={{
        delay,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SocialChip({ link }: { readonly link: FooterLink }) {
  const Icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | undefined =
    link.icon;
  return (
    <a
      href={link.href}
      aria-label={link.title}
      className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/6 backdrop-blur-[2px] transition-all duration-300 hover:-translate-y-[2px] hover:border-[#D78034]/45 hover:bg-[#D78034]/14 hover:shadow-[0_10px_26px_rgba(215,128,52,0.18)]"
    >
      {Icon ? (
        <Icon
          className="h-4 w-4 text-white/75 transition-colors duration-300 group-hover:text-[#ffd89b]"
          strokeWidth={1.9}
        />
      ) : (
        <Globe2
          className="h-4 w-4 text-white/75 transition-colors duration-300 group-hover:text-[#ffd89b]"
          strokeWidth={1.9}
        />
      )}
    </a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden bg-black pt-12 sm:pt-16 md:pt-20 pb-14 sm:pb-20 md:pb-24">
      <div className="absolute inset-0 pointer-events-none opacity-100">
        <div className="absolute -top-24 -left-32 h-[420px] w-[420px] rounded-full bg-[#D78034]/10 blur-3xl" />
        <div className="absolute -bottom-36 right-0 h-[460px] w-[460px] rounded-full bg-[#080A7E]/12 blur-3xl" />
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-80">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D78034]/30 to-transparent" />
      </div>

      <div className="relative z-10 w-full">
        <div className="relative w-full px-4 sm:px-6 md:px-10 xl:px-14 2xl:px-20 pt-0">
          <div className="relative mx-auto w-full max-w-none pt-10 sm:pt-12 md:pt-14 lg:pt-16">
            <div className="grid w-full gap-10 sm:gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.4fr)] lg:gap-12 xl:gap-16 relative z-10">
              <AnimatedContainer delay={0.05} className="space-y-7 sm:space-y-8">
                    <a
                      href="#home"
                      className="inline-flex items-center gap-3 group"
                      aria-label="Constantflow Procurement home"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15 backdrop-blur-[2px] transition-all duration-300 group-hover:ring-[#D78034]/45 group-hover:shadow-[0_12px_30px_rgba(215,128,52,0.20)]">
                        <img
                          src={logoSrc}
                          alt=""
                          aria-hidden
                          className="h-6.5 w-6.5 object-contain"
                        />
                      </span>
                      <div className="flex flex-col leading-tight">
                        <span className="text-[17px] font-bold tracking-[-0.02em] text-white">
                          Constantflow
                        </span>
                        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                          Procurement
                        </span>
                      </div>
                    </a>

                    <p className="text-[14.5px] sm:text-[15px] leading-[1.8] text-white max-w-[46ch]">
                      Industrial procurement for oil &amp; gas, heavy machinery,
                      steel, and technical operations. A disciplined global
                      network, on-shore supplier teams, and end-to-end
                      logistics support — built for uptime.
                    </p>

                    <div className="space-y-3 pt-1">
                      <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-white">
                        <span className="h-px w-6 bg-[#D78034] rounded-full" />
                        Regulated Sectors
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { label: "Oil & Gas", icon: Factory },
                          { label: "Infrastructure", icon: Boxes },
                          { label: "Energy", icon: Globe2 },
                        ].map(({ label, icon: ChipIcon }) => (
                          <span
                            key={label}
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-[12px] font-semibold text-white/80 backdrop-blur-[2px]"
                          >
                            <ChipIcon
                              className="h-3.5 w-3.5 text-[#ffd89b]"
                              strokeWidth={1.9}
                            />
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3 pt-1">
                      <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-white">
                        <CircleDot className="w-3 h-3 text-[#D78034]" />
                        Connect
                      </div>
                      <div className="flex flex-wrap items-center gap-2.5">
                        {footerLinks
                          .find((s) => s.label === "Follow Us")
                          ?.links.map((link) => (
                            <SocialChip key={link.title} link={link} />
                          ))}
                      </div>
                    </div>
                  </AnimatedContainer>

                  <div className="grid grid-cols-2 gap-8 sm:gap-10 md:grid-cols-3 md:gap-10 lg:gap-12">
                    {footerLinks
                      .filter((s) => s.label !== "Follow Us")
                      .map((section, index) => (
                        <AnimatedContainer
                          key={section.label}
                          delay={0.15 + index * 0.1}
                        >
                          <div className="space-y-4 sm:space-y-5">
                            <h3 className="text-[12px] sm:text-[12.5px] font-bold uppercase tracking-[0.22em] text-white">
                              {section.label}
                            </h3>
                            <ul className="space-y-2.5 text-sm">
                              {section.links.map((link) => {
                                const RowIcon:
                                  | React.ComponentType<
                                      React.SVGProps<SVGSVGElement>
                                    >
                                  | undefined = link.icon;
                                return (
                                  <li key={link.title}>
                                    <a
                                      href={link.href}
                                      className={`group inline-flex items-start gap-2.5 text-[14.5px] leading-[1.55] transition-colors duration-300 ${
                                        link.highlight
                                          ? "text-[#ffd89b] font-bold hover:text-white"
                                          : "text-white/90 hover:text-white"
                                      }`}
                                    >
                                      {RowIcon && (
                                        <span className="mt-[2px] shrink-0">
                                          <RowIcon
                                            className={`h-4 w-4 transition-colors duration-300 ${
                                              link.highlight
                                                ? "text-[#D78034] group-hover:text-[#ffd89b]"
                                                : "text-white/70 group-hover:text-[#ffd89b]"
                                            }`}
                                            strokeWidth={1.9}
                                          />
                                        </span>
                                      )}
                                      <span className="inline-flex items-center gap-1.5 break-all">
                                        {link.title}
                                        {!RowIcon && (
                                          <ArrowUpRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 -translate-y-0.5 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 text-[#ffd89b]" />
                                        )}
                                      </span>
                                    </a>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </AnimatedContainer>
                      ))}
                  </div>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent mt-10 sm:mt-12 md:mt-14" />

                <div className="relative z-10 flex flex-col items-start justify-between gap-4 sm:gap-6 pt-6 sm:pt-8 md:flex-row md:items-center">
                  <p className="text-[12.5px] sm:text-[13px] leading-[1.65] text-white/65">
                    © {year} Constantflow Procurement &amp; Supply Solutions. All
                    rights reserved.
                  </p>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] sm:text-[13px] text-white/65">
                    <a
                      href="/privacy"
                      className="transition-colors duration-300 hover:text-white"
                    >
                      Privacy Policy
                    </a>
                    <span className="h-1 w-1 rounded-full bg-white/25" aria-hidden />
                    <a
                      href="/terms"
                      className="transition-colors duration-300 hover:text-white"
                    >
                      Terms of Service
                    </a>
                    <span className="h-1 w-1 rounded-full bg-white/25" aria-hidden />
                    <a
                      href="/cookies"
                      className="transition-colors duration-300 hover:text-white"
                    >
                      Cookies
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </footer>
  );
}
