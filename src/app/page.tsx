import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Tools } from "@/components/sections/Tools";

export default function Home() {
  return (
    <div style={{ background: "#0a0a0c" }}>
      {/* Grain film overlay */}
      <div className="grain-overlay" />

      {/* Navbar */}
      <Navbar />

      {/*
        ── HERO + INTRO SHARED WRAPPER ──────────────────────────
        The background image lives HERE — in the parent, not inside Hero.
        This means both Hero content AND the Intro card sit on top of it.
        The Intro card's backdrop-filter can now correctly blur the image
        that's physically rendered behind it in the stacking context.
      */}
      <div className="relative" style={{ background: "#0a0a0c" }}>

        {/* ── BACKGROUND IMAGE ──────────────────────────────────
          Covers from top of hero down to ~450px past 100vh.
          Has a gradient that fades opacity to 0 at the bottom.
          z-index: 0 — behind all section content.
        */}
        <div
          className="absolute top-0 left-0 right-0 overflow-hidden"
          style={{
            height: "calc(100vh + 450px)",
            zIndex: 0,
            maskImage: "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
          }}
          aria-hidden="true"
        >
          {/* The image itself */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero_intro1.jpg"
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "20% 50%", // Note: objectPosition Y% has no effect when container height matches image scaled height.
              // TWEAK THIS: Change translateY to shift the image vertically.
              // Negative values (e.g., -100px or -10%) shift the image UPWARDS, bringing the ruins higher on the screen.
              // Positive values shift it DOWNWARDS.
              transform: "translateY(-200px)",
              filter: "brightness(0.50) contrast(1.1) grayscale(0.22)",
            }}
          />

          {/* Left gradient — keeps hero text readable */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(105deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.50) 36%, rgba(0,0,0,0.12) 60%, transparent 80%)",
            }}
          />

          {/* Bottom fade is now handled by mask-image on the <img> above */}

          {/* Vignette around edges */}
          <div className="vignette" style={{ position: "absolute", inset: 0 }} />
        </div>

        {/* Hero content — z-index 1 so it sits above the bg image */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <Hero />
        </div>

        {/* Intro glass card — z-index 1, sits above bg image, backdrop-filter blurs it */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <Intro />
        </div>
      </div>

      {/* ── TOOLS SECTION ──────────────────────────── */}
      <div style={{ background: "#0a0a0c", position: "relative", zIndex: 1 }}>
        <Tools />
      </div>

      {/* Future sections on plain dark bg */}
      <div style={{ background: "#0a0a0c", position: "relative", zIndex: 1 }}>
        <div style={{ height: "16rem" }} />
      </div>
    </div>
  );
}