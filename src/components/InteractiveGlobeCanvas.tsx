"use client";

import React, { useEffect, useRef, useState } from "react";
import { geoGraticule10, geoInterpolate, geoOrthographic, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import land110Url from "world-atlas/land-110m.json";
import { GLOBAL_MAP_CITIES, type GlobalMapCity } from "@/data/worldMapGeometry";

export default function InteractiveGlobeCanvas({
  activeCity,
  onSelectCity,
}: {
  activeCity: GlobalMapCity;
  onSelectCity: (city: GlobalMapCity) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rotationRef = useRef<[number, number, number]>([-74, -18, 0]);
  const isDraggingRef = useRef(false);
  const lastPointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDraggingUi, setIsDraggingUi] = useState(false);

  // Smoothly rotate toward newly selected city when user picks a chip
  const targetRotRef = useRef<[number, number] | null>(null);
  useEffect(() => {
    targetRotRef.current = [-activeCity.lon, -Math.max(-45, Math.min(45, activeCity.lat))];
  }, [activeCity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const topology = land110Url as unknown as Topology<{
      land: GeometryCollection;
    }>;
    const landGeo = feature(topology, topology.objects.land);
    const graticuleGeo = geoGraticule10();
    const pune = GLOBAL_MAP_CITIES[0];

    let animId = 0;

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(300, Math.floor(rect.width));
      const h = Math.max(260, Math.floor(rect.height));

      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);

      // Auto-rotate or ease toward selected city
      if (!isDraggingRef.current) {
        if (targetRotRef.current) {
          const [tx, ty] = targetRotRef.current;
          const dx = tx - rotationRef.current[0];
          const dy = ty - rotationRef.current[1];
          if (Math.abs(dx) > 0.4 || Math.abs(dy) > 0.4) {
            rotationRef.current[0] += dx * 0.08;
            rotationRef.current[1] += dy * 0.08;
          } else {
            targetRotRef.current = null;
          }
        } else {
          rotationRef.current[0] -= 0.18;
        }
      }

      const radius = Math.min(w, h) * 0.43;
      const cx = w / 2;
      const cy = h / 2;

      const projection = geoOrthographic()
        .scale(radius)
        .translate([cx, cy])
        .clipAngle(90)
        .rotate(rotationRef.current);

      const path = geoPath(projection, ctx);

      // Read current CSS theme accent color
      const rootStyle = getComputedStyle(document.documentElement);
      const accentRgbRaw = rootStyle.getPropertyValue("--accent-rgb").trim() || "16 185 129";
      const [ar, ag, ab] = accentRgbRaw.split(/\s+/).map(Number);

      // Outer atmospheric halo
      const halo = ctx.createRadialGradient(cx, cy, radius * 0.82, cx, cy, radius * 1.18);
      halo.addColorStop(0, `rgba(${ar}, ${ag}, ${ab}, 0.05)`);
      halo.addColorStop(0.7, `rgba(${ar}, ${ag}, ${ab}, 0.16)`);
      halo.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.18, 0, Math.PI * 2);
      ctx.fill();

      // Ocean sphere
      const sphereGrad = ctx.createRadialGradient(
        cx - radius * 0.3,
        cy - radius * 0.3,
        radius * 0.1,
        cx,
        cy,
        radius
      );
      sphereGrad.addColorStop(0, "#0d1822");
      sphereGrad.addColorStop(1, "#04080c");
      ctx.fillStyle = sphereGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      // Graticule lines
      ctx.beginPath();
      path(graticuleGeo);
      ctx.strokeStyle = "rgba(148, 163, 184, 0.09)";
      ctx.lineWidth = 0.7;
      ctx.stroke();

      // Continents (real Natural Earth 110m landmasses)
      ctx.beginPath();
      path(landGeo);
      ctx.fillStyle = `rgba(${ar}, ${ag}, ${ab}, 0.16)`;
      ctx.fill();
      ctx.strokeStyle = `rgba(${ar}, ${ag}, ${ab}, 0.55)`;
      ctx.lineWidth = 0.95;
      ctx.stroke();

      // Great-circle arcs from Pune HQ to global cities
      for (const city of GLOBAL_MAP_CITIES) {
        if (city.primary) continue;
        const interp = geoInterpolate([pune.lon, pune.lat], [city.lon, city.lat]);
        const coords: [number, number][] = [];
        for (let t = 0; t <= 1.001; t += 0.05) {
          coords.push(interp(Math.min(1, t)));
        }
        ctx.beginPath();
        path({ type: "LineString", coordinates: coords });
        const isSelected = activeCity.id === city.id;
        ctx.strokeStyle = isSelected
          ? `rgba(${ar}, ${ag}, ${ab}, 0.95)`
          : "rgba(56, 189, 248, 0.36)";
        ctx.lineWidth = isSelected ? 2 : 1.1;
        ctx.stroke();
      }

      // Visible city markers on front hemisphere
      const centerLon = -rotationRef.current[0];
      const centerLat = -rotationRef.current[1];

      for (const city of GLOBAL_MAP_CITIES) {
        // Check front-hemisphere visibility via spherical cosine law
        const rad = Math.PI / 180;
        const cosAngle =
          Math.sin(centerLat * rad) * Math.sin(city.lat * rad) +
          Math.cos(centerLat * rad) *
            Math.cos(city.lat * rad) *
            Math.cos((city.lon - centerLon) * rad);
        if (cosAngle < 0.05) continue;

        const pt = projection([city.lon, city.lat]);
        if (!pt) continue;

        const isSelected = activeCity.id === city.id;
        if (city.primary || isSelected) {
          ctx.beginPath();
          ctx.arc(pt[0], pt[1], city.primary ? 11 : 8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${ar}, ${ag}, ${ab}, 0.25)`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(pt[0], pt[1], city.primary ? 4.5 : isSelected ? 4 : 2.8, 0, Math.PI * 2);
        ctx.fillStyle = city.primary
          ? `rgb(${ar}, ${ag}, ${ab})`
          : isSelected
            ? "#ffffff"
            : "#38bdf8";
        ctx.fill();

        if (city.primary || isSelected || cosAngle > 0.55) {
          ctx.font = `${city.primary || isSelected ? "700 11px" : "500 9.5px"} "JetBrains Mono", monospace`;
          ctx.fillStyle =
            city.primary || isSelected ? "#ffffff" : "rgba(226, 232, 240, 0.78)";
          ctx.fillText(city.name, pt[0] + 7, pt[1] + 3);
        }
      }

      // Outer rim border
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${ar}, ${ag}, ${ab}, 0.35)`;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.restore();
      animId = window.requestAnimationFrame(render);
    };

    animId = window.requestAnimationFrame(render);
    return () => window.cancelAnimationFrame(animId);
  }, [activeCity]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    targetRotRef.current = null;
    setIsDraggingUi(true);
    lastPointerRef.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastPointerRef.current.x;
    const dy = e.clientY - lastPointerRef.current.y;
    lastPointerRef.current = { x: e.clientX, y: e.clientY };

    rotationRef.current = [
      rotationRef.current[0] + dx * 0.35,
      Math.max(-65, Math.min(65, rotationRef.current[1] - dy * 0.35)),
      0,
    ];
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    setIsDraggingUi(false);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        data-cursor="DRAG GLOBE 🌐"
        className={`w-full h-full ${isDraggingUi ? "cursor-grabbing" : "cursor-grab"}`}
      />
      <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 max-w-[85%]">
        {GLOBAL_MAP_CITIES.slice(0, 6).map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => onSelectCity(c)}
            className={`px-2 py-0.5 rounded-md font-mono text-[10px] border transition-colors ${
              activeCity.id === c.id
                ? "bg-accent text-obsidian-950 border-accent font-bold"
                : "bg-obsidian-900/85 text-slate-300 border-white/10 hover:border-accent/40"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>
      <div className="hidden sm:block absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-obsidian-900/80 border border-white/10 font-mono text-[10px] text-slate-400">
        Drag to rotate 3D Earth
      </div>
    </div>
  );
}
