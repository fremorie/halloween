import { MathUtils, type Vector3 } from "three";

import {
  BIRD_VIEW_HEIGHT_FACTOR,
  CAT_CLOSE_UP_HEIGHT_FACTOR,
  FLIGHT_CHASE_HEIGHT_FACTOR,
  FREE_FLIGHT_HEIGHT_FACTOR,
} from "@/settings/cameraSettings";
import type { CameraShot } from "@/types/camera";
import { getFreeFlightProgress } from "@/utils/cat";

const SHOT_HEIGHT_FACTORS: Record<CameraShot, number> = {
  walking: 1,
  puzzle: 1,
  catCloseUp: CAT_CLOSE_UP_HEIGHT_FACTOR,
  birdView: BIRD_VIEW_HEIGHT_FACTOR,
  flightChase: FLIGHT_CHASE_HEIGHT_FACTOR,
};

export function getShotHeightFactor(shot: CameraShot, catPosition: Vector3) {
  if (shot === "walking") {
    return MathUtils.lerp(
      SHOT_HEIGHT_FACTORS.walking,
      FREE_FLIGHT_HEIGHT_FACTOR,
      getFreeFlightProgress(catPosition),
    );
  }

  return SHOT_HEIGHT_FACTORS[shot];
}
