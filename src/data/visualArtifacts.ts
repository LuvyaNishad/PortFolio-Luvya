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

export const VISUAL_ARTIFACTS: VisualArtifact[] = [
  {
    id: "va-01",
    index: "01",
    title: "OBSIDIAN",
    titleAccent: "Protocol",
    subtitle: "VA-01 // EDITORIAL PRINT",
    accent: "#78936f",
    imageSrc: "/images/placeholder.png",
    tags: ["POSTER SYSTEM", "300 DPI", "2025"],
    specs: [
      { label: "Medium", value: "Print / Offset Litho" },
      { label: "Grid", value: "12-Column Swiss" },
      { label: "Tools", value: "InDesign / Photoshop" },
      { label: "Stock", value: "170gsm Uncoated" },
    ],
    overview:
      "An editorial monograph system built around brutalist typography and dense information architecture. The Obsidian Protocol is a dark-first print language designed for technical documentation, zines, and limited-run publications.",
    artDirection:
      "Typefaces are set in high-contrast mono stacks with deliberate negative space. The grid enforces strict Swiss alignment while allowing controlled breakouts for full-bleed imagery. Ink density targets 320% TAC for deep, matte blacks.",
  },
  {
    id: "va-02",
    index: "02",
    title: "UMBRELLA",
    titleAccent: "Architecture",
    subtitle: "VA-02 // BRAND IDENTITY",
    accent: "#78936f",
    imageSrc: "/images/placeholder.png",
    tags: ["BRAND SYSTEM", "IDENTITY", "2024"],
    specs: [
      { label: "Medium", value: "Brand Guidelines" },
      { label: "Format", value: "A3 Landscape" },
      { label: "Tools", value: "Illustrator / Figma" },
      { label: "Delivery", value: "PDF + Print" },
    ],
    overview:
      "A dark corporate identity system for Umbrella Architecture — a fictional defense-adjacent consultancy. The brand language merges institutional gravitas with covert visual codes, creating a system that feels classified and authoritative.",
    artDirection:
      "The identity uses a restrained two-color palette (void black and operational grey) with a single tactical accent. Logo geometry is derived from structural engineering schematics. All collateral follows a strict modular grid with redacted-style type treatments.",
  },
  {
    id: "va-03",
    index: "03",
    title: "VALKYRIE",
    titleAccent: "Monolith",
    subtitle: "VA-03 // POSTER SERIES",
    accent: "#78936f",
    imageSrc: "/images/placeholder.png",
    tags: ["SCREEN PRINT", "LIMITED RUN", "2025"],
    specs: [
      { label: "Medium", value: "Screen Print / Silk" },
      { label: "Dimensions", value: "24×36 in" },
      { label: "Edition", value: "50 Numbered" },
      { label: "Colors", value: "3-Pass Separation" },
    ],
    overview:
      "A limited-edition typographic exhibition poster series exploring the intersection of brutalist letterforms and celestial cartography. Each print in the Valkyrie Monolith series maps a different star system using type as terrain.",
    artDirection:
      "Oversized display type is rendered in custom variable-weight outlines that dissolve into topographic contour lines. The three-pass screen print process uses metallic silver, void black, and a translucent varnish layer for dimensional depth.",
  },
  {
    id: "va-04",
    index: "04",
    title: "CHRONOS",
    titleAccent: "Dossier",
    subtitle: "VA-04 // PACKAGING DESIGN",
    accent: "#78936f",
    imageSrc: "/images/placeholder.png",
    tags: ["PACKAGING", "FOIL STAMP", "2024"],
    specs: [
      { label: "Medium", value: "Rigid Box + Foil" },
      { label: "Finish", value: "Soft-Touch Matte" },
      { label: "Tools", value: "Cinema 4D / PS" },
      { label: "Material", value: "350gsm Invercote" },
    ],
    overview:
      "A luxury packaging concept for a high-end watchmaker's archive collection. The Chronos Dossier treats each timepiece box as a sealed intelligence file — complete with embossed serial numbers, foil-stamped classification markings, and a magnetic closure mechanism.",
    artDirection:
      "The packaging system uses blind debossing for structural details and hot-foil stamping in matte gold for critical data points. Interior linings are printed with micro-scale technical drawings of the movement. The unboxing sequence is designed as a ritual of revelation.",
  },
];
