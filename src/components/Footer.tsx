"use client";

import React from "react";
import { ArrowUp, MessageSquare } from "lucide-react";
import { PROFILE } from "@/data/portfolio";
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from "./BrandIcons";

export default function Footer({ onOpenConnect }: { onOpenConnect: () => void }) {
  const ribbonOne = Array.from(
    { length: 10 },
    () => "Thanks for visiting Eshaan Gupta's portfolio!"
  );
  const ribbonTwo = Array.from(
    { length: 10 },
    () => "Code & Crafted with ⚡ in Pune, India by Eshaan Gupta"
  );

  return (
    <footer className="relative pt-10 border-t border-white/10 bg-obsidian-950 overflow-hidden">
      {/* Dual Kinetic Footer Marquees (itsvg-inspired, styled in Obsidian + Accent) */}
      <div className="space-y-2.5 pb-10 border-b border-white/[0.07] select-none">
        <div className="flex w-max gap-6 animate-marquee-left font-mono text-xs uppercase tracking-widest text-slate-400">
          {ribbonOne.map((txt, idx) => (
            <span key={`f1-${idx}`} className="flex items-center gap-6">
              <span>{txt}</span>
              <span className="text-accent">✦</span>
            </span>
          ))}
        </div>

        <div className="flex w-max gap-6 animate-marquee-right font-display text-sm font-semibold text-white/90">
          {ribbonTwo.map((txt, idx) => (
            <span key={`f2-${idx}`} className="flex items-center gap-6">
              <span>{txt}</span>
              <span className="text-accent">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="text-center sm:text-left">
          <div className="font-display font-bold text-white">
            {PROFILE.name}{" "}
            <span className="font-mono text-xs font-normal text-slate-400">
              · {PROFILE.location}
            </span>
          </div>
          <p className="font-mono text-xs text-slate-500 mt-1">
            © {new Date().getFullYear()} {PROFILE.name}. Deployed on Vercel.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="#projects"
            className="px-3 py-1.5 rounded-lg text-xs text-slate-300 hover:text-white transition-colors"
          >
            Projects
          </a>
          <a
            href="#journey"
            className="px-3 py-1.5 rounded-lg text-xs text-slate-300 hover:text-white transition-colors"
          >
            Journey
          </a>
          <a
            href="#reviews"
            className="px-3 py-1.5 rounded-lg text-xs text-slate-300 hover:text-white transition-colors"
          >
            Spotlights
          </a>

          <a
            href={PROFILE.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="p-2 rounded-xl bg-[#25D366]/15 text-[#25D366] border border-[#25D366]/30 hover:bg-[#25D366]/25 transition-colors"
          >
            <WhatsAppIcon className="w-4 h-4" />
          </a>

          <a
            href={PROFILE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-2 rounded-xl bg-white/[0.05] text-slate-200 border border-white/10 hover:bg-white/[0.1] transition-colors"
          >
            <GitHubIcon className="w-4 h-4" />
          </a>

          <a
            href={PROFILE.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-2 rounded-xl bg-white/[0.05] text-[#38bdf8] border border-white/10 hover:bg-white/[0.1] transition-colors"
          >
            <LinkedInIcon className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={onOpenConnect}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent text-obsidian-950 font-display font-bold text-xs hover:brightness-110 transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Let&apos;s Talk</span>
          </button>

          <a
            href="#top"
            aria-label="Back to top"
            className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-slate-200 transition-colors"
          >
            <ArrowUp className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
