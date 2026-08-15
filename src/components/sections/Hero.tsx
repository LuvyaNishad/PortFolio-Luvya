"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LightBeamButton } from "@/components/ui/LightBeamButton";
import { TextScramble } from "@/components/ui/text-scramble";

/* ── Debris Particle Data Definition (Scaled for larger monolith) ── */
interface DebrisParticle {
  id: number;
  angle: number; // Angle in degrees
  distance: number; // Distance in px from monolith center
  size: number; // Size in px
  opacity: number;
  floatSpeed: number;
  floatAmp: number;
  depth: number; // Depth factor for mouse parallax (0.3 to 1.2)
  shape: "shard" | "ember" | "rock";
  color: string;
}

const DEBRIS_CONFIG: DebrisParticle[] = [
  { id: 1, angle: 28, distance: 250, size: 7, opacity: 0.8, floatSpeed: 3.2, floatAmp: 8, depth: 0.9, shape: "shard", color: "#c5a880" },
  { id: 2, angle: 75, distance: 290, size: 5, opacity: 0.65, floatSpeed: 4.1, floatAmp: 10, depth: 0.5, shape: "ember", color: "#f0d4ab" },
  { id: 3, angle: 120, distance: 230, size: 8, opacity: 0.85, floatSpeed: 3.8, floatAmp: 7, depth: 1.1, shape: "rock", color: "#8a7862" },
  { id: 4, angle: 165, distance: 320, size: 4, opacity: 0.55, floatSpeed: 5.0, floatAmp: 11, depth: 0.4, shape: "ember", color: "#ffd59e" },
  { id: 5, angle: 205, distance: 260, size: 9, opacity: 0.75, floatSpeed: 3.5, floatAmp: 9, depth: 1.0, shape: "shard", color: "#c5a880" },
  { id: 6, angle: 250, distance: 300, size: 6, opacity: 0.7, floatSpeed: 4.4, floatAmp: 8, depth: 0.6, shape: "rock", color: "#706050" },
  { id: 7, angle: 290, distance: 240, size: 7, opacity: 0.9, floatSpeed: 3.1, floatAmp: 7, depth: 1.2, shape: "shard", color: "#e0b888" },
  { id: 8, angle: 335, distance: 310, size: 5, opacity: 0.6, floatSpeed: 4.8, floatAmp: 10, depth: 0.5, shape: "ember", color: "#ffe2ba" },
  { id: 9, angle: 10, distance: 345, size: 6, opacity: 0.65, floatSpeed: 3.9, floatAmp: 9, depth: 0.7, shape: "rock", color: "#9a8570" },
  { id: 10, angle: 185, distance: 350, size: 5, opacity: 0.55, floatSpeed: 4.6, floatAmp: 11, depth: 0.4, shape: "shard", color: "#c5a880" },
  { id: 11, angle: 100, distance: 255, size: 4, opacity: 0.75, floatSpeed: 3.6, floatAmp: 6, depth: 1.0, shape: "ember", color: "#ffe0b2" },
  { id: 12, angle: 275, distance: 330, size: 8, opacity: 0.7, floatSpeed: 4.2, floatAmp: 8, depth: 0.8, shape: "rock", color: "#8a7862" },
];

/**
 * Hero — Centered cinematic layout with:
 *  - High-impact Monolith centerpiece scaled up prominently
 *  - 3D perspective orbital rings lying flat on horizontal axis behind the monolith
 *  - Volumetric upward-beaming gold spotlight illuminating "Designing" and subtitle
 *  - Floating orbital space shards & embers with parallax depth
 *  - Cleaned layout (no client logos) with balanced vertical rhythm
 */
