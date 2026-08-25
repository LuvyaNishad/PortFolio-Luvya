"use client";

import { motion } from "framer-motion";

/* ─────────────────────────────────────────────────
   ArtifactMedia — image with graceful tactical fallback.

   Real showcase cards use this for their thumbnail/preview.
   - If `src` is provided, the image renders (lazy-loaded).
   - If `src` is empty (an entry added before its asset is
     ready), a themed placeholder renders instead — never a
     broken image icon or a 404.

   The `layoutId`, when provided, enables shared
   grid → modal expand animation.
───────────────────────────────────────────────── */
export function ArtifactMedia({
  layoutId,
  src,
  alt,
  accent,
  prefix,
  className = "",
  style,
}: {
  layoutId?: string;
  src?: string;
  alt: string;
  accent: string;
  prefix?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  if (src) {
    return (
      <motion.img
        {...(layoutId ? { layoutId } : {})}
        src={src}
        alt={alt}
        loading="lazy"
        className={className}
        style={style}
      />
    );
  }

  return (
    <motion.div
      {...(layoutId ? { layoutId } : {})}
      className="absolute inset-0 flex items-center justify-center bg-black/40"
      aria-label={alt}
    >
      {/* Inner dashed frame */}
      <div className="absolute inset-4 border border-dashed border-white/10" />

      <div className="relative flex flex-col items-center gap-2">
        {prefix && (
          <span
            className="font-display text-2xl tracking-[0.12em] opacity-60"
            style={{ color: accent }}
          >
            {prefix}
          </span>
        )}
        <span className="font-mono text-[8px] tracking-[0.22em] uppercase text-white/30">
          Awaiting Asset
        </span>
      </div>
    </motion.div>
  );
}
