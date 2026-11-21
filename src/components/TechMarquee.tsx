"use client";

import React, { useState } from "react";
import {
  TECH_MARQUEE_ROW_1,
  TECH_MARQUEE_ROW_2,
  type TechItem,
} from "@/data/portfolio";

const CATEGORIES: Array<"All" | TechItem["category"]> = [
  "All",
  "Language",
  "Frontend",
  "Backend & DB",
  "AI & ML",
  "Cloud & DevOps",
];

function MarqueeChip({
  item,
  dimmed,
}: {
  item: TechItem;
  dimmed: boolean;
}) {
  return (
    <div
      className={`inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl border transition-all duration-200 select-none shrink-0 ${
        dimmed
          ? "bg-obsidian-900/40 border-white/5 opacity-30"
          : "bg-obsidian-850/90 border-white/10 hover:border-accent/60 hover:bg-accent/10 shadow-sm"
      }`}
    >
      <span className="px-1.5 py-0.5 rounded-md bg-accent/15 border border-accent/30 font-mono text-[10px] font-bold text-accent tracking-wider">
        {item.badge}
      </span>
      <span className="font-display text-sm font-medium text-slate-200 whitespace-nowrap">
        {item.name}
      </span>
      <span className="text-slate-600 text-xs">•</span>
    </div>
  );
}

export default function TechMarquee() {
  const [selectedCat, setSelectedCat] = useState<"All" | TechItem["category"]>("All");

  const row1Doubled = [...TECH_MARQUEE_ROW_1, ...TECH_MARQUEE_ROW_1];
  const row2Doubled = [...TECH_MARQUEE_ROW_2, ...TECH_MARQUEE_ROW_2];

  return (
    <section
      id="stack"
      aria-label="Languages and technology stack"
      className="relative py-8 sm:py-10 border-y border-white/[0.07] bg-obsidian-900/50 overflow-hidden"
    >
      {/* Subtle side fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 z-10 bg-gradient-to-r from-obsidian-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 z-10 bg-gradient-to-l from-obsidian-950 to-transparent" />

      {/* Interactive Category Spotlight Pills */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-slate-400">
            Languages, Frameworks &amp; AI Stack
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {CATEGORIES.map((cat) => {
            const active = selectedCat === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCat(cat)}
                className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition-all ${
                  active
                    ? "bg-accent text-obsidian-950 font-bold shadow-[0_0_14px_rgb(var(--accent-rgb)/0.35)]"
                    : "bg-white/[0.04] text-slate-400 hover:text-white border border-white/10"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dual Opposite-Scrolling Kinetic Ribbons */}
      <div className="space-y-3 marquee-group">
        <div className="flex w-max gap-3 animate-marquee-left marquee-track">
          {row1Doubled.map((item, idx) => (
            <MarqueeChip
              key={`r1-${item.name}-${idx}`}
              item={item}
              dimmed={selectedCat !== "All" && item.category !== selectedCat}
            />
          ))}
        </div>

        <div className="flex w-max gap-3 animate-marquee-right marquee-track">
          {row2Doubled.map((item, idx) => (
            <MarqueeChip
              key={`r2-${item.name}-${idx}`}
              item={item}
              dimmed={selectedCat !== "All" && item.category !== selectedCat}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
