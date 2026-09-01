/**
 * Tools / tech-stack inventory — single source of truth.
 *
 * ── HOW TO ADD YOUR TOOLS ────────────────────────────────────────────
 * Each category renders as an "inventory" row. To fill it, add entries to
 * its `tools` array, e.g.:
 *
 *     tools: [
 *       { name: "Figma",  icon: "/tools/figma.svg" },
 *       { name: "Framer" },                         // icon optional
 *     ],
 *
 * • `slots`   = total grid capacity for the row (empty slots stay visible
 *               as tactical placeholders until you fill them).
 * • Capacity  = tools.length / slots  (updates automatically).
 * • Add a whole new category by appending an object to `toolCategories`.
 *
 * Nothing else needs editing — the Tools section is fully data-driven.
 * ─────────────────────────────────────────────────────────────────────
 */

export interface Tool {
  name: string;
  /** Optional icon path under /public, e.g. "/tools/figma.svg". */
  icon?: string;
}

export interface ToolCategory {
  id: string;
  title: string;
  subtitle: string;
  /** Total number of card slots to render for this row. */
  slots: number;
  tools: Tool[];
}

export const toolCategories: ToolCategory[] = [
  {
    id: "design",
    title: "Design Tools",
    subtitle: "UI/UX Design, Prototyping & Visual Communication",
    slots: 8,
    tools: [
      { name: "Photoshop", icon: "/tools/photoshop.svg" },
      { name: "Illustrator", icon: "/tools/illustrator.svg" },
      { name: "After Effects", icon: "/tools/aftereffects.svg" },
      { name: "Figma", icon: "/tools/figma.svg" },
      { name: "Fusion 360", icon: "/tools/fusion360.svg" },
      { name: "Framer", icon: "/tools/framer.svg" },
      { name: "Google Stitch", icon: "/tools/stitch.svg" },
      { name: "Canva", icon: "/tools/canva.svg" },
    ],
  },
  {
    id: "development",
    title: "Development",
    subtitle: "Development & Frameworks",
    slots: 9,
    tools: [
      { name: "React", icon: "/tools/react.svg" },
      { name: "Next.js", icon: "/tools/nextjs.svg" },
      { name: "TypeScript", icon: "/tools/typescript.svg" },
      { name: "Python", icon: "/tools/python.svg" },
      { name: "Java", icon: "/tools/java.svg" },
      { name: "C++", icon: "/tools/cpp.svg" },
      { name: "Flutter", icon: "/tools/flutter.svg" },
      { name: "Dart", icon: "/tools/dart.svg" },
      { name: "MySQL", icon: "/tools/mysql.svg" },
    ],
  },
  {
    id: "other",
    title: "Other Skills",
    subtitle: "Media, Audio, Cloud & Version Control",
    slots: 7,
    tools: [
      { name: "Vercel", icon: "/tools/vercel.svg" },
      { name: "Premiere Pro", icon: "/tools/premiere.svg" },
      { name: "Supabase", icon: "/tools/supabase.svg" },
      { name: "Git", icon: "/tools/git.svg" },
      { name: "GitHub", icon: "/tools/github.svg" },
      { name: "Audacity", icon: "/tools/audacity.svg" },
      { name: "LaTeX", icon: "/tools/latex.svg" },
    ],
  },
];

