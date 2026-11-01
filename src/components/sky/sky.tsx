import { Environment, useTexture } from "@react-three/drei";
import {
  EquirectangularReflectionMapping,
  SRGBColorSpace,
  type Texture,
} from "three";
import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { gsap } from "gsap";

import {
  SKY_FINAL_INTENSITY,
  SKY_REVEAL_DURATION,
  SKY_REVEAL_EASE,
  SKY_REVEAL_START_INTENSITY,
} from "@/settings/skySettings";
import { useGameStore } from "@/store/gameStore";

const PAINTED_SKY_TEXTURE_PATH = `${process.env.NEXT_PUBLIC_BASE_PATH}/textures/sky.jpg`;

const prepareEquirectangularSkyTexture = (paintedSkyTexture: Texture) => {
  paintedSkyTexture.colorSpace = SRGBColorSpace;
  paintedSkyTexture.mapping = EquirectangularReflectionMapping;
};

export function PaintedSky() {
  const isRevealed = useGameStore(
    (state) => state.mode === "done" || state.finaleBeat === "thankYou",
  );

  return isRevealed ? <RevealingPaintedSky /> : null;
}

function RevealingPaintedSky() {
  const scene = useThree((state) => state.scene);
  const paintedSkyTexture = useTexture(
    PAINTED_SKY_TEXTURE_PATH,
    prepareEquirectangularSkyTexture,
  );

  useEffect(() => {
    const skyRevealTween = gsap.to(scene, {
      backgroundIntensity: SKY_FINAL_INTENSITY,
      duration: SKY_REVEAL_DURATION,
      ease: SKY_REVEAL_EASE,
      overwrite: true,
    });

    return () => {
      skyRevealTween.kill();
    };
  }, [scene]);

  return (
    <Environment
      map={paintedSkyTexture}
      background="only"
      backgroundIntensity={SKY_REVEAL_START_INTENSITY}
    />
  );
}

useTexture.preload(PAINTED_SKY_TEXTURE_PATH);
