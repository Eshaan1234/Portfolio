"use client";

import React, { useEffect, useRef, useState } from "react";
import { Terminal as TerminalIcon, Play, RotateCcw } from "lucide-react";
import {
  EXPERIENCE,
  PROFILE,
  PROJECTS,
  SOCIAL_LINKS,
  TECH_MARQUEE_ROW_1,
  TECH_MARQUEE_ROW_2,
  TERMINAL_FORTUNES,
} from "@/data/portfolio";

interface TerminalEntry {
  id: number;
  command: string;
  output: React.ReactNode;
}

const QUICK_COMMANDS = [
  "fortune",
  "whoami",
  "projects",
  "skills",
  "experience",
  "whatsapp",
  "socials",
  "sudo hire eshaan",
  "help",
  "clear",
];

export default function InteractiveTerminal({
  onOpenConnect,
}: {
  onOpenConnect: () => void;
}) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>(["fortune eshaan.fortune"]);
  const [historyCursor, setHistoryCursor] = useState<number>(-1);
  const [loginStamp, setLoginStamp] = useState("console ttys001");
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [entries, setEntries] = useState<TerminalEntry[]>([
    {
      id: 1,
      command: "fortune eshaan.fortune",
      output: (
        <div className="space-y-1.5 text-emerald-300/95">
          <p>{TERMINAL_FORTUNES[0]}</p>
          <p className="text-slate-400 text-xs">
            Tip: Click any command chip above or type{" "}
            <span className="text-accent font-semibold">help</span> and press
            Enter.
          </p>
        </div>
      ),
    },
  ]);

  useEffect(() => {
    setLoginStamp(new Date().toUTCString());
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [entries]);

  const executeCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    const cmd = trimmed.toLowerCase();

    if (!trimmed) return;

    setHistory((prev) => [...prev, trimmed]);
    setHistoryCursor(-1);

    if (cmd === "clear" || cmd === "cls") {
      setEntries([]);
      return;
    }

    let output: React.ReactNode;

    if (cmd === "help" || cmd === "?") {
      output = (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs">
          <div>
            <span className="text-accent">whoami</span> — About Eshaan Gupta
          </div>
          <div>
            <span className="text-accent">projects</span> — Shipped apps &amp; ML systems
          </div>
          <div>
            <span className="text-accent">skills</span> — Languages &amp; engineering stack
          </div>
          <div>
            <span className="text-accent">experience</span> — Internships &amp; journey
          </div>
          <div>
            <span className="text-accent">whatsapp</span> — Direct WhatsApp chat link
          </div>
          <div>
            <span className="text-accent">socials</span> — GitHub, LinkedIn &amp; all links
          </div>
          <div>
            <span className="text-accent">fortune</span> — Random dev quote from Eshaan
          </div>
          <div>
            <span className="text-accent">sudo hire eshaan</span> — Unlock instant contact
          </div>
          <div>
            <span className="text-accent">clear</span> — Clear terminal buffer
          </div>
        </div>
      );
    } else if (cmd === "whoami" || cmd === "about") {
      output = (
        <div className="space-y-1 text-slate-200">
          <p>
            <span className="text-accent font-semibold">{PROFILE.name}</span> ·{" "}
            {PROFILE.role}
          </p>
          <p className="text-slate-400">
            Location: {PROFILE.location} ({PROFILE.coordinates})
          </p>
          <p className="text-slate-300">{PROFILE.bioExtended}</p>
        </div>
      );
    } else if (cmd.startsWith("fortune")) {
      const pick =
        TERMINAL_FORTUNES[Math.floor(Math.random() * TERMINAL_FORTUNES.length)];
      output = <p className="text-emerald-300">{pick}</p>;
    } else if (cmd === "projects" || cmd === "ls") {
      output = (
        <div className="space-y-1.5">
          {PROJECTS.slice(0, 6).map((p, i) => (
            <div key={p.id} className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-500">0{i + 1}.</span>
              <span className="text-accent font-semibold">{p.title}</span>
              <span className="text-slate-400">— {p.subtitle}</span>
              {p.liveUrl && (
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-cyan-300 hover:text-white"
                >
                  [{p.domain}]
                </a>
              )}
            </div>
          ))}
          <p className="text-slate-500 text-xs pt-1">
            + {PROJECTS.length - 6} more repositories in the Projects grid below ↓
          </p>
        </div>
      );
    } else if (cmd === "skills" || cmd === "stack" || cmd === "languages") {
      const langs = [...TECH_MARQUEE_ROW_1, ...TECH_MARQUEE_ROW_2]
        .map((t) => t.name)
        .join(" · ");
      output = (
        <div className="space-y-1">
          <p className="text-accent text-xs uppercase tracking-wider">
            Active Languages, Frameworks &amp; Cloud Tools:
          </p>
          <p className="text-slate-300 leading-relaxed">{langs}</p>
        </div>
      );
    } else if (cmd === "experience" || cmd === "journey") {
      output = (
        <div className="space-y-1.5 text-xs">
          {EXPERIENCE.map((e) => (
            <div key={e.id}>
              <span className="text-accent font-semibold">{e.role}</span> @{" "}
              <span className="text-white">{e.company}</span>{" "}
              <span className="text-slate-500">({e.tenure})</span>
            </div>
          ))}
        </div>
      );
    } else if (cmd === "whatsapp" || cmd === "phone") {
      output = (
        <div className="space-y-1">
          <p className="text-emerald-400">
            ✔ WhatsApp channel ready: {PROFILE.phone}
          </p>
          <a
            href={PROFILE.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block underline text-white hover:text-accent"
          >
            → Click here to message Eshaan on WhatsApp ↗
          </a>
        </div>
      );
    } else if (cmd === "socials" || cmd === "links" || cmd === "contact") {
      output = (
        <div className="flex flex-wrap gap-3 text-xs">
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.id}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded bg-white/5 hover:bg-accent/20 border border-white/10 text-slate-200 hover:text-white transition-colors"
            >
              {s.name} ({s.handle}) ↗
            </a>
          ))}
        </div>
      );
    } else if (cmd.includes("sudo hire") || cmd === "hire") {
      output = (
        <div className="space-y-1.5 text-emerald-300">
          <p>[sudo] password for recruiter: ******** — ACCESS GRANTED ⚡</p>
          <p className="text-slate-200">
            Opening direct Connect Drawer for{" "}
            <span className="font-bold text-white">{PROFILE.name}</span> (
            {PROFILE.email} · {PROFILE.phone})...
          </p>
          <button
            type="button"
            onClick={onOpenConnect}
            className="mt-1 px-3 py-1 rounded-lg bg-accent text-obsidian-950 font-bold text-xs"
          >
            Launch Let&apos;s Talk Modal →
          </button>
        </div>
      );
    } else {
      output = (
        <p className="text-rose-300">
          eshaan.sh: command not found: <span className="text-white">{trimmed}</span>. Type{" "}
          <span className="text-accent">help</span> for available commands.
        </p>
      );
    }

    setEntries((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), command: trimmed, output },
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    executeCommand(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx =
        historyCursor === -1
          ? history.length - 1
          : Math.max(0, historyCursor - 1);
      setHistoryCursor(nextIdx);
      setInput(history[nextIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyCursor === -1) return;
      if (historyCursor >= history.length - 1) {
        setHistoryCursor(-1);
        setInput("");
      } else {
        const nextIdx = historyCursor + 1;
        setHistoryCursor(nextIdx);
        setInput(history[nextIdx]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = QUICK_COMMANDS.find((c) =>
        c.startsWith(input.trim().toLowerCase())
      );
      if (match) setInput(match);
    }
  };

  return (
    <section id="terminal" className="py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent mb-2">
              <TerminalIcon className="w-3.5 h-3.5" />
              <span>Interactive Developer Shell</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Query My Portfolio via Terminal
            </h2>
          </div>
          <p className="font-mono text-xs text-slate-400">
            Tap a quick command or type directly below
          </p>
        </div>

        {/* Terminal Window Chrome */}
        <div
          data-cursor="TYPE >_"
          onClick={() => inputRef.current?.focus()}
          className="rounded-2xl overflow-hidden bg-[#060b0f] border border-white/15 shadow-[0_24px_80px_rgba(0,0,0,0.7)]"
        >
          {/* Titlebar */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-obsidian-850 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/90" />
              <span className="w-3 h-3 rounded-full bg-amber-400/90" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/90" />
              <span className="ml-2 font-mono text-xs text-slate-300">
                eshaan@pune-workstation: ~/portfolio
              </span>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setEntries([]);
                executeCommand("fortune eshaan.fortune");
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-[11px] font-mono text-slate-300"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>

          {/* Quick One-Tap Command Chips */}
          <div className="flex flex-wrap items-center gap-1.5 px-4 py-2.5 bg-obsidian-900/90 border-b border-white/[0.06]">
            <span className="font-mono text-[11px] text-slate-500 mr-1">
              Quick run:
            </span>
            {QUICK_COMMANDS.map((cmd) => (
              <button
                key={cmd}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  executeCommand(cmd);
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/[0.04] hover:bg-accent/20 border border-white/10 hover:border-accent/40 font-mono text-[11px] text-slate-300 hover:text-white transition-colors"
              >
                <Play className="w-2.5 h-2.5 text-accent" />
                {cmd}
              </button>
            ))}
          </div>

          {/* Terminal Scrollable Output */}
          <div
            ref={scrollContainerRef}
            className="p-4 sm:p-6 font-mono text-xs sm:text-sm space-y-4 max-h-[340px] overflow-y-auto"
          >
            <div className="text-slate-500 text-xs">
              Last login: {loginStamp} · Pune Node (v2026.11)
            </div>

            {entries.map((entry) => (
              <div key={entry.id} className="space-y-1.5">
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="text-accent font-semibold">
                    eshaan@pune:~$
                  </span>
                  <span className="text-white">{entry.command}</span>
                </div>
                <div className="pl-3 border-l-2 border-accent/30">
                  {entry.output}
                </div>
              </div>
            ))}

            {/* Live Prompt Input */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-1">
              <label htmlFor="terminal-cmd" className="text-accent font-semibold shrink-0">
                eshaan@pune:~$
              </label>
              <input
                ref={inputRef}
                id="terminal-cmd"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type 'help', 'projects', 'whatsapp'..."
                autoComplete="off"
                spellCheck={false}
                className="w-full bg-transparent text-white placeholder-slate-600 focus:outline-none font-mono text-xs sm:text-sm"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
