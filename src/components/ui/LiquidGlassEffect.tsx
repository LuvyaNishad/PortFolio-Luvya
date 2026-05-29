"use client";

import React, { ReactNode } from "react";
import { cn } from "@/utils/cn";

export interface LiquidGlassEffectProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  variant?: "dark" | "light";
  backdropBlur?: number; // CSS backdrop-filter blur in pixels, default 24
  intensity?: "subtle" | "medium" | "strong"; // Controls overlay opacity / highlight strength
}

/**
 * LiquidGlassEffect
 *
 * A reusable, high-fidelity glassmorphism container built entirely with CSS.
 *
 * WHY no SVG filter on the backdrop:
 * - `backdropFilter` blurs what is rendered BEHIND the element in the compositing stack.
 * - `filter: url(#svg)` applies to the element's OWN rendered output (children + bg).
 * - Stacking both causes the browser to run the SVG displacement on the already-blurred
 *   backdrop result, producing black artifacts and destroying the glass look.
 *
 * The "liquid" / "specular" quality is achieved correctly with:
 * 1. A strong `backdrop-filter` blur for the frosted glass base.
 * 2. A semi-transparent tinted background so the scene behind bleeds through.
 * 3. A radial + linear gradient overlay that simulates light refraction / caustics.
 * 4. Inset box-shadow for the physical beveled-glass border highlight.
 * 5. A top-edge shine strip that mimics a specular reflection on curved glass.
 */
export function LiquidGlassEffect({
  children,
  className,
  style = {},
  variant = "dark",
  backdropBlur = 24,
  intensity = "medium",
}: LiquidGlassEffectProps) {
  const isDark = variant === "dark";

  // Overlay alpha driven by intensity — lower = more transparent / see-through
  const alphaMap = { subtle: 0.14, medium: 0.26, strong: 0.44 };
  const overlayAlpha = alphaMap[intensity];

  const glassStyle: React.CSSProperties = {
    // Main glass surface tint
    background: isDark
      ? `rgba(10, 10, 14, ${overlayAlpha})`
      : `rgba(255, 255, 255, ${overlayAlpha})`,
    // Backdrop blur — this is the actual frosted glass
    backdropFilter: `blur(${backdropBlur}px) saturate(1.3) brightness(${isDark ? "0.82" : "1.06"})`,
    WebkitBackdropFilter: `blur(${backdropBlur}px) saturate(1.3) brightness(${isDark ? "0.82" : "1.06"})`,
    // Deep drop shadow + subtle ambient outer glow
    boxShadow: isDark
      ? "0 16px 48px -12px rgba(0,0,0,0.65), 0 2px 0 0 rgba(255,255,255,0.06)"
      : "0 8px 32px -8px rgba(0,0,0,0.18), 0 2px 0 0 rgba(255,255,255,0.55)",
    ...style,
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden transition-all duration-700",
        className
      )}
      style={glassStyle}
    >
      {/*
        Layer 1 — Light caustic / refraction gradient overlay.
        Simulates how light bends through curved glass and creates
        a bright region in the upper-left and a dimmer region below.
        This is what gives the "liquid" quality without needing broken SVG filters.
      */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: isDark
            ? `
                radial-gradient(ellipse 80% 55% at 15% 10%, rgba(255,255,255,0.055) 0%, transparent 70%),
                radial-gradient(ellipse 60% 40% at 85% 85%, rgba(255,255,255,0.025) 0%, transparent 70%),
                linear-gradient(160deg, rgba(255,255,255,0.04) 0%, transparent 45%, rgba(0,0,0,0.12) 100%)
              `
            : `
                radial-gradient(ellipse 80% 55% at 15% 10%, rgba(255,255,255,0.45) 0%, transparent 70%),
                radial-gradient(ellipse 60% 40% at 85% 85%, rgba(255,255,255,0.2) 0%, transparent 70%),
                linear-gradient(160deg, rgba(255,255,255,0.3) 0%, transparent 45%)
              `,
        }}
      />

      {/*
        Layer 2 — Physical glass bevel (inset border highlight).
        Real glass has specular highlights at its edges — brighter at top-left
        (lit) and darker at bottom-right (shadowed). We use inset box-shadow only
        since a border would add to layout dimensions.
      */}
      <div
        className="absolute inset-0 pointer-events-none rounded-inherit"
        style={{
          zIndex: 2,
          boxShadow: isDark
            ? `
                inset 0 1px 0 0 rgba(255,255,255,0.14),
                inset 0 -1px 0 0 rgba(255,255,255,0.04),
                inset 1px 0 0 0 rgba(255,255,255,0.08),
                inset -1px 0 0 0 rgba(255,255,255,0.04)
              `
            : `
                inset 0 1px 0 0 rgba(255,255,255,0.75),
                inset 0 -1px 0 0 rgba(255,255,255,0.2),
                inset 1px 0 0 0 rgba(255,255,255,0.5),
                inset -1px 0 0 0 rgba(255,255,255,0.2)
              `,
        }}
      />

      {/*
        Layer 3 — Top-edge specular shine strip.
        On physical glass, there's a thin bright line at the very top where
        light reflects off the curved surface. This thin gradient replicates that.
      */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          zIndex: 3,
          top: 0,
          height: "1px",
          background: isDark
            ? "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.22) 30%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0.22) 70%, transparent 100%)"
            : "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 30%, rgba(255,255,255,1.0) 50%, rgba(255,255,255,0.8) 70%, transparent 100%)",
        }}
      />

      {/* Content — always on top of all glass layers */}
      <div className="relative h-full w-full" style={{ zIndex: 10 }}>
        {children}
      </div>
    </div>
  );
}
