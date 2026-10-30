import type { Vector3 } from "three";

import { FINALE_CRUISE_EXTRA_HEIGHT } from "@/settings/finaleSettings";

export function getFlightPoint(
  flightStart: Vector3,
  flightEnd: Vector3,
  flightProgress: number,
  flightPoint: Vector3,
) {
  flightPoint.lerpVectors(flightStart, flightEnd, flightProgress);
  flightPoint.y +=
    Math.sin(Math.PI * flightProgress) * FINALE_CRUISE_EXTRA_HEIGHT;

  return flightPoint;
}
