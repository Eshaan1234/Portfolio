"use client";

import React from "react";
import {
  Cpu,
  Globe,
  Gauge,
  Smartphone,
  Sparkles,
  Code2,
} from "lucide-react";
import { PRINCIPLES } from "@/data/portfolio";

const ICONS = [Code2, Globe, Cpu, Smartphone, Gauge, Sparkles];

export default function PrinciplesSection() {
  return (
    <section id="principles" className="py-20 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent mb-2">
            <span>{"// Core Engineering DNA"}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
            Principles Behind Every Build
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            How I approach product architecture, UI polish, and real-world
            reliability across web and ML projects.
          </p>
        </div>

        {/* Asymmetric Architectural Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
          {PRINCIPLES.map((item, idx) => {
            const Icon = ICONS[idx % ICONS.length];
            const spanClass =
              idx === 0 || idx === 3
                ? "md:col-span-4"
                : idx === 1 || idx === 2
                  ? "md:col-span-2"
                  : "md:col-span-3";

            return (
              <div
                key={item.id}
                className={`${spanClass} group relative rounded-3xl p-6 sm:p-7 bg-obsidian-900/90 border border-white/10 hover:border-accent/45 transition-all overflow-hidden`}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 -top-10 w-36 h-36 rounded-full bg-accent/10 blur-2xl group-hover:bg-accent/20 transition-all"
                />

                <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-accent/15 border border-accent/30 text-accent">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs text-slate-500">
                      {item.number}
                    </span>
                  </div>

                  <div>
                    <span className="inline-block font-mono text-[11px] text-accent mb-1.5">
                      {item.tag}
                    </span>
                    <h3 className="font-display text-xl font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-300/90 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
