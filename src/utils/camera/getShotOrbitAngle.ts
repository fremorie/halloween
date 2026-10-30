import { MathUtils, type Vector3 } from "three";

import {
  BIRD_VIEW_ORBIT_DEGREES,
  CAT_CLOSE_UP_ORBIT_DEGREES,
} from "@/settings/cameraSettings";
import type { CameraShot } from "@/types/camera";
import { getLandingSpotHeading } from "@/utils/finale";

const SHOT_ORBIT_ANGLES: Record<CameraShot, number> = {
  walking: 0,
  puzzle: 0,
  catCloseUp: MathUtils.degToRad(CAT_CLOSE_UP_ORBIT_DEGREES),
  birdView: MathUtils.degToRad(BIRD_VIEW_ORBIT_DEGREES),
  flightChase: 0,
};

export function getShotOrbitAngle(shot: CameraShot, catPosition: Vector3) {
  if (shot === "flightChase") {
    return getLandingSpotHeading(catPosition);
  }

  return SHOT_ORBIT_ANGLES[shot];
}
