// ============================================================================
// ESHAAN GUPTA — PORTFOLIO CONFIGURATION (SINGLE SOURCE OF TRUTH)
// Edit any text, project, social link, WhatsApp number, or experience item here
// and the entire portfolio updates automatically.
// ============================================================================

export interface TechItem {
  name: string;
  category: "Language" | "Frontend" | "Backend & DB" | "AI & ML" | "Cloud & DevOps";
  badge: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  domain: string;
  liveUrl?: string;
  githubUrl: string;
  category: "Full-Stack" | "AI / ML" | "Games & UI" | "Systems & Java";
  highlight: string;
  tags: string[];
  iconType:
    | "medisetu"
    | "mednear"
    | "resume-ai"
    | "house-ml"
    | "arcade"
    | "cyberfit"
    | "bomb"
    | "edupredict"
    | "smartlock"
    | "cake"
    | "java";
  accentFrom: string;
  accentTo: string;
}

export interface ExperienceCard {
  id: string;
  serial: string;
  role: string;
  company: string;
  tenure: string;
  location: string;
  badge: string;
  summary: string;
  stack: string[];
}

export interface SocialLinkItem {
  id: string;
  name: string;
  handle: string;
  url: string;
  color: string;
  description: string;
  featured?: boolean;
}

export interface ThemePreset {
  id: "emerald" | "violet" | "amber" | "crimson";
  label: string;
  accentRgb: string;
  accent2Rgb: string;
  swatchHex: string;
  swatch2Hex: string;
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: "emerald",
    label: "Emerald Cyber",
    accentRgb: "16 185 129", // #10b981
    accent2Rgb: "6 182 212", // #06b6d4
    swatchHex: "#10b981",
    swatch2Hex: "#06b6d4",
  },
  {
    id: "violet",
    label: "Violet Aurora",
    accentRgb: "139 92 246", // #8b5cf6
    accent2Rgb: "236 72 153", // #ec4899
    swatchHex: "#8b5cf6",
    swatch2Hex: "#ec4899",
  },
  {
    id: "amber",
    label: "Solar Amber",
    accentRgb: "245 158 11", // #f59e0b
    accent2Rgb: "16 185 129", // #10b981
    swatchHex: "#f59e0b",
    swatch2Hex: "#10b981",
  },
  {
    id: "crimson",
    label: "Neon Crimson",
    accentRgb: "244 63 94", // #f43f5e
    accent2Rgb: "251 146 60", // #fb923c
    swatchHex: "#f43f5e",
    swatch2Hex: "#fb923c",
  },
];

