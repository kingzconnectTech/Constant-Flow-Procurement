"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  CircleDot,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  Send,
  Building2,
} from "lucide-react";
import bannerImage from "@/assets/About_bg.png";

/* ─── Animation wrapper ─── */
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
    : { opacity: 0, filter: "blur(10px)", y: 16 };
  const inViewState = shouldReduceMotion
    ? undefined
    : { opacity: 1, filter: "blur(0px)", y: 0 };
  return (
    <motion.div
      className={className}
      initial={initialState}
      whileInView={inViewState}
      viewport={{ once: true, amount: 0.15, margin: "-8% 0px -8% 0px" }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: "Email Us",
    value: "hello@constantflow.com",
    href: "mailto:hello@constantflow.com",
    sub: "We respond within 24 hours",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+1 (409) 555-0188",
    href: "tel:+14095550188",
    sub: "Mon – Fri, 8 AM – 6 PM (CST)",
  },
  {
    icon: Briefcase,
    label: "Request an RFQ",
    value: "Submit a procurement request",
    href: "#request-rfq",
    sub: "Get a competitive quote",
  },
] as const;

/* ─── Enquiry subjects ─── */
const SUBJECTS = [
  "General Enquiry",
  "Request an RFQ",
  "Supplier Onboarding",
  "Oil & Gas Equipment",
  "Heavy Equipment",
  "Steel Pipes & Fittings",
  "Electrical Equipment",
  "Spare Parts & Tools",
  "Other",
] as const;

type Subject = (typeof SUBJECTS)[number];

