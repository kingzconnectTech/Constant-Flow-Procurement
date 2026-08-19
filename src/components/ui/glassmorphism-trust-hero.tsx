import { useEffect, useState } from "react";
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

      <div className="relative z-10 w-full px-3 sm:px-6 md:px-10 lg:px-16 xl:px-20 pt-20 sm:pt-24 pb-12 sm:pb-16 md:pt-32 md:pb-24">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 md:gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-12 items-start">
          <div className="lg:col-span-8 flex flex-col justify-center space-y-6 sm:space-y-8 pt-2 sm:pt-4">
            <div className="animate-fade-in delay-100">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-1.5 sm:px-3.5 sm:py-2 backdrop-blur-md transition-colors hover:bg-white/14">
                <span className="text-[9px] sm:text-[10px] md:text-xs font-semibold uppercase tracking-wider text-zinc-100 flex items-center gap-2">
                  Global Procurement Partner
                  <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#ffcd75] fill-[#D78034]" />
                </span>
              </div>
            </div>

            <h1
              className="animate-fade-in delay-200 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tighter leading-[0.95] text-white drop-shadow-[0_2px_14px_rgba(5,6,20,0.6)]"
              style={{
                maskImage:
                  "linear-gradient(180deg, black 0%, black 84%, rgba(0,0,0,0.92) 100%)",
                WebkitMaskImage:
                  "linear-gradient(180deg, black 0%, black 84%, rgba(0,0,0,0.92) 100%)",
              }}
            >
              Smarter Procurement<br />
              <span className="bg-gradient-to-br from-white via-white to-[#ffd89b] bg-clip-text text-transparent">
                For Critical Operations.
              </span>
            </h1>

            <p className="animate-fade-in delay-300 max-w-xl sm:max-w-2xl text-sm sm:text-base md:text-lg text-zinc-200 leading-relaxed">
              Constantflow simplifies complex industrial procurement by sourcing
              critical oil &amp; gas equipment, heavy machinery and technical
              supplies from vetted suppliers worldwide.
            </p>

            <div className="animate-fade-in delay-400 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href="#request-rfq"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#D78034] px-6 py-3 sm:px-8 sm:py-4 text-xs sm:text-sm md:text-base font-semibold text-[#0c0917] transition-all hover:scale-[1.02] hover:brightness-105 active:scale-[0.98] shadow-[0_10px_32px_rgba(215,128,52,0.34)]"
              >
                Start Your Procurement
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#services"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/18 bg-white/8 px-6 py-3 sm:px-8 sm:py-4 text-xs sm:text-sm md:text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/14 hover:border-white/28"
              >
                <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                Explore Services
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-5 sm:space-y-6 lg:mt-2">
            <div className="animate-fade-in delay-500 relative overflow-hidden rounded-3xl border border-white/12 bg-white/8 p-5 sm:p-6 md:p-7 backdrop-blur-xl shadow-2xl">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-[#D78034]/20 blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 h-56 w-56 rounded-full bg-[#080A7E]/30 blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-5 sm:space-y-6">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <Globe2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#ffcd75]" />
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#ffcd75]">
                      Global Sourcing
                    </span>
                  </div>
                  <p className="text-sm sm:text-[15px] md:text-base font-medium text-white leading-snug">
                    Europe · Asia · North America · Africa
                  </p>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#ffcd75]" />
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#ffcd75]">
                      Industrial Expertise
                    </span>
                  </div>
                  <p className="text-sm sm:text-[15px] md:text-base font-medium text-white leading-snug">
                    Oil &amp; Gas · Heavy Equipment · Industrial Components
                  </p>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <Crown className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#ffcd75]" />
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#ffcd75]">
                      Vetted Supplier Network
                    </span>
                  </div>
                  <p className="text-sm sm:text-[15px] md:text-base font-medium text-zinc-200 leading-snug">
                    Qualified suppliers across global markets
                  </p>
                </div>

                <div className="pt-1 flex flex-wrap gap-2">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/8 px-2.5 py-1 sm:px-3 sm:py-1.5 text-[9px] sm:text-[10px] font-medium tracking-wide text-zinc-200">
                    <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-green-500" />
                    </span>
                    ACTIVE NETWORK
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/8 px-2.5 py-1 sm:px-3 sm:py-1.5 text-[9px] sm:text-[10px] font-medium tracking-wide text-zinc-200">
                    <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#ffcd75] fill-[#D78034]" />
                    PREMIUM SOURCING
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-fade-in delay-500 relative overflow-hidden rounded-3xl border border-white/12 bg-white/8 py-5 sm:py-7 backdrop-blur-xl">
              <h3 className="mb-4 sm:mb-5 px-5 sm:px-7 text-xs sm:text-sm font-medium text-zinc-300">
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
                <div className="animate-marquee flex items-center gap-8 sm:gap-10 md:gap-14 whitespace-nowrap px-3 sm:px-4 min-h-[56px] sm:min-h-[64px]">
                  {[...CLIENTS, ...CLIENTS, ...CLIENTS].map((client, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-center opacity-75 transition-all hover:opacity-100 hover:scale-105 cursor-default grayscale hover:grayscale-0 min-h-[48px] sm:min-h-[56px]"
                      title={client.name}
                    >
                      <span className="sr-only">{client.name}</span>
                      {client.logo ? (
                        <img
                          src={client.logo}
                          alt={`${client.name} logo`}
                          className="h-8 sm:h-10 md:h-11 w-auto max-w-[160px] sm:max-w-[190px] md:max-w-[220px] object-contain select-none"
                          loading="lazy"
                          draggable={false}
                        />
                      ) : (
                        <>
                          <img
                            src={`https://logo.clearbit.com/${client.domain}?size=256`}
                            alt={`${client.name} logo`}
                            className="hidden h-8 sm:h-10 md:h-11 w-auto max-w-[160px] sm:max-w-[190px] md:max-w-[220px] object-contain select-none"
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
                              className="inline-flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg sm:rounded-xl bg-white/8 ring-1 ring-white/12"
                            >
                              <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.18em] text-[#ffcd75]">
                                {client.name
                                  .replace(/[^A-Za-z0-9 ]/g, " ")
                                  .split(/\s+/)
                                  .map((w) => w[0])
                                  .filter(Boolean)
                                  .slice(0, 3)
                                  .join("")}
                              </span>
                            </span>
                            <span className="text-[13px] sm:text-[15px] md:text-[16px] text-white">
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
            <div className="relative w-full px-4 sm:px-6 md:px-8 py-4 sm:py-5">
              <div className="relative flex items-center justify-between gap-3 sm:gap-5 md:gap-7 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/6 backdrop-blur-xl px-4 sm:px-6 md:px-8 py-3 sm:py-4 overflow-hidden">
                <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-[#080A7E]/30 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-[#D78034]/18 blur-3xl pointer-events-none" />

                {HUBS.map((hub, idx) => {
                  const c = clocks[hub.zone] ?? { hhmm: "00:00", ss: "00" };
                  return (
                    <div key={hub.zone} className={`relative z-10 flex items-center gap-2.5 sm:gap-3 md:gap-4 ${idx !== HUBS.length - 1 ? "pr-3 sm:pr-4 md:pr-6 border-r border-white/10" : ""}`}>
                      <span className="shrink-0 inline-flex items-center justify-center rounded-lg sm:rounded-xl bg-white/8 ring-1 ring-white/12 w-8 h-8 sm:w-9 sm:h-9 text-[13px] sm:text-[15px] leading-none" aria-hidden="true">
                        {hub.flag === "EU" ? "🇪🇺" : hub.flag === "SG" ? "🇸🇬" : hub.flag === "US" ? "🇺🇸" : "🇳🇬"}
                      </span>
                      <div className="flex flex-col leading-none min-w-[48px] sm:min-w-[56px]">
                        <span className="text-[10px] sm:text-[11px] md:text-xs font-bold tracking-[0.18em] text-white">
                          {hub.name}
                        </span>
                        <span className="text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.22em] text-zinc-500 mt-1">
                          {hub.zone}
                        </span>
                      </div>
                      <time
                        className="tabular-nums font-semibold text-[18px] sm:text-[22px] md:text-[26px] leading-none text-white tracking-tight"
                        dateTime={new Date().toISOString()}
                        style={{ fontFeatureSettings: '"tnum"' }}
                      >
                        {c.hhmm}
                        <span className="tabular-nums font-semibold text-[11px] sm:text-[13px] md:text-[15px] text-[#ffcd75] align-baseline ml-0.5">
                          :{c.ss}
                        </span>
                      </time>
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
