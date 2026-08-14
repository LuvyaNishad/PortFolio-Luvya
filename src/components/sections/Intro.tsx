"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LiquidGlassEffect } from "@/components/ui/LiquidGlassEffect";
import { LightBeamButton } from "@/components/ui/LightBeamButton";
import { AboutModal } from "@/components/ui/AboutModal";

/* ─────────────────────────────────────────────────
   Stat row
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
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.45, ease: "easeOut" }}
      className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 border-b border-white/8 py-4 last:border-b-0"
    >
      <span className="font-mono text-[10px] tracking-[0.14em] text-[#c5a880]">
        {index}
      </span>
      <div>
        <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/75">
          {title}
        </div>
        <div className="mt-1 font-mono text-[10px] leading-[1.6] text-white/32">
          {detail}
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────
   Profile photo frame
───────────────────────────────────────────────── */
function ProfileFrame() {
  return (
    <div
      className="relative w-full h-full rounded-xl overflow-hidden border border-white/10"
      style={{ background: "rgba(20,20,23,0.6)" }}
    >
      {/* Blurred silhouette glow */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div
          style={{
            width: "55%",
            height: "85%",
            background:
              "radial-gradient(ellipse at 50% 28%, rgba(255,255,255,0.45) 0%, rgba(200,200,200,0.15) 45%, transparent 72%)",
            filter: "blur(22px)",
          }}
        />
      </div>

      {/* Scanlines */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.035,
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,1) 3px, rgba(255,255,255,1) 4px)",
        }}
      />

      {/* HUD corners */}
      <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-white/35 rounded-tl-sm" />
      <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-white/35 rounded-tr-sm" />
      <div className="absolute bottom-10 left-4 w-5 h-5 border-b-2 border-l-2 border-white/35 rounded-bl-sm" />
      <div className="absolute bottom-10 right-4 w-5 h-5 border-b-2 border-r-2 border-white/35 rounded-br-sm" />

      {/* Label bar */}
      <div
        className="absolute bottom-0 left-0 right-0 px-5 py-2.5 border-t border-white/08"
        style={{ background: "rgba(8,8,10,0.75)" }}
      >
        <span className="font-mono text-[9px] tracking-[0.22em] text-white/30 uppercase">
          PROFILE_PIC.JPG
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   Intro Section
───────────────────────────────────────────────── */
export function Intro() {
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  return (
    <section
      id="about"
      className="relative w-full px-6 pt-5 md:px-8 md:pt-8 lg:pt-12 pb-0 scroll-mt-32 md:scroll-mt-40"
    >
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-5%" }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="w-full rounded-xl overflow-hidden"
      >
        <LiquidGlassEffect
          variant="dark"
          backdropBlur={6}
          intensity="subtle"
          className="w-full rounded-xl border border-white/8"
        >
          <div className="relative flex flex-col lg:flex-row">

          {/* ── LEFT: Text ───────────────────────────────── */}
          <div className="flex flex-col p-8 md:p-10 lg:p-12 flex-1 min-w-0">

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
                  Aurelius
                </span>
              </h2>
              <p className="font-mono text-[11px] tracking-[0.3em] text-white/35 uppercase mt-2">
                UI&nbsp;/&nbsp;UX&nbsp;&nbsp;Designer
              </p>
            </div>

            {/* Bio */}
            <p className="font-mono text-[12px] leading-[1.9] text-white/38 max-w-[360px] mt-5 mb-9">
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
          </div>

          {/* ── CENTER: Photo ─────────────────────────────── */}
          <div
            className="flex-shrink-0 flex items-stretch p-6 lg:p-8 w-full max-w-[320px] lg:max-w-none aspect-[4/5] lg:aspect-auto mx-auto lg:mx-0"
            style={{ width: "clamp(260px, 30%, 360px)" }}
          >
            <ProfileFrame />
          </div>

          {/* ── RIGHT: Stats ──────────────────────────────── */}
          <div
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
              delay={0.1}
            />
            <PrincipleRow
              index="02"
              title="Human context"
              detail="Design for the moment behind the screen."
              delay={0.2}
            />
            <PrincipleRow
              index="03"
              title="Built to last"
              detail="Useful systems over surface-level noise."
              delay={0.3}
            />
          </div>
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
