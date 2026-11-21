"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Compass, Globe2, MapPinned, Radio } from "lucide-react";
import { IMPACT_STATS } from "@/data/portfolio";
import {
  GLOBAL_MAP_CITIES,
  INDIA_GRATICULE_PATH,
  INDIA_HUB_CITIES,
  INDIA_LAND_PATH,
  INDIA_VIEW_DOTS_PATH,
  WORLD_DOTS_PATH,
  WORLD_GRATICULE_PATH,
  WORLD_LAND_PATH,
  WORLD_VIEWBOX,
  type GlobalMapCity,
  type IndiaHubCity,
} from "@/data/worldMapGeometry";
import InteractiveGlobeCanvas from "./InteractiveGlobeCanvas";

type MapMode = "world" | "globe" | "india";

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

function buildArcPath(x1: number, y1: number, x2: number, y2: number) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.hypot(dx, dy);
  const lift = Math.min(95, Math.max(22, dist * 0.24));
  const cx = (x1 + x2) / 2;
  const cy = Math.min(y1, y2) - lift;
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}

export default function ImpactMapSection() {
  const [mode, setMode] = useState<MapMode>("world");
  const [activeGlobal, setActiveGlobal] = useState<GlobalMapCity>(
    GLOBAL_MAP_CITIES[0]
  );
  const [activeIndia, setActiveIndia] = useState<IndiaHubCity>(
    INDIA_HUB_CITIES[0]
  );

  const puneWorld = GLOBAL_MAP_CITIES[0];
  const puneIndia = INDIA_HUB_CITIES[0];

  // Smart label placement so nearby cities never overlap on the world map
  const worldLabelOffsets: Record<string, { dx: number; dy: number; anchor?: "start" | "end" }> = {
    pune: { dx: -8, dy: 4, anchor: "end" },
    mumbai: { dx: -8, dy: -8, anchor: "end" },
    delhi: { dx: 8, dy: -6, anchor: "start" },
    bengaluru: { dx: 8, dy: 12, anchor: "start" },
    london: { dx: -7, dy: -6, anchor: "end" },
    frankfurt: { dx: 8, dy: 4, anchor: "start" },
    ashburn: { dx: 8, dy: 4, anchor: "start" },
    sf: { dx: -8, dy: 4, anchor: "end" },
  };

  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto rounded-[2rem] p-5 sm:p-9 lg:p-11 bg-gradient-to-b from-obsidian-900/95 to-obsidian-950 border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.65)]">
        {/* Header + 3-Way Real Map View Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 font-mono text-xs text-accent mb-3">
              <Globe2 className="w-3.5 h-3.5" />
              <span>Real Natural Earth Projection · Pune HQ</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-white leading-tight">
              Built in Pune, Shipped Across India &amp; the World
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2">
              Explore live cloud edge regions and 23-language Indian coverage —
              hover or click any city pin on the map.
            </p>
          </div>

          {/* Map Mode Switcher */}
          <div className="inline-flex items-center gap-1 p-1.5 rounded-2xl bg-obsidian-950 border border-white/10 self-start lg:self-auto">
            <button
              type="button"
              onClick={() => setMode("world")}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-display font-semibold transition-all ${
                mode === "world"
                  ? "bg-accent text-obsidian-950 font-bold shadow-md"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>World Map</span>
            </button>

            <button
              type="button"
              onClick={() => setMode("globe")}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-display font-semibold transition-all ${
                mode === "globe"
                  ? "bg-accent text-obsidian-950 font-bold shadow-md"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>3D Globe</span>
            </button>

            <button
              type="button"
              onClick={() => setMode("india")}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-display font-semibold transition-all ${
                mode === "india"
                  ? "bg-accent text-obsidian-950 font-bold shadow-md"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <MapPinned className="w-3.5 h-3.5" />
              <span>India 23-Lang Hub</span>
            </button>
          </div>
        </div>

        {/* Main Interactive Map Stage */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[960/460] rounded-2xl bg-[#04080d] border border-white/10 overflow-hidden shadow-inner">
          {/* Ambient radial glow behind Pune */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-35"
            style={{
              background:
                mode === "india"
                  ? "radial-gradient(circle at 42% 62%, rgb(var(--accent-rgb) / 0.22), transparent 58%)"
                  : "radial-gradient(circle at 69% 44%, rgb(var(--accent-rgb) / 0.22), transparent 52%)",
            }}
          />

          {/* MODE 1: REAL NATURAL EARTH 2D WORLD MAP */}
          {mode === "world" && (
            <svg
              viewBox={`0 0 ${WORLD_VIEWBOX.width} ${WORLD_VIEWBOX.height}`}
              className="relative z-10 w-full h-full select-none"
              role="img"
              aria-label="Accurate Natural Earth world map showing connections from Pune, India to global cloud cities"
            >
              <defs>
                {/* Organic radial emerald highlight centered on Pune HQ */}
                <radialGradient
                  id="puneDotGlow"
                  gradientUnits="userSpaceOnUse"
                  cx={puneWorld.x}
                  cy={puneWorld.y}
                  r="230"
                >
                  <stop
                    offset="0%"
                    stopColor="rgb(var(--accent-rgb))"
                    stopOpacity="0.95"
                  />
                  <stop
                    offset="42%"
                    stopColor="rgb(var(--accent2-rgb))"
                    stopOpacity="0.6"
                  />
                  <stop
                    offset="100%"
                    stopColor="rgba(148, 163, 184, 0.34)"
                  />
                </radialGradient>

                <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop
                    offset="0%"
                    stopColor="rgb(var(--accent-rgb))"
                    stopOpacity="0.95"
                  />
                  <stop
                    offset="100%"
                    stopColor="rgb(var(--accent2-rgb))"
                    stopOpacity="0.45"
                  />
                </linearGradient>
              </defs>

              {/* Latitude & Longitude Graticule */}
              <path
                d={WORLD_GRATICULE_PATH}
                fill="none"
                stroke="rgba(148, 163, 184, 0.065)"
                strokeWidth="0.7"
                strokeDasharray="2 3"
              />

              {/* Real Natural Earth Continent Vector Fill & Coastline */}
              <path
                d={WORLD_LAND_PATH}
                fill="rgba(15, 28, 38, 0.72)"
                stroke="rgba(148, 163, 184, 0.22)"
                strokeWidth="0.85"
                strokeLinejoin="round"
              />

              {/* 2,735-Point Real Geography Hexagonal Dot-Matrix */}
              <path
                d={WORLD_DOTS_PATH}
                fill="none"
                stroke="url(#puneDotGlow)"
                strokeWidth="2.45"
                strokeLinecap="round"
              />

              {/* Curved Great-Circle Telemetry Beams from Pune HQ */}
              {GLOBAL_MAP_CITIES.filter((c) => !c.primary).map((city, idx) => {
                const d = buildArcPath(
                  puneWorld.x,
                  puneWorld.y,
                  city.x,
                  city.y
                );
                const isSelected = activeGlobal.id === city.id;
                return (
                  <g key={`arc-${city.id}`}>
                    {/* Base subtle route */}
                    <path
                      d={d}
                      fill="none"
                      stroke={
                        isSelected
                          ? "rgb(var(--accent-rgb))"
                          : "rgba(56, 189, 248, 0.22)"
                      }
                      strokeWidth={isSelected ? 2.1 : 1.05}
                    />
                    {/* Animated traveling packet */}
                    <motion.path
                      d={d}
                      pathLength={100}
                      strokeDasharray="22 78"
                      fill="none"
                      stroke="url(#beamGrad)"
                      strokeWidth={isSelected ? 2.6 : 1.6}
                      strokeLinecap="round"
                      initial={{ strokeDashoffset: 100, opacity: 0.9 }}
                      animate={{
                        strokeDashoffset: [100, 0],
                        opacity: [0.25, 1, 0.25],
                      }}
                      transition={{
                        duration: 2.8 + (idx % 4) * 0.55,
                        repeat: Infinity,
                        ease: "linear",
                        delay: idx * 0.22,
                      }}
                    />
                  </g>
                );
              })}

              {/* Real Projected City Nodes */}
              {GLOBAL_MAP_CITIES.map((city) => {
                const isSelected = activeGlobal.id === city.id;
                const off = worldLabelOffsets[city.id] || {
                  dx: 7,
                  dy: -5,
                  anchor: "start" as const,
                };
                const showLabel =
                  city.primary ||
                  isSelected ||
                  [
                    "sf",
                    "ashburn",
                    "london",
                    "dubai",
                    "singapore",
                    "tokyo",
                    "sydney",
                    "saopaulo",
                  ].includes(city.id);

                return (
                  <g
                    key={city.id}
                    transform={`translate(${city.x}, ${city.y})`}
                    onMouseEnter={() => setActiveGlobal(city)}
                    onClick={() => setActiveGlobal(city)}
                    data-cursor="INSPECT NODE"
                    className="cursor-pointer"
                  >
                    {/* Invisible larger hit target */}
                    <circle r="13" fill="transparent" />

                    {(city.primary || isSelected) && (
                      <>
                        <circle
                          r={city.primary ? 18 : 13}
                          fill="rgb(var(--accent-rgb) / 0.18)"
                          className="animate-ping"
                        />
                        <circle
                          r={city.primary ? 10 : 7.5}
                          fill="rgb(var(--accent-rgb) / 0.32)"
                        />
                      </>
                    )}

                    <circle
                      r={city.primary ? 4.8 : isSelected ? 4.2 : 3}
                      fill={
                        city.primary
                          ? "rgb(var(--accent-rgb))"
                          : isSelected
                            ? "#ffffff"
                            : "#38bdf8"
                      }
                      stroke="#04080d"
                      strokeWidth="1.2"
                    />

                    {showLabel && (
                      <text
                        x={off.dx}
                        y={off.dy}
                        textAnchor={off.anchor || "start"}
                        fill={
                          city.primary || isSelected
                            ? "#ffffff"
                            : "rgba(226, 232, 240, 0.78)"
                        }
                        fontSize={city.primary || isSelected ? "10.5" : "9"}
                        fontFamily="JetBrains Mono, monospace"
                        fontWeight={city.primary || isSelected ? "700" : "500"}
                      >
                        {city.name}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          )}

          {/* MODE 2: INTERACTIVE 3D DRAGGABLE EARTH GLOBE */}
          {mode === "globe" && (
            <InteractiveGlobeCanvas
              activeCity={activeGlobal}
              onSelectCity={setActiveGlobal}
            />
          )}

          {/* MODE 3: HIGH-RES INDIA SUBCONTINENT 23-LANGUAGE HUB */}
          {mode === "india" && (
            <svg
              viewBox={`0 0 ${WORLD_VIEWBOX.width} ${WORLD_VIEWBOX.height}`}
              className="relative z-10 w-full h-full select-none"
              role="img"
              aria-label="Indian Subcontinent map showing Pune HQ connected across 13 Indian cities and regional languages"
            >
              <defs>
                <radialGradient
                  id="indiaPuneGlow"
                  gradientUnits="userSpaceOnUse"
                  cx={puneIndia.x}
                  cy={puneIndia.y}
                  r="260"
                >
                  <stop
                    offset="0%"
                    stopColor="rgb(var(--accent-rgb))"
                    stopOpacity="0.95"
                  />
                  <stop
                    offset="60%"
                    stopColor="rgb(var(--accent2-rgb))"
                    stopOpacity="0.55"
                  />
                  <stop
                    offset="100%"
                    stopColor="rgba(148, 163, 184, 0.26)"
                  />
                </radialGradient>
              </defs>

              {/* 5-degree Graticule */}
              <path
                d={INDIA_GRATICULE_PATH}
                fill="none"
                stroke="rgba(148, 163, 184, 0.07)"
                strokeWidth="0.7"
                strokeDasharray="2 3"
              />

              {/* High-Detail 50m Coastline */}
              <path
                d={INDIA_LAND_PATH}
                fill="rgba(15, 28, 38, 0.78)"
                stroke="rgba(148, 163, 184, 0.28)"
                strokeWidth="1.1"
                strokeLinejoin="round"
              />

              {/* High-Density Subcontinent Dot Matrix */}
              <path
                d={INDIA_VIEW_DOTS_PATH}
                fill="none"
                stroke="url(#indiaPuneGlow)"
                strokeWidth="2.8"
                strokeLinecap="round"
              />

              {/* Regional Language Arcs from Pune HQ */}
              {INDIA_HUB_CITIES.filter((c) => !c.primary).map((city, idx) => {
                const d = buildArcPath(
                  puneIndia.x,
                  puneIndia.y,
                  city.x,
                  city.y
                );
                const isSelected = activeIndia.id === city.id;
                return (
                  <g key={city.id}>
                    <path
                      d={d}
                      fill="none"
                      stroke={
                        isSelected
                          ? "rgb(var(--accent-rgb))"
                          : "rgba(56, 189, 248, 0.28)"
                      }
                      strokeWidth={isSelected ? 2.2 : 1.15}
                    />
                    <motion.path
                      d={d}
                      pathLength={100}
                      strokeDasharray="24 76"
                      fill="none"
                      stroke="rgb(var(--accent-rgb))"
                      strokeWidth={isSelected ? 2.6 : 1.6}
                      strokeLinecap="round"
                      initial={{ strokeDashoffset: 100 }}
                      animate={{ strokeDashoffset: [100, 0] }}
                      transition={{
                        duration: 2.2 + (idx % 3) * 0.4,
                        repeat: Infinity,
                        ease: "linear",
                        delay: idx * 0.15,
                      }}
                    />
                  </g>
                );
              })}

              {/* 13 Indian City Pins */}
              {INDIA_HUB_CITIES.map((city) => {
                const isSelected = activeIndia.id === city.id;
                const alignLeft = ["in-mumbai", "in-ahmedabad", "in-kochi"].includes(
                  city.id
                );
                return (
                  <g
                    key={city.id}
                    transform={`translate(${city.x}, ${city.y})`}
                    onMouseEnter={() => setActiveIndia(city)}
                    onClick={() => setActiveIndia(city)}
                    data-cursor="INSPECT HUB"
                    className="cursor-pointer"
                  >
                    <circle r="14" fill="transparent" />
                    {(city.primary || isSelected) && (
                      <>
                        <circle
                          r={city.primary ? 18 : 13}
                          fill="rgb(var(--accent-rgb) / 0.2)"
                          className="animate-ping"
                        />
                        <circle
                          r={city.primary ? 9.5 : 7}
                          fill="rgb(var(--accent-rgb) / 0.35)"
                        />
                      </>
                    )}
                    <circle
                      r={city.primary ? 5 : isSelected ? 4.2 : 3.3}
                      fill={
                        city.primary
                          ? "rgb(var(--accent-rgb))"
                          : isSelected
                            ? "#ffffff"
                            : "#38bdf8"
                      }
                      stroke="#04080d"
                      strokeWidth="1.2"
                    />
                    <text
                      x={alignLeft ? -8 : 8}
                      y={city.id === "in-pune" ? 12 : 3.5}
                      textAnchor={alignLeft ? "end" : "start"}
                      fill={
                        city.primary || isSelected
                          ? "#ffffff"
                          : "rgba(226, 232, 240, 0.85)"
                      }
                      fontSize={city.primary || isSelected ? "10.5" : "9.2"}
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight={city.primary || isSelected ? "700" : "500"}
                    >
                      {city.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          )}
        </div>

        {/* Live Telemetry Inspector Strip */}
        <div className="mt-4 mb-9 p-4 rounded-2xl bg-obsidian-950/90 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {mode === "india" ? (
            <>
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-accent/15 text-accent border border-accent/30">
                  <Radio className="w-4 h-4" />
                </span>
                <div>
                  <div className="font-display font-bold text-sm text-white">
                    {activeIndia.name},{" "}
                    <span className="text-slate-400 font-normal">
                      {activeIndia.state}
                    </span>
                  </div>
                  <div className="font-mono text-xs text-accent">
                    MediSetu Scripts: {activeIndia.langs}
                  </div>
                </div>
              </div>
              <div className="font-mono text-xs text-slate-400">
                Coords: {activeIndia.lat.toFixed(2)}°N,{" "}
                {activeIndia.lon.toFixed(2)}°E
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-accent/15 text-accent border border-accent/30">
                  <Radio className="w-4 h-4" />
                </span>
                <div>
                  <div className="font-display font-bold text-sm text-white">
                    {activeGlobal.name},{" "}
                    <span className="text-slate-400 font-normal">
                      {activeGlobal.country}
                    </span>{" "}
                    <span className="ml-1.5 px-2 py-0.5 rounded bg-white/[0.06] font-mono text-[10px] text-accent">
                      {activeGlobal.region}
                    </span>
                  </div>
                  <div className="font-mono text-xs text-slate-400 mt-0.5">
                    Serving: <span className="text-slate-200">{activeGlobal.app}</span>{" "}
                    · Hop Latency:{" "}
                    <span className="text-emerald-400">{activeGlobal.latency}</span>
                  </div>
                </div>
              </div>
              <div className="font-mono text-xs text-slate-400">
                {Math.abs(activeGlobal.lat).toFixed(2)}°
                {activeGlobal.lat >= 0 ? "N" : "S"},{" "}
                {Math.abs(activeGlobal.lon).toFixed(2)}°
                {activeGlobal.lon >= 0 ? "E" : "W"}
              </div>
            </>
          )}
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
