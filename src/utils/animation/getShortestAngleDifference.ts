import { MathUtils } from "three";

const FULL_TURN = Math.PI * 2;

export function getShortestAngleDifference(fromAngle: number, toAngle: number) {
  return (
    MathUtils.euclideanModulo(toAngle - fromAngle + Math.PI, FULL_TURN) -
    Math.PI
  );
}
