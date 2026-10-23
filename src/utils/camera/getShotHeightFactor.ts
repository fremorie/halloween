import {
  BIRD_VIEW_HEIGHT_FACTOR,
  CAT_CLOSE_UP_HEIGHT_FACTOR,
} from "@/settings/cameraSettings";
import type { CameraShot } from "@/types/camera";

const SHOT_HEIGHT_FACTORS: Record<CameraShot, number> = {
  walking: 1,
  puzzle: 1,
  catCloseUp: CAT_CLOSE_UP_HEIGHT_FACTOR,
  birdView: BIRD_VIEW_HEIGHT_FACTOR,
};

export function getShotHeightFactor(shot: CameraShot) {
  return SHOT_HEIGHT_FACTORS[shot];
}
