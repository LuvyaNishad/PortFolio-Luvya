export interface VisualArtifact {
  id: string;
  index: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  accent: string;
  imageSrc: string;
  tags: string[];
  specs: { label: string; value: string }[];
  overview: string;
  artDirection: string;
}

/* ─────────────────────────────────────────────────
   GRAPHIC DESIGN — Visual Artifacts
   ─────────────────────────────────────────────────
   Add your graphic-design work here. Each entry becomes
   an expandable dossier card in the "Visual Artifacts"
   showcase. While this array is empty, the section shows
   tactical "slot available" placeholders automatically.

   To add a piece:
   1. Drop your image in  public/images/  (e.g. obsidian.jpg)
   2. Copy the template below into the array and fill it in.
      Leave `imageSrc: ""` if the image isn't ready yet —
      a themed placeholder shows until you add it.

   const example: VisualArtifact = {
     id: "va-01",                          // unique, any string
     index: "01",
     title: "OBSIDIAN",                    // shown large
     titleAccent: "Protocol",             // italic serif accent
     subtitle: "VA-01 // EDITORIAL PRINT", // small mono label
     accent: "#78936f",                    // category green
     imageSrc: "/images/obsidian.jpg",     // or "" while pending
     tags: ["POSTER SYSTEM", "300 DPI", "2025"],
     specs: [
       { label: "Medium", value: "Print / Offset Litho" },
       { label: "Grid", value: "12-Column Swiss" },
     ],
     overview: "One or two sentences describing the project.",
     artDirection: "A note on the visual approach and craft.",
   };
───────────────────────────────────────────────── */

export const VISUAL_ARTIFACTS: VisualArtifact[] = [];
