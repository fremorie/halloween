import type { Vector3 } from "three";

export function getHeading(direction: Vector3) {
  return Math.atan2(-direction.x, -direction.z);
}
