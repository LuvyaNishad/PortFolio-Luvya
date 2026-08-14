export type MotionArtifact = {
  id: string;
  type: "reel" | "youtube";
  title: string;
  titleAccent: string;
  subtitle: string;
  tags: string[];
  specs: { label: string; value: string }[];
  overview: string;
  artDirection: string;
  videoSrc?: string;
  imageSrc: string;
  accent: string;
};

export const MOTION_ARTIFACTS: MotionArtifact[] = [
  {
    id: "motion-01",
    type: "reel",
    title: "KINETIC",
    titleAccent: "Sequence",
    subtitle: "SHORT-FORM CUT",
    tags: ["Premiere Pro", "After Effects"],
    specs: [
      { label: "FORMAT", value: "9:16 Vertical" },
      { label: "DURATION", value: "00:15s" },
      { label: "FPS", value: "60" },
      { label: "ROLE", value: "Editor" },
    ],
    overview: "A fast-paced kinetic typography sequence designed for high-impact social media engagement.",
    artDirection: "High contrast, aggressive cuts, glitch transitions, and intense sound design.",
    imageSrc: "/images/artifact_placeholder.jpg",
    accent: "#c5261a",
  },
  {
    id: "motion-02",
    type: "reel",
    title: "BRAND",
    titleAccent: "Manifesto",
    subtitle: "SOCIAL TEASER",
    tags: ["DaVinci Resolve", "Blender"],
    specs: [
      { label: "FORMAT", value: "9:16 Vertical" },
      { label: "DURATION", value: "00:30s" },
      { label: "FPS", value: "30" },
      { label: "ROLE", value: "Motion Designer" },
    ],
    overview: "Vertical teaser optimized for TikTok and Instagram Reels.",
    artDirection: "Dark, moody aesthetic with cinematic color grading and floating particles.",
    imageSrc: "/images/artifact_placeholder.jpg",
    accent: "#c5261a",
  },
  {
    id: "motion-03",
    type: "youtube",
    title: "CINEMATIC",
    titleAccent: "Vlog",
    subtitle: "LONG-FORM NARRATIVE",
    tags: ["Premiere Pro", "Audition"],
    specs: [
      { label: "FORMAT", value: "16:9 Landscape" },
      { label: "DURATION", value: "08:45s" },
      { label: "RESOLUTION", value: "4K" },
      { label: "ROLE", value: "Director & Editor" },
    ],
    overview: "A narrative-driven vlog exploring the intersection of design and technology.",
    artDirection: "Soft lighting, smooth gimbal movements, and immersive ambient soundscapes.",
    imageSrc: "/images/artifact_placeholder.jpg",
    accent: "#c5261a",
  },
  {
    id: "motion-04",
    type: "youtube",
    title: "PRODUCT",
    titleAccent: "Showcase",
    subtitle: "PROMO VIDEO",
    tags: ["After Effects", "Cinema 4D"],
    specs: [
      { label: "FORMAT", value: "16:9 Landscape" },
      { label: "DURATION", value: "02:10s" },
      { label: "RESOLUTION", value: "4K" },
      { label: "ROLE", value: "Motion Designer" },
    ],
    overview: "High-fidelity product reveal video highlighting key features and hardware details.",
    artDirection: "Sleek metallic textures, volumetric lighting, and precise macro camera sweeps.",
    imageSrc: "/images/artifact_placeholder.jpg",
    accent: "#c5261a",
  },
];
