"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { LightBeamButton } from "@/components/ui/LightBeamButton";
import { LimelightNav } from "@/components/ui/limelight-nav";
import { useActiveSection } from "@/hooks/use-active-section";

const NAV_LINKS = [
  { id: 'home', label: 'HOME', href: '#home' },
  { id: 'about', label: 'ABOUT', href: '#about' },
  { id: 'tools', label: 'TOOLS', href: '#tools' },
  { id: 'library', label: 'LIBRARY', href: '#library' },
  { id: 'built-from-scratch', label: 'SHOWCASE', href: '#built-from-scratch' },
  { id: 'contact', label: 'CONTACT', href: '#contact' }
];

export function Navbar() {
  const scrollActiveIndex = useActiveSection(NAV_LINKS.map(link => link.id));
  const [activeIndex, setActiveIndex] = useState(0);
  const isManualScrollRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sync scroll active index only if we are not in a manual click-scroll
  useEffect(() => {
    if (!isManualScrollRef.current) {
      setActiveIndex(scrollActiveIndex);
    }
  }, [scrollActiveIndex]);

  const handleTabChange = (index: number) => {
    setActiveIndex(index);
    isManualScrollRef.current = true;
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    // Lock scroll active-index updates for 1000ms until smooth-scroll lands
    timeoutRef.current = setTimeout(() => {
      isManualScrollRef.current = false;
    }, 1000);
  };

  // Cleanup timers on component destruction
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      // IMPORTANT: NO backdrop-blur here — blur on a fixed full-width header
      // bleeds into all page content underneath it. Blur only on the inner pill.
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-2 pt-4 pb-3 sm:pt-6 pointer-events-none"
    >
      {/* Pill nav container — blur is scoped ONLY to this element */}
      <div className="flex max-w-[calc(100vw-1rem)] items-center gap-0 overflow-x-auto border border-white/10 rounded-full bg-black/30 backdrop-blur-md px-1.5 py-1.5 shadow-[0_12px_34px_rgba(0,0,0,0.22)] pointer-events-auto sm:max-w-none sm:overflow-visible sm:px-2" style={{ isolation: "isolate", scrollbarWidth: "none" }}>
        {/* Logo shield mark */}
        <div className="hidden items-center justify-center w-9 h-9 mr-2 border border-white/12 rounded-full bg-white/[0.02] sm:flex">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white/80">
            <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6L12 2z" 
                  fill="currentColor" fillOpacity="0.85"/>
          </svg>
        </div>

        <LimelightNav 
          items={NAV_LINKS}
          activeIndex={activeIndex}
          onTabChange={handleTabChange}
          className="border-none bg-transparent h-auto p-0"
          itemClassName="px-1.5 py-2 !p-1.5 sm:!px-3 sm:!py-2 md:!px-5 md:!py-2"
          labelClassName="text-[9px] font-mono tracking-[0.1em] sm:text-[10px] sm:tracking-[0.13em] md:text-[11px] md:tracking-[0.15em]"
        />

        {/* Resume button */}
        <LightBeamButton href="#" className="ml-2 hidden px-5 py-2 text-[11px] tracking-[0.15em] sm:inline-flex">
          RESUME <span className="text-white/50">→</span>
        </LightBeamButton>
      </div>
    </motion.header>
  );
}
