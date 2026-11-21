import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/600.css";
import "./globals.css";
import { PROFILE } from "@/data/portfolio";

export const metadata: Metadata = {
  title: `${PROFILE.name} — Full-Stack & Applied AI/ML Portfolio`,
  description:
    "Portfolio of Eshaan Gupta — Full-Stack Developer & Applied AI/ML Builder from Pune, India. Creator of MediSetu (23 Indian languages), MedNear PWA, and Skillairo ML systems.",
  keywords: [
    "Eshaan Gupta",
    "Eshaan1234",
    "Full-Stack Developer Pune",
    "Next.js Developer India",
    "MediSetu",
    "MedNear",
    "Portfolio",
  ],
  openGraph: {
    title: `${PROFILE.name} — Developer Portfolio`,
    description: PROFILE.bioShort,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased bg-obsidian-950 text-slate-100 bg-cyber-grid min-h-screen">
        {children}
      </body>
    </html>
  );
}
