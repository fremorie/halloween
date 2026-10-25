import { useControls } from "leva";
import { useLayoutEffect } from "react";

import {
  REVEAL_EDGE_SOFTNESS,
  REVEAL_EDGE_WIDTH,
  REVEAL_INITIAL_SPEED,
  REVEAL_MAX_RADIUS,
  REVEAL_NOISE_SCALE,
  REVEAL_WOBBLE_AMOUNT,
  REVEAL_WOBBLE_NOISE_SCALE,
} from "@/settings/revealSettings";

import { revealUniforms } from "./revealUniforms";

export function useRevealControls() {
  const {
    maxRadius,
    initialSpeed,
    noiseScale,
    edgeWidth,
    edgeSoftness,
    wobbleNoiseScale,
    wobbleAmount,
  } = useControls("Reveal", {
    maxRadius: { value: REVEAL_MAX_RADIUS, min: 2, max: 20, step: 0.1 },
    initialSpeed: { value: REVEAL_INITIAL_SPEED, min: 0.5, max: 20, step: 0.1 },
    noiseScale: { value: REVEAL_NOISE_SCALE, min: 0.02, max: 1, step: 0.01 },
    edgeWidth: { value: REVEAL_EDGE_WIDTH, min: 0, max: 5, step: 0.05 },
    edgeSoftness: {
      value: REVEAL_EDGE_SOFTNESS,
      min: 0.01,
      max: 1,
      step: 0.01,
    },
    wobbleNoiseScale: {
      value: REVEAL_WOBBLE_NOISE_SCALE,
      min: 0.005,
      max: 0.2,
      step: 0.001,
    },
    wobbleAmount: { value: REVEAL_WOBBLE_AMOUNT, min: 0, max: 1, step: 0.01 },
  });

  useLayoutEffect(() => {
    revealUniforms.uRevealMaxRadius.value = maxRadius;
    revealUniforms.uRevealInitialSpeed.value = initialSpeed;
    revealUniforms.uRevealNoiseScale.value = noiseScale;
    revealUniforms.uRevealEdgeWidth.value = edgeWidth;
    revealUniforms.uRevealEdgeSoftness.value = edgeSoftness;
    revealUniforms.uRevealWobbleNoiseScale.value = wobbleNoiseScale;
    revealUniforms.uRevealWobbleAmount.value = wobbleAmount;
  }, [
    maxRadius,
    initialSpeed,
    noiseScale,
    edgeWidth,
    edgeSoftness,
    wobbleNoiseScale,
    wobbleAmount,
  ]);
}
