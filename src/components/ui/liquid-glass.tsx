"use client";

import React from "react";

// Types
interface GlassEffectProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  target?: string;
}

interface DockIcon {
  src: string;
  alt: string;
  onClick?: () => void;
}

/**
 * GlassFilter — The hidden SVG <defs> for the liquid distortion effect.
 *
 * IMPORTANT: Must be rendered once near the top of the page (or at root),
 * NOT inside elements with overflow:hidden, because SVG filter references
 * (#glass-distortion) are resolved from the document root.
 *
 * Key fixes vs the original:
 * - filterUnits="userSpaceOnUse" instead of objectBoundingBox — prevents
 *   the frequency from being multiplied by element dimensions (which caused
 *   extreme distortion on large elements).
 * - feDisplacementMap scale="8" instead of 200 — 200 was destructively large,
 *   tearing pixels 200px apart. 8 creates a subtle, authentic glass wobble.
 * - The feGaussianBlur softening the displacement map is tuned to create smooth
 *   gradual refraction rather than sharp discontinuities.
 */
export const GlassFilter: React.FC = () => (
  <svg
    style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    aria-hidden="true"
  >
    <defs>
      <filter
        id="glass-distortion"
        x="-5%"
        y="-5%"
        width="110%"
        height="110%"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="linearRGB"
      >
        {/* Generate smooth fractal noise for the displacement map */}
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.012 0.018"
          numOctaves="2"
          seed="5"
          result="rawNoise"
        />
        {/* Blur the noise to create smooth, gradual displacement */}
        <feGaussianBlur in="rawNoise" stdDeviation="8" result="softNoise" />
        {/*
          Displace source pixels using the blurred noise.
          scale="8" = max 8px displacement — visually reads as liquid glass
          without destroying the underlying content.
        */}
        <feDisplacementMap
          in="SourceGraphic"
          in2="softNoise"
          scale="8"
          xChannelSelector="R"
          yChannelSelector="G"
          result="displaced"
        />
      </filter>
    </defs>
  </svg>
);

// Glass Effect Wrapper Component
const GlassEffect: React.FC<GlassEffectProps> = ({
  children,
  className = "",
  style = {},
  href,
  target = "_blank",
}) => {
  const glassStyle: React.CSSProperties = {
    // Outer drop shadow
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255,255,255,0.08)",
    transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 2.2)",
    // Semi-transparent frosted background
    background: "rgba(255, 255, 255, 0.15)",
    // Frosted glass blur
    backdropFilter: "blur(14px) saturate(1.6) brightness(1.05)",
    WebkitBackdropFilter: "blur(14px) saturate(1.6) brightness(1.05)",
    ...style,
  };

  const content = (
    <div
      className={`relative flex font-semibold overflow-hidden cursor-pointer transition-all duration-700 ${className}`}
      style={glassStyle}
    >
      {/*
        The subtle distortion filter is applied here as a CSS filter on the
        wrapper div itself — it displaces the RENDERED output of the element
        (backdrop + children), creating authentic liquid glass refraction.

        This is correct: filter on a div distorts the composited layer.
        What was WRONG before was applying it INSIDE a backdropFilter layer,
        causing the dark blob artifacts.
      */}
      <div
        className="absolute inset-0 z-0 rounded-inherit"
        style={{ filter: "url(#glass-distortion)", opacity: 0.6, pointerEvents: "none" }}
      />

      {/* Bright specular highlight at top edge */}
      <div
        className="absolute left-0 right-0 z-10 pointer-events-none"
        style={{
          top: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.7) 30%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.7) 70%, transparent)",
        }}
      />

      {/* Glass border highlight — physical bevel simulation */}
      <div
        className="absolute inset-0 z-10 rounded-inherit overflow-hidden pointer-events-none"
        style={{
          boxShadow:
            "inset 0 1px 1px rgba(255,255,255,0.55), inset 0 -1px 1px rgba(255,255,255,0.15), inset 1px 0 1px rgba(255,255,255,0.35), inset -1px 0 1px rgba(255,255,255,0.15)",
        }}
      />

      {/* Caustic light overlay — simulates light bending through glass */}
      <div
        className="absolute inset-0 z-10 pointer-events-none rounded-inherit"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 20% 15%, rgba(255,255,255,0.18) 0%, transparent 65%), radial-gradient(ellipse 50% 35% at 80% 80%, rgba(255,255,255,0.08) 0%, transparent 65%)",
        }}
      />

      {/* Content */}
      <div className="relative z-30">{children}</div>
    </div>
  );

  return href ? (
    <a href={href} target={target} rel="noopener noreferrer" className="block">
      {content}
    </a>
  ) : (
    content
  );
};

