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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const maybeCtx = canvas.getContext("2d");
    if (!maybeCtx) return;
    const ctx = maybeCtx;

    const W = 360; // internal resolution width
    const H = 64;  // internal resolution height
    canvas.width = W;
    canvas.height = H;

    const mid = H / 2;
    const speed = 1.25; // scroll speed (px per tick)

    // Buffer to hold waveform y-offsets for the entire canvas
    const buffer = new Float32Array(W).fill(0);
    let writePos = 0;
    let subPixel = 0;
    let frameId: number;

    // Organic beat state generator variables
    let state: "REST" | "BEAT" = "REST";
    let restRemaining = 25; // initial baseline gap
    let beatProgress = 0;

    // Current beat's dynamic parameters (randomized per beat for realistic variation)
    let currentScale = 1.0;     // height multiplier (0.65 to 1.35)
    let currentDuration = 26;   // samples for the beat pulse itself

    // Respiratory baseline wander (sine wave phase)
    let wanderPhase = 0;

    // Artifact burst state
    let interferenceTimer = 0;
    let interferenceActive = false;

    // Generate the baseline offset for one step in a beat (progress: 0.0 to 1.0)
    function calculateBeatSample(p: number, scale: number): number {
      // P-wave (0.0 to 0.2): small rounded bump
      if (p < 0.2) {
        const pNorm = p / 0.2;
        return Math.sin(pNorm * Math.PI) * 2.2 * scale;
      }
      // PR segment (0.2 to 0.3): flat baseline
      if (p < 0.3) {
        return 0;
      }
      // QRS Complex (0.3 to 0.55): sharp dramatic spike
      if (p < 0.55) {
        const qrsNorm = (p - 0.3) / 0.25;
        // Q-dip (-Q) → R-peak (+R) → S-dip (-S)
        if (qrsNorm < 0.2) {
          // Q dip
          return -((qrsNorm / 0.2) * 5) * scale;
        } else if (qrsNorm < 0.6) {
          // R spike up
          const rNorm = (qrsNorm - 0.2) / 0.4;
          const val = -5 + rNorm * 31; // from -5 to +26
          return val * scale;
        } else if (qrsNorm < 0.85) {
          // S dip down
          const sNorm = (qrsNorm - 0.6) / 0.25;
          const val = 26 - sNorm * 36; // from +26 down to -10
          return val * scale;
        } else {
          // Recovery from S dip back to baseline
          const recNorm = (qrsNorm - 0.85) / 0.15;
          return (-10 + recNorm * 10) * scale;
        }
      }
      // ST Segment (0.55 to 0.65)
      if (p < 0.65) {
        return 0;
      }
      // T-wave (0.65 to 0.95): broader rounded bump
      if (p < 0.95) {
        const tNorm = (p - 0.65) / 0.3;
        return Math.sin(tNorm * Math.PI) * 5.5 * scale;
      }
      // Trail to baseline
      return 0;
    }

    // Helper: generate new randomized beat parameters for natural variation
    function startNewBeat() {
      state = "BEAT";
      beatProgress = 0;
      // Height variation: vary peak height between 0.68x and 1.32x randomly
      // Every 3-5 beats, occasionally introduce a bigger emphatic beat (1.35x) or softer beat (0.7x)
      const rand = Math.random();
      if (rand < 0.15) {
        currentScale = 1.30 + Math.random() * 0.15; // strong beat
      } else if (rand < 0.35) {
        currentScale = 0.68 + Math.random() * 0.15; // soft beat
      } else {
        currentScale = 0.88 + Math.random() * 0.28; // normal dynamic beat
      }
      // Beat duration micro-variation (slightly faster/slower pulses)
      currentDuration = 24 + Math.floor(Math.random() * 6);
    }

    function draw() {
      subPixel += speed;
      while (subPixel >= 1) {
        subPixel -= 1;

        let sample = 0;

        if (state === "REST") {
          sample = 0;
          restRemaining--;
          if (restRemaining <= 0) {
            startNewBeat();
          }
        } else if (state === "BEAT") {
          beatProgress++;
          const p = beatProgress / currentDuration;
          if (p >= 1.0) {
            state = "REST";
            // Randomize rest gap between beats for realistic Heart Rate Variability (HRV)
            // 20 to 52 samples gap (varied beat timing)
            restRemaining = 18 + Math.floor(Math.random() * 34);
            sample = 0;
          } else {
            sample = calculateBeatSample(p, currentScale);
          }
        }

        // Add respiratory baseline wander (slow subtle sine oscillation)
        wanderPhase += 0.012;
        const wander = Math.sin(wanderPhase) * 1.4;

        // Baseline micro-jitter noise
        const microNoise = (Math.random() - 0.5) * 0.9;

        // Occasional electrical static artifact
        interferenceTimer--;
        if (interferenceTimer <= 0 && !interferenceActive && Math.random() < 0.002) {
          interferenceActive = true;
          interferenceTimer = 2 + Math.floor(Math.random() * 5);
        }
        let staticArtifact = 0;
        if (interferenceActive) {
          staticArtifact = (Math.random() - 0.5) * 12;
          if (interferenceTimer <= 0) interferenceActive = false;
        }

        const finalVal = sample + wander + microNoise + staticArtifact;
        buffer[writePos] = finalVal;
        writePos = (writePos + 1) % W;
      }

      // Render Canvas Frame
      ctx.clearRect(0, 0, W, H);

      const startIdx = writePos; // oldest sample at 0, newest at W-1

      // 1. Afterglow glow layer (dim thick stroke)
      ctx.beginPath();
      ctx.strokeStyle = "rgba(74,156,94,0.14)";
      ctx.lineWidth = 4.5;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      for (let i = 0; i < W; i++) {
        const idx = (startIdx + i) % W;
        const y = mid - buffer[idx];
        if (i === 0) ctx.moveTo(i, y);
        else ctx.lineTo(i, y);
      }
      ctx.stroke();

      // 2. Main ECG trace line
      ctx.beginPath();
      ctx.strokeStyle = "rgba(74,156,94,0.75)";
      ctx.lineWidth = 1.5;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      for (let i = 0; i < W; i++) {
        const idx = (startIdx + i) % W;
        const y = mid - buffer[idx];
        if (i === 0) ctx.moveTo(i, y);
        else ctx.lineTo(i, y);
      }
      ctx.stroke();

      // 3. Bright phosphor sweep near the write head (rightmost 35px)
      const sweepWidth = 35;
      const sweepStart = W - sweepWidth;
      ctx.beginPath();
      ctx.strokeStyle = "rgba(110,210,130,0.95)";
      ctx.lineWidth = 1.8;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      for (let i = sweepStart; i < W; i++) {
        const idx = (startIdx + i) % W;
        const y = mid - buffer[idx];
        if (i === sweepStart) ctx.moveTo(i, y);
        else ctx.lineTo(i, y);
      }
      ctx.stroke();

      // 4. Phosphor lead dot at write position
      const headIdx = (startIdx + W - 1) % W;
      const headY = mid - buffer[headIdx];
      ctx.beginPath();
      ctx.arc(W - 1, headY, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(150,240,170,1)";
      ctx.fill();

      // Dot ambient glow
      ctx.beginPath();
      ctx.arc(W - 1, headY, 6, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(74,156,94,0.25)";
      ctx.fill();

      frameId = requestAnimationFrame(draw);
    }

    frameId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="ecg-monitor">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ imageRendering: "auto" }}
      />
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
