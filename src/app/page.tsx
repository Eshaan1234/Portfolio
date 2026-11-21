"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import InteractiveTerminal from "@/components/InteractiveTerminal";
import ProjectsSection from "@/components/ProjectsSection";
import ImpactMapSection from "@/components/ImpactMapSection";
import PrinciplesSection from "@/components/PrinciplesSection";
import ExperienceSection from "@/components/ExperienceSection";
import TestimonialsAndSupport from "@/components/TestimonialsAndSupport";
import {
  ConnectModal,
  ConnectSection,
} from "@/components/ConnectModalAndSection";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { PROFILE, THEME_PRESETS, type ThemePreset } from "@/data/portfolio";
import { WhatsAppIcon } from "@/components/BrandIcons";

export default function PortfolioPage() {
  const [activeTheme, setActiveTheme] = useState<ThemePreset["id"]>("emerald");
  const [cursorEnabled, setCursorEnabled] = useState(true);
  const [connectOpen, setConnectOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 26,
    restDelta: 0.001,
  });

  // Restore saved theme / cursor preferences
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(
        "eshaan-theme"
      ) as ThemePreset["id"] | null;
      if (savedTheme && THEME_PRESETS.some((p) => p.id === savedTheme)) {
        setActiveTheme(savedTheme);
      }
      const savedCursor = localStorage.getItem("eshaan-cursor");
      if (savedCursor === "false") {
        setCursorEnabled(false);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  // Apply CSS custom properties whenever theme changes
  useEffect(() => {
    const preset =
      THEME_PRESETS.find((p) => p.id === activeTheme) || THEME_PRESETS[0];
    document.documentElement.style.setProperty("--accent-rgb", preset.accentRgb);
    document.documentElement.style.setProperty(
      "--accent2-rgb",
      preset.accent2Rgb
    );
    try {
      localStorage.setItem("eshaan-theme", preset.id);
    } catch {
      // ignore
    }
  }, [activeTheme]);

  const toggleCursor = () => {
    setCursorEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("eshaan-cursor", String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  return (
    <div className="relative min-h-screen">
      {/* Top Scroll Progress Laser Bar */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: smoothProgress }}
        className="fixed top-0 inset-x-0 h-[3px] z-[70] origin-left bg-gradient-to-r from-accent via-accent-secondary to-accent"
      />

      {/* Custom Magnetic Cursor + Spotlight + Click Sparks */}
      <CustomCursor enabled={cursorEnabled} />

      {/* Floating Command Navbar */}
      <Navbar
        activeTheme={activeTheme}
        onSelectTheme={setActiveTheme}
        cursorEnabled={cursorEnabled}
        onToggleCursor={toggleCursor}
        onOpenConnect={() => setConnectOpen(true)}
      />

      {/* Main Content */}
      <main>
        <Hero onOpenConnect={() => setConnectOpen(true)} />
        <TechMarquee />
        <InteractiveTerminal onOpenConnect={() => setConnectOpen(true)} />
        <ProjectsSection />
        <ImpactMapSection />
        <PrinciplesSection />
        <ExperienceSection />
        <TestimonialsAndSupport />
        <ConnectSection />
      </main>

      {/* Dual-Ribbon Kinetic Footer */}
      <Footer onOpenConnect={() => setConnectOpen(true)} />

      {/* Floating Bottom-Right Direct WhatsApp Pill */}
      <a
        href={PROFILE.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="CHAT NOW 💬"
        aria-label="Message Eshaan on WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-[#25D366] text-obsidian-950 font-display font-bold text-xs shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:scale-105 active:scale-95 transition-transform"
      >
        <WhatsAppIcon className="w-4 h-4" />
        <span className="hidden sm:inline">WhatsApp Me</span>
      </a>

      {/* Let's Talk Modal */}
      <ConnectModal open={connectOpen} onClose={() => setConnectOpen(false)} />
    </div>
  );
}
