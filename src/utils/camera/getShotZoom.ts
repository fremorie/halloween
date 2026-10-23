import { CAT_CLOSE_UP_ZOOM, WALKING_ZOOM } from "@/settings/cameraSettings";
import type { CameraShot } from "@/types/camera";

const SHOT_ZOOMS: Record<CameraShot, number> = {
  walking: WALKING_ZOOM,
  puzzle: 1,
  catCloseUp: CAT_CLOSE_UP_ZOOM,
};

export function getShotZoom(shot: CameraShot) {
  return SHOT_ZOOMS[shot];
}
