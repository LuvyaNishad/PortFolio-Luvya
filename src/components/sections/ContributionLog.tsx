"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

const LEVEL_COLORS = [
  "rgba(255,255,255,0.04)",
  "rgba(197,38,26,0.22)",
  "rgba(197,38,26,0.48)",
  "rgba(197,38,26,0.78)",
  "rgba(235,45,32,0.95)",
];

/* ─── Date formatter with module-level cache ─── */
const dateCache = new Map<string, string>();
function formatContributionDate(dateStr: string): string {
  if (!dateStr) return "";
  const cached = dateCache.get(dateStr);
  if (cached) return cached;
  const [year, month, day] = dateStr.split("-").map(Number);
  const d = new Date(Date.UTC(year, month - 1, day));
  const monthName = d.toLocaleString("en-US", { month: "long", timeZone: "UTC" });
  const suffix = (n: number) => {
    if (n > 3 && n < 21) return "th";
    switch (n % 10) { case 1: return "st"; case 2: return "nd"; case 3: return "rd"; default: return "th"; }
  };
  const result = `${monthName} ${day}${suffix(day)}, ${year}`;
  dateCache.set(dateStr, result);
  return result;
}

/* ─── Fallback data generator — cached at module level, runs once ─── */
let _fallbackCache: { weeks: ContributionDay[][]; monthLabels: MonthLabel[] } | null = null;
function generateFallbackData() {
  if (_fallbackCache) return _fallbackCache;
  const weeks: ContributionDay[][] = [];
  const monthLabels: MonthLabel[] = [];
  let seed = 42;
  const rand = () => { seed = (seed * 16807) % 2147483647; return (seed & 0xffff) / 0xffff; };
  const today = new Date();
  const endDate = new Date(today);
  endDate.setDate(today.getDate() + (6 - today.getDay()));
  const startDate = new Date(endDate);
  startDate.setDate(endDate.getDate() - 52 * 7);
  let lastMonth = -1;
  const cursor = new Date(startDate);
  for (let w = 0; w < 53; w++) {
    const days: ContributionDay[] = [];
    const base = (w >= 12 && w <= 28) || (w >= 36 && w <= 46) ? 0.6 : 0.3;
    for (let d = 0; d < 7; d++) {
      const dateStr = cursor.toISOString().slice(0, 10);
      if (cursor > today) {
        days.push({ date: dateStr, count: 0, level: 0 });
      } else {
        const r = rand();
        const level = r > base ? 0 : r > base * 0.4 ? 1 : r > base * 0.18 ? 2 : r > base * 0.06 ? 3 : 4;
        const count = level === 0 ? 0 : level === 1 ? 1 : level === 2 ? Math.floor(2 + rand() * 3) : level === 3 ? Math.floor(5 + rand() * 4) : Math.floor(9 + rand() * 8);
        days.push({ date: dateStr, count, level });
      }
      if (d === 0) {
        const m = cursor.getMonth();
        if (m !== lastMonth) { monthLabels.push({ index: w, label: MONTHS[m] }); lastMonth = m; }
      }
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(days);
  }
  _fallbackCache = { weeks, monthLabels };
  return _fallbackCache;
}

/* ─── Activity Legend ─── */
function ActivityLegend() {
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">Activity Level:</span>
      <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/30">Low</span>
      <div className="flex items-center gap-[3px]">
        {LEVEL_COLORS.map((color, i) => <span key={i} className="block h-[10px] w-[10px] rounded-[1.5px]" style={{ background: color }} />)}
      </div>
      <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/50">High</span>
    </div>
  );
}

/* ─── Hover Scramble — interval cleaned up on unmount ─── */
function HoverScrambleText({ text, className = "", characterSet = "0123456789ABCDEF!@#$%&*<>[]{}",
}: { text: string; className?: string; characterSet?: string }) {
  const [displayText, setDisplayText] = useState(text);
  const ivRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => { setDisplayText(text); }, [text]);
  useEffect(() => () => { if (ivRef.current) clearInterval(ivRef.current); }, []);

  const handleHover = useCallback(() => {
    if (ivRef.current) return;
    let step = 0; const steps = 14;
    ivRef.current = setInterval(() => {
      const prog = step / steps;
      setDisplayText(Array.from(text).map((ch, i) =>
        " °,/:.".includes(ch) ? ch : prog * text.length > i ? ch : characterSet[Math.floor(Math.random() * characterSet.length)]
      ).join(""));
      step++;
      if (step > steps) { clearInterval(ivRef.current!); ivRef.current = null; setDisplayText(text); }
    }, 25);
  }, [text, characterSet]);

  return <span onMouseEnter={handleHover} className={`cursor-crosshair transition-colors duration-200 hover:text-white/70 ${className}`}>{displayText}</span>;
}

