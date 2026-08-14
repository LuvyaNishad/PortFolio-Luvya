"use client";

import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { X, ShieldCheck, Mail } from "lucide-react";
import type { SVGProps } from "react";

/* ─── Reusable corner bracket ornament ─── */
function TacticalBrackets({
  accent = "#c5a880",
  size = 6,
  className = "",
}: {
  accent?: string;
  size?: number;
  className?: string;
}) {
  const px = `${size}px`;
  const style = (borders: Record<string, string>): React.CSSProperties => ({
    position: "absolute",
    width: "18px",
    height: "18px",
    ...borders,
  });

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <div
        style={style({
          top: px,
          left: px,
          borderLeft: `1.5px solid ${accent}`,
          borderTop: `1.5px solid ${accent}`,
        })}
      />
      <div
        style={style({
          top: px,
          right: px,
          borderRight: "1.5px solid rgba(255,255,255,0.15)",
          borderTop: "1.5px solid rgba(255,255,255,0.15)",
        })}
      />
      <div
        style={style({
          bottom: px,
          left: px,
          borderLeft: "1.5px solid rgba(255,255,255,0.15)",
          borderBottom: "1.5px solid rgba(255,255,255,0.15)",
        })}
      />
      <div
        style={style({
          bottom: px,
          right: px,
          borderRight: `1.5px solid ${accent}`,
          borderBottom: `1.5px solid ${accent}`,
        })}
      />
    </div>
  );
}

