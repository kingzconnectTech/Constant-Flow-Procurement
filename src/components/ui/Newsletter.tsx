"use client";

import React, { useState } from "react";
import {
  Bell,
  ArrowRight,
  Mail,
  CircleDot,
  Users,
  Building2,
  CheckCircle2,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

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

type Role = "supplier" | "buyer";

const ROLE_OPTIONS: readonly {
  readonly value: Role;
  readonly label: string;
  readonly description: string;
  readonly icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}[] = [
  {
    value: "supplier",
    label: "Supplier",
    description: "Get onboarded & receive bid opportunities",
    icon: Building2,
  },
  {
    value: "buyer",
    label: "Buyer",
    description: "Early access to sourcing & RFQ tools",
    icon: Users,
  },
];

export default function Newsletter() {
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<Role>("buyer");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#08090B] pt-[20px] pb-[48px] sm:pt-10 sm:pb-16 md:pt-14 md:pb-20 lg:pt-16 lg:pb-24">
      <div className="absolute inset-0 pointer-events-none opacity-100">
        <div className="absolute -top-24 -left-32 h-[420px] w-[420px] rounded-full bg-[#D78034]/18 blur-3xl" />
        <div className="absolute -bottom-28 right-0 h-[460px] w-[460px] rounded-full bg-[#080A7E]/22 blur-3xl" />
        <div className="absolute top-1/2 left-[48%] h-[300px] w-[300px] rounded-full bg-[#080A7E]/[0.18] blur-3xl translate-y-[-50%]" />
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      </div>

      <div className="relative z-10 w-full">
        <div className="relative w-full grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 sm:gap-12 md:gap-14 lg:gap-0 items-center">
          <AnimatedContainer
            delay={0}
            className="space-y-7 sm:space-y-8 px-4 sm:px-6 md:px-10 xl:px-14 2xl:px-20 lg:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))] lg:pr-[3rem]"
          >
            <div className="space-y-5 sm:space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-1.5 backdrop-blur-[64px]">
                <Bell className="w-3.5 h-3.5 text-[#D78034]" />
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.24em] text-white/85">
                  Stay Notified
                </span>
              </div>

              <h2 className="font-semibold tracking-tight text-white text-[30px] sm:text-[36px] md:text-[42px] lg:text-[48px] leading-[1.04] tracking-[-0.02em]">
                Be First to Know When Our{" "}
                <span className="text-[#D78034]">Procurement Platform</span>
                <br className="hidden sm:block" />
                Goes Live.
              </h2>

              <p className="text-[14.5px] sm:text-[15.5px] leading-[1.8] text-white sm:tracking-[-0.004em] max-w-[58ch]">
                Our full industrial procurement platform is launching soon. Join
                the waitlist today to get{" "}
                <span className="text-[#ffd89b] font-semibold">
                  launch-day priority access
                </span>
                , supplier onboarding invites, buyer RFQ tools, and curated
                updates tailored to your role — with zero spam, ever.
              </p>

              <ul className="space-y-3 pt-2">
                {[
                  "Launch-day email the moment our platform goes live",
                  "Early-access walkthroughs for suppliers & buyers",
                  "Quarterly industrial procurement insights — no noise",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[14px] sm:text-[15px] text-white"
                  >
                    <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#D78034]/14 ring-1 ring-[#D78034]/20 shrink-0">
                      <CircleDot className="w-3 h-3 text-[#D78034]" />
                    </span>
                    <span className="leading-[1.65]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedContainer>

          <AnimatedContainer
            delay={0.1}
            className="px-4 sm:px-6 md:px-10 xl:px-14 2xl:px-20 lg:pr-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))] lg:pl-[3rem]"
          >
            <div className="relative">
              <div className="absolute -inset-[1px] rounded-[28px] sm:rounded-[32px] bg-[#D78034]/35 blur-[1px] opacity-90" />
              <div className="relative rounded-[28px] sm:rounded-[32px] bg-white/12 backdrop-blur-[64px] shadow-[0_30px_80px_rgba(4,8,40,0.65),inset_0_1px_0_rgba(255,255,255,0.14)] p-6 sm:p-8 md:p-9 lg:p-10 overflow-hidden">
                <div className="absolute -top-20 -right-16 h-[220px] w-[220px] rounded-full bg-[#D78034]/20 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -left-16 h-[220px] w-[220px] rounded-full bg-[#080A7E]/25 blur-3xl pointer-events-none" />

                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div className="space-y-2.5">
                      <label
                        htmlFor="newsletter-email"
                        className="flex items-center gap-2 text-[12.5px] font-semibold uppercase tracking-[0.18em] text-white"
                      >
                        <Mail className="w-3.5 h-3.5 text-[#D78034]" />
                        Work Email
                      </label>
                      <div className="group relative">
                        <input
                          id="newsletter-email"
                          type="email"
                          autoComplete="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@company.com"
                          className="w-full rounded-2xl bg-white/8 border border-white/10 text-white placeholder:text-black px-4.5 py-[15px] sm:py-4 text-[15px] font-medium tracking-tight outline-none transition-all duration-300 backdrop-blur-[2px] focus:border-[#D78034]/55 focus:bg-white/10 focus:shadow-[0_0_0_4px_rgba(215,128,52,0.14)] hover:border-white/20"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-[12.5px] font-semibold uppercase tracking-[0.18em] text-white">
                        <span className="h-px w-6 bg-[#D78034] rounded-full" />
                        I am a
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {ROLE_OPTIONS.map((opt) => {
                          const Icon: React.ComponentType<
                            React.SVGProps<SVGSVGElement>
                          > = opt.icon;
                          const selected = role === opt.value;
                          return (
                            <label
                              key={opt.value}
                              className={cn(
                                "group relative flex items-start gap-3 rounded-2xl px-4 py-3.5 cursor-pointer select-none transition-all duration-300",
                                "border backdrop-blur-[2px]",
                                selected
                                  ? "bg-[#D78034]/22 border-[#D78034]/55 shadow-[0_0_0_3px_rgba(215,128,52,0.12),0_10px_30px_rgba(215,128,52,0.18)]"
                                  : "bg-white/6 border-white/10 hover:bg-white/10 hover:border-white/18"
                              )}
                            >
                              <input
                                type="radio"
                                name="newsletter-role"
                                value={opt.value}
                                checked={selected}
                                onChange={() => setRole(opt.value)}
                                className="sr-only"
                              />
                              <span
                                className={cn(
                                  "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300",
                                  selected
                                    ? "bg-[#D78034]/25 ring-1 ring-[#D78034]/40"
                                    : "bg-white/6 ring-1 ring-white/10"
                                )}
                              >
                                <Icon
                                  className={cn(
                                    "w-4.5 h-4.5",
                                    selected ? "text-[#ffd89b]" : "text-white"
                                  )}
                                  strokeWidth={1.85}
                                />
                              </span>
                              <div className="min-w-0 flex-1">
                                <div
                                  className={cn(
                                    "text-[15px] font-bold tracking-tight text-white"
                                  )}
                                >
                                  {opt.label}
                                </div>
                                <div className="text-[13px] leading-[1.5] text-white mt-0.5">
                                  {opt.description}
                                </div>
                              </div>
                              <span
                                className={cn(
                                  "mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                                  selected
                                    ? "border-[#D78034]/70 bg-[#D78034]/25"
                                    : "border-white/18 bg-transparent"
                                )}
                                aria-hidden
                              >
                                {selected && (
                                  <span className="h-2 w-2 rounded-full bg-[#ffd89b] shadow-[0_0_10px_rgba(255,216,155,0.75)]" />
                                )}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="group relative w-full inline-flex items-center justify-center gap-2.5 rounded-full bg-[#D78034] px-6 py-4 sm:py-4.5 text-[14.5px] sm:text-[15px] font-bold text-white backdrop-blur-[64px] transition-all duration-300 shadow-[0_18px_42px_rgba(4,8,40,0.58),inset_0_1px_0_rgba(255,255,255,0.20)] hover:bg-[#C97328] hover:shadow-[0_22px_52px_rgba(4,8,40,0.62),inset_0_1px_0_rgba(255,255,255,0.28),0_0_0_4px_rgba(215,128,52,0.14)]"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/18 ring-1 ring-white/30">
                        <Bell className="w-3.5 h-3.5 text-white" />
                      </span>
                      Notify Me When It Goes Live
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 translate-x-0 group-hover:translate-x-1" />
                    </button>

                    <p className="text-center text-[12.5px] text-white leading-[1.6]">
                      We respect your inbox. Unsubscribe with one click, always.
                    </p>
                  </form>
                ) : (
                  <div className="relative z-10 flex flex-col items-center text-center py-6 sm:py-8 space-y-5">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-[#D78034]/30 blur-2xl" />
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#D78034]/30 ring-1 ring-white/15 backdrop-blur-[64px] shadow-[0_18px_50px_rgba(215,128,52,0.32),inset_0_1px_0_rgba(255,255,255,0.20)]">
                        <CheckCircle2
                          className="w-8 h-8 text-[#ffd89b]"
                          strokeWidth={1.9}
                        />
                      </div>
                    </div>
                    <div className="space-y-2.5">
                      <h3 className="text-[22px] sm:text-[26px] font-bold tracking-tight text-white leading-[1.15]">
                        You&apos;re on the list.
                      </h3>
                      <p className="text-[14.5px] sm:text-[15px] leading-[1.75] text-white max-w-[44ch]">
                        We&apos;ll send a note to{" "}
                        <span className="text-[#ffd89b] font-semibold">{email}</span>{" "}
                        the moment our procurement platform launches. Keep an eye
                        on your inbox.
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-white">
                      <CircleDot className="w-3 h-3 text-[#D78034]" />
                      Confirmed · {role === "supplier" ? "Supplier" : "Buyer"} track
                    </div>
                  </div>
                )}
              </div>
            </div>
          </AnimatedContainer>
        </div>
      </div>
    </section>
  );
}
