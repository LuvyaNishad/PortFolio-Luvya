export type ProjectCategory = "graphic_design" | "video_edits" | "ui_ux" | "code_projects";

export interface ProjectItem {
  id: string;
  title: string;
  category: ProjectCategory;
  thumbnailUrl: string;
  mediaUrl?: string; // For MP4 or other media
  description?: string;
  link?: string;
}

// These are the 4 main categories as requested
export const SHOWCASE_CATEGORIES = [
  { id: "graphic_design", title: "GRAPHIC DESIGN", subtitle: "Posters, branding & print" },
  { id: "video_edits", title: "VIDEO EDITS", subtitle: "Reels, shorts & long-form" },
  { id: "ui_ux", title: "UI/UX DESIGN", subtitle: "Interfaces & experiences" },
  { id: "code_projects", title: "CODE PROJECTS", subtitle: "Web apps & experiments" },
];

// Placeholders ready for you to insert your png, jpg, mp4 files
export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "gd-1",
    title: "Placeholder 1",
    category: "graphic_design",
    thumbnailUrl: "/images/placeholder.png", 
  },
  {
    id: "ve-1",
    title: "Placeholder 1",
    category: "video_edits",
    thumbnailUrl: "/images/placeholder.png", 
    mediaUrl: "/videos/placeholder.mp4",
  },
  {
    id: "ui-1",
    title: "Placeholder 1",
    category: "ui_ux",
    thumbnailUrl: "/images/placeholder.png", 
  },
  {
    id: "cp-1",
    title: "Placeholder 1",
    category: "code_projects",
    thumbnailUrl: "/images/placeholder.png", 
  }
];
