"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LightBeamButton } from "@/components/ui/LightBeamButton";
import { TextScramble } from "@/components/ui/text-scramble";

/* ── Debris Particle Data Definition ── */
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
  { id: 1, angle: 35, distance: 165, size: 6, opacity: 0.75, floatSpeed: 3.2, floatAmp: 6, depth: 0.8, shape: "shard", color: "#c5a880" },
  { id: 2, angle: 80, distance: 195, size: 4, opacity: 0.6, floatSpeed: 4.1, floatAmp: 8, depth: 0.5, shape: "ember", color: "#e8c99b" },
  { id: 3, angle: 125, distance: 150, size: 7, opacity: 0.8, floatSpeed: 3.8, floatAmp: 5, depth: 1.1, shape: "rock", color: "#8a7862" },
  { id: 4, angle: 160, distance: 220, size: 3, opacity: 0.5, floatSpeed: 5.0, floatAmp: 9, depth: 0.4, shape: "ember", color: "#ffd59e" },
  { id: 5, angle: 210, distance: 175, size: 8, opacity: 0.7, floatSpeed: 3.5, floatAmp: 7, depth: 0.9, shape: "shard", color: "#c5a880" },
  { id: 6, angle: 255, distance: 200, size: 5, opacity: 0.65, floatSpeed: 4.4, floatAmp: 6, depth: 0.6, shape: "rock", color: "#706050" },
  { id: 7, angle: 295, distance: 160, size: 6, opacity: 0.85, floatSpeed: 3.1, floatAmp: 5, depth: 1.2, shape: "shard", color: "#e0b888" },
  { id: 8, angle: 330, distance: 210, size: 4, opacity: 0.55, floatSpeed: 4.8, floatAmp: 8, depth: 0.5, shape: "ember", color: "#ffd59e" },
  { id: 9, angle: 15, distance: 235, size: 5, opacity: 0.6, floatSpeed: 3.9, floatAmp: 7, depth: 0.7, shape: "rock", color: "#9a8570" },
  { id: 10, angle: 190, distance: 240, size: 4, opacity: 0.5, floatSpeed: 4.6, floatAmp: 9, depth: 0.4, shape: "shard", color: "#c5a880" },
  { id: 11, angle: 105, distance: 170, size: 3, opacity: 0.7, floatSpeed: 3.6, floatAmp: 4, depth: 1.0, shape: "ember", color: "#ffe0b2" },
  { id: 12, angle: 280, distance: 225, size: 7, opacity: 0.65, floatSpeed: 4.2, floatAmp: 6, depth: 0.8, shape: "rock", color: "#8a7862" },
];

