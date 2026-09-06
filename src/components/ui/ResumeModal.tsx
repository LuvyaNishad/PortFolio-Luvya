"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";

/**
 * ResumeModal
 *
 * A centered fullscreen overlay modal for selecting between
 * Design and Developer resumes. Triggered by:
 *   - Navbar Resume button (on mobile)
 *   - Hero Resume CTA button
 *
 * Each option opens the resume viewer page; the download icon
 * triggers a direct PDF download.
 */

const RESUME_OPTIONS = [
  {
    key: "design" as const,
    label: "Design",
    description: "UI/UX & Visual",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="14" y1="4" x2="10" y2="20" />
      </svg>
    ),
  },
];

const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  // Close on Escape
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", handleKey);
    // Prevent body scroll while modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKey]);

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
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[min(320px,90vw)] overflow-hidden rounded-2xl"
            style={{
              background: "rgba(10, 10, 14, 0.92)",
              backdropFilter: "blur(32px) saturate(1.3) brightness(0.82)",
              WebkitBackdropFilter: "blur(32px) saturate(1.3) brightness(0.82)",
              boxShadow:
                "0 25px 80px -15px rgba(0,0,0,0.8), 0 0 1px 0 rgba(197,168,128,0.3), inset 0 1px 0 0 rgba(255,255,255,0.1), inset 0 -1px 0 0 rgba(255,255,255,0.03)",
              border: "1px solid rgba(197,168,128,0.2)",
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

            {/* Corner brackets — tactical HUD motif */}
            <div className="absolute top-3 left-3 w-[10px] h-[10px] border-t border-l border-[rgba(197,168,128,0.35)] pointer-events-none" style={{ zIndex: 5 }} />
            <div className="absolute top-3 right-3 w-[10px] h-[10px] border-t border-r border-[rgba(197,168,128,0.35)] pointer-events-none" style={{ zIndex: 5 }} />
            <div className="absolute bottom-3 left-3 w-[10px] h-[10px] border-b border-l border-[rgba(197,168,128,0.35)] pointer-events-none" style={{ zIndex: 5 }} />
            <div className="absolute bottom-3 right-3 w-[10px] h-[10px] border-b border-r border-[rgba(197,168,128,0.35)] pointer-events-none" style={{ zIndex: 5 }} />

            {/* Header */}
            <div className="relative px-5 pt-5 pb-3" style={{ zIndex: 10 }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="block w-[5px] h-[5px] rounded-full bg-[#c5a880]"
                    style={{ animation: "resume-dot-pulse 2.5s ease-in-out infinite" }}
                  />
                  <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-white/60">
                    Select Resume
                  </span>
                </div>
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/40 hover:text-white/80 hover:border-white/20 transition-all duration-200 cursor-pointer"
                  aria-label="Close"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="mx-4 h-[1px] bg-white/[0.06]" style={{ zIndex: 10, position: "relative" }} />

            {/* Resume options */}
            <div className="relative py-2 px-1" style={{ zIndex: 10 }}>
              {RESUME_OPTIONS.map((option) => {
                const url = siteConfig.resumes[option.key];
                if (!url || url.trim().length === 0) return null;

                return (
                  <a
                    key={option.key}
                    href={`/resumes/${option.key}`}
                    className="group/item flex items-center gap-4 px-4 py-3.5 mx-1 rounded-xl transition-all duration-200 hover:bg-white/[0.05] cursor-pointer"
                    onClick={onClose}
                  >
                    {/* Icon */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#c5a880]/70 group-hover/item:text-[#c5a880] group-hover/item:border-[rgba(197,168,128,0.25)] group-hover/item:bg-[rgba(197,168,128,0.06)] transition-all duration-200">
                      {option.icon}
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] font-mono tracking-[0.12em] uppercase text-white/80 group-hover/item:text-white transition-colors duration-200">
                        {option.label}
                      </div>
                      <div className="text-[10px] font-mono tracking-[0.08em] text-white/30 mt-0.5">
                        {option.description}
                      </div>
                    </div>

                    {/* Download button */}
                    <button
                      onClick={(e) => handleDownload(e, option.key, option.label)}
                      className="flex-shrink-0 w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-white/30 hover:text-[#c5a880] hover:border-[rgba(197,168,128,0.3)] hover:bg-[rgba(197,168,128,0.08)] transition-all duration-200 cursor-pointer"
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
            <div className="relative px-5 pb-4 pt-1" style={{ zIndex: 10 }}>
              <div className="h-[1px] bg-white/[0.06] mb-2.5" />
              <span className="text-[9px] font-mono tracking-[0.15em] uppercase text-white/20">
                Tap to view · ↓ to download
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
