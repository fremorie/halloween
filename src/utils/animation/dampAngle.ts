import { MathUtils } from "three";
import { getShortestAngleDifference } from "@/utils/animation/getShortestAngleDifference";

export function dampAngle(
  currentAngle: number,
  targetAngle: number,
  lambda: number,
  delta: number,
) {
  const shortestDifference = getShortestAngleDifference(
    currentAngle,
    targetAngle,
  );

  return MathUtils.damp(
    currentAngle,
    currentAngle + shortestDifference,
    lambda,
    delta,
  );
}
