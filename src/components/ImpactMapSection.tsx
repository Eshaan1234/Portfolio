"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Globe2 } from "lucide-react";
import { IMPACT_STATS } from "@/data/portfolio";

function AnimatedCounter({
  target,
  suffix,
}: {
  target: number;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const totalFrames = 36;
    const timer = window.setInterval(() => {
      frame += 1;
      const progress = frame / totalFrames;
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(target * eased));
      if (frame >= totalFrames) {
        setVal(target);
        window.clearInterval(timer);
      }
    }, 28);
    return () => window.clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

const EDGE_NODES = [
  { name: "Pune HQ", x: 565, y: 182, primary: true },
  { name: "Delhi", x: 562, y: 150 },
  { name: "Bengaluru", x: 572, y: 198 },
  { name: "Singapore", x: 642, y: 222 },
  { name: "Frankfurt", x: 422, y: 112 },
  { name: "London", x: 392, y: 105 },
  { name: "San Francisco", x: 142, y: 138 },
  { name: "New York", x: 232, y: 132 },
  { name: "Tokyo", x: 705, y: 142 },
];

export default function ImpactMapSection() {
  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto rounded-[2rem] p-6 sm:p-10 lg:p-12 bg-gradient-to-b from-obsidian-900/95 to-obsidian-950 border border-white/10 shadow-2xl">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 font-mono text-xs text-accent mb-3">
            <Globe2 className="w-3.5 h-3.5" />
            <span>Built in Pune · Accessible Everywhere</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-white leading-tight">
            Engineered for Pan-India Languages &amp; Global Cloud Edge
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3">
            Shipping apps that bridge 22 Indian regional scripts with globally
            distributed Vercel &amp; cloud deployments.
          </p>
        </div>

        {/* Stylized Dot-Matrix World & Pune Telemetry Map */}
        <div className="relative w-full aspect-[16/8] sm:aspect-[16/7] rounded-2xl bg-obsidian-950/90 border border-white/[0.07] overflow-hidden mb-10 flex items-center justify-center">
          <svg
            viewBox="0 0 820 340"
            className="w-full h-full"
            role="img"
            aria-label="Global cloud network map centered on Pune, India"
          >
            <defs>
              <pattern
                id="worldDots"
                width="14"
                height="14"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1.2" fill="rgba(148,163,184,0.18)" />
              </pattern>
              <linearGradient id="arcLine" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(var(--accent-rgb))" stopOpacity="0.9" />
                <stop offset="100%" stopColor="rgb(var(--accent2-rgb))" stopOpacity="0.25" />
              </linearGradient>
            </defs>

            {/* Subtle background grid */}
            <rect width="820" height="340" fill="url(#worldDots)" />

            {/* Stylized Continent Silhouettes */}
            <g fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="1">
              {/* North America */}
              <path d="M95 75 L235 70 L265 135 L210 175 L155 185 L110 140 Z" />
              {/* South America */}
              <path d="M215 195 L275 205 L260 295 L225 310 L205 245 Z" />
              {/* Europe */}
              <path d="M375 72 L475 68 L485 128 L385 132 Z" />
              {/* Africa */}
              <path d="M385 145 L475 145 L465 265 L415 275 L380 205 Z" />
              {/* Asia + India Subcontinent */}
              <path d="M490 72 L715 78 L725 175 L645 215 L580 185 L568 222 L548 182 L495 145 Z" />
              {/* Australia */}
              <path d="M645 242 L735 242 L728 298 L650 292 Z" />
            </g>

            {/* Telemetry Arcs Radiating from Pune (565, 182) */}
            {EDGE_NODES.filter((n) => !n.primary).map((node) => {
              const midX = (565 + node.x) / 2;
              const midY = Math.min(182, node.y) - 48;
              return (
                <path
                  key={node.name}
                  d={`M 565 182 Q ${midX} ${midY} ${node.x} ${node.y}`}
                  fill="none"
                  stroke="url(#arcLine)"
                  strokeWidth="1.6"
                  strokeDasharray="4 4"
                />
              );
            })}

            {/* Edge Nodes */}
            {EDGE_NODES.map((node) => (
              <g key={node.name} transform={`translate(${node.x}, ${node.y})`}>
                {node.primary && (
                  <>
                    <circle
                      r="18"
                      fill="rgb(var(--accent-rgb) / 0.18)"
                      className="animate-ping"
                    />
                    <circle r="10" fill="rgb(var(--accent-rgb) / 0.32)" />
                  </>
                )}
                <circle
                  r={node.primary ? 4.5 : 3}
                  fill={node.primary ? "rgb(var(--accent-rgb))" : "#38bdf8"}
                />
                <text
                  x={node.primary ? 10 : 6}
                  y={node.primary ? 4 : -6}
                  fill={node.primary ? "#ffffff" : "rgba(203,213,225,0.75)"}
                  fontSize={node.primary ? "11" : "9"}
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight={node.primary ? "700" : "400"}
                >
                  {node.name}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {IMPACT_STATS.map((stat) => (
            <div
              key={stat.label}
              className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-accent/40 transition-colors"
            >
              <div className="font-display text-3xl sm:text-4xl font-bold text-accent">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="font-display font-semibold text-sm sm:text-base text-white mt-1">
                {stat.label}
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