/**
 * Hero — Centered cinematic layout with:
 *  - Monolith Loading Screen / Hyper-descent Impact Crash sequence
 *  - Camera shake, expanding shockwave ring, and explosion debris burst
 *  - 3D perspective orbit ring on ground plane
 *  - Floating orbital stone & ember particles with mouse parallax
 *  - Specular glow tracking cursor and illuminating upper text
 *  - Bebas Neue + Cormorant Italic typography with TextScramble
 *  - Trusted By & Collaborated With client logos bar
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
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

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

  /* ── Cursor tracking for 3D tilt, specular glow & particle parallax ── */
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!monolithRef.current) return;
    const rect = monolithRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = (e.clientX - centerX) / (window.innerWidth / 2);
    const dy = (e.clientY - centerY) / (window.innerHeight / 2);

    const maxTilt = 8;
    setTilt({
      x: Math.max(-maxTilt, Math.min(maxTilt, dy * -maxTilt)),
      y: Math.max(-maxTilt, Math.min(maxTilt, dx * maxTilt)),
    });

    const glowX = ((e.clientX - rect.left) / rect.width) * 100;
    const glowY = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPos({ x: glowX, y: glowY });

    setMouseOffset({ x: dx * 15, y: dy * 15 });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

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
        className="relative flex flex-col items-center text-center w-full px-6 flex-1 justify-center"
        style={{ zIndex: 1, paddingTop: "clamp(6.5rem, 13vh, 9rem)" }}
      >
        {/* ── Role Badge ── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: impactHappened ? 1 : 0, y: impactHappened ? 0 : -12 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
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
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: impactHappened ? 1 : 0, y: impactHappened ? 0 : 25 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display uppercase text-white leading-[0.92] mb-0"
          style={{
            fontSize: "clamp(3rem, 7.5vw, 7rem)",
            fontWeight: 400,
            letterSpacing: "0.02em",
          }}
        >
          <TextScramble
            as="span"
            duration={0.8}
            speed={0.03}
            characterSet="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            trigger={impactHappened}
            onScrambleComplete={() => setDesigningComplete(true)}
          >
            Designing
          </TextScramble>
        </motion.h1>

        {/* ── Serif Subtitle with Bracket Details ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: impactHappened ? 1 : 0, y: impactHappened ? 0 : 15 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-3 sm:mb-4 flex items-center justify-center gap-2"
        >
          <span className="font-serif text-[#c5a880]/40 text-[clamp(1.4rem,3.5vw,3.2rem)] font-light">
            {"{"}
          </span>
          <span
            className="font-serif italic text-[#c5a880]/95"
            style={{
              fontSize: "clamp(1.6rem, 4vw, 3.8rem)",
              fontWeight: 400,
              letterSpacing: "0.01em",
            }}
          >
            <TextScramble
              as="span"
              className="font-serif italic"
              duration={0.9}
              speed={0.03}
              characterSet="abcdefghijklmnopqrstuvwxyz "
              trigger={designingComplete}
              onScrambleComplete={() => setSubtitleComplete(true)}
            >
              impactful experiences
            </TextScramble>
          </span>
          <span className="font-serif text-[#c5a880]/40 text-[clamp(1.4rem,3.5vw,3.2rem)] font-light">
            {"}"}
          </span>
        </motion.div>

        {/* ── Description ── */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: impactHappened ? 1 : 0, y: impactHappened ? 0 : 12 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="font-mono text-[11px] sm:text-[12px] leading-[1.9] text-white/35 mb-4 sm:mb-5 max-w-[440px]"
        >
          <TextScramble
            as="span"
            duration={1.0}
            speed={0.025}
            characterSet="abcdefghijklmnopqrstuvwxyz,.- "
            trigger={subtitleComplete}
          >
            I craft digital products and experiences that are intentional, intuitive and built to make a difference.
          </TextScramble>
        </motion.p>

        {/* ── FLOATING MONOLITH + CRASH SYSTEM + DEBRIS + 3D ORBIT ── */}
        <div
          ref={monolithRef}
          className="relative w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px] mb-3 sm:mb-5 select-none flex items-center justify-center"
          style={{
            perspective: "1000px",
          }}
        >
          {/* ── Expanding Shockwave Ring on Impact ── */}
          <AnimatePresence>
            {shockwave && (
              <>
                <motion.div
                  initial={{ scale: 0.2, opacity: 0.95 }}
                  animate={{ scale: 3.2, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: [0.15, 0.9, 0.2, 1] }}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "2px solid rgba(225, 185, 120, 0.75)",
                    boxShadow: "0 0 45px rgba(225, 175, 100, 0.45)",
                  }}
                />
                <motion.div
                  initial={{ scale: 0.1, opacity: 1 }}
                  animate={{ scale: 4.5, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.1, ease: [0.1, 0.8, 0.2, 1], delay: 0.05 }}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "1px solid rgba(255, 255, 255, 0.4)",
                  }}
                />
              </>
            )}
          </AnimatePresence>

          {/* ── Warm ambient glow — illuminates upward toward text ── */}
          <div
            className="absolute pointer-events-none transition-opacity duration-1000"
            style={{
              left: "-40%",
              right: "-40%",
              top: "-80%",
              bottom: "-20%",
              background:
                "radial-gradient(ellipse 60% 50% at 50% 70%, rgba(197, 148, 80, 0.20) 0%, rgba(197, 148, 80, 0.06) 35%, transparent 70%)",
              filter: "blur(30px)",
              opacity: impactHappened ? 1 : 0,
            }}
          />

          {/* ── Specular highlight — follows cursor for depth ── */}
          <div
            className="absolute inset-[-35%] rounded-full pointer-events-none transition-all duration-700 ease-out"
            style={{
              background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(197, 168, 128, 0.25) 0%, rgba(197, 148, 80, 0.08) 25%, transparent 55%)`,
              filter: "blur(16px)",
              opacity: impactHappened ? 1 : 0,
            }}
          />

          {/* ── 3D PERSPECTIVE ORBIT RING (Ground / Orbital Plane) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: impactHappened ? 1 : 0, scale: impactHappened ? 1 : 0.5 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="absolute pointer-events-none"
            style={{
              width: "140%",
              height: "140%",
              transform: "perspective(700px) rotateX(68deg)",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Outer dotted orbital ellipse */}
            <motion.div
              animate={{ rotateZ: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="w-full h-full rounded-full border border-white/[0.08] border-dashed"
            />
            {/* Inner glowing accent orbital ring */}
            <motion.div
              animate={{ rotateZ: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[15%] rounded-full border border-[#c5a880]/15"
              style={{
                boxShadow: "0 0 25px rgba(197, 168, 128, 0.08)",
              }}
            />
            {/* Cardinal coordinate ticks */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-2 bg-[#c5a880]/50" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-2 bg-[#c5a880]/50" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 w-2 bg-[#c5a880]/50" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 h-1 w-2 bg-[#c5a880]/50" />
          </motion.div>

          {/* ── FLOATING ORBITAL DEBRIS PARTICLES ── */}
          {DEBRIS_CONFIG.map((p) => {
            // Calculate rest polar coordinates
            const rad = (p.angle * Math.PI) / 180;
            const targetX = Math.cos(rad) * p.distance;
            const targetY = Math.sin(rad) * p.distance;

            return (
              <motion.div
                key={p.id}
                initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                animate={
                  impactHappened
                    ? {
                        x: [targetX, targetX + 4, targetX - 3, targetX],
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
                  transform: `translate3d(${mouseOffset.x * p.depth}px, ${
                    mouseOffset.y * p.depth
                  }px, 0px)`,
                  transition: "transform 0.15s ease-out",
                  zIndex: p.depth > 0.8 ? 5 : 0,
                }}
              >
                {p.shape === "shard" ? (
                  <div
                    style={{
                      width: `${p.size}px`,
                      height: `${p.size * 1.3}px`,
                      background: `linear-gradient(135deg, ${p.color} 0%, rgba(30,30,35,0.9) 100%)`,
                      clipPath: "polygon(50% 0%, 100% 70%, 75% 100%, 25% 100%, 0% 60%)",
                      boxShadow: `0 0 6px ${p.color}40`,
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
                      boxShadow: `0 0 ${p.size * 2}px ${p.color}, 0 0 ${p.size * 4}px ${p.color}60`,
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: `${p.size}px`,
                      height: `${p.size}px`,
                      background: `linear-gradient(45deg, #18181c 0%, ${p.color} 100%)`,
                      clipPath: "polygon(30% 0%, 70% 10%, 100% 50%, 80% 90%, 20% 100%, 0% 60%)",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.6)",
                      transform: `rotate(${p.angle}deg)`,
                    }}
                  />
                )}
              </motion.div>
            );
          })}

          {/* ── THE MONOLITH (Initial High-Scale Descent to Slam) ── */}
          <motion.div
            initial={{
              scale: 3.2,
              y: -180,
              opacity: 0,
              filter: "blur(12px) brightness(1.6)",
            }}
            animate={
              impactHappened
                ? {
                    scale: 1,
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px) brightness(1)",
                  }
                : {
                    scale: [3.2, 2.9, 3.2],
                    y: -180,
                    opacity: [0.7, 0.9, 0.7],
                    filter: "blur(8px) brightness(1.8)",
                  }
            }
            transition={
              impactHappened
                ? {
                    duration: 0.65,
                    ease: [0.16, 1, 0.3, 1], // Heavy kinetic slam with spring-like landing
                  }
                : {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
            className="w-full h-full relative flex items-center justify-center"
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: "transform 0.15s ease-out",
            }}
          >
            {/* Ambient continuous vertical drift after landing */}
            <motion.div
              animate={impactHappened ? { y: [0, -8, 0] } : {}}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-full h-full relative flex items-center justify-center"
            >
              <img
                src="/images/monolith.png"
                alt="Monolith Centerpiece"
                className="w-full h-full object-contain drop-shadow-[0_0_45px_rgba(197,168,128,0.18)]"
                draggable={false}
              />
            </motion.div>
          </motion.div>

          {/* Centered HUD crosshair */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-40">
            <div className="w-4 h-[1px] bg-white/[0.15]" />
            <div className="w-[1px] h-4 bg-white/[0.15] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* ── Availability Badge ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: impactHappened ? 1 : 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex items-center gap-2.5 mb-5"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-white/45 uppercase">
            Available for exciting projects
          </span>
        </motion.div>

        {/* ── CTA Buttons ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: impactHappened ? 1 : 0, y: impactHappened ? 0 : 14 }}
          transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-4 items-center mb-8 sm:mb-10"
        >
          <LightBeamButton href="#built-from-scratch">
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

        {/* ── TRUSTED BY & COLLABORATED WITH CLIENT LOGOS ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: impactHappened ? 1 : 0, y: impactHappened ? 0 : 15 }}
          transition={{ delay: 0.55, duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-[860px] flex flex-col items-center gap-3.5 mb-6"
        >
          <span className="font-mono text-[8.5px] tracking-[0.28em] text-white/30 uppercase">
            TRUSTED BY & COLLABORATED WITH
          </span>
          <div className="w-full flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-14 opacity-50 hover:opacity-75 transition-opacity duration-500">
            {/* Hindustan Times */}
            <div className="flex items-center gap-2 text-white/80">
              <span className="font-serif text-[15px] sm:text-[17px] font-bold tracking-tight">
                HT
              </span>
              <span className="font-serif text-[13px] sm:text-[15px] tracking-wide font-normal">
                Hindustan Times
              </span>
            </div>

            {/* DotPe */}
            <div className="flex items-center gap-1 text-white/80">
              <span className="w-2 h-2 rounded-full bg-[#c5a880]" />
              <span className="font-sans font-bold text-[14px] sm:text-[16px] tracking-tight">
                DotPe
              </span>
            </div>

            {/* Parchi Digital */}
            <div className="flex items-center gap-1.5 text-white/80">
              <span className="w-4 h-4 rounded border border-white/30 flex items-center justify-center font-mono text-[9px]">
                P
              </span>
              <span className="font-mono text-[11px] sm:text-[12px] tracking-[0.14em] uppercase">
                Parchi Digital
              </span>
            </div>

            {/* XENCOV */}
            <div className="text-white/80">
              <span className="font-sans font-black text-[13px] sm:text-[15px] tracking-[0.2em] uppercase">
                XENCOV
              </span>
            </div>

            {/* Olive */}
            <div className="flex items-center gap-1.5 text-white/80">
              <span className="w-2.5 h-2.5 rounded-full border border-[#c5a880]/70" />
              <span className="font-sans font-medium text-[13px] sm:text-[14px] lowercase tracking-wide text-white/70">
                olive
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── BOTTOM CORNER HUD ELEMENTS ── */}
      {/* Bottom-left: Rotating scroll indicator */}
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

      {/* Bottom-right: Tactical Bookmark / Save for later badge */}
      <div className="absolute bottom-6 right-6 sm:right-10 hidden md:flex items-center select-none">
        <a
          href="mailto:contact@example.com?subject=Portfolio%20Inquiry"
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 transition-all text-white/40 hover:text-white/70"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
          <span className="font-mono text-[8.5px] tracking-[0.18em] uppercase">
            SAVE FOR LATER
          </span>
        </a>
      </div>
    </motion.section>
  );
}
