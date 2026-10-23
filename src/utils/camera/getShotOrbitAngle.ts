import { MathUtils } from "three";

import {
  BIRD_VIEW_ORBIT_DEGREES,
  CAT_CLOSE_UP_ORBIT_DEGREES,
} from "@/settings/cameraSettings";
import type { CameraShot } from "@/types/camera";

const SHOT_ORBIT_ANGLES: Record<CameraShot, number> = {
  walking: 0,
  puzzle: 0,
  catCloseUp: MathUtils.degToRad(CAT_CLOSE_UP_ORBIT_DEGREES),
  birdView: MathUtils.degToRad(BIRD_VIEW_ORBIT_DEGREES),
};

export function getShotOrbitAngle(shot: CameraShot) {
  return SHOT_ORBIT_ANGLES[shot];
}
