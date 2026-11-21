"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, Wifi } from "lucide-react";
import { EXPERIENCE } from "@/data/portfolio";
import { SmartChipSvg } from "./BrandIcons";

export default function ExperienceSection() {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollTrack = (direction: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const offset = direction === "left" ? -380 : 380;
    el.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <section id="journey" className="py-20 sm:py-24 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent mb-2">
              <span>// Experience &amp; Education</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              Developer Smart-Pass Journey
            </h2>
            <p className="text-slate-400 text-sm mt-1.5">
              Internships, flagship products, open-source labs &amp; B.Tech
              milestones.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-accent mr-1">
              Scroll this way &gt;&gt;
            </span>
            <button
              type="button"
              onClick={() => scrollTrack("left")}
              aria-label="Scroll experience left"
              className="p-2.5 rounded-xl bg-obsidian-850 hover:bg-obsidian-800 border border-white/10 text-slate-200 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollTrack("right")}
              aria-label="Scroll experience right"
              className="p-2.5 rounded-xl bg-obsidian-850 hover:bg-obsidian-800 border border-white/10 text-slate-200 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Smart-Chip Pass Track */}
        <div
          ref={trackRef}
          data-cursor="SCROLL ↔"
          className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4"
        >
          {EXPERIENCE.map((card, idx) => (
            <article
              key={card.id}
              className="snap-start shrink-0 w-[320px] sm:w-[390px] rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-obsidian-850 via-obsidian-900 to-obsidian-950 border border-white/15 hover:border-accent/55 shadow-[0_20px_60px_rgba(0,0,0,0.6)] relative overflow-hidden group transition-all"
            >
              {/* Holographic diagonal sheen */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rotate-12"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgb(var(--accent-rgb) / 0.09), rgb(var(--accent2-rgb) / 0.09), transparent)",
                }}
              />

              {/* Top Row: Metallic EMV Chip + Contactless NFC + Badge */}
              <div className="relative z-10 flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <SmartChipSvg />
                  <Wifi className="w-4 h-4 text-slate-500 rotate-90" />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-accent/15 border border-accent/35 font-mono text-[10px] font-bold tracking-wider text-accent">
                  {card.badge}
                </span>
              </div>

              {/* Role & Organization */}
              <div className="relative z-10 space-y-1 mb-4">
                <div className="font-mono text-[11px] text-slate-500">
                  {card.serial}
                </div>
                <h3 className="font-display text-xl font-bold text-white leading-snug">
                  {card.role}
                </h3>
              </div>

              <p className="relative z-10 text-xs sm:text-sm text-slate-300/90 leading-relaxed mb-6">
                {card.summary}
              </p>

              {/* Card Footer Metadata (Credit-card inspired layout) */}
              <div className="relative z-10 pt-4 border-t border-white/10 grid grid-cols-2 gap-3 mb-4">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                    Organization
                  </div>
                  <div className="font-display font-semibold text-sm text-white mt-0.5">
                    {card.company}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                    Tenure
                  </div>
                  <div className="font-mono text-xs text-accent mt-1">
                    {card.tenure}
                  </div>
                </div>
              </div>

              {/* Stack Chips */}
              <div className="relative z-10 flex flex-wrap gap-1.5">
                {card.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded bg-white/[0.05] font-mono text-[10px] text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
                <span className="ml-auto font-mono text-[10px] text-slate-600">
                  0{idx + 1}/0{EXPERIENCE.length}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
