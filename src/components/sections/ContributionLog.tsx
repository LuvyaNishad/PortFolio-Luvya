"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Biohazard } from "lucide-react";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface MonthLabel {
  index: number;
  label: string;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

const LEVEL_COLORS = [
  "rgba(255,255,255,0.04)", // 0 — empty
  "rgba(197,38,26,0.22)",   // 1 — low
  "rgba(197,38,26,0.48)",   // 2 — medium
  "rgba(197,38,26,0.78)",   // 3 — high
  "rgba(235,45,32,0.95)",   // 4 — peak
];

// Fallback procedural data in case fetch fails — date-aware so labels match today
function generateFallbackData(): { weeks: number[][]; monthLabels: MonthLabel[] } {
  const weeks: number[][] = [];
  const monthLabels: MonthLabel[] = [];
  let seed = 42;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed & 0xffff) / 0xffff;
  };

  const today = new Date();
  const todayDow = today.getDay(); // 0=Sun
  // End of grid is the Saturday of the current week
  const endDate = new Date(today);
  endDate.setDate(today.getDate() + (6 - todayDow));
  // Start date is 52 weeks before the start Sunday of end week
  const startDate = new Date(endDate);
  startDate.setDate(endDate.getDate() - 52 * 7);

  let lastMonth = -1;
  const cursor = new Date(startDate);

  for (let w = 0; w < 53; w++) {
    const days: number[] = [];
    const isHighSeason = (w >= 12 && w <= 28) || (w >= 36 && w <= 46);
    const baseChance = isHighSeason ? 0.6 : 0.3;

    for (let d = 0; d < 7; d++) {
      // Don't fill cells beyond today
      const isFuture = cursor > today;
      if (isFuture) {
        days.push(0);
      } else {
        const r = rand();
        days.push(r > baseChance ? 0 : r > baseChance * 0.4 ? 1 : r > baseChance * 0.18 ? 2 : r > baseChance * 0.06 ? 3 : 4);
      }

      // Track month transitions on Sundays
      if (d === 0) {
        const currentMonth = cursor.getMonth();
        if (currentMonth !== lastMonth) {
          monthLabels.push({ index: w, label: MONTHS[currentMonth] });
          lastMonth = currentMonth;
        }
      }
      cursor.setDate(cursor.getDate() + 1);
    }

    weeks.push(days);
  }
  return { weeks, monthLabels };
}

/* ─── Activity Legend ─── */
function ActivityLegend() {
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">
        Activity Level:
      </span>
      <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/30">
        Low
      </span>
      <div className="flex items-center gap-[3px]">
        {LEVEL_COLORS.map((color, i) => (
          <span
            key={i}
            className="block h-[10px] w-[10px] rounded-[1.5px]"
            style={{ background: color }}
          />
        ))}
      </div>
      <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/50">
        High
      </span>
    </div>
  );
}

