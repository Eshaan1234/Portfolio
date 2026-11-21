"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Copy,
  MapPin,
  Terminal as TerminalIcon,
  Clock,
  Layers,
} from "lucide-react";
import { PROFILE } from "@/data/portfolio";
import {
  WhatsAppIcon,
  GitHubIcon,
  LinkedInIcon,
  InstagramIcon,
  DiscordIcon,
} from "./BrandIcons";

export default function Hero({ onOpenConnect }: { onOpenConnect: () => void }) {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [priorityIndex, setPriorityIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [istTime, setIstTime] = useState<string>("");
  const [imgFailed, setImgFailed] = useState(false);

  // Rotate multi-language greeting
  useEffect(() => {
    const id = window.setInterval(() => {
      setGreetingIndex((i) => (i + 1) % PROFILE.greetings.length);
    }, 2400);
    return () => window.clearInterval(id);
  }, []);

  // Rotate engineering priority word (itsvg-inspired dynamic word slot)
  useEffect(() => {
    const id = window.setInterval(() => {
      setPriorityIndex((i) => (i + 1) % PROFILE.priorities.length);
    }, 2200);
    return () => window.clearInterval(id);
  }, []);

  // Live Pune IST clock
  useEffect(() => {
    const tick = () => {
      try {
        const formatted = new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(new Date());
        setIstTime(`${formatted} IST`);
      } catch {
        setIstTime("UTC+05:30 IST");
      }
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  const currentGreeting = PROFILE.greetings[greetingIndex];
  const currentPriority = PROFILE.priorities[priorityIndex];

  return (
    <section
      id="top"
      className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 overflow-hidden"
    >
      {/* Ambient Radial Mesh Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/4 w-[520px] h-[520px] rounded-full blur-[130px] opacity-25"
        style={{ background: "rgb(var(--accent-rgb))" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-32 right-10 w-[420px] h-[420px] rounded-full blur-[130px] opacity-15"
        style={{ background: "rgb(var(--accent2-rgb))" }}
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* Left Column: Kinetic Headline, Priority Rotator & Social Actions */}
        <div className="lg:col-span-7 space-y-6">
          {/* Multi-Script Greeting Pill + Availability */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/35 text-xs font-mono">
              <span className="text-base leading-none">👋</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentGreeting.text}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                  className="font-semibold text-accent"
                >
                  {currentGreeting.text}
                </motion.span>
              </AnimatePresence>
              <span className="text-slate-400 text-[11px]">
                ({currentGreeting.lang})
              </span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{PROFILE.availability}</span>
            </div>
          </div>

          {/* Main Display Title */}
          <div className="space-y-3">
            <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-slate-400">
              I&apos;m{" "}
              <span className="text-white font-semibold">{PROFILE.name}</span> —{" "}
              {PROFILE.degree}
            </p>

            <h1 className="font-display text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              Full-Stack &amp; AI Builder{" "}
              <span className="text-slate-400 font-normal">
                crafting web products that prioritize
              </span>{" "}
              <span className="inline-flex items-center align-bottom px-3.5 py-1 mt-1 rounded-2xl bg-gradient-to-r from-accent/20 to-accent-secondary/20 border border-accent/45 text-accent shadow-[0_0_30px_rgb(var(--accent-rgb)/0.2)]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentPriority}
                    initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
                    transition={{ duration: 0.26, ease: "easeOut" }}
                    className="inline-block"
                  >
                    {currentPriority}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>
          </div>

          <p className="text-base sm:text-lg text-slate-300/90 max-w-2xl leading-relaxed">
            {PROFILE.bioShort} Creator of{" "}
            <a
              href="https://medisetu-black.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline decoration-accent/60 underline-offset-4 hover:text-accent transition-colors"
            >
              MediSetu
            </a>{" "}
            (23 Indian languages) &amp;{" "}
            <a
              href="https://medifinder-two.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline decoration-accent/60 underline-offset-4 hover:text-accent transition-colors"
            >
              MedNear PWA
            </a>
            .
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href={PROFILE.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="WHATSAPP 💬"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-[#25D366] text-obsidian-950 font-display font-bold text-sm shadow-[0_8px_28px_rgba(37,211,102,0.3)] hover:brightness-110 active:scale-95 transition-all"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href="#projects"
              data-cursor="EXPLORE"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.11] border border-white/15 text-white font-display font-semibold text-sm transition-all"
            >
              <Layers className="w-4 h-4 text-accent" />
              <span>Explore Projects (11)</span>
            </a>

            <button
              type="button"
              onClick={copyEmail}
              data-cursor="COPY EMAIL"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-obsidian-850 hover:bg-obsidian-800 border border-white/10 text-slate-300 hover:text-white font-mono text-xs transition-all"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-accent" />
                  <span>{PROFILE.email}</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Social Strip */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500 mr-1">
              Find me on:
            </span>
            <a
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="OPEN ↗"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 text-xs text-slate-300 hover:text-white transition-colors"
            >
              <GitHubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href={PROFILE.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="OPEN ↗"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 text-xs text-slate-300 hover:text-white transition-colors"
            >
              <LinkedInIcon className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://www.instagram.com/eshaan_cannot_lift"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="OPEN ↗"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 text-xs text-slate-300 hover:text-white transition-colors"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
              <span>Instagram</span>
            </a>
            <a
              href="https://discord.gg/wY8qsQv2Q"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="OPEN ↗"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 text-xs text-slate-300 hover:text-white transition-colors"
            >
              <DiscordIcon className="w-3.5 h-3.5 text-indigo-400" />
              <span>Discord</span>
            </a>
            <button
              type="button"
              onClick={onOpenConnect}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-accent/10 hover:bg-accent/20 border border-accent/30 text-xs font-mono text-accent transition-colors"
            >
              <span>+ All 10 Links</span>
            </button>
          </div>
        </div>

        {/* Right Column: Architectural Developer Telemetry & Passport Card */}
        <div className="lg:col-span-5">
          <div className="relative rounded-3xl p-6 bg-gradient-to-b from-obsidian-850/95 to-obsidian-900/95 border border-white/10 shadow-[0_24px_70px_rgba(0,0,0,0.65)] overflow-hidden">
            {/* Subtle top accent beam */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-accent-secondary to-transparent" />

            <div className="flex items-center justify-between gap-4 pb-5 border-b border-white/10">
              <div className="flex items-center gap-3.5">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-accent/50 bg-obsidian-800 flex items-center justify-center shrink-0">
                  {!imgFailed ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={PROFILE.avatarUrl}
                      alt={PROFILE.name}
                      onError={() => setImgFailed(true)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="font-display font-bold text-xl text-accent">
                      EG
                    </span>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-display font-bold text-lg text-white">
                      {PROFILE.name}
                    </h2>
                    <span className="px-2 py-0.5 rounded-md bg-accent/15 border border-accent/30 font-mono text-[10px] text-accent">
                      @{PROFILE.handle}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    B.Tech CSE/Eng · Full-Stack &amp; ML
                  </p>
                </div>
              </div>
            </div>

            {/* Live Telemetry Grid */}
            <div className="grid grid-cols-2 gap-3 my-5">
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-accent" />
                  <span>Base Station</span>
                </div>
                <div className="mt-1 font-display font-semibold text-sm text-white">
                  Pune, Maharashtra
                </div>
                <div className="font-mono text-[10px] text-slate-500">
                  {PROFILE.coordinates}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-accent-secondary" />
                  <span>Local Time</span>
                </div>
                <div className="mt-1 font-mono font-semibold text-sm text-white">
                  {istTime || "IST (UTC+5:30)"}
                </div>
                <div className="font-mono text-[10px] text-emerald-400">
                  ● Active &amp; Building
                </div>
              </div>
            </div>

            {/* Off-Keyboard Persona Chips */}
            <div className="space-y-2 mb-5">
              <div className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
                Current Focus &amp; Off-Screen
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {PROFILE.bioExtended}
              </p>
            </div>

            {/* Quick Interactive Terminal Launcher */}
            <a
              href="#terminal"
              data-cursor="RUN >_"
              className="flex items-center justify-between px-4 py-3 rounded-2xl bg-obsidian-950/90 hover:bg-obsidian-950 border border-accent/30 group transition-all"
            >
              <div className="flex items-center gap-2.5 font-mono text-xs">
                <TerminalIcon className="w-4 h-4 text-accent" />
                <span className="text-slate-400">eshaan@pune:~$</span>
                <span className="text-white group-hover:text-accent transition-colors">
                  fortune eshaan.fortune
                </span>
              </div>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-accent/15 text-accent">
                Interactive ↓
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
