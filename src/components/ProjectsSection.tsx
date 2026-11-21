"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { PROJECTS, type ProjectItem } from "@/data/portfolio";
import { GitHubIcon, ProjectEmblem } from "./BrandIcons";

const CATEGORIES: Array<"All" | ProjectItem["category"]> = [
  "All",
  "Full-Stack",
  "AI / ML",
  "Games & UI",
  "Systems & Java",
];

function SpotlightProjectCard({ project }: { project: ProjectItem }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor={project.liveUrl ? "LIVE APP ↗" : "REPO ↗"}
      className="group relative flex flex-col justify-between rounded-3xl p-6 bg-obsidian-900/90 border border-white/10 hover:border-accent/45 transition-all duration-300 overflow-hidden shadow-[0_14px_40px_rgba(0,0,0,0.45)]"
    >
      {/* Interactive Mouse-Tracking Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(360px circle at ${mousePos.x}px ${mousePos.y}px, rgb(var(--accent-rgb) / 0.13), transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        {/* Card Header: Emblem + Highlight Pill */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <ProjectEmblem
            type={project.iconType}
            from={project.accentFrom}
            to={project.accentTo}
          />
          <span className="px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/10 font-mono text-[10px] text-accent font-medium">
            {project.highlight}
          </span>
        </div>

        {/* Title & Live Domain */}
        <div className="space-y-1 mb-3">
          <h3 className="font-display text-xl font-bold text-white group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <p className="font-mono text-xs text-slate-400">{project.domain}</p>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-300/90 leading-relaxed mb-5">
          {project.description}
        </p>
      </div>

      <div className="relative z-10 space-y-4 pt-3 border-t border-white/[0.07]">
        {/* Tech Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md bg-white/[0.04] text-[11px] font-mono text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors"
          >
            <GitHubIcon className="w-4 h-4" />
            <span>Source Code</span>
          </a>

          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-accent/15 hover:bg-accent text-accent hover:text-obsidian-950 border border-accent/35 font-display font-semibold text-xs transition-all"
            >
              <span>Live Demo</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          ) : (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] text-slate-200 font-display font-semibold text-xs transition-all"
            >
              <span>Explore Repo</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function ProjectsSection() {
  const [category, setCategory] = useState<"All" | ProjectItem["category"]>("All");
  const [showAll, setShowAll] = useState(false);

  const filtered =
    category === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === category);

  const visibleProjects = showAll ? filtered : filtered.slice(0, 6);

  return (
    <section id="projects" className="py-20 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading + Category Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Shipped Products &amp; Systems</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
              Projects Crafted &amp; Deployed
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              From 23-language healthcare price engines to NLP resume screeners
              and playable web experiments.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-obsidian-900 border border-white/10">
            {CATEGORIES.map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setCategory(cat);
                    setShowAll(false);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    active
                      ? "bg-accent text-obsidian-950 font-bold shadow-md"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProjects.map((project) => (
            <SpotlightProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Load More / Show Less Button (itsvg-inspired) */}
        {filtered.length > 6 && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              data-cursor={showAll ? "COLLAPSE" : "EXPAND"}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-obsidian-850 hover:bg-obsidian-800 border border-accent/40 text-white font-display font-semibold text-sm shadow-[0_0_25px_rgb(var(--accent-rgb)/0.15)] transition-all"
            >
              {showAll ? (
                <>
                  <span>Show Featured Only</span>
                  <ChevronUp className="w-4 h-4 text-accent" />
                </>
              ) : (
                <>
                  <span>
                    Load More Projects ({filtered.length - 6} more)
                  </span>
                  <ChevronDown className="w-4 h-4 text-accent" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
