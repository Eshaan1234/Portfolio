"use client";

import React, { useEffect, useRef, useState } from "react";
import { Menu, X, Sparkles, Palette, MessageSquare } from "lucide-react";
import { PROFILE, THEME_PRESETS, type ThemePreset } from "@/data/portfolio";
import { WhatsAppIcon, GitHubIcon } from "./BrandIcons";

interface NavbarProps {
  activeTheme: ThemePreset["id"];
  onSelectTheme: (id: ThemePreset["id"]) => void;
  cursorEnabled: boolean;
  onToggleCursor: () => void;
  onOpenConnect: () => void;
}

const NAV_LINKS = [
  { label: "Stack", href: "#stack" },
  { label: "Terminal", href: "#terminal" },
  { label: "Projects", href: "#projects" },
  { label: "Principles", href: "#principles" },
  { label: "Journey", href: "#journey" },
  { label: "Reviews", href: "#reviews" },
];

export default function Navbar({
  activeTheme,
  onSelectTheme,
  cursorEnabled,
  onToggleCursor,
  onOpenConnect,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const paletteRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handlePointerDown = (e: MouseEvent) => {
      if (
        paletteRef.current &&
        !paletteRef.current.contains(e.target as Node)
      ) {
        setPaletteOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPaletteOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-3 sm:px-6 pt-3 sm:pt-4 pointer-events-none">
      <div className="max-w-6xl mx-auto pointer-events-auto">
        <nav
          aria-label="Primary"
          className="relative flex items-center justify-between gap-3 px-4 py-2.5 rounded-2xl bg-obsidian-900/80 backdrop-blur-xl border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.55)]"
        >
          {/* Brand Monogram + Live Pune Status */}
          <a
            href="#top"
            className="flex items-center gap-3 group"
            data-cursor="HOME"
          >
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-accent/25 to-accent-secondary/20 border border-accent/40 font-display font-bold text-sm tracking-tight text-white shadow-[0_0_18px_rgb(var(--accent-rgb)/0.25)] group-hover:scale-105 transition-transform">
              EG
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-obsidian-900" />
            </div>
            <div className="leading-tight">
              <div className="font-display font-bold text-sm sm:text-base text-white tracking-tight">
                {PROFILE.name}
              </div>
              <div className="hidden sm:flex items-center gap-1.5 font-mono text-[11px] text-slate-400">
                <span>Pune, IN</span>
                <span className="text-accent">•</span>
                <span className="text-accent/90">Available</span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-xl p-1">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right Controls: Theme Switcher, Cursor FX, GitHub, WhatsApp & Let's Talk */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Accent Theme Switcher */}
            <div ref={paletteRef} className="relative">
              <button
                type="button"
                onClick={() => setPaletteOpen((v) => !v)}
                aria-label="Switch accent theme"
                title="Switch accent color"
                className="flex items-center gap-1.5 p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white transition-colors"
              >
                <Palette className="w-4 h-4 text-accent" />
                <span className="hidden xl:inline font-mono text-[11px]">Theme</span>
              </button>

              {paletteOpen && (
                <div className="absolute right-0 mt-2 w-48 p-2 rounded-2xl bg-obsidian-900/95 backdrop-blur-xl border border-white/15 shadow-2xl z-50">
                  <div className="px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-slate-400">
                    Accent Preset
                  </div>
                  <div className="space-y-1 mt-1">
                    {THEME_PRESETS.map((preset) => {
                      const selected = preset.id === activeTheme;
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => {
                            onSelectTheme(preset.id);
                            setPaletteOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-colors ${
                            selected
                              ? "bg-white/10 text-white font-semibold"
                              : "text-slate-300 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          <span>{preset.label}</span>
                          <span className="flex items-center gap-1">
                            <span
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: preset.swatchHex }}
                            />
                            <span
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: preset.swatch2Hex }}
                            />
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Custom Cursor FX Toggle (Desktop) */}
            <button
              type="button"
              onClick={onToggleCursor}
              title={cursorEnabled ? "Disable custom cursor FX" : "Enable custom cursor FX"}
              aria-label="Toggle cursor effects"
              className={`hidden md:flex items-center gap-1 p-2 rounded-xl border transition-colors ${
                cursorEnabled
                  ? "bg-accent/15 border-accent/40 text-accent"
                  : "bg-white/[0.04] border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              <Sparkles className="w-4 h-4" />
            </button>

            {/* Quick GitHub Icon */}
            <a
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              data-cursor="GITHUB ↗"
              className="hidden sm:flex p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 text-slate-300 hover:text-white transition-colors"
            >
              <GitHubIcon className="w-4 h-4" />
            </a>

            {/* Quick WhatsApp Icon */}
            <a
              href={PROFILE.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              data-cursor="WHATSAPP 💬"
              className="flex p-2 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/35 text-[#25D366] transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4" />
            </a>

            {/* Let's Talk Primary CTA */}
            <button
              type="button"
              onClick={onOpenConnect}
              data-cursor="CONNECT ⚡"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-accent text-obsidian-950 font-display font-bold text-xs sm:text-sm shadow-[0_0_24px_rgb(var(--accent-rgb)/0.35)] hover:brightness-110 active:scale-95 transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Let&apos;s Talk</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-2 rounded-xl bg-white/[0.04] border border-white/10 text-slate-200"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Drawer */}
        {mobileOpen && (
          <div className="lg:hidden mt-2 p-4 rounded-2xl bg-obsidian-900/95 backdrop-blur-xl border border-white/10 shadow-2xl space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 text-sm font-medium text-slate-200"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
              <a
                href={PROFILE.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#25D366]/15 border border-[#25D366]/35 text-[#25D366] text-xs font-semibold"
              >
                <WhatsAppIcon className="w-4 h-4" />
                WhatsApp
              </a>
              <a
                href={PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-white text-xs font-semibold"
              >
                <GitHubIcon className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
