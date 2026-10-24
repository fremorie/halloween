import {
  BIRD_VIEW_ZOOM,
  CAMERA_FIT_RADIUS,
  CAT_CLOSE_UP_ZOOM,
  SOLVING_HALF_WIDTH,
  TOUCH_SCREEN_SOLVING_HALF_WIDTH,
  WALKING_MIN_HALF_WIDTH,
  WALKING_ZOOM,
} from "@/settings/cameraSettings";
import type { CameraShot } from "@/types/camera";

const SHOT_ZOOMS: Record<CameraShot, number> = {
  birdView: BIRD_VIEW_ZOOM,
  walking: WALKING_ZOOM,
  puzzle: 1,
  catCloseUp: CAT_CLOSE_UP_ZOOM,
};

const SHOT_MIN_HALF_WIDTHS: Partial<Record<CameraShot, number>> = {
  walking: WALKING_MIN_HALF_WIDTH,
  puzzle: SOLVING_HALF_WIDTH,
};

const TOUCH_SCREEN_SHOT_MIN_HALF_WIDTHS: Partial<Record<CameraShot, number>> = {
  ...SHOT_MIN_HALF_WIDTHS,
  puzzle: TOUCH_SCREEN_SOLVING_HALF_WIDTH,
};

export function getShotZoom(
  shot: CameraShot,
  aspect: number,
  isTouchDevice: boolean,
) {
  const shotZoom = SHOT_ZOOMS[shot];
  const minHalfWidth = (
    isTouchDevice ? TOUCH_SCREEN_SHOT_MIN_HALF_WIDTHS : SHOT_MIN_HALF_WIDTHS
  )[shot];
  if (minHalfWidth === undefined) return shotZoom;

  const zoomToFitMinWidth = minHalfWidth / (CAMERA_FIT_RADIUS * aspect);
  return Math.max(shotZoom, zoomToFitMinWidth);
}
