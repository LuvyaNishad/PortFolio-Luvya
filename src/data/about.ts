/**
 * ─────────────────────────────────────────────────────────────
 *  ABOUT DOSSIER CONTENT
 * ─────────────────────────────────────────────────────────────
 *
 *  Everything the "About" modal shows, in one editable file.
 *  Edit the values below — no component code needs touching.
 *
 *  ⚠️  BEFORE LAUNCH: the EXPERIENCE / STATUS specs and the whole
 *      `aboutTimeline` array below are STRUCTURAL EXAMPLES carried
 *      over from the design phase. They are NOT your real history.
 *      Replace them with true entries, or empty the array —
 *      `aboutTimeline: []` hides the Journey block entirely and the
 *      modal still looks intentional.
 *
 *  Role, location and email are NOT repeated here — they come from
 *  src/config/site.ts so they can never fall out of sync.
 */

/** Opening paragraph — "01. WHO I AM". */
export const aboutBio =
  "I am a multidisciplinary product designer and creative engineer with a passion for building intentional, high-fidelity digital systems. I operate at the intersection of strategic user experience, evocative visual aesthetics, and resilient frontend code. Rather than treating design and development as separate silos, I unify them into a single holistic craft.";

/** Discipline chips. Add/remove freely — the row wraps on its own. */
export const aboutTags = [
  "PRODUCT DESIGN",
  "DESIGN SYSTEMS",
  "UI/UX ARCHITECTURE",
  "CREATIVE TECH",
  "MOTION & 3D",
] as const;

export interface AboutSpec {
  label: string;
  value: string;
}

/**
 * Spec grid. ROLE and LOCATION are injected from site.ts by the
 * component, so only add rows here that aren't already in the config.
 * An empty array hides the grid.
 */
export const aboutSpecs: AboutSpec[] = [
  { label: "EXPERIENCE", value: "2+ Years Crafting Digital Systems" },
  { label: "METHODOLOGY", value: "Intentional, Tactile & Systems-First" },
  { label: "CORE TOOLS", value: "Figma, React, Next.js, Framer, TypeScript" },
  { label: "STATUS", value: "Open for Opportunities & Projects" },
];

export interface TimelineEntry {
  /** Free text — "2024 — Present", "2022", "Summer 2023"… */
  year: string;
  /** Job title, degree, or milestone. */
  title: string;
  /** Employer, client, or institution. */
  company: string;
  /** One or two sentences on what you actually did. */
  description: string;
}

/**
 * "02. JOURNEY & EDUCATION" — newest first.
 */
export const aboutTimeline: TimelineEntry[] = [
  {
    year: "May 2026 - Aug 2026",
    title: "Summer Research Intern",
    company: "IIIT Delhi",
    description:
      "Conducting academic research and software development under faculty supervision, exploring interactive systems and digital design architectures.",
  },
  {
    year: "2024 - 2028",
    title: "B.Tech in Computer Science & Design (CSD)",
    company: "IIIT Delhi",
    description:
      "Undergraduate student at Indraprastha Institute of Information Technology Delhi, studying at the intersection of computer science, interface engineering, and visual systems.",
  },
  {
    year: "2024",
    title: "Senior Secondary (Class XII - CBSE)",
    company: "Ahlcon International School, Delhi",
    description:
      "Completed Class 12 CBSE board curriculum with core focus on Mathematics, Science, and Computer Science fundamentals.",
  },
  {
    year: "2022",
    title: "Secondary School (Class X - CBSE)",
    company: "Ahlcon International School, Delhi",
    description:
      "Completed Class 10 CBSE board examinations with strong academic foundation in science, mathematics, and computing.",
  },
];