export function ContributionLog() {
  const [gridData, setGridData] = useState<number[][]>([]);
  const [monthLabels, setMonthLabels] = useState<MonthLabel[]>([]);
  const [totalCount, setTotalCount] = useState<number | string>("CLASSIFIED");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchContributions() {
      try {
        const res = await fetch("https://github-contributions-api.jogruber.de/v4/LuvyaNishad");
        if (!res.ok) throw new Error("Failed to fetch github contributions");
        const data = await res.json();
        
        // Sum total contributions
        const total = Object.values(data.total).reduce((sum: number, count: any) => sum + Number(count), 0);
        setTotalCount(total);

        const rawContributions: ContributionDay[] = data.contributions;
        if (!rawContributions || rawContributions.length === 0) {
          throw new Error("Empty contributions array");
        }

        // Build a date-aware grid ending at today
        const today = new Date();
        const todayStr = today.toISOString().slice(0, 10);
        const todayDow = today.getDay(); // 0=Sun
        // End of grid is the Saturday of the current week
        const endDate = new Date(today);
        endDate.setDate(today.getDate() + (6 - todayDow));
        // Start date is 52 weeks before the start Sunday of end week
        const startDate = new Date(endDate);
        startDate.setDate(endDate.getDate() - 52 * 7);

        // Index contributions by date for O(1) lookup
        const contribMap = new Map<string, ContributionDay>();
        rawContributions.forEach(c => contribMap.set(c.date, c));

        // Build exactly 53 weeks × 7 days
        const gridCells: ContributionDay[] = [];
        const cursor = new Date(startDate);
        for (let i = 0; i < 53 * 7; i++) {
          const dateStr = cursor.toISOString().slice(0, 10);
          const entry = contribMap.get(dateStr);
          // If the date is in the future, mark as empty
          const isFuture = dateStr > todayStr;
          gridCells.push(entry && !isFuture ? entry : { date: dateStr, count: 0, level: 0 });
          cursor.setDate(cursor.getDate() + 1);
        }

        // Determine month label indices based on Sunday columns
        const detectedMonths: MonthLabel[] = [];
        let lastMonth = -1;
        gridCells.forEach((cell, index) => {
          if (cell.date) {
            const date = new Date(cell.date + 'T00:00:00Z');
            const day = date.getUTCDay();
            const month = date.getUTCMonth();
            // If it is Sunday and the month transitioned
            if (day === 0 && month !== lastMonth) {
              detectedMonths.push({
                index: Math.floor(index / 7),
                label: MONTHS[month],
              });
              lastMonth = month;
            }
          }
        });

        // Group into 53 columns (weeks), each containing 7 rows (days)
        const weeks: number[][] = [];
        for (let w = 0; w < 53; w++) {
          const weekDays = gridCells.slice(w * 7, (w + 1) * 7).map(cell => cell.level);
          weeks.push(weekDays);
        }

        setGridData(weeks);
        setMonthLabels(detectedMonths);
      } catch (err) {
        console.error("Error fetching contributions, falling back to mock:", err);
        const fallback = generateFallbackData();
        setGridData(fallback.weeks);
        setMonthLabels(fallback.monthLabels);
        setTotalCount("147");
      } finally {
        setIsLoading(false);
      }
    }

    fetchContributions();
  }, []);

  // Pre-populate with fallback mock data on initial SSR/render to avoid blank screen
  const currentGrid = gridData.length > 0 ? gridData : generateFallbackData().weeks;
  const currentLabels = monthLabels.length > 0 ? monthLabels : generateFallbackData().monthLabels;

  return (
    <section
      id="contribution-log"
      className="relative overflow-hidden bg-[#0a0a0c] border-t border-white/5"
    >
      {/* ── Background Image ── */}
      <div
        className="absolute inset-0 contribution-bg-mask"
        style={{
          backgroundImage: "url('/images/contribution_bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          backgroundRepeat: "no-repeat",
          filter: "grayscale(100%) brightness(0.25) contrast(1.2)",
          opacity: 0.45,
        }}
        aria-hidden="true"
      />

      {/* ── Atmospheric Crimson Gradient Overlays — concentrated bottom glow ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 120% 50% at 50% 110%, rgba(197, 38, 26, 0.65) 0%, rgba(139, 0, 0, 0.35) 25%, rgba(80, 0, 0, 0.15) 50%, rgba(10, 10, 12, 0) 75%),
            radial-gradient(ellipse 80% 35% at 50% 100%, rgba(235, 45, 32, 0.30) 0%, rgba(139, 0, 0, 0.12) 40%, transparent 70%),
            linear-gradient(to top, rgba(120, 10, 5, 0.25) 0%, rgba(60, 5, 5, 0.10) 20%, rgba(10, 10, 12, 0) 45%),
            linear-gradient(to bottom, #0a0a0c 0%, transparent 10%, transparent 70%, rgba(10, 10, 12, 0.3) 90%, #0a0a0c 100%),
            radial-gradient(ellipse at 50% 15%, transparent 35%, rgba(10, 10, 12, 0.7) 85%),
            linear-gradient(to right, rgba(10, 10, 12, 0.5) 0%, transparent 18%, transparent 82%, rgba(10, 10, 12, 0.5) 100%)
          `,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-14 py-20 lg:py-28">
        {/* ── Top metadata bar ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-12"
        >
          <div className="flex items-center gap-3">
            <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#c5261a]">
              Archive Footer Logs
            </span>
            <span className="h-3 w-px bg-white/15" />
            <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/25">
              // Umbrella Corp: Dev Activity Report
            </span>
          </div>
          <span className="font-mono text-[8px] tracking-[0.12em] text-white/25">
            33.9889° N, 118.4695° W
          </span>
        </motion.div>

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          {/* Umbrella icon + label */}
          <div className="flex items-center gap-3 mb-4">
            <Biohazard size={20} className="text-[#c5261a] animate-pulse" />
            <span className="font-mono text-[12px] uppercase tracking-[0.28em] text-[#c5261a]">
              Developer Activity
            </span>
          </div>

          {/* Main title */}
          <h2 className="font-serif text-[clamp(3rem,8vw,6.5rem)] uppercase leading-[0.9] tracking-[0.02em] text-white">
            Contribution Log
          </h2>

          {/* Red underline */}
          <div className="mt-4 h-[2px] w-16 bg-[#c5261a]" />

          {/* Subtitle */}
          <p className="mt-5 font-mono text-[10.5px] uppercase tracking-[0.2em] text-white/30">
            Consistent Execution. Continuous Improvement.
          </p>
        </motion.div>

        {/* ── Contribution Heatmap Panel ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8%" }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Glass panel */}
          <div
            className="relative border border-white/8 bg-black/40 backdrop-blur-sm overflow-hidden"
            style={{
              boxShadow:
                "0 24px 80px -20px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.03)",
            }}
          >
            {/* Inner scanline texture */}
            <div
              className="absolute inset-0 opacity-[0.035] pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,1) 3px, rgba(255,255,255,1) 4px)",
              }}
              aria-hidden="true"
            />

            <div className="relative z-10 p-6 sm:p-8 lg:p-10">
              {/* Panel header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-white/40">
                      &gt; SYSTEM:
                    </span>
                    <span className="font-mono text-[11px] tracking-[0.06em] text-[#c5261a]">
                      GITHUB
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-white/40">
                      &gt; USER:
                    </span>
                    <span className="font-mono text-[11px] tracking-[0.06em] text-[#c5261a]">
                      LUVYANISHAD
                    </span>
                  </div>
                </div>
                <ActivityLegend />
              </div>

              {/* Contribution grid container */}
              <div className="w-full overflow-x-auto">
                <div className="min-w-[760px] pr-2">
                  {/* Month labels */}
                  <div className="flex mb-2 relative h-4" style={{ paddingLeft: "38px" }}>
                    {currentLabels.map(({ index, label }) => (
                      <span
                        key={index}
                        className="absolute font-mono text-[10px] text-white/40"
                        style={{
                          left: `calc(38px + ${index} * (100% - 38px) / 53)`,
                          transform: "translateX(-50%)",
                        }}
                      >
                        {label}
                      </span>
                    ))}
                  </div>

                  {/* Grid rows */}
                  <div className="flex flex-col gap-[3px]">
                    {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => (
                      <div key={dayIndex} className="flex items-center gap-0">
                        {/* Day label */}
                        <span
                          className="w-[38px] flex-shrink-0 text-left pr-3 font-mono text-[10px] text-white/35"
                          style={{ lineHeight: 1 }}
                        >
                          {DAY_LABELS[dayIndex]}
                        </span>
                        {/* Week cells */}
                        <div className="flex gap-[3px] flex-1">
                          {currentGrid.map((week, wIdx) => (
                            <span
                              key={wIdx}
                              className="block rounded-[1.5px] transition-colors duration-300"
                              style={{
                                width: "calc((100% - 52 * 3px) / 53)",
                                aspectRatio: "1 / 1",
                                minWidth: "8px",
                                maxWidth: "14px",
                                background: LEVEL_COLORS[week[dayIndex]],
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Panel footer */}
              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/6 pt-5">
                <div className="flex items-center gap-3">
                  <div className="h-7 w-8 border border-white/15 rounded-[3px] flex items-center justify-center">
                    <span className="font-mono text-[9px] text-white/35">
                      &gt;_
                    </span>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-white/35">
                    Commitment is the foundation of mastery.
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/35">
                    Total Contributions:
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#c5261a] font-bold">
                    {totalCount}
                  </span>
                  <Lock size={12} strokeWidth={1.5} className="text-[#c5261a]/70" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Bottom decorative metadata ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-14 relative"
        >
          {/* Crosshair */}
          <div className="flex justify-center mb-10">
            <div className="relative h-6 w-6 flex items-center justify-center">
              <div className="absolute h-full w-px bg-white/12" />
              <div className="absolute w-full h-px bg-white/12" />
              <div className="h-1.5 w-1.5 rounded-full border border-white/18" />
            </div>
          </div>

          {/* Bottom info bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <span className="block font-mono text-[8px] uppercase tracking-[0.2em] text-[#c5261a]/50">
                Raccoon City //
              </span>
              <span className="block font-mono text-[8px] uppercase tracking-[0.16em] text-white/20">
                Zone: Restricted
              </span>
            </div>

            <div className="flex items-center gap-3 text-right">
              <div>
                <span className="block font-mono text-[8px] tracking-[0.12em] text-white/20">
                  N 33.9889°
                </span>
                <span className="block font-mono text-[8px] tracking-[0.12em] text-white/20">
                  W 118.485°
                </span>
              </div>
              <div className="grid grid-cols-2 gap-[2px]">
                {Array.from({ length: 4 }).map((_, i) => (
                  <span
                    key={i}
                    className="block h-2.5 w-2.5 border border-white/15 rounded-[1px]"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Level / Clearance */}
          <div className="mt-4 flex items-center justify-end gap-3">
            <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/25">
              Level:
            </span>
            <span className="font-mono text-[10px] tracking-[0.06em] text-white/40 border border-white/12 px-2 py-0.5 rounded-[2px]">
              05
            </span>
            <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#c5261a]/70">
              Clearance Required
            </span>
          </div>
        </motion.div>
      </div>

      {/* Decorative red dot grid — top right */}
      <div className="hidden lg:block absolute top-16 right-14" aria-hidden="true">
        <div className="grid grid-cols-5 gap-[5px]">
          {Array.from({ length: 20 }).map((_, i) => (
            <span
              key={i}
              className="block h-[3px] w-[3px] rounded-full"
              style={{
                background:
                  i < 8
                    ? "rgba(197,38,26,0.5)"
                    : i < 14
                      ? "rgba(197,38,26,0.3)"
                      : "rgba(197,38,26,0.15)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
