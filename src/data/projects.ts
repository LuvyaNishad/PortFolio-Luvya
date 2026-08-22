export type ProjectCategory = "graphic_design" | "video_edits" | "ui_ux" | "code_projects";

export interface ProjectItem {
  id: string;
  title: string;
  category: ProjectCategory;
  thumbnailUrl: string;
  mediaUrl?: string; // For MP4 or other media
  description?: string;
  link?: string;
  aspectRatio?: string;
}

// The 4 main showcase categories
export const SHOWCASE_CATEGORIES = [
  { id: "graphic_design", title: "GRAPHIC DESIGN", subtitle: "Posters, branding & print" },
  { id: "video_edits", title: "VIDEO EDITS", subtitle: "Reels, shorts & long-form" },
  { id: "ui_ux", title: "UI/UX DESIGN", subtitle: "Interfaces & experiences" },
  { id: "code_projects", title: "CODE PROJECTS", subtitle: "Web apps & experiments" },
];

/* ─────────────────────────────────────────────────
   Add projects here as you complete them. Empty until
   you insert your own work — no placeholder assets ship.

   To add a project:
   1. Drop the file in  public/images/  (or public/videos/).
   2. Copy the template into the array and fill it in.

   const example: ProjectItem = {
     id: "gd-1",
     title: "Project Name",
     category: "graphic_design",          // see ProjectCategory
     thumbnailUrl: "/images/my-thumb.jpg",
     mediaUrl: "/videos/my-clip.mp4",     // optional
     description: "Short summary.",        // optional
     link: "https://…",                   // optional
   };
───────────────────────────────────────────────── */
export const PROJECTS_DATA: ProjectItem[] = [];