export function AboutModal({ onClose }: { onClose: () => void }) {
  const accent = "#c5a880";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const specs = [
    { label: "ROLE", value: "Product Designer & Technologist" },
    { label: "EXPERIENCE", value: "5+ Years Crafting Digital Systems" },
    { label: "LOCATION", value: "Remote / Global Mobility" },
    { label: "METHODOLOGY", value: "Intentional, Tactile & Systems-First" },
    { label: "CORE TOOLS", value: "Figma, React, Next.js, Framer, Tailwind" },
    { label: "STATUS", value: "Available for Q1/Q2 Projects" },
  ];

  const tags = [
    "PRODUCT DESIGN",
    "DESIGN SYSTEMS",
    "UI/UX ARCHITECTURE",
    "CREATIVE TECH",
    "MOTION & 3D",
  ];

  const timelineData = [
    {
      year: "2023 - Present",
      title: "Senior UI/UX Designer",
      company: "Freelance / Global",
      description: "Designing end-to-end digital experiences, scaling design systems, and building interactive web apps using React and Next.js."
    },
    {
      year: "2021 - 2023",
      title: "Product Designer",
      company: "Tech Solutions Inc.",
      description: "Led the redesign of core enterprise applications, improving user retention and streamlining complex workflows."
    },
    {
      year: "2018 - 2021",
      title: "B.Des in Visual Communication",
      company: "Design Institute",
      description: "Graduated with honors. Specialized in human-computer interaction, typography, and creative technology."
    }
  ];

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Full-screen Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        className="fixed inset-0"
        style={{
          background: "rgba(6,6,8,0.92)",
          backdropFilter: "blur(20px) saturate(0.8)",
          WebkitBackdropFilter: "blur(20px) saturate(0.8)",
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

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[1280px] max-h-[90vh] bg-[#0c0c0f]/95 overflow-hidden border border-white/10 z-10 flex flex-col md:flex-row my-auto"
        style={{
          boxShadow: `
            0 32px 80px -20px rgba(0,0,0,0.85),
            0 0 1px 0 rgba(255,255,255,0.12),
            inset 0 1px 0 0 rgba(255,255,255,0.08),
            0 0 60px -10px ${accent}20
          `,
        }}
      >
        {/* Top specular edge */}
        <div
          className="absolute top-0 left-0 right-0 h-px z-30 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 30%, rgba(197,168,128,0.4) 50%, rgba(255,255,255,0.18) 70%, transparent 100%)",
          }}
        />

        {/* Corner brackets */}
        <TacticalBrackets accent={accent} size={8} />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-30 flex items-center gap-2 px-2.5 py-1.5 bg-black/60 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 group/close"
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

        {/* ─── LEFT: Portrait / Visual Viewport ─── */}
        <div className="relative h-48 sm:h-64 w-full shrink-0 overflow-hidden md:h-auto md:w-[360px] lg:w-[400px] bg-black/40">
          {/* Symmetrical background artwork & portrait frame */}
          <img
            src="/images/hero_bg.jpg"
            alt="Aurelius Environment"
            className="h-full w-full object-cover"
            style={{ filter: "grayscale(100%) brightness(0.65) contrast(1.15)" }}
          />

          {/* Central avatar / monolith glow effect */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-36 h-36 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(197,168,128,0.25) 0%, rgba(197,168,128,0.06) 45%, transparent 70%)",
                filter: "blur(20px)",
              }}
            />
          </div>

          {/* Monolith accent floating icon in center of frame */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative w-28 h-28 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-[#c5a880]/30 border-dashed animate-[spin_40s_linear_infinite]" />
              <div className="absolute inset-2 rounded-full border border-white/10" />
              <img
                src="/images/monolith.png"
                alt="Monolith Symbol"
                className="w-16 h-16 object-contain drop-shadow-[0_0_20px_rgba(197,168,128,0.4)]"
              />
            </div>
          </div>

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0f] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#0c0c0f]/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

          {/* Scanlines */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 3px)",
            }}
            aria-hidden="true"
          />

          {/* Operator ID badge */}
          <div className="absolute bottom-4 left-4 z-20">
            <div
              className="flex items-center gap-2 px-2.5 py-1.5 border border-white/10"
              style={{
                background: "rgba(0,0,0,0.65)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div className="h-1.5 w-1.5 rounded-full bg-[#c5a880] animate-pulse" />
              <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-white/60">
                OPERATOR // AURELIUS_01
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

        {/* ─── RIGHT: Dossier Content (Scrollable) ─── */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto max-h-[calc(90vh-12rem)] md:max-h-[85vh] expandable-card-scrollbar relative">
          <div className="p-5 sm:p-7 md:p-8 lg:p-10 flex flex-col gap-8 md:gap-10">
            {/* Category breadcrumb */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-white/35">
                DOSSIER // PERSONNEL
              </span>
              <span className="text-white/15 font-mono text-[8px]">//</span>
              <span
                className="font-mono text-[8px] tracking-[0.2em] uppercase"
                style={{ color: accent }}
              >
                ABOUT THE DESIGNER
              </span>
            </div>

            {/* Title block */}
            <div className="border-b border-white/8 pb-6">
              <p
                className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] uppercase mb-2 font-medium"
                style={{ color: accent }}
              >
                Product Designer &amp; Technologist
              </p>
              <h3 className="font-display text-4xl sm:text-5xl uppercase leading-none text-white tracking-[0.02em]">
                AURELIUS{" "}
                <span className="font-serif italic font-normal normal-case text-3xl sm:text-4xl text-[#e5be8a] ml-1">
                  Behind the Craft
                </span>
              </h3>
            </div>

            {/* Top Grid section */}
            <div className="flex flex-col xl:flex-row gap-8 xl:gap-12">
              <div className="flex-1 space-y-6">
                <div>
                  <h4 className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/40 mb-3 flex items-center gap-2">
                    <span className="text-[#c5a880]">//</span> 01. WHO I AM
                  </h4>
                  <p className="font-sans text-[14px] leading-[1.8] text-white/70">
                    I am a multidisciplinary product designer and creative engineer with a passion for building intentional, high-fidelity digital systems. I operate at the intersection of strategic user experience, evocative visual aesthetics, and resilient frontend code. Rather than treating design and development as separate silos, I unify them into a single holistic craft.
                  </p>
                </div>
                
                {/* Tags row */}
                <div>
                  <h4 className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/40 mb-3 flex items-center gap-2">
                    <span className="text-[#c5a880]">//</span> DISCIPLINE
                  </h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 font-mono text-[9px] tracking-[0.15em] uppercase border border-white/10 bg-white/[0.03] text-white/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Specs grid */}
              <div className="xl:w-[40%]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  {specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="p-3 border border-white/6 bg-white/[0.02] rounded-none"
                    >
                      <span className="block font-mono text-[8px] tracking-[0.18em] uppercase text-white/35 mb-1">
                        {spec.label}
                      </span>
                      <span className="block font-mono text-[11px] tracking-[0.02em] text-white/75">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Journey Timeline */}
            <div className="mt-4">
              <h4 className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/40 mb-6 flex items-center gap-2">
                <span className="text-[#c5a880]">//</span> 02. JOURNEY &amp; EDUCATION
              </h4>
              
              <div className="relative border-l border-white/10 pl-6 sm:pl-8 ml-3 space-y-8">
                {timelineData.map((item, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-3 w-3 rounded-full border-[3px] border-[#0c0c0f] bg-[#c5a880]" />
                    <span className="font-mono text-[9px] tracking-[0.2em] text-[#c5a880] uppercase">
                      {item.year}
                    </span>
                    <h4 className="font-display text-xl sm:text-2xl text-white mt-1 uppercase tracking-wide">
                      {item.title}
                    </h4>
                    <span className="font-mono text-[10px] text-white/50 uppercase block mb-3 tracking-[0.1em]">
                      {item.company}
                    </span>
                    <p className="font-sans text-[13px] sm:text-[14px] text-white/60 leading-relaxed max-w-2xl">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom action bar */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/8 pt-6">
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <div className="flex items-center gap-2 shrink-0">
                  <ShieldCheck size={14} className="text-[#c5a880]" />
                  <span className="font-mono text-[8px] tracking-[0.18em] uppercase text-white/35">
                    IDENTITY VERIFIED
                  </span>
                </div>

                {/* Social Links */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/20 transition-all group"
                  >
                    <XIcon className="w-3 h-3 text-white/40 group-hover:text-white/80 transition-colors" />
                    <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-white/50 group-hover:text-white/90 transition-colors">X</span>
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/20 transition-all group"
                  >
                    <Linkedin className="w-3 h-3 text-white/40 group-hover:text-white/80 transition-colors" />
                    <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-white/50 group-hover:text-white/90 transition-colors">LinkedIn</span>
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/20 transition-all group"
                  >
                    <Github className="w-3 h-3 text-white/40 group-hover:text-white/80 transition-colors" />
                    <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-white/50 group-hover:text-white/90 transition-colors">GitHub</span>
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/20 transition-all group"
                  >
                    <Youtube className="w-3 h-3 text-white/40 group-hover:text-white/80 transition-colors" />
                    <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-white/50 group-hover:text-white/90 transition-colors">YouTube</span>
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-end shrink-0">
                <a
                  href="#contact"
                  onClick={onClose}
                  className="px-5 py-2.5 border border-white/12 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/25 transition-all text-white/70 hover:text-white font-mono text-[9px] tracking-[0.18em] uppercase flex items-center gap-2"
                >
                  <Mail size={12} className="text-[#c5a880]" />
                  GET IN TOUCH
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}

/* ── Icon Components ───────────────────────────────────── */

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function Linkedin(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function Github(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function Youtube(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 7.1C2.5 7.1 2.3 5 4.3 3c2.3-2.3 5.8-2.3 9.7-2.3S19.4.7 21.7 3c2 2 1.8 4.1 1.8 4.1s.2 1.7.2 3.4v3c0 1.7-.2 3.4-.2 3.4s.2 2.1-1.8 4.1c-2.3 2.3-6.2 2.3-9.7 2.3S6.6 23.3 4.3 21c-2-2-1.8-4.1-1.8-4.1s-.2-1.7-.2-3.4v-3c0-1.7.2-3.4.2-3.4z" />
      <path d="m9.5 15.5 7-3.5-7-3.5z" />
    </svg>
  );
}
