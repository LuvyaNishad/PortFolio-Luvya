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
 *    2. Fill in `resumes` URLs and any social links you want shown.
 *       Empty links are automatically hidden (no dead "#" links).
 */

export interface SocialLink {
  /** Stable key used to pick the matching icon. */
  key: "github" | "linkedin" | "x" | "youtube" | "instagram";
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

/* ─────────────────────────────────────────────────────────────
   The two names. Edit these two lines and every heading, tab
   title, footer credit and search-engine record follows.
   ───────────────────────────────────────────────────────────── */

/** Real name. Leads the browser tab title and search results. */
const LEGAL_NAME = "Luvya Nishad";
/** Brand / alias shown inside the site's own UI. */
const BRAND_NAME = "Aurelius";

export const siteConfig = {
  /** Brand / display name shown in headings and in-site UI. */
  name: BRAND_NAME,
  /** Full legal/real name — used for copyright & structured data. */
  legalName: LEGAL_NAME,
  /**
   * Name that leads the browser tab title, Open Graph card and search
   * results. Set to the real name so anyone googling "Luvya Nishad"
   * finds this site; "Aurelius" still shows throughout the UI and is
   * registered as an `alternateName` in the structured data.
   * Swap to BRAND_NAME if you'd rather lead with the brand.
   */
  seoName: LEGAL_NAME,
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
    "Luvya Nishad (Aurelius) — designer and developer crafting cinematic, user-centered digital experiences, from interface design to production frontend engineering.",

  /** Availability line shown in the hero. */
  availability: "Available for exciting projects",
  /** Location line (about dossier / structured data). */
  location: "Remote / Global",

  url: SITE_URL,

  /** Primary contact email — powers the mailto fallback + contact card. */
  email: "workwithluvya@gmail.com",

  /**
   * Resume links. Leave both "" to hide the Resume button entirely.
   * Place your PDF files in /public/resumes/ and reference them here,
   * or use hosted URLs.
   */
  resumes: {
    design: "/resumes/design_resume.pdf",
    developer: "/resumes/developer_resume.pdf",
  },

  /**
   * Social links. Order is preserved. Any entry with an empty href is
   * hidden automatically, so there are never dead "#" links on the page.
   */
  socials: [
    { key: "github", label: "GitHub", href: "https://github.com/LuvyaNishad" },
    { key: "x", label: "Twitter", href: "https://x.com" },
    { key: "instagram", label: "Instagram", href: "https://instagram.com" },
    { key: "linkedin", label: "LinkedIn", href: "https://linkedin.com" },
  ] as SocialLink[],

  /** GitHub username used by the live contribution heatmap. */
  githubUsername: "LuvyaNishad",

  /** Default SEO keywords. */
  keywords: [
    LEGAL_NAME,
    `${LEGAL_NAME} portfolio`,
    BRAND_NAME,
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
