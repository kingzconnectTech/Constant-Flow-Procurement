"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  CircleDot,
  Mail,
  Phone,
  Building2,
  CheckCircle2,
  Send,
  Loader2,
  AlertCircle,
} from "lucide-react";
import bannerImage from "@/assets/About_bg.png";

const WEB3FORMS_KEY = "416814c8-d0c6-4a5b-a56b-98411cbbb560";

export interface ContactUsProps {
  showBanner?: boolean;
}

const CONTACT_ITEMS = [
  {
    icon: Building2,
    label: "Management Desk",
    value: "Mgt@constantflow-procurement.com",
    href: "mailto:Mgt@constantflow-procurement.com",
    sub: "Corporate & Executive Inquiries",
    highlight: true,
  },
  {
    icon: Mail,
    label: "General Procurement",
    value: "Constantflowprocurement@gmail.com",
    href: "mailto:Constantflowprocurement@gmail.com",
    sub: "General Inquiries & Inbound Orders",
    highlight: false,
  },
  {
    icon: Phone,
    label: "Direct Phone Line",
    value: "08108386859",
    href: "tel:+2348108386859",
    sub: "+234 810 838 6859 (Mon – Sat)",
    highlight: false,
  },
] as const;

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


const SUBJECTS = [
  "General Enquiry",
  "Product Quotation",
  "Supplier Onboarding",
  "Valves & Actuation",
  "Pumps, Compressors & Blowers",
  "Piping, Fittings & Tubing",
  "Instrumentation & Control",
  "Heat Transfer & Process Equipment",
  "Electrical & Power Equipment",
  "Material Handling Equipment",
  "Heavy Machinery & Earth-Moving Equipment",
  "Specialized Oil & Gas / Process Packages",
  "Safety, Structural & Consumables",
  "Storage",
  "Other",
] as const;

type Subject = (typeof SUBJECTS)[number];

