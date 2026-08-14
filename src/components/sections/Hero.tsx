"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { LightBeamButton } from "@/components/ui/LightBeamButton";
import { TextScramble } from "@/components/ui/text-scramble";

/**
 * Hero — Centered cinematic layout with:
 *  - Symmetrical ruins background (rendered in page.tsx wrapper)
 *  - Floating monolith centerpiece with cursor-tracking perspective tilt
 *  - Specular glow that follows the cursor behind the monolith
 *  - Editorial typography: Bebas Neue (display) + Cormorant (serif italic)
 *  - Tactical HUD coordinate rings around the monolith
 *  - TextScramble decode entrance for all text elements
 */
export function Hero() {
  const [designingComplete, setDesigningComplete] = useState(false);
  const [subtitleComplete, setSubtitleComplete] = useState(false);
  const monolithRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  /* ── Cursor-tracking perspective tilt + specular glow ── */
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!monolithRef.current) return;
    const rect = monolithRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Tilt: map cursor position to ±8 degrees
    const maxTilt = 8;
    const dx = (e.clientX - centerX) / (window.innerWidth / 2);
    const dy = (e.clientY - centerY) / (window.innerHeight / 2);
    setTilt({
      x: Math.max(-maxTilt, Math.min(maxTilt, dy * -maxTilt)),
      y: Math.max(-maxTilt, Math.min(maxTilt, dx * maxTilt)),
    });

    // Glow: position as percentage relative to the monolith wrapper
    const glowX = ((e.clientX - rect.left) / rect.width) * 100;
    const glowY = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPos({ x: glowX, y: glowY });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <section
      id="home"
      className="relative w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* ── CENTERED CONTENT COLUMN ── */}
      <div
        className="relative flex flex-col items-center text-center w-full px-6"
        style={{ zIndex: 1, paddingTop: "clamp(7rem, 14vh, 10rem)" }}
      >
        {/* ── Role Badge ── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-3 mb-3 sm:mb-4"
        >
          <span className="w-1 h-1 rounded-full bg-[#c5a880]" />
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] text-white/50 uppercase">
            Product Designer
          </span>
          <span className="w-1 h-1 rounded-full bg-[#c5a880]" />
        </motion.div>

        {/* ── Main Headline ── */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display uppercase text-white leading-[0.92] mb-0"
          style={{
            fontSize: "clamp(3rem, 7.5vw, 7rem)",
            fontWeight: 400,
            letterSpacing: "0.02em",
          }}
        >
          <TextScramble
            as="span"
            duration={0.9}
            speed={0.04}
            characterSet="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            trigger={true}
            onScrambleComplete={() => setDesigningComplete(true)}
          >
            Designing
          </TextScramble>
        </motion.h1>

        {/* ── Serif Subtitle ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-3 sm:mb-4"
        >
          <span
            className="font-serif italic text-[#c5a880]/90"
            style={{
              fontSize: "clamp(1.6rem, 4vw, 3.8rem)",
              fontWeight: 400,
              letterSpacing: "0.01em",
            }}
          >
            <TextScramble
              as="span"
              className="font-serif italic"
              duration={1.0}
              speed={0.04}
              characterSet="abcdefghijklmnopqrstuvwxyz "
              trigger={designingComplete}
              onScrambleComplete={() => setSubtitleComplete(true)}
            >
              impactful experiences
            </TextScramble>
          </span>
        </motion.div>

        {/* ── Description ── */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.8, ease: "easeOut" }}
          className="font-mono text-[11px] sm:text-[12px] leading-[1.9] text-white/30 mb-4 sm:mb-5 max-w-[420px]"
        >
          <TextScramble
            as="span"
            duration={1.2}
            speed={0.03}
            characterSet="abcdefghijklmnopqrstuvwxyz,.- "
            trigger={subtitleComplete}
          >
            I craft digital products and experiences that are intentional, intuitive and built to make a difference.
          </TextScramble>
        </motion.p>

        {/* ── FLOATING MONOLITH ── */}
        <motion.div
          ref={monolithRef}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px] mb-4 sm:mb-6 select-none"
          style={{
            perspective: "1000px",
          }}
        >
          {/* Warm ambient glow — radiates upward toward text */}
          <div
            className="absolute pointer-events-none"
            style={{
              left: "-40%",
              right: "-40%",
              top: "-80%",
              bottom: "-20%",
              background: "radial-gradient(ellipse 60% 50% at 50% 70%, rgba(197, 148, 80, 0.18) 0%, rgba(197, 148, 80, 0.06) 35%, transparent 70%)",
              filter: "blur(30px)",
            }}
          />

          {/* Specular highlight — follows cursor for depth */}
          <div
            className="absolute inset-[-35%] rounded-full pointer-events-none transition-all duration-700 ease-out"
            style={{
              background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(197, 168, 128, 0.22) 0%, rgba(197, 148, 80, 0.08) 25%, transparent 55%)`,
              filter: "blur(16px)",
            }}
          />

          {/* HUD coordinate ring — slow spin */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-15%] rounded-full border border-white/[0.04] border-dashed pointer-events-none"
          />

          {/* HUD inner ring — reverse spin */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-5%] rounded-full border border-white/[0.06] pointer-events-none"
            style={{ borderStyle: "dotted" }}
          />

          {/* Monolith image with perspective tilt */}
          <motion.div
            className="w-full h-full relative"
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: "transform 0.15s ease-out",
            }}
          >
            <img
              src="/images/monolith.png"
              alt="Monolith"
              className="w-full h-full object-contain drop-shadow-[0_0_40px_rgba(197,168,128,0.12)]"
              draggable={false}
            />
          </motion.div>

          {/* Small crosshair at center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="w-4 h-[1px] bg-white/[0.08]" />
            <div className="w-[1px] h-4 bg-white/[0.08] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
        </motion.div>

        {/* ── Availability Badge ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="flex items-center gap-2.5 mb-6"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/70 animate-pulse" />
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-white/40 uppercase">
            Available for exciting projects
          </span>
        </motion.div>

        {/* ── CTA Buttons ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-4 items-center mb-12"
        >
          <LightBeamButton href="#showcase">
            VIEW MY WORK <span className="text-white/40 ml-1">→</span>
          </LightBeamButton>

          <a
            href="#contact"
            className="h-[46px] inline-flex items-center justify-center px-7 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 text-[10.5px] font-mono tracking-[0.2em] text-white/60 uppercase group"
          >
            GET IN TOUCH
            <span className="text-white/30 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
              ↗
            </span>
          </a>
        </motion.div>
      </div>

      {/* ── ROTATING SCROLL INDICATOR ── */}
      <div className="absolute bottom-8 left-6 sm:left-12 hidden md:flex items-center justify-center w-24 h-24 select-none pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          className="w-full h-full"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full text-white/20">
            <path
              id="heroCirclePath"
              d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
              fill="none"
            />
            <text className="font-mono text-[6.8px] tracking-[0.16em] fill-current">
              <textPath href="#heroCirclePath" startOffset="0%">
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
