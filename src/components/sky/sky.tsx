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
  SKY_REVEAL_START_INTENSITY,
} from "@/settings/skySettings";
import { useGameStore } from "@/store/gameStore";

const PAINTED_SKY_TEXTURE_PATH = `${process.env.NEXT_PUBLIC_BASE_PATH}/textures/sky.jpg`;

const prepareEquirectangularSkyTexture = (paintedSkyTexture: Texture) => {
  paintedSkyTexture.colorSpace = SRGBColorSpace;
  paintedSkyTexture.mapping = EquirectangularReflectionMapping;
};

export function PaintedSky() {
  const scene = useThree((state) => state.scene);
  const paintedSkyTexture = useTexture(
    PAINTED_SKY_TEXTURE_PATH,
    prepareEquirectangularSkyTexture,
  );

  const isRevealed = useGameStore(
    (state) => state.mode === "done" || state.finaleBeat === "thankYou",
  );

  useEffect(() => {
    if (isRevealed) {
      gsap.to(scene, {
        backgroundIntensity: SKY_FINAL_INTENSITY,
        duration: 2,
        ease: "power3.out",
        overwrite: true,
      });
    } else {
      gsap.to(scene, {
        backgroundIntensity: SKY_REVEAL_START_INTENSITY,
        duration: 2,
        ease: "power3.in",
        overwrite: true,
      });
    }
  }, [isRevealed, scene]);

  return (
    <Environment
      map={paintedSkyTexture}
      background="only"
      backgroundIntensity={SKY_REVEAL_START_INTENSITY}
    />
  );
}