/* ─── Mechanical Counter with RAF cleanup ─── */
function TotalCounterTicker({ target }: { target: number | string }) {
  const [count, setCount] = useState(0);
  const [triggered, setTriggered] = useState(false);
  const rafRef = useRef<number | null>(null);
  const targetNum = typeof target === "number" ? target : parseInt(String(target), 10) || 147;
  useEffect(() => { if (triggered) setCount(targetNum); }, [targetNum, triggered]);
  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  const triggerCount = useCallback(() => {
    if (triggered) return;
    setTriggered(true);
    const t0 = performance.now();
    const tick = (now: number) => {
      const ease = 1 - Math.pow(1 - Math.min((now - t0) / 950, 1), 3);
      setCount(Math.floor(ease * targetNum));
      if (ease < 1) rafRef.current = requestAnimationFrame(tick); else setCount(targetNum);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [triggered, targetNum]);

  return (
    <motion.span onViewportEnter={triggerCount} className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#c5261a] font-bold tabular-nums">
      {String(count).padStart(3, "0")}
    </motion.span>
  );
}

/* ─── Fixed-positioned tooltip — never clipped by any overflow ─── */
function ContribTooltip({ hoveredDay }: { hoveredDay: { day: ContributionDay; x: number; y: number } | null }) {
  return (
    <AnimatePresence>
      {hoveredDay && (
        <motion.div
          initial={{ opacity: 0, y: 5, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.12, ease: "easeOut" }}
          style={{ position: "fixed", left: hoveredDay.x, top: hoveredDay.y, transform: "translate(-50%, calc(-100% - 10px))", pointerEvents: "none", zIndex: 9999 }}
          className="whitespace-nowrap select-none"
        >
          <div
            className="relative px-3.5 py-2 rounded-[5px] border border-white/[0.14] bg-[rgba(8,8,12,0.97)] backdrop-blur-[18px] flex items-center gap-2"
            style={{ boxShadow: "0 8px 28px rgba(0,0,0,0.92), 0 0 14px rgba(197,38,26,0.16), inset 0 1px 0 rgba(255,255,255,0.16)" }}
          >
            <div className="absolute top-0 left-3 right-3 h-px bg-gradient-to-r from-transparent via-white/28 to-transparent" />
            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${hoveredDay.day.count > 0 ? "bg-[#c5261a]" : "bg-white/25"}`}
              style={hoveredDay.day.count > 0 ? { boxShadow: "0 0 6px #c5261a" } : undefined} />
            <span className="font-mono text-[10px] tracking-wide text-white/90">
              <strong className={hoveredDay.day.count > 0 ? "text-[#c5261a] font-bold" : "text-white/55 font-semibold"}>
                {hoveredDay.day.count === 0 ? "No" : hoveredDay.day.count}
              </strong>{" "}
              <span className="text-white/75">{hoveredDay.day.count === 1 ? "contribution" : "contributions"}</span>{" "}
              <span className="text-white/35">on</span>{" "}
              <span className="text-white font-medium">{formatContributionDate(hoveredDay.day.date)}</span>
            </span>
            <div className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-[9px] h-[9px] bg-[rgba(8,8,12,0.97)] border-r border-b border-white/[0.14] rotate-45" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Heatmap Row component ─── */
function HeatmapRow({ dayIndex, currentGrid, onCellHover, onCellLeave }:
  { dayIndex: number; currentGrid: ContributionDay[][]; onCellHover: (e: React.MouseEvent, cell: ContributionDay) => void; onCellLeave: () => void }
) {
  return (
    <div className="flex items-center gap-0">
      <span className="w-[38px] flex-shrink-0 text-left pr-3 font-mono text-[10px] text-white/35" style={{ lineHeight: 1 }}>
        {DAY_LABELS[dayIndex]}
      </span>
      <div className="flex gap-1 flex-1">
        {currentGrid.map((week, wIdx) => {
          const cell = week[dayIndex];
          return (
            <span
              key={wIdx}
              onMouseEnter={(e) => onCellHover(e, cell)}
              onMouseLeave={onCellLeave}
              className="heatmap-cell block rounded-[1.5px] cursor-pointer"
              style={{
                width: "calc((100% - 52 * 4px) / 53)",
                aspectRatio: "1 / 1",
                minWidth: "10px",
                maxWidth: "18px",
                background: LEVEL_COLORS[cell?.level ?? 0],
                animationDelay: `${0.15 + wIdx * 0.011}s`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

/* ─── Main Export ─── */
export function ContributionLog() {
  const [gridData, setGridData] = useState<ContributionDay[][]>([]);
  const [monthLabels, setMonthLabels] = useState<MonthLabel[]>([]);
  const [totalCount, setTotalCount] = useState<number | string>(147);
  const [hoveredDay, setHoveredDay] = useState<{ day: ContributionDay; x: number; y: number } | null>(null);

  const fallback = useMemo(() => generateFallbackData(), []);
  const currentGrid = gridData.length > 0 ? gridData : fallback.weeks;
  const currentLabels = monthLabels.length > 0 ? monthLabels : fallback.monthLabels;

  useEffect(() => {
    async function fetchContributions() {
      try {
        const res = await fetch(`https://github-contributions-api.jogruber.de/v4/LuvyaNishad?_=${Date.now()}`, { cache: "no-store" });
        if (!res.ok) throw new Error("fetch failed");
        const data = await res.json();
        const total = Object.values(data.total).reduce((s: number, c: any) => s + Number(c), 0);
        setTotalCount(total);
        const raw: ContributionDay[] = data.contributions;
        if (!raw?.length) throw new Error("empty");
        raw.sort((a, b) => a.date.localeCompare(b.date));
        const today = new Date();
        const todayStr = today.toISOString().slice(0, 10);
        const endDate = new Date(today);
        endDate.setDate(today.getDate() + (6 - today.getDay()));
        const startDate = new Date(endDate);
        startDate.setDate(endDate.getDate() - 52 * 7);
        const contribMap = new Map<string, ContributionDay>(raw.map(c => [c.date, c]));
        const gridCells: ContributionDay[] = [];
        const cursor = new Date(startDate);
        for (let i = 0; i < 53 * 7; i++) {
          const dateStr = cursor.toISOString().slice(0, 10);
          const entry = contribMap.get(dateStr);
          gridCells.push(entry && dateStr <= todayStr ? entry : { date: dateStr, count: 0, level: 0 });
          cursor.setDate(cursor.getDate() + 1);
        }
        const detectedMonths: MonthLabel[] = [];
        let lastMonth = -1;
        gridCells.forEach((cell, i) => {
          if (!cell.date) return;
          const d = new Date(cell.date + "T00:00:00Z");
          const m = d.getUTCMonth();
          if (d.getUTCDay() === 0 && m !== lastMonth) { detectedMonths.push({ index: Math.floor(i / 7), label: MONTHS[m] }); lastMonth = m; }
        });
        setGridData(Array.from({ length: 53 }, (_, w) => gridCells.slice(w * 7, (w + 1) * 7)));
        setMonthLabels(detectedMonths);
      } catch {
        const fb = generateFallbackData();
        setGridData(fb.weeks);
        setMonthLabels(fb.monthLabels);
        setTotalCount(147);
      }
    }
    fetchContributions();
  }, []);

  const handleCellHover = useCallback((e: React.MouseEvent, cell: ContributionDay) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredDay({ day: cell, x: rect.left + rect.width / 2, y: rect.top });
  }, []);

  const handleCellLeave = useCallback(() => setHoveredDay(null), []);

  return (
    <>
      <style>{`
        .heatmap-cell {
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          will-change: transform;
          animation: hm-pop 0.28s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .heatmap-cell:hover {
          transform: scale(1.3);
          box-shadow: 0 0 8px rgba(235,45,32,0.85);
          position: relative;
          z-index: 10;
        }
        @keyframes hm-pop {
          from { transform: scale(0.2); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
        .contrib-scroller {
          overflow-x: auto;
          overflow-y: visible;
          scrollbar-width: none;
        }
        .contrib-scroller::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Fixed tooltip — rendered outside all overflow containers */}
      <ContribTooltip hoveredDay={hoveredDay} />

      <section id="contribution-log" className="relative overflow-hidden bg-transparent border-t border-white/5">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, #0a0a0c 0%, transparent 50%), linear-gradient(to right, rgba(10,10,12,0.4) 0%, transparent 15%, transparent 85%, rgba(10,10,12,0.4) 100%)" }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-14 py-20 lg:py-28">
          {/* Top metadata */}
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center justify-between gap-4 mb-12"
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#c5261a]">Archive Footer Logs</span>
              <span className="h-3 w-px bg-white/15" />
              <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/25">// Umbrella Corp: Dev Activity Report</span>
            </div>
            <HoverScrambleText text="33.9889° N, 118.4695° W" className="font-mono text-[8px] tracking-[0.12em] text-white/25" />
          </motion.div>

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <Biohazard size={20} className="text-[#c5261a] animate-pulse" />
              <span className="font-mono text-[12px] uppercase tracking-[0.28em] text-[#c5261a]">Developer Activity</span>
            </div>
            <h2 className="font-serif text-[clamp(3rem,8vw,6.5rem)] uppercase leading-[0.9] tracking-[0.02em] text-white">
              Contribution Log
            </h2>
            <div className="mt-4 h-[2px] w-16 bg-[#c5261a]" />
            <p className="mt-5 font-mono text-[10.5px] uppercase tracking-[0.2em] text-white/30">Consistent Execution. Continuous Improvement.</p>
          </motion.div>

          {/* Heatmap Panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }} transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div
              className="relative border border-white/8 bg-black/40 backdrop-blur-sm"
              style={{ boxShadow: "0 24px 80px -20px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.03)" }}
            >
              <div className="absolute inset-0 opacity-[0.035] pointer-events-none"
                style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,1) 3px, rgba(255,255,255,1) 4px)" }}
                aria-hidden="true"
              />
              <div className="relative z-10 p-6 sm:p-8 lg:p-10">
                {/* Panel header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] text-white/40">&gt; SYSTEM:</span>
                      <span className="font-mono text-[11px] tracking-[0.06em] text-[#c5261a]">GITHUB</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] text-white/40">&gt; USER:</span>
                      <span className="font-mono text-[11px] tracking-[0.06em] text-[#c5261a]">LUVYANISHAD</span>
                    </div>
                  </div>
                  <ActivityLegend />
                </div>

                {/* Grid — no overflow:hidden anywhere so hover scale doesn't trigger scroll */}
                <div className="contrib-scroller w-full">
                  <div className="min-w-[760px] pr-2" style={{ overflowY: "visible" }}>
                    {/* Month labels */}
                    <div className="flex mb-2 relative h-4" style={{ paddingLeft: "38px" }}>
                      {currentLabels.map(({ index, label }) => (
                        <span key={index} className="absolute font-mono text-[10px] text-white/40"
                          style={{ left: `calc(38px + ${index} * (100% - 38px) / 53)`, transform: "translateX(-50%)" }}>
                          {label}
                        </span>
                      ))}
                    </div>

                    {/* Grid rows */}
                    <div className="flex flex-col gap-1">
                      {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => (
                        <HeatmapRow
                          key={dayIndex}
                          dayIndex={dayIndex}
                          currentGrid={currentGrid}
                          onCellHover={handleCellHover}
                          onCellLeave={handleCellLeave}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Panel footer */}
                <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/6 pt-5">
                  <div className="flex items-center gap-3">
                    <div className="h-7 w-8 border border-white/15 rounded-[3px] flex items-center justify-center">
                      <span className="font-mono text-[9px] text-white/35">&gt;_</span>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-white/35">Commitment is the foundation of mastery.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/35">Total Contributions:</span>
                    <TotalCounterTicker target={totalCount} />
                    <Lock size={12} strokeWidth={1.5} className="text-[#c5261a]/70" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom decorative */}
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-14 relative"
          >
            <div className="flex justify-center mb-10">
              <div className="relative h-6 w-6 flex items-center justify-center">
                <div className="absolute h-full w-px bg-white/12" />
                <div className="absolute w-full h-px bg-white/12" />
                <div className="h-1.5 w-1.5 rounded-full border border-white/18" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <span className="block font-mono text-[8px] uppercase tracking-[0.2em] text-[#c5261a]/50">Raccoon City //</span>
                <span className="block font-mono text-[8px] uppercase tracking-[0.16em] text-white/20">Zone: Restricted</span>
              </div>
              <div className="flex items-center gap-3">
                <div>
                  <HoverScrambleText text="N 33.9889°" className="block font-mono text-[8px] tracking-[0.12em] text-white/20" />
                  <HoverScrambleText text="W 118.485°" className="block font-mono text-[8px] tracking-[0.12em] text-white/20" />
                </div>
                <div className="grid grid-cols-2 gap-[2px]">
                  {[0, 1, 2, 3].map((i) => <span key={i} className="block h-2.5 w-2.5 border border-white/15 rounded-[1px]" />)}
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-end gap-3">
              <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/25">Level:</span>
              <HoverScrambleText text="05" className="font-mono text-[10px] tracking-[0.06em] text-white/40 border border-white/12 px-2 py-0.5 rounded-[2px]" />
              <HoverScrambleText text="Clearance Required" className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#c5261a]/70" />
            </div>
          </motion.div>
        </div>

        {/* Decorative dots */}
        <div className="hidden lg:block absolute top-16 right-14" aria-hidden="true">
          <div className="grid grid-cols-5 gap-[5px]">
            {[...Array(20)].map((_, i) => (
              <span key={i} className="block h-[3px] w-[3px] rounded-full"
                style={{ background: i < 8 ? "rgba(197,38,26,0.5)" : i < 14 ? "rgba(197,38,26,0.3)" : "rgba(197,38,26,0.15)" }} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
