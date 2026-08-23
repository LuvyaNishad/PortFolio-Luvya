import Link from "next/link";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

/**
 * 404 — "Signal Lost"
 *
 * Server-rendered on purpose: no client JS, no animation library, so a
 * mistyped URL costs a visitor almost nothing to load. The atmosphere
 * comes from static layers (grain, vignette, scanlines) that already
 * exist in globals.css, keeping this page in the same visual language as
 * the rest of the site without duplicating any of its systems.
 */
export const metadata: Metadata = {
  title: "Signal Lost — 404",
  description: "This record isn't in the archive.",
  robots: { index: false, follow: true },
};

/** Links offered as a way back. Section ids live on the home page. */
const RECOVERY_LINKS = [
  { label: "Return to base", href: "/" },
  { label: "Work library", href: "/#library" },
  { label: "Tools", href: "/#tools" },
  { label: "Contact", href: "/#contact" },
];

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0a0a0c] px-6 py-24">
      {/* Grain film overlay — same layer the home page uses */}
      <div className="grain-overlay" />

      {/* Atmospheric depth: red ember low-left, cold vignette all round */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 22% 88%, rgba(197,38,26,0.10), transparent 62%),
            radial-gradient(ellipse 60% 50% at 50% 40%, rgba(197,168,128,0.05), transparent 70%),
            radial-gradient(ellipse 90% 80% at 50% 50%, transparent 30%, rgba(10,10,12,0.75) 78%, #0a0a0c 100%)
          `,
        }}
        aria-hidden="true"
      />

      {/* Faint horizontal scanlines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,1) 3px, rgba(255,255,255,1) 4px)",
        }}
        aria-hidden="true"
      />

      {/* Tactical corner brackets */}
      <div className="pointer-events-none absolute left-6 top-6 hidden h-10 w-10 border-l-2 border-t-2 border-red/40 lg:block" />
      <div className="pointer-events-none absolute right-6 top-6 hidden h-10 w-10 border-r-2 border-t-2 border-white/10 lg:block" />
      <div className="pointer-events-none absolute bottom-6 left-6 hidden h-10 w-10 border-b-2 border-l-2 border-white/10 lg:block" />
      <div className="pointer-events-none absolute bottom-6 right-6 hidden h-10 w-10 border-b-2 border-r-2 border-red/40 lg:block" />

      {/* Oversized ghost numerals behind the content */}
      <div
        className="pointer-events-none absolute inset-0 flex select-none items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <span className="font-display text-[clamp(14rem,42vw,34rem)] leading-none text-white/[0.022]">
          404
        </span>
      </div>

      <div className="relative z-10 w-full max-w-[720px]">
        {/* Status strip */}
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-red" />
          <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-red">
            Error 404
          </span>
          <span className="h-3 w-px bg-white/15" />
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">
            {"// "}Archive lookup returned no record
          </span>
        </div>

        <h1 className="font-display text-[clamp(2.8rem,9vw,6rem)] uppercase leading-[0.9] tracking-[0.02em] text-white">
          Signal{" "}
          <span className="font-serif italic font-normal normal-case text-red/85">
            Lost
          </span>
        </h1>

        <div className="mt-5 h-[2px] w-16 bg-red" />

        <p className="mt-6 max-w-[460px] font-sans text-[14px] leading-[1.75] text-white/55">
          The page you tried to reach isn&apos;t part of this archive — it may
          have been moved, renamed, or never existed. Everything on record is
          reachable from the sections below.
        </p>

        {/* Recovery routes */}
        <nav className="mt-10 grid grid-cols-1 gap-px overflow-hidden border border-white/8 bg-white/[0.02] sm:grid-cols-2">
          {RECOVERY_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center justify-between gap-4 bg-[#0a0a0c]/60 px-5 py-4 transition-colors duration-300 hover:bg-red/[0.07]"
            >
              <span className="flex items-baseline gap-3">
                <span className="font-mono text-[10px] tracking-[0.18em] text-white/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/60 transition-colors duration-300 group-hover:text-white">
                  {link.label}
                </span>
              </span>
              <span className="font-mono text-[12px] text-white/20 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-red">
                →
              </span>
            </Link>
          ))}
        </nav>

        {/* Footer metadata bar */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/8 pt-5">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/22">
            {siteConfig.initials} {"//"} {siteConfig.name} Archive
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/22">
            Clearance verified · Record absent
          </span>
        </div>
      </div>
    </main>
  );
}
