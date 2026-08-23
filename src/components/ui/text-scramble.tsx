'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, MotionProps } from 'framer-motion';

/**
 * Tags this component can render as.
 *
 * These motion wrappers are built once, here at module scope. Building one
 * inside render (`motion.create(tag)`) returns a brand-new component *type*
 * every pass, which makes React throw the old DOM node away and mount a
 * fresh one — resetting the scramble mid-flight.
 *
 * Need another tag? Add one line to this map and it becomes a valid `as`
 * value automatically.
 */
const MOTION_TAGS = {
  p: motion.p,
  span: motion.span,
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
} as const;

export type ScrambleTag = keyof typeof MOTION_TAGS;

type TextScrambleProps = {
  children: string;
  duration?: number;
  speed?: number;
  characterSet?: string;
  as?: ScrambleTag;
  className?: string;
  trigger?: boolean;
  onScrambleComplete?: () => void;
} & MotionProps;

const defaultChars =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function TextScramble({
  children,
  duration = 0.8,
  speed = 0.04,
  characterSet = defaultChars,
  className,
  as = 'p',
  trigger = true,
  onScrambleComplete,
  ...props
}: TextScrambleProps) {
  const MotionComponent = MOTION_TAGS[as];
  const [displayText, setDisplayText] = useState(children);
  const text = children;

  /*
    Hold the newest completion callback in a ref instead of depending on
    it. Callers pass inline arrows (`() => setThingComplete(true)`), which
    are a new function on every parent render — as a dependency that would
    restart the scramble continuously.
  */
  const onCompleteRef = useRef(onScrambleComplete);
  useEffect(() => {
    onCompleteRef.current = onScrambleComplete;
  });

  /*
    Runs once each time `trigger` flips true. setDisplayText only ever
    fires from inside the interval callback (never synchronously in the
    effect body), and the interval is always cleared on unmount so an
    in-flight scramble can't outlive the component.
  */
  useEffect(() => {
    if (!trigger) return;

    const steps = duration / speed;
    let step = 0;

    const interval = setInterval(() => {
      let scrambled = '';
      const progress = step / steps;

      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
          scrambled += ' ';
          continue;
        }

        if (progress * text.length > i) {
          scrambled += text[i];
        } else {
          scrambled +=
            characterSet[Math.floor(Math.random() * characterSet.length)];
        }
      }

      setDisplayText(scrambled);
      step++;

      if (step > steps) {
        clearInterval(interval);
        setDisplayText(text);
        onCompleteRef.current?.();
      }
    }, speed * 1000);

    return () => clearInterval(interval);
  }, [trigger, text, duration, speed, characterSet]);

  return (
    <MotionComponent className={className} {...props}>
      {displayText}
    </MotionComponent>
  );
}
