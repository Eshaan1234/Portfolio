"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Spark {
  id: number;
  x: number;
  y: number;
}

export default function CustomCursor({ enabled }: { enabled: boolean }) {
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [visible, setVisible] = useState(false);
  const [cursorLabel, setCursorLabel] = useState<string>("");
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [sparks, setSparks] = useState<Spark[]>([]);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  const ringX = useSpring(rawX, { stiffness: 360, damping: 28, mass: 0.45 });
  const ringY = useSpring(rawY, { stiffness: 360, damping: 28, mass: 0.45 });
  const glowX = useSpring(rawX, { stiffness: 120, damping: 26, mass: 0.8 });
  const glowY = useSpring(rawY, { stiffness: 120, damping: 26, mass: 0.8 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setIsFinePointer(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (enabled && isFinePointer) {
      document.body.classList.add("custom-cursor-enabled");
    } else {
      document.body.classList.remove("custom-cursor-enabled");
    }
    return () => document.body.classList.remove("custom-cursor-enabled");
  }, [enabled, isFinePointer]);

  useEffect(() => {
    if (!enabled || !isFinePointer) return;

    const handleMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const labeledEl = target.closest("[data-cursor]") as HTMLElement | null;
      if (labeledEl) {
        setCursorLabel(labeledEl.dataset.cursor || "");
        setIsHoveringInteractive(true);
        return;
      }

      const interactiveEl = target.closest("a, button, input, textarea, [role='button']");
      setCursorLabel("");
      setIsHoveringInteractive(Boolean(interactiveEl));
    };

    const handleDown = (e: MouseEvent) => {
      setIsPressed(true);
      const id = Date.now() + Math.random();
      setSparks((prev) => [...prev.slice(-6), { id, x: e.clientX, y: e.clientY }]);
      window.setTimeout(() => {
        setSparks((prev) => prev.filter((s) => s.id !== id));
      }, 650);
    };

    const handleUp = () => setIsPressed(false);
    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [enabled, isFinePointer, rawX, rawY, visible]);

  if (!enabled || !isFinePointer) return null;

  return (
    <>
      {/* Ambient cursor spotlight aura */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-30 -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-300"
        style={{
          x: glowX,
          y: glowY,
          width: 440,
          height: 440,
          opacity: visible ? 1 : 0,
          background:
            "radial-gradient(circle, rgb(var(--accent-rgb) / 0.085) 0%, rgb(var(--accent2-rgb) / 0.035) 36%, transparent 70%)",
        }}
      />

      {/* Click spark bursts */}
      {sparks.map((spark) => (
        <div
          key={spark.id}
          aria-hidden="true"
          className="pointer-events-none fixed z-[95]"
          style={{ left: spark.x, top: spark.y }}
        >
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <motion.span
              key={deg}
              initial={{ opacity: 0.95, scale: 1, x: 0, y: 0 }}
              animate={{
                opacity: 0,
                scale: 0.2,
                x: Math.cos((deg * Math.PI) / 180) * 28,
                y: Math.sin((deg * Math.PI) / 180) * 28,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute block w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_8px_rgb(var(--accent-rgb))]"
            />
          ))}
        </div>
      ))}

      {/* Outer magnetic morphing ring / pill */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[99] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 rounded-full border backdrop-blur-md transition-[width,height,background-color,border-color] duration-200"
        style={{
          x: ringX,
          y: ringY,
          opacity: visible ? 1 : 0,
          width: cursorLabel ? 92 : isHoveringInteractive ? 46 : 32,
          height: cursorLabel ? 32 : isHoveringInteractive ? 46 : 32,
          scale: isPressed ? 0.86 : 1,
          borderColor:
            cursorLabel || isHoveringInteractive
              ? "rgb(var(--accent-rgb) / 0.85)"
              : "rgba(255, 255, 255, 0.28)",
          backgroundColor: cursorLabel
            ? "rgb(var(--accent-rgb) / 0.2)"
            : isHoveringInteractive
              ? "rgb(var(--accent-rgb) / 0.1)"
              : "rgba(7, 12, 16, 0.18)",
        }}
      >
        {cursorLabel && (
          <span className="font-mono text-[10px] font-semibold tracking-wider uppercase text-white whitespace-nowrap px-2">
            {cursorLabel}
          </span>
        )}
      </motion.div>

      {/* Crisp inner precision dot */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[100] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_12px_rgb(var(--accent-rgb))]"
        style={{
          x: rawX,
          y: rawY,
          width: cursorLabel ? 4 : 7,
          height: cursorLabel ? 4 : 7,
          opacity: visible && !cursorLabel ? 1 : 0,
        }}
      />
    </>
  );
}
