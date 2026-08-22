"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { VisualArtifact } from "@/data/visualArtifacts";
import { ArtifactMedia } from "@/components/ui/ArtifactMedia";
import { ShowcaseSlot } from "@/components/ui/ShowcaseSlot";

/* ─── Reusable corner bracket ornament ─── */
function TacticalBrackets({
  accent,
  size = 6,
  className = "",
}: {
  accent: string;
  size?: number;
  className?: string;
}) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {/* Top-left corner bracket */}
      <div
        className="absolute w-[18px] h-[18px] transition-all duration-300 ease-out group-hover:top-[3px] group-hover:left-[3px] group-hover:border-l-[2px] group-hover:border-t-[2px]"
        style={{
          top: `${size}px`,
          left: `${size}px`,
          borderLeft: `1.5px solid ${accent}`,
          borderTop: `1.5px solid ${accent}`,
        }}
      />
      {/* Top-right corner bracket */}
      <div
        className="absolute w-[18px] h-[18px] transition-all duration-300 ease-out group-hover:top-[3px] group-hover:right-[3px] group-hover:border-r-[2px] group-hover:border-t-[2px] group-hover:border-white/50"
        style={{
          top: `${size}px`,
          right: `${size}px`,
          borderRight: `1.5px solid rgba(255,255,255,0.22)`,
          borderTop: `1.5px solid rgba(255,255,255,0.22)`,
        }}
      />
      {/* Bottom-left corner bracket */}
      <div
        className="absolute w-[18px] h-[18px] transition-all duration-300 ease-out group-hover:bottom-[3px] group-hover:left-[3px] group-hover:border-l-[2px] group-hover:border-b-[2px] group-hover:border-white/50"
        style={{
          bottom: `${size}px`,
          left: `${size}px`,
          borderLeft: `1.5px solid rgba(255,255,255,0.22)`,
          borderBottom: `1.5px solid rgba(255,255,255,0.22)`,
        }}
      />
      {/* Bottom-right corner bracket */}
      <div
        className="absolute w-[18px] h-[18px] transition-all duration-300 ease-out group-hover:bottom-[3px] group-hover:right-[3px] group-hover:border-r-[2px] group-hover:border-b-[2px]"
        style={{
          bottom: `${size}px`,
          right: `${size}px`,
          borderRight: `1.5px solid ${accent}`,
          borderBottom: `1.5px solid ${accent}`,
        }}
      />
    </div>
  );
}

