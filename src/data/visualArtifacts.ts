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
   GRAPHIC DESIGN — Visual Artifacts Data
   ─────────────────────────────────────────────────
   Here are your 8 Graphic Design pieces (4 Posters + 4 Thumbnails).
   
   HOW TO CUSTOMIZE DESCRIPTIONS & DETAILS:
   - title        : Main uppercase title (e.g., "AURELIUS", "TACTICAL")
   - titleAccent  : Secondary styled italic accent word (e.g., "Poster", "Edition")
   - subtitle     : Mono classification badge (e.g., "VA-01 // POSTER DESIGN")
   - accent       : Hex color for glow & highlights (e.g., "#78936f" for sage, "#c59b4a" for gold)
   - imageSrc     : Image path relative to public folder (e.g., "/images/Poster1.jpg")
   - tags         : Array of tags; tags[0] is highlighted as the primary badge
   - specs        : Key-value specifications displayed in the technical dossier modal
   - overview     : Project concept / summary paragraph shown in the modal dossier
   - artDirection : Design philosophy, typography, lighting & composition notes
   ───────────────────────────────────────────────── */

export const VISUAL_ARTIFACTS: VisualArtifact[] = [
  // ── 4 POSTERS ───────────────────────────────────
  {
    id: "va-01",
    index: "01",
    title: "POSTER",
    titleAccent: "01",
    subtitle: "VA-01 // POSTER DESIGN",
    accent: "#78936f",
    imageSrc: "/images/Poster1.jpg",
    tags: ["POSTER DESIGN", "EDITORIAL", "2025"],
    specs: [
      { label: "FORMAT", value: "Print & Digital Poster" },
      { label: "RESOLUTION", value: "300 DPI High-Res" },
      { label: "TOOLS", value: "Photoshop / Illustrator" },
      { label: "YEAR", value: "2025" },
    ],
    overview:
      "A high-impact conceptual poster exploring dark atmospheric composition, brutalist typography, and modern visual hierarchy.",
    artDirection:
      "Structured with tactile grain overlays, high-contrast monochrome values, and subtle chromatic treatment.",
  },
  {
    id: "va-02",
    index: "02",
    title: "POSTER",
    titleAccent: "02",
    subtitle: "VA-02 // POSTER DESIGN",
    accent: "#8fae85",
    imageSrc: "/images/Poster2.jpg",
    tags: ["POSTER DESIGN", "TYPOGRAPHY", "2025"],
    specs: [
      { label: "FORMAT", value: "Editorial Poster" },
      { label: "GRID", value: "Custom Modular Grid" },
      { label: "TOOLS", value: "Photoshop / Figma" },
      { label: "YEAR", value: "2025" },
    ],
    overview:
      "Minimalist yet expressive visual study balancing negative space with bold typographic anchors and textured gradients.",
    artDirection:
      "Emphasis on asymmetrical tension, sharp type contrast, and controlled lighting falloff.",
  },
  {
    id: "va-03",
    index: "03",
    title: "POSTER",
    titleAccent: "03",
    subtitle: "VA-03 // POSTER DESIGN",
    accent: "#78936f",
    imageSrc: "/images/Poster3.jpg",
    tags: ["POSTER DESIGN", "BRANDING", "2025"],
    specs: [
      { label: "FORMAT", value: "Print / Display" },
      { label: "COLORSPACE", value: "RGB / CMYK Ready" },
      { label: "TOOLS", value: "Photoshop / Illustrator" },
      { label: "YEAR", value: "2025" },
    ],
    overview:
      "Tactical visual layout designed with technical annotations, atmospheric haze, and layered typographic elements.",
    artDirection:
      "Cinematic lighting combined with HUD motifs and delicate geometric accents.",
  },
  {
    id: "va-04",
    index: "04",
    title: "POSTER",
    titleAccent: "04",
    subtitle: "VA-04 // POSTER DESIGN",
    accent: "#8fae85",
    imageSrc: "/images/Poster4.jpg",
    tags: ["POSTER DESIGN", "COMPOSITION", "2025"],
    specs: [
      { label: "FORMAT", value: "Large Format Print" },
      { label: "TEXTURE", value: "Custom Film Grain" },
      { label: "TOOLS", value: "Photoshop / After Effects" },
      { label: "YEAR", value: "2025" },
    ],
    overview:
      "Cinematic poster exploration featuring multi-layered visual depth, precise alignment, and expressive tonal curves.",
    artDirection:
      "Deep shadowy vignettes, sharp edge contrast, and curated typographic pairing.",
  },

  // ── 4 THUMBNAILS ────────────────────────────────
  {
    id: "va-05",
    index: "05",
    title: "THUMBNAIL",
    titleAccent: "01",
    subtitle: "VA-05 // YOUTUBE THUMBNAIL",
    accent: "#c59b4a",
    imageSrc: "/images/Thumbnail1.jpg",
    tags: ["THUMBNAIL", "YOUTUBE", "CTR DESIGN"],
    specs: [
      { label: "ASPECT RATIO", value: "16:9 Landscape" },
      { label: "RESOLUTION", value: "1920x1080 Full HD" },
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
    title: "THUMBNAIL",
    titleAccent: "02",
    subtitle: "VA-06 // YOUTUBE THUMBNAIL",
    accent: "#d4aa5c",
    imageSrc: "/images/Thumbnail2.jpg",
    tags: ["THUMBNAIL", "YOUTUBE", "CREATIVE"],
    specs: [
      { label: "ASPECT RATIO", value: "16:9 Landscape" },
      { label: "RESOLUTION", value: "1920x1080 Full HD" },
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
    title: "THUMBNAIL",
    titleAccent: "03",
    subtitle: "VA-07 // YOUTUBE THUMBNAIL",
    accent: "#c59b4a",
    imageSrc: "/images/Thumbnail3.jpg",
    tags: ["THUMBNAIL", "YOUTUBE", "STORYTELLING"],
    specs: [
      { label: "ASPECT RATIO", value: "16:9 Landscape" },
      { label: "RESOLUTION", value: "1920x1080 Full HD" },
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
    title: "THUMBNAIL",
    titleAccent: "04",
    subtitle: "VA-08 // YOUTUBE THUMBNAIL",
    accent: "#d4aa5c",
    imageSrc: "/images/Thumbnail4.jpg",
    tags: ["THUMBNAIL", "YOUTUBE", "TACTICAL"],
    specs: [
      { label: "ASPECT RATIO", value: "16:9 Landscape" },
      { label: "RESOLUTION", value: "1920x1080 Full HD" },
      { label: "PURPOSE", value: "High-CTR Engagement" },
      { label: "TOOLS", value: "Photoshop / After Effects" },
    ],
    overview:
      "Modern dynamic thumbnail focused on punchy color accents, clean isolation, and instant readability in recommendation feeds.",
    artDirection:
      "Punchy exposure curve, sharp focal contrast, clean edge masks, and optimized readability for mobile and desktop feeds.",
  },
];
