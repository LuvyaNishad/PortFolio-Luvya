/**
 * CinematicBackground
 * 
 * Fixed layer that sits behind ALL sections.
 * The hero image persists as you scroll, allowing the
 * Intro card (with backdrop-filter glass) to blur it naturally.
 * 
 * This is intentionally a Server Component (no "use client")
 * since it's purely CSS-driven with no interactivity.
 */

export function CinematicBackground() {
  return (
    <>
      {/*
        ── FIXED BACKGROUND IMAGE ─────────────────────────
        z-index: 0 — sits behind all page content.
        "fixed" means it stays put as user scrolls, so
        the intro card's glassmorphism blurs THIS image.
      */}
      <div
        className="fixed inset-0 overflow-hidden"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero_intro1.jpg"
          alt=""
          className="absolute inset-0 w-full h-full"
          style={{
            objectFit: "cover",
            objectPosition: "55% 42%",
            /* Zoom in — same scale as before */
            transform: "scale(1.15)",
            transformOrigin: "55% 42%",
            /* Cinematic grade: dark, desaturated, slight contrast boost */
            filter: "brightness(0.48) contrast(1.12) grayscale(0.22)",
          }}
        />

        {/* Left gradient — protects text readability in hero */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.46) 35%, rgba(0,0,0,0.12) 58%, transparent 80%)",
          }}
        />

        {/* Base dark tint overlay — keeps overall tone dark */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(8,8,10,0.28)" }}
        />

        {/* Vignette around edges */}
        <div className="vignette absolute inset-0" />
      </div>

      {/*
        ── PAGE BASE COLOR ────────────────────────────────
        Sits behind the fixed image (lower z-index).
        Ensures sections below the fold don't show white.
      */}
      <div
        className="fixed inset-0"
        style={{ zIndex: -1, background: "#0a0a0c" }}
        aria-hidden="true"
      />
    </>
  );
}