/* ─── Main component ─── */
export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [subject, setSubject] = useState<Subject>("General Enquiry");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-white"
    >
      {/* ── Hero Banner ── */}
      <div className="relative w-full h-[340px] sm:h-[420px] md:h-[480px] overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ backgroundImage: `url(${bannerImage})` }}
          aria-hidden
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0C1A]/80 via-[#0A0C1A]/65 to-[#0A0C1A]/90" />
        {/* Orange glow accents */}
        <div className="absolute -top-20 -left-20 h-[380px] w-[380px] rounded-full bg-[#D78034]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 right-0 h-[320px] w-[320px] rounded-full bg-[#080A7E]/25 blur-3xl pointer-events-none" />
        {/* Top separator line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D78034]/40 to-transparent" />

        {/* Banner content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4 sm:space-y-5"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/10 px-3.5 py-1.5 backdrop-blur-[12px]">
              <CircleDot className="w-3.5 h-3.5 text-[#D78034]" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.24em] text-white/85">
                Get In Touch
              </span>
            </div>

            <h1 className="font-semibold tracking-tight text-white text-[32px] sm:text-[44px] md:text-[52px] leading-[1.05] tracking-[-0.02em]">
              Let&apos;s Talk{" "}
              <span className="bg-gradient-to-r from-[#D78034] via-[#e69a50] to-[#ffd89b] bg-clip-text text-transparent">
                Procurement
              </span>
            </h1>

            <p className="text-[14.5px] sm:text-[16px] leading-[1.75] text-white/75 max-w-[54ch] mx-auto">
              Whether you&apos;re sourcing critical equipment, managing a
              complex supply chain, or exploring supplier opportunities — our
              team is ready to assist.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="relative w-full bg-white">
        {/* Subtle ambient glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 right-0 h-[400px] w-[400px] rounded-full bg-[#D78034]/8 blur-3xl" />
          <div className="absolute bottom-0 -left-40 h-[420px] w-[420px] rounded-full bg-[#080A7E]/8 blur-3xl" />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 md:px-10 xl:px-14 2xl:px-20 py-14 sm:py-16 md:py-20 lg:py-24">

          {/* ── Contact info cards ── */}
          <AnimatedContainer delay={0} className="mb-14 sm:mb-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
              {CONTACT_ITEMS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.55,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.08 + i * 0.07,
                    }}
                    className="group relative flex flex-col gap-3.5 rounded-2xl border border-[#0A0C1A]/8 bg-white p-6 shadow-[0_8px_28px_rgba(10,12,26,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D78034]/30 hover:shadow-[0_18px_42px_rgba(215,128,52,0.13)]"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#D78034]/16 via-[#080A7E]/8 to-transparent ring-1 ring-[#0A0C1A]/6 transition-all duration-300 group-hover:from-[#D78034]/24">
                      <Icon
                        className="h-5 w-5 text-[#D78034]"
                        strokeWidth={1.9}
                      />
                    </span>
                    <div className="min-w-0">
                      <div className="text-[11.5px] font-bold uppercase tracking-[0.2em] text-[#0A0C1A]/45 mb-1">
                        {item.label}
                      </div>
                      <div className="text-[14.5px] font-semibold text-[#0A0C1A] leading-snug">
                        {item.value}
                      </div>
                      <div className="mt-1 text-[12.5px] text-[#5A5E7A]">
                        {item.sub}
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </AnimatedContainer>

          {/* ── Two-column: form + side panel ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] gap-10 lg:gap-14 xl:gap-16">

            {/* Contact form */}
            <AnimatedContainer delay={0.1}>
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="h-px w-8 bg-gradient-to-r from-[#D78034] to-[#080A7E] rounded-full" />
                    <span className="text-[11.5px] font-bold uppercase tracking-[0.22em] text-[#0A0C1A]/50">
                      Send a Message
                    </span>
                  </div>
                  <h2 className="text-[26px] sm:text-[32px] font-semibold tracking-[-0.02em] text-[#0A0C1A] leading-[1.1]">
                    How Can We Help You?
                  </h2>
                </div>

                {!submitted ? (
                  <form
                    id="contact-enquiry-form"
                    onSubmit={handleSubmit}
                    className="space-y-4 pt-1"
                  >
                    {/* Name + Company */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label
                          htmlFor="contact-name"
                          className="block text-[12.5px] font-semibold uppercase tracking-[0.16em] text-[#0A0C1A]/60"
                        >
                          Full Name <span className="text-[#D78034]">*</span>
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          autoComplete="name"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="John Smith"
                          className="w-full rounded-xl border border-[#0A0C1A]/10 bg-[#F8F9FC] px-4 py-3.5 text-[14.5px] font-medium text-[#0A0C1A] placeholder:text-[#0A0C1A]/30 outline-none transition-all duration-200 focus:border-[#D78034]/55 focus:bg-white focus:shadow-[0_0_0_3px_rgba(215,128,52,0.12)] hover:border-[#0A0C1A]/18"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label
                          htmlFor="contact-company"
                          className="block text-[12.5px] font-semibold uppercase tracking-[0.16em] text-[#0A0C1A]/60"
                        >
                          Company
                        </label>
                        <input
                          id="contact-company"
                          type="text"
                          autoComplete="organization"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Acme Industries"
                          className="w-full rounded-xl border border-[#0A0C1A]/10 bg-[#F8F9FC] px-4 py-3.5 text-[14.5px] font-medium text-[#0A0C1A] placeholder:text-[#0A0C1A]/30 outline-none transition-all duration-200 focus:border-[#D78034]/55 focus:bg-white focus:shadow-[0_0_0_3px_rgba(215,128,52,0.12)] hover:border-[#0A0C1A]/18"
                        />
                      </div>
                    </div>

                    {/* Email + Subject */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label
                          htmlFor="contact-email"
                          className="block text-[12.5px] font-semibold uppercase tracking-[0.16em] text-[#0A0C1A]/60"
                        >
                          Work Email <span className="text-[#D78034]">*</span>
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          autoComplete="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@company.com"
                          className="w-full rounded-xl border border-[#0A0C1A]/10 bg-[#F8F9FC] px-4 py-3.5 text-[14.5px] font-medium text-[#0A0C1A] placeholder:text-[#0A0C1A]/30 outline-none transition-all duration-200 focus:border-[#D78034]/55 focus:bg-white focus:shadow-[0_0_0_3px_rgba(215,128,52,0.12)] hover:border-[#0A0C1A]/18"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label
                          htmlFor="contact-subject"
                          className="block text-[12.5px] font-semibold uppercase tracking-[0.16em] text-[#0A0C1A]/60"
                        >
                          Subject
                        </label>
                        <select
                          id="contact-subject"
                          value={subject}
                          onChange={(e) =>
                            setSubject(e.target.value as Subject)
                          }
                          className="w-full rounded-xl border border-[#0A0C1A]/10 bg-[#F8F9FC] px-4 py-3.5 text-[14.5px] font-medium text-[#0A0C1A] outline-none transition-all duration-200 focus:border-[#D78034]/55 focus:bg-white focus:shadow-[0_0_0_3px_rgba(215,128,52,0.12)] hover:border-[#0A0C1A]/18 cursor-pointer"
                        >
                          {SUBJECTS.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-message"
                        className="block text-[12.5px] font-semibold uppercase tracking-[0.16em] text-[#0A0C1A]/60"
                      >
                        Message <span className="text-[#D78034]">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        required
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us about your procurement needs, equipment requirements, or any questions you have…"
                        className="w-full resize-none rounded-xl border border-[#0A0C1A]/10 bg-[#F8F9FC] px-4 py-3.5 text-[14.5px] font-medium text-[#0A0C1A] placeholder:text-[#0A0C1A]/30 outline-none transition-all duration-200 focus:border-[#D78034]/55 focus:bg-white focus:shadow-[0_0_0_3px_rgba(215,128,52,0.12)] hover:border-[#0A0C1A]/18"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      id="contact-submit-btn"
                      className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-[#D78034] px-8 py-4 text-[14.5px] font-bold text-white shadow-[0_16px_38px_rgba(215,128,52,0.38),inset_0_1px_0_rgba(255,255,255,0.22)] transition-all duration-300 hover:bg-[#C97328] hover:shadow-[0_20px_48px_rgba(215,128,52,0.44)] active:scale-[0.98]"
                    >
                      <Send className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-6" />
                      Send Message
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>

                    <p className="text-[12.5px] text-[#5A5E7A] leading-[1.6]">
                      We typically respond within one business day. For urgent
                      procurement needs, please call us directly.
                    </p>
                  </form>
                ) : (
                  /* Success state */
                  <div className="flex flex-col items-center text-center py-10 space-y-5">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-[#D78034]/20 blur-2xl" />
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#D78034]/15 ring-1 ring-[#D78034]/30 shadow-[0_14px_40px_rgba(215,128,52,0.22)]">
                        <CheckCircle2
                          className="w-8 h-8 text-[#D78034]"
                          strokeWidth={1.9}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-[22px] font-bold tracking-tight text-[#0A0C1A] leading-[1.15]">
                        Message Sent!
                      </h3>
                      <p className="text-[14.5px] leading-[1.75] text-[#5A5E7A] max-w-[42ch]">
                        Thank you,{" "}
                        <span className="font-semibold text-[#0A0C1A]">
                          {name}
                        </span>
                        . We&apos;ve received your enquiry and will get back to{" "}
                        <span className="font-semibold text-[#D78034]">
                          {email}
                        </span>{" "}
                        within one business day.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </AnimatedContainer>

            {/* Side panel */}
            <AnimatedContainer delay={0.2} className="space-y-6">
              {/* Why Constantflow dark card */}
              <div className="relative rounded-2xl overflow-hidden">
                <div className="absolute -top-16 -right-12 h-[220px] w-[220px] rounded-full bg-[#D78034]/22 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-12 -left-10 h-[180px] w-[180px] rounded-full bg-[#080A7E]/28 blur-3xl pointer-events-none" />
                <div className="relative bg-[#0A0C1A] rounded-2xl p-7 sm:p-8 border border-white/6 shadow-[0_24px_60px_rgba(10,12,26,0.22)]">
                  <div className="space-y-5">
                    <div className="flex items-center gap-2.5">
                      <Building2
                        className="w-5 h-5 text-[#D78034]"
                        strokeWidth={1.9}
                      />
                      <span className="text-[12px] font-bold uppercase tracking-[0.22em] text-white/55">
                        Why Constantflow
                      </span>
                    </div>
                    <h3 className="text-[20px] sm:text-[22px] font-semibold tracking-[-0.02em] text-white leading-[1.2]">
                      Industrial Procurement,{" "}
                      <span className="text-[#D78034]">Done Right.</span>
                    </h3>
                    <ul className="space-y-3.5 pt-1">
                      {[
                        "End-to-end sourcing from request to delivery",
                        "Vetted global supplier network across Asia, US & EU",
                        "Technical compliance & quality assurance built-in",
                        "Dedicated account support for every engagement",
                        "Competitive pricing through disciplined sourcing",
                      ].map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-[13.5px] text-white/75 leading-[1.6]"
                        >
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D78034]/18 ring-1 ring-[#D78034]/28">
                            <CircleDot className="w-2.5 h-2.5 text-[#D78034]" />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Global offices card */}
              <div className="rounded-2xl border border-[#0A0C1A]/8 bg-white p-6 shadow-[0_8px_28px_rgba(10,12,26,0.06)] space-y-4">
                <div className="flex items-center gap-2">
                  <span className="h-px w-6 bg-[#D78034] rounded-full" />
                  <span className="text-[11.5px] font-bold uppercase tracking-[0.2em] text-[#0A0C1A]/50">
                    Global Offices
                  </span>
                </div>
                {[
                  { city: "Houston, TX", role: "Americas HQ", flag: "🇺🇸" },
                  { city: "Singapore", role: "Asia Pacific HQ", flag: "🇸🇬" },
                  { city: "Seoul", role: "Korea Office", flag: "🇰🇷" },
                ].map((office) => (
                  <div
                    key={office.city}
                    className="flex items-center gap-3.5 py-2.5 border-b border-[#0A0C1A]/6 last:border-0"
                  >
                    <span className="text-2xl leading-none">{office.flag}</span>
                    <div>
                      <div className="text-[14.5px] font-semibold text-[#0A0C1A]">
                        {office.city}
                      </div>
                      <div className="text-[12.5px] text-[#5A5E7A]">
                        {office.role}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
