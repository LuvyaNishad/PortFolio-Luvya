"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { toolCategories, type Tool } from "@/data/tools";

/* ─────────────────────────────────────────────────
   Tool Category Row
   Each row contains:
   - Left panel: number, icon, category name, subtitle, sequential capacity bar
   - Right panel: grid of tool cards (filled from data, empty slots as placeholders)
   - Right edge: vertical "TOOLS" label + "+" button + dots
───────────────────────────────────────────────── */

interface ToolCategoryProps {
  index: number;
  title: string;
  subtitle: string;
  slots: number;
  tools: Tool[];
  delay?: number;
}

function CapacityBarInline({
  value,
  max = 10,
}: {
  value: number;
  max?: number;
  baseDelay?: number;
}) {
  const [displayVal, setDisplayVal] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCount = useCallback(() => {
    if (intervalRef.current) return;
    let current = 0;
    intervalRef.current = setInterval(() => {
      current++;
      if (current <= value) {
        setDisplayVal(current);
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, 55);
  }, [value]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="flex items-center gap-3 mt-auto">
      <span className="font-mono text-[9px] tracking-[0.18em] text-white/30 uppercase">
        Capacity
      </span>
      <span className="font-mono text-[11px] text-white/75 tracking-wide tabular-nums">
        {String(displayVal).padStart(2, "0")}/{String(max).padStart(2, "0")}
      </span>
      <div className="flex gap-[2px] ml-1">
        {Array.from({ length: max }).map((_, i) => {
          const isActive = i < value;
          return (
            <motion.div
              key={i}
              onViewportEnter={i === 0 ? startCount : undefined}
              viewport={{ once: true }}
              className={`w-[6px] h-[10px] rounded-[1px] origin-bottom transition-all duration-300 ${
                isActive
                  ? "bg-[#4a7c59] shadow-[0_0_8px_rgba(74,156,94,0.45)]"
                  : "bg-white/8"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}

function ToolCategory({
  index,
  title,
  subtitle,
  slots,
  tools,
  delay = 0,
}: ToolCategoryProps) {
  const formattedIndex = String(index).padStart(2, "0");
  const cardCount = Math.max(slots, tools.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ delay, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="tools-category-row group/row"
    >
      {/* ── LEFT INFO PANEL ───────────────────────── */}
      <div className="tools-info-panel">
        {/* Number + icon row */}
        <div className="flex items-center gap-2 mb-1.5">
          <span className="font-mono text-[11px] text-white/35 tracking-wide group-hover/row:text-[#4a9c5e] transition-colors duration-300">
            {formattedIndex}
          </span>
          {/* Small grid icon */}
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="text-white/25 group-hover/row:text-[#4a9c5e]/60 transition-colors duration-300"
          >
            <rect x="0" y="0" width="5" height="5" rx="0.5" fill="currentColor" />
            <rect x="7" y="0" width="5" height="5" rx="0.5" fill="currentColor" />
            <rect x="0" y="7" width="5" height="5" rx="0.5" fill="currentColor" />
            <rect x="7" y="7" width="5" height="5" rx="0.5" fill="currentColor" />
          </svg>
        </div>

        {/* Horizontal divider */}
        <div className="w-full h-px bg-white/8 mb-2 group-hover/row:bg-white/14 transition-colors duration-300" />

        {/* Category title — large display font */}
        <h3 className="font-display text-white uppercase text-[1.65rem] leading-[1.05] tracking-[0.02em] mb-2 group-hover/row:text-white transition-colors duration-300">
          {title}
        </h3>

        {/* Subtitle */}
        <p className="font-mono text-[9.5px] leading-[1.65] text-white/30 tracking-wide mb-3 max-w-[200px]">
          {subtitle}
        </p>

        {/* Capacity bar with sequential charge */}
        <CapacityBarInline
          value={tools.length}
          max={slots}
          baseDelay={delay}
        />
      </div>

      {/* ── TOOL CARDS GRID ───────────────────────── */}
      <div className="tools-grid-area">
        <div className="tools-grid">
          {Array.from({ length: cardCount }).map((_, i) => {
            const tool = tools[i];
            return (
              <div key={i} className="tool-card group/card">
                {/* Corner bracket overlay for TR + BL */}
                <div className="tool-card-corners" />
                {tool ? (
                  <>
                    {tool.icon ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={tool.icon}
                        alt=""
                        className="w-9 h-9 object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <div className="tool-card-icon" />
                    )}
                    <span className="font-mono text-[9px] text-white/70 tracking-wide text-center leading-tight px-1 line-clamp-2">
                      {tool.name}
                    </span>
                  </>
                ) : (
                  <>
                    {/* Empty slot — a tool will be added here later */}
                    <div className="tool-card-icon" />
                    <div className="tool-card-label" />
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── RIGHT EDGE: Vertical label + plus + dots ── */}
      <div className="tools-right-edge">
        {/* Vertical "TOOLS" text */}
        <span className="tools-vertical-label">TOOLS</span>
        {/* Plus button */}
        <div className="tools-plus-btn group-hover/row:border-[#4a9c5e]/50 group-hover/row:text-[#4a9c5e] transition-colors duration-300">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2">
            <line x1="7" y1="2" x2="7" y2="12" />
            <line x1="2" y1="7" x2="12" y2="7" />
          </svg>
        </div>
        {/* Vertical dots */}
        <div className="tools-dots">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="w-[3px] h-[3px] rounded-full bg-white/15"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────
   ECG Heart-Rate Monitor — continuously scrolling
───────────────────────────────────────────────── */
function ECGMonitor() {
  const waveformPath =
    "M0,16 L12,16 L18,16 L24,16 L30,16 L36,16 L42,16 L46,16 L50,12 L54,16 L58,16 L62,16 L68,6 L72,26 L76,4 L80,22 L84,10 L88,18 L92,16 L98,16 L104,16 L108,16 L112,14 L116,16 L120,16 L126,16 L132,16 L136,16 L140,16 L146,16 L150,12 L154,16 L158,16 L162,16 L168,5 L172,27 L176,3 L180,23 L184,9 L188,19 L192,16 L198,16 L204,16 L210,16 L216,16 L220,16 L226,16 L232,16 L238,16 L244,16 L250,16 L256,16 L262,16 L268,16 L274,16 L280,16";

  const svgContent = (
    <svg
      viewBox="0 0 280 32"
      fill="none"
      preserveAspectRatio="none"
      className="w-full h-full"
    >
      <path
        d={waveformPath}
        stroke="rgba(74,156,94,0.6)"
        strokeWidth="1.5"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Glow layer */}
      <path
        d={waveformPath}
        stroke="rgba(74,156,94,0.2)"
        strokeWidth="4"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <div className="ecg-monitor">
      <div className="ecg-trace">
        {svgContent}
        {svgContent}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   Tools Section — Main Export
───────────────────────────────────────────────── */
export function Tools() {
  return (
    <section id="tools" className="tools-section">
      {/* ── Animated Blueprint Background ─────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="tools-bg"
        aria-hidden="true"
      />

      {/* ── Content container ──────────────────────────── */}
      <div className="tools-content">
        {/* ── HEADER ROW ─────────────────────────────── */}
        <div className="tools-header">
          <div>
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex items-center gap-2 mb-5"
            >
              <span className="font-mono text-[10.5px] tracking-[0.22em] text-white/40 uppercase">
                Tech Stack
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
            </motion.div>

            {/* Main Title */}
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="tools-main-title"
            >
              <span className="font-display">TOOLS</span>{" "}
              <span className="font-serif italic font-normal text-white/40" style={{ fontWeight: 400 }}>
                OF THE TRADE.
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
              className="font-mono text-[11.5px] leading-[1.85] text-white/30 max-w-[380px] mt-5"
            >
              A carefully curated arsenal of tools and
              <br />
              technologies I use to craft immersive,
              <br />
              functional, and elegant digital experiences.
            </motion.p>
          </div>

          {/* SYS. STATUS indicator — top right */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.6, ease: "easeOut" }}
            className="tools-sys-status"
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-[9.5px] tracking-[0.2em] text-white/30 uppercase">
                Sys. Status
              </span>
              <ECGMonitor />
            </div>
            <span className="font-mono text-[11px] tracking-[0.22em] text-[#4a9c5e] uppercase font-medium">
              Ready
            </span>
          </motion.div>
        </div>

        {/* ── CATEGORY ROWS (150ms Calibration Stagger) ──────────────── */}
        <div className="tools-categories">
          {toolCategories.map((category, i) => (
            <ToolCategory
              key={category.id}
              index={i + 1}
              title={category.title}
              subtitle={category.subtitle}
              slots={category.slots}
              tools={category.tools}
              delay={i * 0.15}
            />
          ))}
        </div>

        {/* ── BOTTOM STATUS BAR ──────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45, duration: 0.8 }}
          className="tools-bottom-bar"
        >
          <span className="font-mono text-[9px] tracking-[0.2em] text-white/20 uppercase">
            {"// Equipment Synchronized"}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-white/25 text-[10px]">✧</span>
            <span className="font-mono text-[9px] tracking-[0.2em] text-white/20 uppercase">
              Scroll to Explore
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] tracking-[0.2em] text-white/20 uppercase">
              Classified System
            </span>
            <span className="font-mono text-[9px] tracking-[0.12em] text-white/20">
              RPD-0981
            </span>
            <span className="font-mono text-[9px] text-white/15 tracking-[0.01em]">
              ████
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
