import { MathUtils } from "three";

const FULL_TURN = Math.PI * 2;

export function dampAngle(
  currentAngle: number,
  targetAngle: number,
  lambda: number,
  delta: number,
) {
  const shortestDifference =
    MathUtils.euclideanModulo(targetAngle - currentAngle + Math.PI, FULL_TURN) -
    Math.PI;

  return MathUtils.damp(
    currentAngle,
    currentAngle + shortestDifference,
    lambda,
    delta,
  );
}
