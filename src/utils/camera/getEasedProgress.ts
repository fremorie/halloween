import { MathUtils } from "three";

export function getEasedProgress(
  ease: (progress: number) => number,
  elapsedSinceStart: number,
  duration: number,
) {
  return ease(MathUtils.clamp(elapsedSinceStart / duration, 0, 1));
}
