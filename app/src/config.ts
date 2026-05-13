// ============================================================
// FocusFlow Configuration
// ============================================================

// --- Site ---

export interface SiteConfig {
  language: string
  brandName: string
}

export const siteConfig: SiteConfig = {
  language: "en",
  brandName: "FOCUSFLOW",
}

// --- Navigation ---

export interface NavigationConfig {
  menuLabel: string
  closeLabel: string
  fullscreenMenuLinks: { label: string; target: string }[]
  menuSideInfo: string[]
}

export const navigationConfig: NavigationConfig = {
  menuLabel: "MENU",
  closeLabel: "CLOSE",
  fullscreenMenuLinks: [
    { label: "THE ROOMS", target: "hero" },
    { label: "THE PHILOSOPHY", target: "consciousness" },
    { label: "SMART PLANNER", target: "planner" },
    { label: "FOCUS SESSIONS", target: "lighthouse" },
    { label: "THE ARCHIVE", target: "waves-gallery" },
    { label: "HABIT TRACKER", target: "habits" },
    { label: "DASHBOARD", target: "dashboard" },
    { label: "AI ASSISTANT", target: "ai" },
    { label: "FLOW STATES", target: "waves-video" },
    { label: "PRICING", target: "pricing" },
    { label: "FAQ", target: "faq" },
  ],
  menuSideInfo: [
    "FOCUSFLOW 2026",
    "DEEP WORK PLATFORM",
    "VERSION 3.0",
  ],
}

// --- Hero Room Gallery ---

export interface RoomConfig {
  name: string
  className: string
  theme: "light" | "dark"
  images: {
    back: string[]
    left: string[]
    right: string[]
  }
}

export interface HeroConfig {
  mainTitle: string
  rooms: RoomConfig[]
  metaLines: string[]
}

export const heroConfig: HeroConfig = {
  mainTitle: "FOCUSFLOW",
  rooms: [
    {
      name: "THE DEEP WORK CHAMBER",
      className: "room--waves",
      theme: "dark",
      images: {
        back: ["images/rooms/room1-back.jpg"],
        left: ["images/rooms/room1-left.jpg"],
        right: ["images/rooms/room1-right.jpg"],
      },
    },
    {
      name: "THE READING NOOK",
      className: "room--monk",
      theme: "light",
      images: {
        back: ["images/rooms/room2-back.jpg"],
        left: ["images/rooms/room2-left.jpg"],
        right: ["images/rooms/room2-right.jpg"],
      },
    },
    {
      name: "THE CREATIVE STUDIO",
      className: "room--lighthouse",
      theme: "dark",
      images: {
        back: ["images/rooms/room3-back.jpg"],
        left: ["images/rooms/room3-left.jpg"],
        right: ["images/rooms/room3-right.jpg"],
      },
    },
    {
      name: "THE MEDITATION SPACE",
      className: "room--orlando",
      theme: "light",
      images: {
        back: ["images/rooms/room4-back.jpg"],
        left: ["images/rooms/room4-left.jpg"],
        right: ["images/rooms/room4-right.jpg"],
      },
    },
  ],
  metaLines: [
    "A Digital Sanctuary for Deep Work",
    "Focus · Flow · Create · Reflect",
    "2026",
  ],
}

// --- Particle Sculpture ---

export interface ParticleConfig {
  sectionLabel: string
  title: string
  paragraphs: string[]
  quote: string
}

export const particleConfig: ParticleConfig = {
  sectionLabel: "02 / THE PHILOSOPHY",
  title: "The Architecture of Attention",
  paragraphs: [
    "In an age of infinite distraction, the ability to focus has become our most valuable skill. FocusFlow is built on the belief that your digital environment should support your deepest work, not fragment it. Every pixel is designed to create a sense of calm urgency—the feeling that what matters most is right in front of you.",
    "We draw inspiration from physical spaces of concentration: the writer's study, the painter's studio, the reader's nook, the meditator's zendo. Each room in FocusFlow is a carefully constructed atmosphere that signals to your brain: <em>this is where important work happens</em>.",
    "The science is clear: context shapes cognition. When you enter a space designed for focus, your mind follows. FocusFlow brings that spatial psychology into the digital realm, creating environments that don't just track your productivity—they amplify it.",
  ],
  quote: "The mind, once stretched by a new focus, never returns to its original distraction.",
}

// --- Lighthouse Video ---

export interface LighthouseVideoConfig {
  sectionLabel: string
  dataPoints: string[]
  description: string
  videoPath: string
}