// Dock Component
const GlassDock: React.FC<{ icons: DockIcon[]; href?: string }> = ({
  icons,
  href,
}) => (
  <GlassEffect
    href={href}
    className="rounded-3xl p-3 hover:p-4 hover:rounded-4xl"
  >
    <div className="flex items-center justify-center gap-2 rounded-3xl p-3 py-0 px-0.5 overflow-hidden">
      {icons.map((icon, index) => (
        <img
          key={index}
          src={icon.src}
          alt={icon.alt}
          className="w-16 h-16 transition-all duration-700 hover:scale-110 cursor-pointer"
          style={{
            transformOrigin: "center center",
            transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 2.2)",
          }}
          onClick={icon.onClick}
        />
      ))}
    </div>
  </GlassEffect>
);

// Button Component
const GlassButton: React.FC<{ children: React.ReactNode; href?: string }> = ({
  children,
  href,
}) => (
  <GlassEffect
    href={href}
    className="rounded-3xl px-10 py-6 hover:px-11 hover:py-7 hover:rounded-4xl overflow-hidden"
  >
    <div
      className="transition-all duration-700 hover:scale-95"
      style={{
        transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 2.2)",
      }}
    >
      {children}
    </div>
  </GlassEffect>
);

// Main Component (demo)
export const Component = () => {
  const dockIcons: DockIcon[] = [
    {
      src: "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/a13d1acfd046f503f987c1c95af582c8_low_res_Claude.png",
      alt: "Claude",
    },
    {
      src: "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/9e80c50a5802d3b0a7ec66f3fe4ce348_low_res_Finder.png",
      alt: "Finder",
    },
    {
      src: "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/c2c4a538c2d42a8dc0927d7d6530d125_low_res_ChatGPT___Liquid_Glass__Default_.png",
      alt: "Chatgpt",
    },
    {
      src: "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/6d26d432bd65c522b0708185c0768ec3_low_res_Maps.png",
      alt: "Maps",
    },
    {
      src: "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/7c59c945731aecf4f91eb8c2c5f867ce_low_res_Safari.png",
      alt: "Safari",
    },
    {
      src: "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/b7f24edc7183f63dbe34c1943bef2967_low_res_Steam___Liquid_Glass__Default_.png",
      alt: "Steam",
    },
  ];

  return (
    <div
      className="min-h-screen h-full flex items-center justify-center font-light relative overflow-hidden w-full"
      style={{
        background: `url("https://images.unsplash.com/photo-1432251407527-504a6b4174a2?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D") center center`,
        animation: "moveBackground 60s linear infinite",
      }}
    >
      {/* GlassFilter placed at root of component so it's not clipped by overflow:hidden */}
      <GlassFilter />

      <div className="flex flex-col gap-6 items-center justify-center w-full">
        <GlassDock icons={dockIcons} href="https://x.com/notsurajgaud" />

        <GlassButton href="https://x.com/notsurajgaud">
          <div className="text-xl text-white">
            <p>How can i help you today?</p>
          </div>
        </GlassButton>
      </div>
    </div>
  );
};
