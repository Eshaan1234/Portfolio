import React from "react";
import type { ProjectItem } from "@/data/portfolio";

export function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.031 2.01c-5.517 0-9.998 4.48-9.998 9.997 0 1.763.46 3.485 1.334 5.002L2 22l5.128-1.345a9.963 9.963 0 0 0 4.901 1.288h.004c5.516 0 9.997-4.48 9.997-9.997a9.96 9.96 0 0 0-2.927-7.071 9.96 9.96 0 0 0-7.072-2.865Zm0 18.248h-.003a8.29 8.29 0 0 1-4.228-1.158l-.303-.18-3.043.798.812-2.966-.198-.314a8.285 8.285 0 0 1-1.273-4.43c0-4.585 3.731-8.316 8.32-8.316a8.265 8.265 0 0 1 5.882 2.438 8.268 8.268 0 0 1 2.434 5.882c0 4.586-3.732 8.246-8.4 8.246Zm4.562-6.224c-.25-.125-1.479-.73-1.708-.813-.229-.084-.396-.125-.562.125-.167.25-.646.813-.792.979-.146.167-.292.188-.542.063-.25-.125-1.055-.389-2.01-1.24-.743-.663-1.245-1.482-1.39-1.732-.146-.25-.016-.385.11-.51.112-.112.25-.291.375-.437.125-.146.166-.25.25-.417.083-.166.041-.312-.021-.437-.063-.125-.563-1.355-.771-1.855-.203-.487-.41-.421-.563-.429l-.479-.008c-.166 0-.437.062-.666.312-.23.25-.875.855-.875 2.084s.896 2.417 1.02 2.584c.126.166 1.763 2.692 4.272 3.775.596.258 1.062.412 1.425.527.599.19 1.144.163 1.575.099.48-.072 1.479-.605 1.687-1.188.209-.584.209-1.084.146-1.188-.062-.104-.229-.167-.479-.292Z" />
    </svg>
  );
}

export function GitHubIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  );
}

export function LinkedInIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
    </svg>
  );
}

export function DiscordIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028ZM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z" />
    </svg>
  );
}

export function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={className} aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SmartChipSvg({ className = "w-11 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 56 42" fill="none" className={className} aria-hidden="true">
      <rect
        x="1"
        y="1"
        width="54"
        height="40"
        rx="7"
        fill="url(#chipGrad)"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="1.2"
      />
      <path
        d="M19 1v40M37 1v40M1 14h18M37 14h18M1 28h18M37 28h18M24 14h8v14h-8z"
        stroke="rgba(10,18,24,0.55)"
        strokeWidth="1.2"
      />
      <defs>
        <linearGradient id="chipGrad" x1="0" y1="0" x2="56" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="48%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function ProjectEmblem({
  type,
  from,
  to,
}: {
  type: ProjectItem["iconType"];
  from: string;
  to: string;
}) {
  const gradId = `grad-${type}`;
  return (
    <div
      className="relative flex items-center justify-center w-12 h-12 rounded-xl border border-white/10 shadow-lg shrink-0 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${from}24, ${to}18)`,
      }}
    >
      <div
        className="absolute inset-0 opacity-35 blur-md"
        style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
      />
      <svg viewBox="0 0 32 32" className="relative z-10 w-7 h-7" fill="none">
        <defs>
          <linearGradient id={gradId} x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
        </defs>
        {type === "medisetu" && (
          <>
            <rect x="13" y="5" width="6" height="22" rx="2" fill={`url(#${gradId})`} />
            <rect x="5" y="13" width="22" height="6" rx="2" fill={`url(#${gradId})`} />
            <circle cx="24" cy="8" r="3" fill="#fff" fillOpacity="0.9" />
          </>
        )}
        {type === "mednear" && (
          <>
            <path
              d="M16 4C10.5 4 6 8.4 6 13.8c0 6.8 10 14.2 10 14.2s10-7.4 10-14.2C26 8.4 21.5 4 16 4Z"
              stroke={`url(#${gradId})`}
              strokeWidth="2.4"
            />
            <path d="M16 10v7M12.5 13.5h7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
          </>
        )}
        {type === "resume-ai" && (
          <>
            <rect x="7" y="4" width="18" height="24" rx="3" stroke={`url(#${gradId})`} strokeWidth="2.2" />
            <path d="M11 11h10M11 16h10M11 21h6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            <circle cx="22" cy="22" r="4" fill={`url(#${gradId})`} />
          </>
        )}
        {type === "house-ml" && (
          <>
            <path
              d="M5 15L16 6l11 9v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V15Z"
              stroke={`url(#${gradId})`}
              strokeWidth="2.2"
            />
            <path d="M10 22l4-4 3 2.5 5-6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </>
        )}
        {type === "arcade" && (
          <>
            <rect x="4" y="9" width="24" height="15" rx="6" stroke={`url(#${gradId})`} strokeWidth="2.2" />
            <path d="M10 16.5h5M12.5 14v5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="20.5" cy="15" r="1.6" fill="#fff" />
            <circle cx="23" cy="18" r="1.6" fill={`url(#${gradId})`} />
          </>
        )}
        {type === "cyberfit" && (
          <>
            <path
              d="M4 17h5l3-8 4 14 3.5-9 2.5 3H28"
              stroke={`url(#${gradId})`}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        )}
        {type === "bomb" && (
          <>
            <circle cx="15" cy="18" r="9" stroke={`url(#${gradId})`} strokeWidth="2.3" />
            <path d="M21 10l4-4M25 4l2 2M24 9l3-1" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12.5" cy="15.5" r="1.6" fill="#fff" />
          </>
        )}
        {type === "edupredict" && (
          <>
            <path d="M4 12l12-6 12 6-12 6-12-6Z" stroke={`url(#${gradId})`} strokeWidth="2.2" strokeLinejoin="round" />
            <path d="M8 15v6c0 2 3.6 4 8 4s8-2 8-4v-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          </>
        )}
        {type === "smartlock" && (
          <>
            <rect x="7" y="14" width="18" height="13" rx="3" stroke={`url(#${gradId})`} strokeWidth="2.2" />
            <path d="M11 14v-4a5 5 0 0 1 10 0v4" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="16" cy="20.5" r="2" fill={`url(#${gradId})`} />
          </>
        )}
        {type === "cake" && (
          <>
            <rect x="6" y="15" width="20" height="11" rx="3" stroke={`url(#${gradId})`} strokeWidth="2.2" />
            <path d="M16 7v5M11 9v3M21 9v3" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M6 20c3 1.5 5-1.5 8 0s5-1.5 8 0" stroke="#fff" strokeWidth="1.8" />
          </>
        )}
        {type === "java" && (
          <>
            <path d="M9 14h11v6a5.5 5.5 0 0 1-11 0v-6Z" stroke={`url(#${gradId})`} strokeWidth="2.2" />
            <path d="M20 15h2.5a2.5 2.5 0 0 1 0 5H20" stroke="#fff" strokeWidth="2" />
            <path d="M12 7c1.5 1.5-1.5 2.5 0 4M16.5 6c1.5 1.5-1.5 2.5 0 4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
          </>
        )}
      </svg>
    </div>
  );
}
