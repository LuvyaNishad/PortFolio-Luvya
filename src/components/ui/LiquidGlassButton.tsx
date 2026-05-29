"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { LiquidGlassEffect } from "./LiquidGlassEffect";

export interface LiquidGlassButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  variant?: "dark" | "light";
  intensity?: "subtle" | "medium" | "strong";
}

/**
 * LiquidGlassButton
 *
 * A premium interactive button leveraging the fixed LiquidGlassEffect wrapper.
 * Features framer-motion micro-animations and a bounce ease on hover/tap.
 */
export function LiquidGlassButton({
  children,
  className,
  onClick,
  href,
  target,
  variant = "dark",
  intensity = "medium",
}: LiquidGlassButtonProps) {
  const innerContent = (
    <div
      className="transition-transform duration-500 hover:scale-[0.97]"
      style={{ transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 1.8)" }}
    >
      {children}
    </div>
  );

  const sharedClasses = cn(
    "overflow-hidden rounded-full font-mono uppercase tracking-[0.18em] text-[10.5px] font-semibold select-none cursor-pointer",
    variant === "dark" ? "text-white/80 hover:text-white" : "text-black/85 hover:text-black",
    "px-8 py-3.5",
    className
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        onClick={onClick}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="block w-fit focus:outline-none"
      >
        <LiquidGlassEffect
          variant={variant}
          intensity={intensity}
          backdropBlur={18}
          className={cn("rounded-full", sharedClasses)}
        >
          {innerContent}
        </LiquidGlassEffect>
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="block w-fit focus:outline-none border-0 bg-transparent p-0"
    >
      <LiquidGlassEffect
        variant={variant}
        intensity={intensity}
        backdropBlur={18}
        className={cn("rounded-full", sharedClasses)}
      >
        {innerContent}
      </LiquidGlassEffect>
    </motion.button>
  );
}
