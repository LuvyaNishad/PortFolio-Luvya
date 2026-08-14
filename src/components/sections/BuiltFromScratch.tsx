"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { MetadataText } from "@/components/ui/MetadataText";
import { ExpandableArtifactCards } from "@/components/ui/ExpandableArtifactCard";
import { ExpandableMotionCards } from "@/components/ui/ExpandableMotionCard";
import { VISUAL_ARTIFACTS } from "@/data/visualArtifacts";
import { MOTION_ARTIFACTS } from "@/data/motionArtifacts";

/* ─── Category data matching Work Library chronology ─── */
type ShowcaseCategory = {
  id: string;
  index: string;
  label: string;
  title: string;
  titleAccent: string;
  description: string;
  accent: string;
  cardPrefix: string;
  cardCount: number;
};

const categories: ShowcaseCategory[] = [
  {
    id: "graphic-design-showcase",
    index: "01",
    label: "GRAPHIC DESIGN",
    title: "VISUAL",
    titleAccent: "Artifacts",
    description:
      "Posters, branding, print systems,\nand dark editorial layouts.",
    accent: "#78936f",
    cardPrefix: "GD",
    cardCount: 4,
  },
  {
    id: "video-edits-showcase",
    index: "02",
    label: "VIDEO EDITS",
    title: "MOTION &",
    titleAccent: "Storytelling",
    description:
      "Reels, short-form content, long-form narratives,\nand cinematic brand films.",
    accent: "#c5261a",
    cardPrefix: "VD",
    cardCount: 4,
  },
  {
    id: "ui-ux-design-showcase",
    index: "03",
    label: "UI/UX DESIGN",
    title: "INTERFACE",
    titleAccent: "Systems",
    description:
      "Dashboards, dark-themed flows,\nand tactical product studies.",
    accent: "#d6d6d8",
    cardPrefix: "UX",
    cardCount: 4,
  },
  {
    id: "code-projects-showcase",
    index: "04",
    label: "CODE PROJECTS",
    title: "BUILT FROM",
    titleAccent: "Scratch",
    description:
      "Web apps, experiments, open-source tools\nand interactive experiences.",
    accent: "#c59b4a",
    cardPrefix: "CD",
    cardCount: 4,
  },
];

/* ─── Placeholder project card ─── */
function ProjectSlot({
  prefix,
  accent,
  delay,
}: {
  prefix: string;
  accent: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <div className="relative border border-dashed border-white/12 bg-black/20 aspect-[4/3] flex items-center justify-center overflow-hidden transition-colors duration-500 hover:border-white/20 hover:bg-black/30">
        {/* Corner brackets */}
        <div className="absolute top-2 left-2 h-3 w-3 border-l border-t border-dashed border-white/15" />
        <div className="absolute top-2 right-2 h-3 w-3 border-r border-t border-dashed border-white/15" />
        <div className="absolute bottom-2 left-2 h-3 w-3 border-b border-l border-dashed border-white/15" />
        <div className="absolute bottom-2 right-2 h-3 w-3 border-b border-r border-dashed border-white/15" />

        {/* Center code icon */}
        <div className="flex flex-col items-center gap-3">
          <span className="font-mono text-[13px] tracking-[0.15em] text-white/18">
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
            ADD PROJECT
          </span>
          <span className="block mt-0.5 font-mono text-[9px] tracking-[0.05em] text-white/30">
            Click for template
          </span>
        </div>
        <Plus
          size={14}
          strokeWidth={1.4}
          className="text-white/25 transition-all duration-500 group-hover:rotate-90"
          style={{ color: accent }}
        />
      </div>
    </motion.div>
  );
}

