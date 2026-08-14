"use client";

import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export interface LightBeamButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  gradientColors?: [string, string, string];
}

/**
 * LightBeamButton
 *
 * A high-performance button with a rotating light beam border effect.
 * Uses CSS @property for smooth gradient rotation animations.
 * Adapted to the Aurelius portfolio's tactical/dark aesthetic.
 */
export function LightBeamButton({
  children,
  className,
  onClick,
  href,
  gradientColors = ["rgba(255,255,255,0.55)", "#8B6840", "rgba(255,255,255,0.55)"],
}: LightBeamButtonProps) {
  const gradientString = `conic-gradient(from var(--gradient-angle), transparent 0%, ${gradientColors[0]} 40%, ${gradientColors[1]} 50%, transparent 60%, transparent 100%)`;

  const sharedClasses = cn(
    "group relative inline-flex items-center justify-center isolate overflow-hidden rounded-full px-7 py-3.5 bg-neutral-950",
    "text-[10.5px] font-mono tracking-[0.2em] uppercase text-white/75 hover:text-white",
    "transition-all duration-300",
    "shadow-[0_0_20px_-8px_rgba(139,104,64,0.25)] hover:shadow-[0_0_28px_-6px_rgba(139,104,64,0.45)]",
    className
  );

  const innerContent = (
    <>
      <span className="relative z-10 flex items-center justify-inherit w-full gap-2.5">
        {children}
      </span>

      {/* Rotating gradient border */}
      <div
        className="absolute inset-0 -z-10 rounded-full p-[1px] animate-border-spin"
        style={
          {
            "--gradient-angle": "0deg",
            background: gradientString,
          } as React.CSSProperties
        }
      />

      {/* Inner solid background — keeps text readable */}
      <div className="absolute inset-[1px] -z-10 rounded-full bg-neutral-950" />

      {/* Hover shine overlay */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(139,104,64,0.18)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onClick}
        className={sharedClasses}
      >
        {innerContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={sharedClasses}
    >
      {innerContent}
    </motion.button>
  );
}
