"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";

/* ─────────────────────────────────────────────────
   ShowcaseSlot — shared tactical "awaiting asset" card.

   Rendered in a showcase category when it has no work
   entries yet (empty data array), or to fill remaining
   grid positions. Reads as an intentional, on-brand
   inventory slot — never a broken image.

   To populate a category with real work, add an entry to
   its data array (see src/data/visualArtifacts.ts,
   motionArtifacts.ts, projects.ts). Real cards replace
   these slots automatically.
───────────────────────────────────────────────── */
export function ShowcaseSlot({
  prefix,
  accent,
  delay = 0,
  label = "SLOT AVAILABLE",
  sublabel = "Awaiting deployment",
}: {
  prefix: string;
  accent: string;
  delay?: number;
  label?: string;
  sublabel?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, x: -8, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ delay, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <div className="relative border border-dashed border-white/12 bg-black/20 aspect-[4/3] flex items-center justify-center overflow-hidden transition-all duration-500 hover:border-white/25 hover:bg-black/35">
        {/* Corner brackets with viewfinder outward hover expansion */}
        <div className="absolute top-2.5 left-2.5 h-3.5 w-3.5 border-l border-t border-dashed border-white/20 transition-all duration-300 ease-out group-hover:top-1.5 group-hover:left-1.5 group-hover:border-white/45" />
        <div className="absolute top-2.5 right-2.5 h-3.5 w-3.5 border-r border-t border-dashed border-white/20 transition-all duration-300 ease-out group-hover:top-1.5 group-hover:right-1.5 group-hover:border-white/45" />
        <div className="absolute bottom-2.5 left-2.5 h-3.5 w-3.5 border-b border-l border-dashed border-white/20 transition-all duration-300 ease-out group-hover:bottom-1.5 group-hover:left-1.5 group-hover:border-white/45" />
        <div className="absolute bottom-2.5 right-2.5 h-3.5 w-3.5 border-b border-r border-dashed border-white/20 transition-all duration-300 ease-out group-hover:bottom-1.5 group-hover:right-1.5 group-hover:border-white/45" />

        {/* Center category code */}
        <div className="flex flex-col items-center gap-3">
          <span className="font-mono text-[13px] tracking-[0.15em] text-white/25 group-hover:text-white/40 transition-colors duration-300">
            {prefix}
          </span>
        </div>
      </div>

      {/* Label below card */}
      <div className="mt-3 flex items-center justify-between">
        <div>
          <span
            className="block font-mono text-[10px] uppercase tracking-[0.12em] transition-colors duration-500 group-hover:brightness-125"
            style={{ color: accent }}
          >
            {label}
          </span>
          <span className="block mt-0.5 font-mono text-[9px] tracking-[0.05em] text-white/30">
            {sublabel}
          </span>
        </div>
        <Plus
          size={14}
          strokeWidth={1.4}
          className="transition-all duration-500 group-hover:rotate-90"
          style={{ color: accent }}
        />
      </div>
    </motion.div>
  );
}
