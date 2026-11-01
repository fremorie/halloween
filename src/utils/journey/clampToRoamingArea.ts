import type { Vector3 } from "three";

import {
  GROUND_PLANE_CENTER_Z,
  GROUND_PLANE_LENGTH,
} from "@/components/grass/utils";
import { ROAM_CIRCLE_FRACTION } from "@/settings/journeySettings";

const ROAM_RADIUS = (GROUND_PLANE_LENGTH / 2) * ROAM_CIRCLE_FRACTION;

export function clampToRoamingArea(position: Vector3) {
  const offsetX = position.x;
  const offsetZ = position.z - GROUND_PLANE_CENTER_Z;
  const distanceFromCenter = Math.hypot(offsetX, offsetZ);

  if (distanceFromCenter <= ROAM_RADIUS) {
    return;
  }

  const pullBackToEdge = ROAM_RADIUS / distanceFromCenter;
  position.x = offsetX * pullBackToEdge;
  position.z = GROUND_PLANE_CENTER_Z + offsetZ * pullBackToEdge;
}
