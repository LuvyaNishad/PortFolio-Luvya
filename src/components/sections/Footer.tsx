"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
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
    <footer className="relative w-full overflow-hidden">
      {/* ── BACKGROUND IMAGE ─────────────────────────────── */}
      <div
        className="absolute inset-0 z-0"
        aria-hidden="true"
      >
        <img
          src="/images/footer_bg.png"
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            opacity: 1.0,
            filter: "brightness(1.5) contrast(1.15) saturate(1.4)",
          }}
        />
        {/* Subtle radial vignette layer to help content stand out */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.6) 100%)",
            pointerEvents: "none",
          }}
        />
        {/* Soft bottom-to-top shadow gradient to make footer bottom bar text extra readable */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 35%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* ── QUOTE SECTION ────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-28 pb-20 sm:pt-36 sm:pb-28 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif italic text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] text-[#e8dcc8] text-center leading-snug tracking-wide [text-shadow:0_4px_16px_rgba(0,0,0,0.5)]"
        >
          &ldquo;Let&apos;s make something worth remembering.&rdquo;
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-white/70 uppercase mt-5 [text-shadow:0_2px_8px_rgba(0,0,0,0.5)]"
        >
          — Always open to great work
        </motion.p>
      </div>

      {/* ── DIVIDER ──────────────────────────────────────── */}
      <div className="relative z-10 mx-6 sm:mx-12 lg:mx-24">
        <div className="h-[1px] bg-white/10" />
      </div>

      {/* ── BOTTOM BAR ───────────────────────────────────── */}
      <div className="relative z-10 mx-6 sm:mx-12 lg:mx-24 py-7 sm:py-8">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-8">

          {/* LEFT — Logo + Local Time */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center md:items-start gap-2"
          >
            {/* Logo mark */}
            <span className="font-display text-xl sm:text-2xl text-white/95 tracking-wider [text-shadow:0_2px_8px_rgba(0,0,0,0.4)]">
              LN<span className="text-[#c92a2a]">.</span>
            </span>

            {/* Local time */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] tracking-[0.15em] text-white/60 uppercase">
                Local Time
              </span>
              {time && (
                <>
                  <span className="font-mono text-[11px] text-white/90 tabular-nums">
                    {time.formatted}
                  </span>
                  <span className="font-mono text-[9px] text-white/65">
                    {time.date}
                  </span>
                </>
              )}
            </div>
          </motion.div>

          {/* CENTER — Navigation Links */}
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-6 sm:gap-8 flex-wrap justify-center"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-mono text-[10px] sm:text-[11px] tracking-[0.15em] text-white/70 uppercase hover:text-white transition-colors duration-300 [text-shadow:0_2px_8px_rgba(0,0,0,0.3)]"
              >
                {link.label}
              </a>
            ))}
          </motion.nav>

          {/* RIGHT — Back to Top + Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col items-center md:items-end gap-3"
          >
            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 cursor-pointer"
              aria-label="Scroll to top"
            >
              <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.15em] text-white/70 uppercase group-hover:text-white transition-colors duration-300 [text-shadow:0_2px_8px_rgba(0,0,0,0.3)]">
                Back to Top
              </span>
              <div className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/50 group-hover:bg-white/10 transition-all duration-300">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className="text-white/60 group-hover:text-white transition-colors duration-300"
                >
                  <path
                    d="M6 10V2M6 2L2 6M6 2L10 6"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>

            {/* Copyright */}
            <span className="font-mono text-[9px] tracking-[0.1em] text-white/50">
              © 2025 · Crafted with care
            </span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