/* ─── Main component ─── */
export default function ContactUs({ showBanner = false }: ContactUsProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [subject, setSubject] = useState<Subject>("General Enquiry");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const formData = new FormData();
      formData.append("access_key", WEB3FORMS_KEY);
      formData.append("name", name.trim());
      formData.append("email", email.trim());
      if (phone.trim()) {
        formData.append("phone", phone.trim());
      }
      formData.append("company", company.trim() || "Not specified");
      formData.append("subject", `[Constantflow Procurement] ${subject} from ${name.trim()}`);
      formData.append("message", message.trim());
      formData.append("from_name", "Constantflow Procurement Website");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setSubmitted(true);
      } else {
        setStatus("error");
        setErrorMsg(data.message || "Failed to send message. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection or email us directly at Mgt@constantflow-procurement.com.");
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-white"
    >
      {/* ── Optional Hero Banner (Contact Page Only) ── */}
      {showBanner && (
        <div className="relative w-full h-[320px] sm:h-[380px] md:h-[420px] overflow-hidden">
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
            style={{ backgroundImage: `url(${bannerImage})` }}
            aria-hidden
          />
          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0C1A]/85 via-[#0A0C1A]/70 to-[#0A0C1A]/95" />
          {/* Orange & blue glow accents */}
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
              className="space-y-3 sm:space-y-4"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/10 px-3.5 py-1.5 backdrop-blur-[12px]">
                <CircleDot className="w-3.5 h-3.5 text-[#D78034]" />
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.24em] text-white/85">
                  Get In Touch
                </span>
              </div>

              <h1 className="font-semibold tracking-tight text-white text-[32px] sm:text-[44px] md:text-[50px] leading-[1.05] tracking-[-0.02em]">
                Let&apos;s Talk{" "}
                <span className="bg-gradient-to-r from-[#D78034] via-[#e69a50] to-[#ffd89b] bg-clip-text text-transparent">
                  Procurement
                </span>
              </h1>

              <p className="text-[14px] sm:text-[15.5px] leading-[1.7] text-white/80 max-w-[54ch] mx-auto">
                Whether you&apos;re sourcing critical equipment, managing a
                complex supply chain, or exploring supplier opportunities — our
                team is ready to assist.
              </p>
            </motion.div>
          </div>
        </div>
      )}

      {/* ── Main Form Area ── */}
      <div className={`relative w-full ${showBanner ? 'py-12 sm:py-14 md:py-16' : 'py-14 sm:py-16 md:py-20 lg:py-24'}`}>
        {/* Subtle ambient glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 right-0 h-[400px] w-[400px] rounded-full bg-[#D78034]/8 blur-3xl" />
          <div className="absolute bottom-0 -left-40 h-[420px] w-[420px] rounded-full bg-[#080A7E]/8 blur-3xl" />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 md:px-10 xl:px-14 2xl:px-20">
          {/* Section header */}
          <AnimatedContainer delay={0} className="mb-10 sm:mb-12 text-center">
            {!showBanner && (
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D78034]/25 bg-[#D78034]/8 px-3.5 py-1.5 mb-4">
                <CircleDot className="w-3.5 h-3.5 text-[#D78034]" />
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.24em] text-[#B35E14]">
                  Get In Touch
                </span>
              </div>
            )}
            <h2 className="font-semibold tracking-tight text-[#0A0C1A] text-[28px] sm:text-[36px] md:text-[42px] leading-[1.08] tracking-[-0.02em]">
              How Can We{" "}
              <span className="bg-gradient-to-r from-[#D78034] via-[#e69a50] to-[#c77226] bg-clip-text text-transparent">
                Help You?
              </span>
            </h2>
            <p className="mt-3 text-[14px] sm:text-[15.5px] leading-[1.75] text-[#5A5E7A] max-w-[56ch] mx-auto">
              Whether you&apos;re sourcing critical equipment, managing a complex supply chain, or exploring supplier opportunities — our team responds within one business day.
            </p>
          </AnimatedContainer>

          {/* ── Contact info cards (Contact Page Only) ── */}
          {showBanner && (
            <AnimatedContainer delay={0.05} className="mb-10 sm:mb-12 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5">
                {CONTACT_ITEMS.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                        delay: 0.05 + i * 0.06,
                      }}
                      className={`group relative flex flex-col justify-between gap-3 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 ${
                        item.highlight
                          ? "border-2 border-[#D78034]/45 bg-gradient-to-b from-[#FFFDF9] to-white shadow-[0_10px_28px_rgba(215,128,52,0.12)] hover:border-[#D78034] hover:shadow-[0_16px_38px_rgba(215,128,52,0.2)]"
                          : "border border-[#0A0C1A]/8 bg-white shadow-[0_6px_22px_rgba(10,12,26,0.06)] hover:border-[#D78034]/30 hover:shadow-[0_14px_32px_rgba(215,128,52,0.12)]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-105 ${
                            item.highlight
                              ? "bg-[#D78034] text-white shadow-[0_4px_12px_rgba(215,128,52,0.35)]"
                              : "bg-gradient-to-br from-[#D78034]/14 via-[#080A7E]/8 to-transparent ring-1 ring-[#0A0C1A]/6 text-[#D78034] group-hover:from-[#D78034]/22"
                          }`}
                        >
                          <Icon
                            className={`h-4.5 w-4.5 ${
                              item.highlight ? "text-white" : "text-[#D78034]"
                            }`}
                            strokeWidth={1.9}
                          />
                        </span>
                        {item.highlight && (
                          <span className="rounded-full bg-[#D78034]/12 px-2.5 py-0.5 text-[9.5px] font-bold uppercase tracking-wider text-[#B35E14] border border-[#D78034]/25">
                            Priority Desk
                          </span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-[#0A0C1A]/45 mb-1">
                          {item.label}
                        </div>
                        <div
                          className={`text-[13px] sm:text-[13.5px] font-bold leading-snug break-all ${
                            item.highlight ? "text-[#080A7E]" : "text-[#0A0C1A]"
                          }`}
                        >
                          {item.value}
                        </div>
                        <div className="mt-1 text-[11.5px] text-[#5A5E7A]">
                          {item.sub}
                        </div>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </AnimatedContainer>
          )}

        {/* Form card */}
        <AnimatedContainer delay={0.1} className="max-w-3xl mx-auto">
          <div className="relative rounded-2xl border border-[#0A0C1A]/8 bg-white shadow-[0_16px_48px_rgba(10,12,26,0.09)] overflow-hidden">
            {/* Top accent line */}
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#D78034] via-[#e69a50] to-[#080A7E]" />

            <div className="p-6 sm:p-8 md:p-10">
              {!submitted ? (
                <form
                  id="contact-enquiry-form"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {/* Name + Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-name"
                        className="flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0A0C1A]/55"
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
                        className="flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0A0C1A]/55"
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

                  {/* Email + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-email"
                        className="flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0A0C1A]/55"
                      >
                        <Mail className="w-3 h-3 text-[#D78034]" />
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
                        htmlFor="contact-phone"
                        className="flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0A0C1A]/55"
                      >
                        <Phone className="w-3 h-3 text-[#D78034]" />
                        Phone Number
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        autoComplete="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+234 810 000 0000"
                        className="w-full rounded-xl border border-[#0A0C1A]/10 bg-[#F8F9FC] px-4 py-3.5 text-[14.5px] font-medium text-[#0A0C1A] placeholder:text-[#0A0C1A]/30 outline-none transition-all duration-200 focus:border-[#D78034]/55 focus:bg-white focus:shadow-[0_0_0_3px_rgba(215,128,52,0.12)] hover:border-[#0A0C1A]/18"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-subject"
                      className="flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0A0C1A]/55"
                    >
                      Subject
                    </label>
                    <select
                      id="contact-subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value as Subject)}
                      className="w-full rounded-xl border border-[#0A0C1A]/10 bg-[#F8F9FC] px-4 py-3.5 text-[14.5px] font-medium text-[#0A0C1A] outline-none transition-all duration-200 focus:border-[#D78034]/55 focus:bg-white focus:shadow-[0_0_0_3px_rgba(215,128,52,0.12)] hover:border-[#0A0C1A]/18 cursor-pointer">
                      {SUBJECTS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-message"
                      className="flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0A0C1A]/55"
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

                  {/* Error alert */}
                  {status === "error" && errorMsg && (
                    <div className="flex items-center gap-2.5 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-[13.5px] text-red-700">
                      <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {/* Submit */}
                  <div className="pt-1 flex items-center justify-between gap-4 flex-wrap">
                    <p className="text-[12.5px] text-[#5A5E7A] leading-[1.6]">
                      We typically respond within one business day.
                    </p>
                    <button
                      type="submit"
                      id="contact-submit-btn"
                      disabled={status === "loading"}
                      className="group relative inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#D78034] via-[#df8b42] to-[#c77226] px-7 py-3.5 text-[15px] font-bold text-white shadow-[0_14px_34px_rgba(215,128,52,0.32),inset_0_1px_0_rgba(255,255,255,0.25)] transition-all duration-300 hover:shadow-[0_20px_46px_rgba(215,128,52,0.45)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 cursor-pointer overflow-hidden"
                    >
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full pointer-events-none" />
                      <span className="tracking-wide">
                        {status === "loading" ? "Sending…" : "Send Message"}
                      </span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-white/18 ring-1 ring-white/30 transition-all duration-300 group-hover:bg-white group-hover:scale-105">
                        {status === "loading" ? (
                          <Loader2 className="w-3.5 h-3.5 text-white animate-spin" />
                        ) : (
                          <Send className="w-3 h-3 text-white group-hover:text-[#D78034] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        )}
                      </span>
                    </button>
                  </div>
                </form>
              ) : (
                /* Success state */
                <div className="flex flex-col items-center text-center py-12 space-y-5">
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
                      <span className="font-semibold text-[#0A0C1A]">{name}</span>
                      . We&apos;ve received your enquiry and will get back to{" "}
                      <span className="font-semibold text-[#D78034]">{email}</span>{" "}
                      within one business day.
                    </p>
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
