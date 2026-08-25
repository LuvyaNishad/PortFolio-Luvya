export interface VisualArtifact {
  id: string;
  index: string;
  type?: "poster" | "thumbnail";
  aspectRatio?: "4/5" | "16/9";
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
   GRAPHIC DESIGN — Visual Artifacts Data
   ─────────────────────────────────────────────────
   Layout:
   • Layer 1: 4 Posters (1080x1350 px, 4:5 Portrait) in a horizontal row
   • Layer 2: 4 Thumbnails (1280x720 px, 16:9 Landscape) in a 2x2 grid
   
   HOW TO CUSTOMIZE DESCRIPTIONS & DETAILS:
   - title        : Main uppercase title (e.g., "POSTER", "CYBERPUNK")
   - titleAccent  : Secondary styled italic accent word (e.g., "01", "Edition")
   - subtitle     : Mono classification badge (e.g., "VA-01 // POSTER DESIGN")
   - accent       : Hex color for glow & highlights (e.g., "#78936f" for sage, "#c59b4a" for gold)
   - imageSrc     : Image path relative to public folder (e.g., "/images/Poster1.jpg")
   - tags         : Array of tags; tags[0] is highlighted as the primary badge
   - specs        : Key-value specifications displayed in the technical dossier modal
   - overview     : Project concept / summary paragraph shown in the modal dossier
   - artDirection : Design philosophy, typography, lighting & composition notes
   ───────────────────────────────────────────────── */

export const VISUAL_ARTIFACTS: VisualArtifact[] = [
  // ── LAYER 1: 4 POSTERS (1080x1350 / 4:5 PORTRAIT) ────────
  {
    id: "va-01",
    index: "01",
    type: "poster",
    aspectRatio: "4/5",
    title: "POSTER",
    titleAccent: "01",
    subtitle: "VA-01 // POSTER DESIGN",
    accent: "#78936f",
    imageSrc: "/images/Poster1.jpg",
    tags: ["POSTER DESIGN", "EDITORIAL", "2025"],
    specs: [
      { label: "DIMENSIONS", value: "1080 × 1350 px" },
      { label: "ASPECT RATIO", value: "4:5 Portrait" },
      { label: "RESOLUTION", value: "300 DPI High-Res" },
      { label: "TOOLS", value: "Photoshop / Illustrator" },
    ],
    overview:
      "A high-impact conceptual poster exploring dark atmospheric composition, brutalist typography, and modern visual hierarchy.",
    artDirection:
      "Structured with tactile grain overlays, high-contrast monochrome values, and subtle chromatic treatment.",
  },
  {
    id: "va-02",
    index: "02",
    type: "poster",
    aspectRatio: "4/5",
    title: "POSTER",
    titleAccent: "02",
    subtitle: "VA-02 // POSTER DESIGN",
    accent: "#8fae85",
    imageSrc: "/images/Poster2.jpg",
    tags: ["POSTER DESIGN", "TYPOGRAPHY", "2025"],
    specs: [
      { label: "DIMENSIONS", value: "1080 × 1350 px" },
      { label: "ASPECT RATIO", value: "4:5 Portrait" },
      { label: "GRID", value: "Custom Modular Grid" },
      { label: "TOOLS", value: "Photoshop / Figma" },
    ],
    overview:
      "Minimalist yet expressive visual study balancing negative space with bold typographic anchors and textured gradients.",
    artDirection:
      "Emphasis on asymmetrical tension, sharp type contrast, and controlled lighting falloff.",
  },
  {
    id: "va-03",
    index: "03",
    type: "poster",
    aspectRatio: "4/5",
    title: "POSTER",
    titleAccent: "03",
    subtitle: "VA-03 // POSTER DESIGN",
    accent: "#78936f",
    imageSrc: "/images/Poster3.jpg",
    tags: ["POSTER DESIGN", "BRANDING", "2025"],
    specs: [
      { label: "DIMENSIONS", value: "1080 × 1350 px" },
      { label: "ASPECT RATIO", value: "4:5 Portrait" },
      { label: "COLORSPACE", value: "RGB / CMYK Ready" },
      { label: "TOOLS", value: "Photoshop / Illustrator" },
    ],
    overview:
      "Tactical visual layout designed with technical annotations, atmospheric haze, and layered typographic elements.",
    artDirection:
      "Cinematic lighting combined with HUD motifs and delicate geometric accents.",
  },
  {
    id: "va-04",
    index: "04",
    type: "poster",
    aspectRatio: "4/5",
    title: "POSTER",
    titleAccent: "04",
    subtitle: "VA-04 // POSTER DESIGN",
    accent: "#8fae85",
    imageSrc: "/images/Poster4.jpg",
    tags: ["POSTER DESIGN", "COMPOSITION", "2025"],
    specs: [
      { label: "DIMENSIONS", value: "1080 × 1350 px" },
      { label: "ASPECT RATIO", value: "4:5 Portrait" },
      { label: "TEXTURE", value: "Custom Film Grain" },
      { label: "TOOLS", value: "Photoshop / After Effects" },
    ],
    overview:
      "Cinematic poster exploration featuring multi-layered visual depth, precise alignment, and expressive tonal curves.",
    artDirection:
      "Deep shadowy vignettes, sharp edge contrast, and curated typographic pairing.",
  },

  // ── LAYER 2: 4 THUMBNAILS (1280x720 / 16:9 LANDSCAPE) ────
  {
    id: "va-05",
    index: "05",
    type: "thumbnail",
    aspectRatio: "16/9",
    title: "THUMBNAIL",
    titleAccent: "01",
    subtitle: "VA-05 // YOUTUBE THUMBNAIL",
    accent: "#c59b4a",
    imageSrc: "/images/Thumbnail1.jpg",
    tags: ["THUMBNAIL", "YOUTUBE", "CTR DESIGN"],
    specs: [
      { label: "DIMENSIONS", value: "1280 × 720 px" },
      { label: "ASPECT RATIO", value: "16:9 Landscape" },
      { label: "PURPOSE", value: "High-CTR Engagement" },
      { label: "TOOLS", value: "Photoshop / Lightroom" },
    ],
    overview:
      "High-conversion YouTube thumbnail engineered for maximum visual contrast, clear focal point, and instant viewer retention.",
    artDirection:
      "High-contrast color grading, intentional subject cutouts, dynamic rim lighting, and readable typography at small scale.",
  },
  {
    id: "va-06",
    index: "06",
    type: "thumbnail",
    aspectRatio: "16/9",
    title: "THUMBNAIL",
    titleAccent: "02",
    subtitle: "VA-06 // YOUTUBE THUMBNAIL",
    accent: "#d4aa5c",
    imageSrc: "/images/Thumbnail2.jpg",
    tags: ["THUMBNAIL", "YOUTUBE", "CREATIVE"],
    specs: [
      { label: "DIMENSIONS", value: "1280 × 720 px" },
      { label: "ASPECT RATIO", value: "16:9 Landscape" },
      { label: "PURPOSE", value: "Content Branding" },
      { label: "TOOLS", value: "Photoshop / Blender" },
    ],
    overview:
      "Eye-catching thumbnail design balancing visual curiosity with clear storytelling and bold focal hierarchy.",
    artDirection:
      "Dramatic lighting accents, vivid complementary highlights, and clean foreground-background separation.",
  },
  {
    id: "va-07",
    index: "07",
    type: "thumbnail",
    aspectRatio: "16/9",
    title: "THUMBNAIL",
    titleAccent: "03",
    subtitle: "VA-07 // YOUTUBE THUMBNAIL",
    accent: "#c59b4a",
    imageSrc: "/images/Thumbnail3.jpg",
    tags: ["THUMBNAIL", "YOUTUBE", "STORYTELLING"],
    specs: [
      { label: "DIMENSIONS", value: "1280 × 720 px" },
      { label: "ASPECT RATIO", value: "16:9 Landscape" },
      { label: "PURPOSE", value: "Audience Retention" },
      { label: "TOOLS", value: "Photoshop / Illustrator" },
    ],
    overview:
      "Compelling narrative thumbnail crafted to evoke curiosity while keeping branding cohesive and punchy across device screens.",
    artDirection:
      "Vibrant glow effects, sharp typography, controlled depth-of-field blur, and polished asset composition.",
  },
  {
    id: "va-08",
    index: "08",
    type: "thumbnail",
    aspectRatio: "16/9",
    title: "THUMBNAIL",
    titleAccent: "04",
    subtitle: "VA-08 // YOUTUBE THUMBNAIL",
    accent: "#d4aa5c",
    imageSrc: "/images/Thumbnail4.jpg",
    tags: ["THUMBNAIL", "YOUTUBE", "TACTICAL"],
    specs: [
      { label: "DIMENSIONS", value: "1280 × 720 px" },
      { label: "ASPECT RATIO", value: "16:9 Landscape" },
      { label: "PURPOSE", value: "High-CTR Engagement" },
      { label: "TOOLS", value: "Photoshop / After Effects" },
    ],
    overview:
      "Modern dynamic thumbnail focused on punchy color accents, clean isolation, and instant readability in recommendation feeds.",
    artDirection:
      "Punchy exposure curve, sharp focal contrast, clean edge masks, and optimized readability for mobile and desktop feeds.",
  },
];