/* ─── Grid card (compact state) ─── */
function ArtifactGridCard({
  artifact,
  delay,
  onOpen,
}: {
  artifact: VisualArtifact;
  delay: number;
  onOpen: () => void;
}) {
  const layoutId = `artifact-${artifact.id}`;

  return (
    <motion.div
      layoutId={layoutId}
      initial={{ opacity: 0, y: 28, x: -8, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ delay, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      onClick={onOpen}
      className="group relative cursor-pointer"
    >
      <div className="relative border border-white/10 bg-black/30 aspect-[4/3] overflow-hidden transition-all duration-500 hover:border-white/20 hover:bg-black/40">
        {/* Corner brackets with viewfinder snap */}
        <TacticalBrackets accent={artifact.accent} size={6} />

        {/* Image with overlay */}
        <ArtifactMedia
          layoutId={`image-${layoutId}`}
          src={artifact.imageSrc}
          alt={`${artifact.title} ${artifact.titleAccent}`}
          accent={artifact.accent}
          prefix={artifact.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ filter: "brightness(0.55) contrast(1.05)" }}
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

        {/* Scanline texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,1) 4px)",
          }}
          aria-hidden="true"
        />

        {/* Top-right index badge */}
        <div className="absolute top-3 right-3 z-10">
          <span
            className="font-mono text-[9px] tracking-[0.2em] opacity-40"
            style={{ color: artifact.accent }}
          >
            {artifact.subtitle}
          </span>
        </div>

        {/* Ambient glow on hover */}
        <div
          className="absolute -inset-4 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100 pointer-events-none"
          style={{ background: `${artifact.accent}15` }}
          aria-hidden="true"
        />

        {/* Bottom content that reveals on hover */}
        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <motion.p
            layoutId={`subtitle-${layoutId}`}
            className="font-mono text-[9px] tracking-[0.18em] uppercase mb-1.5"
            style={{ color: artifact.accent }}
          >
            {artifact.tags[0]}
          </motion.p>
          <motion.h4
            layoutId={`title-${layoutId}`}
            className="font-display text-xl uppercase leading-none text-white"
          >
            {artifact.title}{" "}
            <span
              className="font-serif italic font-normal normal-case text-sm"
              style={{ color: artifact.accent, opacity: 0.7 }}
            >
              {artifact.titleAccent}
            </span>
          </motion.h4>
        </div>

        {/* Expand hint */}
        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span className="font-mono text-[8px] tracking-[0.15em] uppercase text-white/40">
            Expand
          </span>
          <div className="relative h-4 w-4 flex items-center justify-center">
            <div className="absolute h-full w-px bg-white/30" />
            <div className="absolute w-full h-px bg-white/30" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Expanded modal dossier ─── */
function ArtifactModal({
  artifact,
  onClose,
}: {
  artifact: VisualArtifact;
  onClose: () => void;
}) {
  const layoutId = `artifact-${artifact.id}`;

  // ESC key listener
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="absolute inset-0"
        style={{
          background: "rgba(6,6,8,0.88)",
          backdropFilter: "blur(16px) saturate(0.8)",
          WebkitBackdropFilter: "blur(16px) saturate(0.8)",
        }}
      >
        {/* Tactical grid scanlines on backdrop */}
        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 3px)",
          }}
          aria-hidden="true"
        />
      </motion.div>

      {/* Modal container */}
      <motion.div
        layoutId={layoutId}
        className="relative w-full max-w-[1100px] h-auto max-h-[85vh] bg-[#0c0c0f]/95 overflow-hidden border border-white/10 z-10 flex flex-col md:flex-row"
        style={{
          boxShadow: `
            0 32px 80px -20px rgba(0,0,0,0.85),
            0 0 1px 0 rgba(255,255,255,0.12),
            inset 0 1px 0 0 rgba(255,255,255,0.08),
            0 0 60px -10px ${artifact.accent}15
          `,
        }}
      >
        {/* Top specular edge */}
        <div
          className="absolute top-0 left-0 right-0 h-px z-30 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 30%, rgba(255,255,255,0.28) 50%, rgba(255,255,255,0.18) 70%, transparent 100%)",
          }}
        />

        {/* Corner brackets */}
        <TacticalBrackets accent={artifact.accent} size={8} />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 flex items-center gap-2 px-2.5 py-1.5 bg-black/50 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 group/close"
          style={{ backdropFilter: "blur(8px)" }}
        >
          <X
            size={12}
            strokeWidth={2}
            className="text-white/50 group-hover/close:text-white/80 transition-colors group-hover/close:rotate-90 transition-transform duration-300"
          />
          <span className="font-mono text-[8px] tracking-[0.18em] uppercase text-white/40 group-hover/close:text-white/60 hidden sm:inline">
            ESC / CLOSE
          </span>
        </button>

        {/* ─── LEFT: Image viewport ─── */}
        <div className="relative h-56 w-full shrink-0 overflow-hidden md:h-auto md:w-[48%]">
          <ArtifactMedia
            layoutId={`image-${layoutId}`}
            src={artifact.imageSrc}
            alt={`${artifact.title} ${artifact.titleAccent}`}
            accent={artifact.accent}
            prefix={artifact.title}
            className="h-full w-full object-cover"
            style={{ filter: "brightness(0.6) contrast(1.08)" }}
          />

          {/* Image overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0f] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0c0c0f]/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

          {/* Scanlines */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 3px)",
            }}
            aria-hidden="true"
          />

          {/* Asset ID badge */}
          <div className="absolute bottom-4 left-4 z-20">
            <div
              className="flex items-center gap-2 px-2.5 py-1.5 border border-white/10"
              style={{
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: artifact.accent }}
              />
              <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-white/50">
                ASSET // {artifact.id.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Top corner reticle */}
          <div className="absolute top-5 right-5 z-20 hidden md:flex">
            <div className="relative h-6 w-6 flex items-center justify-center">
              <div className="absolute h-full w-px bg-white/15" />
              <div className="absolute w-full h-px bg-white/15" />
              <div className="h-2.5 w-2.5 rounded-full border border-white/20" />
            </div>
          </div>
        </div>

        {/* ─── RIGHT: Dossier content ─── */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto expandable-card-scrollbar">
          <div className="p-5 sm:p-7 md:p-8 flex flex-col gap-6">
            {/* Category breadcrumb */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-white/30">
                GRAPHIC DESIGN
              </span>
              <span className="text-white/15 font-mono text-[8px]">//</span>
              <span
                className="font-mono text-[8px] tracking-[0.2em] uppercase"
                style={{ color: artifact.accent }}
              >
                {artifact.subtitle}
              </span>
            </div>

            {/* Title block */}
            <div className="border-b border-white/8 pb-5">
              <motion.p
                layoutId={`subtitle-${layoutId}`}
                className="font-mono text-[10px] tracking-[0.18em] uppercase mb-2"
                style={{ color: artifact.accent }}
              >
                {artifact.tags[0]}
              </motion.p>
              <motion.h3
                layoutId={`title-${layoutId}`}
                className="font-display text-3xl sm:text-4xl uppercase leading-none text-white"
              >
                {artifact.title}{" "}
                <span
                  className="font-serif italic font-normal normal-case"
                  style={{ color: artifact.accent, opacity: 0.7 }}
                >
                  {artifact.titleAccent}
                </span>
              </motion.h3>
            </div>

            {/* Tags row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="flex flex-wrap gap-2"
            >
              {artifact.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 font-mono text-[8px] tracking-[0.15em] uppercase border border-white/10 bg-white/[0.03] text-white/45"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Specs grid */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="grid grid-cols-2 gap-3"
            >
              {artifact.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="p-3 border border-white/6 bg-white/[0.02]"
                >
                  <span className="block font-mono text-[8px] tracking-[0.18em] uppercase text-white/30 mb-1">
                    {spec.label}
                  </span>
                  <span className="block font-mono text-[11px] tracking-[0.02em] text-white/70">
                    {spec.value}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Overview section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
            >
              <h4 className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/35 mb-2.5">
                // OVERVIEW
              </h4>
              <p className="font-sans text-[13px] leading-[1.75] text-white/55">
                {artifact.overview}
              </p>
            </motion.div>

            {/* Art direction section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h4 className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/35 mb-2.5">
                // ART DIRECTION
              </h4>
              <p className="font-sans text-[13px] leading-[1.75] text-white/55">
                {artifact.artDirection}
              </p>
            </motion.div>

            {/* Bottom action bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="mt-2 flex items-center justify-between border-t border-white/8 pt-5"
            >
              <span className="font-mono text-[8px] tracking-[0.18em] uppercase text-white/25">
                STATUS: ARCHIVED
              </span>

              {/* Crosshair icon */}
              <div className="relative h-4 w-4 flex items-center justify-center">
                <div className="absolute h-full w-px bg-white/15" />
                <div className="absolute w-full h-px bg-white/15" />
                <div className="h-1.5 w-1.5 rounded-full border border-white/20" />
              </div>

              <span
                className="font-mono text-[8px] tracking-[0.18em] uppercase"
                style={{ color: artifact.accent, opacity: 0.5 }}
              >
                {artifact.id.toUpperCase()}
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Main exported component ─── */
export function ExpandableArtifactCards({
  artifacts,
  accent,
  sectionDelay = 0.05,
  prefix = "GD",
  emptyCount = 4,
}: {
  artifacts: VisualArtifact[];
  accent: string;
  sectionDelay?: number;
  prefix?: string;
  emptyCount?: number;
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const openArtifact = artifacts.find((a) => a.id === openId) ?? null;

  // No entries yet — show tactical placeholder slots.
  if (artifacts.length === 0) {
    return (
      <>
        {Array.from({ length: emptyCount }).map((_, i) => (
          <ShowcaseSlot
            key={i}
            prefix={prefix}
            accent={accent}
            delay={sectionDelay + 0.08 + i * 0.09}
          />
        ))}
      </>
    );
  }

  return (
    <>
      {/* Grid of cards */}
      {artifacts.map((artifact, i) => (
        <ArtifactGridCard
          key={artifact.id}
          artifact={artifact}
          delay={sectionDelay + 0.08 + i * 0.09}
          onOpen={() => setOpenId(artifact.id)}
        />
      ))}

      {/* Expanded modal */}
      <AnimatePresence>
        {openArtifact && (
          <ArtifactModal
            key={openArtifact.id}
            artifact={openArtifact}
            onClose={() => setOpenId(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
