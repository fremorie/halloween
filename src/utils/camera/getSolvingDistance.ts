import { MathUtils } from "three";

import {
  CAMERA_FIT_MARGIN,
  CAMERA_FIT_RADIUS,
  CAMERA_FOV,
  SOLVING_HALF_WIDTH,
} from "@/settings/cameraSettings";

const HALF_HEIGHT_PER_UNIT_DISTANCE = Math.tan(
  MathUtils.degToRad(CAMERA_FOV / 2),
);

export function getSolvingDistance(aspect: number) {
  const distanceToFitRadius = CAMERA_FIT_RADIUS / HALF_HEIGHT_PER_UNIT_DISTANCE;
  const distanceToFitWidth =
    SOLVING_HALF_WIDTH / (HALF_HEIGHT_PER_UNIT_DISTANCE * aspect);

  return Math.max(distanceToFitRadius, distanceToFitWidth) * CAMERA_FIT_MARGIN;
}
