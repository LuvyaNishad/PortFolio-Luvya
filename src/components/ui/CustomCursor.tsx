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
 * Every visual is defined in globals.css (search "AURELIUS GLASS RETICLE").
 * This file only moves things and toggles two class names, so restyling the
 * cursor never means touching JavaScript.
 *
 * ── How it stays cheap ──────────────────────────────────────────
 *  • Zero React re-renders. Positions live in refs; the DOM is written
 *    directly.
 *  • ALL style writes happen inside one requestAnimationFrame callback.
 *    A high-polling-rate mouse fires `mousemove` 8–16× per displayed
 *    frame; batching in RAF collapses that into a single write per frame
 *    with no added latency, because the browser can't paint in between
 *    regardless.
 *  • The RAF loop shuts itself off once everything has settled, so an
 *    idle page costs nothing.
 *  • Hover detection memoises the last element it looked at, so
 *    `closest()` (which walks up the whole ancestor chain) runs once per
 *    element entered rather than once per `mouseover` event.
 *  • `cursor: none` is a static rule in globals.css toggled by a class on
 *    <html>, not a stylesheet injected at runtime — one less full style
 *    recalculation at mount.
 */

/**
 * The cursor is part of the atmosphere here, so — exactly like the monolith
 * crash timeline in Hero.tsx — we deliberately keep it on when the OS asks
 * for reduced motion. Flip this to `true` for full compliance: the reticle
 * then disappears and the normal system cursor comes back.
 *
 * The CSS twin of this decision lives in the REDUCED MOTION block of
 * globals.css. Change both together.
 */
const HONOR_REDUCED_MOTION: boolean = false;

/** Elements that should make the reticle expand and turn red. */
const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], [role='tab'], [role='link'], label, input, textarea, select, summary, .cursor-pointer, [data-cursor-hover]";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);

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
    /* ── Guards ──────────────────────────────────────────────────
       Touch devices get nothing: there's no pointer to replace, and
       hiding the cursor there would be actively harmful.

       If we bail for ANY reason we must not add the `cursor-hidden`
       class, or the visitor is left with no visible pointer at all. */
    if (window.matchMedia("(hover: none)").matches) return;
    if (
      HONOR_REDUCED_MOTION &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const ringInner = ring.querySelector<HTMLElement>(".cursor-ring-inner");
    const dotInner = dot.querySelector<HTMLElement>(".cursor-dot-inner");

    /* Take over the pointer. Paired with the .cursor-hidden rule in
       globals.css; removed again in cleanup below. */
    const root = document.documentElement;
    root.classList.add("cursor-hidden");

    /* Every layer that fades in together, collected once so the reveal
       doesn't re-walk refs on each event. */
    const layers: HTMLElement[] = [dot, ring];
    for (const t of trailRefs.current) if (t) layers.push(t);

    let looping = false;
    /* The dot needs a write on the next frame. Also used to force one
       extra frame after the final mousemove so the ring can catch up. */
    let dotDirty = false;
    let revealed = false;

    /* Hover memoisation — `mouseover` fires on every element boundary
       crossed, but the answer only changes when the element does. */
    let lastTarget: EventTarget | null = null;
    let isHovering = false;

    const setOpacity = (value: string) => {
      for (const el of layers) el.style.opacity = value;
    };

    const startLoop = () => {
      if (looping) return;
      looping = true;
      rafId.current = requestAnimationFrame(animate);
    };

    /* ── Animation loop — the ONLY place that writes transforms ── */
    const animate = () => {
      let settled = true;

      /* Dot — pins to the pointer exactly, no easing. */
      if (dotDirty) {
        dot.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0)`;
        dotDirty = false;
        /* Keep the loop alive one more frame so the ring and trails,
           which ease toward the pointer, can follow. */
        settled = false;
      }

      /* Ring — smooth spring-like lerp follow */
      const ringDx = mouse.current.x - ringPos.current.x;
      const ringDy = mouse.current.y - ringPos.current.y;
      ringPos.current.x += ringDx * 0.13;
      ringPos.current.y += ringDy * 0.13;

      if (Math.abs(ringDx) > 0.15 || Math.abs(ringDy) > 0.15) settled = false;

      ring.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;

      /* Trails — each dot chases the one ahead of it, giving the
         cascading organic lag. Read the target inline rather than
         building an array, so the loop allocates nothing per frame. */
      const lerps = [0.09, 0.06, 0.035];
      for (let i = 0; i < 3; i++) {
        const pos = trailPos.current[i];
        const target = i === 0 ? mouse.current : trailPos.current[i - 1];

        const dx = target.x - pos.x;
        const dy = target.y - pos.y;
        pos.x += dx * lerps[i];
        pos.y += dy * lerps[i];

        if (Math.abs(dx) > 0.15 || Math.abs(dy) > 0.15) settled = false;

        const el = trailRefs.current[i];
        if (el) {
          el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
        }
      }

      if (settled) {
        looping = false;
      } else {
        rafId.current = requestAnimationFrame(animate);
      }
    };

    /* ── Pointer movement — records only, never writes ── */
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      dotDirty = true;

      if (!revealed) {
        revealed = true;
        ringPos.current.x = e.clientX;
        ringPos.current.y = e.clientY;
        for (let i = 0; i < 3; i++) {
          trailPos.current[i].x = e.clientX;
          trailPos.current[i].y = e.clientY;
        }
        setOpacity("1");
      }

      startLoop();
    };

    /* ── Click states ── */
    const onDown = () => {
      ringInner?.classList.add("cursor-clicking");
      dotInner?.classList.add("cursor-clicking");
    };

    const onUp = () => {
      ringInner?.classList.remove("cursor-clicking");
      dotInner?.classList.remove("cursor-clicking");
    };

    /* ── Hover detection for interactive elements ── */
    const onOver = (e: MouseEvent) => {
      if (e.target === lastTarget) return;
      lastTarget = e.target;

      const target = e.target as HTMLElement | null;
      const hovering = !!target?.closest?.(INTERACTIVE_SELECTOR);

      /* Only touch the DOM when the answer actually flips. */
      if (hovering === isHovering) return;
      isHovering = hovering;
      ringInner?.classList.toggle("cursor-hovering", hovering);
    };

    /* ── Visibility when the pointer leaves the window ── */
    const onLeave = () => {
      revealed = false;
      setOpacity("0");
      onUp();
    };

    const onEnter = (e: MouseEvent) => {
      if (e.clientX !== undefined && e.clientY !== undefined) {
        mouse.current.x = e.clientX;
        mouse.current.y = e.clientY;
        dotDirty = true;
      }
      startLoop();
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mousedown", onDown, { passive: true });
    document.addEventListener("mouseup", onUp, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    window.addEventListener("blur", onLeave);
    window.addEventListener("contextmenu", onUp);

    startLoop();

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("blur", onLeave);
      window.removeEventListener("contextmenu", onUp);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      root.classList.remove("cursor-hidden");
    };
  }, []);

  return (
    <>
      {/* ── Trailing ghost dots ── */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          ref={(el) => {
            trailRefs.current[i] = el;
            return () => {
              trailRefs.current[i] = null;
            };
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