export const lighthouseVideoConfig: LighthouseVideoConfig = {
  sectionLabel: "FOCUS SESSION",
  dataPoints: [
    "CURRENT STREAK: 47 MIN",
    "MODE: DEEP WORK",
    "FOCUS LEVEL: 94%",
  ],
  description: "Flow is not a state you find. It is a state you build, one session at a time.",
  videoPath: "videos/focus.mp4",
}

// --- Waves Video ---

export interface WavesVideoConfig {
  sectionLabel: string
  title: string
  ctaText: string
  videoPath: string
}

export const wavesVideoConfig: WavesVideoConfig = {
  sectionLabel: "05 / FLOW STATES",
  title: "Enter Your Flow State",
  ctaText: "BEGIN YOUR SESSION",
  videoPath: "videos/focus.mp4",
}

// --- Image Gallery ---

export interface GalleryItem {
  src: string
  caption: string
  description: string
}

export interface GalleryConfig {
  sectionLabel: string
  sectionTitle: string
  items: GalleryItem[]
  lightboxCloseHint: string
}

export const galleryConfig: GalleryConfig = {
  sectionLabel: "04 / THE ARCHIVE",
  sectionTitle: "Every Tool for Focus",
  items: [
    {
      src: "images/rooms/room1-back.jpg",
      caption: "Deep Work Timer",
      description: "Pomodoro-style focus sessions designed for sustained concentration. Set custom work intervals, track your streaks, and watch your productivity compound over time. The timer adapts to your natural rhythm, learning when you focus best.",
    },
    {
      src: "images/rooms/room2-back.jpg",
      caption: "Ambient Soundscapes",
      description: "Custom audio environments that mask distractions and create the perfect acoustic backdrop for any type of work. From rain on a window to the hum of a distant cafe, each soundscape is engineered to enhance focus without demanding attention.",
    },
    {
      src: "images/rooms/room3-back.jpg",
      caption: "Task Flow Board",
      description: "Kanban-style task management that moves at the speed of thought. Organize your work into intuitive columns, set priorities, and track progress visually. The board stays out of your way until you need it, then responds instantly.",
    },
    {
      src: "images/rooms/room4-back.jpg",
      caption: "Focus Analytics",
      description: "Detailed productivity metrics that reveal patterns in your work habits. Track daily focus scores, identify peak performance hours, and receive personalized recommendations for optimizing your schedule.",
    },
    {
      src: "images/rooms/room1-left.jpg",
      caption: "Distraction Shield",
      description: "Block notifications and interruptions during focus sessions. The shield creates a protective bubble around your work time, silencing non-essential alerts while allowing urgent communications through.",
    },
    {
      src: "images/rooms/room2-left.jpg",
      caption: "Session Notes",
      description: "Quick capture during deep work without breaking your flow. Jot down ideas, mark blockers, and record insights as they emerge. Your notes are automatically organized by session and searchable across time.",
    },
    {
      src: "images/rooms/room3-left.jpg",
      caption: "Mood Journaling",
      description: "Track emotional states alongside your work sessions. Understanding how mood affects productivity helps you schedule demanding tasks during peak mental states and lighter work during natural dips.",
    },
    {
      src: "images/rooms/room4-left.jpg",
      caption: "Collaborative Rooms",
      description: "Shared focus spaces for teams working together remotely. Enter a virtual room with colleagues, synchronize focus sessions, and maintain collective momentum through visible presence and shared goals.",
    },
    {
      src: "images/rooms/room1-right.jpg",
      caption: "Weekly Insights",
      description: "AI-generated productivity reports that summarize your week, highlight achievements, and suggest adjustments. Receive actionable recommendations based on your personal patterns and goals.",
    },
  ],
  lightboxCloseHint: "Press Esc or click outside to close",
}

// --- Footer ---

export interface FooterLinkColumn {
  heading: string
  links: string[]
}

export interface FooterConfig {
  linkColumns: FooterLinkColumn[]
  tickerWords: string[]
  copyright: string
}

export const footerConfig: FooterConfig = {
  linkColumns: [
    {
      heading: "THE PLATFORM",
      links: [
        "Deep Work Timer",
        "Ambient Soundscapes",
        "Task Flow Board",
        "Focus Analytics",
        "Distraction Shield",
      ],
    },
    {
      heading: "THE COMPANY",
      links: [
        "About FocusFlow",
        "Blog",
        "Careers",
        "Privacy Policy",
        "Terms of Service",
      ],
    },
  ],
  tickerWords: [
    "FOCUS",
    "FLOW",
    "DEEP",
    "WORK",
    "ZEN",
    "MIND",
    "CALM",
    "CREATE",
    "STREAK",
    "BUILD",
    "SPACE",
    "TIME",
    "REST",
    "GOAL",
    "TRACK",
  ],
  copyright: "© 2026 FocusFlow. All rights reserved.",
}
