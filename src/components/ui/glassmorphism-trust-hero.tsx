import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Play,
  Target,
  Crown,
  Star,
  Globe2,
} from "lucide-react";
import heroBackground from "@/assets/hero.png";
import logoExxonMobil from "@/logos/exxomobil.svg";
import logoChevron from "@/logos/Chevron.svg";
import logoSaudiAramco from "@/logos/Saudi Aramco.svg";
import logoPetroChina from "@/logos/PetroChina.svg";
import logoSinopec from "@/logos/sinopec.svg";
import logoShell from "@/logos/SHEL.svg";
import logoBP from "@/logos/BP.svg";
import logoTotalEnergies from "@/logos/TTE.svg";
import logoQatarEnergy from "@/logos/QatarEnergy_logo.svg";

const CLIENTS: { name: string; domain: string; logo?: string }[] = [
  { name: "ExxonMobil", domain: "exxonmobil.com", logo: logoExxonMobil },
  { name: "Chevron", domain: "chevron.com", logo: logoChevron },
  { name: "Saudi Aramco", domain: "aramco.com", logo: logoSaudiAramco },
  { name: "PetroChina", domain: "petrochina.com.cn", logo: logoPetroChina },
  { name: "Sinopec", domain: "sinopec.com", logo: logoSinopec },
  { name: "Shell", domain: "shell.com", logo: logoShell },
  { name: "BP", domain: "bp.com", logo: logoBP },
  { name: "TotalEnergies", domain: "totalenergies.com", logo: logoTotalEnergies },
  { name: "QatarEnergy", domain: "qatarenergy.qa", logo: logoQatarEnergy },
];

const HUBS = [
  { name: "Europe", zone: "CET", tz: "Europe/Berlin", flag: "EU" },
  { name: "Asia", zone: "SGT", tz: "Asia/Singapore", flag: "SG" },
  { name: "USA", zone: "EST", tz: "America/New_York", flag: "US" },
  { name: "Nigeria", zone: "WAT", tz: "Africa/Lagos", flag: "NG" },
] as const;

function formatClock(tz: string): { hhmm: string; ss: string } {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const get = (t: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === t)?.value ?? "00";
  return { hhmm: `${get("hour")}:${get("minute")}`, ss: get("second") };
}

type ClockMap = Record<string, { hhmm: string; ss: string }>;

const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center justify-center transition-transform hover:-translate-y-1 cursor-default">
    <span className="text-xl font-bold text-white sm:text-2xl">{value}</span>
    <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-medium sm:text-xs">
      {label}
    </span>
  </div>
);

