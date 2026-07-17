"use client";

import { motion } from "framer-motion";
import { LightBeamButton } from "@/components/ui/LightBeamButton";

/**
 * Hero — Redesigned with the user's original text copy, formatted beautifully using
 * editorial typography, responsive layout structures, dual CTA buttons,
 * a massive background name watermark, and a rotating circular scroll indicator.
 */
export function Hero() {
  return (
    <section
      id="home"
      className="relative w-full overflow-hidden"
      style={{ minHeight: "clamp(700px, 86vh, 900px)", background: "transparent" }}
    >
      {/* ── MASSIVE BACKDROP WATERMARK ─────────────────────────────── */}
      <div
        className="absolute select-none pointer-events-none font-serif italic text-white/[0.015] sm:text-white/[0.02] uppercase leading-none hidden md:block"
        style={{
          fontSize: "clamp(8rem, 16vw, 16rem)",
          top: "clamp(8rem, 25vh, 18rem)",
          right: "2vw",
          zIndex: 0,
          letterSpacing: "-0.04em",
        }}
      >
        AURELIUS
      </div>

      <div
        className="flex flex-col justify-start w-full max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[55%] relative"
        style={{
          minHeight: "clamp(700px, 86vh, 900px)",
          paddingLeft: "clamp(1.5rem, 6vw, 6rem)",
          paddingTop: "clamp(6rem, 15vh, 9rem)",
          paddingBottom: "8rem",
          zIndex: 1,
        }}
      >
        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-2.5 mb-5 sm:mb-7"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-white/65 flex-shrink-0" />
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.26em] text-white/55 uppercase">
            Available for projects
          </span>
        </motion.div>

        {/* Headline — Serif + Sans-Serif Editorial Mix (Copying formatting from reference) */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display uppercase text-white mb-6 sm:mb-8 leading-[0.95] sm:leading-[0.90]"
          style={{
            fontSize: "clamp(2.4rem, 5.1vw, 5.25rem)",
            fontWeight: 400,
            letterSpacing: "0.01em",
          }}
        >
          <span className="font-sans">Designing</span>{" "}
          <span className="font-serif italic font-normal tracking-normal text-[#c5a880] normal-case pr-1">
            experiences.
          </span>
          <br />
          <span className="font-sans">Surviving</span>{" "}
          <span className="font-serif italic font-normal tracking-normal text-[#c5a880] normal-case">
            the details.
          </span>
        </motion.h1>

        {/* Structured vertical pillars using original subtitle themes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-3.5 mb-8 sm:mb-10 border-l border-[#c5a880]/30 pl-5 py-0.5"
        >
          <div className="flex items-center gap-4 text-[10px] sm:text-[11px] font-mono tracking-[0.18em] text-white/45">
            <span className="text-[#c5a880] font-medium">01</span>
            <span>UI/UX DESIGN</span>
          </div>
          <div className="flex items-center gap-4 text-[10px] sm:text-[11px] font-mono tracking-[0.18em] text-white/45">
            <span className="text-[#c5a880] font-medium">02</span>
            <span>USER-CENTERED EXPERIENCES</span>
          </div>
          <div className="flex items-center gap-4 text-[10px] sm:text-[11px] font-mono tracking-[0.18em] text-white/45">
            <span className="text-[#c5a880] font-medium">03</span>
            <span>PRECISION & PURPOSE</span>
          </div>
        </motion.div>

        {/* Subtitle — Exact original copy */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.72, duration: 0.8, ease: "easeOut" }}
          className="font-mono text-[12px] sm:text-[12.5px] leading-[1.8] sm:leading-[1.9] text-white/35 mb-8 sm:mb-10 max-w-[340px] sm:max-w-[420px]"
        >
          UI/UX Designer crafting immersive, user-centered experiences with precision and purpose.
        </motion.p>

        {/* CTA Button Block */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.7, ease: "easeOut" }}
          className="flex flex-wrap gap-4 items-center"
        >
          <LightBeamButton href="#about">
            VIEW MY WORK <span className="text-white/40 ml-1">→</span>
          </LightBeamButton>
          
          <a
            href="#contact"
            className="h-[46px] inline-flex items-center justify-center px-6 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 text-[10.5px] font-mono tracking-[0.2em] text-white/70 uppercase group"
          >
            GET IN TOUCH
            <span className="text-white/30 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">↗</span>
          </a>
        </motion.div>
      </div>

      {/* ── ROTATING SCROLL INDICATOR ────────────────────────────── */}
      <div className="absolute bottom-8 left-6 sm:left-12 hidden md:flex items-center justify-center w-24 h-24 select-none pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          className="w-full h-full"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full text-white/20">
            <path
              id="circlePath"
              d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
              fill="none"
            />
            <text className="font-mono text-[6.8px] tracking-[0.16em] fill-current">
              <textPath href="#circlePath" startOffset="0%">
                • SCROLL TO EXPLORE • SCROLL TO EXPLORE •
              </textPath>
            </text>
          </svg>
        </motion.div>
        <div className="absolute text-white/35 flex items-center justify-center">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-bounce"
            style={{ animationDuration: "2.5s" }}
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </div>
      </div>
    </section>
  );
}
