import { Color, type Fog as FogImpl } from "three";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import { FOG_COLOR, FOG_FAR, FOG_NEAR } from "@/settings/fogSettings";
import { PAPER_COLOR } from "@/settings/paperSettings";
import { SKY_REVEAL_DURATION, SKY_REVEAL_EASE } from "@/settings/skySettings";
import { useIsSkyRevealed } from "@/utils/animation/useIsSkyRevealed";

const HIDDEN_SKY_FOG_COLOR = new Color(PAPER_COLOR);
const REVEALED_SKY_FOG_COLOR = new Color(FOG_COLOR);

export function Fog() {
  const fogRef = useRef<FogImpl>(null);
  const isSkyRevealed = useIsSkyRevealed();

  useEffect(() => {
    const fog = fogRef.current;

    if (!fog) {
      return;
    }

    const targetFogColor = isSkyRevealed
      ? REVEALED_SKY_FOG_COLOR
      : HIDDEN_SKY_FOG_COLOR;

    const fogColorTween = gsap.to(fog.color, {
      r: targetFogColor.r,
      g: targetFogColor.g,
      b: targetFogColor.b,
      duration: isSkyRevealed ? SKY_REVEAL_DURATION : 0,
      ease: SKY_REVEAL_EASE,
      overwrite: true,
    });

    return () => {
      fogColorTween.kill();
    };
  }, [isSkyRevealed]);

  return (
    <fog ref={fogRef} attach="fog" args={[PAPER_COLOR, FOG_NEAR, FOG_FAR]} />
  );
}
