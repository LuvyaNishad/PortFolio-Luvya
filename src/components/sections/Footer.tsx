"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

const NAV_LINKS = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT", href: "#about" },
  { label: "TOOLS", href: "#tools" },
  { label: "LIBRARY", href: "#library" },
  { label: "SHOWCASE", href: "#built-from-scratch" },
  { label: "CONTACT", href: "#contact" },
];

function useLocalTime() {
  const [time, setTime] = useState<{ formatted: string; date: string } | null>(null);

  useEffect(() => {
    function update() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const months = [
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

      setTime({
        formatted: `${hours}:${minutes}:${seconds}`,
        date: `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`,
      });
    }

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
}

export function Footer() {
  const time = useLocalTime();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full overflow-hidden bg-[#070708]">
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <img
          src="/images/footer_bg.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center opacity-75"
          style={{
            filter: "brightness(0.8) contrast(1.22) saturate(1.05)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(197,38,26,0.2),transparent_32%),linear-gradient(180deg,rgba(10,10,12,0.98)_0%,rgba(10,10,12,0.54)_24%,rgba(8,8,10,0.82)_66%,rgba(5,5,6,0.98)_100%)]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1540px] px-5 py-20 sm:px-10 sm:py-24 lg:px-24 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative border border-white/10 bg-black/35 p-5 shadow-[0_28px_90px_rgba(0,0,0,0.52)] backdrop-blur-md sm:p-7 lg:p-9"
        >
          {/* Corner accents */}
          <div className="pointer-events-none absolute left-3 top-3 h-5 w-5 border-l border-t border-[#c92a2a]/70" />
          <div className="pointer-events-none absolute right-3 top-3 h-5 w-5 border-r border-t border-white/25" />
          <div className="pointer-events-none absolute bottom-3 left-3 h-5 w-5 border-b border-l border-white/25" />
          <div className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 border-b border-r border-[#c92a2a]/70" />

          {/* ── QUOTE AREA ─────────────────────────────────── */}
          <div className="flex flex-col items-center justify-center py-16 sm:py-20 lg:py-28 relative">
            {/* Ghost watermark text behind the quote */}
            <div
              className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden"
              aria-hidden="true"
            >
              <span className="font-serif italic text-[clamp(5rem,18vw,16rem)] text-white/[0.025] leading-none whitespace-nowrap">
                always
              </span>
            </div>

            <h2 className="relative text-center font-serif italic text-[clamp(1.6rem,4.5vw,4rem)] leading-[1.2] text-[#c5a880]/90 max-w-3xl">
              &ldquo;Let&apos;s make something worth remembering.&rdquo;
            </h2>
            <p className="relative mt-5 font-mono text-[10px] uppercase tracking-[0.32em] text-white/35">
              — Always open to great work
            </p>
          </div>

          {/* ── SUB-FOOTER BAR ──────────────────────────────── */}
          <div className="border-t border-white/10 pt-6">
            {/* Top row: Logo + Time | Nav links | Back to top */}
            <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
                <span className="font-display text-2xl tracking-wide text-white">
                  LN<span className="text-[#c92a2a]">.</span>
                </span>

                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/42">
                  <span className="mr-2 text-white/24">Local Time</span>
                  {time ? (
                    <>
                      <span className="tabular-nums text-white/80">{time.formatted}</span>
                      <span className="ml-2 text-white/38">{time.date}</span>
                    </>
                  ) : (
                    <span className="text-white/50">Syncing</span>
                  )}
                </div>
              </div>

              <nav className="flex flex-wrap gap-x-6 gap-y-3">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/48 transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <div className="flex items-center gap-5">
                <button
                  onClick={scrollToTop}
                  className="group flex w-fit items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/55 transition-colors duration-300 hover:text-white"
                  aria-label="Scroll to top"
                >
                  Back to top
                  <span className="flex h-9 w-9 items-center justify-center border border-white/15 bg-white/[0.025] transition-all duration-300 group-hover:border-[#c92a2a]/60 group-hover:bg-[#c92a2a]/10">
                    <ArrowUp className="h-4 w-4" />
                  </span>
                </button>
              </div>
            </div>

            {/* Bottom line: copyright */}
            <div className="mt-4 flex items-center justify-between border-t border-white/[0.05] pt-4 xl:justify-end">
              <span className="font-mono text-[9px] text-white/25 uppercase tracking-wide">
                © 2025 · Crafted with care
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
