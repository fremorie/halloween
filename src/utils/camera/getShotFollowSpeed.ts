import {
  CAMERA_FOLLOW_SPEED,
  TOUCH_SCREEN_WALKING_FOLLOW_SPEED,
} from "@/settings/cameraSettings";
import type { CameraShot } from "@/types/camera";

export function getShotFollowSpeed(shot: CameraShot, isTouchDevice: boolean) {
  if (shot === "walking" && isTouchDevice) {
    return TOUCH_SCREEN_WALKING_FOLLOW_SPEED;
  }

  return CAMERA_FOLLOW_SPEED;
}
