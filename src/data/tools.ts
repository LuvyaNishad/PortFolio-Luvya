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
    slots: 7,
    tools: [],
  },
  {
    id: "development",
    title: "Development",
    subtitle: "Frontend Development & Frameworks",
    slots: 8,
    tools: [],
  },
  {
    id: "other",
    title: "Other Skills",
    subtitle: "Additional Tools & Technologies",
    slots: 7,
    tools: [],
  },
];
