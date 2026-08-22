import type { SVGProps, ComponentType } from "react";
import type { SocialLink } from "@/config/site";

/* ── Brand icon components (inline SVG — no extra deps) ─────────── */

export function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 7.1C2.5 7.1 2.3 5 4.3 3c2.3-2.3 5.8-2.3 9.7-2.3S19.4.7 21.7 3c2 2 1.8 4.1 1.8 4.1s.2 1.7.2 3.4v3c0 1.7-.2 3.4-.2 3.4s.2 2.1-1.8 4.1c-2.3 2.3-6.2 2.3-9.7 2.3S6.6 23.3 4.3 21c-2-2-1.8-4.1-1.8-4.1s-.2-1.7-.2-3.4v-3c0-1.7.2-3.4.2-3.4z" />
      <path d="m9.5 15.5 7-3.5-7-3.5z" />
    </svg>
  );
}

/** Map a social link key to its icon component. */
export const SOCIAL_ICONS: Record<SocialLink["key"], ComponentType<SVGProps<SVGSVGElement>>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  x: XIcon,
  youtube: YoutubeIcon,
};
