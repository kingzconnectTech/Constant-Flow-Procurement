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
  Loader2,
  AlertCircle,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwH1JPnExDdpFJi8tWXBRpGj0Gf8kV49tfdADntgjKoCZ2YkI39lmZH2iRML1p2Dv0A/exec";

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
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "duplicate" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [honeypot, setHoneypot] = useState<string>(""); // Honeypot field for spam protection
  
  // Generate security token on component mount
  const [securityToken] = useState(() => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    return btoa(`${timestamp}:${random}`);
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");

    // Honeypot check - if filled, it's a bot
    if (honeypot.trim() !== "") {
      console.log("Bot detected via honeypot in newsletter");
      return; // Silently fail for bots
    }

    const validateEmail = (value: string) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    if (!validateEmail(email)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setStatus("loading");

    try {
      let isHandled = false;

      // 1. Try Vercel Serverless API Route
      try {
        const res = await fetch("/api/newsletter-signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            email: email.trim().toLowerCase(), 
            role,
            honeypot: honeypot.trim(), // Include honeypot for server-side validation
            timestamp: Date.now(), // Add timestamp for basic rate limiting
            securityToken: securityToken, // Add security token
          }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.status === "success" || data.result === "success") {
            setStatus("success");
            setSubmitted(true);
            isHandled = true;
          } else if (data.status === "duplicate") {
            setStatus("duplicate");
            isHandled = true;
          } else {
            setStatus("error");
            setErrorMsg(
              data.message || "Something went wrong. Please try again."
            );
            isHandled = true;
          }
        }
      } catch {
        // Fallback below if serverless API route is unavailable
      }

      // 2. Direct Webhook Fallback (if running locally without Vercel serverless)
      if (!isHandled) {
        await fetch(APPS_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            role,
          }),
        });

        setStatus("success");
        setSubmitted(true);
      }
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <section
      id="newsletter"
      className="relative w-full overflow-hidden bg-[#08090B] pt-[20px] pb-[48px] sm:pt-10 sm:pb-16 md:pt-14 md:pb-20 lg:pt-16 lg:pb-24"
    >
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
            className="space-y-6 sm:space-y-8 px-4 sm:px-6 md:px-10 xl:px-14 2xl:px-20 lg:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))] lg:pr-[3rem]"
          >
            <div className="space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-1.5 backdrop-blur-[64px]">
                <Bell className="w-3.5 h-3.5 text-[#D78034]" />
                <span className="text-[10.5px] sm:text-xs font-bold uppercase tracking-[0.22em] text-white/85">
                  Stay Notified
                </span>
              </div>

              <h2 className="font-semibold tracking-tight text-white text-[26px] sm:text-[34px] md:text-[40px] lg:text-[46px] leading-[1.08] tracking-[-0.02em]">
                Be First to Know When Our{" "}
                <span className="text-[#D78034]">Procurement Platform</span>
                <br className="hidden sm:block" /> Goes Live.
              </h2>

              <p className="text-[13.5px] sm:text-[15px] leading-[1.75] text-white/90 sm:tracking-[-0.004em] max-w-[58ch]">
                Our full industrial procurement platform is launching soon. Join
                the waitlist today to get{" "}
                <span className="text-[#ffd89b] font-semibold">
                  launch-day priority access
                </span>
                , supplier onboarding invites, buyer RFQ tools, and curated
                updates tailored to your role — with zero spam, ever.
              </p>

              <ul className="space-y-2.5 sm:space-y-3 pt-1">
                {[
                  "Launch-day email the moment our platform goes live",
                  "Early-access walkthroughs for suppliers & buyers",
                  "Quarterly industrial procurement insights — no noise",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 sm:gap-3 text-[13px] sm:text-[14.5px] text-white/95"
                  >
                    <span className="mt-0.5 flex h-4.5 w-4.5 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-[#D78034]/14 ring-1 ring-[#D78034]/20 shrink-0">
                      <CircleDot className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#D78034]" />
                    </span>
                    <span className="leading-[1.55]">{item}</span>
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
              <div className="absolute -inset-[1px] rounded-[24px] sm:rounded-[32px] bg-[#D78034]/35 blur-[1px] opacity-90" />
              <div className="relative rounded-[24px] sm:rounded-[32px] bg-white/12 backdrop-blur-[64px] shadow-[0_30px_80px_rgba(4,8,40,0.65),inset_0_1px_0_rgba(255,255,255,0.14)] p-5 sm:p-7 md:p-9 lg:p-10 overflow-hidden">
                <div className="absolute -top-20 -right-16 h-[220px] w-[220px] rounded-full bg-[#D78034]/20 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -left-16 h-[220px] w-[220px] rounded-full bg-[#080A7E]/25 blur-3xl pointer-events-none" />

                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4.5 sm:space-y-6 relative z-10">
                    {/* Honeypot field for spam protection - hidden from humans but visible to bots */}
                    <input
                      type="text"
                      name="website_url"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                      style={{ position: 'absolute', left: '-5000px', width: '1px', height: '1px', overflow: 'hidden' }}
                      aria-hidden="true"
                    />
                    <div className="space-y-2">
                      <label
                        htmlFor="newsletter-email"
                        className="flex items-center gap-2 text-[11.5px] sm:text-[12.5px] font-semibold uppercase tracking-[0.18em] text-white"
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
                          placeholder="EMAIL ADDRESS"
                          className="w-full rounded-xl sm:rounded-2xl bg-white/8 border border-white/15 text-white placeholder:text-black px-4 py-3 sm:py-3.5 text-[14px] sm:text-[15px] font-medium tracking-tight outline-none transition-all duration-300 backdrop-blur-[2px] focus:border-[#D78034]/55 focus:bg-white/10 focus:shadow-[0_0_0_4px_rgba(215,128,52,0.14)] hover:border-white/25"
                        />
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2 text-[11.5px] sm:text-[12.5px] font-semibold uppercase tracking-[0.18em] text-white">
                        <span className="h-px w-5 sm:w-6 bg-[#D78034] rounded-full" />
                        I am a
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                        {ROLE_OPTIONS.map((opt) => {
                          const Icon: React.ComponentType<
                            React.SVGProps<SVGSVGElement>
                          > = opt.icon;
                          const selected = role === opt.value;
                          return (
                            <label
                              key={opt.value}
                              className={cn(
                                "group relative flex items-start gap-2.5 sm:gap-3 rounded-xl sm:rounded-2xl p-3 sm:p-3.5 cursor-pointer select-none transition-all duration-300",
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
                                  "mt-0.5 flex h-7.5 w-7.5 sm:h-8.5 sm:w-8.5 shrink-0 items-center justify-center rounded-lg sm:rounded-xl transition-all duration-300",
                                  selected
                                    ? "bg-[#D78034]/25 ring-1 ring-[#D78034]/40"
                                    : "bg-white/6 ring-1 ring-white/10"
                                )}
                              >
                                <Icon
                                  className={cn(
                                    "w-3.5 h-3.5 sm:w-4 sm:h-4",
                                    selected ? "text-[#ffd89b]" : "text-white"
                                  )}
                                  strokeWidth={1.85}
                                />
                              </span>
                              <div className="min-w-0 flex-1">
                                <div className="text-[13.5px] sm:text-[14.5px] font-bold tracking-tight text-white">
                                  {opt.label}
                                </div>
                                <div className="text-[11.5px] sm:text-[12.5px] leading-[1.4] text-white/80 mt-0.5">
                                  {opt.description}
                                </div>
                              </div>
                              <span
                                className={cn(
                                  "mt-1 flex h-4 w-4 sm:h-5 sm:w-5 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                                  selected
                                    ? "border-[#D78034]/70 bg-[#D78034]/25"
                                    : "border-white/18 bg-transparent"
                                )}
                                aria-hidden
                              >
                                {selected && (
                                  <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#ffd89b] shadow-[0_0_10px_rgba(255,216,155,0.75)]" />
                                )}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    {status === "duplicate" && (
                      <div className="flex items-center gap-2 rounded-xl bg-amber-500/15 border border-amber-500/35 px-3.5 py-2.5 text-[12.5px] text-amber-200">
                        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>This email is already registered on our waitlist.</span>
                      </div>
                    )}

                    {status === "error" && errorMsg && (
                      <div className="flex items-center gap-2 rounded-xl bg-red-500/15 border border-red-500/30 px-3.5 py-2.5 text-[12.5px] text-red-200">
                        <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="group relative w-full mt-2 sm:mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-[#D78034] px-6 py-3.5 sm:py-4 text-[14px] sm:text-[15px] font-bold text-white backdrop-blur-[64px] transition-all duration-300 shadow-[0_14px_34px_rgba(4,8,40,0.5),inset_0_1px_0_rgba(255,255,255,0.20)] hover:bg-[#C97328] hover:shadow-[0_20px_46px_rgba(4,8,40,0.6),inset_0_1px_0_rgba(255,255,255,0.28)] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/18 ring-1 ring-white/30">
                            <Bell className="w-3 h-3 text-white" />
                          </span>
                          <span>Notify Me</span>
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 translate-x-0 group-hover:translate-x-1" />
                        </>
                      )}
                    </button>

                    <p className="text-center text-[11.5px] sm:text-[12px] text-white/70 leading-[1.5]">
                      We respect your inbox. Unsubscribe with one click, always.
                    </p>
                  </form>
                ) : (
                  <div className="relative z-10 flex flex-col items-center text-center py-5 sm:py-8 space-y-4 sm:space-y-5">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-[#D78034]/30 blur-2xl" />
                      <div className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#D78034]/30 ring-1 ring-white/15 backdrop-blur-[64px] shadow-[0_18px_50px_rgba(215,128,52,0.32),inset_0_1px_0_rgba(255,255,255,0.20)]">
                        <CheckCircle2
                          className="w-7 h-7 sm:w-8 sm:h-8 text-[#ffd89b]"
                          strokeWidth={1.9}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-[20px] sm:text-[24px] font-bold tracking-tight text-white leading-[1.15]">
                        You&apos;re on the list.
                      </h3>
                      <p className="text-[13px] sm:text-[14.5px] leading-[1.7] text-white/90 max-w-[44ch]">
                        We&apos;ll send a note to{" "}
                        <span className="text-[#ffd89b] font-semibold">{email}</span>{" "}
                        the moment our procurement platform launches. Keep an eye
                        on your inbox.
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.18em] text-white">
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
