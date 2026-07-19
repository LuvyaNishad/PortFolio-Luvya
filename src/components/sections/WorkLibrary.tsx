"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Code2, Layers3, Palette, Play, Plus } from "lucide-react";
import { LiquidGlassEffect } from "@/components/ui/LiquidGlassEffect";
import HighlightCard from "@/components/ui/highlight-card";
import { MetadataText } from "@/components/ui/MetadataText";
import { cn } from "@/utils/cn";

type WorkArchiveItem = {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  detail: string;
  signal: string;
  accent: string;
  glow: string;
  Icon: typeof Palette;
};

const archiveItems: WorkArchiveItem[] = [
  {
    id: "graphic-design",
    index: "01",
    title: "Graphic Design",
    subtitle: "Posters, branding and print systems",
    detail: "Visual artifacts",
    signal: "Image popup prepared",
    accent: "#78936f",
    glow: "rgba(120,147,111,0.18)",
    Icon: Palette,
  },
  {
    id: "video-edits",
    index: "02",
    title: "Video Edits",
    subtitle: "Reels, shorts and long-form cuts",
    detail: "Motion archive",
    signal: "Preview layer prepared",
    accent: "#c5261a",
    glow: "rgba(197,38,26,0.2)",
    Icon: Play,
  },
  {
    id: "ui-ux-design",
    index: "03",
    title: "UI/UX Design",
    subtitle: "Interfaces, flows and product studies",
    detail: "Case study path",
    signal: "Dossier route prepared",
    accent: "#d6d6d8",
    glow: "rgba(255,255,255,0.12)",
    Icon: Layers3,
  },
  {
    id: "code-projects",
    index: "04",
    title: "Code Projects",
    subtitle: "Web apps, experiments and systems",
    detail: "Build records",
    signal: "Technical page prepared",
    accent: "#c59b4a",
    glow: "rgba(197,155,74,0.18)",
    Icon: Code2,
  },
];

