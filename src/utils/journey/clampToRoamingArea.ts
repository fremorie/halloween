import { MathUtils, type Vector3 } from "three";

import {
  CAT_START,
  ROAM_MARGIN,
  STATION_SIDE_OFFSET,
  STATION_SPACING,
} from "@/settings/journeySettings";

export function clampToRoamingArea(position: Vector3, stationCount: number) {
  const halfWidth = STATION_SIDE_OFFSET + ROAM_MARGIN;
  const farthestZ = -(stationCount - 1) * STATION_SPACING - ROAM_MARGIN;
  const nearestZ = CAT_START[2] + ROAM_MARGIN / 2;

  position.x = MathUtils.clamp(position.x, -halfWidth, halfWidth);
  position.z = MathUtils.clamp(position.z, farthestZ, nearestZ);
}
