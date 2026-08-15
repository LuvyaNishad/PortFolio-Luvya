"use client";

import { useEffect, useRef } from "react";

/**
 * CustomCursor — "Aurelius Glass Reticle"
 *
 * A multi-layered tactical cursor that matches the portfolio's HUD aesthetic:
 *
 *  ┌─                  ─┐
 *  │    ╌╌╌╌╌╌╌╌╌╌╌     │    ← spinning dashed orbit
 *  │   ╌           ╌    │
 *  │  ╌   ┌─   ─┐  ╌   │    ← glass ring with corner brackets
 *  │  ╌   │  ●  │  ╌    │    ← precision dot with glow
 *  │  ╌   └─   ─┘  ╌   │
 *  │   ╌           ╌    │
 *  │    ╌╌╌╌╌╌╌╌╌╌╌     │
 *  └─                  ─┘
 *
 * Performance: All position tracking via refs + RAF. Zero re-renders.
 * States: Default → Hover (expand + accent) → Click (snap inward)
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);

  /* Position refs — no state, no re-renders */
  const mouse = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });
  const trailPos = useRef([
    { x: -200, y: -200 },
    { x: -200, y: -200 },
    { x: -200, y: -200 },
  ]);
  const rafId = useRef(0);

  useEffect(() => {
    /* ── Guard: skip on touch devices ── */
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;

    /* ── Inject global cursor: none ── */
    const styleTag = document.createElement("style");
    styleTag.id = "aurelius-cursor-hide";
    styleTag.textContent = `
      *, *::before, *::after { cursor: none !important; }
      html { cursor: none !important; }
    `;
    document.head.appendChild(styleTag);

    const dot = dotRef.current;
    const ring = ringRef.current;
    const ringInner = ring?.querySelector<HTMLElement>(".cursor-ring-inner");
    const dotInner = dot?.querySelector<HTMLElement>(".cursor-dot-inner");

    let isLooping = false;

    const startLoop = () => {
      if (!isLooping) {
        isLooping = true;
        rafId.current = requestAnimationFrame(animate);
      }
    };

    /* ── Mouse move — dot tracks instantly ── */
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      // Reveal on first move
      if (dot) dot.style.opacity = "1";
      if (ring) ring.style.opacity = "1";
      trailRefs.current.forEach((t) => {
        if (t) t.style.opacity = "1";
      });

      // Dot follows exactly — no lag
      if (dot) {
        dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      startLoop();
    };

    /* ── Click states ── */
    const onDown = () => {
      ringInner?.classList.add("cursor-clicking");
      dotInner?.classList.add("cursor-clicking");
      startLoop();
    };

    const onUp = () => {
      ringInner?.classList.remove("cursor-clicking");
      dotInner?.classList.remove("cursor-clicking");
    };

    /* ── Hover detection for interactive elements ── */
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        !!target.closest?.(
          "a, button, [role='button'], label, [data-cursor-hover]"
        );

      if (isInteractive) {
        ringInner?.classList.add("cursor-hovering");
      } else {
        ringInner?.classList.remove("cursor-hovering");
      }
    };

    /* ── Visibility ── */
    const onLeave = () => {
      if (dot) dot.style.opacity = "0";
      if (ring) ring.style.opacity = "0";
      trailRefs.current.forEach((t) => {
        if (t) t.style.opacity = "0";
      });
    };

    const onEnter = () => {
      if (dot) dot.style.opacity = "1";
      if (ring) ring.style.opacity = "1";
      trailRefs.current.forEach((t) => {
        if (t) t.style.opacity = "1";
      });
      startLoop();
    };

    /* ── Animation loop (RAF) — idles when settled ── */
    const animate = () => {
      let isSettled = true;

      // Ring — smooth spring-like lerp follow
      const ringDx = mouse.current.x - ringPos.current.x;
      const ringDy = mouse.current.y - ringPos.current.y;
      ringPos.current.x += ringDx * 0.13;
      ringPos.current.y += ringDy * 0.13;

      if (Math.abs(ringDx) > 0.15 || Math.abs(ringDy) > 0.15) {
        isSettled = false;
      }

      if (ring) {
        ring.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      // Trails — cascading lerp for organic motion
      const lerps = [0.09, 0.06, 0.035];
      const targets = [
        mouse.current,
        trailPos.current[0],
        trailPos.current[1],
      ];

      trailPos.current.forEach((pos, i) => {
        const tDx = targets[i].x - pos.x;
        const tDy = targets[i].y - pos.y;
        pos.x += tDx * lerps[i];
        pos.y += tDy * lerps[i];

        if (Math.abs(tDx) > 0.15 || Math.abs(tDy) > 0.15) {
          isSettled = false;
        }

        const el = trailRefs.current[i];
        if (el) {
          el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
        }
      });

      if (!isSettled) {
        rafId.current = requestAnimationFrame(animate);
      } else {
        isLooping = false;
      }
    };

    /* ── Attach listeners ── */
    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mousedown", onDown, { passive: true });
    document.addEventListener("mouseup", onUp, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    startLoop();

    /* ── Cleanup ── */
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      const tag = document.getElementById("aurelius-cursor-hide");
      if (tag) tag.remove();
    };
  }, []);

  return (
    <>
      {/* ── Trailing ghost dots ── */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) trailRefs.current[i] = el;
          }}
          className="cursor-trail"
          aria-hidden="true"
        >
          <div
            className="cursor-trail-dot"
            style={{
              width: `${3 - i * 0.6}px`,
              height: `${3 - i * 0.6}px`,
              opacity: 0.22 - i * 0.05,
              filter: `blur(${0.5 + i * 0.4}px)`,
            }}
          />
        </div>
      ))}

      {/* ── Glass Reticle Ring ── */}
      <div ref={ringRef} className="cursor-ring-wrapper" aria-hidden="true">
        <div className="cursor-ring-inner">
          {/* Glass circle */}
          <div className="cursor-ring-circle" />

          {/* Corner brackets — matching portfolio's tactical bracket motif */}
          <div className="cursor-bracket cursor-bracket--tl" />
          <div className="cursor-bracket cursor-bracket--tr" />
          <div className="cursor-bracket cursor-bracket--bl" />
          <div className="cursor-bracket cursor-bracket--br" />

          {/* Crosshair lines */}
          <div className="cursor-crosshair cursor-crosshair--h" />
          <div className="cursor-crosshair cursor-crosshair--v" />

          {/* Spinning dashed orbit */}
          <div className="cursor-orbit" />
        </div>
      </div>

      {/* ── Precision Dot ── */}
      <div ref={dotRef} className="cursor-dot-wrapper" aria-hidden="true">
        <div className="cursor-dot-inner">
          <div className="cursor-dot-core" />
          <div className="cursor-dot-glow" />
        </div>
      </div>
    </>
  );
}
