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
          Centered, slightly blurred for depth-of-field effect.
          z-index: 0 — behind all section content.
        */}
        <div
          className="absolute top-0 left-0 right-0 overflow-hidden"
          style={{
            height: "calc(100vh + 220px)",
            zIndex: 0,
            maskImage: "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
          }}
          aria-hidden="true"
        >
          {/* The symmetrical ruins image */}
          <img
            src="/images/hero_bg.jpg"
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 25%",
              filter: "grayscale(100%) brightness(0.55) contrast(1.12) blur(1px)",
              opacity: 0.82,
              transform: "scale(1.04)",
              transformOrigin: "center center",
            }}
          />

          {/* Layer 1: Soft center-bottom mist — fades the gate but keeps ruins visible on sides */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 45% 40% at 50% 62%, rgba(10,10,12,0.82) 0%, rgba(10,10,12,0.35) 50%, transparent 80%)",
            }}
          />

          {/* Layer 2: Atmospheric fog — natural horizontal haze band */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(10,10,12,0.3) 0%, transparent 15%, transparent 40%, rgba(10,10,12,0.15) 55%, rgba(10,10,12,0.6) 75%, rgba(10,10,12,0.95) 100%)",
            }}
          />

          {/* Layer 3: Organic edge vignette — heavier at corners, softer at sides */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 80% 70% at 50% 40%, transparent 25%, rgba(10,10,12,0.4) 55%, rgba(10,10,12,0.85) 80%, rgba(10,10,12,1) 100%)",
            }}
          />

          {/* Layer 4: Top edge shadow — prevents header from floating */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(10,10,12,0.5) 0%, transparent 12%)",
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
