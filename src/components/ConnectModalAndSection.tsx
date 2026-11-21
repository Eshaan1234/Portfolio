"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Copy,
  Globe,
  Mail,
  Phone,
  Send,
  X,
} from "lucide-react";
import { PROFILE, SOCIAL_LINKS } from "@/data/portfolio";
import {
  DiscordIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  WhatsAppIcon,
} from "./BrandIcons";

function SocialIconById({ id }: { id: string }) {
  switch (id) {
    case "whatsapp":
      return <WhatsAppIcon className="w-5 h-5" />;
    case "github":
      return <GitHubIcon className="w-5 h-5" />;
    case "linkedin":
      return <LinkedInIcon className="w-5 h-5" />;
    case "instagram":
      return <InstagramIcon className="w-5 h-5" />;
    case "discord":
      return <DiscordIcon className="w-5 h-5" />;
    case "email":
      return <Mail className="w-5 h-5" />;
    default:
      return <Globe className="w-5 h-5" />;
  }
}

function DualChannelComposer() {
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");
  const [copiedField, setCopiedField] = useState<"email" | "phone" | null>(null);

  const sendViaWhatsApp = () => {
    const intro = senderName.trim()
      ? `Hi Eshaan! I'm ${senderName.trim()}${
          senderEmail.trim() ? ` (${senderEmail.trim()})` : ""
        }.`
      : "Hi Eshaan!";
    const body = message.trim()
      ? `${intro}\n\n${message.trim()}`
      : `${intro} I visited your portfolio and would love to connect!`;
    const url = `https://wa.me/${PROFILE.whatsappNumber}?text=${encodeURIComponent(
      body
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const sendViaEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = senderName.trim()
      ? `Portfolio Inquiry from ${senderName.trim()}`
      : "Hello from your Portfolio!";
    const body = `${message.trim() || "Hi Eshaan, let's connect!"}\n\n— ${
      senderName.trim() || "Visitor"
    }${senderEmail.trim() ? ` (${senderEmail.trim()})` : ""}`;
    window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const copyValue = async (val: string, field: "email" | "phone") => {
    try {
      await navigator.clipboard.writeText(val);
      setCopiedField(field);
      window.setTimeout(() => setCopiedField(null), 1800);
    } catch {
      // fallback ignored
    }
  };

  return (
    <form onSubmit={sendViaEmail} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block font-mono text-[11px] text-slate-400 mb-1">
            Your Name
          </label>
          <input
            type="text"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            placeholder="Alex Sharma"
            className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-white/10 focus:border-accent/60 focus:outline-none text-sm text-white placeholder-slate-600"
          />
        </div>
        <div>
          <label className="block font-mono text-[11px] text-slate-400 mb-1">
            Your Email (optional for WhatsApp)
          </label>
          <input
            type="email"
            value={senderEmail}
            onChange={(e) => setSenderEmail(e.target.value)}
            placeholder="alex@company.com"
            className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-white/10 focus:border-accent/60 focus:outline-none text-sm text-white placeholder-slate-600"
          />
        </div>
      </div>

      <div>
        <label className="block font-mono text-[11px] text-slate-400 mb-1">
          Message / Project Idea
        </label>
        <textarea
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Hey Eshaan! Loved MediSetu — let's talk about an internship / project..."
          className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-950 border border-white/10 focus:border-accent/60 focus:outline-none text-sm text-white placeholder-slate-600 resize-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <button
          type="button"
          onClick={sendViaWhatsApp}
          data-cursor="WHATSAPP 💬"
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] text-obsidian-950 font-display font-bold text-sm hover:brightness-110 active:scale-95 transition-all"
        >
          <WhatsAppIcon className="w-4 h-4" />
          <span>Send on WhatsApp</span>
        </button>

        <button
          type="submit"
          data-cursor="EMAIL ✉️"
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-accent text-obsidian-950 font-display font-bold text-sm hover:brightness-110 active:scale-95 transition-all"
        >
          <Send className="w-4 h-4" />
          <span>Send via Email</span>
        </button>
      </div>

      {/* Quick Copy Pills */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
        <button
          type="button"
          onClick={() => copyValue(PROFILE.email, "email")}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 font-mono text-xs text-slate-300"
        >
          {copiedField === "email" ? (
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-accent" />
          )}
          <span>{PROFILE.email}</span>
        </button>

        <button
          type="button"
          onClick={() => copyValue(PROFILE.phone, "phone")}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 font-mono text-xs text-slate-300"
        >
          {copiedField === "phone" ? (
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Phone className="w-3.5 h-3.5 text-[#25D366]" />
          )}
          <span>{PROFILE.phone}</span>
        </button>
      </div>
    </form>
  );
}

export function ConnectSection() {
  return (
    <section id="contact" className="py-20 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent mb-2">
            <span>{"// Let's Connect"}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
            WhatsApp, GitHub &amp; Social Command Hub
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Reach out directly on WhatsApp, check out my code on GitHub, or drop
            a message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left 7 Cols: All Social Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {SOCIAL_LINKS.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="OPEN ↗"
                className="group flex items-center justify-between gap-3 p-4 rounded-2xl bg-obsidian-900/90 hover:bg-obsidian-850 border border-white/10 hover:border-accent/45 transition-all"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/10"
                    style={{
                      backgroundColor: `${item.color}1c`,
                      color: item.color,
                    }}
                  >
                    <SocialIconById id={item.id} />
                  </div>
                  <div className="min-w-0">
                    <div className="font-display font-bold text-sm text-white flex items-center gap-1.5">
                      <span>{item.name}</span>
                      {item.featured && (
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      )}
                    </div>
                    <div className="font-mono text-xs text-slate-400 truncate">
                      {item.handle}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      {item.description}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
              </a>
            ))}
          </div>

          {/* Right 5 Cols: Instant WhatsApp / Email Message Box */}
          <div className="lg:col-span-5 rounded-3xl p-6 sm:p-7 bg-obsidian-900/95 border border-white/15 shadow-xl">
            <h3 className="font-display text-xl font-bold text-white mb-1">
              Direct Message Composer
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              Write once — send straight to my WhatsApp ({PROFILE.phone}) or
              Email inbox.
            </p>
            <DualChannelComposer />
          </div>
        </div>
      </div>
    </section>
  );
}

export function ConnectModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl rounded-3xl p-6 sm:p-8 bg-obsidian-900 border border-white/15 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <span className="font-mono text-xs text-accent uppercase tracking-wider">
                  Let&apos;s Talk
                </span>
                <h3 className="font-display text-2xl font-bold text-white mt-0.5">
                  Connect with {PROFILE.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Featured Quick Channels */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
              {SOCIAL_LINKS.filter((s) => s.featured).map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 text-center transition-colors"
                >
                  <span style={{ color: item.color }}>
                    <SocialIconById id={item.id} />
                  </span>
                  <span className="font-display font-semibold text-xs text-white">
                    {item.name}
                  </span>
                </a>
              ))}
            </div>

            <DualChannelComposer />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
