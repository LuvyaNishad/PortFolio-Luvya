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
  aspectRatioClass,
  onOpen,
}: {
  artifact: VisualArtifact;
  delay: number;
  aspectRatioClass?: string;
  onOpen: () => void;
}) {
  const isPortrait =
    aspectRatioClass === "aspect-[4/5]" ||
    artifact.type === "poster" ||
    artifact.aspectRatio === "4/5" ||
    artifact.imageSrc.toLowerCase().includes("poster");

  const finalAspectClass =
    aspectRatioClass ||
    (isPortrait ? "aspect-[4/5]" : "aspect-[16/9]");

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, x: -8, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ delay, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      onClick={onOpen}
      className="group relative cursor-pointer"
    >
      <div
        className={`relative border border-white/10 bg-black/30 ${finalAspectClass} overflow-hidden transition-all duration-500 hover:border-white/20 hover:bg-black/40`}
      >
        {/* Corner brackets with viewfinder snap */}
        <TacticalBrackets accent={artifact.accent} size={6} />

        {/* Image with overlay */}
        <ArtifactMedia
          src={artifact.imageSrc}
          alt={`${artifact.title} ${artifact.titleAccent}`}
          accent={artifact.accent}
          prefix={artifact.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Gradient overlays — refined so the full artwork remains clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/15 to-transparent pointer-events-none" />

        {/* Scanline texture */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,1) 4px)",
          }}
          aria-hidden="true"
        />

        {/* Top-right index badge */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <span
            className="font-mono text-[8.5px] tracking-[0.18em] opacity-60 bg-black/70 px-1.5 py-0.5 rounded-[2px] border border-white/10"
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
        <div className="absolute bottom-0 left-0 w-full p-3.5 sm:p-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-500 z-10">
          <motion.p
            className="font-mono text-[8.5px] sm:text-[9px] tracking-[0.18em] uppercase mb-1"
            style={{ color: artifact.accent }}
          >
            {artifact.tags[0]}
          </motion.p>
          <motion.h4
            className="font-display text-lg sm:text-xl uppercase leading-none text-white drop-shadow-sm"
          >
            {artifact.title}{" "}
            <span
              className="font-serif italic font-normal normal-case text-xs sm:text-sm"
              style={{ color: artifact.accent, opacity: 0.8 }}
            >
              {artifact.titleAccent}
            </span>
          </motion.h4>
        </div>

        {/* Expand hint */}
        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span className="font-mono text-[7.5px] tracking-[0.15em] uppercase text-white/60 bg-black/60 px-1 py-0.5 border border-white/10">
            Expand
          </span>
          <div className="relative h-3.5 w-3.5 flex items-center justify-center">
            <div className="absolute h-full w-px bg-white/30" />
            <div className="absolute w-full h-px bg-white/30" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Shared dossier info block ─── */
function DossierContent({ artifact }: { artifact: VisualArtifact }) {
  return (
    <>
      {/* Category breadcrumb */}
      <div className="flex items-center gap-3">
        <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-white/30">
          GRAPHIC DESIGN
        </span>
        <span className="text-white/15 font-mono text-[8px]">{"//"}</span>
        <span
          className="font-mono text-[8px] tracking-[0.2em] uppercase"
          style={{ color: artifact.accent }}
        >
          {artifact.subtitle}
        </span>
      </div>

      {/* Title block */}
      <div className="border-b border-white/8 pb-4">
        <p
          className="font-mono text-[10px] tracking-[0.18em] uppercase mb-2"
          style={{ color: artifact.accent }}
        >
          {artifact.tags[0]}
        </p>
        <h3 className="font-display text-2xl sm:text-3xl md:text-4xl uppercase leading-none text-white">
          {artifact.title}{" "}
          <span
            className="font-serif italic font-normal normal-case"
            style={{ color: artifact.accent, opacity: 0.8 }}
          >
            {artifact.titleAccent}
          </span>
        </h3>
      </div>

      {/* Technical Specifications Grid */}
      <div>
        <p className="font-mono text-[8.5px] uppercase tracking-[0.22em] text-white/35 mb-3">
          // SPECIFICATIONS
        </p>
        <div className="grid grid-cols-2 gap-2.5">
          {artifact.specs.map((spec, i) => (
            <div
              key={i}
              className="p-2.5 border border-white/6 bg-white/[0.015] flex flex-col gap-0.5"
            >
              <span className="font-mono text-[8px] tracking-[0.15em] uppercase text-white/35">
                {spec.label}
              </span>
              <span className="font-mono text-[10.5px] text-white/85">
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Overview / Brief */}
      <div>
        <p className="font-mono text-[8.5px] uppercase tracking-[0.22em] text-white/35 mb-2">
          // OVERVIEW
        </p>
        <p className="font-sans text-[13px] leading-[1.7] text-white/70">
          {artifact.overview}
        </p>
      </div>

      {/* Art Direction / Notes */}
      <div>
        <p className="font-mono text-[8.5px] uppercase tracking-[0.22em] text-white/35 mb-2">
          // ART DIRECTION & CRAFT
        </p>
        <p className="font-sans text-[13px] leading-[1.7] text-white/60">
          {artifact.artDirection}
        </p>
      </div>

      {/* Tags footer */}
      <div className="pt-2 border-t border-white/6 flex flex-wrap gap-1.5">
        {artifact.tags.map((tag, i) => (
          <span
            key={i}
            className="font-mono text-[8px] uppercase tracking-[0.15em] px-2 py-1 border border-white/8 bg-white/[0.02] text-white/45"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Tactical dossier stamp */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="pt-2 flex items-center justify-between border-t border-dashed border-white/8"
      >
        <span className="font-mono text-[8px] tracking-[0.2em] text-white/20 uppercase">
          RECORD VERIFIED // AURELIUS ARCHIVE
        </span>
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
    </>
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
  const isLandscape =
    artifact.type === "thumbnail" ||
    artifact.aspectRatio === "16/9" ||
    artifact.imageSrc.toLowerCase().includes("thumbnail");

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

  /* ── Shared modal chrome (backdrop, specular edge, brackets, close btn) ── */
  const modalChrome = (
    <>
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
        <div
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 3px)",
          }}
          aria-hidden="true"
        />
      </motion.div>
    </>
  );

  const modalDecorations = (
    <>
      {/* Top specular edge */}
      <div
        className="absolute top-0 left-0 right-0 h-px z-30 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 30%, rgba(255,255,255,0.28) 50%, rgba(255,255,255,0.18) 70%, transparent 100%)",
        }}
      />
      <TacticalBrackets accent={artifact.accent} size={8} />
      <button
        onClick={onClose}
        className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 flex items-center gap-2 px-2.5 py-1.5 bg-black/50 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 group/close"
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
    </>
  );

  /* ── LANDSCAPE / THUMBNAIL layout: vertical stacked ── */
  if (isLandscape) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6">
        {modalChrome}

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[900px] max-h-[90vh] bg-[#0c0c0f]/95 overflow-y-auto overflow-x-hidden border border-white/10 z-10 flex flex-col expandable-card-scrollbar"
          style={{
            boxShadow: `
              0 32px 80px -20px rgba(0,0,0,0.85),
              0 0 1px 0 rgba(255,255,255,0.12),
              inset 0 1px 0 0 rgba(255,255,255,0.08),
              0 0 60px -10px ${artifact.accent}15
            `,
          }}
        >
          {modalDecorations}

          {/* ── TOP: Title heading ── */}
          <div className="p-4 sm:p-6 pb-0 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-white/30">
                GRAPHIC DESIGN
              </span>
              <span className="text-white/15 font-mono text-[8px]">{"//"}</span>
              <span
                className="font-mono text-[8px] tracking-[0.2em] uppercase"
                style={{ color: artifact.accent }}
              >
                {artifact.subtitle}
              </span>
            </div>
            <div className="pb-3 border-b border-white/8">
              <p
                className="font-mono text-[10px] tracking-[0.18em] uppercase mb-1.5"
                style={{ color: artifact.accent }}
              >
                {artifact.tags[0]}
              </p>
              <h3 className="font-display text-2xl sm:text-3xl uppercase leading-none text-white">
                {artifact.title}{" "}
                <span
                  className="font-serif italic font-normal normal-case"
                  style={{ color: artifact.accent, opacity: 0.8 }}
                >
                  {artifact.titleAccent}
                </span>
              </h3>
            </div>
          </div>

          {/* ── MIDDLE: Full-width landscape image ── */}
          <div className="relative w-full bg-black/40 flex items-center justify-center p-3 sm:p-5">
            <ArtifactMedia
              src={artifact.imageSrc}
              alt={`${artifact.title} ${artifact.titleAccent}`}
              accent={artifact.accent}
              prefix={artifact.title}
              className="w-full h-auto max-h-[50vh] object-contain rounded-sm drop-shadow-2xl"
            />

            {/* Scanlines */}
            <div
              className="absolute inset-0 opacity-[0.02] pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 3px)",
              }}
              aria-hidden="true"
            />

            {/* Asset ID badge */}
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20">
              <div
                className="flex items-center gap-2 px-2 py-1 sm:px-2.5 sm:py-1.5 border border-white/10"
                style={{
                  background: "rgba(0,0,0,0.75)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: artifact.accent }}
                />
                <span className="font-mono text-[7px] sm:text-[8px] tracking-[0.2em] uppercase text-white/60">
                  ASSET // {artifact.id.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* ── BOTTOM: Info & specs ── */}
          <div className="p-4 sm:p-6 pt-4 flex flex-col gap-5">
            {/* Specs */}
            <div>
              <p className="font-mono text-[8.5px] uppercase tracking-[0.22em] text-white/35 mb-3">
                // SPECIFICATIONS
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {artifact.specs.map((spec, i) => (
                  <div
                    key={i}
                    className="p-2.5 border border-white/6 bg-white/[0.015] flex flex-col gap-0.5"
                  >
                    <span className="font-mono text-[8px] tracking-[0.15em] uppercase text-white/35">
                      {spec.label}
                    </span>
                    <span className="font-mono text-[10.5px] text-white/85">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Overview & Art Direction side by side on desktop, stacked on mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <p className="font-mono text-[8.5px] uppercase tracking-[0.22em] text-white/35 mb-2">
                  // OVERVIEW
                </p>
                <p className="font-sans text-[13px] leading-[1.7] text-white/70">
                  {artifact.overview}
                </p>
              </div>
              <div>
                <p className="font-mono text-[8.5px] uppercase tracking-[0.22em] text-white/35 mb-2">
                  // ART DIRECTION & CRAFT
                </p>
                <p className="font-sans text-[13px] leading-[1.7] text-white/60">
                  {artifact.artDirection}
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="pt-2 border-t border-white/6 flex flex-wrap gap-1.5">
              {artifact.tags.map((tag, i) => (
                <span
                  key={i}
                  className="font-mono text-[8px] uppercase tracking-[0.15em] px-2 py-1 border border-white/8 bg-white/[0.02] text-white/45"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Dossier stamp */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="pt-2 flex items-center justify-between border-t border-dashed border-white/8"
            >
              <span className="font-mono text-[8px] tracking-[0.2em] text-white/20 uppercase">
                RECORD VERIFIED // AURELIUS ARCHIVE
              </span>
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
        </motion.div>
      </div>
    );
  }

  /* ── PORTRAIT / POSTER layout: side-by-side (image | info) ── */
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6">
      {modalChrome}

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
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
        {modalDecorations}

        {/* ─── LEFT: Image viewport ─── */}
        <div className="relative h-56 sm:h-72 md:h-auto w-full shrink-0 overflow-hidden md:w-[48%] bg-black/60 flex items-center justify-center p-3 sm:p-5">
          <ArtifactMedia
            src={artifact.imageSrc}
            alt={`${artifact.title} ${artifact.titleAccent}`}
            accent={artifact.accent}
            prefix={artifact.title}
            className="h-full w-full max-h-[70vh] object-contain rounded-sm drop-shadow-2xl"
          />

          {/* Image overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0f]/60 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0c0c0f]/20 pointer-events-none" />

          {/* Scanlines */}
          <div
            className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 3px)",
            }}
            aria-hidden="true"
          />

          {/* Asset ID badge */}
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20">
            <div
              className="flex items-center gap-2 px-2 py-1 sm:px-2.5 sm:py-1.5 border border-white/10"
              style={{
                background: "rgba(0,0,0,0.75)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: artifact.accent }}
              />
              <span className="font-mono text-[7px] sm:text-[8px] tracking-[0.2em] uppercase text-white/60">
                ASSET // {artifact.id.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* ─── RIGHT: Dossier content ─── */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto expandable-card-scrollbar">
          <div className="p-4 sm:p-6 md:p-8 flex flex-col gap-5 sm:gap-6">
            <DossierContent artifact={artifact} />
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
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
        {Array.from({ length: emptyCount }).map((_, i) => (
          <ShowcaseSlot
            key={i}
            prefix={prefix}
            accent={accent}
            delay={sectionDelay + 0.08 + i * 0.09}
          />
        ))}
      </div>
    );
  }

  // Separate Posters (1080x1350 / 4:5) and Thumbnails (1280x720 / 16:9)
  const posters = artifacts.filter(
    (a) =>
      a.type === "poster" ||
      a.aspectRatio === "4/5" ||
      a.imageSrc.toLowerCase().includes("poster")
  );

  const thumbnails = artifacts.filter(
    (a) =>
      a.type === "thumbnail" ||
      a.aspectRatio === "16/9" ||
      a.imageSrc.toLowerCase().includes("thumbnail")
  );

  const hasBothGroups = posters.length > 0 && thumbnails.length > 0;

  return (
    <>
      {hasBothGroups ? (
        <div className="flex flex-col gap-8 lg:gap-10 w-full">
          {/* ── Layer 1: Posters (1080x1350 / 4:5 Portrait — 4 in a horizontal row) ── */}
          <div className="w-full">
            <div className="flex items-center justify-between mb-3.5 px-0.5">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/50">
                  POSTER ARCHIVE // 4:5 PORTRAIT (1080×1350)
                </span>
              </div>
              <span className="font-mono text-[9px] tracking-[0.2em] text-white/25">
                [{posters.length} ASSETS]
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
              {posters.map((artifact, i) => (
                <ArtifactGridCard
                  key={artifact.id}
                  artifact={artifact}
                  aspectRatioClass="aspect-[4/5]"
                  delay={sectionDelay + 0.08 + i * 0.08}
                  onOpen={() => setOpenId(artifact.id)}
                />
              ))}
            </div>
          </div>

          {/* ── Layer 2: Thumbnails (1280x720 / 16:9 Landscape — 2x2 grid) ── */}
          <div className="w-full pt-2">
            <div className="flex items-center justify-between mb-3.5 px-0.5">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#c59b4a]" />
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/50">
                  THUMBNAIL SUITE // 16:9 LANDSCAPE (1280×720)
                </span>
              </div>
              <span className="font-mono text-[9px] tracking-[0.2em] text-white/25">
                [{thumbnails.length} ASSETS]
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
              {thumbnails.map((artifact, i) => (
                <ArtifactGridCard
                  key={artifact.id}
                  artifact={artifact}
                  aspectRatioClass="aspect-[16/9]"
                  delay={sectionDelay + 0.18 + i * 0.08}
                  onOpen={() => setOpenId(artifact.id)}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
          {artifacts.map((artifact, i) => (
            <ArtifactGridCard
              key={artifact.id}
              artifact={artifact}
              delay={sectionDelay + 0.08 + i * 0.09}
              onOpen={() => setOpenId(artifact.id)}
            />
          ))}
        </div>
      )}

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