/* ─── Single category subsection ─── */
function CategoryBlock({
  category,
  sectionDelay,
}: {
  category: ShowcaseCategory;
  sectionDelay: number;
}) {
  return (
    <div id={category.id} className="relative py-16 lg:py-20 scroll-mt-24 md:scroll-mt-32">
      {/* Left vertical sidebar text */}
      <div className="hidden lg:flex absolute left-0 top-0 bottom-0 items-center">
        <span
          className="font-mono text-[8px] uppercase tracking-[0.28em] text-white/15"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            transform: "rotate(180deg)",
          }}
        >
          AURELIUS LIBRARY // SECTION {category.index}
        </span>
      </div>

      {/* Right vertical sidebar text */}
      <div className="hidden lg:flex absolute right-0 top-0 bottom-0 items-center">
        <span
          className="font-mono text-[8px] uppercase tracking-[0.28em]"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            color: category.accent,
            opacity: 0.35,
          }}
        >
          {category.title} {category.titleAccent.toUpperCase()}
        </span>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{
          delay: sectionDelay,
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="mb-10 lg:pl-8"
      >
        <span
          className="font-mono text-[10px] uppercase tracking-[0.2em]"
          style={{ color: category.accent }}
        >
          // {category.label}
        </span>

        <h3 className="mt-3 font-display text-[clamp(2rem,5vw,4rem)] uppercase leading-[0.95] text-white">
          {category.title}{" "}
          <span
            className="font-serif italic font-normal normal-case"
            style={{ color: category.accent, opacity: 0.8 }}
          >
            {category.titleAccent}
          </span>
        </h3>

        <p className="mt-4 max-w-[380px] font-mono text-[10.5px] leading-[1.7] tracking-[0.03em] text-white/35 whitespace-pre-line">
          {category.description}
        </p>
      </motion.div>

      {/* Cards grid — 4 columns on desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5 lg:px-8">
        {category.id === "graphic-design-showcase" ? (
          <ExpandableArtifactCards
            artifacts={VISUAL_ARTIFACTS}
            accent={category.accent}
            sectionDelay={sectionDelay}
          />
        ) : category.id === "video-edits-showcase" ? (
          <ExpandableMotionCards
            artifacts={MOTION_ARTIFACTS}
            accent={category.accent}
            sectionDelay={sectionDelay}
          />
        ) : (
          Array.from({ length: category.cardCount }).map((_, i) => (
            <ProjectSlot
              key={i}
              prefix={category.cardPrefix}
              accent={category.accent}
              delay={sectionDelay + 0.08 + i * 0.06}
            />
          ))
        )}
      </div>
    </div>
  );
}

/* ─── Main section export ─── */
export function BuiltFromScratch() {
  return (
    <section
      id="built-from-scratch"
      className="relative overflow-hidden bg-[#0a0a0c] border-t border-white/5 scroll-mt-24 md:scroll-mt-32"
    >
      {/* Background Image — section_bg.png spanning all 4 showcase categories */}
      <div
        className="absolute inset-0 showcase-bg-mask"
        style={{
          backgroundImage: "url('/images/section_bg.png')",
          backgroundSize: "100% auto",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          filter: "brightness(1) contrast(1)",
          opacity: 0.7,
        }}
        aria-hidden="true"
      />

      {/* Vignette + gradient overlays for seamless blending at section boundaries */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(to bottom, #0a0a0c 0%, transparent 6%, transparent 94%, #0a0a0c 100%),
            radial-gradient(ellipse at 50% 8%, transparent 40%, rgba(10,10,12,0.5) 80%),
            linear-gradient(to right, rgba(10,10,12,0.4) 0%, transparent 15%, transparent 85%, rgba(10,10,12,0.4) 100%)
          `,
        }}
        aria-hidden="true"
      />

      {/* Top corner brackets — tactical frame */}
      <div className="hidden lg:block absolute top-6 left-6 h-8 w-8 border-l-2 border-t-2 border-[#c5261a]/40" />
      <div className="hidden lg:block absolute top-6 right-6 h-8 w-8 border-r-2 border-t-2 border-white/10" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-14 pt-20 pb-6">
        {/* Category subsections */}
        {categories.map((cat, idx) => (
          <div key={cat.id}>
            <CategoryBlock category={cat} sectionDelay={0.05} />
            {/* Divider between categories */}
            {idx < categories.length - 1 && (
              <div className="border-t border-white/5" />
            )}
          </div>
        ))}

        {/* Bottom footer bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-6 flex items-center justify-between border-t border-white/8 pt-5 pb-8"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/25">
            BUILT FROM{" "}
            <span className="text-[#c5261a]/70">SCRATCH</span>.
          </span>

          {/* Crosshair icon */}
          <div className="relative h-5 w-5 flex items-center justify-center">
            <div className="absolute h-full w-px bg-white/15" />
            <div className="absolute w-full h-px bg-white/15" />
            <div className="h-2 w-2 rounded-full border border-white/20" />
          </div>

          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/25">
            BUILD. CODE. SURVIVE.
          </span>
        </motion.div>
      </div>

      {/* Bottom corner brackets */}
      <div className="hidden lg:block absolute bottom-6 left-6 h-8 w-8 border-l-2 border-b-2 border-white/10" />
      <div className="hidden lg:block absolute bottom-6 right-6 h-8 w-8 border-r-2 border-b-2 border-[#c5261a]/40" />
    </section>
  );
}
