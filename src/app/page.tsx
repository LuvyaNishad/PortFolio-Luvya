import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Tools } from "@/components/sections/Tools";
import { WorkLibrary } from "@/components/sections/WorkLibrary";
import { BuiltFromScratch } from "@/components/sections/BuiltFromScratch";
import { ContributionLog } from "@/components/sections/ContributionLog";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";

export default function Home() {
  return (
    <div style={{ background: "#0a0a0c" }}>
      {/* Custom animated cursor */}
      <CustomCursor />

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
          Symmetrical ruins backdrop — covers hero + extends into intro.
          Atmospheric cinematic grading: volumetric mist, atmospheric fog,
          and deep edge vignette with crisp architectural depth.
          z-index: 0 — behind all section content.
        */}
        <div
          className="absolute top-0 left-0 right-0 overflow-hidden"
          style={{
            height: "calc(100vh + 220px)",
            zIndex: 0,
            maskImage: "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
          }}
          aria-hidden="true"
        >
          {/* The symmetrical ruins image — high contrast, moody, textured */}
          <img
            src="/images/hero_bg.jpg"
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 26%",
              filter: "grayscale(100%) brightness(0.70) contrast(1.22)",
              opacity: 0.90,
              transform: "scale(1.03)",
              transformOrigin: "center center",
            }}
          />

          {/* Layer 1: Ground mist — soft volumetric haze across gate and rubble */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 55% 42% at 50% 64%, rgba(10,10,12,0.72) 0%, rgba(10,10,12,0.3) 50%, transparent 80%)",
            }}
          />

          {/* Layer 2: Atmospheric fog — natural horizontal depth haze band */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(10,10,12,0.35) 0%, transparent 18%, transparent 42%, rgba(10,10,12,0.18) 58%, rgba(10,10,12,0.62) 78%, rgba(10,10,12,0.96) 100%)",
            }}
          />

          {/* Layer 3: Cinematic organic vignette — deep moody corners & edge framing */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 80% 70% at 50% 42%, transparent 28%, rgba(10,10,12,0.45) 58%, rgba(10,10,12,0.85) 82%, rgba(10,10,12,1) 100%)",
            }}
          />

          {/* Layer 4: Localized typography scrim — clear contrast behind headline */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 60% 45% at 50% 26%, rgba(10,10,12,0.78) 0%, rgba(10,10,12,0.42) 48%, transparent 80%)",
            }}
          />

          {/* Layer 5: Top edge shadow — anchors header navigation */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(10,10,12,0.6) 0%, transparent 15%)",
            }}
          />
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
      <div className="portfolio-band portfolio-band--tools" style={{ position: "relative", zIndex: 1 }}>
        <Tools />
      </div>

      {/* Work Library */}
      <div className="portfolio-band portfolio-band--library" style={{ position: "relative", zIndex: 1 }}>
        <WorkLibrary />
      </div>

      {/* Built From Scratch Showcase */}
      <div className="portfolio-band portfolio-band--showcase" style={{ position: "relative", zIndex: 1 }}>
        <BuiltFromScratch />
      </div>

      {/* Merged Background Wrapper (Contribution + Contact) */}
      <div 
        className="portfolio-band portfolio-band--contact relative w-full"
        style={{
          background: "#0a0a0c url('/images/mergebg.png') no-repeat 50% 20% / cover",
          position: "relative",
          zIndex: 1
        }}
      >
        <ContributionLog />
        <Contact />
      </div>

      {/* ── FOOTER ──────────────────────────────────── */}
      <div style={{ background: "#0a0a0c", position: "relative", zIndex: 1 }}>
        <Footer />
      </div>
    </div>
  );
}
