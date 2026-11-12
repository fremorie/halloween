import { MathUtils, type Vector3 } from "three";

import { CAT_FREE_FLIGHT_HEIGHT } from "@/settings/catSettings";

export function getFreeFlightProgress(catPosition: Vector3) {
  return MathUtils.clamp(catPosition.y / CAT_FREE_FLIGHT_HEIGHT, 0, 1);
}