export const PROFILE = {
  name: "Eshaan Gupta",
  firstName: "Eshaan",
  handle: "Eshaan1234",
  role: "Full-Stack Developer & Applied AI/ML Builder",
  degree: "B.Tech Engineering Student (2nd Year)",
  location: "Pune, Maharashtra, India",
  coordinates: "18.5204° N, 73.8567° E",
  timezone: "Asia/Kolkata",
  email: "eshaangupta53@gmail.com",
  phone: "+91 7896237426",
  whatsappNumber: "917896237426",
  whatsappUrl:
    "https://wa.me/917896237426?text=Hi%20Eshaan!%20I%20visited%20your%20portfolio%20and%20would%20love%20to%20connect.",
  githubUrl: "https://github.com/Eshaan1234",
  linkedinUrl: "https://www.linkedin.com/in/eshaan-gupta-17142a332",
  avatarUrl: "https://avatars.githubusercontent.com/u/93128645?v=4",
  availability: "Open to Internships, Freelance & Open-Source Collabs",
  bioShort:
    "Full-stack focused developer & B.Tech builder crafting scalable web platforms, multilingual civic-tech tools, and practical AI/ML systems.",
  bioExtended:
    "I'm Eshaan Gupta from Pune, Maharashtra — diving deep into modern TypeScript, Next.js, and Machine Learning to ship products people genuinely rely on, from 23-language healthcare finders to NLP resume engines. Off the keyboard, you'll catch me experimenting in the kitchen, on the basketball court, gaming with friends, or out on a bike ride.",
  greetings: [
    { text: "Hello", lang: "English" },
    { text: "नमस्ते", lang: "Hindi" },
    { text: "नमस्कार", lang: "Marathi" },
    { text: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ", lang: "Punjabi" },
    { text: "வணக்கம்", lang: "Tamil" },
    { text: "ನಮಸ್ಕಾರ", lang: "Kannada" },
    { text: "নমস্কার", lang: "Bengali" },
  ],
  priorities: [
    "clean architecture",
    "applied AI & ML",
    "23-language inclusivity",
    "tactile UI / UX",
    "blazing performance",
  ],
};

export const TECH_MARQUEE_ROW_1: TechItem[] = [
  { name: "TypeScript", category: "Language", badge: "TS" },
  { name: "JavaScript", category: "Language", badge: "JS" },
  { name: "Python", category: "Language", badge: "PY" },
  { name: "Java", category: "Language", badge: "JV" },
  { name: "C++", category: "Language", badge: "C++" },
  { name: "C", category: "Language", badge: "C" },
  { name: "HTML5", category: "Language", badge: "HTML" },
  { name: "CSS3", category: "Language", badge: "CSS" },
  { name: "SQL", category: "Language", badge: "SQL" },
  { name: "PHP", category: "Language", badge: "PHP" },
  { name: "Next.js 14", category: "Frontend", badge: "NEXT" },
  { name: "React.js", category: "Frontend", badge: "RCT" },
  { name: "Tailwind CSS", category: "Frontend", badge: "TW" },
  { name: "Framer Motion", category: "Frontend", badge: "FM" },
];

export const TECH_MARQUEE_ROW_2: TechItem[] = [
  { name: "Node.js", category: "Backend & DB", badge: "NODE" },
  { name: "PostgreSQL", category: "Backend & DB", badge: "PG" },
  { name: "MongoDB", category: "Backend & DB", badge: "MDB" },
  { name: "MySQL", category: "Backend & DB", badge: "SQL" },
  { name: "Firebase", category: "Backend & DB", badge: "FB" },
  { name: "Machine Learning", category: "AI & ML", badge: "ML" },
  { name: "NLP Pipelines", category: "AI & ML", badge: "NLP" },
  { name: "Jupyter & Python DS", category: "AI & ML", badge: "JUP" },
  { name: "OpenAI & LLM Parsers", category: "AI & ML", badge: "LLM" },
  { name: "Vercel", category: "Cloud & DevOps", badge: "VCL" },
  { name: "Cloudflare", category: "Cloud & DevOps", badge: "CF" },
  { name: "Netlify", category: "Cloud & DevOps", badge: "NTL" },
  { name: "Git & GitHub", category: "Cloud & DevOps", badge: "GIT" },
  { name: "PWA & Service Workers", category: "Frontend", badge: "PWA" },
  { name: "Apache Maven & Nginx", category: "Cloud & DevOps", badge: "OPS" },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "medisetu",
    title: "MediSetu",
    subtitle: "AI Medicine Finder & Live Pharmacy Price Engine",
    description:
      "Full-stack Next.js 14 healthcare platform comparing live medicine prices across Apollo 24|7, PharmEasy, Tata 1mg & Netmeds, with Google/OSM pharmacy maps, AI natural-language inventory commands, and all 22 scheduled Indian languages + English.",
    domain: "medisetu-black.vercel.app",
    liveUrl: "https://medisetu-black.vercel.app",
    githubUrl: "https://github.com/Eshaan1234/MediSetu",
    category: "Full-Stack",
    highlight: "23 Languages · Live Price Relay",
    tags: ["Next.js 14", "TypeScript", "PostgreSQL", "OpenAI", "Google Maps"],
    iconType: "medisetu",
    accentFrom: "#10b981",
    accentTo: "#06b6d4",
  },
  {
    id: "mednear",
    title: "MedNear (MEDFINDER)",
    subtitle: "Offline-Ready Pharmacy Stock & Reminder PWA",
    description:
      "Installable mobile-first Progressive Web App in 8 Indian languages featuring real-time dual-role stock sync, QR pickup reservation verification, high-contrast accessibility, and spoken medicine alarms.",
    domain: "medifinder-two.vercel.app",
    liveUrl: "https://medifinder-two.vercel.app",
    githubUrl: "https://github.com/Eshaan1234/MEDFINDER",
    category: "Full-Stack",
    highlight: "Installable PWA · QR Pickup",
    tags: ["PWA", "JavaScript", "Service Worker", "i18n (8 Langs)", "Web Speech"],
    iconType: "mednear",
    accentFrom: "#06b6d4",
    accentTo: "#3b82f6",
  },
  {
    id: "resume-screening",
    title: "Intelligent Resume Screener",
    subtitle: "NLP Candidate Ranking & Skill Match Engine",
    description:
      "Major ML Internship system built at Skillairo that parses unstructured resumes, extracts core competencies via NLP vectorization, and scores candidate-to-role fit automatically.",
    domain: "eshaanprojectintern.netlify.app",
    liveUrl: "https://eshaanprojectintern.netlify.app/",
    githubUrl:
      "https://github.com/Eshaan1234/Major-Project-Internship-Intelligent-Resume-Screening-System",
    category: "AI / ML",
    highlight: "Skillairo Major ML Project",
    tags: ["Python", "NLP", "Scikit-Learn", "Jupyter", "Feature Extraction"],
    iconType: "resume-ai",
    accentFrom: "#8b5cf6",
    accentTo: "#06b6d4",
  },
  {
    id: "house-price",
    title: "House Price Prediction System",
    subtitle: "Real-Estate Valuation Regression Pipeline",
    description:
      "End-to-end supervised Machine Learning pipeline featuring exploratory data analysis, outlier treatment, feature engineering, and regression modeling for accurate property valuation.",
    domain: "eshaanprojectintern.netlify.app",
    liveUrl: "https://eshaanprojectintern.netlify.app/",
    githubUrl:
      "https://github.com/Eshaan1234/House-Price-Prediction-System-Minor-Project-Internship",
    category: "AI / ML",
    highlight: "Skillairo Minor ML Project",
    tags: ["Python", "Regression", "Pandas", "NumPy", "Jupyter"],
    iconType: "house-ml",
    accentFrom: "#10b981",
    accentTo: "#eab308",
  },
  {
    id: "arcade-clubcatalyst",
    title: "Arcade ClubCatalyst",
    subtitle: "Interactive Campus Club & Event Hub",
    description:
      "TypeScript web application engineered to energize student clubs, community events, and interactive campus participation with a kinetic arcade-inspired UI.",
    domain: "arcade-club-catalyst.vercel.app",
    liveUrl: "https://arcade-club-catalyst.vercel.app",
    githubUrl: "https://github.com/Eshaan1234/Arcade-ClubCatalyst",
    category: "Full-Stack",
    highlight: "Live on Vercel",
    tags: ["TypeScript", "React", "Modern UI", "Vercel"],
    iconType: "arcade",
    accentFrom: "#f59e0b",
    accentTo: "#ef4444",
  },
  {
    id: "cyberfit",
    title: "CYBERFiT",
    subtitle: "Futuristic Fitness & Workout Companion",
    description:
      "High-contrast cyber-styled fitness web app built in TypeScript to structure training routines, track consistency, and keep daily movement engaging.",
    domain: "cyber-fi-t.vercel.app",
    liveUrl: "https://cyber-fi-t.vercel.app",
    githubUrl: "https://github.com/Eshaan1234/CYBERFiT-",
    category: "Games & UI",
    highlight: "Cyber UI · TypeScript",
    tags: ["TypeScript", "Responsive UI", "Fitness Tech", "Vercel"],
    iconType: "cyberfit",
    accentFrom: "#ec4899",
    accentTo: "#8b5cf6",
  },
  {
    id: "defuse-bomb",
    title: "Defuse The Bomb",
    subtitle: "High-Tension Logic & Reflex Browser Game",
    description:
      "Fast-paced browser puzzle game challenging players to decode clues and cut the right sequence under a ticking countdown clock.",
    domain: "defusethebombgame.vercel.app",
    liveUrl: "https://defusethebombgame.vercel.app",
    githubUrl: "https://github.com/Eshaan1234/DEFUSETHEBOMBGAME",
    category: "Games & UI",
    highlight: "Playable Browser Game",
    tags: ["Game Loop", "JavaScript", "Interactive Audio", "DOM FX"],
    iconType: "bomb",
    accentFrom: "#ef4444",
    accentTo: "#f97316",
  },
  {
    id: "edupredicts",
    title: "EduPredicts",
    subtitle: "Academic Insights & Student Performance Predictor",
    description:
      "Educational analytics project exploring data-backed forecasting to identify learning trends and help students stay ahead academically.",
    domain: "github.com/Eshaan1234",
    githubUrl: "https://github.com/Eshaan1234/EduPredicts",
    category: "AI / ML",
    highlight: "EdTech Analytics",
    tags: ["Predictive Modeling", "Data Analysis", "EdTech"],
    iconType: "edupredict",
    accentFrom: "#3b82f6",
    accentTo: "#10b981",
  },
  {
    id: "smartlock-fs",
    title: "SmartLock.FS",
    subtitle: "Hardware-Inspired Safety & Access Control Concept",
    description:
      "Security-first smart locking & verification system exploration focused on reliable safety states and Authorized-Only access workflows.",
    domain: "github.com/Eshaan1234",
    githubUrl: "https://github.com/Eshaan1234/SmartLock.FS",
    category: "Systems & Java",
    highlight: "Safety Architecture",
    tags: ["Systems Design", "Security Logic", "IoT Concept"],
    iconType: "smartlock",
    accentFrom: "#14b8a6",
    accentTo: "#6366f1",
  },
  {
    id: "cake-animation",
    title: "Celebration Micro-Experience",
    subtitle: "Interactive CSS/JS Birthday Animation",
    description:
      "Delightful micro-interaction showcase built with pure HTML, CSS keyframes, and JavaScript choreography for shareable web celebrations.",
    domain: "birthday-cake-animation-beryl.vercel.app",
    liveUrl: "https://birthday-cake-animation-beryl.vercel.app",
    githubUrl: "https://github.com/Eshaan1234/BIRTHDAY-CAKE-ANIMATION",
    category: "Games & UI",
    highlight: "Creative Coding",
    tags: ["HTML5", "CSS Keyframes", "Creative UI"],
    iconType: "cake",
    accentFrom: "#f472b6",
    accentTo: "#facc15",
  },
  {
    id: "java-beyond",
    title: "Java Core & Beyond",
    subtitle: "Structured Java OOP & Problem-Solving Vault",
    description:
      "Open-source learning repository progressing from foundational Java syntax to object-oriented patterns and algorithmic problem solving.",
    domain: "github.com/Eshaan1234",
    githubUrl:
      "https://github.com/Eshaan1234/ALL_BASIC_JAVA_CODES_BUT_A_BIT_ABOVE_THIS_LEVEL",
    category: "Systems & Java",
    highlight: "Open-Source Study Vault",
    tags: ["Java", "OOP", "Algorithms", "Clean Code"],
    iconType: "java",
    accentFrom: "#f97316",
    accentTo: "#eab308",
  },
];