export default function GlassmorphismTrustHero() {
  const [clocks, setClocks] = useState<ClockMap>(() =>
    HUBS.reduce<ClockMap>(
      (acc, h) => ({ ...acc, [h.zone]: formatClock(h.tz) }),
      {}));

  useEffect(() => {
    const id = setInterval(() => {
      setClocks(
        HUBS.reduce<ClockMap>(
          (acc, h) => ({ ...acc, [h.zone]: formatClock(h.tz) }),
          {}));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full bg-[#0A0C1A] text-white overflow-hidden font-sans">
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes softPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.42; }
        }
        .animate-fade-in {
          animation: fadeSlideIn 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-pulse-soft { animation: softPulse 2s ease-in-out infinite; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
      `}</style>

      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-60"
        style={{
          backgroundImage: `url(${heroBackground})`,
          maskImage:
            "linear-gradient(180deg, transparent, black 0%, black 82%, transparent)",
          WebkitMaskImage:
            "linear-gradient(180deg, transparent, black 0%, black 82%, transparent)",
        }}
      />

      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0C1A]/80 via-[#0A0C1A]/40 via-[38%] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-l from-[#ffd89b]/10 via-transparent via-[70%] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080A7E]/30 via-transparent to-[#0A0C1A]" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-12 items-start">
          <div className="lg:col-span-8 flex flex-col justify-center space-y-8 pt-4">
            <div className="animate-fade-in delay-100">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3.5 py-2 backdrop-blur-md transition-colors hover:bg-white/14">
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-100 flex items-center gap-2">
                  Global Procurement Partner
                  <Star className="w-3.5 h-3.5 text-[#ffcd75] fill-[#D78034]" />
                </span>
              </div>
            </div>

            <h1
              className="animate-fade-in delay-200 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tighter leading-[0.95] text-white drop-shadow-[0_2px_14px_rgba(5,6,20,0.6)]"
              style={{
                maskImage:
                  "linear-gradient(180deg, black 0%, black 84%, rgba(0,0,0,0.92) 100%)",
                WebkitMaskImage:
                  "linear-gradient(180deg, black 0%, black 84%, rgba(0,0,0,0.92) 100%)",
              }}
            >
              The Right Equipment.<br />
              <span className="bg-gradient-to-br from-white via-white to-[#ffd89b] bg-clip-text text-transparent">
                The Right Source.
              </span>
              <br />
              The Right Price.
            </h1>

            <p className="animate-fade-in delay-300 max-w-2xl text-base sm:text-lg text-zinc-200 leading-relaxed">
              Constantflow simplifies complex industrial procurement by sourcing
              critical oil &amp; gas equipment, heavy machinery and technical
              supplies from vetted suppliers worldwide.
            </p>

            <div className="animate-fade-in delay-400 flex flex-col sm:flex-row gap-4">
              <a
                href="#request-rfq"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#D78034] px-8 py-4 text-sm font-semibold text-[#0c0917] transition-all hover:scale-[1.02] hover:brightness-105 active:scale-[0.98] shadow-[0_10px_32px_rgba(215,128,52,0.34)]"
              >
                Start Your Procurement
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#services"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/18 bg-white/8 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/14 hover:border-white/28"
              >
                <Play className="w-4 h-4 fill-current" />
                Explore Services
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6 lg:mt-2">
            <div className="animate-fade-in delay-500 relative overflow-hidden rounded-3xl border border-white/12 bg-white/8 p-6 sm:p-7 backdrop-blur-xl shadow-2xl">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-[#D78034]/20 blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 h-56 w-56 rounded-full bg-[#080A7E]/30 blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-7">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/12 ring-1 ring-white/22">
                    <Target className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-[28px] sm:text-3xl font-bold tracking-tight text-white drop-shadow-[0_1px_10px_rgba(0,0,0,0.35)]">
                      12,500+
                    </div>
                    <div className="text-xs sm:text-sm text-zinc-300">
                      SKUs Sourced Globally
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-7">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-300">On-Time Delivery</span>
                    <span className="text-white font-semibold">97%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800/60">
                    <div className="h-full w-[97%] rounded-full bg-gradient-to-r from-[#D78034] to-[#ffcd75] shadow-[0_0_12px_rgba(215,128,52,0.45)]" />
                  </div>
                </div>

                <div className="h-px w-full bg-white/12 mb-6" />

                <div className="grid grid-cols-3 gap-3 text-center">
                  <StatItem value="18+" label="Countries" />
                  <div className="w-px h-full bg-white/12 mx-auto" />
                  <StatItem value="24/7" label="Support" />
                  <div className="w-px h-full bg-white/12 mx-auto" />
                  <StatItem value="ISO" label="Certified" />
                </div>

                <div className="mt-7 flex flex-wrap gap-2">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/8 px-3 py-1.5 text-[10px] font-medium tracking-wide text-zinc-200">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                    </span>
                    VETTED SUPPLIERS
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/8 px-3 py-1.5 text-[10px] font-medium tracking-wide text-zinc-200">
                    <Crown className="w-3 h-3 text-[#ffcd75]" />
                    PREMIUM SOURCING
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-fade-in delay-500 relative overflow-hidden rounded-3xl border border-white/12 bg-white/8 py-7 backdrop-blur-xl">
              <h3 className="mb-5 px-7 text-sm font-medium text-zinc-300">
                Trusted by Industry Leaders
              </h3>

              <div
                className="relative flex overflow-hidden"
                style={{
                  maskImage:
                    "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
                }}
              >
                <div className="animate-marquee flex items-center gap-14 whitespace-nowrap px-4 min-h-[64px]">
                  {[...CLIENTS, ...CLIENTS, ...CLIENTS].map((client, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-center opacity-75 transition-all hover:opacity-100 hover:scale-105 cursor-default grayscale hover:grayscale-0 min-h-[56px]"
                      title={client.name}
                    >
                      <span className="sr-only">{client.name}</span>
                      {client.logo ? (
                        <img
                          src={client.logo}
                          alt={`${client.name} logo`}
                          className="h-10 sm:h-11 w-auto max-w-[220px] object-contain select-none"
                          loading="lazy"
                          draggable={false}
                        />
                      ) : (
                        <>
                          <img
                            src={`https://logo.clearbit.com/${client.domain}?size=256`}
                            alt={`${client.name} logo`}
                            className="hidden h-10 sm:h-11 w-auto max-w-[220px] object-contain select-none"
                            loading="lazy"
                            draggable={false}
                            onLoad={(e) => {
                              (e.currentTarget as HTMLImageElement).classList.remove("hidden");
                              (e.currentTarget as HTMLImageElement).nextElementSibling?.classList.add("hidden");
                            }}
                            onError={(e) => {
                              const img = e.currentTarget as HTMLImageElement;
                              img.classList.add("hidden");
                              img.nextElementSibling?.classList.remove("hidden");
                            }}
                          />
                          <span
                            aria-hidden="true"
                            className="inline-flex items-center gap-2 font-semibold tracking-tight text-white"
                          >
                            <span
                              className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white/8 ring-1 ring-white/12"
                            >
                              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#ffd89b]">
                                {client.name
                                  .replace(/[^A-Za-z0-9 ]/g, " ")
                                  .split(/\s+/)
                                  .map((w) => w[0])
                                  .filter(Boolean)
                                  .slice(0, 3)
                                  .join("")}
                              </span>
                            </span>
                            <span className="text-[15px] sm:text-[16px] text-white">
                              {client.name}
                            </span>
                          </span>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-12 w-full animate-fade-in delay-500">
            <div className="relative w-full px-6 py-6 sm:px-10 sm:py-7 md:px-14 md:py-9">
              <div className="flex items-center items-baseline mb-7">
                <div className="inline-flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-white/8 ring-1 ring-white/15">
                    <Globe2 className="h-4 w-4 text-[#ffcd75]" />
                  </span>
                  <div className="flex flex-col leading-none">
                    <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-zinc-200">
                      Global Procurement Hubs
                    </span>
                    <span className="text-[10px] text-zinc-500 mt-1 tracking-wide">
                      Live local times across operations
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                {HUBS.map((hub) => {
                  const c = clocks[hub.zone] ?? { hhmm: "00:00", ss: "00" };
                  return (
                    <div
                      key={hub.zone}
                      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/6 via-white/[0.03] to-transparent p-5 sm:p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.07]"
                    >
                      <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-[#D78034]/14 blur-2xl opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#080A7E]/80 to-[#0A0C1A] ring-1 ring-white/12 text-white">
                            <span className="text-[11px] font-bold tracking-[0.18em] text-[#ffd89b]">
                              {hub.flag}
                            </span>
                          </span>
                          <div className="flex flex-col leading-none">
                            <span className="text-[12px] sm:text-[13px] font-semibold tracking-wide text-white">
                              {hub.name}
                            </span>
                            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 mt-1">
                              {hub.zone}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-end justify-between">
                        <time
                          className="tabular-nums font-bold text-[34px] sm:text-[40px] leading-none text-white tracking-tight drop-shadow-[0_2px_16px_rgba(5,6,20,0.55)]"
                          dateTime={new Date().toISOString()}
                          style={{ fontFeatureSettings: '"tnum"' }}
                        >
                          {c.hhmm}
                          <span className="mx-0.5 text-white/60">:</span>
                          <span className="tabular-nums font-semibold text-[20px] sm:text-[22px] text-[#ffcd75] align-bottom pb-1 inline-block">
                            {c.ss}
                          </span>
                        </time>
                      </div>

                      <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-white/[0.07]">
                        <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-[#080A7E]/80 via-[#2d30a8]/70 to-[#D78034]" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
