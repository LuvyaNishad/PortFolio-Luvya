"use client";

import { motion } from "framer-motion";
import { LightBeamButton } from "@/components/ui/LightBeamButton";

const NAV_LINKS = ["HOME", "ABOUT", "WORK", "EXPERIENCE", "CONTACT"] as const;

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      // IMPORTANT: NO backdrop-blur here — blur on a fixed full-width header
      // bleeds into all page content underneath it. Blur only on the inner pill.
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-8 pt-6 pb-3"
    >
      {/* Pill nav container — blur is scoped ONLY to this element */}
      <div className="flex items-center gap-0 border border-white/18 rounded-full bg-black/60 backdrop-blur-md px-2 py-1.5" style={{ isolation: "isolate" }}>
        {/* Logo shield mark */}
        <div className="flex items-center justify-center w-9 h-9 mr-2 border border-white/20 rounded-full bg-black/40">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white/80">
            <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6L12 2z" 
                  fill="currentColor" fillOpacity="0.85"/>
          </svg>
        </div>

        {/* Links */}
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="px-5 py-2 text-[11px] font-mono tracking-[0.15em] text-white/60 hover:text-white/95 transition-colors duration-300"
          >
            {link}
          </a>
        ))}

        {/* Resume button */}
        <LightBeamButton href="#" className="ml-2 px-5 py-2 text-[11px] tracking-[0.15em]">
          RESUME <span className="text-white/50">→</span>
        </LightBeamButton>
      </div>
    </motion.header>
  );
}
