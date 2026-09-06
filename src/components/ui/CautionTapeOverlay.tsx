"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShowcaseSlot } from "@/components/ui/ShowcaseSlot";

interface CautionTapeOverlayProps {
  prefix: string;
  accent: string;
  categoryTitle: string;
  slotCount?: number;
  aspectRatioClass?: string;
  delay?: number;
}

export function CautionTapeOverlay({
  prefix,
  accent,
  categoryTitle,
  slotCount = 4,
  aspectRatioClass = "aspect-[4/3]",
  delay = 0.1,
}: CautionTapeOverlayProps) {
  // Repeating text for tape ribbons
  const tapeText1 = " ⚠️ WORK IN PROGRESS // DO NOT CROSS // ACTIVE PRODUCTION // ARCHIVE UNDER CONSTRUCTION // DEPLOYMENT PENDING //"
    .repeat(6);
  const tapeText2 = " ⚠️ RESTRICTED ARCHIVE // WORK IN PROGRESS // CLASSIFIED AREA // PRODUCTION UNDERWAY // DO NOT CROSS //"
    .repeat(6);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full overflow-hidden rounded-xl bg-black/40 border border-white/[0.07] p-3 sm:p-5"
      style={{
        boxShadow:
          "0 20px 50px -10px rgba(0,0,0,0.8), inset 0 1px 0 0 rgba(255,255,255,0.06)",
      }}
    >
      {/* Background Slots — Dimmed & slightly blurred for restricted area look */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 opacity-40 blur-[0.5px] pointer-events-none select-none">
        {Array.from({ length: slotCount }).map((_, i) => (
          <ShowcaseSlot
            key={i}
            prefix={`${prefix}-${String(i + 1).padStart(2, "0")}`}
            accent={accent}
            aspectRatioClass={aspectRatioClass}
            delay={0}
            label="PENDING PRODUCTION"
            sublabel="Access Restricted"
          />
        ))}
      </div>

      {/* ─── CROSSING CAUTION TAPES LAYER ─── */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-20">
        
        {/* TAPE 1 — Angled -3.5 deg spanning left to right */}
        <div
          className="absolute w-[120%] h-[38px] sm:h-[44px] flex items-center shadow-[0_12px_28px_rgba(0,0,0,0.9)] overflow-hidden"
          style={{
            transform: "rotate(-3deg) translateY(-28px)",
            background: "linear-gradient(180deg, #fef08a 0%, #eab308 18%, #ca8a04 82%, #a16207 100%)",
            borderTop: "2px solid #000",
            borderBottom: "2px solid #000",
          }}
        >
          {/* Top Hazard Stripe Border */}
          <div className="absolute top-0 left-0 right-0 h-[5px] hazard-stripe" />
          
          {/* Moving Marquee Text */}
          <div className="flex whitespace-nowrap animate-tape-left will-change-transform">
            <span className="font-mono font-black text-[10.5px] sm:text-[12.5px] uppercase tracking-[0.22em] text-black select-none">
              {tapeText1}
            </span>
          </div>

          {/* Bottom Hazard Stripe Border */}
          <div className="absolute bottom-0 left-0 right-0 h-[5px] hazard-stripe" />

          {/* Specular Glint Sheen overlay */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/35 via-transparent to-black/20" />
        </div>

        {/* TAPE 2 — Angled +4.2 deg crossing Tape 1 */}
        <div
          className="absolute w-[120%] h-[38px] sm:h-[44px] flex items-center shadow-[0_16px_36px_rgba(0,0,0,0.95)] overflow-hidden"
          style={{
            transform: "rotate(3.5deg) translateY(24px)",
            background: "linear-gradient(180deg, #fef08a 0%, #facc15 20%, #d97706 82%, #92400e 100%)",
            borderTop: "2px solid #000",
            borderBottom: "2px solid #000",
          }}
        >
          {/* Top Hazard Stripe Border */}
          <div className="absolute top-0 left-0 right-0 h-[5px] hazard-stripe" />
          
          {/* Moving Marquee Text (Reverse Direction) */}
          <div className="flex whitespace-nowrap animate-tape-right will-change-transform">
            <span className="font-mono font-black text-[10.5px] sm:text-[12.5px] uppercase tracking-[0.22em] text-black select-none">
              {tapeText2}
            </span>
          </div>

          {/* Bottom Hazard Stripe Border */}
          <div className="absolute bottom-0 left-0 right-0 h-[5px] hazard-stripe" />

          {/* Specular Glint Sheen overlay */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/35 via-transparent to-black/25" />
        </div>

        {/* ─── CENTRAL TACTICAL STATUS BADGE ─── */}
        <div
          className="relative z-30 px-5 py-3.5 rounded-lg border border-yellow-500/40 bg-black/85 backdrop-blur-md shadow-[0_0_35px_rgba(234,179,8,0.25)] flex flex-col items-center gap-1.5 text-center max-w-[92%] sm:max-w-md pointer-events-auto"
        >
          {/* Corner brackets */}
          <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t border-l border-yellow-400/70" />
          <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t border-r border-yellow-400/70" />
          <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b border-l border-yellow-400/70" />
          <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b border-r border-yellow-400/70" />

          {/* Header pill */}
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full bg-yellow-400 shrink-0"
              style={{ animation: "resume-dot-pulse 2s ease-in-out infinite" }}
            />
            <span className="font-mono text-[9.5px] sm:text-[10.5px] font-semibold uppercase tracking-[0.22em] text-yellow-400">
              WORK IN PROGRESS
            </span>
          </div>

          {/* Subtitle */}
          <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-white/70 mt-0.5">
            {categoryTitle} Archive Under Active Production
          </p>

          <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/35">
            Records Pending Clearance // Deployment Imminent
          </span>
        </div>
      </div>
    </motion.div>
  );
}
