"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";

/**
 * ResumeDropdown
 *
 * A gold-accented capsule button that lives at the right end of the navbar.
 * Clicking it reveals a liquid-glass dropdown with two resume options
 * (Design / Developer). Each option opens the PDF in a new tab and
 * offers a download action.
 *
 * Auto-hides if both resume URLs are empty.
 */

const RESUME_OPTIONS = [
  {
    key: "design" as const,
    label: "Design",
    description: "UI/UX & Visual",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    key: "developer" as const,
    label: "Developer",
    description: "Engineering",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="14" y1="4" x2="10" y2="20" />
      </svg>
    ),
  },
];

const DownloadIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export function ResumeDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check if at least one resume is configured
  const hasResumes =
    siteConfig.resumes.design.trim().length > 0 ||
    siteConfig.resumes.developer.trim().length > 0;

  const close = useCallback(() => setIsOpen(false), []);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, close]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, close]);

  // Close on scroll
  useEffect(() => {
    if (!isOpen) return;
    const handleScroll = () => close();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen, close]);

  if (!hasResumes) return null;

  const goldGradient = `conic-gradient(from var(--resume-gradient-angle), transparent 0%, rgba(197,168,128,0.6) 38%, #c5a880 50%, rgba(197,168,128,0.6) 62%, transparent 100%)`;

  const handleDownload = (e: React.MouseEvent, key: string, label: string) => {
    e.stopPropagation();
    e.preventDefault();
    const link = document.createElement("a");
    link.href = `/api/resumes/download/${key}`;
    link.download = `Luvya-Nishad-${label}-Resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div ref={containerRef} className="relative">
      {/* ─── Trigger Button ─── */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="group relative isolate inline-flex items-center justify-center gap-1.5 sm:gap-2.5 overflow-hidden rounded-full bg-neutral-950 px-3 py-1.5 sm:px-5 sm:py-2 ml-1 sm:ml-2 text-[9px] sm:text-[11px] font-mono tracking-[0.14em] sm:tracking-[0.18em] uppercase text-white/80 hover:text-white transition-all duration-300 shadow-[0_0_20px_-8px_rgba(197,168,128,0.3)] hover:shadow-[0_0_28px_-6px_rgba(197,168,128,0.5)] border-0 cursor-pointer focus:outline-none"
      >
        {/* Rotating gold gradient border */}
        <div
          className="absolute inset-0 -z-10 rounded-full p-[1px] animate-resume-border-spin"
          style={{
            "--resume-gradient-angle": "0deg",
            background: goldGradient,
          } as React.CSSProperties}
        />
        {/* Inner solid bg */}
        <div className="absolute inset-[1px] -z-10 rounded-full bg-neutral-950" />
        {/* Hover shine overlay */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(197,168,128,0.2)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Pulsing gold dot */}
        <span
          className="block w-[5px] h-[5px] rounded-full bg-[#c5a880]"
          style={{ animation: "resume-dot-pulse 2.5s ease-in-out infinite" }}
        />

        <span className="relative z-10">RESUME</span>

        {/* Chevron */}
        <motion.svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="opacity-50"
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </motion.button>

      {/* ─── Dropdown Panel ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-[calc(100%+10px)] z-[60] w-[220px] sm:w-[240px] overflow-hidden rounded-xl"
            style={{
              background: "rgba(10, 10, 14, 0.85)",
              backdropFilter: "blur(24px) saturate(1.3) brightness(0.82)",
              WebkitBackdropFilter: "blur(24px) saturate(1.3) brightness(0.82)",
              boxShadow:
                "0 20px 60px -15px rgba(0,0,0,0.7), 0 0 1px 0 rgba(197,168,128,0.3), inset 0 1px 0 0 rgba(255,255,255,0.1), inset 0 -1px 0 0 rgba(255,255,255,0.03)",
              border: "1px solid rgba(197,168,128,0.15)",
            }}
          >
            {/* Top-edge specular shine */}
            <div
              className="absolute left-0 right-0 top-0 h-[1px] pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(197,168,128,0.35) 30%, rgba(197,168,128,0.5) 50%, rgba(197,168,128,0.35) 70%, transparent 100%)",
                zIndex: 5,
              }}
            />

            {/* Light caustic overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                zIndex: 1,
                background: `
                  radial-gradient(ellipse 80% 55% at 15% 10%, rgba(197,168,128,0.06) 0%, transparent 70%),
                  radial-gradient(ellipse 60% 40% at 85% 85%, rgba(255,255,255,0.02) 0%, transparent 70%),
                  linear-gradient(160deg, rgba(197,168,128,0.04) 0%, transparent 45%, rgba(0,0,0,0.1) 100%)
                `,
              }}
            />

            {/* Corner brackets — tactical HUD motif */}
            <div className="absolute top-2 left-2 w-[8px] h-[8px] border-t border-l border-[rgba(197,168,128,0.35)] pointer-events-none" style={{ zIndex: 5 }} />
            <div className="absolute top-2 right-2 w-[8px] h-[8px] border-t border-r border-[rgba(197,168,128,0.35)] pointer-events-none" style={{ zIndex: 5 }} />
            <div className="absolute bottom-2 left-2 w-[8px] h-[8px] border-b border-l border-[rgba(197,168,128,0.35)] pointer-events-none" style={{ zIndex: 5 }} />
            <div className="absolute bottom-2 right-2 w-[8px] h-[8px] border-b border-r border-[rgba(197,168,128,0.35)] pointer-events-none" style={{ zIndex: 5 }} />

            {/* Dropdown header */}
            <div className="relative px-4 pt-3.5 pb-2" style={{ zIndex: 10 }}>
              <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-white/35">
                Select Resume
              </span>
            </div>

            {/* Divider */}
            <div className="mx-3 h-[1px] bg-white/[0.06]" style={{ zIndex: 10, position: "relative" }} />

            {/* Resume options */}
            <div className="relative py-1.5" style={{ zIndex: 10 }}>
              {RESUME_OPTIONS.map((option) => {
                const url = siteConfig.resumes[option.key];
                if (!url || url.trim().length === 0) return null;

                return (
                  <a
                    key={option.key}
                    href={`/resumes/${option.key}`}
                    className="group/item flex items-center gap-3 px-4 py-2.5 transition-all duration-200 hover:bg-white/[0.04] cursor-pointer"
                    onClick={() => close()}
                  >
                    {/* Icon */}
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#c5a880]/70 group-hover/item:text-[#c5a880] group-hover/item:border-[rgba(197,168,128,0.25)] group-hover/item:bg-[rgba(197,168,128,0.06)] transition-all duration-200">
                      {option.icon}
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-mono tracking-[0.12em] uppercase text-white/80 group-hover/item:text-white transition-colors duration-200">
                        {option.label}
                      </div>
                      <div className="text-[9px] font-mono tracking-[0.08em] text-white/30 mt-0.5">
                        {option.description}
                      </div>
                    </div>

                    {/* Download button */}
                    <button
                      onClick={(e) => handleDownload(e, option.key, option.label)}
                      className="flex-shrink-0 w-7 h-7 rounded-md bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-white/30 hover:text-[#c5a880] hover:border-[rgba(197,168,128,0.3)] hover:bg-[rgba(197,168,128,0.08)] transition-all duration-200 cursor-pointer"
                      title={`Download ${option.label} Resume`}
                      aria-label={`Download ${option.label} Resume`}
                    >
                      <DownloadIcon />
                    </button>
                  </a>
                );
              })}
            </div>

            {/* Footer hint */}
            <div className="relative px-4 pb-3 pt-1" style={{ zIndex: 10 }}>
              <div className="h-[1px] bg-white/[0.06] mb-2" />
              <span className="text-[8px] font-mono tracking-[0.15em] uppercase text-white/20">
                Click to view · ↓ to download
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
