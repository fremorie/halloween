import type { Vector3 } from "three";

export function getForward(heading: number, forward: Vector3) {
  return forward.set(-Math.sin(heading), 0, -Math.cos(heading));
}
