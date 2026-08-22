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

/* ─────────────────────────────────────────────────
   VIDEO EDITS — Motion Artifacts
   ─────────────────────────────────────────────────
   Add your video / motion work here. Each entry becomes
   an expandable card in the "Motion & Storytelling"
   showcase. While this array is empty, the section shows
   tactical "slot available" placeholders automatically.

   To add a piece:
   1. Drop a poster/thumbnail image in  public/images/
      (e.g. kinetic-poster.jpg)
   2. Copy the template below into the array and fill it in.
      Leave `imageSrc: ""` if the thumbnail isn't ready —
      a themed placeholder shows until you add it.
   3. `type` controls the modal layout:
        "reel"    → vertical 9:16
        "youtube" → landscape 16:9

   const example: MotionArtifact = {
     id: "motion-01",
     type: "reel",
     title: "KINETIC",
     titleAccent: "Sequence",
     subtitle: "SHORT-FORM CUT",
     tags: ["Premiere Pro", "After Effects"],
     specs: [
       { label: "FORMAT", value: "9:16 Vertical" },
       { label: "DURATION", value: "00:15s" },
     ],
     overview: "One or two sentences about the edit.",
     artDirection: "A note on pacing, grade, and sound.",
     imageSrc: "/images/kinetic-poster.jpg", // or "" while pending
     accent: "#c5261a",                        // category red
   };
───────────────────────────────────────────────── */

export const MOTION_ARTIFACTS: MotionArtifact[] = [];