function ArchiveCard({ item, delay }: { item: WorkArchiveItem; delay: number }) {
  const Icon = item.Icon;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = `${item.id}-showcase`;
    const element = document.getElementById(targetId);
    if (element) {
      const yOffset = -90; // Offset for sticky navbar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <motion.a
      href={`#${item.id}-showcase`}
      onClick={handleClick}
      initial={{ opacity: 0, y: 34, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ delay, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      whileTap={{ scale: 0.985 }}
      className="group relative block w-full min-h-[300px] text-left cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
      style={
        {
          "--archive-accent": item.accent,
          "--archive-glow": item.glow,
        } as React.CSSProperties
      }
    >
      <HighlightCard accent={item.glow} className="h-full">
        <div className="relative flex min-h-[300px] h-full flex-col justify-between p-6 sm:p-7">


          <div
            className="absolute inset-0 transition duration-700 group-hover:opacity-100"
            style={{
              opacity: 0.72,
              background: `radial-gradient(circle at 72% 25%, var(--archive-glow), transparent 38%),
                linear-gradient(135deg, rgba(0,0,0,0.1), rgba(0,0,0,0.72) 76%)`,
            }}
            aria-hidden="true"
          />

          <div
            className="absolute inset-0 opacity-[0.045]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 5px, rgba(255,255,255,1) 6px)",
            }}
            aria-hidden="true"
          />

          <div className="absolute left-4 top-4 h-5 w-5 border-l border-t border-[color:var(--archive-accent)]/70" />
          <div className="absolute right-4 top-4 h-5 w-5 border-r border-t border-white/20 transition-colors group-hover:border-[color:var(--archive-accent)]/70" />
          <div className="absolute bottom-4 left-4 h-5 w-5 border-b border-l border-white/20 transition-colors group-hover:border-[color:var(--archive-accent)]/70" />
          <div className="absolute bottom-4 right-4 h-5 w-5 border-b border-r border-[color:var(--archive-accent)]/70" />

          <div className="relative z-10 flex items-start justify-between">
            <div>
              <span
                className="font-mono text-[13px] leading-none tracking-[0.2em]"
                style={{ color: item.accent }}
              >
                {item.index}
              </span>
              <div className="mt-3 h-px w-8 bg-[color:var(--archive-accent)]/70" />
            </div>

            <div className="grid h-7 w-7 grid-cols-2 gap-[3px] opacity-30 transition-opacity duration-500 group-hover:opacity-70">
              {Array.from({ length: 4 }).map((_, index) => (
                <span key={index} className="rounded-[1px] bg-white/60" />
              ))}
            </div>
          </div>

          <div className="relative z-10 my-9 flex justify-center">
            <div
              className={cn(
                "relative flex h-24 w-32 items-center justify-center rounded-[4px]",
                "border border-white/10 bg-black/45 shadow-[0_18px_42px_-20px_rgba(0,0,0,0.95)]",
                "transition duration-700 group-hover:-translate-y-1 group-hover:border-[color:var(--archive-accent)]/45"
              )}
            >
              <div
                className="absolute inset-2 rounded-[3px] border border-dashed border-white/10"
                aria-hidden="true"
              />
              <div
                className="absolute -inset-8 opacity-0 blur-2xl transition duration-700 group-hover:opacity-100"
                style={{ background: "var(--archive-glow)" }}
                aria-hidden="true"
              />
              <Icon
                size={34}
                strokeWidth={1.35}
                className="relative z-10 transition duration-700 group-hover:scale-110"
                style={{ color: item.accent }}
              />
            </div>
          </div>

          <div className="relative z-10">
            <MetadataText className="mb-3 block text-[9px] text-white/28">
              {item.detail}
            </MetadataText>

            <div className="flex items-end justify-between gap-5">
              <div className="min-w-0">
                <h3
                  className="font-mono text-[1.25rem] uppercase leading-tight tracking-[0.08em] transition duration-500"
                  style={{ color: item.accent }}
                >
                  {item.title}
                </h3>
                <p className="mt-2 max-w-[260px] font-mono text-[10.5px] leading-[1.65] tracking-[0.03em] text-white/42">
                  {item.subtitle}
                </p>
              </div>

              <Plus
                size={18}
                strokeWidth={1.4}
                className="mb-1 flex-shrink-0 text-white/30 transition duration-500 group-hover:rotate-90 group-hover:text-[color:var(--archive-accent)]"
              />
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-white/8 pt-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/26">
                {item.signal}
              </span>
              <span className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/46 transition duration-500 group-hover:text-white/80">
                Explore
                <ArrowUpRight
                  size={13}
                  strokeWidth={1.5}
                  className="transition duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </div>
          </div>
        </div>
      </HighlightCard>
    </motion.a>
  );
}

export function WorkLibrary() {
  return (
    <section
      id="library"
      className="relative overflow-hidden bg-[#0a0a0c] px-6 py-28 sm:px-8 lg:px-14 lg:py-36"
    >
      {/* Background Image exactly as requested */}
      <div
        className="absolute inset-0 opacity-35 work-library-bg-mask"
        style={{
          backgroundImage: "url('/images/work_library_bg1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform : "scale(1)",
          filter: "brightness(0.7) contrast(1.0)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 78% 20%, rgba(197,38,26,0.06), transparent 30%), radial-gradient(circle at 16% 68%, rgba(120,147,111,0.06), transparent 32%), linear-gradient(to bottom, #0a0a0c 0%, transparent 15%, transparent 85%, #0a0a0c 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-center sm:mb-14"
        >
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/32">
              Archive
            </span>
            <span className="h-1 w-1 rounded-full bg-[#c5261a]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/22">
              04
            </span>
          </div>

          <h2 className="font-display text-[clamp(3rem,7vw,6rem)] uppercase leading-none text-white">
            Work{" "}
            <span className="font-serif italic font-normal normal-case text-white/42">
              Library
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-[430px] font-mono text-[11px] leading-[1.8] tracking-[0.04em] text-white/34">
            Browse by category and enter the archive that matches the mission.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {archiveItems.map((item, index) => (
            <ArchiveCard key={item.id} item={item} delay={0.1 + index * 0.08} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45, duration: 0.8 }}
          className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-5 sm:flex-row"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/20">
            // Archive index synchronized
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/20">
            Interaction layer: hover only
          </span>
        </motion.div>
      </div>
    </section>
  );
}