export const IMPACT_STATS = [
  {
    value: 23,
    suffix: "",
    label: "Languages Supported",
    detail: "English + all 22 scheduled Indian languages in MediSetu",
  },
  {
    value: 20,
    suffix: "+",
    label: "Public GitHub Repos",
    detail: "Spanning full-stack apps, ML notebooks, games & Java",
  },
  {
    value: 10,
    suffix: "+",
    label: "Live Cloud Deployments",
    detail: "Shipped across Vercel & Netlify edge networks",
  },
  {
    value: 18,
    suffix: "+",
    label: "Core Languages & Tools",
    detail: "TypeScript, Python, Java, Next.js, Postgres & ML",
  },
];

export const PRINCIPLES = [
  {
    id: "modern-stack",
    number: "01",
    title: "Modern, Type-Safe Stack",
    description:
      "Building with Next.js, strict TypeScript, Tailwind CSS, and cloud-native databases so every feature scales cleanly from prototype to production.",
    tag: "Next.js · TypeScript · Postgres",
  },
  {
    id: "inclusive-ux",
    number: "02",
    title: "Multilingual & Inclusive UX",
    description:
      "Designing software for real people across India and beyond — including RTL scripts, 23-language localization, voice input, and high-contrast modes.",
    tag: "23 Languages · Accessibility",
  },
  {
    id: "applied-ai",
    number: "03",
    title: "Practical AI & Machine Learning",
    description:
      "Turning ML & NLP into tangible utility — from natural-language Hinglish stock commands in MediSetu to automated resume ranking pipelines.",
    tag: "NLP · Scikit-Learn · OpenAI",
  },
  {
    id: "responsiveness",
    number: "04",
    title: "Mobile-First & Offline Resilient",
    description:
      "Crafting adaptive layouts, installable PWAs, and graceful fallbacks so experiences stay smooth on every screen size and network condition.",
    tag: "PWA · Adaptive Grid",
  },
  {
    id: "performance",
    number: "05",
    title: "Edge-Ready Performance",
    description:
      "Smart caching, zero-bloat SVG assets, and server-side relays keep interactions snappy and resilient even when upstream APIs fluctuate.",
    tag: "Smart Caching · Fast Paint",
  },
  {
    id: "craft",
    number: "06",
    title: "Tactile Visual Polish",
    description:
      "Sweating micro-interactions, spring physics, cursor feedback, and typography so software feels alive rather than generic.",
    tag: "Framer Motion · Micro-UX",
  },
];