export function Hero() {
  /* ── Animation & Crash State ── */
  const [impactHappened, setImpactHappened] = useState(false);
  const [shake, setShake] = useState(false);
  const [shockwave, setShockwave] = useState(false);
  const [telemetryComplete, setTelemetryComplete] = useState(false);
  const [designingComplete, setDesigningComplete] = useState(false);
  const [subtitleComplete, setSubtitleComplete] = useState(false);

  const monolithRef = useRef<HTMLDivElement>(null);

  /* ── Initial Load & Crash Timeline Sequence ── */
  useEffect(() => {
    // Stage 1: Telemetry ticker / scanning phase (0ms - 700ms)
    const t1 = setTimeout(() => {
      setTelemetryComplete(true);
    }, 700);

    // Stage 2: Monolith drops from sky and slams into center at 1100ms
    const t2 = setTimeout(() => {
      setImpactHappened(true);
      setShake(true);
      setShockwave(true);
    }, 1100);

    // Stage 3: End camera shake after 350ms
    const t3 = setTimeout(() => {
      setShake(false);
    }, 1450);

    // Stage 4: Reset shockwave trigger
    const t4 = setTimeout(() => {
      setShockwave(false);
    }, 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  /* ── Performant cursor tracking via RAF & CSS variables (zero React re-renders) ── */
  useEffect(() => {
    let rect = monolithRef.current?.getBoundingClientRect();
    const updateRect = () => {
      if (monolithRef.current) {
        rect = monolithRef.current.getBoundingClientRect();
      }
    };
    window.addEventListener("resize", updateRect, { passive: true });
    window.addEventListener("scroll", updateRect, { passive: true });

    let rafId: number | null = null;
    let targetTiltX = 0;
    let targetTiltY = 0;
    let targetGlowX = 50;
    let targetGlowY = 50;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      if (!rect) rect = monolithRef.current?.getBoundingClientRect();
      if (!rect) return;
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const halfW = window.innerWidth / 2 || 1;
      const halfH = window.innerHeight / 2 || 1;
      const dx = (e.clientX - centerX) / halfW;
      const dy = (e.clientY - centerY) / halfH;

      const maxTilt = 7;
      targetTiltX = Math.max(-maxTilt, Math.min(maxTilt, dy * -maxTilt));
      targetTiltY = Math.max(-maxTilt, Math.min(maxTilt, dx * maxTilt));

      targetGlowX = ((e.clientX - rect.left) / (rect.width || 1)) * 100;
      targetGlowY = ((e.clientY - rect.top) / (rect.height || 1)) * 100;

      targetMouseX = dx * 18;
      targetMouseY = dy * 18;

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          if (monolithRef.current) {
            monolithRef.current.style.setProperty("--tilt-x", `${targetTiltX.toFixed(2)}deg`);
            monolithRef.current.style.setProperty("--tilt-y", `${targetTiltY.toFixed(2)}deg`);
            monolithRef.current.style.setProperty("--glow-x", `${targetGlowX.toFixed(2)}%`);
            monolithRef.current.style.setProperty("--glow-y", `${targetGlowY.toFixed(2)}%`);
            monolithRef.current.style.setProperty("--mouse-x", `${targetMouseX.toFixed(2)}px`);
            monolithRef.current.style.setProperty("--mouse-y", `${targetMouseY.toFixed(2)}px`);
          }
          rafId = null;
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <motion.section
      id="home"
      animate={{
        x: shake ? [-6, 6, -5, 5, -3, 3, -1, 1, 0] : 0,
        y: shake ? [5, -6, 4, -4, 2, -2, 1, 0] : 0,
      }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="relative w-full flex flex-col items-center justify-between overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* ── INTRO INITIALIZATION TELEMETRY OVERLAY ── */}
      <AnimatePresence>
        {!telemetryComplete && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm font-mono"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#c5a880] animate-ping" />
                <span className="text-[11px] tracking-[0.3em] text-[#c5a880] uppercase">
                  INITIALIZING MONOLITH CORE
                </span>
              </div>
              <span className="text-[9px] tracking-[0.2em] text-white/35">
                COORDINATES LOCKED: 28.6139° N, 77.2090° E // VECTOR READY
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CENTERED HERO CONTENT COLUMN ── */}
      <div
        className="relative flex flex-col items-center text-center w-full px-4 sm:px-6 flex-1 justify-center"
        style={{
          zIndex: 1,
          paddingTop: "clamp(4.5rem, 8.5vh, 6.5rem)",
          paddingBottom: "clamp(1.5rem, 3.5vh, 2.5rem)",
        }}
      >
        {/* ── VOLUMETRIC UPWARD GLOW SYSTEM (Behind Headline & Subtitle) ── */}
        <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-full max-w-[900px] h-[520px] pointer-events-none -z-10 overflow-visible">
          {/* Layer 1: Wide ambient gold backlight across headline band */}
          <div
            className="absolute inset-0 transition-opacity duration-1000"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 65%, rgba(220, 165, 85, 0.16) 0%, rgba(185, 125, 50, 0.08) 40%, rgba(140, 90, 25, 0.02) 70%, transparent 90%)",
              filter: "blur(40px)",
              opacity: impactHappened ? 1 : 0,
            }}
          />

          {/* Layer 2: Focused upward beam fanning from the monolith apex */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[480px] h-[400px] transition-opacity duration-1000"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(255, 205, 130, 0.24) 0%, rgba(215, 150, 65, 0.12) 40%, rgba(160, 100, 30, 0.03) 70%, transparent 90%)",
              filter: "blur(32px)",
              opacity: impactHappened ? 1 : 0,
            }}
          />

          {/* Layer 3: High-brightness apex flare right at the top rim of the rock */}
          <div
            className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[240px] h-[160px] transition-opacity duration-1000"
            style={{
              background:
                "radial-gradient(circle at 50% 80%, rgba(255, 235, 180, 0.40) 0%, rgba(230, 170, 80, 0.22) 35%, rgba(180, 120, 40, 0.05) 65%, transparent 80%)",
              filter: "blur(18px)",
              opacity: impactHappened ? 1 : 0,
            }}
          />
        </div>

        {/* ── Role Badge (Always visible with clear navbar offset) ── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: impactHappened ? 1 : 0, y: impactHappened ? 0 : -12 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2.5"
        >
          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#c5a880]/90 shadow-[0_0_8px_rgba(197,168,128,0.6)]" />
          <span className="font-mono text-[8px] sm:text-[9.5px] md:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] text-[#c5a880]/90 uppercase font-medium">
            Product Designer &amp; Technologist
          </span>
          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#c5a880]/90 shadow-[0_0_8px_rgba(197,168,128,0.6)]" />
        </motion.div>

        {/* ── LEVEL 1 & LEVEL 2: Typographic Headline Lockup ── */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: impactHappened ? 1 : 0, y: impactHappened ? 0 : 20 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center text-center select-none mb-2 sm:mb-4 relative z-20"
        >
          {/* Level 1 (Top Line): Primary Headline */}
          <span
            className="font-display uppercase text-white tracking-[0.03em] leading-[0.88] drop-shadow-[0_4px_28px_rgba(0,0,0,0.9)]"
            style={{
              fontSize: "clamp(3rem, 8.5vw, 8.2rem)",
              fontWeight: 400,
              textShadow: "0 0 45px rgba(220,165,85,0.22)",
            }}
          >
            <TextScramble
              as="span"
              duration={0.7}
              speed={0.03}
              characterSet="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
              trigger={impactHappened}
              onScrambleComplete={() => setDesigningComplete(true)}
            >
              TURNING
            </TextScramble>
          </span>

          {/* Level 2: Editorial Serif Italic Accent (50% scale of Level 1) */}
          <span
            className="font-serif italic font-normal tracking-[0.01em] text-[#e5be8a] my-[-0.15em] sm:my-[-0.18em] z-10 select-none drop-shadow-[0_2px_18px_rgba(0,0,0,0.8)]"
            style={{
              fontSize: "clamp(1.8rem, 4.2vw, 4.2rem)",
              lineHeight: 1.1,
              textShadow: "0 0 35px rgba(229,190,138,0.35)",
            }}
          >
            <TextScramble
              as="span"
              className="font-serif italic"
              duration={0.8}
              speed={0.03}
              characterSet="abcdefghijklmnopqrstuvwxyz"
              trigger={designingComplete}
            >
              complexity
            </TextScramble>
          </span>

          {/* Level 1 (Bottom Line): Primary Headline */}
          <span
            className="font-display uppercase text-white tracking-[0.03em] leading-[0.88] drop-shadow-[0_4px_28px_rgba(0,0,0,0.9)]"
            style={{
              fontSize: "clamp(3rem, 8.5vw, 8.2rem)",
              fontWeight: 400,
              textShadow: "0 0 45px rgba(220,165,85,0.22)",
            }}
          >
            <TextScramble
              as="span"
              duration={0.8}
              speed={0.03}
              characterSet="ABCDEFGHIJKLMNOPQRSTUVWXYZ."
              trigger={designingComplete}
              onScrambleComplete={() => setSubtitleComplete(true)}
            >
              INTO CLARITY.
            </TextScramble>
          </span>
        </motion.h1>

        {/* ── LEVEL 3: Supporting Description (Clean neutral sans-serif, high contrast) ── */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: impactHappened ? 1 : 0, y: impactHappened ? 0 : 12 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="font-sans text-[13px] sm:text-[15px] md:text-[18px] leading-[1.55] sm:leading-[1.6] text-white/80 font-normal mb-3 sm:mb-5 max-w-[92vw] sm:max-w-[650px] px-2 relative z-20"
          style={{
            textShadow: "0 2px 14px rgba(0,0,0,0.9)",
          }}
        >
          <TextScramble
            as="span"
            duration={0.9}
            speed={0.02}
            characterSet="abcdefghijklmnopqrstuvwxyz,.- "
            trigger={subtitleComplete}
          >
            I design and build digital experiences where clarity, technology and visual storytelling meet.
          </TextScramble>
        </motion.p>

        {/* ── FLOATING MONOLITH + 3D ORBIT RINGS + DEBRIS (HEROIC SCALE, RESPONSIVE) ── */}
        <div
          ref={monolithRef}
          className="relative w-[20vh] h-[20vh] min-w-[150px] min-h-[150px] max-w-[220px] max-h-[220px] sm:w-[25vh] sm:h-[25vh] sm:min-w-[190px] sm:min-h-[190px] sm:max-w-[280px] sm:max-h-[280px] md:w-[28vh] md:h-[28vh] md:max-w-[340px] md:max-h-[340px] lg:w-[32vh] lg:h-[32vh] lg:max-w-[380px] lg:max-h-[380px] my-0 sm:my-0.5 select-none flex items-center justify-center"
          style={{
            perspective: "1100px",
            transformStyle: "preserve-3d",
          }}
        >
          {/* ── Expanding Shockwave Ring on Impact ── */}
          <AnimatePresence>
            {shockwave && (
              <>
                <motion.div
                  initial={{ scale: 0.2, opacity: 0.95 }}
                  animate={{ scale: 3.5, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: [0.15, 0.9, 0.2, 1] }}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "2px solid rgba(225, 185, 120, 0.75)",
                    boxShadow: "0 0 50px rgba(225, 175, 100, 0.5)",
                    zIndex: 2,
                  }}
                />
                <motion.div
                  initial={{ scale: 0.1, opacity: 1 }}
                  animate={{ scale: 4.8, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.1, ease: [0.1, 0.8, 0.2, 1], delay: 0.05 }}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "1px solid rgba(255, 255, 255, 0.4)",
                    zIndex: 2,
                  }}
                />
              </>
            )}
          </AnimatePresence>

          {/* ── Specular highlight behind monolith — follows cursor ── */}
          <div
            className="absolute inset-[-25%] rounded-full pointer-events-none transition-opacity duration-700 ease-out"
            style={{
              background: "radial-gradient(circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(225, 180, 110, 0.28) 0%, rgba(197, 148, 80, 0.10) 25%, transparent 60%)",
              filter: "blur(20px)",
              opacity: impactHappened ? 1 : 0,
              zIndex: 1,
            }}
          />

          {/* ── 3D PERSPECTIVE ORBIT RINGS (Split Front & Back) ── */}
          {/* BACK RINGS (Behind Monolith) */}
          <motion.div
            initial={{ scale: 0.6, rotateX: 0 }}
            animate={
              impactHappened
                ? { scale: 1, rotateX: [0, 40, 76] }
                : { scale: 0.6, rotateX: 0 }
            }
            transition={{
              scale: { duration: 1.1, delay: 0.15, ease: "easeOut" },
              rotateX: { duration: 1.8, delay: 0.15, ease: "easeOut" },
            }}
            className="absolute pointer-events-none flex items-center justify-center"
            style={{
              width: "160%",
              height: "160%",
              zIndex: 2, // Behind monolith
              clipPath: "inset(0 0 50% 0)", // Keep top half
            }}
          >
            <motion.div
              initial={{ opacity: 0, rotateZ: 0 }}
              animate={
                impactHappened
                  ? { opacity: 1, rotateZ: [0, 360, 720] }
                  : { opacity: 0, rotateZ: 0 }
              }
              transition={{
                opacity: { duration: 0.6, delay: 0.15 },
                rotateZ: { duration: 2.2, delay: 0.15, ease: "easeOut" },
              }}
              className="w-full h-full relative flex items-center justify-center"
            >
              <motion.div
                animate={{ rotateZ: 360 }}
                transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-white/[0.09] border-dashed"
              />
              <motion.div
                animate={{ rotateZ: -360 }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[12%] rounded-full border border-[#c5a880]/20"
                style={{
                  boxShadow: "0 0 35px rgba(197, 168, 128, 0.12), inset 0 0 20px rgba(197, 168, 128, 0.06)",
                }}
              />
              <div className="absolute inset-[24%] rounded-full border border-white/[0.07]" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-[#c5a880]/60 rounded-full" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-[#c5a880]/60 rounded-full" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 w-3 bg-[#c5a880]/60 rounded-full" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 h-1.5 w-3 bg-[#c5a880]/60 rounded-full" />
            </motion.div>
          </motion.div>

          {/* FRONT RINGS (In Front of Monolith) */}
          <motion.div
            initial={{ scale: 0.6, rotateX: 0 }}
            animate={
              impactHappened
                ? { scale: 1, rotateX: [0, 40, 76] }
                : { scale: 0.6, rotateX: 0 }
            }
            transition={{
              scale: { duration: 1.1, delay: 0.15, ease: "easeOut" },
              rotateX: { duration: 1.8, delay: 0.15, ease: "easeOut" },
            }}
            className="absolute pointer-events-none flex items-center justify-center"
            style={{
              width: "160%",
              height: "160%",
              zIndex: 20, // In front of monolith
              clipPath: "inset(50% 0 0 0)", // Keep bottom half
            }}
          >
            <motion.div
              initial={{ opacity: 0, rotateZ: 0 }}
              animate={
                impactHappened
                  ? { opacity: 1, rotateZ: [0, 360, 720] }
                  : { opacity: 0, rotateZ: 0 }
              }
              transition={{
                opacity: { duration: 0.6, delay: 0.15 },
                rotateZ: { duration: 2.2, delay: 0.15, ease: "easeOut" },
              }}
              className="w-full h-full relative flex items-center justify-center"
            >
              <motion.div
                animate={{ rotateZ: 360 }}
                transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-white/[0.09] border-dashed"
              />
              <motion.div
                animate={{ rotateZ: -360 }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[12%] rounded-full border border-[#c5a880]/20"
                style={{
                  boxShadow: "0 0 35px rgba(197, 168, 128, 0.12), inset 0 0 20px rgba(197, 168, 128, 0.06)",
                }}
              />
              <div className="absolute inset-[24%] rounded-full border border-white/[0.07]" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-[#c5a880]/60 rounded-full" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-[#c5a880]/60 rounded-full" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 w-3 bg-[#c5a880]/60 rounded-full" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 h-1.5 w-3 bg-[#c5a880]/60 rounded-full" />
            </motion.div>
          </motion.div>

          {/* ── FLOATING ORBITAL DEBRIS PARTICLES (3D Distribution) ── */}
          {DEBRIS_CONFIG.map((p) => {
            const rad = (p.angle * Math.PI) / 180;
            const targetX = Math.cos(rad) * p.distance;
            // Flatten the vertical Y distribution slightly to match the 3D perspective angle
            const targetY = Math.sin(rad) * (p.distance * 0.65);

            return (
              <motion.div
                key={p.id}
                initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                animate={
                  impactHappened
                    ? {
                        x: [targetX, targetX + 5, targetX - 4, targetX],
                        y: [
                          targetY,
                          targetY - p.floatAmp,
                          targetY + p.floatAmp,
                          targetY,
                        ],
                        scale: 1,
                        opacity: p.opacity,
                      }
                    : { x: 0, y: 0, scale: 0, opacity: 0 }
                }
                transition={
                  impactHappened
                    ? {
                        scale: { duration: 0.6, ease: "easeOut" },
                        x: {
                          duration: p.floatSpeed * 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                        y: {
                          duration: p.floatSpeed,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                      }
                    : {}
                }
                className="absolute pointer-events-none"
                style={{
                  transform: `translate3d(calc(var(--mouse-x, 0px) * ${p.depth}), calc(var(--mouse-y, 0px) * ${p.depth}), 0px)`,
                  transition: "transform 0.15s ease-out",
                  zIndex: p.depth > 0.8 ? 15 : 2, // Foreground shards in front of rock, background behind
                }}
              >
                {p.shape === "shard" ? (
                  <div
                    style={{
                      width: `${p.size}px`,
                      height: `${p.size * 1.35}px`,
                      background: `linear-gradient(135deg, ${p.color} 0%, rgba(25,25,30,0.95) 100%)`,
                      clipPath: "polygon(50% 0%, 100% 70%, 75% 100%, 25% 100%, 0% 60%)",
                      boxShadow: `0 0 8px ${p.color}50`,
                      transform: `rotate(${p.angle * 2}deg)`,
                    }}
                  />
                ) : p.shape === "ember" ? (
                  <div
                    style={{
                      width: `${p.size}px`,
                      height: `${p.size}px`,
                      borderRadius: "50%",
                      background: p.color,
                      boxShadow: `0 0 ${p.size * 2}px ${p.color}, 0 0 ${p.size * 5}px ${p.color}70`,
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: `${p.size}px`,
                      height: `${p.size}px`,
                      background: `linear-gradient(45deg, #151518 0%, ${p.color} 100%)`,
                      clipPath: "polygon(30% 0%, 70% 10%, 100% 50%, 80% 90%, 20% 100%, 0% 60%)",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.8)",
                      transform: `rotate(${p.angle}deg)`,
                    }}
                  />
                )}
              </motion.div>
            );
          })}

          {/* ── THE MONOLITH (Dominant & Centered) ── */}
          <motion.div
            initial={{ scale: 3.2, y: -180 }}
            animate={
              impactHappened
                ? { scale: 1, y: 0 }
                : { scale: [3.2, 2.9, 3.2], y: -180 }
            }
            transition={
              impactHappened
                ? { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
                : { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
            }
            className="w-full h-full relative flex items-center justify-center"
            style={{
              transform: "rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))",
              transition: "transform 0.15s ease-out",
              zIndex: 10, // Back to explicit zIndex so it sits between Back(2) and Front(20) Rings
            }}
          >
            {/* Inner wrapper for opacity and filter to prevent breaking parent 3D context */}
            <motion.div
              initial={{ opacity: 0, filter: "blur(12px) brightness(1.6)" }}
              animate={
                impactHappened
                  ? { opacity: 1, filter: "blur(0px) brightness(1)" }
                  : { opacity: [0.7, 0.9, 0.7], filter: "blur(8px) brightness(1.8)" }
              }
              transition={
                impactHappened
                  ? { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
                  : { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
              }
              className="w-full h-full relative flex items-center justify-center"
            >
              {/* Ambient continuous vertical drift after landing */}
              <motion.div
                animate={impactHappened ? { y: [0, -9, 0] } : {}}
                transition={{
                  duration: 5.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-full h-full relative flex items-center justify-center"
              >
                <img
                  src="/images/monolith.png"
                  alt="Monolith Centerpiece"
                  className="w-[90%] h-[90%] object-contain drop-shadow-[0_0_55px_rgba(215,165,100,0.22)]"
                  draggable={false}
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Centered HUD crosshair */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-30" style={{ zIndex: 12 }}>
            <div className="w-4 h-[1px] bg-white/[0.2]" />
            <div className="w-[1px] h-4 bg-white/[0.2] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* ── Availability Badge ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: impactHappened ? 1 : 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex items-center gap-2 mb-3 sm:mb-4"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
          <span className="font-mono text-[8.5px] sm:text-[9.5px] md:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] text-white/45 uppercase">
            Available for exciting projects
          </span>
        </motion.div>

        {/* ── CTA Buttons (Responsive layout) ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: impactHappened ? 1 : 0, y: impactHappened ? 0 : 14 }}
          transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
          className="flex flex-row items-center justify-center gap-2.5 sm:gap-4 w-full px-2"
        >
          <LightBeamButton href="#built-from-scratch" className="text-[9.5px] sm:text-[11px] px-5 sm:px-7 py-2.5 sm:py-3 tracking-[0.16em] sm:tracking-[0.2em]">
            VIEW MY WORK <span className="text-white/40 ml-1">→</span>
          </LightBeamButton>

          <a
            href="#contact"
            className="h-[40px] sm:h-[46px] inline-flex items-center justify-center px-4 sm:px-7 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 text-[9.5px] sm:text-[10.5px] font-mono tracking-[0.16em] sm:tracking-[0.2em] text-white/60 uppercase group"
          >
            GET IN TOUCH
            <span className="text-white/30 ml-1.5 sm:ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
              ↗
            </span>
          </a>
        </motion.div>
      </div>

      {/* ── BOTTOM CORNER HUD ELEMENTS ── */}
      {/* Bottom-left: Rotating scroll indicator (Desktop only) */}
      <div className="absolute bottom-6 left-6 sm:left-10 hidden md:flex items-center justify-center w-20 h-20 select-none pointer-events-none">
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
            width="13"
            height="13"
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
    </motion.section>
  );
}
