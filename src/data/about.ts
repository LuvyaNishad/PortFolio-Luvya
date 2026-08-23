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
  // ⚠️ Replace with a true figure, or delete this row.
  { label: "EXPERIENCE", value: "5+ Years Crafting Digital Systems" },
  { label: "METHODOLOGY", value: "Intentional, Tactile & Systems-First" },
  { label: "CORE TOOLS", value: "Figma, React, Next.js, Framer, Tailwind" },
  // ⚠️ Keep this current, or delete this row — a stale quarter dates the site.
  { label: "STATUS", value: "Available for Q1/Q2 Projects" },
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
 *
 * ⚠️ EXAMPLE DATA. Rewrite with your real roles and education, or set
 *    this to [] to hide the section until you're ready.
 */
export const aboutTimeline: TimelineEntry[] = [
  {
    year: "2023 - Present",
    title: "Senior UI/UX Designer",
    company: "Freelance / Global",
    description:
      "Designing end-to-end digital experiences, scaling design systems, and building interactive web apps using React and Next.js.",
  },
  {
    year: "2021 - 2023",
    title: "Product Designer",
    company: "Tech Solutions Inc.",
    description:
      "Led the redesign of core enterprise applications, improving user retention and streamlining complex workflows.",
  },
  {
    year: "2018 - 2021",
    title: "B.Des in Visual Communication",
    company: "Design Institute",
    description:
      "Graduated with honors. Specialized in human-computer interaction, typography, and creative technology.",
  },
];
