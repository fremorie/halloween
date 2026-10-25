import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { NoColorSpace, RepeatWrapping } from "three";

import { revealNoiseTextureUniform, revealTimeUniform } from "./revealUniforms";
import { useRevealControls } from "./useRevealControls";

const REVEAL_NOISE_TEXTURE_PATH = `${process.env.NEXT_PUBLIC_BASE_PATH}/textures/noise.webp`;

export function RevealSystem() {
  useTexture(REVEAL_NOISE_TEXTURE_PATH, (loadedRevealNoiseTexture) => {
    loadedRevealNoiseTexture.wrapS = RepeatWrapping;
    loadedRevealNoiseTexture.wrapT = RepeatWrapping;
    loadedRevealNoiseTexture.colorSpace = NoColorSpace;
    loadedRevealNoiseTexture.needsUpdate = true;
    revealNoiseTextureUniform.value = loadedRevealNoiseTexture;
  });

  useRevealControls();

  useFrame(({ clock }) => {
    revealTimeUniform.value = clock.elapsedTime;
  });

  return null;
}

useTexture.preload(REVEAL_NOISE_TEXTURE_PATH);
