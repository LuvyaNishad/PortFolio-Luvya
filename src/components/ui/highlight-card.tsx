"use client";

import React, { FC, ReactNode, useState, useRef } from "react";
import { LiquidGlassEffect } from "@/components/ui/LiquidGlassEffect";

interface HighlightCardProps {
  /** Accent color for glow orbs (hex or CSS color) */
  accent?: string;
  /** Optional extra wrapper className */
  className?: string;
  children: ReactNode;
}

/**
 * HighlightCard
 *
 * A reusable animated card container that combines:
 * - High-fidelity glassmorphism (via LiquidGlassEffect)
 * - Premium 3D perspective tilt & zoom on hover
 * - Animated glowing accent orbs, shimmer sweep, and corner highlights
 */
const HighlightCard: FC<HighlightCardProps> = ({
  accent = "rgba(255,255,255,0.10)",
  className,
  children,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Calculate cursor position relative to card center (-0.5 to 0.5)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    // Smooth tilt angles (max 10 degrees rotation)
    setRotateY(x * 12);
    setRotateX(-y * 12);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group/hl w-full h-full ${className ?? ""}`}
      style={{
        perspective: "1000px",
        transform: isHovered
          ? `scale(1.04) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
          : "scale(1) rotateX(0deg) rotateY(0deg)",
        transition: isHovered ? "transform 0.08s ease-out" : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        transformStyle: "preserve-3d",
      }}
    >
      <LiquidGlassEffect
        variant="dark"
        intensity="subtle"
        backdropBlur={16}
        className="w-full h-full rounded-[6px] border border-white/10 bg-black/30 overflow-hidden relative"
      >
        {/* ── Animated background layers ─────────────────────── */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Base gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.03] to-white/[0.06] opacity-40 group-hover/hl:opacity-60 transition-opacity duration-500" />

          {/* Floating glow orb — bottom-left */}
          <div
            className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full blur-3xl opacity-20 group-hover/hl:opacity-40 transform group-hover/hl:scale-110 transition-all duration-700 animate-bounce"
            style={{ background: `radial-gradient(circle, ${accent}, transparent)` }}
          />

          {/* Subtle ping orb — top-left */}
          <div
            className="absolute top-8 left-8 w-12 h-12 rounded-full blur-xl animate-ping"
            style={{ background: accent, opacity: 0.05 }}
          />

          {/* Subtle ping orb — bottom-right */}
          <div
            className="absolute bottom-12 right-12 w-10 h-10 rounded-full blur-lg animate-ping"
            style={{ background: accent, opacity: 0.05 }}
          />

          {/* Diagonal shimmer sweep on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent transform -skew-x-12 translate-x-full group-hover/hl:translate-x-[-200%] transition-transform duration-1000" />
        </div>

        {/* ── Content ─────────────────────────────────────────── */}
        <div className="relative z-10 w-full h-full">
          {children}
        </div>

        {/* ── Corner accent patches (visible on hover) ────────── */}
        <div
          className="absolute top-0 left-0 w-16 h-16 rounded-br-3xl opacity-0 group-hover/hl:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `linear-gradient(135deg, ${accent}, transparent)` }}
        />
        <div
          className="absolute bottom-0 right-0 w-16 h-16 rounded-tl-3xl opacity-0 group-hover/hl:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `linear-gradient(315deg, ${accent}, transparent)` }}
        />
      </LiquidGlassEffect>
    </div>
  );
};

export default HighlightCard;
