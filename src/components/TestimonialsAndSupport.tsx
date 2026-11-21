"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Coffee,
  HeartHandshake,
  Quote,
  Star,
} from "lucide-react";
import {
  COMMUNITY_PULSES,
  HIGHLIGHTS_REVIEWS,
  PROFILE,
} from "@/data/portfolio";
import { GitHubIcon } from "./BrandIcons";

export default function TestimonialsAndSupport() {
  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex((i) => (i - 1 + HIGHLIGHTS_REVIEWS.length) % HIGHLIGHTS_REVIEWS.length);
  const next = () =>
    setIndex((i) => (i + 1) % HIGHLIGHTS_REVIEWS.length);

  const current = HIGHLIGHTS_REVIEWS[index];

  return (
    <section id="reviews" className="py-20 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 7 Cols: Project Spotlights & Endorsements Carousel */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl p-6 sm:p-9 bg-obsidian-900/90 border border-white/10 shadow-xl">
          <div>
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-accent mb-1">
                  // Project Spotlights &amp; Reviews
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                  What Makes My Builds Stand Out
                </h2>
              </div>
              <Quote className="w-9 h-9 text-accent/30 shrink-0" />
            </div>

            <div className="min-h-[190px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-5"
                >
                  <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
                    &ldquo;{current.quote}&rdquo;
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div>
                      <div className="font-display font-bold text-white">
                        {current.author}
                      </div>
                      <div className="font-mono text-xs text-slate-400">
                        {current.role} ·{" "}
                        <span className="text-accent">{current.project}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-amber-400">
                      {Array.from({ length: current.rating }).map((_, idx) => (
                        <Star
                          key={idx}
                          className="w-4 h-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/10">
            <div className="flex items-center gap-1.5">
              {HIGHLIGHTS_REVIEWS.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Go to spotlight ${idx + 1}`}
                  onClick={() => setIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === index ? "w-7 bg-accent" : "w-2 bg-white/20"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous spotlight"
                className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next spotlight"
                className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Support / Open-Source / Buy-Coffee-Style Collaboration Card */}
        <div className="lg:col-span-5 rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-obsidian-850 to-obsidian-950 border border-accent/30 shadow-xl flex flex-col justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 font-mono text-xs text-amber-300 mb-4">
              <Coffee className="w-3.5 h-3.5" />
              <span>Support &amp; Open Source</span>
            </div>

            <h3 className="font-display text-2xl font-bold text-white mb-2">
              Enjoying my projects?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
              Star my repositories on GitHub, share feedback, or ping me on
              WhatsApp if you want to build something ambitious together!
            </p>

            {/* Recent Shipped Pulses */}
            <div className="space-y-2.5">
              {COMMUNITY_PULSES.map((pulse) => (
                <div
                  key={pulse.title}
                  className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-start gap-3"
                >
                  <span className="text-lg leading-none mt-0.5">
                    {pulse.emoji}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5 text-xs">
                      <span className="font-semibold text-white">
                        {pulse.title}
                      </span>
                      <span className="text-accent font-mono text-[10px]">
                        · {pulse.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                      {pulse.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 pt-2">
            <a
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="STAR ★"
              className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-amber-400 text-obsidian-950 font-display font-bold text-xs hover:brightness-110 transition-all"
            >
              <GitHubIcon className="w-4 h-4" />
              <span>Star on GitHub</span>
            </a>

            <a
              href={PROFILE.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="COLLAB 💬"
              className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-accent/15 hover:bg-accent/25 border border-accent/40 text-accent font-display font-bold text-xs transition-all"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>Collaborate</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
