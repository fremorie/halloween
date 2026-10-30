import {
  BIRD_VIEW_ZOOM,
  CAMERA_FIT_RADIUS,
  CAT_CLOSE_UP_ZOOM,
  FLIGHT_CHASE_ZOOM,
  SOLVING_HALF_WIDTH,
  TOUCH_SCREEN_SOLVING_HALF_WIDTH,
  WALKING_ZOOM,
} from "@/settings/cameraSettings";
import type { CameraShot } from "@/types/camera";

const SHOT_ZOOMS: Record<Exclude<CameraShot, "puzzle">, number> = {
  birdView: BIRD_VIEW_ZOOM,
  walking: WALKING_ZOOM,
  catCloseUp: CAT_CLOSE_UP_ZOOM,
  flightChase: FLIGHT_CHASE_ZOOM,
};

export function getShotZoom(
  shot: CameraShot,
  aspect: number,
  isTouchDevice: boolean,
) {
  if (shot !== "puzzle") return SHOT_ZOOMS[shot];

  const solvingHalfWidth = isTouchDevice
    ? TOUCH_SCREEN_SOLVING_HALF_WIDTH
    : SOLVING_HALF_WIDTH;
  return Math.max(1, solvingHalfWidth / (CAMERA_FIT_RADIUS * aspect));
}
