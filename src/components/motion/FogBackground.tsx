"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
// @ts-expect-error vanta has no types
import FOG from "vanta/dist/vanta.fog.min";

export function FogBackground() {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      setVantaEffect(
        FOG({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          highlightColor: 0x222222,
          midtoneColor: 0x111111,
          lowlightColor: 0x000000,
          baseColor: 0x0a0a0c,
          blurFactor: 0.6,
          speed: 1.5,
          zoom: 1.2,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div
      ref={vantaRef}
      className="fixed inset-0 w-full h-full -z-10 opacity-70 mix-blend-screen pointer-events-none"
    />
  );
}
