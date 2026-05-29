"use client";

import { motion } from "framer-motion";
import { LightBeamButton } from "@/components/ui/LightBeamButton";

/**
 * Hero — content only. No background.
 * The background image is rendered in the parent (page.tsx)
 * so it can also show through the Intro card's backdrop-filter.
 */
export function Hero() {
  return (
    <section
      id="home"
      className="relative w-full"
      style={{ minHeight: "100vh", background: "transparent" }}
    >
      <div
        className="flex flex-col justify-start"
        style={{
          minHeight: "100vh",
          paddingLeft: "clamp(3rem, 8vw, 7rem)",
          paddingTop: "clamp(7rem, 28vh, 14rem)",
          paddingBottom: "2rem",
          maxWidth: "52%",
        }}
      >
        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-2.5 mb-6"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-white/65 flex-shrink-0" />
          <span className="font-mono text-[10px] tracking-[0.26em] text-white/55 uppercase">
            Available for projects
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display uppercase text-white mb-7 leading-[0.88]"
          style={{
            fontSize: "clamp(3rem, 6.8vw, 6rem)",
            fontWeight: 400,
            letterSpacing: "0.02em",
          }}
        >
          Designing Experiences.<br />
          Surviving the Details.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.68, duration: 0.8, ease: "easeOut" }}
          className="font-mono text-[12.5px] leading-[1.9] text-white/48 mb-10"
          style={{ maxWidth: 300 }}
        >
          UI/UX Designer crafting immersive,<br />
          user-centered experiences with<br />
          precision and purpose.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.92, duration: 0.7, ease: "easeOut" }}
        >
          <LightBeamButton href="#intro">
            VIEW MY WORK <span className="text-white/40 ml-1">→</span>
          </LightBeamButton>
        </motion.div>
      </div>
    </section>
  );
}
