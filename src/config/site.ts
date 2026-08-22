/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONFIG — single source of truth
 * ─────────────────────────────────────────────────────────────
 *
 *  This is the ONE file to edit for identity, contact details,
 *  social links, resume, and SEO defaults. Nothing here is
 *  hardcoded elsewhere — update it here and it propagates across
 *  the navbar, hero, about dossier, contact section, footer,
 *  and all page metadata (title, Open Graph, Twitter, sitemap).
 *
 *  To go live:
 *    1. Set NEXT_PUBLIC_SITE_URL in your host (e.g. Vercel) to your
 *       real domain — it drives canonical URLs, OG images & sitemap.
 *    2. Fill in `resumeUrl` and any social links you want shown.
 *       Empty links are automatically hidden (no dead "#" links).
 */

export interface SocialLink {
  /** Stable key used to pick the matching icon. */
  key: "github" | "linkedin" | "x" | "youtube";
  label: string;
  /** Leave empty ("") to hide this link everywhere until you add a URL. */
  href: string;
}

/**
 * Production URL. Override per-environment with NEXT_PUBLIC_SITE_URL.
 * Falls back to the Vercel deployment URL, then a placeholder you
 * should replace with your real domain before launch.
 */
export const SITE_URL: string =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
  "https://your-domain.com";

export const siteConfig = {
  /** Brand / display name shown in headings and metadata. */
  name: "Aurelius",
  /** Full legal/real name — used for copyright & structured data. */
  legalName: "Luvya Nishad",
  /** Logo initials mark (footer, etc.). */
  initials: "LN",

  /**
   * Professional positioning. This portfolio showcases BOTH design
   * and development work, so the title reflects both disciplines.
   * Used for the hero badge, intro role line, about dossier & SEO.
   */
  role: "Designer & Developer",
  /** Slightly longer variant for prose / meta descriptions. */
  roleLong: "Designer & Developer",

  /** One-line hero tagline. */
  tagline:
    "I design and build digital experiences where clarity, technology and visual storytelling meet.",

  /** SEO meta description (~150–160 chars ideal). */
  description:
    "Aurelius is a designer and developer crafting cinematic, user-centered digital experiences — from interface design to production-ready frontend engineering.",

  /** Availability line shown in the hero. */
  availability: "Available for exciting projects",
  /** Location line (about dossier / structured data). */
  location: "Remote / Global",

  url: SITE_URL,

  /** Primary contact email — powers the mailto fallback + contact card. */
  email: "luvyanishad@gmail.com",

  /**
   * Resume link. Leave "" to hide the Resume button entirely.
   * Drop a hosted PDF link here, or place resume.pdf in /public and
   * set this to "/resume.pdf".
   */
  resumeUrl: "",

  /**
   * Social links. Order is preserved. Any entry with an empty href is
   * hidden automatically, so there are never dead "#" links on the page.
   */
  socials: [
    { key: "github", label: "GitHub", href: "https://github.com/LuvyaNishad" },
    { key: "linkedin", label: "LinkedIn", href: "" },
    { key: "x", label: "X", href: "" },
    { key: "youtube", label: "YouTube", href: "" },
  ] as SocialLink[],

  /** GitHub username used by the live contribution heatmap. */
  githubUsername: "LuvyaNishad",

  /** Default SEO keywords. */
  keywords: [
    "designer",
    "developer",
    "UI/UX designer",
    "frontend developer",
    "product designer",
    "web design",
    "portfolio",
    "creative technologist",
  ],
} as const;

/** Social links that actually have a URL — safe to render directly. */
export const activeSocials: SocialLink[] = siteConfig.socials.filter(
  (s) => s.href.trim().length > 0
);

export type SiteConfig = typeof siteConfig;
