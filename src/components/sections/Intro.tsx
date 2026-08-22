"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LiquidGlassEffect } from "@/components/ui/LiquidGlassEffect";
import { LightBeamButton } from "@/components/ui/LightBeamButton";
import { AboutModal } from "@/components/ui/AboutModal";
import { siteConfig } from "@/config/site";

/* ─────────────────────────────────────────────────
   Stat row with tactical hover micro-interaction
───────────────────────────────────────────────── */
function PrincipleRow({
  index,
  title,
  detail,
  delay = 0,
}: {
  index: string;
  title: string;
  detail: string;
  delay?: number;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: 12 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      className="group/row relative grid grid-cols-[2rem_minmax(0,1fr)] gap-3 border-b border-white/8 py-4 last:border-b-0 cursor-default transition-colors duration-300 hover:border-white/18"
    >
      {/* Left indicator glow bar on hover */}
      <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-[2px] h-0 bg-[#c5a880] transition-all duration-300 group-hover/row:h-6 opacity-0 group-hover/row:opacity-100 shadow-[0_0_8px_#c5a880]" />

      <span className="font-mono text-[10px] tracking-[0.14em] text-[#c5a880] transition-transform duration-300 group-hover/row:scale-110">
        {index}
      </span>
      <div>
        <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/75 transition-colors duration-300 group-hover/row:text-white">
          {title}
        </div>
        <div className="mt-1 font-mono text-[10px] leading-[1.6] text-white/32 transition-colors duration-300 group-hover/row:text-white/50">
          {detail}
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────
   Profile photo frame with live Scanner & Reticle
───────────────────────────────────────────────── */
function ProfileFrame() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group/profile relative w-full h-full rounded-xl overflow-hidden border border-white/10 transition-all duration-500 hover:border-[#c5a880]/40"
      style={{ background: "rgba(20,20,23,0.6)" }}
    >
      {/* ── PHOTO & SCANNER VIEWPORT (Cleanly clipped above the label bar) ── */}
      <div className="absolute inset-0 bottom-[37px] overflow-hidden">
        {/* Blurred silhouette glow with organic pulse */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.06, 1],
              opacity: [0.85, 1, 0.85],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              width: "55%",
              height: "85%",
              background:
                "radial-gradient(ellipse at 50% 28%, rgba(255,255,255,0.48) 0%, rgba(197,168,128,0.22) 40%, rgba(200,200,200,0.1) 60%, transparent 75%)",
              filter: "blur(22px)",
            }}
          />
        </div>

        {/* Single Luminous Radar Scanner Laser Bar (Bounded to photo area, GPU accelerated) */}
        <motion.div
          animate={{
            y: ["0%", "100%"],
            opacity: [0, 1, 1, 0.8, 0],
          }}
          transition={{
            duration: 1.9,
            repeat: Infinity,
            repeatDelay: 0.6,
            ease: "easeInOut",
          }}
          className="absolute inset-0 pointer-events-none z-20 h-full flex flex-col justify-start will-change-transform"
        >
          <div
            className="w-full h-[2px]"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(197, 168, 128, 0.7) 15%, #fff2db 50%, rgba(197, 168, 128, 0.7) 85%, transparent 100%)",
              boxShadow:
                "0 0 10px 2px rgba(197, 168, 128, 0.7), 0 0 20px 4px rgba(197, 168, 128, 0.25)",
            }}
          />
        </motion.div>

        {/* Center Tactical Reticle Target */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 group-hover/profile:opacity-65 transition-opacity duration-500 z-10">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <div className="absolute w-full h-px bg-[#c5a880]/70" />
            <div className="absolute h-full w-px bg-[#c5a880]/70" />
            <div className="w-6 h-6 rounded-full border border-[#c5a880]/60 transition-transform duration-500 group-hover/profile:scale-125" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#c5a880] shadow-[0_0_6px_#c5a880]" />
          </div>
        </div>

        {/* Scanlines */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            opacity: 0.04,
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,1) 3px, rgba(255,255,255,1) 4px)",
          }}
        />

        {/* Dynamic HUD corners with expansion on hover */}
        <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-white/35 rounded-tl-sm transition-all duration-300 group-hover/profile:border-[#c5a880] group-hover/profile:-translate-x-0.5 group-hover/profile:-translate-y-0.5" />
        <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-white/35 rounded-tr-sm transition-all duration-300 group-hover/profile:border-[#c5a880] group-hover/profile:translate-x-0.5 group-hover/profile:-translate-y-0.5" />
        <div className="absolute bottom-2 left-4 w-5 h-5 border-b-2 border-l-2 border-white/35 rounded-bl-sm transition-all duration-300 group-hover/profile:border-[#c5a880] group-hover/profile:-translate-x-0.5 group-hover/profile:translate-y-0.5" />
        <div className="absolute bottom-2 right-4 w-5 h-5 border-b-2 border-r-2 border-white/35 rounded-br-sm transition-all duration-300 group-hover/profile:border-[#c5a880] group-hover/profile:translate-x-0.5 group-hover/profile:translate-y-0.5" />
      </div>

      {/* ── LABEL BAR (Cleanly separated at bottom) ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[37px] px-5 py-2.5 border-t border-white/10 flex items-center justify-between z-30 bg-[#0c0c0f]/95 backdrop-blur-md"
      >
        <span className="font-mono text-[9px] tracking-[0.22em] text-white/30 uppercase group-hover/profile:text-[#c5a880] transition-colors duration-300">
          {isHovered ? "BIOMETRIC_LOCK // OK" : "PROFILE_PIC.JPG"}
        </span>
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   Intro Section with Bubble/Center Unfold Animation
───────────────────────────────────────────────── */
export function Intro() {
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  return (
    <section
      id="about"
      className="relative w-full px-6 pt-5 md:px-8 md:pt-8 lg:pt-12 pb-0 scroll-mt-32 md:scroll-mt-40 flex justify-center"
    >
      {/* ── BUBBLE / CENTER-OUTWARD UNROLL CONTAINER ── */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={{
          hidden: {
            opacity: 0,
            scaleX: 0.12, // starts condensed/shrunk in the middle
            scaleY: 0.45,
            y: 35,
            filter: "blur(8px)",
          },
          visible: {
            opacity: 1,
            scaleX: 1, // expands towards both sides with smooth bubble pop
            scaleY: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
              duration: 0.95,
              ease: [0.16, 1, 0.3, 1], // crisp, smooth weighted ease
              staggerChildren: 0.14,
              delayChildren: 0.28,
            },
          },
        }}
        style={{
          transformOrigin: "center center",
        }}
        className="w-full rounded-xl overflow-hidden shadow-[0_24px_70px_rgba(0,0,0,0.65)]"
      >
        <LiquidGlassEffect
          variant="dark"
          backdropBlur={6}
          intensity="subtle"
          className="w-full rounded-xl border border-white/10"
        >
          <div className="relative flex flex-col lg:flex-row">
            {/* ── LEFT: Text Content ───────────────────────── */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -16, filter: "blur(4px)" },
                visible: {
                  opacity: 1,
                  x: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="flex flex-col p-8 md:p-10 lg:p-12 flex-1 min-w-0"
            >
              {/* Section header */}
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] tracking-[0.22em] text-white/35 uppercase">
                    Introduction
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-white/25 flex-shrink-0" />
                </div>
                <span className="font-mono text-[11px] text-white/20 tracking-widest">01</span>
              </div>

              {/* Name */}
              <div className="mb-3">
                <h2 className="leading-[0.92] flex flex-wrap items-baseline gap-x-3 mb-2">
                  <span
                    className="font-sans text-white"
                    style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700 }}
                  >
                    I&apos;M
                  </span>
                  <span
                    className="font-serif italic"
                    style={{
                      fontSize: "clamp(2rem, 4vw, 3rem)",
                      fontWeight: 500,
                      color: "#8B6840",
                    }}
                  >
                    {siteConfig.name}
                  </span>
                </h2>
                <p className="font-mono text-[11px] tracking-[0.3em] text-white/45 uppercase mt-2">
                  {siteConfig.role}
                </p>
              </div>

              {/* Bio */}
              <p className="font-mono text-[12px] leading-[1.9] text-white/55 max-w-[360px] mt-5 mb-9">
                I design digital experiences that are clean, functional, and built to leave
                a lasting impact. My focus is on blending strategy with aesthetics to create
                interfaces that not only look good but feel intuitive.
              </p>

              {/* CTA — Opens the expandable About dossier modal */}
              <LightBeamButton
                onClick={() => setIsAboutModalOpen(true)}
                className="w-full max-w-[360px] justify-between px-6 py-3.5"
              >
                <span>MORE ABOUT ME</span>
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 text-white/40">
                  →
                </span>
              </LightBeamButton>
            </motion.div>

            {/* ── CENTER: Photo Frame with Scanner ───────────── */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.88, filter: "blur(6px)" },
                visible: {
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="flex-shrink-0 flex items-stretch p-6 lg:p-8 w-full max-w-[320px] lg:max-w-none aspect-[4/5] lg:aspect-auto mx-auto lg:mx-0"
              style={{ width: "clamp(260px, 30%, 360px)" }}
            >
              <ProfileFrame />
            </motion.div>

            {/* ── RIGHT: Principles & Stats ──────────────────── */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 16, filter: "blur(4px)" },
                visible: {
                  opacity: 1,
                  x: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="flex flex-col justify-center px-8 lg:px-10 py-10 border-t lg:border-t-0 lg:border-l border-white/06 flex-shrink-0"
              style={{ minWidth: 190 }}
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
                  Working principles
                </span>
                <span className="font-mono text-[10px] tracking-[0.16em] text-white/20">
                  02
                </span>
              </div>
              <PrincipleRow
                index="01"
                title="Clear interfaces"
                detail="Structure first, polish second."
                delay={0.05}
              />
              <PrincipleRow
                index="02"
                title="Human context"
                detail="Design for the moment behind the screen."
                delay={0.12}
              />
              <PrincipleRow
                index="03"
                title="Built to last"
                detail="Useful systems over surface-level noise."
                delay={0.19}
              />
            </motion.div>
          </div>
        </LiquidGlassEffect>
      </motion.div>

      {/* ── Expandable About Dossier Modal ── */}
      <AnimatePresence>
        {isAboutModalOpen && (
          <AboutModal onClose={() => setIsAboutModalOpen(false)} />
        )}
      </AnimatePresence>
    </section>
  );
}
