"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { LiquidGlassEffect } from "@/components/ui/LiquidGlassEffect";
import { LightBeamButton } from "@/components/ui/LightBeamButton";

/* ─────────────────────────────────────────────────
   Stat row
───────────────────────────────────────────────── */
function StatRow({
  icon,
  value,
  suffix = "+",
  label,
  delay = 0,
}: {
  icon: React.ReactNode;
  value: number;
  suffix?: string;
  label: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.55, ease: "easeOut" }}
      className="flex items-center gap-3.5"
    >
      <div className="w-10 h-10 flex-shrink-0 rounded-lg border border-white/10 bg-white/[0.05] flex items-center justify-center">
        {icon}
      </div>
      <div>
        <div className="text-white text-[1.3rem] font-semibold font-sans leading-none mb-0.5 tracking-tight">
          <AnimatedCounter to={value} />{suffix}
        </div>
        <div className="font-mono text-[9.5px] tracking-[0.14em] text-white/35 uppercase">
          {label}
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
  return (
    <section
      id="about"
      className="relative w-full px-6 pt-5 md:px-8 md:pt-8 lg:pt-12 pb-0"
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

            {/* CTA */}
            <LightBeamButton href="#about" className="px-6 py-3">
              MORE ABOUT ME{" "}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 text-white/30 ml-1">
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
            className="flex flex-col justify-center gap-8 px-8 lg:px-10 py-10 border-t lg:border-t-0 lg:border-l border-white/06 flex-shrink-0"
            style={{ minWidth: 190 }}
          >
            <StatRow
              value={3}
              label="Years Experience"
              delay={0.1}
              icon={
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" rx="1.5"/>
                  <rect x="14" y="3" width="7" height="7" rx="1.5"/>
                  <rect x="3" y="14" width="7" height="7" rx="1.5"/>
                  <rect x="14" y="14" width="7" height="7" rx="1.5"/>
                </svg>
              }
            />
            <StatRow
              value={15}
              label="Projects Completed"
              delay={0.22}
              icon={
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
                  <polyline points="3.29 7 12 12 20.71 7"/>
                  <line x1="12" y1="22" x2="12" y2="12"/>
                </svg>
              }
            />
            <StatRow
              value={10}
              label="Happy Clients"
              delay={0.36}
              icon={
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              }
            />
          </div>
        </div>
      </LiquidGlassEffect>
    </motion.div>
    </section>
  );
}