export const EXPERIENCE: ExperienceCard[] = [
  {
    id: "skillairo",
    serial: "EG // EXP-01",
    role: "ML & AI Engineering Intern",
    company: "Skillairo",
    tenure: "2026 — Completed",
    location: "Remote · India",
    badge: "INTERNSHIP",
    summary:
      "Engineered and delivered both Minor & Major Machine Learning systems: a House Price Prediction regression pipeline and an NLP-driven Intelligent Resume Screening Engine.",
    stack: ["Python", "Scikit-Learn", "NLP", "Jupyter"],
  },
  {
    id: "civic-builder",
    serial: "EG // PRD-02",
    role: "Creator & Full-Stack Developer",
    company: "MediSetu & MedNear",
    tenure: "2025 — Present",
    location: "Pune, India",
    badge: "FLAGSHIP PRODUCTS",
    summary:
      "Architected full-stack healthcare discovery platforms featuring live 4-pharmacy price comparison, interactive maps, QR reservations, and 23-language support.",
    stack: ["Next.js 14", "TypeScript", "Neon Postgres", "PWA"],
  },
  {
    id: "opensource",
    serial: "EG // OSS-03",
    role: "Indie Builder & Open-Source Dev",
    company: "GitHub (@Eshaan1234)",
    tenure: "10/2021 — Present",
    location: "Global · Cloud",
    badge: "20+ REPOS",
    summary:
      "Shipping interactive web apps, browser games, creative coding animations, and structured Java study vaults deployed continuously on Vercel & Netlify.",
    stack: ["React", "TypeScript", "Java", "Vercel"],
  },
  {
    id: "btech",
    serial: "EG // EDU-04",
    role: "B.Tech Undergraduate (2nd Year)",
    company: "Engineering · Maharashtra",
    tenure: "Present",
    location: "Pune, Maharashtra",
    badge: "ACADEMIA",
    summary:
      "Pursuing Bachelor of Technology with deep focus on Data Structures, Object-Oriented Programming, Web Engineering, and Applied Machine Learning.",
    stack: ["C / C++", "Java", "DSA", "Software Eng"],
  },
];

export const HIGHLIGHTS_REVIEWS = [
  {
    id: "rev-1",
    quote:
      "MediSetu solves a genuinely hard problem in Indian healthcare — comparing live prices across Apollo, PharmEasy, 1mg, and Netmeds while supporting 22 Indian languages and Hinglish AI stock commands without breaking if one source goes down.",
    author: "Product Architecture Spotlight",
    role: "MediSetu · Healthcare Full-Stack",
    project: "medisetu-black.vercel.app",
    rating: 5,
  },
  {
    id: "rev-2",
    quote:
      "Delivering both a structured real-estate regression model and an NLP-powered Intelligent Resume Screening Engine during the Skillairo internship showed strong end-to-end ownership from raw data preprocessing to deployable ML showcases.",
    author: "Internship Project Dossier",
    role: "Skillairo · Machine Learning Track",
    project: "eshaanprojectintern.netlify.app",
    rating: 5,
  },
  {
    id: "rev-3",
    quote:
      "MedNear's attention to accessibility stands out immediately: offline-ready PWA installation, QR code pharmacy pickup verification, high-contrast mode, and spoken medicine reminders across 8 Indian languages.",
    author: "Civic-Tech UX Highlight",
    role: "MedNear · Mobile-First PWA",
    project: "medifinder-two.vercel.app",
    rating: 5,
  },
  {
    id: "rev-4",
    quote:
      "From TypeScript apps like Arcade ClubCatalyst and CYBERFiT to playable browser games like Defuse The Bomb, Eshaan brings playful energy and rapid shipping velocity to every repo.",
    author: "Developer Lab Showcase",
    role: "GitHub · @Eshaan1234",
    project: "github.com/Eshaan1234",
    rating: 5,
  },
];

export const COMMUNITY_PULSES = [
  {
    emoji: "💊",
    title: "MediSetu v1.0 shipped on Vercel",
    time: "Next.js 14 + Neon Postgres",
    note: "23 languages, live pharmacy price relays & natural-language AI inventory ledger.",
  },
  {
    emoji: "🧠",
    title: "Skillairo ML Internship Dossier live",
    time: "NLP + Regression",
    note: "Intelligent Resume Screening System & House Price Prediction models completed.",
  },
  {
    emoji: "⚡",
    title: "MedNear PWA offline + QR pickup",
    time: "8 Indian Languages",
    note: "Real-time consumer/pharmacy stock sync with spoken medicine alarms.",
  },
];

export const SOCIAL_LINKS: SocialLinkItem[] = [
  {
    id: "whatsapp",
    name: "WhatsApp",
    handle: "+91 7896237426",
    url: "https://wa.me/917896237426?text=Hi%20Eshaan!%20Saw%20your%20portfolio%20and%20wanted%20to%20connect.",
    color: "#25D366",
    description: "Fastest way to chat directly",
    featured: true,
  },
  {
    id: "github",
    name: "GitHub",
    handle: "@Eshaan1234",
    url: "https://github.com/Eshaan1234",
    color: "#e2e8f0",
    description: "20+ public repos, code & commits",
    featured: true,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    handle: "Eshaan Gupta",
    url: "https://www.linkedin.com/in/eshaan-gupta-17142a332",
    color: "#0A66C2",
    description: "Professional network & updates",
    featured: true,
  },
  {
    id: "email",
    name: "Email",
    handle: "eshaangupta53@gmail.com",
    url: "mailto:eshaangupta53@gmail.com",
    color: "#10b981",
    description: "Project inquiries & internships",
    featured: true,
  },
  {
    id: "instagram",
    name: "Instagram",
    handle: "@eshaan_cannot_lift",
    url: "https://www.instagram.com/eshaan_cannot_lift",
    color: "#E4405F",
    description: "Life, rides, hoops & behind the scenes",
  },
  {
    id: "discord",
    name: "Discord",
    handle: "Join Server",
    url: "https://discord.gg/wY8qsQv2Q",
    color: "#5865F2",
    description: "Hang out, game & build together",
  },
  {
    id: "stackoverflow",
    name: "Stack Overflow",
    handle: "Eshaan Gupta",
    url: "https://stackoverflow.com/users/32897337/eshaan-gupta",
    color: "#F48024",
    description: "Debugging & dev Q&A profile",
  },
  {
    id: "codepen",
    name: "CodePen",
    handle: "@Eshaan1234",
    url: "https://codepen.io/Eshaan1234",
    color: "#38bdf8",
    description: "Frontend experiments & UI pens",
  },
  {
    id: "youtube",
    name: "YouTube",
    handle: "@zenotheslayer",
    url: "https://www.youtube.com/@zenotheslayer",
    color: "#FF0000",
    description: "Gaming & creative clips",
  },
  {
    id: "reddit",
    name: "Reddit",
    handle: "u/eshaangupta06",
    url: "https://www.reddit.com/user/eshaangupta06/",
    color: "#FF4500",
    description: "Tech & community discussions",
  },
];

export const TERMINAL_FORTUNES = [
  '"First solve the problem in your neighborhood, then scale it to 23 languages." — Eshaan\'s build log on MediSetu',
  '"Code is like a good recipe: balance the heat, taste-test early, and never ship it raw." — Eshaan (Dev & Kitchen enthusiast)',
  '"A fallback that works offline beats a flashy demo that crashes on slow Wi-Fi." — Engineering Note #04',
  '"Basketball court lesson #1: take the shot, read the rebound, iterate faster." — Pune Dev Log',
  '"TypeScript strict mode today saves three hours of console.log tomorrow." — Eshaan1234.fortune',
];
